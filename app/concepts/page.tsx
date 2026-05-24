"use client";

import { useEffect, useState, useCallback } from "react";
import { BookOpen, ChevronDown, Loader2, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/components/auth/AuthProvider";
import { getConceptProgress, setConceptProgress } from "@/lib/db";
import { CONCEPTS } from "@/lib/concepts-data";
import { ConceptProgress, ConceptStatus } from "@/types";
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
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadProgress = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const progress = await getConceptProgress(user.uid);
      const map: Record<string, ConceptStatus> = {};
      for (const p of progress) {
        map[p.conceptId] = p.status;
      }
      setProgressMap(map);
    } catch (e: any) {
      console.error("Failed to load concept progress:", e);
      toast.error("Failed to load progress");
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

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
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {concept.category}
                    </span>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${STATUS_COLORS[status]}`}
                    >
                      {STATUS_LABELS[status]}
                    </span>
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

                    {/* Status selector */}
                    <div className="flex flex-col gap-2 pt-2">
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
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
