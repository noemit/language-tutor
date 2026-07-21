import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { CONCEPTS } from "@/lib/concepts-data";
import { TENSE_ENTRIES } from "@/lib/tense-data";
import { baseDailyIndex, dayOfYear } from "@/lib/daily";

// Run fresh on every invocation (cron + manual test should never be cached)
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    "mailto:noemit@example.com",
    vapidPublicKey,
    vapidPrivateKey
  );
}

// --- Notification content ---------------------------------------------------

/** Curated sentence pool built from the lesson library's example sentences */
const SENTENCE_POOL = CONCEPTS.flatMap((c) =>
  c.examples.map((e) => ({ es: e.spanish, en: e.english, conceptId: c.id }))
);

const NUDGES = [
  "Say it out loud once.",
  "Repeat it 3 times today.",
  "Listen for it in the wild.",
  "Use it in a sentence today.",
];

interface NotificationContent {
  title: string;
  body: string;
  url: string;
}

/**
 * Picks this hour's content. Deterministic per hour so repeat cron triggers
 * within the same hour don't reshuffle.
 * - hour % 4 === 3: tense of the day (same day-of-year pick as the /daily page)
 * - hour % 4 === 2: real-life speaking mission
 * - hour % 4 === 1: a sentence from the user's own flashcards (if mirrored)
 * - otherwise: the next curated sentence from the lesson library
 */
function pickContent(
  hourIndex: number,
  personal: { es: string; en: string }[] | null
): NotificationContent {
  const curated = SENTENCE_POOL[hourIndex % SENTENCE_POOL.length];

  if (hourIndex % 4 === 3) {
    const index = baseDailyIndex(dayOfYear());
    const entry = TENSE_ENTRIES[index];
    return {
      title: "⏳ Tense of the day",
      body: `"${entry.en}" — say it in present, past & future, then check in the app.`,
      // Deep link carries the pick so /daily shows this exact entry
      url: `/daily?e=${index}`,
    };
  }

  if (hourIndex % 4 === 2) {
    const mission = SENTENCE_POOL[(hourIndex * 7 + 1) % SENTENCE_POOL.length];
    return {
      title: "🗣️ Real-life mission",
      body: `Say this out loud today — to someone, or just yourself: "${mission.es}" (${mission.en})`,
      url: `/concepts?concept=${encodeURIComponent(mission.conceptId)}`,
    };
  }

  if (hourIndex % 4 === 1 && personal && personal.length > 0) {
    const own = personal[hourIndex % personal.length];
    return {
      title: own.es,
      body: `${own.en} · From your own deck`,
      url: "/flashcards",
    };
  }

  return {
    title: curated.es,
    body: `${curated.en} · ${NUDGES[hourIndex % NUDGES.length]}`,
    url: `/concepts?concept=${encodeURIComponent(curated.conceptId)}`,
  };
}

// --- Quiet hours --------------------------------------------------------------

const QUIET_START = 22; // 22:00 local — don't send
const QUIET_END = 8; //   08:00 local — start sending again

/** Current hour (0-23) in the subscriber's timezone, or null if unknown/invalid */
function localHour(timezone?: string): number | null {
  if (!timezone) return null;
  try {
    const formatted = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    }).format(new Date());
    return parseInt(formatted, 10) % 24;
  } catch {
    return null;
  }
}

function isQuietHours(timezone?: string): boolean {
  const hour = localHour(timezone);
  if (hour === null) return false; // unknown timezone → send (legacy behavior)
  return hour >= QUIET_START || hour < QUIET_END;
}

// --- Sending ------------------------------------------------------------------

interface NotifyResult {
  sent: number;
  failed: number;
  skippedQuiet: number;
  test?: boolean;
  message?: string;
}

async function sendNotifications(
  isTest: boolean
): Promise<NotifyResult | { error: string; status: number }> {
  if (!vapidPublicKey || !vapidPrivateKey) {
    return { error: "VAPID keys not configured on server", status: 500 };
  }

  if (!db) {
    return { error: "Firebase not configured", status: 500 };
  }

  try {
    const snapshot = await getDocs(collection(db, "pushSubscriptions"));

    if (snapshot.empty) {
      return { sent: 0, failed: 0, skippedQuiet: 0, message: "No subscriptions found", test: isTest };
    }

    const hourIndex = Math.floor(Date.now() / 3_600_000);
    let sent = 0;
    let failed = 0;
    let skippedQuiet = 0;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const subscription = data.subscription;
      if (!subscription) continue;

      // Quiet hours in the subscriber's own timezone (tests always send)
      if (!isTest && isQuietHours(data.timezone)) {
        skippedQuiet++;
        continue;
      }

      // Personal sentences mirrored by the client (doc id == userId)
      let personal: { es: string; en: string }[] | null = null;
      try {
        const personalSnap = await getDoc(doc(db!, "pushSentences", docSnap.id));
        const sentences = personalSnap.data()?.sentences;
        if (Array.isArray(sentences)) {
          personal = sentences.filter(
            (s): s is { es: string; en: string } =>
              s && typeof s.es === "string" && typeof s.en === "string"
          );
        }
      } catch { /* no personal pool — curated content still works */ }

      const content = pickContent(hourIndex, personal);
      const payload = JSON.stringify({
        ...content,
        tag: `sentence-${hourIndex}`,
      });

      try {
        await webpush.sendNotification(subscription, payload);
        sent++;
      } catch (err: unknown) {
        const pushErr = err as { statusCode?: number; body?: string };
        console.error("Push failed:", pushErr.statusCode, pushErr.body);
        failed++;
        // If subscription is expired/invalid, remove it
        if (pushErr.statusCode === 410 || pushErr.statusCode === 404) {
          await deleteDoc(doc(db!, "pushSubscriptions", docSnap.id));
        }
      }
    }

    return { sent, failed, skippedQuiet, test: isTest };
  } catch (err) {
    console.error("Notify error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return { error: `Failed to send notifications: ${message}`, status: 500 };
  }
}

function isCronAuthorized(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  // If no CRON_SECRET is configured, allow (helps during initial setup)
  if (!cronSecret) return true;
  const authHeader = request.headers.get("authorization");
  return authHeader === `Bearer ${cronSecret}`;
}

// Vercel Cron Jobs invoke this endpoint with GET by default.
export async function GET(request: NextRequest) {
  if (!isCronAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const isTest = searchParams.get("test") === "1";
  const result = await sendNotifications(isTest);

  if ("error" in result && "status" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}

// Manual test trigger from the app (bell toggle)
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const isTest = searchParams.get("test") === "1";
  const result = await sendNotifications(isTest);

  if ("error" in result && "status" in result) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json(result);
}
