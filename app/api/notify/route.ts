import { NextRequest, NextResponse } from "next/server";
import webpush from "web-push";
import { db } from "@/lib/firebase";
import { doc, getDoc, deleteDoc, collection, getDocs } from "firebase/firestore";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;

if (vapidPublicKey && vapidPrivateKey) {
  webpush.setVapidDetails(
    "mailto:noemit@example.com",
    vapidPublicKey,
    vapidPrivateKey
  );
}

const MESSAGES = [
  { title: "¡Hola!", body: "Time for some flashcards? 🧠" },
  { title: "Study break?", body: "A quick concept review will keep you sharp." },
  { title: "Language Tutor", body: "Your Spanish won't practice itself. Let's go! 🇪🇸" },
  { title: "Reminder", body: "5 minutes of flashcards = big progress over time." },
  { title: "¡Venga!", body: "A little practice now, fluency later. 💪" },
];

export async function POST(request: NextRequest) {
  // If called with ?test=1, send test notification to the first subscription found
  const { searchParams } = new URL(request.url);
  const isTest = searchParams.get("test") === "1";

  try {
    // Get all subscriptions from Firestore
    // For a personal app, we just iterate pushSubscriptions collection
    const snapshot = await getDocs(collection(db, "pushSubscriptions"));

    if (snapshot.empty) {
      return NextResponse.json({ sent: 0, message: "No subscriptions found" });
    }

    const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    let sent = 0;
    let failed = 0;

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const subscription = data.subscription;
      if (!subscription) continue;

      const payload = JSON.stringify({
        title: message.title,
        body: message.body,
        url: "/flashcards",
        tag: "study-reminder",
      });

      try {
        await webpush.sendNotification(subscription, payload);
        sent++;
      } catch (err: any) {
        console.error("Push failed:", err.statusCode, err.body);
        failed++;
        // If subscription is expired/invalid, remove it
        if (err.statusCode === 410 || err.statusCode === 404) {
          await deleteDoc(doc(db, "pushSubscriptions", docSnap.id));
        }
      }
    }

    return NextResponse.json({ sent, failed, test: isTest });
  } catch (err) {
    console.error("Notify error:", err);
    return NextResponse.json({ error: "Failed to send notifications" }, { status: 500 });
  }
}
