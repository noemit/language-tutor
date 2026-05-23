"use client";

import { useEffect, useState, useCallback } from "react";
import { Archive, Loader2, RotateCcw, Search, Trophy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { getFlashcards, restoreFlashcard } from "@/lib/db";
import { Flashcard } from "@/types";
import { toast } from "sonner";

export default function ArchivePage() {
  const { user, loading: authLoading } = useAuth();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadCards = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const archived = await getFlashcards(user.uid, "archived");
      setCards(archived);
    } catch (e) {
      toast.error("Failed to load archive");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleRestore = async (card: Flashcard) => {
    if (!user) return;
    try {
      await restoreFlashcard(user.uid, card.id);
      setCards((prev) => prev.filter((c) => c.id !== card.id));
      toast.success(`"${card.front}" restored to practice`);
    } catch (e) {
      toast.error("Failed to restore card");
    }
  };

  const filteredCards = cards.filter(
    (c) =>
      c.front.toLowerCase().includes(search.toLowerCase()) ||
      c.back.toLowerCase().includes(search.toLowerCase())
  );

  if (authLoading || isLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 gap-4">
        <Archive className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Sign in to view your archive</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 gap-4">
        <Trophy className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">
            Archive is empty
          </h2>
          <p className="text-muted-foreground mt-1">
            Mastered cards will appear here automatically.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full">
      <div className="flex items-center gap-2">
        <Search className="w-4 h-4 text-muted-foreground absolute ml-3 pointer-events-none" />
        <Input
          placeholder="Search archive..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-11 rounded-xl bg-card border-border"
        />
      </div>

      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        {filteredCards.length} mastered {filteredCards.length === 1 ? "card" : "cards"}
      </p>

      <div className="flex flex-col gap-3">
        {filteredCards.map((card) => (
          <Card
            key={card.id}
            className="p-4 rounded-2xl border-border bg-card shadow-none"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground">{card.front}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{card.back}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                    {card.totalAttempts || 0} attempts
                  </span>
                  <span className="text-[10px] font-medium text-primary uppercase tracking-wide">
                    streak {card.correctStreak || 0}
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRestore(card)}
                className="rounded-xl h-9 w-9 shrink-0"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
