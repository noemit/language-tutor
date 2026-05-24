"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, ChevronDown, Lightbulb, Loader2, Trophy, X, RotateCcw, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { getConceptProgress, setConceptProgress, saveQuizAttempt, getQuizAttempts, getSuggestions, dismissSuggestion } from "@/lib/db";
import { CONCEPTS } from "@/lib/concepts-data";
import { QUIZZES } from "@/lib/quiz-data";
import { ConceptProgress, ConceptStatus, QuizQuestion } from "@/types";
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

export default function ConceptsPage() {
  const { user, loading: authLoading } = useAuth();
  const [progressMap, setProgressMap] = useState<Record<string, ConceptStatus>>({});
  const [quizHistory, setQuizHistory] = useState<Record<string, { score: number; total: number; timestamp: Date }[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<{
    conceptId: string;
    version: number;
    questions: QuizQuestion[];
    currentIndex: number;
    answers: { selected: number; correct: boolean }[];
  } | null>(null);
  const [suggestions, setSuggestions] = useState<{ id: string; conceptId: string; reason: string }[]>([]);

  const loadData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [progress, attempts, suggs] = await Promise.all([
        getConceptProgress(user.uid),
        getQuizAttempts(user.uid),
        getSuggestions(user.uid),
      ]);
      const map: Record<string, ConceptStatus> = {};
      for (const p of progress) {
        map[p.conceptId] = p.status;
      }
      setProgressMap(map);

      const hist: Record<string, { score: number; total: number; timestamp: Date }[]> = {};
      for (const a of attempts) {
        if (!hist[a.conceptId]) hist[a.conceptId] = [];
        hist[a.conceptId].push({
          score: a.score,
          total: a.totalQuestions,
          timestamp: a.timestamp?.toDate?.() || new Date(),
        });
      }
      setQuizHistory(hist);
      setSuggestions(suggs.map((s) => ({ id: s.id, conceptId: s.conceptId, reason: s.reason })));
    } catch (e: any) {
      console.error("Failed to load concepts data:", e);
      toast.error("Failed to load progress");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (conceptId: string, status: ConceptStatus) => {
    if (!user) return;
    try {
      await setConceptProgress(user.uid, conceptId, status);
      setProgressMap((prev) => ({ ...prev, [conceptId]: status }));
      if (status === "mastered") {
        toast.success("Marked as mastered!", { icon: <Trophy className="w-4 h-4" /> });
      }
    } catch (e) {
      toast.error("Failed to update status");
    }
  };

  const startQuiz = (conceptId: string) => {
    const versions = QUIZZES[conceptId];
    if (!versions || versions.length === 0) {
      toast.error("No quiz available for this concept yet");
      return;
    }
    const randomVersion = versions[Math.floor(Math.random() * versions.length)];
    setActiveQuiz({
      conceptId,
      version: randomVersion.version,
      questions: randomVersion.questions,
      currentIndex: 0,
      answers: [],
    });
  };

  const answerQuestion = (selectedIndex: number) => {
    if (!activeQuiz) return;
    const question = activeQuiz.questions[activeQuiz.currentIndex];
    const correct = selectedIndex === question.correctIndex;
    const newAnswers = [...activeQuiz.answers, { selected: selectedIndex, correct }];

    if (activeQuiz.currentIndex + 1 >= activeQuiz.questions.length) {
      // Quiz complete
      const score = newAnswers.filter((a) => a.correct).length;
      const total = activeQuiz.questions.length;
      finishQuiz(activeQuiz.conceptId, activeQuiz.version, score, total, newAnswers);
    } else {
      setActiveQuiz({ ...activeQuiz, currentIndex: activeQuiz.currentIndex + 1, answers: newAnswers });
    }
  };

  const finishQuiz = async (
    conceptId: string,
    version: number,
    score: number,
    total: number,
    answers: { selected: number; correct: boolean }[]
  ) => {
    if (user) {
      try {
        await saveQuizAttempt(user.uid, {
          conceptId,
          version,
          score,
          totalQuestions: total,
          answers: answers.map((a, i) => ({
            questionIndex: i,
            selectedIndex: a.selected,
            correct: a.correct,
          })),
        });
        toast.success(`Quiz complete! ${score}/${total}`);
        loadData();
      } catch (e) {
        toast.error("Failed to save quiz result");
      }
    }
    setActiveQuiz(null);
  };

  const handleDismissSuggestion = async (id: string) => {
    if (!user) return;
    try {
      await dismissSuggestion(user.uid, id);
      setSuggestions((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
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

  // Quiz overlay
  if (activeQuiz) {
    const q = activeQuiz.questions[activeQuiz.currentIndex];
    const progress = `${activeQuiz.currentIndex + 1} / ${activeQuiz.questions.length}`;
    return (
      <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Quiz {progress}</span>
          <Button variant="ghost" size="sm" onClick={() => setActiveQuiz(null)} className="h-8 text-xs">
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

  return (
    <div className="flex flex-col flex-1 px-4 pt-6 pb-4 gap-4 max-w-lg mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-foreground">Concepts</h1>
        <span className="text-xs font-medium text-muted-foreground">
          {CONCEPTS.length} topics
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {CONCEPTS.map((concept) => {
          const status = progressMap[concept.id] || "still-learning";
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
