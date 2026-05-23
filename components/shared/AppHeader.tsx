"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function AppHeader() {
  const { user, logout } = useAuth();

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
        <Button
          variant="ghost"
          size="icon"
          onClick={logout}
          className="rounded-xl h-9 w-9"
        >
          <LogOut className="w-4 h-4 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
