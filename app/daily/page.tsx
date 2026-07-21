"use client";

import { useEffect, useState } from "react";
import { Hourglass, Eye, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TENSE_ENTRIES } from "@/lib/tense-data";
import {
  DailyGrade,
  DailyGradeRecord,
  dayOfYear,
  loadDailyGrades,
  pickDailyEntryIndex,
  saveDailyGrade,
} from "@/lib/daily";

export default function DailyPage() {
  const [offset, setOffset] = useState(0);
  const [entryIndex, setEntryIndex] = useState<number | null>(null);
  const [paramIndex, setParamIndex] = useState<number | null>(null);
  const [grades, setGrades] = useState<Record<string, DailyGradeRecord>>({});
  const [revealed, setRevealed] = useState(false);
  const [graded, setGraded] = useState<DailyGrade | null>(null);

  // Compute the pick once on mount (localStorage is client-only); deferred so
  // the effect only schedules the update instead of setting state synchronously.
  // A valid ?e=<index> param (from the notification deep link) wins as the
  // initial pick; grades load once here so "Show me another" doesn't shift the
  // sequence when a fresh grade is saved mid-session.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      const loaded = loadDailyGrades();
      setGrades(loaded);
      const e = new URLSearchParams(window.location.search).get("e");
      const fromParam =
        e !== null && /^\d+$/.test(e) ? parseInt(e, 10) : Number.NaN;
      if (fromParam >= 0 && fromParam < TENSE_ENTRIES.length) {
        setParamIndex(fromParam);
        setEntryIndex(fromParam);
      } else {
        setEntryIndex(pickDailyEntryIndex(loaded, dayOfYear(), 0));
      }
    });
    return () => cancelAnimationFrame(id);
  }, []);

  const showAnother = () => {
    const next = offset + 1;
    setOffset(next);
    setEntryIndex(
      paramIndex !== null
        ? (paramIndex + next) % TENSE_ENTRIES.length
        : pickDailyEntryIndex(grades, dayOfYear(), next)
    );
    setRevealed(false);
    setGraded(null);
  };

  const handleGrade = (grade: DailyGrade) => {
    if (entryIndex === null) return;
    saveDailyGrade(TENSE_ENTRIES[entryIndex].id, grade);
    setGraded(grade);
  };

  if (entryIndex === null) {
    return (
      <div className="flex flex-col flex-1 items-center justify-center px-6">
        <Hourglass className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  const entry = TENSE_ENTRIES[entryIndex];
  const tenses: { label: string; text: string }[] = [
    { label: "Present", text: entry.present },
    { label: "Preterite", text: entry.preterite },
    { label: "Imperfect", text: entry.imperfect },
    { label: "Future", text: entry.future },
  ];

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-6 max-w-lg mx-auto w-full">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Hourglass className="w-5 h-5 text-primary" />
        <h1 className="text-lg font-bold text-foreground">Tense of the day</h1>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-white rounded-3xl border border-border/60 shadow-sm p-6 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-xl font-semibold text-foreground leading-snug">
              {entry.en}
            </p>
            <span className="shrink-0 text-xs font-semibold bg-mint text-primary px-2.5 py-1 rounded-full">
              {entry.verb}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Say it out loud in present, past, and future.
          </p>

          {revealed ? (
            <div className="flex flex-col gap-3 pt-2 border-t border-border/60">
              {tenses.map((t) => (
                <div key={t.label}>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {t.label}
                  </span>
                  <p className="text-base font-medium text-foreground">{t.text}</p>
                </div>
              ))}
              <p className="text-xs text-muted-foreground italic pt-1">
                Did the words come out before you looked? That&apos;s the real score.
              </p>
            </div>
          ) : (
            <Button
              variant="outline"
              onClick={() => setRevealed(true)}
              className="h-12 rounded-2xl text-base font-semibold mt-2"
            >
              <Eye className="w-4 h-4 mr-2" />
              Reveal all four
            </Button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        {revealed && !graded && (
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => handleGrade("froze")}
              className="flex-1 h-14 rounded-2xl text-base font-semibold border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              Froze
            </Button>
            <Button
              variant="outline"
              onClick={() => handleGrade("close")}
              className="flex-1 h-14 rounded-2xl text-base font-semibold border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
            >
              Close
            </Button>
            <Button
              onClick={() => handleGrade("nailed")}
              className="flex-1 h-14 rounded-2xl text-base font-semibold bg-green-500 hover:bg-green-600 text-white"
            >
              Nailed it
            </Button>
          </div>
        )}

        {graded && (
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground h-14">
            <Check className="w-4 h-4 text-green-500" />
            Noted — weak verbs come back sooner.
          </div>
        )}

        <Button
          variant="ghost"
          onClick={showAnother}
          className="h-10 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Show me another
        </Button>
      </div>
    </div>
  );
}
