"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages, BookOpen, Lightbulb, Trophy } from "lucide-react";

const navItems = [
  { href: "/", label: "Translate", icon: Languages },
  { href: "/flashcards", label: "Flashcards", icon: BookOpen },
  { href: "/concepts", label: "Concepts", icon: Lightbulb },
  { href: "/mastered", label: "Mastered", icon: Trophy },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-t border-border pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-md mx-auto flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
