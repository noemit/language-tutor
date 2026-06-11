"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowUpDown, CheckCircle2, Languages, Loader2, Sparkles, XCircle } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSelector } from "@/components/translation/LanguageSelector";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";
import {
  DEFAULT_SOURCE_LANG,
  DEFAULT_TARGET_LANG,
  getLanguageName,
} from "@/lib/languages";
import {
  createTranslation,
  createFlashcard,
  saveSuggestion,
} from "@/lib/db";
import { isFirebaseConfigured } from "@/lib/firebase";
import { LanguageCode, TranslationResponse, GeneratedFlashcard } from "@/types";

// ---------------------------------------------------------------------------
// Concept keyword detection (unchanged)
// ---------------------------------------------------------------------------

const CONCEPT_KEYWORDS: Record<string, { keywords: string[]; reason: string }> = {
  "past-tense-sick": {
    keywords: ["estuve", "estaba", "había", "fue", "era", "pasado", "preterite", "imperfect", "pretérito", "imperfecto", "pluscuamperfecto"],
    reason: "Your translation used past tense verbs",
  },
  "spain-colloquialisms": {
    keywords: ["vale", "tío", "tía", "venga", "oye", "mira", "hombre", "pues", "bueno", "vamos"],
    reason: "Your translation included colloquial expressions",
  },
  "asking-questions": {
    keywords: ["lo que", "aunque", "si ", "cuál", "cómo", "por qué", "embedded", "indirect"],
    reason: "Your translation involved complex question structures",
  },
  "subjunctive-mood": {
    keywords: ["ojalá", "espero que", "dudo", "sea", "esté", "vaya", "haya", "fuera", "pudiera", "quiere que", "es importante que"],
    reason: "Your translation used the subjunctive mood",
  },
  "ser-vs-estar": {
    keywords: ["ser", "estar", "soy", "eres", "es", "estoy", "estás", "está", "fue", "estuvo"],
    reason: "Your translation involved ser/estar distinctions",
  },
  "se-impersonal": {
    keywords: ["se ", "se me", "se te", "se lo", "cómo se dice", "se vende", "se come"],
    reason: "Your translation used impersonal 'se' constructions",
  },
  "object-pronouns": {
    keywords: ["me lo", "te lo", "se lo", "nos lo", "os lo", "melo", "telo", "selo", "dímelo", "cuéntame"],
    reason: "Your translation included object pronouns",
  },
  "reflexive-verbs": {
    keywords: ["me voy", "se me olvidó", "me da igual", "me pasa", "se volvió", "me lo creo", "quedarse", "irse"],
    reason: "Your translation used reflexive verb constructions",
  },
  "future-conditional": {
    keywords: ["iré", "vendré", "sería", "podría", "querría", "me gustaría", "haré", "diría", "estará", "tendría"],
    reason: "Your translation used future or conditional tense",
  },
  "gerund-vs-infinitive": {
    keywords: ["ando", "iendo", "siguiendo", "terminando", "acabar de", "dejar de", "ponerse a", "seguir"],
    reason: "Your translation involved gerund/infinitive choices",
  },
  "fillers": {
    keywords: ["bueno, pues", "a ver", "es que", "o sea", "total que", "pues nada", "vamos"],
    reason: "Your translation included conversational fillers",
  },
  "storytelling-connectors": {
    keywords: ["entonces", "resulta que", "de repente", "al final", "en fin", "de pronto", "al cabo de"],
    reason: "Your translation had narrative or storytelling elements",
  },
  "softening-uncertainty": {
    keywords: ["igual", "a lo mejor", "supongo", "tendré que", "no sé si", "quizá", "tal vez", "me imagino"],
    reason: "Your translation expressed uncertainty or softened statements",
  },
  "reacting-emotionally": {
    keywords: ["en serio", "no me digas", "qué fuerte", "qué pena", "anda ya", "flipa"],
    reason: "Your translation included emotional reactions",
  },
  "interrupting-floor": {
    keywords: ["es que", "a ver si me explico", "lo que pasa", "mira, te cuento", "perdona que te interrumpa"],
    reason: "Your translation involved conversational management",
  },
  "daily-verbs": {
    keywords: ["caer bien", "echar de menos", "hace falta", "tengo ganas", "viene al caso", "dar por hecho"],
    reason: "Your translation used advanced daily-life verbs",
  },
  "false-friends": {
    keywords: ["actualmente", "constipado", "realizar", "asistir", "advertir", "pretender", "embarazada", "estreñido"],
    reason: "Your translation may contain false friend cognates",
  },
  "small-talk": {
    keywords: ["qué tal", "cómo lo llevas", "no te preocupes", "oye una cosa", "cuídate", "que vaya bien"],
    reason: "Your translation included social ritual phrases",
  },
  "evaluative-language": {
    keywords: ["de lo más", "no tiene desperdicio", "da igual", "mola", "pasada", "rollo", "no está mal"],
    reason: "Your translation expressed opinions or evaluations",
  },
  "formal-informal": {
    keywords: ["podría", "querría", "estimado", "un saludo", "le importa", "me pone", "tutear"],
    reason: "Your translation involved formal/informal register choices",
  },
  "paraphrasing-repair": {
    keywords: ["cómo se dice", "no sé cómo explicarlo", "es decir", "lo que pasa", "eso de ahí", "quiero decir"],
    reason: "Your translation used paraphrasing or repair strategies",
  },
};

