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

          <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_18px_44px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)]">
            {/* Ambient Cyan Glass Glow */}
            <div className="pointer-events-none absolute -right-10 -bottom-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <h3 className="text-base font-bold text-white">Recent submissions</h3>
            </div>
            <div className="relative z-10 pt-2">
              {data.recentSubmissions.length === 0 ? (
                <EmptyState title="No submissions yet" description="Solve a problem on LeetCode to see it here." />
              ) : (
                <ul className="divide-y divide-white/[0.06]">
                  {data.recentSubmissions.map((s, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5 text-xs sm:text-sm gap-2 hover:bg-white/[0.03] px-2 -mx-2 rounded-lg transition-colors">
                      <span className="text-white font-medium truncate min-w-0 flex-1">{s.title}</span>
                      <span className="shrink-0">
                        <Badge tone={STATUS_TONE[s.status] ?? "neutral"}>{s.status}</Badge>
                      </span>
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
