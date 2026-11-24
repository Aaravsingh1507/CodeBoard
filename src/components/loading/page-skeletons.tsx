"use client";

import React from "react";
import {
  RefreshCw,
  GitBranch,
  Calendar,
  Layers,
  Sparkles,
  Users,
  Briefcase,
  Target,
  BarChart3,
  CheckCircle2,
  Trophy,
} from "lucide-react";

/* ========================================================================= */
/* 1. GITHUB LOADING SKELETON                                                */
/* ========================================================================= */
export function GithubLoadingSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in w-full min-w-0 select-none">
      {/* Live Sync Pill */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-400/30 bg-indigo-500/10 backdrop-blur-xl text-indigo-300 text-xs font-medium shadow-[0_0_20px_rgba(99,102,241,0.15)] animate-pulse">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-400" />
          <span>Syncing real-time GitHub activity & repositories...</span>
        </div>
      </div>

      {/* Heatmap Card Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4 animate-glass-sheen">
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-indigo-500/15 blur-3xl animate-pulse" />
        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="h-4 w-36 rounded bg-white/[0.12] animate-pulse" />
            <div className="h-3 w-48 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="h-4 w-28 rounded bg-white/[0.08] animate-pulse" />
        </div>
        {/* Heatmap Tiles Placeholder */}
        <div className="relative z-10 h-32 w-full rounded-xl bg-black/40 dark:bg-black/60 border border-white/[0.06] flex items-center justify-center overflow-hidden p-3">
          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 w-full h-full opacity-60">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="rounded-sm bg-indigo-500/20 animate-pulse"
                style={{ animationDelay: `${(i % 12) * 80}ms` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 2-Column Grid Skeletons */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 min-w-0 w-full items-stretch">
        {/* Languages Card Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="h-4 w-32 rounded bg-white/[0.12] animate-pulse" />
            <div className="h-3 w-16 rounded bg-white/[0.06] animate-pulse" />
          </div>
          {/* Progress bar shimmer */}
          <div className="h-3 w-full rounded-full bg-black/50 overflow-hidden flex gap-1 p-0.5">
            <div className="h-full w-1/2 rounded-full bg-cyan-500/40 animate-pulse" />
            <div className="h-full w-1/4 rounded-full bg-purple-500/40 animate-pulse" />
            <div className="h-full w-1/4 rounded-full bg-amber-500/40 animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-white/[0.02] border border-white/[0.05]">
                <div className="h-2.5 w-2.5 rounded-full bg-white/20 animate-pulse" />
                <div className="h-3 w-20 rounded bg-white/[0.08] animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Profile Stats Skeleton */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <div className="h-4 w-36 rounded bg-white/[0.12] animate-pulse" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] text-center space-y-1.5">
                <div className="h-5 w-8 rounded bg-white/[0.12] mx-auto animate-pulse" />
                <div className="h-2.5 w-14 rounded bg-white/[0.06] mx-auto animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. GOALS LOADING SKELETON                                                 */
/* ========================================================================= */
export function GoalsLoadingSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in w-full min-w-0 select-none">
      {/* Live Sync Pill */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-purple-400/30 bg-purple-500/10 backdrop-blur-xl text-purple-300 text-xs font-medium shadow-[0_0_20px_rgba(168,85,247,0.15)] animate-pulse">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-purple-400" />
          <span>Synchronizing goal progress & deadlines...</span>
        </div>
      </div>

      {/* Banner Skeleton */}
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-4 flex items-center gap-3">
        <div className="h-8 w-8 rounded-xl bg-purple-500/20 border border-purple-400/30 animate-pulse" />
        <div className="space-y-1.5 flex-1">
          <div className="h-3.5 w-48 rounded bg-white/[0.1] animate-pulse" />
          <div className="h-3 w-72 max-w-full rounded bg-white/[0.05] animate-pulse" />
        </div>
      </div>

      {/* 2x2 Goals Grid Skeletons */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_10px_30px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-3.5"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-1.5 flex-1">
                <div className="h-4 w-44 rounded bg-white/[0.12] animate-pulse" />
                <div className="h-3 w-28 rounded bg-white/[0.06] animate-pulse" />
              </div>
              <div className="h-5 w-16 rounded-full bg-white/[0.08] animate-pulse" />
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <div className="h-3 w-16 rounded bg-white/[0.08] animate-pulse" />
              <div className="h-3 w-20 rounded bg-white/[0.08] animate-pulse" />
            </div>

            <div className="h-2 w-full rounded-full bg-black/60 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500/40 to-indigo-500/30 animate-pulse"
                style={{ width: `${(i * 22) % 80 + 15}%` }}
              />
            </div>

            <div className="h-3 w-40 rounded bg-white/[0.05] animate-pulse pt-1" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 3. APPLICATIONS LOADING SKELETON                                          */
/* ========================================================================= */
export function ApplicationsLoadingSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in w-full min-w-0 select-none">
      {/* Live Sync Pill */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 backdrop-blur-xl text-blue-300 text-xs font-medium shadow-[0_0_20px_rgba(59,130,246,0.15)] animate-pulse">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-400" />
          <span>Loading job applications & stages...</span>
        </div>
      </div>

      {/* Kanban Column Skeletons */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {["Wishlist", "Applied", "Online Assessment", "Interview", "Offer", "Archived"].map((col, idx) => (
          <div
            key={col}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl p-3.5 sm:p-4 space-y-3"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-white/30 animate-pulse" />
                <span className="text-xs font-semibold text-slate-300">{col}</span>
              </div>
              <div className="h-4 w-6 rounded bg-white/[0.08] animate-pulse" />
            </div>

            {/* Application Cards in Column */}
            <div className="space-y-2.5">
              {[1, 2].map((cardIdx) => (
                <div
                  key={cardIdx}
                  className="rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md p-3 space-y-2 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-3.5 w-24 rounded bg-white/[0.12] animate-pulse" />
                    <div className="h-4 w-12 rounded bg-white/[0.06] animate-pulse" />
                  </div>
                  <div className="h-3 w-36 rounded bg-white/[0.06] animate-pulse" />
                  <div className="flex items-center justify-between text-[11px] pt-1">
                    <div className="h-2.5 w-16 rounded bg-white/[0.05] animate-pulse" />
                    <div className="h-2.5 w-12 rounded bg-white/[0.05] animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 4. CIRCLES LOADING SKELETON                                               */
/* ========================================================================= */
export function CirclesLoadingSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in w-full min-w-0 select-none">
      {/* Live Sync Pill */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-400/30 bg-teal-500/10 backdrop-blur-xl text-teal-300 text-xs font-medium shadow-[0_0_20px_rgba(20,184,166,0.15)] animate-pulse">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-teal-400" />
          <span>Synchronizing accountability circles & batchmates...</span>
        </div>
      </div>

      {/* Circle Cards Skeleton */}
      {[1, 2].map((c) => (
        <div
          key={c}
          className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="space-y-1.5">
              <div className="h-4 w-32 rounded bg-white/[0.12] animate-pulse" />
              <div className="h-3 w-44 rounded bg-white/[0.06] animate-pulse" />
            </div>
            <div className="h-7 w-20 rounded-xl bg-white/[0.06] animate-pulse" />
          </div>

          {/* Member Rows */}
          <div className="space-y-2.5">
            {[1, 2, 3].map((m) => (
              <div
                key={m}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="h-2 w-2 rounded-full bg-emerald-400/50 animate-pulse" />
                  <div className="h-7 w-7 rounded-full bg-white/[0.1] animate-pulse" />
                  <div className="h-3.5 w-28 rounded bg-white/[0.08] animate-pulse" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-3 w-16 rounded bg-white/[0.06] animate-pulse" />
                  <div className="h-3 w-16 rounded bg-white/[0.06] animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ========================================================================= */
/* 5. REVIEWS LOADING SKELETON                                               */
/* ========================================================================= */
export function ReviewsLoadingSkeleton() {
  return (
    <div className="space-y-5 animate-fade-in w-full min-w-0 select-none">
      {/* Live Sync Pill */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/30 bg-amber-500/10 backdrop-blur-xl text-amber-300 text-xs font-medium shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-pulse">
          <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
          <span>Synthesizing AI weekly performance review...</span>
        </div>
      </div>

      {/* Review Card Skeleton */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4 animate-glass-sheen">
        <div className="pointer-events-none absolute -left-10 -top-10 h-36 w-36 rounded-full bg-amber-500/15 blur-3xl animate-pulse" />

        <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="space-y-1.5">
            <div className="h-4 w-40 rounded bg-white/[0.12] animate-pulse" />
            <div className="h-3 w-28 rounded bg-white/[0.06] animate-pulse" />
          </div>
          <div className="h-6 w-24 rounded-full bg-amber-500/20 border border-amber-400/30 animate-pulse" />
        </div>

        {/* Narrative Shimmer */}
        <div className="relative z-10 space-y-2 py-2">
          <div className="h-3.5 w-full rounded bg-white/[0.08] animate-pulse" />
          <div className="h-3.5 w-5/6 rounded bg-white/[0.07] animate-pulse" />
          <div className="h-3.5 w-4/6 rounded bg-white/[0.06] animate-pulse" />
        </div>

        {/* 2-Column Strengths & Focus Shimmer */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="h-3.5 w-24 rounded bg-emerald-400/20 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded bg-white/[0.06] animate-pulse" />
              <div className="h-3 w-4/5 rounded bg-white/[0.06] animate-pulse" />
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-2">
            <div className="h-3.5 w-24 rounded bg-amber-400/20 animate-pulse" />
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded bg-white/[0.06] animate-pulse" />
              <div className="h-3 w-4/5 rounded bg-white/[0.06] animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
