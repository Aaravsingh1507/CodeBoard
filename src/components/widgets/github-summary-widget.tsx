"use client";

import Link from "next/link";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import type { GithubStats } from "@/lib/github";

export function GithubSummaryWidget({ previewData }: { previewData?: GithubStats } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<GithubStats>("/api/github/stats");
  const data = previewData ?? fetchedData;

  return (
    <Card className="relative overflow-hidden rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-0 shadow-2xl shadow-black/50 backdrop-blur-md flex-1 flex flex-col justify-between">
      <CardContent className="flex flex-col justify-between p-6 pb-0 h-full">
        {/* Top Row: Title + Full stats link */}
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-base font-bold tracking-tight text-white">GitHub</h3>
          <Link
            href="/github"
            className="flex items-center gap-1 text-xs font-medium text-slate-400 transition-colors hover:text-white"
          >
            <span>Full stats</span>
            <span className="text-xs">↗</span>
          </Link>
        </div>

        {!previewData && loading && <Skeleton className="my-3 h-12 w-full rounded-xl" />}
        {!previewData && error && !data && (
          <div className="my-2">
            <ErrorState message={error} onRetry={() => refetch()} />
          </div>
        )}

        {/* 3 Stat Numbers */}
        <div className="relative z-10 mt-3 grid grid-cols-3 gap-2">
          <div>
            <p className="text-[11px] text-muted">Repos</p>
            <p className="font-data mt-0.5 text-xl font-bold text-white leading-tight">
              {loading && !data ? "..." : (data ? data.publicRepos : "—")}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted">Contributions</p>
            <p className="font-data mt-0.5 text-xl font-bold text-white leading-tight">
              {loading && !data ? "..." : (data ? data.totalContributionsLastYear : "—")}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted">Followers</p>
            <p className="font-data mt-0.5 text-xl font-bold text-white leading-tight">
              {loading && !data ? "..." : (data ? data.followers : "—")}
            </p>
          </div>
        </div>

        {/* Glowing Purple Wave Sparkline */}
        <div className="relative -mx-5 mt-2 h-10 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 400 50"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="github-wave-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
              <filter id="github-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,42 C50,40 90,43 130,37 C170,31 210,30 250,34 C290,37 320,24 355,14 C375,8 390,9 400,12 L400,50 L0,50 Z"
              fill="url(#github-wave-grad)"
            />
            <path
              d="M0,42 C50,40 90,43 130,37 C170,31 210,30 250,34 C290,37 320,24 355,14 C375,8 390,9 400,12"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2.5"
              filter="url(#github-glow)"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
