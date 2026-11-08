"use client";

import React from "react";

export interface TopicItem {
  tag: string;
  solved: number;
  level: "fundamental" | "intermediate" | "advanced" | string;
}

// Map standard LeetCode tags to their specialized icon
function getTopicIcon(tag: string) {
  const normalized = tag.toLowerCase().trim();

  if (normalized.includes("array")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    );
  }
  if (normalized.includes("search") || normalized.includes("binary search")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="6.5" />
        <line x1="21" y1="21" x2="16" y2="16" />
      </svg>
    );
  }
  if (normalized.includes("pointer")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17l-4-4 4-4" />
        <path d="M3 13h12" />
        <path d="M17 7l4 4-4 4" />
        <path d="M21 11H9" />
      </svg>
    );
  }
  if (normalized.includes("math")) {
    return <span className="font-serif font-extrabold text-sm leading-none">Σ</span>;
  }
  if (normalized.includes("matrix")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
      </svg>
    );
  }
  if (normalized.includes("string")) {
    return <span className="font-mono font-bold text-sm leading-none">“ ”</span>;
  }
  if (normalized.includes("sort")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="7" y1="4" x2="7" y2="20" />
        <polyline points="3 8 7 4 11 8" />
        <line x1="17" y1="20" x2="17" y2="4" />
        <polyline points="13 16 17 20 21 16" />
      </svg>
    );
  }
  if (normalized.includes("simulat")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M6 11H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V6a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v2h2a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H9v2a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-2zm11-3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm2 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" />
        <rect x="2" y="5" width="20" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }
  if (normalized.includes("hash")) {
    return <span className="font-extrabold text-sm leading-none">#</span>;
  }
  if (normalized.includes("recursi")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" />
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
      </svg>
    );
  }
  if (normalized.includes("dynamic") || normalized.includes("dp")) {
    return <span className="font-mono font-bold text-xs leading-none">&lt;/&gt;</span>;
  }
  if (normalized.includes("divide") || normalized.includes("conquer") || normalized.includes("tree")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" fill="currentColor" />
        <circle cx="6" cy="19" r="2.5" fill="currentColor" />
        <circle cx="18" cy="19" r="2.5" fill="currentColor" />
        <path d="M12 7.5v4m0 0l-6 5m6-5l6 5" />
      </svg>
    );
  }
  if (normalized.includes("depth") || normalized.includes("dfs") || normalized.includes("breadth") || normalized.includes("bfs") || normalized.includes("graph")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="6" cy="6" r="3" fill="currentColor" />
        <circle cx="18" cy="6" r="3" fill="currentColor" />
        <circle cx="12" cy="18" r="3" fill="currentColor" />
        <path d="M6 9l6 6 6-6" />
      </svg>
    );
  }
  if (normalized.includes("list")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
        <line x1="7.5" y1="12" x2="16.5" y2="12" />
      </svg>
    );
  }
  if (normalized.includes("stack") || normalized.includes("queue")) {
    return (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    );
  }
  if (normalized.includes("bit")) {
    return <span className="font-mono font-bold text-[10px] leading-none">01</span>;
  }

  // Default code icon
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// Sample fallback topics when user has no solved problems yet
const DEFAULT_TOPICS: TopicItem[] = [
  { tag: "Array", solved: 10, level: "fundamental" },
  { tag: "Binary Search", solved: 5, level: "intermediate" },
  { tag: "Two Pointers", solved: 4, level: "fundamental" },
  { tag: "Math", solved: 4, level: "intermediate" },
  { tag: "Matrix", solved: 3, level: "fundamental" },
  { tag: "String", solved: 2, level: "fundamental" },
  { tag: "Sorting", solved: 2, level: "fundamental" },
  { tag: "Simulation", solved: 1, level: "fundamental" },
  { tag: "Hash Table", solved: 1, level: "intermediate" },
  { tag: "Recursion", solved: 1, level: "intermediate" },
  { tag: "Dynamic Programming", solved: 1, level: "advanced" },
  { tag: "Divide & Conquer", solved: 1, level: "advanced" },
];

