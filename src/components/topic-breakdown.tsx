"use client";

import React, { useState } from "react";

export interface TopicItem {
  tag: string;
  solved: number;
  level: "fundamental" | "intermediate" | "advanced" | string;
}

// Fallback topic data matching the reference image layout if data is still loading
const FALLBACK_TOPICS: TopicItem[] = [
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

// Helper: polar to cartesian coordinate conversion
function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: Number((centerX + radius * Math.cos(angleInRadians)).toFixed(2)),
    y: Number((centerY + radius * Math.sin(angleInRadians)).toFixed(2)),
  };
}

// Helper: exact clockwise SVG arc path
function describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(centerX, centerY, radius, startAngle);
  const end = polarToCartesian(centerX, centerY, radius, endAngle);
  const diff = endAngle - startAngle;
  const largeArcFlag = diff > 180 ? "1" : "0";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(" ");
}

// Specialized vector icons for DSA topics
function renderTopicIcon(tag: string) {
  const norm = tag.toLowerCase().trim();

  if (norm.includes("array")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 14 17 10 13 6" />
        <polyline points="7 6 3 10 7 14" />
      </svg>
    );
  }
  if (norm.includes("search") || norm.includes("binary search")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="9" r="5" />
        <line x1="13" y1="13" x2="17" y2="17" />
      </svg>
    );
  }
  if (norm.includes("pointer")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 14l-3-3 3-3" />
        <path d="M3 11h9" />
        <path d="M14 6l3 3-3 3" />
        <path d="M17 9H8" />
      </svg>
    );
  }
  if (norm.includes("math")) {
    return <span className="font-serif font-extrabold text-sm leading-none text-[#34d399]">Σ</span>;
  }
  if (norm.includes("matrix")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="14" height="14" rx="2" />
        <line x1="7.5" y1="3" x2="7.5" y2="17" />
        <line x1="12.5" y1="3" x2="12.5" y2="17" />
        <line x1="3" y1="7.5" x2="17" y2="7.5" />
        <line x1="3" y1="12.5" x2="17" y2="12.5" />
      </svg>
    );
  }
  if (norm.includes("string")) {
    return <span className="font-mono font-bold text-xs leading-none text-[#34d399]">“ ”</span>;
  }
  if (norm.includes("sort")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="4" x2="6" y2="16" />
        <polyline points="3 7 6 4 9 7" />
        <line x1="14" y1="16" x2="14" y2="4" />
        <polyline points="11 13 14 16 17 13" />
      </svg>
    );
  }
  if (norm.includes("simulat")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2.5" y="5.5" width="15" height="9" rx="3" />
        <path d="M5.5 10h2M6.5 9v2" />
        <circle cx="12.5" cy="9" r="0.8" fill="#34d399" />
        <circle cx="14" cy="11" r="0.8" fill="#34d399" />
      </svg>
    );
  }
  if (norm.includes("hash")) {
    return <span className="font-extrabold text-sm leading-none text-[#34d399]">#</span>;
  }
  if (norm.includes("recursi")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="6" strokeDasharray="26 8" />
        <polyline points="8 4 10 2 12 4" />
        <circle cx="10" cy="10" r="2" fill="#34d399" />
      </svg>
    );
  }
  if (norm.includes("dynamic") || norm.includes("dp")) {
    return <span className="font-mono font-bold text-[10px] leading-none text-[#34d399]">&lt;/&gt;</span>;
  }
  if (norm.includes("divide") || norm.includes("conquer") || norm.includes("tree")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="4" r="2" fill="#34d399" />
        <circle cx="5" cy="15" r="2" fill="#34d399" />
        <circle cx="15" cy="15" r="2" fill="#34d399" />
        <path d="M10 6v3m0 0l-5 4m5-4l5 4" />
      </svg>
    );
  }
  if (norm.includes("dfs") || norm.includes("depth")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="10" cy="4" r="2" fill="#34d399" />
        <circle cx="10" cy="10" r="2" fill="#34d399" />
        <circle cx="10" cy="16" r="2" fill="#34d399" />
        <line x1="10" y1="6" x2="10" y2="8" />
        <line x1="10" y1="12" x2="10" y2="14" />
      </svg>
    );
  }
  if (norm.includes("bfs") || norm.includes("breadth")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="4" cy="10" r="2" fill="#34d399" />
        <circle cx="10" cy="10" r="2" fill="#34d399" />
        <circle cx="16" cy="10" r="2" fill="#34d399" />
        <line x1="6" y1="10" x2="8" y2="10" />
        <line x1="12" y1="10" x2="14" y2="10" />
      </svg>
    );
  }
  if (norm.includes("list")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="5" cy="10" r="2" fill="#34d399" />
        <circle cx="15" cy="10" r="2" fill="#34d399" />
        <line x1="7" y1="10" x2="13" y2="10" />
      </svg>
    );
  }
  if (norm.includes("stack") || norm.includes("queue")) {
    return (
      <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round">
        <path d="M4 6h12M4 10h12M4 14h12" />
      </svg>
    );
  }
  if (norm.includes("bit")) {
    return <span className="font-mono font-bold text-[10px] leading-none text-[#34d399]">01</span>;
  }

  // Fallback
  return (
    <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="13 14 17 10 13 6" />
      <polyline points="7 6 3 10 7 14" />
    </svg>
  );
}