function suggestConcepts(text: string, flashcards: { front: string; back: string; tags: string[] }[]): string[] {
  const lowerText = text.toLowerCase();
  const allContent = lowerText + " " + flashcards.map((c) => `${c.front} ${c.back} ${c.tags.join(" ")}`.toLowerCase()).join(" ");
  const suggestions: string[] = [];
  for (const [conceptId, data] of Object.entries(CONCEPT_KEYWORDS)) {
    const matched = data.keywords.some((kw) => allContent.includes(kw.toLowerCase()));
    if (matched && !suggestions.includes(conceptId)) suggestions.push(conceptId);
  }
  return suggestions;
}

// ---------------------------------------------------------------------------
// Active recall / cloze helpers
// ---------------------------------------------------------------------------

/** Returns the number of sentences in text (rough heuristic). */
function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  const endings = trimmed.match(/[.!?]+(?:\s|$)/g);
  // If no ending punctuation, treat as 1 sentence
  return endings ? endings.length : 1;
}

interface ClozeBlank {
  answer: string;   // exact slice from the translation (preserves case)
  hint: string;     // source-language word shown above the input
}

interface ClozeChallenge {
  parts: string[];       // text segments between blanks (length = blanks.length + 1)
  blanks: ClozeBlank[];
  userAnswers: string[];
  submitted: boolean;
  fullTranslation: string;
  flashcards: GeneratedFlashcard[];
}

/**
 * Build a cloze challenge by finding flashcard `back` values inside the
 * translation string and replacing them with blanks.
 * Returns null if no blanks could be found.
 */
function buildCloze(data: TranslationResponse): ClozeChallenge | null {
  const flashcards = data.flashcards ?? [];
  if (flashcards.length === 0) return null;

  const translation = data.translation;

  // Find each flashcard's back value position, deduplicating overlaps
  type Located = { pos: number; len: number; answer: string; hint: string };
  const located: Located[] = [];

  for (const card of flashcards) {
    if (!card.back) continue;
    const idx = translation.toLowerCase().indexOf(card.back.toLowerCase());
    if (idx === -1) continue;
    // Skip if this range overlaps an already-found blank
    const overlaps = located.some(
      (l) => idx < l.pos + l.len && idx + card.back.length > l.pos
    );
    if (!overlaps) {
      located.push({
        pos: idx,
        len: card.back.length,
        answer: translation.slice(idx, idx + card.back.length),
        hint: card.front,
      });
    }
  }

  if (located.length === 0) return null;

  // Sort by position
  located.sort((a, b) => a.pos - b.pos);

  // Build parts and blanks
  const parts: string[] = [];
  const blanks: ClozeBlank[] = [];
  let cursor = 0;

  for (const loc of located) {
    parts.push(translation.slice(cursor, loc.pos));
    blanks.push({ answer: loc.answer, hint: loc.hint });
    cursor = loc.pos + loc.len;
  }
  parts.push(translation.slice(cursor));

  return {
    parts,
    blanks,
    userAnswers: blanks.map(() => ""),
    submitted: false,
    fullTranslation: translation,
    flashcards,
  };
}

