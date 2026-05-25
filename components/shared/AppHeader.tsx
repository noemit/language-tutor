"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, User, Bell, BellOff, HardDrive } from "lucide-react";
import {
  requestNotificationPermission,
  subscribeToPush,
  unsubscribeFromPush,
  sendTestNotification,
} from "@/lib/notifications";
import { toast } from "sonner";

export function AppHeader() {
  const { user, logout, isLocal } = useAuth();
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
    if (isLocal) {
      toast.error("Notifications require Firebase");
      return;
    }

    if (!user) {
      toast.error("Sign in to enable notifications");
      return;
    }

    if (notificationsEnabled) {
      await unsubscribeFromPush(user.uid);
      setNotificationsEnabled(false);
      toast.success("Notifications disabled");
      return;
    }

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
      await sendTestNotification();
    } else {
      toast.error("Failed to enable notifications");
    }
  };

  if (!user) return null;

  const isFirebaseUser = !isLocal && "photoURL" in user;

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-butter flex items-center justify-center overflow-hidden">
            {isFirebaseUser && (user as any).photoURL ? (
              <img
                src={(user as any).photoURL}
                alt=""
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-4 h-4 text-foreground" />
            )}
          </div>
          <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
            {isLocal
              ? "Local"
              : (user as any).displayName || (user as any).email || "User"}
          </span>
          {isLocal && (
            <HardDrive className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleNotifications}
            disabled={checking}
            className="rounded-xl h-9 w-9"
            title={
              isLocal
                ? "Notifications require Firebase"
                : notificationsEnabled
                  ? "Disable notifications"
                  : "Enable notifications"
            }
          >
            {notificationsEnabled ? (
              <Bell className="w-4 h-4 text-primary" />
            ) : (
              <BellOff className="w-4 h-4 text-muted-foreground" />
            )}
          </Button>
          {!isLocal && (
            <Button
              variant="ghost"
              size="icon"
              onClick={logout}
              className="rounded-xl h-9 w-9"
            >
              <LogOut className="w-4 h-4 text-muted-foreground" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
