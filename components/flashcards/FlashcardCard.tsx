"use client";

import { useState } from "react";
import { Flashcard } from "@/types";
import { getLanguageName } from "@/lib/languages";

interface FlashcardCardProps {
  card: Flashcard;
  /** When true, practice the production direction: target language on the front. */
  reversed?: boolean;
}

export function FlashcardCard({ card, reversed = false }: FlashcardCardProps) {
  const [flipped, setFlipped] = useState(false);

  const frontText = reversed ? card.back : card.front;
  const frontLang = card.langPair[reversed ? 1 : 0];
  const backText = reversed ? card.front : card.back;
  const backLang = card.langPair[reversed ? 0 : 1];

  return (
    <div
      className="w-full aspect-[4/3] cursor-pointer perspective-[1000px]"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-white rounded-3xl border border-border backface-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
            {getLanguageName(frontLang)}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground text-center leading-tight">
            {frontText}
          </h2>
          <p className="text-sm text-muted-foreground mt-6">Tap to reveal</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-butter rounded-3xl border border-border"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-4">
            {getLanguageName(backLang)}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center leading-tight">
            {backText}
          </h2>
          {card.context && (
            <p className="text-sm text-muted-foreground mt-4 text-center italic max-w-xs">
              “{card.context}”
            </p>
          )}
          <div className="flex flex-wrap gap-2 mt-5 justify-center">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/60 text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