// ---------------------------------------------------------------------------
// Inline ClozeView component
// ---------------------------------------------------------------------------

interface ClozeViewProps {
  challenge: ClozeChallenge;
  onChange: (index: number, value: string) => void;
  onSubmit: () => void;
  onReveal: () => void;
}

function ClozeView({ challenge, onChange, onSubmit, onReveal }: ClozeViewProps) {
  const { parts, blanks, userAnswers, submitted, fullTranslation, flashcards } = challenge;
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  const score = submitted
    ? blanks.filter((b, i) => userAnswers[i].trim().toLowerCase() === b.answer.toLowerCase()).length
    : 0;
  const allCorrect = submitted && score === blanks.length;

  return (
    <Card className="p-5 rounded-2xl border-border bg-white shadow-none flex flex-col gap-4">
      {/* Header */}
      <div>
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Fill in the blanks
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Hints shown above each blank
        </p>
      </div>

      {/* Cloze sentence */}
      <div className="text-lg font-medium text-foreground leading-relaxed flex flex-wrap items-end gap-x-1 gap-y-3">
        {parts.map((part, i) => (
          <span key={i} className="flex flex-wrap items-end gap-x-1 gap-y-3">
            {part && <span>{part}</span>}
            {i < blanks.length && (
              <span className="flex flex-col items-center gap-0.5">
                {/* hint */}
                <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">
                  {blanks[i].hint}
                </span>
                {submitted ? (
                  /* revealed answer with correct/incorrect styling */
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-base font-semibold ${
                      userAnswers[i].trim().toLowerCase() === blanks[i].answer.toLowerCase()
                        ? "bg-mint text-foreground"
                        : "bg-blush text-foreground"
                    }`}
                  >
                    {userAnswers[i].trim().toLowerCase() === blanks[i].answer.toLowerCase() ? (
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                    )}
                    {blanks[i].answer}
                  </span>
                ) : (
                  <input
                    ref={i === 0 ? firstInputRef : undefined}
                    type="text"
                    value={userAnswers[i]}
                    onChange={(e) => onChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && userAnswers.every((a) => a.trim())) {
                        onSubmit();
                      }
                    }}
                    placeholder="___"
                    className={`border-b-2 border-primary bg-transparent text-base font-semibold text-center outline-none px-1 transition-colors focus:border-primary/80`}
                    style={{ width: `${Math.max(blanks[i].answer.length + 2, 5)}ch` }}
                  />
                )}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Score or action */}
      {submitted ? (
        <div className="flex flex-col gap-3">
          <div className={`flex items-center gap-2 text-sm font-semibold ${allCorrect ? "text-primary" : "text-muted-foreground"}`}>
            {allCorrect ? (
              <><CheckCircle2 className="w-4 h-4" /> Perfect — {score}/{blanks.length}</>
            ) : (
              <>{score}/{blanks.length} correct</>
            )}
          </div>

          {/* Show wrong answers */}
          {!allCorrect && (
            <div className="flex flex-col gap-1.5">
              {blanks.map((b, i) => {
                const correct = userAnswers[i].trim().toLowerCase() === b.answer.toLowerCase();
                if (correct) return null;
                return (
                  <p key={i} className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">{b.hint}</span>
                    {" → "}
                    <span className="line-through text-destructive">{userAnswers[i] || "—"}</span>
                    {" → "}
                    <span className="font-semibold text-primary">{b.answer}</span>
                  </p>
                );
              })}
            </div>
          )}

          <Button onClick={onReveal} className="h-11 rounded-xl text-sm font-semibold w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            See full translation
          </Button>
        </div>
      ) : (
        <Button
          onClick={onSubmit}
          disabled={!userAnswers.every((a) => a.trim())}
          className="h-11 rounded-xl text-sm font-semibold w-full"
        >
          Check
        </Button>
      )}
    </Card>
  );
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function Home() {
  const { user, loading: authLoading, signInWithGoogle } = useAuth();
  const [sourceLang, setSourceLang] = useState<LanguageCode>(DEFAULT_SOURCE_LANG);
  const [targetLang, setTargetLang] = useState<LanguageCode>(DEFAULT_TARGET_LANG);
  const [text, setText] = useState("");
  const [result, setResult] = useState<TranslationResponse | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [cloze, setCloze] = useState<ClozeChallenge | null>(null);

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    if (result) {
      setText(result.translation);
      setResult(null);
      setCloze(null);
    }
  };

  const handleTranslate = async () => {
    if (!text.trim()) return;
    setIsTranslating(true);
    setResult(null);
    setCloze(null);

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text.trim(), sourceLang, targetLang }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Translation failed");
      }

      const data: TranslationResponse = await res.json();

      // Decide whether to show cloze challenge (1–2 sentences only)
      const sentenceCount = countSentences(text.trim());
      const challenge = sentenceCount <= 2 ? buildCloze(data) : null;

      if (challenge) {
        setCloze(challenge);
      } else {
        setResult(data);
      }

      // Save to Firestore (regardless of recall mode)
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
              masteryCount: 0,
              consecutiveKnowStreak: 0,
              masteryAchieved: false,
            });
            flashcardIds.push(docRef.id);
          }

          if (isFirebaseConfigured) {
            const { updateDoc } = await import("firebase/firestore");
            await updateDoc(translationDoc as import("firebase/firestore").DocumentReference, { flashcardIds });
          }

          const suggestedConcepts = suggestConcepts(
            data.translation + " " + text.trim(),
            data.flashcards || []
          );
          for (const conceptId of suggestedConcepts) {
            const reason = CONCEPT_KEYWORDS[conceptId]?.reason || "Based on your recent translation";
            await saveSuggestion(user.uid, conceptId, reason).catch(() => {});
          }

          if (!challenge) {
            toast.success(`Created ${flashcardIds.length} flashcards`, {
              description: "Tap Flashcards to review them",
              icon: <Sparkles className="w-4 h-4" />,
            });
          }
        } catch (e: unknown) {
          console.error("Failed to save to Firestore:", e);
          toast.error("Saved locally only — cloud sync failed");
        }
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
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
            Translate text and automatically generate flashcards to build your vocabulary.
          </p>
        </div>
        <Button onClick={signInWithGoogle} className="h-12 px-6 rounded-xl text-base font-medium">
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
          <LanguageSelector label="From" value={sourceLang} onChange={setSourceLang} />
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
          <LanguageSelector label="To" value={targetLang} onChange={setTargetLang} />
        </div>
      </div>

      {/* Input */}
      <Card className="p-4 rounded-2xl border-border bg-card shadow-none">
        <Textarea
          placeholder={`Paste ${getLanguageName(sourceLang)} text here...`}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setResult(null);
            setCloze(null);
          }}
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

      {/* Cloze recall challenge */}
      {cloze && !result && (
        <ClozeView
          challenge={cloze}
          onChange={(i, val) =>
            setCloze((c) =>
              c
                ? {
                    ...c,
                    userAnswers: c.userAnswers.map((a, idx) => (idx === i ? val : a)),
                  }
                : c
            )
          }
          onSubmit={() =>
            setCloze((c) => (c ? { ...c, submitted: true } : c))
          }
          onReveal={() => {
            if (cloze) {
              setResult({ translation: cloze.fullTranslation, flashcards: cloze.flashcards });
              setCloze(null);
            }
          }}
        />
      )}

      {/* Full result */}
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
