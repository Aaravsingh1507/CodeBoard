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
    <div className="space-y-5 select-none">
      {/* ===================================================================== */}
      {/* 1. TOP STATS ROW: 3 CLEAN, MINIMAL CARDS                             */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Total Solved */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs transition-all hover:border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Solved
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Code2 className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono">
              {loading ? "..." : displayTotalProblems}
            </span>
            <span className="text-xs text-muted-foreground">problems</span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs">
            <span className="text-muted-foreground">Acceptance Rate</span>
            <span className="font-semibold text-foreground font-mono">
              {acceptanceRate || "0.0%"}
            </span>
          </div>
        </div>

        {/* Card 2: Difficulty Breakdown */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs transition-all hover:border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Difficulty
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <BarChart2 className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-3.5 space-y-2.5">
            {/* Easy */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  Easy
                </span>
                <span className="font-semibold font-mono text-foreground">{easyCount}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${easyPct}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-amber-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                  Medium
                </span>
                <span className="font-semibold font-mono text-foreground">{mediumCount}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-amber-500 transition-all duration-500"
                  style={{ width: `${mediumPct}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-rose-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                  Hard
                </span>
                <span className="font-semibold font-mono text-foreground">{hardCount}</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                <div
                  className="h-full rounded-full bg-rose-500 transition-all duration-500"
                  style={{ width: `${hardPct}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Card 3: Global Ranking */}
        <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs transition-all hover:border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Global Ranking
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Trophy className="h-4 w-4" />
            </div>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground font-mono truncate">
              {loading ? "..." : ranking ? `#${ranking.toLocaleString()}` : "Unranked"}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-border/50 pt-3 text-xs">
            <span className="text-muted-foreground">Standing</span>
            <span className="font-medium text-slate-400">
              {ranking ? "Active rank" : "Solve to rank"}
            </span>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 2. MAIN DSA TOPIC DISTRIBUTION CARD                                  */}
      {/* ===================================================================== */}
      <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs space-y-5">
        {/* Header with Title & Filter Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-foreground">Topic Distribution</h2>
              <p className="text-xs text-muted-foreground">
                Breakdown of solved DSA patterns across fundamental, intermediate, and advanced categories.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 rounded-xl border border-border/60 bg-muted/30 p-1 text-xs">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeFilter === "all"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("fundamental")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeFilter === "fundamental"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
              Fundamental
            </button>
            <button
              onClick={() => setActiveFilter("intermediate")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeFilter === "intermediate"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
              Intermediate
            </button>
            <button
              onClick={() => setActiveFilter("advanced")}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                activeFilter === "advanced"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Advanced
            </button>
          </div>
        </div>

        {/* Content: Empty State vs Real Topics Grid */}
        {displayColumns.length === 0 ? (
          /* Simple, Clean Empty State */
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center rounded-xl border border-dashed border-border/60 bg-muted/10">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-3">
              <Layers className="h-6 w-6" />
            </div>
            <h3 className="text-sm font-semibold text-foreground">No topic data available yet</h3>
            <p className="text-xs text-muted-foreground max-w-sm mt-1">
              Solved problems on LeetCode will automatically display here broken down by topic in real time.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Top 3 Covered Topics Podium (When active) */}
            {stats.totalTopicsCount > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* 1st Place */}
                <div className="flex items-center gap-3 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                    <Trophy className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium text-amber-400 uppercase tracking-wider">
                      1st Focus
                    </div>
                    <div className="text-sm font-bold text-foreground truncate">
                      {stats.top1?.tag ?? "—"}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-amber-400">
                    {stats.top1?.solved ?? 0}
                  </span>
                </div>

                {/* 2nd Place */}
                <div className="flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-500/5 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Award className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium text-cyan-400 uppercase tracking-wider">
                      2nd Focus
                    </div>
                    <div className="text-sm font-bold text-foreground truncate">
                      {stats.top2?.tag ?? "—"}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-cyan-400">
                    {stats.top2?.solved ?? 0}
                  </span>
                </div>

                {/* 3rd Place */}
                <div className="flex items-center gap-3 rounded-xl border border-purple-500/30 bg-purple-500/5 p-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium text-purple-400 uppercase tracking-wider">
                      3rd Focus
                    </div>
                    <div className="text-sm font-bold text-foreground truncate">
                      {stats.top3?.tag ?? "—"}
                    </div>
                  </div>
                  <span className="font-mono text-sm font-bold text-purple-400">
                    {stats.top3?.solved ?? 0}
                  </span>
                </div>
              </div>
            )}

            {/* Clean Topic List with Progress Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {displayColumns.map((col) => {
                const pct = ((col.solved / maxSolvedCount) * 100).toFixed(0);
                const isFund = col.level === "fundamental";
                const isAdv = col.level === "advanced";
                const barColor = isFund
                  ? "bg-cyan-500"
                  : isAdv
                  ? "bg-amber-500"
                  : "bg-purple-500";
                const badgeColor = isFund
                  ? "text-cyan-400 border-cyan-500/30 bg-cyan-500/10"
                  : isAdv
                  ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                  : "text-purple-400 border-purple-500/30 bg-purple-500/10";

                return (
                  <div
                    key={col.id}
                    className="flex flex-col justify-between gap-1.5 rounded-xl border border-border/60 bg-muted/20 p-3 transition-colors hover:bg-muted/30"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-medium text-foreground truncate">
                          {col.name}
                        </span>
                        <span
                          className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium capitalize shrink-0 ${badgeColor}`}
                        >
                          {col.level}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold text-foreground shrink-0">
                        {col.solved} solved
                      </span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${barColor}`}
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
