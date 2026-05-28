"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, Loader2, RotateCcw, ThumbsUp, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlashcardCard } from "@/components/flashcards/FlashcardCard";
import { useAuth } from "@/components/auth/AuthProvider";
import { getFlashcards, recordAttempt, updateFlashcard, archiveFlashcard } from "@/lib/db";
import { serverTimestamp } from "firebase/firestore";
import { Flashcard } from "@/types";
import { toast } from "sonner";

export default function FlashcardsPage() {
  const { user, loading: authLoading } = useAuth();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, total: 0 });

  const loadCards = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const activeCards = await getFlashcards(user.uid, "active");
      // Simple shuffle
      const shuffled = [...activeCards].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setSessionComplete(false);
      setSessionStats({ correct: 0, total: 0 });
    } catch (e: unknown) {
      console.error("Flashcards load error:", e);
      const msg = e instanceof Error ? e.message : "Unknown error";
      toast.error("Failed to load flashcards: " + msg);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => loadCards(), 0);
    return () => clearTimeout(timer);
  }, [user, loadCards]);

  const handleAnswer = async (correct: boolean) => {
    if (!user || cards.length === 0) return;
    const card = cards[currentIndex];

    try {
      // Record attempt
      await recordAttempt(user.uid, {
        cardId: card.id,
        correct,
        direction: "front-to-back",
      });

      // Update card stats
      const newTotal = (card.totalAttempts || 0) + 1;
      const newStreak = correct ? (card.correctStreak || 0) + 1 : 0;

      await updateFlashcard(user.uid, card.id, {
        totalAttempts: newTotal,
        correctStreak: newStreak,
        lastAttemptAt: serverTimestamp(),
      } as Record<string, unknown>);

      // Auto-archive if streak >= 7
      if (newStreak >= 7) {
        await archiveFlashcard(user.uid, card.id);
        toast.success(`"${card.front}" archived — you know it!`, {
          icon: <Trophy className="w-4 h-4" />,
        });
      }

      setSessionStats((s) => ({
        correct: s.correct + (correct ? 1 : 0),
        total: s.total + 1,
      }));

      // Move to next card
      if (currentIndex + 1 >= cards.length) {
        setSessionComplete(true);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    } catch {
      toast.error("Failed to save progress");
    }
  };

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
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Sign in to practice flashcards</p>
      </div>
    );
  }

  if (cards.length === 0) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 gap-4">
        <BookOpen className="w-12 h-12 text-muted-foreground" />
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">No flashcards yet</h2>
          <p className="text-muted-foreground mt-1">
            Translate some text to generate your first cards.
          </p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-mint">
          <ThumbsUp className="w-10 h-10 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Session complete!</h2>
          <p className="text-muted-foreground mt-2">
            {sessionStats.correct} / {sessionStats.total} correct
          </p>
        </div>
        <Button onClick={loadCards} className="h-12 px-6 rounded-xl">
          <RotateCcw className="w-4 h-4 mr-2" />
          Practice again
        </Button>
      </div>
    );
  }

  const currentCard = cards[currentIndex];
  const progress = `${currentIndex + 1} / ${cards.length}`;

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-6 max-w-lg mx-auto w-full">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {progress}
        </span>
        <div className="flex-1 mx-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          🔥 {currentCard.correctStreak || 0}
        </span>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col justify-center">
        <FlashcardCard key={currentCard.id} card={currentCard} />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => handleAnswer(false)}
          className="flex-1 h-14 rounded-2xl text-base font-semibold border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
        >
          Again
        </Button>
        <Button
          onClick={() => handleAnswer(true)}
          className="flex-1 h-14 rounded-2xl text-base font-semibold"
        >
          Good
        </Button>
      </div>
    </div>
  );
}