// Split topic label into 2 lines for clean centered display
function splitTopicLabel(tag: string): [string, string] {
  const norm = tag.trim();
  if (norm === "Binary Search") return ["Binary", "Search"];
  if (norm === "Two Pointers") return ["Two", "Pointers"];
  if (norm === "Hash Table") return ["Hash", "Table"];
  if (norm === "Dynamic Programming") return ["Dynamic", "Program."];
  if (norm.toLowerCase().includes("divide")) return ["Divide &", "Conquer"];
  if (norm === "Binary Tree") return ["Binary", "Tree"];
  if (norm === "Depth-First Search") return ["Depth-First", "Search"];
  if (norm === "Breadth-First Search") return ["Breadth", "First"];
  if (norm === "Linked List") return ["Linked", "List"];
  if (norm === "Bit Manipulation") return ["Bit", "Manip."];
  if (norm === "Sliding Window") return ["Sliding", "Window"];
  return [norm, ""];
}

export function TopicBreakdown({ topics }: { topics?: TopicItem[] }) {
  const [hoveredTopic, setHoveredTopic] = useState<TopicItem | null>(null);

  // Real data computation
  const displayTopics = topics && topics.length > 0 ? topics : FALLBACK_TOPICS;

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

  const fundPct = totalProblems > 0 ? (fundSolved / totalProblems) * 100 : 0;
  const interPct = totalProblems > 0 ? (interSolved / totalProblems) * 100 : 0;
  const advPct = totalProblems > 0 ? (advSolved / totalProblems) * 100 : 0;

  // Top 12 topics for vertical bar chart
  const top12 = [...displayTopics].sort((a, b) => b.solved - a.solved).slice(0, 12);
  const top3 = top12.slice(0, 3);

  // Dynamic Y-axis scale calculation
  const maxSolved = top12.length > 0 ? Math.max(...top12.map((t) => t.solved)) : 10;
  const yMax = Math.max(10, Math.ceil(maxSolved / 5) * 5);
  const yTicks = [
    yMax,
    Math.round(yMax * 0.8),
    Math.round(yMax * 0.6),
    Math.round(yMax * 0.4),
    Math.round(yMax * 0.2),
    0,
  ];

  // EXACT CIRCULAR PROGRESS BAR / GAUGE CALCULATION (360 degrees)
  const radius = 62;
  const fundDeg = (fundPct / 100) * 360;
  const interDeg = (interPct / 100) * 360;
  const advDeg = (advPct / 100) * 360;

  // Tiny 2-degree clean gap between segments
  const gapDeg = 2;
  const arc1 = fundDeg > 4 ? describeArc(95, 95, radius, gapDeg, fundDeg - gapDeg) : null;
  const arc2 =
    interDeg > 4
      ? describeArc(95, 95, radius, fundDeg + gapDeg, fundDeg + interDeg - gapDeg)
      : null;
  const arc3 =
    advDeg > 4
      ? describeArc(95, 95, radius, fundDeg + interDeg + gapDeg, 360 - gapDeg)
      : null;

  // Tier ranking for Coverage Insight prose
  const tiers = [
    { name: "Fundamental", pct: fundPct, count: fundSolved },
    { name: "Intermediate", pct: interPct, count: interSolved },
    { name: "Advanced", pct: advPct, count: advSolved },
  ].sort((a, b) => b.count - a.count);

  const dominant = tiers[0];
  const second = tiers[1];
  const third = tiers[2];

  // Dynamic Pillar heights in Coverage Insight (proportional to real percentages)
  const maxTierPct = Math.max(fundPct, interPct, advPct, 1);
  const hFund = Math.max(12, Math.round((fundPct / maxTierPct) * 52));
  const hInter = Math.max(12, Math.round((interPct / maxTierPct) * 52));
  const hAdv = Math.max(12, Math.round((advPct / maxTierPct) * 52));

  return (
    <div
      className="relative w-full rounded-[32px] p-6 sm:p-7 overflow-hidden text-white transition-all"
      style={{
        background: "linear-gradient(135deg, rgba(8, 14, 10, 0.95) 0%, rgba(3, 6, 4, 0.98) 50%, rgba(1, 3, 2, 0.99) 100%)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
        border: "1.5px solid rgba(52, 211, 153, 0.38)",
        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.95), inset 0 1px 2px rgba(255, 255, 255, 0.22), inset 0 0 30px rgba(16, 185, 129, 0.05), 0 0 35px rgba(16, 185, 129, 0.15)",
      }}
    >
      {/* Subtle Dark Ambient Light Behind Obsidian Glass (Pure Black Base) */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-[90px]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-lime-500/08 blur-[90px]" />

      {/* 1. HEADER SECTION */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Title + Subtitle + 3D Layers Badge */}
        <div className="flex items-center gap-3.5">
          {/* 3D Stacked Layers Icon Badge */}
          <div className="relative shrink-0 flex items-center justify-center w-12 h-12 rounded-[14px] bg-gradient-to-br from-[#166534] to-[#052e16] border border-emerald-400/50 shadow-[0_0_15px_rgba(34,197,94,0.55),inset_0_1px_1px_rgba(255,255,255,0.3)]">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="hdrTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#86efac" />
                  <stop offset="100%" stopColor="#22c55e" />
                </linearGradient>
                <linearGradient id="hdrMidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4ade80" />
                  <stop offset="100%" stopColor="#16a34a" />
                </linearGradient>
                <linearGradient id="hdrBotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#15803d" />
                </linearGradient>
              </defs>
              {/* Bottom Layer */}
              <path d="M16 23 L24 19 L16 15 L8 19 Z" fill="url(#hdrBotGrad)" opacity="0.65" />
              <path d="M8 19 L16 23 L24 19 L24 21 L16 25 L8 21 Z" fill="#047857" opacity="0.9" />
              {/* Middle Layer */}
              <path d="M16 18.5 L24 14.5 L16 10.5 L8 14.5 Z" fill="url(#hdrMidGrad)" opacity="0.85" />
              <path d="M8 14.5 L16 18.5 L24 14.5 L24 16.5 L16 20.5 L8 16.5 Z" fill="#059669" opacity="0.9" />
              {/* Top Layer */}
              <path d="M16 14 L24 10 L16 6 L8 10 Z" fill="url(#hdrTopGrad)" />
              <path d="M8 10 L16 14 L24 10 L24 12 L16 16 L8 12 Z" fill="#10b981" />
            </svg>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              Topic Coverage
            </h2>
            <p className="text-xs sm:text-sm font-medium text-emerald-300/80 mt-0.5">
              Problem distribution across DSA topics
            </p>
          </div>
        </div>

        {/* Legend Filter Pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Fundamental */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-[#06120b]/90 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-transform hover:scale-105">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00f076] shadow-[0_0_10px_#00f076]" />
            <span className="text-xs font-bold text-white tracking-wide">Fundamental</span>
          </div>

          {/* Intermediate */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-lime-500/40 bg-[#0a150b]/90 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-transform hover:scale-105">
            <span className="w-2.5 h-2.5 rounded-full bg-[#88ff00] shadow-[0_0_10px_#88ff00]" />
            <span className="text-xs font-bold text-white tracking-wide">Intermediate</span>
          </div>

          {/* Advanced */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-yellow-500/40 bg-[#161a08]/90 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] transition-transform hover:scale-105">
            <span className="w-2.5 h-2.5 rounded-full bg-[#eaff00] shadow-[0_0_10px_#eaff00]" />
            <span className="text-xs font-bold text-white tracking-wide">Advanced</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN LAYOUT GRID WITH AUTHENTIC GLASSMORPHISM */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* LEFT COLUMN: Donut Gauge & Summary (Col 1-4) */}
        <div
          className="lg:col-span-4 xl:col-span-3.5 rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all"
          style={{
            background: "linear-gradient(145deg, rgba(14, 22, 17, 0.72) 0%, rgba(5, 10, 7, 0.85) 100%)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(74, 222, 128, 0.3)",
            boxShadow: "inset 0 1px 1.5px rgba(255, 255, 255, 0.18), inset 0 0 20px rgba(16, 185, 129, 0.04), 0 12px 30px rgba(0, 0, 0, 0.65)",
          }}
        >
          {/* REAL PROGRESS CIRCLE / DONUT GAUGE */}
          <div className="relative flex items-center justify-center my-1">
            <svg width="190" height="190" viewBox="0 0 190 190">
              <defs>
                <linearGradient id="realFundGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f076" />
                  <stop offset="100%" stopColor="#00a852" />
                </linearGradient>
                <linearGradient id="realInterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#88ff00" />
                  <stop offset="100%" stopColor="#55aa00" />
                </linearGradient>
                <linearGradient id="realAdvGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eaff00" />
                  <stop offset="100%" stopColor="#b3bb00" />
                </linearGradient>
                <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f076" floodOpacity="0.6" />
                </filter>
              </defs>

              {/* Background Track Circle */}
              <circle cx="95" cy="95" r={radius} fill="none" stroke="#051a10" strokeWidth="15" />

              {/* Inner Dark Glass Disc */}
              <circle cx="95" cy="95" r={radius - 10} fill="#040e08" stroke="rgba(74, 222, 128, 0.25)" strokeWidth="1" />

              {/* Arc 1: Fundamental (Real Progress Arc) */}
              {arc1 && (
                <path
                  d={arc1}
                  fill="none"
                  stroke="url(#realFundGrad)"
                  strokeWidth="15"
                  strokeLinecap="butt"
                  filter="url(#ringGlow)"
                  className="transition-all duration-700 ease-out"
                />
              )}

              {/* Arc 2: Intermediate (Real Progress Arc) */}
              {arc2 && (
                <path
                  d={arc2}
                  fill="none"
                  stroke="url(#realInterGrad)"
                  strokeWidth="15"
                  strokeLinecap="butt"
                  filter="url(#ringGlow)"
                  className="transition-all duration-700 ease-out"
                />
              )}

              {/* Arc 3: Advanced (Real Progress Arc) */}
              {arc3 && (
                <path
                  d={arc3}
                  fill="none"
                  stroke="url(#realAdvGrad)"
                  strokeWidth="15"
                  strokeLinecap="butt"
                  filter="url(#ringGlow)"
                  className="transition-all duration-700 ease-out"
                />
              )}
            </svg>

            {/* Center Content: </> Code Badge, Total Count, Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none select-none">
              {/* </> Code Badge */}
              <div className="px-2 py-0.5 rounded-md bg-[#051c12] border border-emerald-500/50 text-[#34d399] font-mono text-[11px] font-black shadow-[0_0_8px_rgba(16,185,129,0.35)] mb-1">
                &lt;/&gt;
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
                {totalProblems}
              </div>
              <div className="text-[11px] font-bold text-emerald-200/80 mt-1">
                Total Problems
              </div>
            </div>
          </div>

          {/* Breakdown Percentage Rows */}
          <div className="space-y-3 mt-5">
            {/* Fundamental */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00f076] shadow-[0_0_8px_#00f076]" />
                <span className="font-semibold text-emerald-100">Fundamental</span>
              </div>
              <span className="font-black text-white tracking-wide">
                {fundSolved}{" "}
                <span className="font-normal text-emerald-300/85">({fundPct.toFixed(1)}%)</span>
              </span>
            </div>

            {/* Intermediate */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#88ff00] shadow-[0_0_8px_#88ff00]" />
                <span className="font-semibold text-emerald-100">Intermediate</span>
              </div>
              <span className="font-black text-white tracking-wide">
                {interSolved}{" "}
                <span className="font-normal text-lime-300/85">({interPct.toFixed(1)}%)</span>
              </span>
            </div>

            {/* Advanced */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#eaff00] shadow-[0_0_8px_#eaff00]" />
                <span className="font-semibold text-emerald-100">Advanced</span>
              </div>
              <span className="font-black text-white tracking-wide">
                {advSolved}{" "}
                <span className="font-normal text-yellow-300/85">({advPct.toFixed(1)}%)</span>
              </span>
            </div>
          </div>

          {/* Mini 3-Stat Bottom Strip */}
          <div className="mt-6 pt-3.5 border-t border-emerald-500/20 grid grid-cols-3 divide-x divide-emerald-500/20 text-center rounded-xl p-2.5 border border-emerald-500/20 bg-[#030a06]/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.08)]">
            <div className="px-1">
              <div className="text-base font-black text-white">{displayTopics.length}</div>
              <div className="text-[10px] font-bold text-emerald-300/75 uppercase tracking-wider mt-0.5">
                Topics
              </div>
            </div>
            <div className="px-1">
              <div className="text-base font-black text-white">{totalProblems}</div>
              <div className="text-[10px] font-bold text-emerald-300/75 uppercase tracking-wider mt-0.5">
                Problems
              </div>
            </div>
            <div className="px-1">
              <div className="text-base font-black text-white">{fundPct.toFixed(1)}%</div>
              <div className="text-[10px] font-bold text-emerald-300/75 uppercase tracking-wider mt-0.5 truncate">
                Fundamental
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Vertical Bar Chart & Bottom Cards (Col 5-12) */}
        <div className="lg:col-span-8 xl:col-span-8.5 flex flex-col gap-4">
          {/* TOP CARD: Stylized Vertical Bar Chart */}
          <div
            className="rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all"
            style={{
              background: "linear-gradient(145deg, rgba(14, 22, 17, 0.72) 0%, rgba(5, 10, 7, 0.85) 100%)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(74, 222, 128, 0.3)",
              boxShadow: "inset 0 1px 1.5px rgba(255, 255, 255, 0.18), inset 0 0 20px rgba(16, 185, 129, 0.04), 0 12px 30px rgba(0, 0, 0, 0.65)",
            }}
          >
            {/* Chart Area with Y-Axis and Bars */}
            <div className="relative flex items-stretch gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {/* Y-Axis */}
              <div className="flex flex-col justify-between items-end pr-2.5 pb-20 text-right select-none border-r border-emerald-500/35 min-w-[28px] h-[220px]">
                {yTicks.map((tick, i) => (
                  <span key={i} className="text-[11px] font-bold text-emerald-200/85 leading-none">
                    {tick}
                  </span>
                ))}
              </div>

              {/* Grid Lines + 12 Bars Container */}
              <div className="relative flex-1 flex items-end justify-between gap-2 sm:gap-3.5 min-w-[580px] h-[220px] pb-20">
                {/* Horizontal Reference Grid Lines */}
                <div className="pointer-events-none absolute inset-x-0 top-0 bottom-20 flex flex-col justify-between">
                  {yTicks.slice(0, 5).map((_, i) => (
                    <div key={i} className="w-full border-b border-emerald-500/10 border-dashed" />
                  ))}
                  <div className="w-full border-b border-emerald-500/35" />
                </div>

                {/* Vertical Topic Bars */}
                {top12.map((item, idx) => {
                  const barHeightPct = Math.min(100, Math.max(10, (item.solved / yMax) * 100));

                  const isFund = item.level === "fundamental";
                  const isInter = item.level === "intermediate";

                  const barBg = isFund
                    ? "linear-gradient(to top, #047857 0%, #059669 45%, #00f076 100%)"
                    : isInter
                    ? "linear-gradient(to top, #4d7c0f 0%, #65a30d 45%, #88ff00 100%)"
                    : "linear-gradient(to top, #a16207 0%, #ca8a04 45%, #eaff00 100%)";

                  const barGlow = isFund
                    ? "0 0 14px rgba(0, 240, 118, 0.55)"
                    : isInter
                    ? "0 0 14px rgba(136, 255, 0, 0.55)"
                    : "0 0 14px rgba(234, 255, 0, 0.55)";

                  const [labelLine1, labelLine2] = splitTopicLabel(item.tag);

                  return (
                    <div
                      key={item.tag + idx}
                      onMouseEnter={() => setHoveredTopic(item)}
                      onMouseLeave={() => setHoveredTopic(null)}
                      className="relative flex-1 flex flex-col items-center justify-end h-full group z-10 cursor-pointer"
                    >
                      {/* Number Above Bar */}
                      <span className="text-xs sm:text-sm font-black text-white mb-1.5 transition-transform group-hover:scale-125">
                        {item.solved}
                      </span>

                      {/* The 3D Glass Bar */}
                      <div
                        className="relative w-full max-w-[34px] min-w-[24px] rounded-t-lg rounded-b-sm transition-all duration-500 ease-out group-hover:brightness-125"
                        style={{
                          height: `${barHeightPct}%`,
                          background: barBg,
                          boxShadow: barGlow,
                        }}
                      >
                        {/* Specular highlight down the left edge */}
                        <div className="absolute top-1 left-1 w-1 h-[calc(100%-8px)] bg-white/35 rounded-full blur-[0.5px]" />
                      </div>

                      {/* Bottom Section: Rounded Icon Box + Label */}
                      <div className="absolute top-[148px] flex flex-col items-center">
                        {/* Rounded Square Icon Box */}
                        <div className="w-8 h-8 rounded-lg bg-[#06150e]/95 border border-emerald-400/50 flex items-center justify-center text-emerald-300 shadow-[0_0_10px_rgba(52,211,153,0.3)] transition-all duration-300 group-hover:border-emerald-300 group-hover:scale-110">
                          {renderTopicIcon(item.tag)}
                        </div>

                        {/* Centered Topic Name (2 lines) */}
                        <div className="text-[10px] sm:text-[10.5px] font-bold text-emerald-100/90 text-center leading-tight mt-1 max-w-[56px] truncate">
                          <div>{labelLine1}</div>
                          {labelLine2 && <div>{labelLine2}</div>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tooltip on Hover */}
            {hoveredTopic && (
              <div className="mt-2 text-center text-xs font-semibold text-emerald-200 bg-[#05140d]/80 rounded-lg py-1 border border-emerald-500/20">
                <span className="text-white font-bold">{hoveredTopic.tag}</span>: {hoveredTopic.solved} solved ({hoveredTopic.level.toUpperCase()} • {((hoveredTopic.solved / totalProblems) * 100).toFixed(1)}% of total)
              </div>
            )}
          </div>

          {/* BOTTOM ROW: "Top Covered Topics" & "Coverage Insight" */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 1. TOP COVERED TOPICS CARD */}
            <div
              className="rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all"
              style={{
                background: "linear-gradient(145deg, rgba(14, 22, 17, 0.72) 0%, rgba(5, 10, 7, 0.85) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                boxShadow: "inset 0 1px 1.5px rgba(255, 255, 255, 0.18), inset 0 0 20px rgba(16, 185, 129, 0.04), 0 12px 30px rgba(0, 0, 0, 0.65)",
              }}
            >
              {/* Header with Bullseye Target Icon */}
              <div className="flex items-center gap-2">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="shrink-0 drop-shadow-[0_0_8px_rgba(74,222,128,0.6)]">
                  <circle cx="12" cy="12" r="10" stroke="#34d399" strokeWidth="2" />
                  <circle cx="12" cy="12" r="6" stroke="#34d399" strokeWidth="1.8" />
                  <circle cx="12" cy="12" r="2.5" fill="#34d399" />
                </svg>
                <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                  Top Covered Topics
                </h3>
              </div>

              {/* 3 Real Badges */}
              <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-3.5">
                {/* 1st Place */}
                {top3[0] && (
                  <div className="flex flex-col items-center sm:items-start p-2.5 rounded-2xl border border-emerald-400/50 bg-[#06180f]/95 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-transform hover:scale-105">
                    <div className="flex items-center gap-1.5 w-full">
                      {/* Golden Trophy Icon Badge */}
                      <div className="w-6 h-6 rounded-full bg-[#047857] border border-[#34d399] flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path d="M8 7h8v3a4 4 0 0 1-8 0V7z" fill="#facc15" stroke="#eab308" strokeWidth="1" />
                          <path d="M8 8H6a2 2 0 0 0 2 2v-2zm8 0h2a2 2 0 0 1-2 2v-2z" fill="#fde047" />
                          <path d="M11 14h2v3h-2z" fill="#facc15" />
                          <path d="M9 17h6v1.5h-6z" fill="#ca8a04" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate">{top3[0].tag}</div>
                        <div className="text-xs font-black text-[#34d399]">({top3[0].solved})</div>
                      </div>
                    </div>
                    {/* Mini Real Progress Line */}
                    <div className="w-full h-1 bg-[#030d07] rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full" style={{ width: "100%" }} />
                    </div>
                  </div>
                )}

                {/* 2nd Place */}
                {top3[1] && (
                  <div className="flex flex-col items-center sm:items-start p-2.5 rounded-2xl border border-emerald-400/50 bg-[#06180f]/95 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-transform hover:scale-105">
                    <div className="flex items-center gap-1.5 w-full">
                      {/* Lime Medal Icon Badge */}
                      <div className="w-6 h-6 rounded-full bg-[#065f46] border border-[#4ade80] flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="14" r="5" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
                          <path d="M12 11.5l0.8 1.6 1.8 0.3-1.3 1.3 0.3 1.8-1.6-0.8-1.6 0.8 0.3-1.8-1.3-1.3 1.8-0.3z" fill="#ffffff" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate">{top3[1].tag}</div>
                        <div className="text-xs font-black text-[#34d399]">({top3[1].solved})</div>
                      </div>
                    </div>
                    {/* Mini Real Progress Line */}
                    <div className="w-full h-1 bg-[#030d07] rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full"
                        style={{ width: `${top3[0] ? (top3[1].solved / top3[0].solved) * 100 : 80}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {top3[2] && (
                  <div className="flex flex-col items-center sm:items-start p-2.5 rounded-2xl border border-emerald-400/50 bg-[#06180f]/95 backdrop-blur-md shadow-[0_0_12px_rgba(16,185,129,0.25)] transition-transform hover:scale-105">
                    <div className="flex items-center gap-1.5 w-full">
                      {/* Lime Medal Icon Badge */}
                      <div className="w-6 h-6 rounded-full bg-[#065f46] border border-[#4ade80] flex items-center justify-center shrink-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="14" r="5" fill="#22c55e" stroke="#86efac" strokeWidth="1" />
                          <path d="M12 11.5l0.8 1.6 1.8 0.3-1.3 1.3 0.3 1.8-1.6-0.8-1.6 0.8 0.3-1.8-1.3-1.3 1.8-0.3z" fill="#ffffff" />
                        </svg>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[11px] font-bold text-white truncate">{top3[2].tag}</div>
                        <div className="text-xs font-black text-[#34d399]">({top3[2].solved})</div>
                      </div>
                    </div>
                    {/* Mini Real Progress Line */}
                    <div className="w-full h-1 bg-[#030d07] rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-lime-400 rounded-full"
                        style={{ width: `${top3[0] ? (top3[2].solved / top3[0].solved) * 100 : 60}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 2. COVERAGE INSIGHT CARD (With REAL Graphical Data) */}
            <div
              className="rounded-2xl p-4 sm:p-5 flex items-center justify-between gap-3 transition-all"
              style={{
                background: "linear-gradient(145deg, rgba(14, 22, 17, 0.72) 0%, rgba(5, 10, 7, 0.85) 100%)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(74, 222, 128, 0.3)",
                boxShadow: "inset 0 1px 1.5px rgba(255, 255, 255, 0.18), inset 0 0 20px rgba(16, 185, 129, 0.04), 0 12px 30px rgba(0, 0, 0, 0.65)",
              }}
            >
              {/* Left Side: Real-time Prose Commentary */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-end gap-0.5 h-4">
                    <span className="w-1 h-2 rounded-sm bg-[#34d399] shadow-[0_0_6px_#34d399]" />
                    <span className="w-1 h-3 rounded-sm bg-[#4ade80] shadow-[0_0_6px_#4ade80]" />
                    <span className="w-1 h-4 rounded-sm bg-[#86efac] shadow-[0_0_6px_#86efac]" />
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white tracking-tight">
                    Coverage Insight
                  </h3>
                </div>
                <p className="text-xs sm:text-[13px] text-emerald-100/90 leading-relaxed font-medium">
                  Most problems are <span className="font-bold text-white">{dominant.name}</span> ({dominant.pct.toFixed(1)}%), with a good mix of <span className="font-bold text-white">{second.name}</span> ({second.pct.toFixed(1)}%) and <span className="font-bold text-white">{third.name}</span> ({third.pct.toFixed(1)}%).
                </p>
              </div>

              {/* Right Side: REAL Dynamic Graphical Tier Chart + Glowing Neon Upward Arrow */}
              <div className="relative shrink-0 flex items-end justify-center w-24 h-20 select-none">
                <svg width="96" height="80" viewBox="0 0 96 80" fill="none" className="drop-shadow-[0_0_16px_rgba(74,222,128,0.6)]">
                  <defs>
                    <linearGradient id="realBar1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00f076" />
                      <stop offset="100%" stopColor="#057838" />
                    </linearGradient>
                    <linearGradient id="realBar2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#88ff00" />
                      <stop offset="100%" stopColor="#4f8a00" />
                    </linearGradient>
                    <linearGradient id="realBar3" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#eaff00" />
                      <stop offset="100%" stopColor="#888f00" />
                    </linearGradient>
                    <linearGradient id="realArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00f076" />
                      <stop offset="50%" stopColor="#88ff00" />
                      <stop offset="100%" stopColor="#ffffff" />
                    </linearGradient>
                    <filter id="realGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#88ff00" floodOpacity="0.85" />
                    </filter>
                  </defs>

                  {/* 3 Real Graphical Tier Pillars */}
                  {/* Pillar 1: Fundamental (Real % Height) */}
                  <g>
                    <rect
                      x="10"
                      y={70 - hFund}
                      width="15"
                      height={hFund}
                      rx="4"
                      fill="url(#realBar1)"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="0.8"
                    />
                    <rect x="12" y={72 - hFund} width="2" height={Math.max(2, hFund - 4)} rx="1" fill="#ffffff" opacity="0.35" />
                  </g>

                  {/* Pillar 2: Intermediate (Real % Height) */}
                  <g>
                    <rect
                      x="34"
                      y={70 - hInter}
                      width="15"
                      height={hInter}
                      rx="4"
                      fill="url(#realBar2)"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="0.8"
                    />
                    <rect x="36" y={72 - hInter} width="2" height={Math.max(2, hInter - 4)} rx="1" fill="#ffffff" opacity="0.35" />
                  </g>

                  {/* Pillar 3: Advanced (Real % Height) */}
                  <g>
                    <rect
                      x="58"
                      y={70 - hAdv}
                      width="15"
                      height={hAdv}
                      rx="4"
                      fill="url(#realBar3)"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="0.8"
                    />
                    <rect x="60" y={72 - hAdv} width="2" height={Math.max(2, hAdv - 4)} rx="1" fill="#ffffff" opacity="0.35" />
                  </g>

                  {/* Glowing Real Trend Line & Arrowhead */}
                  <path
                    d={`M 10 52 C 34 38, 58 24, 82 8`}
                    stroke="url(#realArrowGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#realGlow)"
                  />
                  <polygon points="82,4 89,10 78,13" fill="#ffffff" filter="url(#realGlow)" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
