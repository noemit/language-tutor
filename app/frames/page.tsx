"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { MessagesSquare, Loader2, RotateCcw, Trophy, Zap, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { getFrameProgress, upsertFrameProgress } from "@/lib/db";
import { FRAMES } from "@/lib/frames-data";
import { Frame, FrameProgress } from "@/types";
import { toast } from "sonner";

const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_EASE = 2.2;
const MAX_INTERVAL_DAYS = 60;

type Grade = "froze" | "close" | "nailed";

const SCENARIOS: { id: string; label: string; emoji: string }[] = [
  { id: "cafe", label: "Café", emoji: "☕" },
  { id: "dog-walk-park", label: "Park", emoji: "🐕" },
  { id: "school-parents", label: "School", emoji: "🎒" },
  { id: "hairdresser", label: "Hairdresser", emoji: "💇" },
  { id: "doctor-pharmacy", label: "Doctor", emoji: "💊" },
  { id: "shopping", label: "Shopping", emoji: "🛍️" },
  { id: "neighbors-small-talk", label: "Neighbors", emoji: "👋" },
];

/** A frame in the drill pool plus the variant shown for this appearance. */
interface SessionItem {
  frame: Frame;
  variantIndex: number;
}

interface SessionStats {
  froze: number;
  close: number;
  nailed: number;
  total: number;
}

/** SM-2 lite: compute the next review schedule from the self-grade. */
function nextSchedule(progress: FrameProgress | undefined, grade: Grade): { intervalDays: number; dueAt: number } {
  const prevInterval = progress?.intervalDays ?? 0;
  const ease = progress?.easeFactor ?? DEFAULT_EASE;
  const now = Date.now();

  if (grade === "froze") {
    // Stays due — the frame is also re-queued within this session
    return { intervalDays: 0, dueAt: now };
  }
  if (grade === "close") {
    const interval = Math.max(1, prevInterval);
    return { intervalDays: interval, dueAt: now + interval * DAY_MS };
  }
  // nailed
  const interval = prevInterval <= 0 ? 1 : Math.min(Math.round(prevInterval * ease), MAX_INTERVAL_DAYS);
  return { intervalDays: interval, dueAt: now + interval * DAY_MS };
}

/** Human-friendly "in ~X hours/days" for the next due time. */
function formatDueIn(ts: number): string {
  const diff = ts - Date.now();
  if (diff <= 0) return "now";
  const hours = Math.round(diff / (60 * 60 * 1000));
  if (hours < 1) return "in under an hour";
  if (hours < 24) return `in ~${hours} hour${hours > 1 ? "s" : ""}`;
  const days = Math.round(hours / 24);
  return `in ~${days} day${days > 1 ? "s" : ""}`;
}

/** Random variant index; when excluding one, never repeat it (if >1 variant). */
function randomVariantIndex(count: number, exclude?: number): number {
  if (count <= 1) return 0;
  if (exclude == null) return Math.floor(Math.random() * count);
  const idx = Math.floor(Math.random() * (count - 1));
  return idx >= exclude ? idx + 1 : idx;
}

/**
 * Render the frame template with the current variant's slot fills substituted
 * in and emphasized. Best effort: for each slot, pick the option that appears
 * in the revealed Spanish sentence (longest match wins); unmatched slots stay
 * as blanks.
 */
function TemplateHighlight({ frame, spanish }: { frame: Frame; spanish: string }) {
  const fills = frame.slots.map((options) => {
    const match = options
      .filter((o) => spanish.toLowerCase().includes(o.toLowerCase()))
      .sort((a, b) => b.length - a.length)[0];
    return match ?? null;
  });

  const parts = frame.template.split("___");
  return (
    <p className="text-sm text-muted-foreground leading-relaxed">
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 &&
            (fills[i] ? (
              <strong className="text-primary font-semibold">{fills[i]}</strong>
            ) : (
              <span className="text-muted-foreground/60">___</span>
            ))}
        </span>
      ))}
    </p>
  );
}

