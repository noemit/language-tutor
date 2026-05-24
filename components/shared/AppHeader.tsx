"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell, BellOff } from "lucide-react";
import {
  requestNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  sendTestNotification,
} from "@/lib/notifications";
import { toast } from "sonner";

export function AppHeader() {
  const { user, logout } = useAuth();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setChecking(false);
      return;
    }
    setNotificationsEnabled(Notification.permission === "granted");
    setChecking(false);
  }, []);

  const toggleNotifications = async () => {
    if (!user) {
      toast.error("Sign in to enable notifications");
      return;
    }

    if (notificationsEnabled) {
      // Disable
      await unsubscribeFromPush(user.uid);
      setNotificationsEnabled(false);
      toast.success("Notifications disabled");
      return;
    }

    // Enable
    const permission = await requestNotificationPermission();
    if (permission !== "granted") {
      toast.error("Notification permission denied");
      return;
    }

    const success = await subscribeToPush(user.uid);
    if (success) {
      setNotificationsEnabled(true);
      toast.success("Notifications enabled! 🔔", {
        description: "You'll get 3 reminders a day.",
      });
      // Send a test notification
      await sendTestNotification();
    } else {
      toast.error("Failed to enable notifications");
    }
  };

  if (!user) return null;

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-butter flex items-center justify-center overflow-hidden">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-foreground" />
            )}
          </div>
          <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
            {user.displayName || user.email}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNotifications}
            disabled={checking}
            className="rounded-xl h-9 w-9"
            title={notificationsEnabled ? "Disable notifications" : "Enable notifications"}
          >
            {notificationsEnabled ? (
              <Bell className="w-4 h-4 text-primary" />
            ) : (
              <BellOff className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={logout}
            className="rounded-xl h-9 w-9"
          >
            <LogOut className="w-4 h-4 text-muted-foreground" />
          </Button>
        </div>
      </div>
    </header>
  );
}
