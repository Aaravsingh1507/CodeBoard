"use client";

import { AlertCircle, Sparkles } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";

interface Readiness {
  score: number;
  breakdown: { label: string; score: number; max: number; detail: string }[];
  focusArea: string;
  nudges: string[];
}

function scoreColor(score: number) {
  if (score >= 75) return "var(--accent-2)";
  if (score >= 45) return "var(--warn)";
  return "var(--danger)";
}

function scoreLabel(score: number) {
  if (score >= 85) return "Strong shape";
  if (score >= 65) return "On track";
  if (score >= 40) return "Building momentum";
  return "Just getting started";
}

export function ReadinessWidget() {
  const { data, loading, error, refetch } = useFetch<Readiness>("/api/readiness");

  if (loading) return <Skeleton className="h-48 w-full" />;
  if (error) return <ErrorState message={error} onRetry={() => refetch()} />;
  if (!data) return null;

  const circumference = 2 * Math.PI * 54;
  const offset = circumference * (1 - data.score / 100);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative mx-auto flex h-32 w-32 shrink-0 items-center justify-center sm:mx-0">
            <svg width={128} height={128} className="-rotate-90">
              <circle cx={64} cy={64} r={54} fill="none" stroke="var(--surface-2)" strokeWidth={10} />
              <circle
                cx={64}
                cy={64}
                r={54}
                fill="none"
                stroke={scoreColor(data.score)}
                strokeWidth={10}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="font-data text-3xl font-bold">{data.score}</span>
              <span className="text-[10px] text-muted">/ 100</span>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">
              Readiness score — {scoreLabel(data.score)}
            </p>
            <p className="mt-1 text-xs text-muted">
              Focus area right now: <span className="text-foreground">{data.focusArea}</span>
            </p>

            <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-4">
              {data.breakdown.map((b) => (
                <div key={b.label}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted">{b.label}</span>
                    <span className="font-data text-foreground">{b.score}/{b.max}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${(b.score / b.max) * 100}%`,
                        background: scoreColor((b.score / b.max) * 100),
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {data.nudges.length > 0 && (
          <div className="mt-4 space-y-1.5 border-t border-border pt-4">
            {data.nudges.map((n, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-muted">
                <AlertCircle size={13} className="mt-0.5 shrink-0 text-warn" />
                {n}
              </div>
            ))}
          </div>
        )}
        {data.nudges.length === 0 && (
          <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-accent-2">
            <Sparkles size={13} /> No red flags this week — keep it up.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
