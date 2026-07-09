"use client";

import Link from "next/link";
import { Star, Users, GitFork, ArrowUpRight } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import type { GithubStats } from "@/lib/github";

export function GithubSummaryWidget() {
  const { data, loading, error, warning, refetch } = useFetch<GithubStats>("/api/github/stats");

  return (
    <Card>
      <CardHeader>
        <CardTitle>GitHub</CardTitle>
        <Link href="/github" className="flex items-center gap-1 text-xs text-muted hover:text-accent">
          Full stats <ArrowUpRight size={12} />
        </Link>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-20 w-full" />}
        {error && <ErrorState message={error} onRetry={() => refetch()} />}
        {data && (
          <>
            {warning && <p className="mb-2 text-xs text-warn">{warning}</p>}
            <div className="grid grid-cols-3 gap-3">
              <Stat icon={<GitFork size={14} />} value={data.publicRepos} label="Repos" />
              <Stat icon={<Star size={14} />} value={data.totalStars} label="Stars" />
              <Stat icon={<Users size={14} />} value={data.followers} label="Followers" />
            </div>
            <p className="mt-3 text-xs text-muted">
              <span className="font-data text-foreground">{data.totalContributionsLastYear}</span>{" "}
              contributions in the last year
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="rounded-lg bg-surface-2 p-2.5">
      <div className="flex items-center gap-1.5 text-muted">{icon}</div>
      <p className="font-data mt-1 text-lg font-semibold leading-none">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
