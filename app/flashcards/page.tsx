"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, Loader2, RotateCcw, Trophy, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlashcardCard } from "@/components/flashcards/FlashcardCard";
import { useAuth } from "@/components/auth/AuthProvider";
import { getFlashcards, recordAttempt, updateFlashcard, archiveFlashcard } from "@/lib/db";
import { serverTimestamp } from "firebase/firestore";
import { Flashcard } from "@/types";
import { toast } from "sonner";

const MASTERY_THRESHOLD_TOTAL = 5;
const MASTERY_THRESHOLD_STREAK = 3;

type ConfidenceLevel = "dont-know" | "sort-of-know" | "know";

interface SessionStats {
  dontKnow: number;
  sortOfKnow: number;
  know: number;
  total: number;
}

export default function FlashcardsPage() {
  const { user, loading: authLoading } = useAuth();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    dontKnow: 0,
    sortOfKnow: 0,
    know: 0,
    total: 0,
  });

  const loadCards = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const activeCards = await getFlashcards(user.uid, "active");
      // Filter out cards that already achieved mastery
      const unmastered = activeCards.filter((c) => !c.masteryAchieved);
      // Simple shuffle
      const shuffled = [...unmastered].sort(() => Math.random() - 0.5);
      setCards(shuffled);
      setCurrentIndex(0);
      setSessionComplete(false);
      setSessionStats({ dontKnow: 0, sortOfKnow: 0, know: 0, total: 0 });
    } catch (e: any) {
      console.error("Flashcards load error:", e);
      toast.error("Failed to load flashcards: " + (e.message || "Unknown error"));
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const moveToNextCard = useCallback(() => {
    if (currentIndex + 1 >= cards.length) {
      setSessionComplete(true);
    } else {
      setCurrentIndex((i) => i + 1);
      setIsFlipped(false);
    }
  }, [currentIndex, cards.length]);

  const handleAnswer = async (level: ConfidenceLevel) => {
    if (!user || cards.length === 0) return;
    const card = cards[currentIndex];

    try {
      // Record attempt
      await recordAttempt(user.uid, {
        cardId: card.id,
        correct: level === "know",
        direction: "front-to-back",
      });

      // Update card stats
      const newTotal = (card.totalAttempts || 0) + 1;
      const newStreak = level === "know" ? (card.correctStreak || 0) + 1 : 0;
      // Don't know = full reset; Sort of know = keep total but reset streak; Know = +1 both
      const newMasteryCount = level === "dont-know" ? 0 : level === "know" ? (card.masteryCount || 0) + 1 : (card.masteryCount || 0);
      const newConsecutiveKnowStreak = level === "know" ? (card.consecutiveKnowStreak || 0) + 1 : 0;
      const masteryAchieved = newConsecutiveKnowStreak >= MASTERY_THRESHOLD_STREAK || newMasteryCount >= MASTERY_THRESHOLD_TOTAL;

      await updateFlashcard(user.uid, card.id, {
        totalAttempts: newTotal,
        correctStreak: newStreak,
        masteryCount: newMasteryCount,
        consecutiveKnowStreak: newConsecutiveKnowStreak,
        masteryAchieved,
        lastAttemptAt: serverTimestamp(),
      } as any);

      // Auto-archive if mastery achieved
      if (masteryAchieved && !card.masteryAchieved) {
        await archiveFlashcard(user.uid, card.id);
        toast.success(`🎉 "${card.front}" mastered!`, {
          icon: <Crown className="w-4 h-4" />,
        });
      }

      setSessionStats((s) => ({
        ...s,
        [level === "dont-know" ? "dontKnow" : level === "sort-of-know" ? "sortOfKnow" : "know"]:
          s[level === "dont-know" ? "dontKnow" : level === "sort-of-know" ? "sortOfKnow" : "know"] + 1,
        total: s.total + 1,
      }));

      moveToNextCard();
    } catch (e) {
      toast.error("Failed to save progress");
    }
  };

  const handleMastered = async () => {
    if (!user || cards.length === 0) return;
    const card = cards[currentIndex];

    try {
      // Mark as mastered immediately
      await updateFlashcard(user.uid, card.id, {
        masteryCount: MASTERY_THRESHOLD,
        masteryAchieved: true,
        lastAttemptAt: serverTimestamp(),
      } as any);

      await archiveFlashcard(user.uid, card.id);

      toast.success(`✨ "${card.front}" marked as mastered`, {
        description: "Skipped to archived cards",
      });

      moveToNextCard();
    } catch (e) {
      toast.error("Failed to mark as mastered");
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
          <h2 className="text-lg font-semibold text-foreground">No flashcards to review</h2>
          <p className="text-muted-foreground mt-1">
            All your cards are mastered! Translate some text to generate new cards.
          </p>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 gap-6">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-mint">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground">Session complete!</h2>
          <div className="flex gap-4 justify-center mt-3 text-sm">
            <span className="text-red-500">Don't know: {sessionStats.dontKnow}</span>
            <span className="text-yellow-500">Sort of: {sessionStats.sortOfKnow}</span>
            <span className="text-green-500">Know: {sessionStats.know}</span>
          </div>
          <p className="text-muted-foreground mt-2">
            {sessionStats.know} / {sessionStats.total} fully correct
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
  const masteryDisplay = currentCard.masteryCount || 0;
  const isMastered = currentCard.masteryAchieved || false;

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
          🎯 {masteryDisplay}/{MASTERY_THRESHOLD_TOTAL} · 🔥 {currentCard.consecutiveKnowStreak || 0}/{MASTERY_THRESHOLD_STREAK}
        </span>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col justify-center">
        <FlashcardCard key={currentCard.id} card={currentCard} />
      </div>

      {/* Mastery progress bar */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Mastery:</span>
        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-green-500 rounded-full transition-all"
            style={{ width: `${Math.min((masteryDisplay / MASTERY_THRESHOLD_TOTAL) * 100, 100)}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          {isMastered ? "✅ Mastered" : `${masteryDisplay}/${MASTERY_THRESHOLD_TOTAL} or 🔥${currentCard.consecutiveKnowStreak || 0}/${MASTERY_THRESHOLD_STREAK}`}
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => handleAnswer("dont-know")}
            className="flex-1 h-14 rounded-2xl text-base font-semibold border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            Don't know
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAnswer("sort-of-know")}
            className="flex-1 h-14 rounded-2xl text-base font-semibold border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
          >
            Sort of know
          </Button>
          <Button
            onClick={() => handleAnswer("know")}
            className="flex-1 h-14 rounded-2xl text-base font-semibold bg-green-500 hover:bg-green-600 text-white"
          >
            Know
          </Button>
        </div>

        {/* Already mastered skip button */}
        <Button
          variant="ghost"
          onClick={handleMastered}
          className="h-10 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Crown className="w-4 h-4 mr-2" />
          I've already mastered this
        </Button>
      </div>
    </div>
  );
}
