"use client";

import { useState } from "react";
import { ArrowUpDown, Languages, Loader2, Sparkles } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/translation/LanguageSelector";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import {
  DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG,
} from "@/lib/languages";
import {
  createTranslation,
  createFlashcard,
} from "@/lib/db";
import { LanguageCode, TranslationResponse } from "@/types";

export default function Home() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [sourceLang, setSourceLang] =
    useState<LanguageCode>(DEFAULT_SOURCE_LANG);
  const [targetLang, setTargetLang] =
    useState<LanguageCode>(DEFAULT_TARGET_LANG);
  const [text, setText] = useState("");
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (result) {
      setText(result.translation);
      setResult(null);
    }
  };

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setIsTranslating(true);
    setResult(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          sourceLang,
          targetLang,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Translation failed");
      }

      const data: TranslationResponse = await res.json();
      setResult(data);

      // Save to Firestore
      if (user) {
        try {
          const translationDoc = await createTranslation(user.uid, {
            sourceText: text.trim(),
            translatedText: data.translation,
            sourceLang,
            targetLang,
            rawLlmResponse: JSON.stringify(data),
            flashcardIds: [],
          });

          const flashcardIds: string[] = [];
          for (const card of data.flashcards || []) {
            const docRef = await createFlashcard(user.uid, {
              front: card.front,
              back: card.back,
              context: card.context || text.trim(),
              langPair: [sourceLang, targetLang],
              tags: card.tags,
              status: "active",
              totalAttempts: 0,
              correctStreak: 0,
            });
            flashcardIds.push(docRef.id);
          }

          // Update translation with flashcard IDs
          const { updateDoc } = await import("firebase/firestore");
          await updateDoc(translationDoc, { flashcardIds });

          toast.success(`Created ${flashcardIds.length} flashcards`, {
            description: "Tap Flashcards to review them",
            icon: <Sparkles className="w-4 h-4" />,
          });
        } catch (e: any) {
          console.error("Failed to save to Firestore:", e);
          toast.error("Saved locally only — cloud sync failed");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setIsTranslating(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6 gap-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-butter">
          <Languages className="w-8 h-8 text-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Language Tutor</h1>
          <p className="text-muted-foreground mt-2 max-w-xs">
            Translate text and automatically generate flashcards to build your
            vocabulary.
          </p>
        </div>
        <Button
          onClick={signInWithGoogle}
          className="h-12 px-6 rounded-xl text-base font-medium"
        >
          Sign in with Google
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full">
      {/* Language selectors */}
      <div className="flex items-end gap-2">
        <div className="flex-1">
          <LanguageSelector
            label="From"
            value={sourceLang}
            onChange={setSourceLang}
          />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleSwap}
          className="rounded-xl h-11 w-11 mb-0"
        >
          <ArrowUpDown className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <LanguageSelector
            label="To"
            value={targetLang}
            onChange={setTargetLang}
          />
        </div>
      </div>

      {/* Input */}
      <Card className="p-4 rounded-2xl border-border bg-card shadow-none">
        <Textarea
          placeholder={`Paste ${sourceLang} text here...`}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[140px] resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground/60 focus-visible:ring-0 p-0"
        />
      </Card>

      {/* Translate button */}
      <Button
        onClick={handleTranslate}
        disabled={isTranslating || !text.trim()}
        className="h-14 rounded-2xl text-base font-semibold w-full"
      >
        {isTranslating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Translating...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Translate
          </>
        )}
      </Button>

      {/* Result */}
      {result && (
        <Card className="p-5 rounded-2xl border-border bg-white shadow-none">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
            Translation
          </p>
          <p className="text-xl font-medium text-foreground leading-relaxed">
            {result.translation}
          </p>
          {result.flashcards && result.flashcards.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                Flashcards created
              </p>
              <div className="flex flex-wrap gap-2">
                {result.flashcards.map((card, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium bg-butter text-foreground"
                  >
                    {card.front}
                  </span>
                ))}
              </div>
            </div>
          )}
        </Card>
      )}
    </div>
  );
}
