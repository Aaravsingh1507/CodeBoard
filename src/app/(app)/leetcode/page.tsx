"use client";

import { RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TopicBreakdown } from "@/components/topic-breakdown";
import type { LeetcodeStats } from "@/lib/leetcode";

const STATUS_TONE: Record<string, "success" | "danger" | "neutral"> = {
  Accepted: "success",
  "Wrong Answer": "danger",
  "Time Limit Exceeded": "danger",
};

export default function LeetcodePage() {
  const { data, loading, error, warning, refetch } = useFetch<LeetcodeStats>("/api/leetcode/stats");
  const notConfigured = error?.includes("No LeetCode username");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">LeetCode</h1>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">Solved problems and recent submissions.</p>
        </div>
        <Button variant="secondary" size="sm" onClick={() => refetch({ force: true })} disabled={loading}>
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      {loading && <Skeleton className="h-48 w-full" />}
      {error && !notConfigured && <ErrorState message={error} onRetry={() => refetch()} />}
      {notConfigured && (
        <EmptyState
          title="No LeetCode username set"
          description="Add your username in Settings to start tracking solved problems."
        />
      )}

      {data && (
        <div className="space-y-5">
          {warning && <p className="rounded-lg bg-warn/10 px-3 py-2 text-xs text-warn">{warning}</p>}

          <TopicBreakdown
            topics={data.topicBreakdown ?? []}
            totalSolved={data.totalSolved}
            easySolved={data.easySolved}
            mediumSolved={data.mediumSolved}
            hardSolved={data.hardSolved}
            ranking={data.ranking}
            acceptanceRate={data.acceptanceRate}
            loading={loading}
          />

          <div className="rounded-2xl border border-slate-800/90 dark:border-white/[0.08] dark:bg-[#060913] bg-slate-900/95 p-5 sm:p-6 shadow-[0_14px_36px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06),inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-200 hover:border-white/15 hover:shadow-[0_18px_44px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.1),inset_0_1px_0_rgba(255,255,255,0.12)]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 dark:border-white/[0.06]">
              <h3 className="text-base font-bold text-white">Recent submissions</h3>
            </div>
            <div className="pt-3">
              {data.recentSubmissions.length === 0 ? (
                <EmptyState title="No submissions yet" description="Solve a problem on LeetCode to see it here." />
              ) : (
                <ul className="divide-y divide-slate-800/80 dark:divide-white/[0.06]">
                  {data.recentSubmissions.map((s, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-white font-medium">{s.title}</span>
                      <Badge tone={STATUS_TONE[s.status] ?? "neutral"}>{s.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
