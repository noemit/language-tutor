"use client";

import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
    return null;
  }
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    // Wait for the service worker to be active (important on iOS)
    await navigator.serviceWorker.ready;
    return registration;
  } catch (err) {
    console.error("Service worker registration failed:", err);
    return null;
  }
}

export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return "denied";
  }
  const permission = await Notification.requestPermission();
  return permission;
}

export async function subscribeToPush(userId: string): Promise<{ success: boolean; error?: string }> {
  if (!VAPID_PUBLIC_KEY) {
    const msg = "VAPID public key not configured";
    console.error(msg);
    return { success: false, error: msg };
  }

  const registration = await registerServiceWorker();
  if (!registration) {
    return { success: false, error: "Service worker registration failed" };
  }

  let subscription = await registration.pushManager.getSubscription();

  if (!subscription) {
    try {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY) as unknown as BufferSource,
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Push subscription failed";
      console.error("Push subscription failed:", err);
      return { success: false, error: msg };
    }
  }

  // Save subscription directly to Firestore from the client (auth is already handled by Firebase)
  if (!db) {
    return { success: false, error: "Firebase not initialized" };
  }

  try {
    await setDoc(
      doc(db, "pushSubscriptions", userId),
      {
        subscription: subscription.toJSON(),
        // Stored so the notify route can respect quiet hours (8:00–22:00 local)
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        updatedAt: new Date(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to save subscription";
    console.error("Firestore save error:", err);
    return { success: false, error: msg };
  }
}

export async function unsubscribeFromPush(userId: string): Promise<{ success: boolean; error?: string }> {
  const registration = await registerServiceWorker();
  if (!registration) {
    return { success: false, error: "Service worker not registered" };
  }

  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
  }

  if (!db) {
    return { success: false, error: "Firebase not initialized" };
  }

  try {
    await deleteDoc(doc(db, "pushSubscriptions", userId));
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to remove subscription";
    console.error("Firestore delete error:", err);
    return { success: false, error: msg };
  }
}

export async function sendTestNotification(): Promise<{
  ok: boolean;
  sent?: number;
  failed?: number;
  error?: string;
}> {
  try {
    const res = await fetch("/api/notify", { method: "POST" });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `Server error ${res.status}: ${text}` };
    }
    const data = await res.json().catch(() => ({}));
    return { ok: true, sent: data.sent, failed: data.failed };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("Test notification failed:", err);
    return { ok: false, error: msg };
  }
}

/**
 * Mirror a handful of the user's own flashcard sentences into the
 * world-readable `pushSentences/{userId}` doc, so the hourly notify cron can
 * personalize notifications without needing the Firebase Admin SDK.
 * Fire-and-forget: failures should never block the translate flow.
 */
export async function mirrorPushSentences(userId: string): Promise<void> {
  if (!db) return; // local mode — no push, nothing to mirror
  try {
    const { getFlashcards } = await import("@/lib/db");
    const cards = await getFlashcards(userId, "active");
    const sentences = cards
      .filter(
        (c) =>
          c.langPair[0] === "es" &&
          c.front.length >= 10 &&
          c.front.length <= 90 &&
          c.front.trim().includes(" ")
      )
      .slice(0, 12)
      .map((c) => ({ es: c.front, en: c.back }));
    if (sentences.length === 0) return;
    await setDoc(
      doc(db, "pushSentences", userId),
      { sentences, updatedAt: new Date() },
      { merge: true }
    );
  } catch (err) {
    console.warn("Failed to mirror push sentences:", err);
  }
}
