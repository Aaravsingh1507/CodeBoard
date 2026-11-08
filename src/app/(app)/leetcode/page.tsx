"use client";

import { RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LeetcodeStatsBanner } from "@/components/leetcode/leetcode-stats-banner";
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

          <LeetcodeStatsBanner
            totalSolved={data.totalSolved}
            easySolved={data.easySolved}
            mediumSolved={data.mediumSolved}
            hardSolved={data.hardSolved}
            ranking={data.ranking}
            loading={loading}
          />

          <Card>
            <CardHeader>
              <CardTitle>Topic coverage</CardTitle>
            </CardHeader>
            <CardContent>
              <TopicBreakdown topics={data.topicBreakdown ?? []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent submissions</CardTitle>
            </CardHeader>
            <CardContent>
              {data.recentSubmissions.length === 0 ? (
                <EmptyState title="No submissions yet" description="Solve a problem on LeetCode to see it here." />
              ) : (
                <ul className="divide-y divide-border">
                  {data.recentSubmissions.map((s, i) => (
                    <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                      <span className="text-foreground">{s.title}</span>
                      <Badge tone={STATUS_TONE[s.status] ?? "neutral"}>{s.status}</Badge>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
