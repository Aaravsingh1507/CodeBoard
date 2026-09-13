"use client";

import { useState } from "react";
import { Sparkles, Lightbulb, TrendingUp } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface Review {
  id: string;
  weekStart: string;
  weekEnd: string;
  summaryText: string;
  observations: string[];
  suggestions: string[];
  generatedAt: string;
}

export default function ReviewsPage() {
  const { data, loading, error, refetch } = useFetch<Review[]>("/api/reviews");
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);

  async function generateNow() {
    setGenerating(true);
    setGenError(null);
    const res = await fetch("/api/reviews/generate", { method: "POST" });
    setGenerating(false);
    if (!res.ok) {
      const json = await res.json();
      setGenError(json.error ?? "Failed to generate review.");
      return;
    }
    refetch();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">AI weekly reviews</h1>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">
            A short, honest look back — generated automatically every Sunday night, or on demand.
          </p>
        </div>
        <Button onClick={generateNow} disabled={generating}>
          <Sparkles size={15} className={generating ? "animate-pulse" : ""} />
          {generating ? "Generating…" : "Generate this week's review"}
        </Button>
      </div>

      {genError && (
        <p className="mb-4 rounded-lg bg-danger/10 px-3 py-2 text-sm text-danger">{genError}</p>
      )}

      {loading && <Skeleton className="h-40 w-full" />}
      {error && <ErrorState message={error} onRetry={() => refetch()} />}
      {data && data.length === 0 && (
        <EmptyState
          icon={<Sparkles size={20} />}
          title="No reviews yet"
          description="Generate your first weekly review — it summarizes your GitHub, LeetCode, streak, and application activity."
          action={
            <Button size="sm" onClick={generateNow} disabled={generating}>
              <Sparkles size={14} /> Generate now
            </Button>
          }
        />
      )}

      <div className="space-y-4">
        {(data ?? []).map((r) => (
          <Card key={r.id} className="p-5">
            <p className="mb-2 text-xs text-muted">
              Week of {formatDate(r.weekStart)} – {formatDate(r.weekEnd)} · generated{" "}
              {formatDate(r.generatedAt)}
            </p>
            <p className="text-sm text-foreground leading-relaxed">{r.summaryText}</p>

            {r.observations.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border/60">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200">
                  <TrendingUp size={13} className="text-teal-600 dark:text-accent-2" /> Observations
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {r.observations.map((o, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-muted shrink-0 mt-0.5">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {r.suggestions.length > 0 && (
              <div className="mt-4 pt-3 border-t border-border/60">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200">
                  <Lightbulb size={13} className="text-amber-600 dark:text-warn" /> For next week
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                  {r.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 leading-relaxed">
                      <span className="text-muted shrink-0 mt-0.5">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
