"use client";

import React from "react";
import { RefreshCw, Code2, BarChart2, Trophy, Layers } from "lucide-react";

export function LeetcodeLoadingSkeleton() {
  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in w-full min-w-0 select-none">
      {/* ── Status Pill: Live Sync Indicator ── */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-400/30 bg-cyan-500/10 backdrop-blur-xl text-cyan-300 text-xs font-medium shadow-[0_0_20px_rgba(6,182,212,0.15)] animate-pulse">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-cyan-400" />
          <span>Syncing real-time LeetCode statistics...</span>
        </div>
      </div>

      {/* ── 1. Top 3 Glassmorphic Stat Cards Skeletons ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Card 1: Total Solved Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-500/15 blur-2xl animate-pulse" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-white/[0.08] animate-pulse" />
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 backdrop-blur-md animate-pulse">
              <Code2 className="h-4 w-4 opacity-70" />
            </div>
          </div>
          <div className="relative z-10 mt-3 sm:mt-4 flex items-baseline gap-2">
            <div className="h-9 w-24 rounded-lg bg-white/[0.12] animate-pulse" />
            <div className="h-3 w-12 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
            <div className="h-3 w-24 rounded bg-white/[0.06] animate-pulse" />
            <div className="h-3 w-10 rounded bg-white/[0.1] animate-pulse" />
          </div>
        </div>

        {/* Card 2: Difficulty Breakdown Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-purple-500/15 blur-2xl animate-pulse" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="h-3 w-16 rounded bg-white/[0.08] animate-pulse" />
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 backdrop-blur-md animate-pulse">
              <BarChart2 className="h-4 w-4 opacity-70" />
            </div>
          </div>
          <div className="relative z-10 mt-3 space-y-2.5">
            {/* Easy row */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="h-2.5 w-12 rounded bg-emerald-500/25 animate-pulse" />
                <div className="h-2.5 w-6 rounded bg-white/[0.08] animate-pulse" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 overflow-hidden">
                <div className="h-full w-2/5 rounded-full bg-gradient-to-r from-emerald-500/40 to-teal-400/30 animate-pulse" />
              </div>
            </div>
            {/* Medium row */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="h-2.5 w-14 rounded bg-amber-500/25 animate-pulse" />
                <div className="h-2.5 w-6 rounded bg-white/[0.08] animate-pulse" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 overflow-hidden">
                <div className="h-full w-3/5 rounded-full bg-gradient-to-r from-amber-500/40 to-yellow-400/30 animate-pulse" />
              </div>
            </div>
            {/* Hard row */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <div className="h-2.5 w-10 rounded bg-rose-500/25 animate-pulse" />
                <div className="h-2.5 w-6 rounded bg-white/[0.08] animate-pulse" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 overflow-hidden">
                <div className="h-full w-1/5 rounded-full bg-gradient-to-r from-rose-500/40 to-pink-500/30 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Global Ranking Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)]">
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-500/15 blur-2xl animate-pulse" />
          <div className="relative z-10 flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-white/[0.08] animate-pulse" />
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 backdrop-blur-md animate-pulse">
              <Trophy className="h-4 w-4 opacity-70" />
            </div>
          </div>
          <div className="relative z-10 mt-3 sm:mt-4 flex items-baseline gap-2">
            <div className="h-9 w-28 rounded-lg bg-white/[0.12] animate-pulse" />
          </div>
          <div className="relative z-10 mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
            <div className="h-3 w-16 rounded bg-white/[0.06] animate-pulse" />
            <div className="h-3 w-20 rounded bg-white/[0.1] animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── 2. Topic Distribution Card Skeleton ── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_16px_44px_0_rgba(0,0,0,0.75),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4 sm:space-y-5 animate-glass-sheen">
        <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />

        {/* Header Skeleton */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 border border-purple-400/30 text-purple-300 backdrop-blur-md animate-pulse">
              <Layers className="h-4 w-4 opacity-70" />
            </div>
            <div className="space-y-1.5 min-w-0">
              <div className="h-4 w-36 rounded bg-white/[0.12] animate-pulse" />
              <div className="h-3 w-64 max-w-full rounded bg-white/[0.06] animate-pulse" />
            </div>
          </div>

          {/* Filter Pills Skeleton */}
          <div className="w-fit max-w-full shrink-0 flex items-center gap-1.5 p-1 rounded-xl bg-black/40 dark:bg-black/50 border border-white/[0.08]">
            <div className="h-7 w-12 rounded-lg bg-white/[0.1] animate-pulse" />
            <div className="h-7 w-24 rounded-lg bg-white/[0.06] animate-pulse" />
            <div className="h-7 w-24 rounded-lg bg-white/[0.06] animate-pulse" />
            <div className="h-7 w-20 rounded-lg bg-white/[0.06] animate-pulse" />
          </div>
        </div>

        {/* Topic Grid Items Skeleton */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md p-3 sm:p-3.5"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-3.5 w-24 rounded bg-white/[0.1] animate-pulse" />
                  <div className="h-4 w-16 rounded-md bg-white/[0.06] animate-pulse" />
                </div>
                <div className="h-3 w-12 rounded bg-white/[0.08] animate-pulse" />
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-purple-500/30 to-cyan-500/30 animate-pulse"
                  style={{ width: `${60 - idx * 8}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. Recent Submissions Card Skeleton ── */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_12px_36px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.15)]">
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="h-4 w-36 rounded bg-white/[0.12] animate-pulse" />
        </div>
        <div className="relative z-10 pt-2 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center justify-between py-2 gap-3">
              <div className="h-3.5 w-48 max-w-[60%] rounded bg-white/[0.08] animate-pulse" />
              <div className="h-5 w-18 rounded-md bg-emerald-500/20 border border-emerald-400/30 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

