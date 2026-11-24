"use client";

import React, { useState, useMemo } from "react";
import {
  Code2,
  BarChart2,
  Trophy,
  Layers,
  Award,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface TopicItem {
  tag: string;
  solved: number;
  level: "fundamental" | "intermediate" | "advanced";
}

export interface TopicBreakdownProps {
  topics?: TopicItem[];
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number | null;
  acceptanceRate?: string;
  loading?: boolean;
}

// Helper to infer category level if not provided by LeetCode API
function inferLevel(tag: string): "fundamental" | "intermediate" | "advanced" {
  const norm = tag.toLowerCase();
  if (
    norm.includes("array") ||
    norm.includes("string") ||
    norm.includes("hash") ||
    norm.includes("math") ||
    norm.includes("sort") ||
    norm.includes("two pointer") ||
    norm.includes("matrix") ||
    norm.includes("simulation")
  ) {
    return "fundamental";
  }
  if (
    norm.includes("dynamic") ||
    norm.includes("dp") ||
    norm.includes("tree") ||
    norm.includes("dfs") ||
    norm.includes("bfs") ||
    norm.includes("binary search") ||
    norm.includes("greedy") ||
    norm.includes("stack") ||
    norm.includes("queue") ||
    norm.includes("heap") ||
    norm.includes("priority") ||
    norm.includes("linked list") ||
    norm.includes("graph") ||
    norm.includes("backtracking") ||
    norm.includes("sliding window")
  ) {
    return "intermediate";
  }
  return "advanced";
}

// Real user verified topics (empty when user has 0 solved)
export const REAL_USER_TOPICS: TopicItem[] = [];

// -----------------------------------------------------------------------------
// Clean & Simple LeetCode Dashboard Component
// -----------------------------------------------------------------------------
export function TopicBreakdown({
  topics: propTopics = [],
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved,
  ranking,
  acceptanceRate = "0.0%",
  loading = false,
}: TopicBreakdownProps) {
  // Use real topics from props directly (strictly real user data)
  const topics = useMemo(() => {
    return propTopics ?? [];
  }, [propTopics]);

  // Active category filter state ('all' | 'fundamental' | 'intermediate' | 'advanced')
  const [activeFilter, setActiveFilter] = useState<
    "all" | "fundamental" | "intermediate" | "advanced"
  >("all");

  const easyCount = easySolved ?? 0;
  const mediumCount = mediumSolved ?? 0;
  const hardCount = hardSolved ?? 0;

  // Real-time user statistics
  const stats = useMemo(() => {
    let fundamentalCount = 0;
    let intermediateCount = 0;
    let advancedCount = 0;

    topics.forEach((t) => {
      const lvl = t.level?.toLowerCase();
      const count = Number(t.solved) || 0;
      if (lvl === "fundamental") fundamentalCount += count;
      else if (lvl === "intermediate") intermediateCount += count;
      else if (lvl === "advanced") advancedCount += count;
      else {
        const inferred = inferLevel(t.tag);
        if (inferred === "fundamental") fundamentalCount += count;
        else if (inferred === "intermediate") intermediateCount += count;
        else advancedCount += count;
      }
    });

    const totalProblems = fundamentalCount + intermediateCount + advancedCount;
    const solvedTopicsList = topics.filter((t) => (Number(t.solved) || 0) > 0);
    const totalTopicsCount = solvedTopicsList.length;

    const fundamentalPct =
      totalProblems > 0 ? ((fundamentalCount / totalProblems) * 100).toFixed(1) : "0.0";
    const intermediatePct =
      totalProblems > 0 ? ((intermediateCount / totalProblems) * 100).toFixed(1) : "0.0";
    const advancedPct =
      totalProblems > 0 ? ((advancedCount / totalProblems) * 100).toFixed(1) : "0.0";

    const sortedSolvedTopics = [...topics]
      .filter((t) => (Number(t.solved) || 0) > 0)
      .sort((a, b) => (Number(b.solved) || 0) - (Number(a.solved) || 0));

    return {
      fundamentalCount,
      intermediateCount,
      advancedCount,
      totalProblems,
      totalTopicsCount,
      fundamentalPct,
      intermediatePct,
      advancedPct,
      top1: sortedSolvedTopics[0] ?? null,
      top2: sortedSolvedTopics[1] ?? null,
      top3: sortedSolvedTopics[2] ?? null,
    };
  }, [topics]);

  // Extract ONLY real-time topics where solved > 0
  const solvedTopics = useMemo(() => {
    return topics
      .filter((t) => (Number(t.solved) || 0) > 0)
      .map((t) => {
        const id = t.tag.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        const level =
          ((t.level?.toLowerCase() as "fundamental" | "intermediate" | "advanced") ||
          inferLevel(t.tag));
        return {
          id,
          name: t.tag,
          level,
          solved: Number(t.solved) || 0,
        };
      })
      .sort((a, b) => b.solved - a.solved);
  }, [topics]);

  // Filter based on active category pill
  const displayColumns = useMemo(() => {
    if (activeFilter === "all") return solvedTopics;
    return solvedTopics.filter((c) => c.level === activeFilter);
  }, [solvedTopics, activeFilter]);

  const displayTotalProblems =
    totalSolved ??
    (stats.totalProblems > 0
      ? stats.totalProblems
      : easyCount + mediumCount + hardCount);

  // Difficulty totals (max goal reference for progress bars)
  const totalDifficulty = easyCount + mediumCount + hardCount;
  const easyPct = totalDifficulty > 0 ? (easyCount / totalDifficulty) * 100 : 0;
  const mediumPct = totalDifficulty > 0 ? (mediumCount / totalDifficulty) * 100 : 0;
  const hardPct = totalDifficulty > 0 ? (hardCount / totalDifficulty) * 100 : 0;

  // Max solved count in current display columns
  const maxSolvedCount = useMemo(() => {
    if (displayColumns.length === 0) return 1;
    return Math.max(...displayColumns.map((c) => c.solved), 1);
  }, [displayColumns]);

  return (
    <div className="space-y-4 sm:space-y-5 select-none w-full min-w-0">
      {/* ===================================================================== */}
      {/* 1. TOP STATS ROW: 3 GLASSMORPHISM CARDS WITH MICRO-ANIMATIONS         */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
        {/* Card 1: Total Solved */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
          {/* Ambient Cyan Glass Glow */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-cyan-500/15 blur-2xl transition-all duration-500 group-hover:bg-cyan-500/25" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Total Solved
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300 border border-cyan-400/30 backdrop-blur-md shadow-[0_0_16px_rgba(6,182,212,0.25)] transition-transform duration-300 group-hover:scale-110">
              <Code2 className="h-4 w-4" />
            </div>
          </div>

          <div className="relative z-10 mt-3 sm:mt-4 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-mono">
              {loading ? "..." : displayTotalProblems}
            </span>
            <span className="text-xs text-slate-400">problems</span>
          </div>

          <div className="relative z-10 mt-3.5 sm:mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
            <span className="text-slate-400">Acceptance Rate</span>
            <span className="font-semibold text-white font-mono">
              {acceptanceRate || "0.0%"}
            </span>
          </div>
        </div>

        {/* Card 2: Difficulty Breakdown */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
          {/* Ambient Purple Glass Glow */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-purple-500/15 blur-2xl transition-all duration-500 group-hover:bg-purple-500/25" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Difficulty
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 border border-purple-400/30 backdrop-blur-md shadow-[0_0_16px_rgba(168,85,247,0.25)] transition-transform duration-300 group-hover:scale-110">
              <BarChart2 className="h-4 w-4" />
            </div>
          </div>

          <div className="relative z-10 mt-3 space-y-2.5">
            {/* Easy */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                  Easy
                </span>
                <span className="font-semibold font-mono text-white">{easyCount}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 border border-white/[0.04] overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.7)] transition-all duration-1000 ease-out"
                  style={{ width: `${easyPct}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
                  Medium
                </span>
                <span className="font-semibold font-mono text-white">{mediumCount}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 border border-white/[0.04] overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.7)] transition-all duration-1000 ease-out"
                  style={{ width: `${mediumPct}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-rose-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.9)]" />
                  Hard
                </span>
                <span className="font-semibold font-mono text-white">{hardCount}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 border border-white/[0.04] overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-rose-500 to-pink-500 shadow-[0_0_10px_rgba(244,63,94,0.7)] transition-all duration-1000 ease-out"
                  style={{ width: `${hardPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Global Ranking */}
        <div className="group relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_0_rgba(0,0,0,0.65),inset_0_1px_1px_0_rgba(255,255,255,0.15)] transition-all duration-300 hover:border-white/20 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.85),inset_0_1px_1px_0_rgba(255,255,255,0.25)] hover:-translate-y-0.5">
          {/* Ambient Amber Glass Glow */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-amber-500/15 blur-2xl transition-all duration-500 group-hover:bg-amber-500/25" />

          <div className="relative z-10 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">
              Global Ranking
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-300 border border-amber-400/30 backdrop-blur-md shadow-[0_0_16px_rgba(245,158,11,0.25)] transition-transform duration-300 group-hover:scale-110">
              <Trophy className="h-4 w-4 animate-[trophy-float_4s_ease-in-out_infinite]" />
            </div>
          </div>

          <div className="relative z-10 mt-3 sm:mt-4 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-mono truncate">
              {loading ? "..." : ranking ? `#${ranking.toLocaleString()}` : "Unranked"}
            </span>
          </div>

          <div className="relative z-10 mt-3.5 sm:mt-4 flex items-center justify-between border-t border-white/[0.08] pt-3 text-xs">
            <span className="text-slate-400">Standing</span>
            <span className="flex items-center gap-1.5 font-medium text-slate-300">
              {ranking ? (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)] animate-pulse" />
                  Active rank
                </>
              ) : (
                "Solve to rank"
              )}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MAIN DSA TOPIC DISTRIBUTION CARD (FULLY MOBILE OPTIMIZED)         */}
      {/* ===================================================================== */}
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] dark:from-[#11192e]/80 dark:via-[#0c1322]/80 dark:to-[#070b14]/90 backdrop-blur-xl p-4 sm:p-6 shadow-[0_16px_44px_0_rgba(0,0,0,0.75),inset_0_1px_1px_0_rgba(255,255,255,0.15)] space-y-4 sm:space-y-5 animate-glass-sheen">
        {/* Soft Ambient Refraction Glow at Top-Left */}
        <div className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full bg-purple-500/10 blur-3xl" />

        {/* Header with Title & Filter Buttons */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/15 text-purple-300 border border-purple-400/30 backdrop-blur-md shadow-[0_0_16px_rgba(168,85,247,0.25)]">
              <Layers className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base font-semibold text-white truncate">Topic Distribution</h2>
              <p className="text-xs text-slate-400 line-clamp-2 lg:line-clamp-none">
                Breakdown of solved DSA patterns across fundamental, intermediate, and advanced categories.
              </p>
            </div>
          </div>

          {/* Filter Pills: shrink-0 and min-w-fit prevent flex from compressing pills; pr-3 ensures last pill is never clipped */}
          <div className="w-fit max-w-full shrink-0 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 pr-2.5 sm:pr-2 rounded-xl bg-black/40 dark:bg-black/50 backdrop-blur-md border border-white/[0.08] shadow-[inset_0_2px_4px_rgba(0,0,0,0.7)]">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer active:scale-95 whitespace-nowrap ${
                activeFilter === "all"
                  ? "bg-white/[0.15] text-white border border-white/20 shadow-[0_2px_10px_rgba(255,255,255,0.1)]"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("fundamental")}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer active:scale-95 whitespace-nowrap ${
                activeFilter === "fundamental"
                  ? "bg-cyan-500/25 text-cyan-200 border border-cyan-400/40 shadow-[0_2px_12px_rgba(6,182,212,0.3)]"
                  : "text-slate-400 hover:text-cyan-300 hover:bg-cyan-500/10"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.9)]" />
              Fundamental
            </button>
            <button
              onClick={() => setActiveFilter("intermediate")}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer active:scale-95 whitespace-nowrap ${
                activeFilter === "intermediate"
                  ? "bg-purple-500/25 text-purple-200 border border-purple-400/40 shadow-[0_2px_12px_rgba(168,85,247,0.3)]"
                  : "text-slate-400 hover:text-purple-300 hover:bg-purple-500/10"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_rgba(168,85,247,0.9)]" />
              Intermediate
            </button>
            <button
              onClick={() => setActiveFilter("advanced")}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs font-medium transition-all duration-200 shrink-0 cursor-pointer active:scale-95 whitespace-nowrap ${
                activeFilter === "advanced"
                  ? "bg-amber-500/25 text-amber-200 border border-amber-400/40 shadow-[0_2px_12px_rgba(245,158,11,0.3)]"
                  : "text-slate-400 hover:text-amber-300 hover:bg-amber-500/10"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_6px_rgba(245,158,11,0.9)]" />
              Advanced
            </button>
          </div>
        </div>

        {/* Content: Empty State vs Real Topics Grid */}
        {displayColumns.length === 0 ? (
          /* Simple, Clean Frosted Glass Empty State */
          <div className="relative z-10 flex flex-col items-center justify-center py-10 sm:py-14 px-4 text-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] backdrop-blur-md shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 border border-purple-400/30 text-purple-300 mb-3 shadow-[0_0_18px_rgba(168,85,247,0.2)]">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-white">No topic data available yet</h3>
            <p className="text-xs text-slate-400 max-w-sm mt-1">
              Solved problems on LeetCode will automatically display here broken down by topic in real time.
            </p>
          </div>
        ) : (
          <div className="relative z-10 space-y-4">
            {/* Top 3 Covered Topics Podium (Responsive Glass Cards) */}
            {stats.totalTopicsCount > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                {/* 1st Place */}
                <div className="group relative overflow-hidden flex items-center gap-3 rounded-xl border border-amber-400/30 bg-gradient-to-r from-amber-500/[0.12] to-amber-500/[0.02] backdrop-blur-md p-3 sm:p-3.5 shadow-[0_4px_20px_rgba(245,158,11,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-amber-400/50 hover:scale-[1.01]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-[0_0_12px_rgba(245,158,11,0.3)] transition-transform duration-300 group-hover:scale-110">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-medium text-amber-400 uppercase tracking-wider">
                      1st Focus
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {stats.top1?.tag ?? "—"}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-amber-300 shrink-0 ml-1">
                    {stats.top1?.solved ?? 0}
                  </span>
                </div>

                {/* 2nd Place */}
                <div className="group relative overflow-hidden flex items-center gap-3 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/[0.12] to-cyan-500/[0.02] backdrop-blur-md p-3 sm:p-3.5 shadow-[0_4px_20px_rgba(6,182,212,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-cyan-400/50 hover:scale-[1.01]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/25 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-transform duration-300 group-hover:scale-110">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-medium text-cyan-400 uppercase tracking-wider">
                      2nd Focus
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {stats.top2?.tag ?? "—"}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-cyan-300 shrink-0 ml-1">
                    {stats.top2?.solved ?? 0}
                  </span>
                </div>

                {/* 3rd Place */}
                <div className="group relative overflow-hidden flex items-center gap-3 rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-500/[0.12] to-purple-500/[0.02] backdrop-blur-md p-3 sm:p-3.5 shadow-[0_4px_20px_rgba(168,85,247,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all duration-300 hover:border-purple-400/50 hover:scale-[1.01]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/25 text-purple-300 border border-purple-400/40 shadow-[0_0_12px_rgba(168,85,247,0.3)] transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] sm:text-[11px] font-medium text-purple-400 uppercase tracking-wider">
                      3rd Focus
                    </div>
                    <div className="text-sm font-bold text-white truncate">
                      {stats.top3?.tag ?? "—"}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-purple-300 shrink-0 ml-1">
                    {stats.top3?.solved ?? 0}
                  </span>
                </div>
              </div>
            )}

            {/* Clean Topic List with Frosted Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-2.5">
              {displayColumns.map((col) => {
                const pct = ((col.solved / maxSolvedCount) * 100).toFixed(0);
                const isFund = col.level === "fundamental";
                const isAdv = col.level === "advanced";
                const barColor = isFund
                  ? "bg-gradient-to-r from-cyan-500 to-teal-400 shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  : isAdv
                  ? "bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
                  : "bg-gradient-to-r from-purple-500 to-indigo-400 shadow-[0_0_8px_rgba(168,85,247,0.6)]";
                const badgeColor = isFund
                  ? "text-cyan-300 border-cyan-400/30 bg-cyan-500/15"
                  : isAdv
                  ? "text-amber-300 border-amber-400/30 bg-amber-500/15"
                  : "text-purple-300 border-purple-400/30 bg-purple-500/15";

                return (
                  <div
                    key={col.id}
                    className="group flex flex-col justify-between gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] dark:bg-white/[0.02] backdrop-blur-md p-3 sm:p-3.5 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:shadow-[0_8px_24px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
                  >
                    <div className="flex items-center justify-between gap-2 min-w-0">
                      <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                        <span className="text-xs sm:text-sm font-semibold text-white truncate">
                          {col.name}
                        </span>
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[9px] sm:text-[10px] font-medium capitalize shrink-0 ${badgeColor}`}
                        >
                          {col.level}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-white shrink-0 ml-1">
                        {col.solved} solved
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-black/60 dark:bg-black/80 border border-white/[0.04] overflow-hidden shadow-[inset_0_1px_2px_rgba(0,0,0,0.9)]">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ease-out ${barColor}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
