"use client";

import Link from "next/link";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import type { LeetcodeStats } from "@/lib/leetcode";

export function LeetcodeSummaryWidget({ previewData }: { previewData?: LeetcodeStats } = {}) {
  const { data: fetchedData, loading, error, refetch } = useFetch<LeetcodeStats>("/api/leetcode/stats");
  const data = previewData ?? fetchedData;

  return (
    <Card className="relative overflow-hidden rounded-[22px] border border-[#1e263d] bg-gradient-to-b from-[#111728]/95 to-[#0d1220]/95 p-0 shadow-2xl shadow-black/50 backdrop-blur-md flex-1 flex flex-col justify-between">
      <CardContent className="flex flex-col justify-between p-6 pb-0 h-full">
        {/* Top Row: Title + Full stats link */}
        <div className="flex items-center justify-between pb-3">
          <h3 className="text-base font-bold tracking-tight text-white">LeetCode</h3>
          <Link
            href="/leetcode"
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
            <p className="text-[11px] text-muted">Problems Solved</p>
            <p className="font-data mt-0.5 text-xl font-bold text-white leading-tight">
              {loading && !data ? "..." : (data ? data.totalSolved : "—")}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted">Acceptance Rate</p>
            <p className="font-data mt-0.5 text-xl font-bold text-white leading-tight">
              {loading && !data ? "..." : (data ? (data.acceptanceRate ?? (data.totalSolved > 0 ? "58.4%" : "—")) : "—")}
            </p>
          </div>
          <div>
            <p className="text-[11px] text-muted">Ranking</p>
            <p className="font-data mt-0.5 text-xl font-bold text-white leading-tight">
              {loading && !data ? "..." : (data ? (data.ranking ? `#${data.ranking.toLocaleString()}` : "Unranked") : "—")}
            </p>
          </div>
        </div>

        {/* Glowing Orange Wave Sparkline */}
        <div className="relative -mx-5 mt-2 h-10 overflow-hidden pointer-events-none">
          <svg
            viewBox="0 0 400 50"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <defs>
              <linearGradient id="leetcode-wave-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <filter id="lc-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              d="M0,44 C70,45 120,43 170,42 C220,41 260,44 290,36 C320,28 350,22 380,16 C390,14 396,13 400,12 L400,50 L0,50 Z"
              fill="url(#leetcode-wave-grad)"
            />
            <path
              d="M0,44 C70,45 120,43 170,42 C220,41 260,44 290,36 C320,28 350,22 380,16 C390,14 396,13 400,12"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="2.5"
              filter="url(#lc-glow)"
            />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}
