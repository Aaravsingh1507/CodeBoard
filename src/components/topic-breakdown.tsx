"use client";

import React, { useState, useMemo } from "react";

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

// Real verified user topic distribution (empty when no solved questions)
export const REAL_USER_TOPICS: TopicItem[] = [];

// -----------------------------------------------------------------------------
// Enchanted Tree Dashboard Component
// -----------------------------------------------------------------------------
export function TopicBreakdown({
  topics: propTopics = [],
  totalSolved,
  easySolved,
  mediumSolved,
  hardSolved,
  ranking,
  loading = false,
}: TopicBreakdownProps) {
  // Use real topics from props directly (no fake fallbacks)
  const topics = useMemo(() => {
    return propTopics ?? [];
  }, [propTopics]);

  // Active category filter state ('all' or 'fundamental' | 'intermediate' | 'advanced')
  const [activeFilter, setActiveFilter] = useState<"all" | "fundamental" | "intermediate" | "advanced">("all");

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
        const name = t.tag.toLowerCase();
        if (
          name.includes("array") ||
          name.includes("string") ||
          name.includes("hash") ||
          name.includes("math") ||
          name.includes("sort") ||
          name.includes("two pointer")
        ) {
          fundamentalCount += count;
        } else if (
          name.includes("dynamic") ||
          name.includes("tree") ||
          name.includes("dfs") ||
          name.includes("bfs") ||
          name.includes("binary search") ||
          name.includes("greedy")
        ) {
          intermediateCount += count;
        } else {
          advancedCount += count;
        }
      }
    });

    const totalProblems = fundamentalCount + intermediateCount + advancedCount;
    const solvedTopicsList = topics.filter((t) => (Number(t.solved) || 0) > 0);
    const totalTopicsCount = solvedTopicsList.length;

    const fundamentalPct = totalProblems > 0 ? ((fundamentalCount / totalProblems) * 100).toFixed(1) : "0.0";
    const intermediatePct = totalProblems > 0 ? ((intermediateCount / totalProblems) * 100).toFixed(1) : "0.0";
    const advancedPct = totalProblems > 0 ? ((advancedCount / totalProblems) * 100).toFixed(1) : "0.0";

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

  // Filter based on active category pill ("all" | "fundamental" | "intermediate" | "advanced")
  const displayColumns = useMemo(() => {
    if (activeFilter === "all") return solvedTopics;
    return solvedTopics.filter((c) => c.level === activeFilter);
  }, [solvedTopics, activeFilter]);

  // Dynamic Y-axis scale based on maximum solved count in displayColumns (or fallback 10)
  const maxSolved = useMemo(() => {
    if (displayColumns.length === 0) return 10;
    const rawMax = Math.max(...displayColumns.map((c) => c.solved));
    if (rawMax <= 10) return 10;
    return Math.ceil(rawMax / 10) * 10;
  }, [displayColumns]);

  const handlePillClick = (filter: "fundamental" | "intermediate" | "advanced") => {
    setActiveFilter((prev) => (prev === filter ? "all" : filter));
  };

  const displayTotalProblems = totalSolved ?? (stats.totalProblems > 0 ? stats.totalProblems : easyCount + mediumCount + hardCount);
  const rankingDisplay = ranking ? `#${ranking.toLocaleString()}` : "#5,000,001";

  return (
    <div className="relative w-full text-white select-none">
      {/* Scoped CSS Keyframe Animations */}
      <style jsx global>{`
        @keyframes realisticLanternFlame {
          0%, 100% {
            opacity: 0.96;
            filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.9)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.5));
          }
          20% {
            opacity: 0.88;
            filter: drop-shadow(0 0 6px rgba(251, 191, 36, 0.75)) drop-shadow(0 0 16px rgba(245, 158, 11, 0.4));
          }
          45% {
            opacity: 0.98;
            filter: drop-shadow(0 0 10px rgba(251, 191, 36, 1)) drop-shadow(0 0 25px rgba(245, 158, 11, 0.65));
          }
          70% {
            opacity: 0.90;
            filter: drop-shadow(0 0 7px rgba(251, 191, 36, 0.8)) drop-shadow(0 0 18px rgba(245, 158, 11, 0.45));
          }
          85% {
            opacity: 1;
            filter: drop-shadow(0 0 11px rgba(251, 191, 36, 1)) drop-shadow(0 0 28px rgba(245, 158, 11, 0.7));
          }
        }
        @keyframes realisticLanternAtmosphere {
          0%, 100% { opacity: 0.55; }
          30% { opacity: 0.45; }
          65% { opacity: 0.65; }
          85% { opacity: 0.50; }
        }
        @keyframes treeTargetFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        .animate-tree-lantern { animation: realisticLanternFlame 3.8s ease-in-out infinite; }
        .animate-tree-atmosphere { animation: realisticLanternAtmosphere 3.8s ease-in-out infinite; }
        .animate-tree-target { animation: treeTargetFloat 3.4s ease-in-out infinite; }
      `}</style>

      {/* Master Enchanted Tree Dashboard Container */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-[#07050d] border border-purple-500/20 shadow-[0_12px_48px_rgba(0,0,0,0.8),0_0_32px_rgba(112,66,248,0.15)]">
        <svg
          viewBox="0 0 1024 682"
          className="w-full h-auto block select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            {/* Lantern Core & Radiance */}
            <radialGradient id="treeLanternCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="40%" stopColor="#fef08a" stopOpacity="0.95" />
              <stop offset="70%" stopColor="#fbbf24" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="treeLanternRadiance" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.75" />
              <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.45" />
              <stop offset="75%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="treeLanternAmbient" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.15" />
              <stop offset="85%" stopColor="#b45309" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
            </radialGradient>

            {/* Glowing Text Shadows */}
            <filter id="treeTextShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000000" floodOpacity="0.9" />
            </filter>
            <filter id="treeCyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22d3ee" floodOpacity="0.8" />
            </filter>
            <filter id="treePurpleGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#c084fc" floodOpacity="0.8" />
            </filter>
            <filter id="treeAmberGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#fbbf24" floodOpacity="0.8" />
            </filter>

            {/* Chart Bar Gradients */}
            <linearGradient id="treeCyanBar" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#0891b2" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#67e8f9" />
            </linearGradient>
            <linearGradient id="treePurpleBar" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#e879f9" />
            </linearGradient>
            <linearGradient id="treeAmberBar" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* 1. Base Enchanted Tree Artwork */}
          <image
            href="/dsa-enchanted-tree-clean.webp"
            width="1024"
            height="682"
            x="0"
            y="0"
          />

          {/* =================================================================== */}
          {/* 2. GLOWING GAS LANTERN ON TREE (Center: 88, 169)                    */}
          {/* =================================================================== */}
          <ellipse
            cx="88"
            cy="175"
            rx="36"
            ry="46"
            fill="url(#treeLanternAmbient)"
            className="animate-tree-atmosphere pointer-events-none"
          />
          <circle
            cx="88"
            cy="169"
            r="18"
            fill="url(#treeLanternRadiance)"
            className="animate-tree-lantern pointer-events-none"
          />
          <circle
            cx="88"
            cy="169"
            r="6"
            fill="url(#treeLanternCore)"
            className="animate-tree-lantern pointer-events-none"
          />

          {/* =================================================================== */}
          {/* 3. TOTAL SOLVED CIRCULAR DIAL (Center: 304, 164)                    */}
          {/* =================================================================== */}
          <g className="pointer-events-none select-none">
            {/* Coding laptop glyph < / > */}
            <path
              d="M298 135l-4 4 4 4m12-8l4 4-4 4m-4-9l-4 10"
              stroke="#38bdf8"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter="url(#treeCyanGlow)"
            />
            {/* Solved Number */}
            <text
              x="304"
              y="172"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="32"
              fontWeight="800"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              filter="url(#treeTextShadow)"
            >
              {loading ? "..." : displayTotalProblems}
            </text>
            {/* Label */}
            <text
              x="304"
              y="196"
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              Total Solved
            </text>
          </g>

          {/* =================================================================== */}
          {/* 4. EASY / MEDIUM / HARD PILLS                                       */}
          {/* =================================================================== */}
          {/* Easy Pill */}
          <g className="select-none">
            <text
              x="502"
              y="132"
              fill="#ffffff"
              fontSize="13.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Easy
            </text>
            <text
              x="614"
              y="133"
              textAnchor="end"
              fill="#ffffff"
              fontSize="17"
              fontWeight="800"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              filter="url(#treeTextShadow)"
            >
              {loading ? "—" : easyCount}
            </text>
          </g>

          {/* Medium Pill */}
          <g className="select-none">
            <text
              x="502"
              y="181"
              fill="#ffffff"
              fontSize="13.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Medium
            </text>
            <text
              x="614"
              y="182"
              textAnchor="end"
              fill="#ffffff"
              fontSize="17"
              fontWeight="800"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              filter="url(#treeTextShadow)"
            >
              {loading ? "—" : mediumCount}
            </text>
          </g>

          {/* Hard Pill */}
          <g className="select-none">
            <text
              x="502"
              y="231"
              fill="#ffffff"
              fontSize="13.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Hard
            </text>
            <text
              x="614"
              y="232"
              textAnchor="end"
              fill="#ffffff"
              fontSize="17"
              fontWeight="800"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              filter="url(#treeTextShadow)"
            >
              {loading ? "—" : hardCount}
            </text>
          </g>

          {/* =================================================================== */}
          {/* 5. GLOBAL RANKING SHIELD (Center: 810, 164)                         */}
          {/* =================================================================== */}
          <g className="pointer-events-none select-none">
            {/* Ranking Number */}
            <text
              x="810"
              y="184"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="23"
              fontWeight="800"
              fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
              filter="url(#treeTextShadow)"
            >
              {loading ? "..." : rankingDisplay}
            </text>
            {/* Label */}
            <text
              x="810"
              y="206"
              textAnchor="middle"
              fill="#cbd5e1"
              fontSize="11"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              Global Ranking
            </text>
          </g>

          {/* Mini Hanging Filter Buttons under Trophy Shield (Y=252..274) */}
          <g className="select-none">
            {/* Fundamental Pill */}
            <rect
              x="714"
              y="253"
              width="62"
              height="20"
              rx="10"
              fill={activeFilter === "fundamental" ? "#083344" : "transparent"}
              stroke={activeFilter === "fundamental" ? "#22d3ee" : "transparent"}
              strokeWidth="1.2"
              className="cursor-pointer transition-colors"
              onClick={() => handlePillClick("fundamental")}
            />
            <text
              x="745"
              y="266.5"
              textAnchor="middle"
              fill={activeFilter === "fundamental" ? "#22d3ee" : "#cbd5e1"}
              fontSize="9"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              className="pointer-events-none"
            >
              Fundamental
            </text>

            {/* Intermediate Pill */}
            <rect
              x="780"
              y="253"
              width="64"
              height="20"
              rx="10"
              fill={activeFilter === "intermediate" ? "#3b0764" : "transparent"}
              stroke={activeFilter === "intermediate" ? "#c084fc" : "transparent"}
              strokeWidth="1.2"
              className="cursor-pointer transition-colors"
              onClick={() => handlePillClick("intermediate")}
            />
            <text
              x="812"
              y="266.5"
              textAnchor="middle"
              fill={activeFilter === "intermediate" ? "#c084fc" : "#cbd5e1"}
              fontSize="9"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              className="pointer-events-none"
            >
              Intermediate
            </text>

            {/* Advanced Pill */}
            <rect
              x="848"
              y="253"
              width="62"
              height="20"
              rx="10"
              fill={activeFilter === "advanced" ? "#451a03" : "transparent"}
              stroke={activeFilter === "advanced" ? "#fbbf24" : "transparent"}
              strokeWidth="1.2"
              className="cursor-pointer transition-colors"
              onClick={() => handlePillClick("advanced")}
            />
            <text
              x="879"
              y="266.5"
              textAnchor="middle"
              fill={activeFilter === "advanced" ? "#fbbf24" : "#cbd5e1"}
              fontSize="9"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              className="pointer-events-none"
            >
              Advanced
            </text>
          </g>

          {/* =================================================================== */}
          {/* 6. LEFT 3 PILLS ON TRUNK/BRANCH (Fundamental, Intermediate, Advanced)*/}
          {/* =================================================================== */}
          {/* Pill 1: Fundamental */}
          <rect
            x="200"
            y="306"
            width="136"
            height="44"
            rx="22"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handlePillClick("fundamental")}
          />
          {activeFilter === "fundamental" && (
            <rect
              x="202"
              y="308"
              width="132"
              height="40"
              rx="20"
              fill="rgba(34, 211, 238, 0.12)"
              stroke="#22d3ee"
              strokeWidth="1.5"
              className="pointer-events-none"
              filter="url(#treeCyanGlow)"
            />
          )}
          <g className="pointer-events-none select-none">
            <text
              x="254"
              y="323"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Fundamental
            </text>
            <text
              x="254"
              y="340"
              fill="#22d3ee"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeCyanGlow)"
            >
              {stats.fundamentalCount} ({stats.fundamentalPct}%)
            </text>
          </g>

          {/* Pill 2: Intermediate */}
          <rect
            x="200"
            y="360"
            width="136"
            height="44"
            rx="22"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handlePillClick("intermediate")}
          />
          {activeFilter === "intermediate" && (
            <rect
              x="202"
              y="362"
              width="132"
              height="40"
              rx="20"
              fill="rgba(192, 132, 252, 0.12)"
              stroke="#c084fc"
              strokeWidth="1.5"
              className="pointer-events-none"
              filter="url(#treePurpleGlow)"
            />
          )}
          <g className="pointer-events-none select-none">
            <text
              x="254"
              y="377"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Intermediate
            </text>
            <text
              x="254"
              y="394"
              fill="#c084fc"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treePurpleGlow)"
            >
              {stats.intermediateCount} ({stats.intermediatePct}%)
            </text>
          </g>

          {/* Pill 3: Advanced */}
          <rect
            x="200"
            y="414"
            width="136"
            height="44"
            rx="22"
            fill="transparent"
            className="cursor-pointer"
            onClick={() => handlePillClick("advanced")}
          />
          {activeFilter === "advanced" && (
            <rect
              x="202"
              y="416"
              width="132"
              height="40"
              rx="20"
              fill="rgba(251, 191, 36, 0.12)"
              stroke="#fbbf24"
              strokeWidth="1.5"
              className="pointer-events-none"
              filter="url(#treeAmberGlow)"
            />
          )}
          <g className="pointer-events-none select-none">
            <text
              x="254"
              y="431"
              fill="#ffffff"
              fontSize="12.5"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Advanced
            </text>
            <text
              x="254"
              y="448"
              fill="#fbbf24"
              fontSize="11"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeAmberGlow)"
            >
              {stats.advancedCount} ({stats.advancedPct}%)
            </text>
          </g>

          {/* =================================================================== */}
          {/* 7. MIDDLE BOARD: TOPIC-WISE PROBLEM DISTRIBUTION                    */}
          {/* =================================================================== */}
          {/* Header */}
          <g className="pointer-events-none select-none">
            <path
              d="M404 330l4 4 6-6 4 4"
              fill="none"
              stroke="#c084fc"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#treePurpleGlow)"
            />
            <text
              x="424"
              y="333"
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Topic-wise Problem Distribution
            </text>
          </g>

          {/* Board Content */}
          {displayColumns.length === 0 ? (
            /* Clean Empty State */
            <g className="pointer-events-none select-none">
              <circle cx="665" cy="380" r="18" fill="rgba(168, 85, 247, 0.12)" stroke="rgba(168, 85, 247, 0.3)" strokeWidth="1" />
              <path
                d="M657 386v-8m8 8v-14m8 14v-5"
                stroke="#c084fc"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
              />
              <text
                x="665"
                y="414"
                textAnchor="middle"
                fill="#f1f5f9"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                No topic data available yet
              </text>
              <text
                x="665"
                y="430"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9.5"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Solved problems on LeetCode will automatically display here broken down by topic in real time.
              </text>
            </g>
          ) : (
            /* Dynamic Topic Distribution Bars */
            <g className="select-none">
              {displayColumns.slice(0, 14).map((col, idx, arr) => {
                const totalPlotWidth = 515;
                const colWidth = totalPlotWidth / arr.length;
                const colCenterX = 414 + idx * colWidth + colWidth / 2;
                const maxPlotHeight = 56;
                const barHeight = Math.max(6, Math.min(maxPlotHeight, (col.solved / maxSolved) * maxPlotHeight));
                const barY = 418 - barHeight;
                const barFill =
                  col.level === "fundamental"
                    ? "url(#treeCyanBar)"
                    : col.level === "advanced"
                    ? "url(#treeAmberBar)"
                    : "url(#treePurpleBar)";
                const discStroke =
                  col.level === "fundamental" ? "#22d3ee" : col.level === "advanced" ? "#fbbf24" : "#c084fc";

                return (
                  <g key={col.id} className="transition-all duration-300">
                    {/* Solved Count on Top */}
                    <text
                      x={colCenterX}
                      y={barY - 3}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="800"
                      fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                      filter="url(#treeTextShadow)"
                    >
                      {col.solved}
                    </text>

                    {/* Rising Neon Bar */}
                    <rect
                      x={colCenterX - 4}
                      y={barY}
                      width={8}
                      height={barHeight}
                      rx={3}
                      fill={barFill}
                    />

                    {/* Glowing Baseline Disc */}
                    <ellipse
                      cx={colCenterX}
                      cy={420}
                      rx={9}
                      ry={2.6}
                      fill="#150d2e"
                      stroke={discStroke}
                      strokeWidth={1}
                    />

                    {/* Topic Label */}
                    <text
                      x={colCenterX}
                      y={436}
                      textAnchor="middle"
                      fill="#cbd5e1"
                      fontSize="8"
                      fontWeight="600"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {col.name.length > 7 ? col.name.slice(0, 6) + "…" : col.name}
                    </text>
                  </g>
                );
              })}
            </g>
          )}

          {/* =================================================================== */}
          {/* 8. BOTTOM-LEFT BOARD: TOP COVERED TOPICS                            */}
          {/* =================================================================== */}
          {/* Header */}
          <g className="pointer-events-none select-none">
            <path
              d="M300 523h12v4a6 6 0 0 1-12 0v-4zm-2 1h2v3a2 2 0 0 1-2-2v-1zm14 0h2v1a2 2 0 0 1-2 2v-3zm-9 11v3m-2 0h6"
              fill="none"
              stroke="#fbbf24"
              strokeWidth="1.4"
              filter="url(#treeAmberGlow)"
            />
            <text
              x="320"
              y="528"
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Top Covered Topics
            </text>
          </g>

          {/* Content */}
          {stats.totalTopicsCount === 0 ? (
            /* Clean Empty State */
            <g className="pointer-events-none select-none">
              <circle cx="461" cy="565" r="16" fill="rgba(245, 158, 11, 0.1)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1" />
              <path
                d="M457 561h8v3a4 4 0 0 1-8 0v-3zm-1 1h1v2a1 1 0 0 1-1-1v-1zm9 0h1v1a1 1 0 0 1-1 1v-2zm-6 8v2m-1 0h4"
                stroke="#fbbf24"
                strokeWidth="1.2"
                fill="none"
              />
              <text
                x="461"
                y="593"
                textAnchor="middle"
                fill="#f1f5f9"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                No covered topics yet
              </text>
              <text
                x="461"
                y="608"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="9"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Your top solved topics will take the podium here.
              </text>
            </g>
          ) : (
            /* 3 Stepped Podium Columns */
            <g className="select-none">
              {/* Podium 1: Rank 1 Gold */}
              <g>
                <text
                  x="345"
                  y="584"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  filter="url(#treeTextShadow)"
                >
                  {stats.top1?.tag ?? "—"}
                </text>
                <text
                  x="345"
                  y="599"
                  textAnchor="middle"
                  fill="#fbbf24"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  filter="url(#treeAmberGlow)"
                >
                  ({stats.top1 ? stats.top1.solved : 0})
                </text>
              </g>

              {/* Podium 2: Rank 2 Cyan */}
              <g>
                <text
                  x="461"
                  y="584"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  filter="url(#treeTextShadow)"
                >
                  {stats.top2?.tag ?? "—"}
                </text>
                <text
                  x="461"
                  y="599"
                  textAnchor="middle"
                  fill="#22d3ee"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  filter="url(#treeCyanGlow)"
                >
                  {stats.top2 ? `(${stats.top2.solved})` : "—"}
                </text>
              </g>

              {/* Podium 3: Rank 3 Purple */}
              <g>
                <text
                  x="577"
                  y="584"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="11"
                  fontWeight="700"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  filter="url(#treeTextShadow)"
                >
                  {stats.top3?.tag ?? "—"}
                </text>
                <text
                  x="577"
                  y="599"
                  textAnchor="middle"
                  fill="#c084fc"
                  fontSize="10"
                  fontWeight="800"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  filter="url(#treePurpleGlow)"
                >
                  {stats.top3 ? `(${stats.top3.solved})` : "—"}
                </text>
              </g>
            </g>
          )}

          {/* =================================================================== */}
          {/* 9. BOTTOM-RIGHT BOARD: COVERAGE INSIGHT                             */}
          {/* =================================================================== */}
          {/* Header */}
          <g className="pointer-events-none select-none">
            <circle cx="708" cy="526" r="6" fill="none" stroke="#c084fc" strokeWidth="1.6" filter="url(#treePurpleGlow)" />
            <circle cx="708" cy="526" r="2.5" fill="none" stroke="#c084fc" strokeWidth="1.2" />
            <text
              x="722"
              y="529"
              fill="#ffffff"
              fontSize="12"
              fontWeight="700"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeTextShadow)"
            >
              Coverage Insight
            </text>
          </g>

          {/* Milestone Headline & Subtitle */}
          <g className="pointer-events-none select-none">
            <text
              x="704"
              y="554"
              fill="#fbbf24"
              fontSize="12.5"
              fontWeight="800"
              fontFamily="system-ui, -apple-system, sans-serif"
              filter="url(#treeAmberGlow)"
            >
              {displayTotalProblems === 0
                ? "No DSA problems solved yet."
                : `Solved ${displayTotalProblems} problems across ${stats.totalTopicsCount} topics!`}
            </text>
            <text
              x="704"
              y="573"
              fill="#cbd5e1"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {displayTotalProblems === 0
                ? "Connect your LeetCode account in Settings"
                : stats.top1
                ? `Top focus in ${stats.top1.tag} (${stats.top1.solved} solved).`
                : "Solve more problems to see personalized"}
            </text>
            <text
              x="704"
              y="586"
              fill="#cbd5e1"
              fontSize="9"
              fontFamily="system-ui, -apple-system, sans-serif"
            >
              {displayTotalProblems === 0
                ? "to track your real-time topic progress."
                : "Expand into other patterns!"}
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
