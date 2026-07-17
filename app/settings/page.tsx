"use client";

import { useEffect, useState, useCallback } from "react";
import { Loader2, Trash2, Settings as SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  getTranslations,
  deleteTranslation,
  deleteAllTranslations,
  getFlashcards,
  deleteFlashcard,
} from "@/lib/db";
import { getLanguageName } from "@/lib/languages";
import { Flashcard, Translation } from "@/types";
import { toast } from "sonner";

/** createdAt is a Firestore Timestamp in cloud mode, an ISO string in local mode */
function formatDate(value: unknown): string {
  if (!value) return "";
  const v = value as { toDate?: () => Date };
  const d = typeof v.toDate === "function" ? v.toDate() : new Date(String(value));
  return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

export default function SettingsPage() {
  const { user, loading: authLoading } = useAuth();
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmingWipe, setConfirmingWipe] = useState(false);
  const [busy, setBusy] = useState(false);

  const loadData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [t, c] = await Promise.all([
        getTranslations(user.uid),
        getFlashcards(user.uid, "active"),
      ]);
      setTranslations(t);
      setCards(c);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => loadData(), 0);
    return () => clearTimeout(timer);
  }, [user, loadData]);

  const handleDeleteTranslation = async (t: Translation) => {
    if (!user || busy) return;
    setBusy(true);
    try {
      await deleteTranslation(user.uid, t.id);
      const removedCards = new Set(t.flashcardIds || []);
      setTranslations((prev) => prev.filter((x) => x.id !== t.id));
      setCards((prev) => prev.filter((c) => !removedCards.has(c.id)));
      toast.success(
        removedCards.size > 0
          ? `Deleted translation and ${removedCards.size} linked card${removedCards.size === 1 ? "" : "s"}`
          : "Translation deleted"
      );
    } catch {
      toast.error("Failed to delete translation");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!user || busy) return;
    if (!confirmingWipe) {
      setConfirmingWipe(true);
      // Auto-cancel the confirm state after a few seconds
      setTimeout(() => setConfirmingWipe(false), 5000);
      return;
    }
    setBusy(true);
    setConfirmingWipe(false);
    try {
      await deleteAllTranslations(user.uid);
      setTranslations([]);
      // Flashcards not linked to a translation survive; reload to be exact
      const remaining = await getFlashcards(user.uid, "active");
      setCards(remaining);
      toast.success("All translations and their flashcards deleted");
    } catch {
      toast.error("Failed to delete translations");
    } finally {
      setBusy(false);
    }
  };

  const handleDeleteCard = async (card: Flashcard) => {
    if (!user || busy) return;
    setBusy(true);
    try {
      await deleteFlashcard(user.uid, card.id);
      setCards((prev) => prev.filter((c) => c.id !== card.id));
      toast.success(`Deleted "${card.front}"`);
    } catch {
      toast.error("Failed to delete card");
    } finally {
      setBusy(false);
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
        <SettingsIcon className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Sign in to manage your data</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-6 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Manage data</h1>
      </div>

      {/* Translations */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Translations · {translations.length}
          </p>
          {translations.length > 0 && (
            <Button
              variant={confirmingWipe ? "destructive" : "outline"}
              size="sm"
              disabled={busy}
              onClick={handleDeleteAll}
              className="h-8 text-xs rounded-lg"
            >
              <Trash2 className="w-3.5 h-3.5 mr-1" />
              {confirmingWipe ? "Tap again to confirm" : "Delete all"}
            </Button>
          )}
        </div>

        {translations.length === 0 ? (
          <p className="text-sm text-muted-foreground">No translations saved yet.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {translations.map((t) => (
              <Card key={t.id} className="p-3 rounded-xl border-border bg-card shadow-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{t.sourceText}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {getLanguageName(t.sourceLang)} → {getLanguageName(t.targetLang)}
                      {formatDate(t.createdAt) ? ` · ${formatDate(t.createdAt)}` : ""}
                      {(t.flashcardIds?.length ?? 0) > 0 ? ` · ${t.flashcardIds.length} cards` : ""}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={busy}
                    onClick={() => handleDeleteTranslation(t)}
                    className="rounded-lg h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Active flashcards */}
      <div className="flex flex-col gap-3">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Active flashcards · {cards.length}
        </p>

        {cards.length === 0 ? (
          <p className="text-sm text-muted-foreground">No active flashcards.</p>
        ) : (
          <div className="flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
            {cards.map((c) => (
              <Card key={c.id} className="p-3 rounded-xl border-border bg-card shadow-none">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.front}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.back}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={busy}
                    onClick={() => handleDeleteCard(c)}
                    className="rounded-lg h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
