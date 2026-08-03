"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressRing } from "@/components/progress-ring";
import type { LeetcodeStats } from "@/lib/leetcode";

export function LeetcodeSummaryWidget() {
  const { data, loading, error, warning, refetch } = useFetch<LeetcodeStats>("/api/leetcode/stats");

  const notConfigured = error?.includes("No LeetCode username");

  return (
    <Card>
      <CardHeader>
        <CardTitle>LeetCode</CardTitle>
        <Link href="/leetcode" className="flex items-center gap-1 text-xs text-muted hover:text-accent">
          Full stats <ArrowUpRight size={12} />
        </Link>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-20 w-full" />}
        {error && !notConfigured && <ErrorState message={error} onRetry={() => refetch()} />}
        {notConfigured && (
          <EmptyState
            title="No LeetCode username set"
            description="Add your username in Settings to see solved counts."
          />
        )}
        {data && (
          <>
            {warning && <p className="mb-2 text-xs text-warn">{warning}</p>}
            <div className="flex items-center gap-6">
              <ProgressRing value={data.totalSolved} max={Math.max(data.totalSolved, 500)} label="solved" color="var(--accent-2)" size={96} />
              <div className="space-y-1 text-sm">
                <Row label="Easy" value={data.easySolved} tone="text-accent-2" />
                <Row label="Medium" value={data.mediumSolved} tone="text-warn" />
                <Row label="Hard" value={data.hardSolved} tone="text-danger" />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Row({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-1.5 w-1.5 rounded-full ${tone.replace("text-", "bg-")}`} />
      <span className="text-muted">{label}</span>
      <span className="font-data text-foreground">{value}</span>
    </div>
  );
}
