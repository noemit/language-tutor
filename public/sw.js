self.addEventListener("push", (event) => {
  const data = event.data?.json() ?? {};
  const title = data.title || "Language Tutor";
  const options = {
    body: data.body || "Time to practice your Spanish!",
    icon: "/icon-192x192.png",
    badge: "/icon-192x192.png",
    tag: data.tag || "study-reminder",
    requireInteraction: false,
    actions: [
      { action: "flashcards", title: "Flashcards" },
      { action: "concepts", title: "Concepts" },
    ],
    data: {
      url: data.url || "/",
    },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  if (event.action === "flashcards") {
    event.waitUntil(clients.openWindow("/flashcards"));
  } else if (event.action === "concepts") {
    event.waitUntil(clients.openWindow("/concepts"));
  } else {
    event.waitUntil(clients.openWindow(url));
  }
});

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
