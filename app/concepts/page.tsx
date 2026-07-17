"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BookOpen, ChevronDown, Lightbulb, Loader2, Trophy, X, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { getConceptProgress, setConceptProgress, saveQuizAttempt, getQuizAttempts, getSuggestions, dismissSuggestion, getGeneratedQuizzes, saveGeneratedQuiz } from "@/lib/db";
import { CONCEPTS } from "@/lib/concepts-data";
import { QUIZZES } from "@/lib/quiz-data";
import { Concept, ConceptProgress, ConceptStatus, GeneratedQuiz, QuizQuestion } from "@/types";
import { toast } from "sonner";

const STATUS_LABELS: Record<ConceptStatus, string> = {
  "still-learning": "Still learning",
  confident: "Confident",
  mastered: "Mastered",
};

const STATUS_COLORS: Record<ConceptStatus, string> = {
  "still-learning": "bg-blush text-foreground",
  confident: "bg-butter text-foreground",
  mastered: "bg-mint text-foreground",
};

const DAY_MS = 24 * 60 * 60 * 1000;
/** Days to wait after each consecutive 100% quiz (stage 1..4). Completing stage 4 = mastered. */
const REVIEW_INTERVALS_DAYS = [1, 3, 7, 30];
/** How many recent quiz versions to avoid repeating */
const AVOID_RECENT_VERSIONS = 2;
/** Background-generate a new variant whenever fewer than this many are cached */
const MIN_CACHED_VARIANTS = 3;

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Shuffle question order and each question's options, remapping correctIndex. */
function shuffleQuiz(questions: QuizQuestion[]): QuizQuestion[] {
  return shuffleArray(questions).map((q) => {
    const order = shuffleArray(q.options.map((_, i) => i));
    return {
      ...q,
      options: order.map((i) => q.options[i]),
      correctIndex: order.indexOf(q.correctIndex),
    };
  });
}

interface QuizPoolEntry {
  /** `v{version}` for static versions, `g-{id}` for generated variants */
  key: string;
  version: number;
  generatedId?: string;
  questions: QuizQuestion[];
}

export default function ConceptsPage() {
  // useSearchParams needs a Suspense boundary during prerendering
  return (
    <Suspense
      fallback={
        <div className="flex flex-col flex-1 items-center justify-center px-6">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      }
    >
      <ConceptsPageContent />
    </Suspense>
  );
}

