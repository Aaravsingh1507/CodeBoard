"use client";

import { RefreshCw } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressRing } from "@/components/progress-ring";
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
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">LeetCode</h1>
          <p className="mt-1 text-sm text-muted">Solved problems and recent submissions.</p>
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

          <Card>
            <CardContent className="flex flex-col items-center gap-6 py-6 sm:flex-row sm:justify-around">
              <ProgressRing
                value={data.totalSolved}
                max={Math.max(data.totalSolved, 500)}
                label="total solved"
                color="var(--accent-2)"
                size={140}
              />
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <p className="font-data text-2xl font-semibold text-accent-2">{data.easySolved}</p>
                  <p className="text-xs text-muted">Easy</p>
                </div>
                <div>
                  <p className="font-data text-2xl font-semibold text-warn">{data.mediumSolved}</p>
                  <p className="text-xs text-muted">Medium</p>
                </div>
                <div>
                  <p className="font-data text-2xl font-semibold text-danger">{data.hardSolved}</p>
                  <p className="text-xs text-muted">Hard</p>
                </div>
              </div>
              {data.ranking && (
                <div className="text-center">
                  <p className="font-data text-2xl font-semibold">#{data.ranking.toLocaleString()}</p>
                  <p className="text-xs text-muted">Global ranking</p>
                </div>
              )}
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
