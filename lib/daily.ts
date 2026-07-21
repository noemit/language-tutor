import { TENSE_ENTRIES } from "./tense-data";

// --- Tense-of-the-day picking ------------------------------------------------

export type DailyGrade = "nailed" | "close" | "froze";

export interface DailyGradeRecord {
  grade: DailyGrade;
  at: number;
}

const STORAGE_KEY = "dailyGrades";
const DAY_MS = 24 * 60 * 60 * 1000;
/** Weak grades older than this stop influencing the pick */
const WEAK_WINDOW_MS = 7 * DAY_MS;
/** An entry graded within this window counts as "recently shown" */
const RECENTLY_SHOWN_MS = 3 * DAY_MS;

/** Day of year (1-based) in local time — the shared base for the daily pick. */
export function dayOfYear(d: Date = new Date()): number {
  const start = new Date(d.getFullYear(), 0, 0).getTime();
  return Math.floor((d.getTime() - start) / DAY_MS);
}

/**
 * Base deterministic pick: day-of-year modulo entry count, with an optional
 * offset so "Show me another" can advance through the list. Used by both the
 * /daily page (as its fallback) and the push route.
 */
export function baseDailyIndex(dayIndex: number, offset = 0): number {
  const n = TENSE_ENTRIES.length;
  return (((dayIndex % n) + offset) % n + n) % n;
}

export function loadDailyGrades(): Record<string, DailyGradeRecord> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveDailyGrade(entryId: string, grade: DailyGrade): void {
  try {
    const grades = loadDailyGrades();
    grades[entryId] = { grade, at: Date.now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(grades));
  } catch {
    // localStorage unavailable — grading just won't persist
  }
}

/**
 * Pick today's entry, weighted toward weak verbs: entries graded "close" or
 * "froze" in the last week that haven't been shown in the last few days win
 * (oldest weak grade first — deterministic). Otherwise the day-of-year base
 * pick. `offset` shifts the result for "Show me another".
 */
export function pickDailyEntryIndex(
  grades: Record<string, DailyGradeRecord>,
  dayIndex: number,
  offset = 0
): number {
  const now = Date.now();
  const weak = TENSE_ENTRIES
    .map((entry, index) => ({ entry, index, record: grades[entry.id] }))
    .filter(
      ({ record }) =>
        record &&
        record.grade !== "nailed" &&
        now - record.at < WEAK_WINDOW_MS &&
        now - record.at >= RECENTLY_SHOWN_MS
    )
    .sort(
      (a, b) =>
        a.record!.at - b.record!.at || a.entry.id.localeCompare(b.entry.id)
    );

  const base = weak.length > 0 ? weak[0].index : baseDailyIndex(dayIndex);
  return (base + offset) % TENSE_ENTRIES.length;
}
