"use client";

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
    const msg = "Service worker registration failed";
    return { success: false, error: msg };
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

  // Send subscription to server
  try {
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, subscription: subscription.toJSON() }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { success: false, error: `Server error ${res.status}: ${text}` };
    }
    return { success: true };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to send subscription to server";
    console.error("Failed to send subscription to server:", err);
    return { success: false, error: msg };
  }
}

export async function unsubscribeFromPush(userId: string): Promise<boolean> {
  const registration = await registerServiceWorker();
  if (!registration) return false;

  const subscription = await registration.pushManager.getSubscription();
  if (subscription) {
    await subscription.unsubscribe();
  }

  try {
    const res = await fetch("/api/subscribe", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    return res.ok;
  } catch (err) {
    console.error("Failed to remove subscription:", err);
    return false;
  }
}

export async function sendTestNotification(): Promise<boolean> {
  try {
    const res = await fetch("/api/notify", { method: "POST" });
    return res.ok;
  } catch (err) {
    console.error("Test notification failed:", err);
    return false;
  }
}