export default function FramesPage() {
  const { user, loading: authLoading } = useAuth();
  const [scenario, setScenario] = useState<string>("all");
  const [items, setItems] = useState<SessionItem[]>([]);
  const [progressByFrame, setProgressByFrame] = useState<Map<string, FrameProgress>>(new Map());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState<SessionStats>({ froze: 0, close: 0, nailed: 0, total: 0 });
  const [nextDueAt, setNextDueAt] = useState<number | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const gradingRef = useRef(false);

  const scenarioFrames = scenario === "all" ? FRAMES : FRAMES.filter((f) => f.scenario === scenario);

  const loadSession = useCallback(
    async (mode: "due" | "quick" = "due") => {
      if (!user) return;
      setIsLoading(true);
      try {
        const now = Date.now();
        const allProgress = await getFrameProgress(user.uid);
        const map = new Map(allProgress.map((p) => [p.frameId, p]));
        setProgressByFrame(map);

        // Missing progress = due now; sort by dueAt ascending
        const sorted = [...scenarioFrames].sort(
          (a, b) => (map.get(a.id)?.dueAt ?? 0) - (map.get(b.id)?.dueAt ?? 0)
        );
        const due = sorted.filter((f) => (map.get(f.id)?.dueAt ?? 0) <= now);

        const upcoming = scenarioFrames
          .map((f) => map.get(f.id)?.dueAt)
          .filter((d): d is number => d != null && d > now);
        setNextDueAt(upcoming.length > 0 ? Math.min(...upcoming) : null);

        // "quick": the 3 most-due frames, topped up with the soonest upcoming ones
        const pool = mode === "quick" ? sorted.slice(0, 3) : due;
        // Random variant per appearance
        setItems(pool.map((frame) => ({ frame, variantIndex: randomVariantIndex(frame.variants.length) })));
        setCurrentIndex(0);
        setRevealed(false);
        setSessionComplete(false);
        setSessionStats({ froze: 0, close: 0, nailed: 0, total: 0 });
      } catch (e) {
        console.error("Frames load error:", e);
        toast.error("Failed to load frames: " + (e instanceof Error ? e.message : "Unknown error"));
      } finally {
        setIsLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, scenario]
  );

  useEffect(() => {
    // Defer so the load's synchronous setState doesn't run inside the effect body
    const id = setTimeout(() => loadSession(), 0);
    return () => clearTimeout(id);
  }, [loadSession]);

  const handleGrade = async (grade: Grade) => {
    if (!user || items.length === 0 || gradingRef.current) return;
    gradingRef.current = true;
    setIsGrading(true);
    const current = items[currentIndex];
    const frame = current.frame;
    const prev = progressByFrame.get(frame.id);

    try {
      const schedule = nextSchedule(prev, grade);
      const patch = {
        froze: (prev?.froze ?? 0) + (grade === "froze" ? 1 : 0),
        close: (prev?.close ?? 0) + (grade === "close" ? 1 : 0),
        nailed: (prev?.nailed ?? 0) + (grade === "nailed" ? 1 : 0),
        nailedStreak: grade === "nailed" ? (prev?.nailedStreak ?? 0) + 1 : 0,
        intervalDays: schedule.intervalDays,
        dueAt: schedule.dueAt,
        easeFactor: prev?.easeFactor ?? DEFAULT_EASE,
      };
      await upsertFrameProgress(user.uid, frame.id, patch);

      setProgressByFrame((m) => {
        const next = new Map(m);
        next.set(frame.id, {
          id: prev?.id ?? frame.id,
          userId: user.uid,
          frameId: frame.id,
          ...patch,
        });
        return next;
      });

      setSessionStats((s) => ({ ...s, [grade]: s[grade] + 1, total: s.total + 1 }));

      // "Froze" frames go to the back of the queue with a fresh variant
      const willRequeue = grade === "froze";
      if (willRequeue) {
        setItems((prevItems) => [
          ...prevItems,
          { frame, variantIndex: randomVariantIndex(frame.variants.length, current.variantIndex) },
        ]);
      }

      if (currentIndex + 1 >= items.length && !willRequeue) {
        setSessionComplete(true);
      } else {
        setCurrentIndex((i) => i + 1);
        setRevealed(false);
      }
    } catch {
      toast.error("Failed to save progress");
    } finally {
      gradingRef.current = false;
      setIsGrading(false);
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
        <MessagesSquare className="w-12 h-12 text-muted-foreground" />
        <p className="text-muted-foreground">Sign in to practice frames</p>
      </div>
    );
  }

  const scenarioChips = (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4">
      <button
        onClick={() => setScenario("all")}
        className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
          scenario === "all"
            ? "bg-primary text-primary-foreground border-primary"
            : "bg-white text-muted-foreground border-border hover:text-foreground"
        }`}
      >
        ✨ All
      </button>
      {SCENARIOS.map((s) => (
        <button
          key={s.id}
          onClick={() => setScenario(s.id)}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
            scenario === s.id
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-white text-muted-foreground border-border hover:text-foreground"
          }`}
        >
          {s.emoji} {s.label}
        </button>
      ))}
    </div>
  );

  if (items.length === 0) {
    return (
      <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-6 max-w-lg mx-auto w-full">
        <div>
          <h1 className="text-xl font-bold text-foreground">Frame drills</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Say it out loud, then check yourself. 7/10 understandable beats 10/10 perfect.
          </p>
        </div>
        {scenarioChips}
        <div className="flex flex-col flex-1 items-center justify-center gap-4">
          <Trophy className="w-12 h-12 text-primary" />
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">All caught up!</h2>
            <p className="text-muted-foreground mt-1">
              {nextDueAt
                ? `Next frame due ${formatDueIn(nextDueAt)}. Come back then — spacing is what makes it stick.`
                : "Nothing scheduled right now."}
            </p>
          </div>
          <Button variant="outline" onClick={() => loadSession("quick")} className="h-11 px-6 rounded-xl">
            <Zap className="w-4 h-4 mr-2" />
            Quick round (3)
          </Button>
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
            <span className="text-red-500">Froze: {sessionStats.froze}</span>
            <span className="text-yellow-500">Close: {sessionStats.close}</span>
            <span className="text-green-500">Nailed: {sessionStats.nailed}</span>
          </div>
          <p className="text-muted-foreground mt-2">
            {sessionStats.nailed} / {sessionStats.total} nailed — every attempt counts.
          </p>
        </div>
        <Button onClick={() => loadSession()} className="h-12 px-6 rounded-xl">
          <RotateCcw className="w-4 h-4 mr-2" />
          Practice again
        </Button>
      </div>
    );
  }

  const current = items[currentIndex];
  const frame = current.frame;
  const variant = frame.variants[current.variantIndex];
  const currentProgress = progressByFrame.get(frame.id);
  const progress = `${currentIndex + 1} / ${items.length}`;

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-6 max-w-lg mx-auto w-full">
      {/* Header + scenario chips + quick round */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-foreground">Frame drills</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            7/10 understandable beats 10/10 perfect.
          </p>
        </div>
        <Button
          variant="ghost"
          onClick={() => loadSession("quick")}
          className="h-8 rounded-full text-xs text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <Zap className="w-3.5 h-3.5 mr-1" />
          Quick (3)
        </Button>
      </div>
      {scenarioChips}

      {/* Progress */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {progress}
        </span>
        <div className="flex-1 mx-3 h-1.5 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-muted-foreground">
          🔥 {currentProgress?.nailedStreak ?? 0}
        </span>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col justify-center">
        <div
          key={`${frame.id}-${currentIndex}`}
          onClick={() => setRevealed(true)}
          className="bg-white rounded-3xl border border-border shadow-sm p-6 cursor-pointer select-none"
        >
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-3">
            Say this in Spanish
          </p>
          <p className="text-lg font-medium text-foreground leading-snug">{variant.english}</p>

          {revealed ? (
            <div className="mt-5 pt-5 border-t border-border">
              <p className="text-lg font-semibold text-primary leading-snug">{variant.spanish}</p>
              <div className="mt-4 bg-muted/60 rounded-2xl p-4">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground mb-2">
                  The frame
                </p>
                <TemplateHighlight frame={frame} spanish={variant.spanish} />
                {frame.tense && (
                  <p className="text-xs text-muted-foreground mt-2">Tense: {frame.tense}</p>
                )}
                {frame.note && (
                  <p className="text-xs text-muted-foreground mt-1">💡 {frame.note}</p>
                )}
              </div>
            </div>
          ) : (
            <div className="mt-5 pt-5 border-t border-dashed border-border flex items-center gap-2 text-muted-foreground">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Tap to check yourself</span>
            </div>
          )}
        </div>
      </div>

      {/* Grade buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          disabled={!revealed || isGrading}
          onClick={() => handleGrade("froze")}
          className="flex-1 h-14 rounded-2xl text-base font-semibold border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          Froze
        </Button>
        <Button
          variant="outline"
          disabled={!revealed || isGrading}
          onClick={() => handleGrade("close")}
          className="flex-1 h-14 rounded-2xl text-base font-semibold border-yellow-400 text-yellow-700 hover:bg-yellow-50 hover:text-yellow-800"
        >
          Close
        </Button>
        <Button
          disabled={!revealed || isGrading}
          onClick={() => handleGrade("nailed")}
          className="flex-1 h-14 rounded-2xl text-base font-semibold bg-green-500 hover:bg-green-600 text-white"
        >
          Nailed it
        </Button>
      </div>
    </div>
  );
}
