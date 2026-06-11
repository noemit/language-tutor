import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { db } from "@/lib/firebase";
import { doc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { CONCEPTS } from "@/lib/concepts-data";

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

const BASE_MESSAGES = [
  { title: "Study break?", body: "A quick concept review will keep you sharp." },
  { title: "Language Tutor", body: "Your Spanish won't practice itself. Let's go! 🇪🇸" },
  { title: "Reminder", body: "5 minutes of flashcards = big progress over time." },
  { title: "¡Venga!", body: "A little practice now, fluency later. 💪" },
];

interface NotifyResult {
  sent: number;
  failed: number;
  test?: boolean;
  message?: string;
}

async function sendNotifications(isTest: boolean): Promise<NotifyResult | { error: string; status: number }> {
  if (!vapidPublicKey || !vapidPrivateKey) {
    return { error: "VAPID keys not configured on server", status: 500 };
  }

  if (!db) {
    return { error: "Firebase not configured", status: 500 };
  }

  try {
    const snapshot = await getDocs(collection(db, "pushSubscriptions"));

    if (snapshot.empty) {
      return { sent: 0, failed: 0, message: "No subscriptions found", test: isTest };
    }

    const base = BASE_MESSAGES[Math.floor(Math.random() * BASE_MESSAGES.length)];
    const concept = CONCEPTS[Math.floor(Math.random() * CONCEPTS.length)];
    const title = concept.title;
    const body = `${base.body} Today's concept: ${concept.title}`;
    const url = `/concepts?concept=${encodeURIComponent(concept.id)}`;
    let sent = 0;
    let failed = 0;

    const payload = JSON.stringify({
      title,
      body,
      url,
      tag: `concept-${concept.id}`,
    });

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const subscription = data.subscription;
      if (!subscription) continue;

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

    return { sent, failed, test: isTest };
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