function ConceptsPageContent() {
  const { user, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [progressMap, setProgressMap] = useState<Record<string, ConceptProgress>>({});
  const [quizHistory, setQuizHistory] = useState<Record<string, { score: number; total: number; timestamp: Date; quizKey: string }[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<{
    conceptId: string;
    quizKey: string;
    version: number;
    generatedId?: string;
    questions: QuizQuestion[];
    currentIndex: number;
    answers: { selected: number; correct: boolean }[];
  } | null>(null);
  const [quizResults, setQuizResults] = useState<{
    conceptId: string;
    version: number;
    generatedId?: string;
    questions: QuizQuestion[];
    answers: { selected: number; correct: boolean }[];
    score: number;
  } | null>(null);
  const [suggestions, setSuggestions] = useState<{ id: string; conceptId: string; reason: string }[]>([]);
  const [dueTodayIds, setDueTodayIds] = useState<string[]>([]);

  const loadData = useCallback(async (background = false) => {
    if (!user) return;
    if (!background) setIsLoading(true);
    try {
      const [progress, attempts, suggs] = await Promise.all([
        getConceptProgress(user.uid),
        getQuizAttempts(user.uid),
        getSuggestions(user.uid),
      ]);
      const map: Record<string, ConceptProgress> = {};
      for (const p of progress) {
        // Results are newest-first; a concept may have legacy duplicate docs —
        // keep only the freshest one.
        if (!map[p.conceptId]) map[p.conceptId] = p;
      }
      setProgressMap(map);

      const hist: Record<string, { score: number; total: number; timestamp: Date; quizKey: string }[]> = {};
      for (const a of attempts) {
        if (!hist[a.conceptId]) hist[a.conceptId] = [];
        hist[a.conceptId].push({
          score: a.score,
          total: a.totalQuestions,
          timestamp: a.timestamp?.toDate?.() || new Date(),
          quizKey: a.generatedId ? `g-${a.generatedId}` : `v${a.version}`,
        });
      }
      setQuizHistory(hist);
      setSuggestions(suggs.map((s) => ({ id: s.id, conceptId: s.conceptId, reason: s.reason })));

      // Due-today queue (computed here, not during render — Date.now() is impure):
      // scheduled reviews that have arrived, most overdue first, then a few new topics.
      const nowMs = Date.now();
      const dueReview = CONCEPTS.filter((c) => {
        const p = map[c.id];
        return p?.status !== "mastered" && p?.nextReviewAt != null && p.nextReviewAt <= nowMs;
      }).sort((a, b) => (map[a.id]?.nextReviewAt ?? 0) - (map[b.id]?.nextReviewAt ?? 0));
      const neverQuizzed = CONCEPTS.filter(
        (c) =>
          !dueReview.includes(c) &&
          map[c.id]?.status !== "mastered" &&
          (hist[c.id] || []).length === 0
      );
      setDueTodayIds([...dueReview, ...neverQuizzed.slice(0, 3)].map((c) => c.id));
    } catch (e: unknown) {
      console.error("Failed to load concepts data:", e);
      toast.error("Failed to load progress");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Load data when user changes — schedule via microtask to avoid cascading renders
  useEffect(() => {
    if (!user) return;
    const timer = setTimeout(() => loadData(), 0);
    return () => clearTimeout(timer);
  }, [user, loadData]);

  // Auto-expand concept from URL query param (e.g. ?concept=past-tense-sick)
  useEffect(() => {
    const conceptId = searchParams.get("concept");
    if (conceptId && CONCEPTS.some((c) => c.id === conceptId)) {
      setExpandedId(conceptId);
    }
  }, [searchParams]);

  const handleStatusChange = async (conceptId: string, status: ConceptStatus) => {
    if (!user) return;
    try {
      // Manually marking mastered also clears the review schedule
      const extra = status === "mastered" ? { nextReviewAt: null } : undefined;
      await setConceptProgress(user.uid, conceptId, status, extra);
      setProgressMap((prev) => ({
        ...prev,
        [conceptId]: { ...prev[conceptId], conceptId, status, ...(extra ?? {}) } as ConceptProgress,
      }));
      void loadData(true); // refresh the due-today queue
      if (status === "mastered") {
        toast.success("Marked as mastered!", { icon: <Trophy className="w-4 h-4" /> });
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const startQuiz = useCallback(async (conceptId: string) => {
    if (!user) return;

    // Pool = static versions + cached AI-generated variants
    const pool: QuizPoolEntry[] = (QUIZZES[conceptId] || []).map((v) => ({
      key: `v${v.version}`,
      version: v.version,
      questions: v.questions,
    }));
    let generated: GeneratedQuiz[] = [];
    try {
      generated = await getGeneratedQuizzes(user.uid, conceptId);
    } catch { /* variants are a bonus — continue without them */ }
    for (const g of generated) {
      pool.push({ key: `g-${g.id}`, version: 0, generatedId: g.id, questions: g.questions });
    }

    if (pool.length === 0) {
      toast.error("No quiz available for this concept yet");
      return;
    }

    // Prefer versions not used in the most recent attempts
    const recentKeys = (quizHistory[conceptId] || [])
      .slice(0, AVOID_RECENT_VERSIONS)
      .map((h) => h.quizKey);
    const fresh = pool.filter((p) => !recentKeys.includes(p.key));
    const candidates = fresh.length > 0 ? fresh : pool;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];

    setActiveQuiz({
      conceptId,
      quizKey: pick.key,
      version: pick.version,
      generatedId: pick.generatedId,
      questions: shuffleQuiz(pick.questions),
      currentIndex: 0,
      answers: [],
    });
    setQuizResults(null);
  }, [user, quizHistory]);

  const answerQuestion = (selectedIndex: number) => {
    if (!activeQuiz) return;
    const question = activeQuiz.questions[activeQuiz.currentIndex];
    const correct = selectedIndex === question.correctIndex;
    const newAnswers = [...activeQuiz.answers, { selected: selectedIndex, correct }];

    if (activeQuiz.currentIndex + 1 >= activeQuiz.questions.length) {
      // Quiz complete — show review
      const score = newAnswers.filter((a) => a.correct).length;
      setQuizResults({
        conceptId: activeQuiz.conceptId,
        version: activeQuiz.version,
        generatedId: activeQuiz.generatedId,
        questions: activeQuiz.questions,
        answers: newAnswers,
        score,
      });
    } else {
      setActiveQuiz({ ...activeQuiz, currentIndex: activeQuiz.currentIndex + 1, answers: newAnswers });
    }
  };

  /** Fire-and-forget: top up the cached AI variants for this concept so the next attempt differs. */
  const maybeGenerateVariant = async (conceptId: string) => {
    if (!user) return;
    try {
      const existing = await getGeneratedQuizzes(user.uid, conceptId);
      if (existing.length >= MIN_CACHED_VARIANTS) return;
      const res = await fetch("/api/quiz-variant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conceptId }),
      });
      if (!res.ok) return;
      const data = await res.json();
      await saveGeneratedQuiz(user.uid, conceptId, data.questions);
      toast.success("Fresh quiz questions ready for next time", { duration: 3000 });
    } catch { /* silent — next attempt just reuses the existing pool */ }
  };

  const saveAndCloseQuiz = async () => {
    if (!quizResults || !user) {
      setActiveQuiz(null);
      setQuizResults(null);
      return;
    }
    const total = quizResults.questions.length;
    const pct = Math.round((quizResults.score / total) * 100);
    try {
      await saveQuizAttempt(user.uid, {
        conceptId: quizResults.conceptId,
        version: quizResults.version,
        // Firestore rejects undefined values — only include when present
        ...(quizResults.generatedId ? { generatedId: quizResults.generatedId } : {}),
        score: quizResults.score,
        totalQuestions: total,
        answers: quizResults.answers.map((a, i) => ({
          questionIndex: i,
          selectedIndex: a.selected,
          correct: a.correct,
        })),
      });

      // Repeat-until-100% scheduling: daily until a perfect score, then a
      // spacing ladder (+1d, +3d, +7d, +30d) that ends in mastery.
      const existing = progressMap[quizResults.conceptId];
      const prevStage = existing?.reviewStage ?? 0;
      const prevBest = existing?.bestScore ?? 0;
      let stage: number;
      let nextReviewAt: number | null;
      let status: ConceptStatus;

      if (pct === 100) {
        stage = prevStage + 1;
        if (stage > REVIEW_INTERVALS_DAYS.length) {
          // Cleared the final (+30d) rung — fully mastered
          stage = REVIEW_INTERVALS_DAYS.length;
          nextReviewAt = null;
          status = "mastered";
          toast.success(`🏆 "${CONCEPTS.find((c) => c.id === quizResults.conceptId)?.title}" mastered!`);
        } else {
          nextReviewAt = Date.now() + REVIEW_INTERVALS_DAYS[stage - 1] * DAY_MS;
          status = existing?.status === "mastered" ? "mastered" : "confident";
          toast.success(
            `100%! Next review in ${REVIEW_INTERVALS_DAYS[stage - 1]} day${REVIEW_INTERVALS_DAYS[stage - 1] > 1 ? "s" : ""}.`
          );
        }
      } else {
        stage = 0;
        nextReviewAt = Date.now() + DAY_MS;
        status = existing?.status === "mastered" ? "confident" : existing?.status ?? "still-learning";
        toast(`Score ${pct}% — this one comes back tomorrow.`);
      }

      const extra = {
        lastScore: pct,
        bestScore: Math.max(prevBest, pct),
        nextReviewAt,
        reviewStage: stage,
      };
      await setConceptProgress(user.uid, quizResults.conceptId, status, extra);
      await loadData(true); // refresh history, progress, and the due-today queue

      toast.success(`Quiz saved! ${quizResults.score}/${total}`);
      void maybeGenerateVariant(quizResults.conceptId);
    } catch {
      toast.error("Failed to save quiz result");
    }
    setActiveQuiz(null);
    setQuizResults(null);
  };

  const handleDismissSuggestion = async (id: string) => {
    if (!user) return;
    try {
      await dismissSuggestion(user.uid, id);
      setSuggestions((prev) => prev.filter((s) => s.id !== id));
    } catch {
      toast.error("Failed to dismiss suggestion");
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
        <p className="text-muted-foreground">Sign in to track your concepts</p>
      </div>
    );
  }

  // Quiz review screen
  if (quizResults && activeQuiz) {
    const pct = Math.round((quizResults.score / quizResults.questions.length) * 100);
    const concept = CONCEPTS.find((c) => c.id === quizResults.conceptId);
    return (
      <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Quiz Review</h2>
          <Button variant="ghost" size="sm" onClick={saveAndCloseQuiz} className="h-8 text-xs">
            Save & Close
          </Button>
        </div>

        {/* Score summary */}
        <Card className={`p-5 rounded-2xl border-border shadow-none ${pct >= 80 ? "bg-mint/40" : pct >= 50 ? "bg-butter/40" : "bg-blush/40"}`}>
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">{concept?.title}</p>
            <p className="text-4xl font-bold text-foreground mt-1">{quizResults.score}/{quizResults.questions.length}</p>
            <p className="text-sm font-medium mt-1" style={{ color: pct >= 80 ? "#16a34a" : pct >= 50 ? "#ca8a04" : "#dc2626" }}>
              {pct}%
            </p>
          </div>
        </Card>

        {/* Question review */}
        <div className="flex flex-col gap-3">
          {quizResults.questions.map((q, i) => {
            const answer = quizResults.answers[i];
            const isCorrect = answer.correct;
            return (
              <Card key={i} className={`p-4 rounded-2xl border-border shadow-none ${isCorrect ? "border-l-4 border-l-primary" : "border-l-4 border-l-destructive"}`}>
                <div className="flex items-start gap-3">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 flex flex-col gap-2">
                    <p className="text-sm font-medium text-foreground">{q.question}</p>
                    <div className="flex flex-col gap-1">
                      <p className={`text-xs ${isCorrect ? "text-primary font-medium" : "text-destructive line-through"}`}>
                        Your answer: {q.options[answer.selected]}
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-primary font-medium">
                          Correct: {q.options[q.correctIndex]}
                        </p>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed bg-background/60 rounded-lg p-2 mt-1">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <Button onClick={saveAndCloseQuiz} className="h-12 rounded-xl text-base font-semibold w-full">
          <Trophy className="w-4 h-4 mr-2" />
          Save & Close
        </Button>
      </div>
    );
  }

  // Active quiz
  if (activeQuiz) {
    const q = activeQuiz.questions[activeQuiz.currentIndex];
    const progress = `${activeQuiz.currentIndex + 1} / ${activeQuiz.questions.length}`;
    return (
      <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quiz {progress}</span>
          <Button variant="ghost" size="sm" onClick={() => { setActiveQuiz(null); setQuizResults(null); }} className="h-8 text-xs">
            Exit
          </Button>
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4">
          <Card className="p-5 rounded-2xl border-border bg-white shadow-none">
            <p className="text-base font-medium text-foreground mb-4">{q.question}</p>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, i) => (
                <Button
                  key={i}
                  variant="outline"
                  onClick={() => answerQuestion(i)}
                  className="h-auto py-3 px-4 justify-start text-left text-sm font-normal rounded-xl border-border hover:bg-butter hover:text-foreground"
                >
                  <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-semibold mr-3 shrink-0">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </Button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Due-today queue was computed in loadData (render must stay pure)
  const dueToday = dueTodayIds
    .map((id) => CONCEPTS.find((c) => c.id === id))
    .filter((c): c is Concept => Boolean(c));
  const dueReviewCount = dueToday.filter((c) => (quizHistory[c.id] || []).length > 0).length;

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Concepts</h1>
        <span className="text-xs font-medium text-muted-foreground">
          {CONCEPTS.length} topics
        </span>
      </div>

      {/* Due today */}
      {dueToday.length > 0 && (
        <Card className="p-4 rounded-2xl border-border bg-mint/20 shadow-none">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
            Due today · {dueReviewCount > 0 ? `${dueReviewCount} review${dueReviewCount > 1 ? "s" : ""}` : "new topics"}
          </p>
          <div className="flex flex-col gap-2">
            {dueToday.map((concept) => {
              const p = progressMap[concept.id];
              const isNew = (quizHistory[concept.id] || []).length === 0;
              return (
                <div key={concept.id} className="flex items-center gap-2 bg-card rounded-xl p-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{concept.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {isNew ? "New topic" : p?.lastScore != null ? `Last score: ${p.lastScore}%` : "Review due"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpandedId(concept.id)}
                    className="h-8 text-xs shrink-0"
                  >
                    Guide
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => startQuiz(concept.id)}
                    className="h-8 text-xs font-semibold rounded-lg shrink-0"
                  >
                    <Trophy className="w-3.5 h-3.5 mr-1" />
                    Take quiz
                  </Button>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      <div className="flex flex-col gap-3">
        {CONCEPTS.map((concept) => {
          const status = progressMap[concept.id]?.status || "still-learning";
          const isExpanded = expandedId === concept.id;
          const history = quizHistory[concept.id] || [];
          const bestScore = history.length > 0
            ? Math.max(...history.map((h) => h.score / h.total))
            : null;

          return (
            <Card
              key={concept.id}
              className="rounded-2xl border-border bg-card shadow-none overflow-hidden"
            >
              {/* Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : concept.id)}
                className="w-full p-4 text-left flex items-start justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {concept.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_COLORS[status]}`}
                    >
                      {STATUS_LABELS[status]}
                    </span>
                    {bestScore !== null && (
                      <span className="text-[10px] font-semibold text-primary">
                        Best: {Math.round(bestScore * 100)}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-foreground text-base">
                    {concept.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {concept.subtitle}
                  </p>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Expanded content */}
              {isExpanded && (
                <div className="px-4 pb-4">
                  <div className="border-t border-border pt-4 flex flex-col gap-4">
                    {/* Explanation paragraphs */}
                    <div className="flex flex-col gap-3">
                      {concept.content.map((para, i) => (
                        <p
                          key={i}
                          className="text-sm text-foreground leading-relaxed"
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Examples */}
                    {concept.examples.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Examples
                        </p>
                        {concept.examples.map((ex, i) => (
                          <div
                            key={i}
                            className="bg-butter/40 rounded-xl p-3 flex flex-col gap-1"
                          >
                            <p className="text-sm font-medium text-foreground">
                              {ex.spanish}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {ex.english}
                            </p>
                            {ex.explanation && (
                              <p className="text-xs text-muted-foreground/80 mt-0.5">
                                {ex.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tips */}
                    {concept.tips && concept.tips.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Tips
                        </p>
                        <ul className="flex flex-col gap-1.5">
                          {concept.tips.map((tip, i) => (
                            <li
                              key={i}
                              className="text-sm text-foreground flex items-start gap-2"
                            >
                              <span className="text-primary mt-1 shrink-0">•</span>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Quiz history */}
                    {history.length > 0 && (
                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          Quiz History
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {history.slice(0, 5).map((h, i) => (
                            <span
                              key={i}
                              className={`text-[10px] font-semibold px-2 py-1 rounded-full ${
                                h.score / h.total >= 0.8
                                  ? "bg-mint text-foreground"
                                  : h.score / h.total >= 0.5
                                  ? "bg-butter text-foreground"
                                  : "bg-blush text-foreground"
                              }`}
                            >
                              {h.score}/{h.total}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col gap-3 pt-2">
                      <Button
                        onClick={() => startQuiz(concept.id)}
                        className="h-11 rounded-xl text-sm font-semibold w-full"
                      >
                        <Trophy className="w-4 h-4 mr-2" />
                        {history.length > 0 ? "Retake Quiz" : "Take Quiz"}
                      </Button>

                      <div className="flex flex-col gap-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                          How do you feel about this?
                        </p>
                        <div className="flex gap-2">
                          {(["still-learning", "confident", "mastered"] as ConceptStatus[]).map(
                            (s) => (
                              <Button
                                key={s}
                                variant={status === s ? "default" : "outline"}
                                size="sm"
                                onClick={() => handleStatusChange(concept.id, s)}
                                className={`flex-1 h-9 text-xs font-semibold rounded-lg ${
                                  status === s ? "" : "border-border"
                                }`}
                              >
                                {STATUS_LABELS[s]}
                              </Button>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-primary" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Suggested New Concepts
            </p>
          </div>
          {suggestions.map((s) => {
            const concept = CONCEPTS.find((c) => c.id === s.conceptId);
            if (!concept) return null;
            return (
              <Card
                key={s.id}
                className="p-3 rounded-2xl border-border bg-butter/30 shadow-none"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{concept.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.reason}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDismissSuggestion(s.id)}
                    className="rounded-lg h-7 w-7 shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