export function TopicBreakdown({ topics }: { topics?: TopicItem[] }) {
  // Use real data if provided and not empty, otherwise fallback gracefully
  const displayTopics = topics && topics.length > 0 ? topics : DEFAULT_TOPICS;

  // Compute breakdown statistics
  const totalProblems = displayTopics.reduce((acc, t) => acc + t.solved, 0);

  const fundSolved = displayTopics
    .filter((t) => t.level === "fundamental")
    .reduce((acc, t) => acc + t.solved, 0);
  const interSolved = displayTopics
    .filter((t) => t.level === "intermediate")
    .reduce((acc, t) => acc + t.solved, 0);
  const advSolved = displayTopics
    .filter((t) => t.level === "advanced")
    .reduce((acc, t) => acc + t.solved, 0);

  const fundPct = totalProblems > 0 ? ((fundSolved / totalProblems) * 100).toFixed(1) : "0.0";
  const interPct = totalProblems > 0 ? ((interSolved / totalProblems) * 100).toFixed(1) : "0.0";
  const advPct = totalProblems > 0 ? ((advSolved / totalProblems) * 100).toFixed(1) : "0.0";

  // Top 12 topics for vertical bar chart
  const top12 = [...displayTopics].sort((a, b) => b.solved - a.solved).slice(0, 12);

  // Top 3 for Top Covered Topics card
  const top3 = top12.slice(0, 3);

  // Y-axis max calculation
  const maxSolved = top12.length > 0 ? Math.max(...top12.map((t) => t.solved)) : 10;
  const yMax = Math.max(10, Math.ceil(maxSolved / 2) * 2);
  const yTicks = [
    yMax,
    Math.round(yMax * 0.8),
    Math.round(yMax * 0.6),
    Math.round(yMax * 0.4),
    Math.round(yMax * 0.2),
    0,
  ];

  // Donut Gauge Arc Calculations
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const fundLen = totalProblems > 0 ? (fundSolved / totalProblems) * circumference : 0;
  const interLen = totalProblems > 0 ? (interSolved / totalProblems) * circumference : 0;
  const advLen = totalProblems > 0 ? (advSolved / totalProblems) * circumference : 0;

  // Tiny aesthetic gap between segments
  const gap = 3;
  const arcFund = Math.max(0, fundLen - gap);
  const arcInter = Math.max(0, interLen - gap);
  const arcAdv = Math.max(0, advLen - gap);

  return (
    <div
      className="relative w-full rounded-[32px] p-6 sm:p-8 overflow-hidden text-white transition-all"
      style={{
        background:
          "linear-gradient(135deg, rgba(8, 32, 22, 0.94) 0%, rgba(4, 18, 12, 0.97) 50%, rgba(2, 10, 7, 0.99) 100%)",
        border: "1.5px solid rgba(74, 222, 128, 0.32)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        boxShadow:
          "0 25px 60px -15px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.14), inset 0 0 50px rgba(16, 185, 129, 0.06), 0 0 35px rgba(16, 185, 129, 0.15)",
      }}
    >
      {/* Soft Ambient Background Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-lime-500/10 blur-[80px]" />

      {/* 1. HEADER SECTION */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        {/* Title + Subtitle + 3D Layer Stack Icon */}
        <div className="flex items-center gap-3.5">
          {/* 3D Layers Badge */}
          <div className="relative shrink-0 flex items-center justify-center">
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              className="drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
            >
              <defs>
                <linearGradient id="layerBadgeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#15803d" />
                  <stop offset="60%" stopColor="#166534" />
                  <stop offset="100%" stopColor="#052e16" />
                </linearGradient>
                <linearGradient id="layerTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="layerMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id="layerBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
              </defs>
              <rect
                width="46"
                height="46"
                rx="14"
                fill="url(#layerBadgeGrad)"
                stroke="rgba(74, 222, 128, 0.45)"
                strokeWidth="1.5"
              />
              {/* 3 Layered Isometric Diamonds */}
              {/* Bottom Layer */}
              <path d="M23 29 L33 24 L23 19 L13 24 Z" fill="url(#layerBotGrad)" opacity="0.6" />
              <path d="M13 24 L23 29 L33 24 L33 26 L23 31 L13 26 Z" fill="#047857" opacity="0.9" />
              {/* Middle Layer */}
              <path d="M23 24.5 L33 19.5 L23 14.5 L13 19.5 Z" fill="url(#layerMidGrad)" opacity="0.85" />
              <path d="M13 19.5 L23 24.5 L33 19.5 L33 21.5 L23 26.5 L13 21.5 Z" fill="#059669" opacity="0.9" />
              {/* Top Layer */}
              <path d="M23 20 L33 15 L23 10 L13 15 Z" fill="url(#layerTopGrad)" />
              <path d="M13 15 L23 20 L33 15 L33 17 L23 22 L13 17 Z" fill="#10b981" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
              Topic Coverage
            </h2>
            <p className="text-xs sm:text-sm font-medium text-emerald-200/75 mt-0.5">
              Problem distribution across DSA topics
            </p>
          </div>
        </div>

        {/* Legend Filter Pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Fundamental */}
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform hover:scale-105"
            style={{ background: "rgba(6, 36, 23, 0.85)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="text-xs font-semibold text-white tracking-wide">Fundamental</span>
          </div>

          {/* Intermediate */}
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lime-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform hover:scale-105"
            style={{ background: "rgba(14, 39, 18, 0.85)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] shadow-[0_0_8px_#84cc16]" />
            <span className="text-xs font-semibold text-white tracking-wide">Intermediate</span>
          </div>

          {/* Advanced */}
          <div
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-500/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] transition-transform hover:scale-105"
            style={{ background: "rgba(26, 43, 14, 0.85)" }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] shadow-[0_0_8px_#eab308]" />
            <span className="text-xs font-semibold text-white tracking-wide">Advanced</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN CONTENT BODY */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT COLUMN: Donut Gauge & Distribution Summary */}
        <div
          className="lg:col-span-4 xl:col-span-3.5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between border border-emerald-500/25 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)]"
          style={{ background: "rgba(5, 26, 17, 0.72)" }}
        >
          {/* Donut Gauge Visual */}
          <div className="relative flex items-center justify-center my-2">
            <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
              <defs>
                {/* Fundamental Gradient */}
                <linearGradient id="donutFundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
                {/* Intermediate Gradient */}
                <linearGradient id="donutInterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#65a30d" />
                </linearGradient>
                {/* Advanced Gradient */}
                <linearGradient id="donutAdvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#facc15" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>

                <filter id="donutGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#10b981" floodOpacity="0.4" />
                </filter>
              </defs>

              {/* Background Track Circle */}
              <circle
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke="rgba(6, 44, 28, 0.8)"
                strokeWidth="15"
              />

              {/* Inner Circle Fill for Glass Contrast */}
              <circle
                cx="100"
                cy="100"
                r={radius - 12}
                fill="#041810"
                stroke="rgba(74, 222, 128, 0.2)"
                strokeWidth="1"
              />

              {/* Fundamental Arc */}
              {arcFund > 0 && (
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="url(#donutFundGrad)"
                  strokeWidth="16"
                  strokeDasharray={`${arcFund} ${circumference}`}
                  strokeDashoffset={0}
                  strokeLinecap="round"
                  filter="url(#donutGlow)"
                />
              )}

              {/* Intermediate Arc */}
              {arcInter > 0 && (
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="url(#donutInterGrad)"
                  strokeWidth="16"
                  strokeDasharray={`${arcInter} ${circumference}`}
                  strokeDashoffset={-fundLen}
                  strokeLinecap="round"
                  filter="url(#donutGlow)"
                />
              )}

              {/* Advanced Arc */}
              {arcAdv > 0 && (
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  fill="none"
                  stroke="url(#donutAdvGrad)"
                  strokeWidth="16"
                  strokeDasharray={`${arcAdv} ${circumference}`}
                  strokeDashoffset={-(fundLen + interLen)}
                  strokeLinecap="round"
                  filter="url(#donutGlow)"
                />
              )}
            </svg>

            {/* Center Content Inside Donut */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
              {/* </> Code Badge */}
              <div className="px-2 py-0.5 rounded-md bg-[#052b1b] border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold shadow-[0_0_8px_rgba(16,185,129,0.3)] mb-1">
                &lt;/&gt;
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-none">
                {totalProblems}
              </div>
              <div className="text-[11px] font-semibold text-emerald-200/75 mt-1">
                Total Problems
              </div>
            </div>
          </div>

          {/* Breakdown Percentage Rows */}
          <div className="space-y-2.5 mt-5">
            {/* Fundamental */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
                <span className="font-medium text-emerald-100">Fundamental</span>
              </div>
              <span className="font-bold text-white tracking-wide">
                {fundSolved} <span className="font-normal text-emerald-300/80">({fundPct}%)</span>
              </span>
            </div>

            {/* Intermediate */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#84cc16] shadow-[0_0_8px_#84cc16]" />
                <span className="font-medium text-emerald-100">Intermediate</span>
              </div>
              <span className="font-bold text-white tracking-wide">
                {interSolved} <span className="font-normal text-lime-300/80">({interPct}%)</span>
              </span>
            </div>

            {/* Advanced */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eab308] shadow-[0_0_8px_#eab308]" />
                <span className="font-medium text-emerald-100">Advanced</span>
              </div>
              <span className="font-bold text-white tracking-wide">
                {advSolved} <span className="font-normal text-yellow-300/80">({advPct}%)</span>
              </span>
            </div>
          </div>

          {/* Mini 3-Stat Bottom Strip */}
          <div
            className="mt-6 pt-3.5 border-t border-emerald-500/20 grid grid-cols-3 divide-x divide-emerald-500/20 text-center rounded-xl p-2.5 border border-emerald-500/15"
            style={{ background: "rgba(3, 21, 14, 0.7)" }}
          >
            <div className="px-1">
              <div className="text-base font-extrabold text-white">{displayTopics.length}</div>
              <div className="text-[10px] font-semibold text-emerald-300/70 uppercase tracking-wider mt-0.5">
                Topics
              </div>
            </div>
            <div className="px-1">
              <div className="text-base font-extrabold text-white">{totalProblems}</div>
              <div className="text-[10px] font-semibold text-emerald-300/70 uppercase tracking-wider mt-0.5">
                Problems
              </div>
            </div>
            <div className="px-1">
              <div className="text-base font-extrabold text-white">{fundPct}%</div>
              <div className="text-[10px] font-semibold text-emerald-300/70 uppercase tracking-wider mt-0.5 truncate">
                Fundamental
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Bar Chart & Insights */}
        <div className="lg:col-span-8 xl:col-span-8.5 flex flex-col gap-4">
          {/* TOP CARD: Stylized Vertical Bar Chart */}
          <div
            className="rounded-2xl p-5 sm:p-6 border border-emerald-500/25 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)] flex flex-col"
            style={{ background: "rgba(5, 26, 17, 0.72)" }}
          >
            {/* Chart Area with Y-Axis and Bars */}
            <div className="relative flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {/* Y-Axis */}
              <div className="flex flex-col justify-between items-end pr-2.5 pb-16 text-right select-none border-r border-emerald-500/35 min-w-[28px]">
                {yTicks.map((tick, i) => (
                  <span key={i} className="text-[11px] font-semibold text-emerald-200/80 leading-none">
                    {tick}
                  </span>
                ))}
              </div>

              {/* Grid Lines + Bars Container */}
              <div className="relative flex-1 flex items-end justify-between gap-2.5 sm:gap-3.5 min-w-[580px] h-[210px] pb-16">
                {/* Horizontal Reference Grid Lines */}
                <div className="pointer-events-none absolute inset-x-0 top-0 bottom-16 flex flex-col justify-between">
                  {yTicks.slice(0, 5).map((_, i) => (
                    <div key={i} className="w-full border-b border-emerald-500/10" />
                  ))}
                  <div className="w-full border-b border-emerald-500/30" />
                </div>

                {/* Vertical Topic Bars */}
                {top12.map((item, idx) => {
                  const barHeightPct = Math.min(100, Math.max(8, (item.solved / yMax) * 100));

                  // Determine gradient based on item level
                  const isFund = item.level === "fundamental";
                  const isInter = item.level === "intermediate";
                  const isAdv = item.level === "advanced";

                  const barBg = isFund
                    ? "linear-gradient(to top, #047857 0%, #059669 40%, #10b981 100%)"
                    : isInter
                    ? "linear-gradient(to top, #4d7c0f 0%, #65a30d 40%, #84cc16 100%)"
                    : "linear-gradient(to top, #a16207 0%, #ca8a04 40%, #eab308 100%)";

                  const barGlow = isFund
                    ? "0 0 14px rgba(16, 185, 129, 0.55)"
                    : isInter
                    ? "0 0 14px rgba(132, 204, 22, 0.55)"
                    : "0 0 14px rgba(234, 179, 8, 0.55)";

                  return (
                    <div
                      key={item.tag + idx}
                      className="relative flex-1 flex flex-col items-center justify-end h-full group z-10"
                    >
                      {/* Number Above Bar */}
                      <span className="text-xs sm:text-sm font-bold text-white mb-1.5 transition-transform group-hover:scale-110">
                        {item.solved}
                      </span>

                      {/* The Bar */}
                      <div
                        className="relative w-full max-w-[34px] min-w-[24px] rounded-t-lg rounded-b-sm transition-all duration-500 ease-out cursor-pointer hover:brightness-110"
                        style={{
                          height: `${barHeightPct}%`,
                          background: barBg,
                          boxShadow: barGlow,
                        }}
                      >
                        {/* 3D Specular Highlight down the left side */}
                        <div className="absolute top-0 left-1 w-1 h-full bg-white/30 rounded-full blur-[0.5px]" />
                      </div>

                      {/* Bottom Section: Icon Box + Topic Label */}
                      <div className="absolute top-[152px] flex flex-col items-center">
                        {/* Rounded Square Icon Box */}
                        <div
                          className="w-8 h-8 rounded-lg border border-emerald-400/50 flex items-center justify-center text-emerald-300 transition-all duration-300 group-hover:border-emerald-300 group-hover:scale-110"
                          style={{
                            background: "rgba(7, 37, 26, 0.9)",
                            boxShadow: "0 0 10px rgba(52, 211, 153, 0.25)",
                          }}
                        >
                          {getTopicIcon(item.tag)}
                        </div>

                        {/* Topic Name */}
                        <span
                          title={item.tag}
                          className="text-[10px] sm:text-[11px] font-semibold text-emerald-100/90 text-center leading-tight mt-1.5 max-w-[54px] truncate"
                        >
                          {item.tag}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BOTTOM ROW: "Top Covered Topics" & "Coverage Insight" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. TOP COVERED TOPICS CARD */}
            <div
              className="rounded-2xl p-4 sm:p-5 border border-emerald-500/25 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)] flex flex-col justify-between"
              style={{ background: "rgba(5, 26, 17, 0.72)" }}
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                >
                  <circle cx="12" cy="12" r="10" stroke="#34d399" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" stroke="#34d399" strokeWidth="2" />
                  <circle cx="12" cy="12" r="2" fill="#34d399" />
                </svg>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Top Covered Topics
                </h3>
              </div>

              {/* 3 Top Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-3.5">
                {/* 1st Place */}
                {top3[0] && (
                  <div
                    className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-2.5 py-2 rounded-2xl border border-emerald-400/50 text-center sm:text-left shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-transform hover:scale-105"
                    style={{ background: "rgba(9, 43, 26, 0.9)" }}
                  >
                    {/* Golden Trophy Icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <circle cx="12" cy="12" r="11" fill="#047857" stroke="#34d399" strokeWidth="1.5" />
                      <path d="M8 7h8v3a4 4 0 0 1-8 0V7z" fill="#facc15" stroke="#eab308" strokeWidth="1" />
                      <path d="M8 8H6a2 2 0 0 0 2 2v-2zm8 0h2a2 2 0 0 1-2 2v-2z" fill="#fde047" />
                      <path d="M11 14h2v3h-2z" fill="#facc15" />
                      <path d="M9 17h6v1.5a0.5 0.5 0 0 1-0.5 0.5h-5a0.5 0.5 0 0 1-0.5-0.5V17z" fill="#ca8a04" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{top3[0].tag}</div>
                      <div className="text-[11px] font-semibold text-emerald-300">({top3[0].solved})</div>
                    </div>
                  </div>
                )}

                {/* 2nd Place */}
                {top3[1] && (
                  <div
                    className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-2.5 py-2 rounded-2xl border border-emerald-400/50 text-center sm:text-left shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-transform hover:scale-105"
                    style={{ background: "rgba(9, 43, 26, 0.9)" }}
                  >
                    {/* Medal Icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <circle cx="12" cy="12" r="11" fill="#065f46" stroke="#4ade80" strokeWidth="1.5" />
                      <path d="M9 6l3 4 3-4" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="14" r="4.5" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
                      <path d="M12 12l0.6 1.3 1.4 0.2-1 1 0.2 1.4-1.2-0.6-1.2 0.6 0.2-1.4-1-1 1.4-0.2z" fill="#ffffff" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{top3[1].tag}</div>
                      <div className="text-[11px] font-semibold text-emerald-300">({top3[1].solved})</div>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {top3[2] && (
                  <div
                    className="flex flex-col sm:flex-row items-center gap-1.5 sm:gap-2 px-2.5 py-2 rounded-2xl border border-emerald-400/50 text-center sm:text-left shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-transform hover:scale-105"
                    style={{ background: "rgba(9, 43, 26, 0.9)" }}
                  >
                    {/* Medal Icon */}
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <circle cx="12" cy="12" r="11" fill="#065f46" stroke="#4ade80" strokeWidth="1.5" />
                      <path d="M9 6l3 4 3-4" stroke="#a7f3d0" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="12" cy="14" r="4.5" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
                      <path d="M12 12l0.6 1.3 1.4 0.2-1 1 0.2 1.4-1.2-0.6-1.2 0.6 0.2-1.4-1-1 1.4-0.2z" fill="#ffffff" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold text-white truncate">{top3[2].tag}</div>
                      <div className="text-[11px] font-semibold text-emerald-300">({top3[2].solved})</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. COVERAGE INSIGHT CARD */}
            <div
              className="rounded-2xl p-4 sm:p-5 border border-emerald-500/25 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.08)] flex items-center justify-between gap-4"
              style={{ background: "rgba(5, 26, 17, 0.72)" }}
            >
              {/* Text Side */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="shrink-0 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]"
                  >
                    <rect x="3" y="12" width="4" height="9" rx="1" fill="#34d399" />
                    <rect x="10" y="7" width="4" height="14" rx="1" fill="#4ade80" />
                    <rect x="17" y="3" width="4" height="18" rx="1" fill="#86efac" />
                  </svg>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    Coverage Insight
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                  Most problems are Fundamental ({fundPct}%), with a good mix of Intermediate ({interPct}%) and Advanced ({advPct}%).
                </p>
              </div>

              {/* 3D Rising Bar Chart with Neon Upward Arrow */}
              <div className="relative shrink-0 flex items-center justify-center">
                <svg
                  width="88"
                  height="64"
                  viewBox="0 0 88 64"
                  fill="none"
                  className="drop-shadow-[0_0_16px_rgba(74,222,128,0.55)]"
                >
                  <defs>
                    <linearGradient id="bar1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#4ade80" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                    <linearGradient id="bar2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#86efac" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                    <linearGradient id="bar3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#a7f3d0" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                    <linearGradient id="arrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#86efac" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                  </defs>

                  {/* 3 Isometric-Style Rising Columns */}
                  {/* Bar 1 (Short) */}
                  <rect x="12" y="44" width="13" height="18" rx="3" fill="url(#bar1Grad)" />
                  {/* Bar 2 (Medium) */}
                  <rect x="32" y="28" width="13" height="34" rx="3" fill="url(#bar2Grad)" />
                  {/* Bar 3 (Tall) */}
                  <rect x="52" y="12" width="13" height="50" rx="3" fill="url(#bar3Grad)" />

                  {/* Upward Glowing Curved Arrow */}
                  <path
                    d="M12 40 C 28 32, 48 20, 72 8"
                    stroke="url(#arrowGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Arrowhead */}
                  <polygon points="72,4 78,10 67,13" fill="#86efac" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
