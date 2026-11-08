"use client";

import React from "react";

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
function renderTopicIcon(tag: string, x: number, y: number) {
  const norm = tag.toLowerCase().trim();

  if (norm.includes("array")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <polyline points="13 14 17 10 13 6" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="7 6 3 10 7 14" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("search") || norm.includes("binary search")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="9.5" cy="9.5" r="5" stroke="#34d399" strokeWidth="2" fill="none" />
        <line x1="13.5" y1="13.5" x2="17.5" y2="17.5" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }
  if (norm.includes("pointer")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <path d="M6 14l-3-3 3-3" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M3 11h9" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 6l3 3-3 3" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M17 9H8" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    );
  }
  if (norm.includes("math")) {
    return (
      <text x={x + 10} y={y + 15} textAnchor="middle" fontSize="14" fontWeight="900" fill="#34d399" fontFamily="serif">
        Σ
      </text>
    );
  }
  if (norm.includes("matrix")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="4" y="4" width="12" height="12" rx="1.5" stroke="#34d399" strokeWidth="1.5" fill="none" />
        <line x1="8" y1="4" x2="8" y2="16" stroke="#34d399" strokeWidth="1.2" />
        <line x1="12" y1="4" x2="12" y2="16" stroke="#34d399" strokeWidth="1.2" />
        <line x1="4" y1="8" x2="16" y2="8" stroke="#34d399" strokeWidth="1.2" />
        <line x1="4" y1="12" x2="16" y2="12" stroke="#34d399" strokeWidth="1.2" />
      </g>
    );
  }
  if (norm.includes("string")) {
    return (
      <text x={x + 10} y={y + 15} textAnchor="middle" fontSize="13" fontWeight="900" fill="#34d399" fontFamily="monospace">
        “ ”
      </text>
    );
  }
  if (norm.includes("sort")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <line x1="6" y1="4" x2="6" y2="16" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
        <polyline points="3 7 6 4 9 7" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="14" y1="16" x2="14" y2="4" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
        <polyline points="11 13 14 16 17 13" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("simulat")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="3" y="6" width="14" height="9" rx="2.5" stroke="#34d399" strokeWidth="1.5" fill="none" />
        <path d="M6 10.5h2M7 9.5v2" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="13" cy="9.5" r="0.8" fill="#34d399" />
        <circle cx="14.5" cy="11.5" r="0.8" fill="#34d399" />
      </g>
    );
  }
  if (norm.includes("hash")) {
    return (
      <text x={x + 10} y={y + 15} textAnchor="middle" fontSize="14" fontWeight="900" fill="#34d399">
        #
      </text>
    );
  }
  if (norm.includes("recursi")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="10" r="6" stroke="#34d399" strokeWidth="1.8" fill="none" strokeDasharray="28 8" />
        <polyline points="8 4 10 2 12 4" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="10" cy="10" r="2.2" fill="#34d399" />
      </g>
    );
  }
  if (norm.includes("dynamic") || norm.includes("dp")) {
    return (
      <text x={x + 10} y={y + 14} textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#34d399" fontFamily="monospace">
        &lt;/&gt;
      </text>
    );
  }
  if (norm.includes("divide") || norm.includes("conquer") || norm.includes("tree")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2" fill="#34d399" />
        <circle cx="5" cy="15" r="2" fill="#34d399" />
        <circle cx="15" cy="15" r="2" fill="#34d399" />
        <path d="M10 6v3m0 0l-5 4m5-4l5 4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("dfs") || norm.includes("depth")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2" fill="#34d399" />
        <circle cx="10" cy="10.5" r="2" fill="#34d399" />
        <circle cx="10" cy="16.5" r="2" fill="#34d399" />
        <line x1="10" y1="6" x2="10" y2="8.5" stroke="#34d399" strokeWidth="1.5" />
        <line x1="10" y1="12.5" x2="10" y2="14.5" stroke="#34d399" strokeWidth="1.5" />
      </g>
    );
  }
  if (norm.includes("bfs") || norm.includes("breadth")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="4" cy="10" r="2" fill="#34d399" />
        <circle cx="10" cy="10" r="2" fill="#34d399" />
        <circle cx="16" cy="10" r="2" fill="#34d399" />
        <line x1="6" y1="10" x2="8" y2="10" stroke="#34d399" strokeWidth="1.5" />
        <line x1="12" y1="10" x2="14" y2="10" stroke="#34d399" strokeWidth="1.5" />
      </g>
    );
  }
  if (norm.includes("list")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="5" cy="10" r="2" fill="#34d399" />
        <circle cx="15" cy="10" r="2" fill="#34d399" />
        <line x1="7" y1="10" x2="13" y2="10" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    );
  }
  if (norm.includes("stack") || norm.includes("queue")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <path d="M4 6h12M4 10h12M4 14h12" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    );
  }
  if (norm.includes("bit")) {
    return (
      <text x={x + 10} y={y + 14} textAnchor="middle" fontSize="10" fontWeight="900" fill="#34d399" fontFamily="monospace">
        01
      </text>
    );
  }

  // Default fallback
  return (
    <g transform={`translate(${x}, ${y})`}>
      <polyline points="13 14 17 10 13 6" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <polyline points="7 6 3 10 7 14" stroke="#34d399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
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

  const fundPct = totalProblems > 0 ? (fundSolved / totalProblems) * 100 : 64.7;
  const interPct = totalProblems > 0 ? (interSolved / totalProblems) * 100 : 26.5;
  const advPct = totalProblems > 0 ? (advSolved / totalProblems) * 100 : 8.8;

  // Top 12 topics for vertical bar chart
  const top12 = [...displayTopics].sort((a, b) => b.solved - a.solved).slice(0, 12);
  const top3 = top12.slice(0, 3);

  // Dynamic Y-axis scale calculation (neatly steps by 5s or 2s)
  const maxSolved = top12.length > 0 ? Math.max(...top12.map((t) => t.solved)) : 10;
  const yMax = Math.max(10, Math.ceil(maxSolved / 5) * 5);
  const yTicks = [
    { val: yMax, y: 126 },
    { val: Math.round(yMax * 0.8), y: 150 },
    { val: Math.round(yMax * 0.6), y: 174 },
    { val: Math.round(yMax * 0.4), y: 198 },
    { val: Math.round(yMax * 0.2), y: 222 },
    { val: 0, y: 246 },
  ];

  // EXACT CIRCULAR PROGRESS BAR CALCULATION (Real distribution in degrees)
  const radius = 64;
  const deg1 = Math.max(14, (fundPct / 100) * 360);
  const deg2 = Math.max(14, (interPct / 100) * 360);
  const deg3 = Math.max(10, 360 - deg1 - deg2);

  // Exact clockwise arc paths with 2-degree clean gap
  const arc1 = describeArc(156, 196, radius, 1, deg1 - 1);
  const arc2 = describeArc(156, 196, radius, deg1 + 1, deg1 + deg2 - 1);
  const arc3 = describeArc(156, 196, radius, deg1 + deg2 + 1, 359);

  return (
    <div className="w-full overflow-hidden select-none">
      <svg
        viewBox="0 0 1024 512"
        className="w-full h-auto drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          {/* Outer Black Obsidian Gradient (Pure Black Base, NOT Green!) */}
          <linearGradient id="tcOuterBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#080e0a" stopOpacity="0.98" />
            <stop offset="50%" stopColor="#040705" stopOpacity="0.99" />
            <stop offset="100%" stopColor="#010302" stopOpacity="1" />
          </linearGradient>

          {/* Subcard Glass Fill (Deep dark glass with slight green tint) */}
          <linearGradient id="tcSubGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d1812" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#040906" stopOpacity="0.92" />
          </linearGradient>

          {/* Outer Border Glowing Gradient */}
          <linearGradient id="tcOuterBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.55" />
            <stop offset="40%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#15803d" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#86efac" stopOpacity="0.5" />
          </linearGradient>

          {/* Subcard Border Gradient */}
          <linearGradient id="tcSubBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.25" />
          </linearGradient>

          {/* Circle Ring Gradients (Bright Neon Matching Image) */}
          <linearGradient id="tcRingFund" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f076" />
            <stop offset="100%" stopColor="#00a852" />
          </linearGradient>
          <linearGradient id="tcRingInter" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#88ff00" />
            <stop offset="100%" stopColor="#55aa00" />
          </linearGradient>
          <linearGradient id="tcRingAdv" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#eaff00" />
            <stop offset="100%" stopColor="#b3bb00" />
          </linearGradient>

          {/* Bar Gradients */}
          <linearGradient id="tcBarFund" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f076" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#022c19" />
          </linearGradient>
          <linearGradient id="tcBarInter" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#88ff00" />
            <stop offset="60%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#1a2e05" />
          </linearGradient>
          <linearGradient id="tcBarAdv" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#eaff00" />
            <stop offset="60%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#422006" />
          </linearGradient>

          {/* 3D Stacked Layers Icon Gradients */}
          <linearGradient id="tcLayerBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>
          <linearGradient id="tcLayerTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>
          <linearGradient id="tcLayerMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#16a34a" />
          </linearGradient>
          <linearGradient id="tcLayerBot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Coverage Insight Upward Arrow Gradient */}
          <linearGradient id="tcArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00f076" />
            <stop offset="60%" stopColor="#88ff00" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="tcGlowOuter" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#22c55e" floodOpacity="0.2" />
          </filter>
          <filter id="tcGlowGreen" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00f076" floodOpacity="0.8" />
          </filter>
          <filter id="tcGlowLime" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#88ff00" floodOpacity="0.8" />
          </filter>
          <filter id="tcGlowYellow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#eaff00" floodOpacity="0.8" />
          </filter>
          <filter id="tcRingGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f076" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* 1. OUTER MAIN CONTAINER (DEEP BLACK OBSIDIAN GLASS) */}
        <rect
          x="16"
          y="16"
          width="992"
          height="480"
          rx="32"
          fill="url(#tcOuterBlack)"
          stroke="url(#tcOuterBorderGrad)"
          strokeWidth="1.5"
          filter="url(#tcGlowOuter)"
        />

        {/* Specular Edge Highlight on Top Rim */}
        <path
          d="M 48 18 L 976 18"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Soft Ambient Radial Lights (Subtle, keeping background deep black) */}
        <circle cx="120" cy="80" r="140" fill="#10b981" opacity="0.04" filter="blur(40px)" />
        <circle cx="860" cy="420" r="150" fill="#84cc16" opacity="0.03" filter="blur(50px)" />

        {/* 2. HEADER BAR */}
        {/* 3D Stacked Layers Icon Badge */}
        <g transform="translate(44, 36)">
          <rect
            width="46"
            height="46"
            rx="14"
            fill="url(#tcLayerBadge)"
            stroke="rgba(74, 222, 128, 0.5)"
            strokeWidth="1.4"
            filter="url(#tcGlowGreen)"
          />
          {/* Bottom Layer */}
          <path d="M23 29 L33 24 L23 19 L13 24 Z" fill="url(#tcLayerBot)" opacity="0.6" />
          <path d="M13 24 L23 29 L33 24 L33 26 L23 31 L13 26 Z" fill="#047857" opacity="0.9" />
          {/* Middle Layer */}
          <path d="M23 24.5 L33 19.5 L23 14.5 L13 19.5 Z" fill="url(#tcLayerMid)" opacity="0.85" />
          <path d="M13 19.5 L23 24.5 L33 19.5 L33 21.5 L23 26.5 L13 21.5 Z" fill="#059669" opacity="0.9" />
          {/* Top Layer */}
          <path d="M23 20 L33 15 L23 10 L13 15 Z" fill="url(#tcLayerTop)" />
          <path d="M13 15 L23 20 L33 15 L33 17 L23 22 L13 17 Z" fill="#10b981" />
        </g>

        {/* Title + Subtitle */}
        <text x="104" y="58" fontSize="24" fontWeight="800" fill="#ffffff" letterSpacing="-0.5">
          Topic Coverage
        </text>
        <text x="104" y="76" fontSize="12.5" fontWeight="500" fill="#86efac" opacity="0.85">
          Problem distribution across DSA topics
        </text>

        {/* Legend Filter Pills (Top Right) */}
        {/* Fundamental */}
        <g transform="translate(584, 42)">
          <rect
            width="124"
            height="34"
            rx="17"
            fill="#06160d"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          <circle cx="18" cy="17" r="5" fill="#00f076" filter="url(#tcGlowGreen)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Fundamental
          </text>
        </g>

        {/* Intermediate */}
        <g transform="translate(724, 42)">
          <rect
            width="134"
            height="34"
            rx="17"
            fill="#0a180d"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          <circle cx="18" cy="17" r="5" fill="#88ff00" filter="url(#tcGlowLime)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Intermediate
          </text>
        </g>

        {/* Advanced */}
        <g transform="translate(874, 42)">
          <rect
            width="114"
            height="34"
            rx="17"
            fill="#161c07"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          <circle cx="18" cy="17" r="5" fill="#eaff00" filter="url(#tcGlowYellow)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Advanced
          </text>
        </g>

        {/* 3. LEFT SUBCARD: Donut Gauge & Summary */}
        <g transform="translate(44, 96)">
          {/* Background Card */}
          <rect
            width="224"
            height="382"
            rx="22"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Top Specular Shine */}
          <path d="M 66 2 L 202 2" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeLinecap="round" />

          {/* REAL PROGRESS CIRCLE / DONUT GAUGE (Center 112, 100) */}
          <g transform="translate(112, 100)">
            {/* Background Track Circle */}
            <circle cx="0" cy="0" r={radius} fill="none" stroke="#061c12" strokeWidth="16" />

            {/* Inner Dark Glass Disc */}
            <circle cx="0" cy="0" r="54" fill="#040e08" stroke="rgba(74, 222, 128, 0.25)" strokeWidth="1" />

            {/* Arc 1: Fundamental (Real Progress Arc) */}
            <path
              d={describeArc(0, 0, radius, 1, deg1 - 1)}
              fill="none"
              stroke="url(#tcRingFund)"
              strokeWidth="16"
              strokeLinecap="butt"
              filter="url(#tcRingGlow)"
            />

            {/* Arc 2: Intermediate (Real Progress Arc) */}
            <path
              d={describeArc(0, 0, radius, deg1 + 1, deg1 + deg2 - 1)}
              fill="none"
              stroke="url(#tcRingInter)"
              strokeWidth="16"
              strokeLinecap="butt"
              filter="url(#tcRingGlow)"
            />

            {/* Arc 3: Advanced (Real Progress Arc) */}
            <path
              d={describeArc(0, 0, radius, deg1 + deg2 + 1, 359)}
              fill="none"
              stroke="url(#tcRingAdv)"
              strokeWidth="16"
              strokeLinecap="butt"
              filter="url(#tcRingGlow)"
            />

            {/* Center Content: </> Badge, Total Count, Label */}
            <rect
              x="-15"
              y="-38"
              width="30"
              height="18"
              rx="5"
              fill="#062215"
              stroke="rgba(74, 222, 128, 0.5)"
              strokeWidth="1"
            />
            <text x="0" y="-25" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
              &lt;/&gt;
            </text>

            <text x="0" y="8" textAnchor="middle" fontSize="36" fontWeight="900" fill="#ffffff" letterSpacing="-1">
              {totalProblems}
            </text>

            <text x="0" y="27" textAnchor="middle" fontSize="11" fontWeight="600" fill="#86efac" opacity="0.85">
              Total Problems
            </text>
          </g>

          {/* Breakdown Percentage Rows */}
          {/* Row 1: Fundamental */}
          <circle cx="24" cy="214" r="4.5" fill="#00f076" filter="url(#tcGlowGreen)" />
          <text x="36" y="218" fontSize="12" fontWeight="600" fill="#e6fffa">
            Fundamental
          </text>
          <text x="204" y="218" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
            {fundSolved}{" "}
            <tspan fontWeight="500" fill="#86efac" opacity="0.85">
              ({fundPct.toFixed(1)}%)
            </tspan>
          </text>

          {/* Row 2: Intermediate */}
          <circle cx="24" cy="242" r="4.5" fill="#88ff00" filter="url(#tcGlowLime)" />
          <text x="36" y="246" fontSize="12" fontWeight="600" fill="#e6fffa">
            Intermediate
          </text>
          <text x="204" y="246" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
            {interSolved}{" "}
            <tspan fontWeight="500" fill="#bef264" opacity="0.85">
              ({interPct.toFixed(1)}%)
            </tspan>
          </text>

          {/* Row 3: Advanced */}
          <circle cx="24" cy="270" r="4.5" fill="#eaff00" filter="url(#tcGlowYellow)" />
          <text x="36" y="274" fontSize="12" fontWeight="600" fill="#e6fffa">
            Advanced
          </text>
          <text x="204" y="274" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
            {advSolved}{" "}
            <tspan fontWeight="500" fill="#fde047" opacity="0.85">
              ({advPct.toFixed(1)}%)
            </tspan>
          </text>

          {/* Bottom 3-Stat Strip Box */}
          <g transform="translate(10, 302)">
            <rect
              width="204"
              height="68"
              rx="14"
              fill="#040b07"
              stroke="rgba(74, 222, 128, 0.22)"
              strokeWidth="1"
            />
            {/* Dividers */}
            <line x1="68" y1="12" x2="68" y2="56" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="1" />
            <line x1="136" y1="12" x2="136" y2="56" stroke="rgba(74, 222, 128, 0.2)" strokeWidth="1" />

            {/* Stat 1: Topics */}
            <text x="34" y="33" textAnchor="middle" fontSize="16" fontWeight="900" fill="#ffffff">
              {displayTopics.length}
            </text>
            <text x="34" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6ee7b7" opacity="0.8">
              Topics
            </text>

            {/* Stat 2: Problems */}
            <text x="102" y="33" textAnchor="middle" fontSize="16" fontWeight="900" fill="#ffffff">
              {totalProblems}
            </text>
            <text x="102" y="50" textAnchor="middle" fontSize="10" fontWeight="700" fill="#6ee7b7" opacity="0.8">
              Problems
            </text>

            {/* Stat 3: Fundamental % */}
            <text x="170" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {fundPct.toFixed(1)}%
            </text>
            <text x="170" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6ee7b7" opacity="0.8">
              Fundamental
            </text>
          </g>
        </g>

        {/* 4. CENTER/RIGHT TOP: 12-Bar DSA Chart */}
        <g transform="translate(284, 96)">
          {/* Background Card */}
          <rect
            width="704"
            height="254"
            rx="22"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Top Specular Shine */}
          <path d="M 30 2 L 674 2" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeLinecap="round" />

          {/* Y-Axis Line (Placed at x=46, inside card bounds) */}
          <line x1="46" y1="30" x2="46" y2="150" stroke="rgba(74, 222, 128, 0.4)" strokeWidth="1.2" />

          {/* Horizontal Reference Lines & Y-Axis Ticks */}
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1="46"
                y1={t.y - 96}
                x2="682"
                y2={t.y - 96}
                stroke="rgba(74, 222, 128, 0.12)"
                strokeDasharray={t.val === 0 ? "none" : "3 3"}
                strokeWidth={t.val === 0 ? "1.4" : "1"}
              />
              <line x1="42" y1={t.y - 96} x2="46" y2={t.y - 96} stroke="rgba(74, 222, 128, 0.4)" strokeWidth="1.2" />
              <text
                x="38"
                y={t.y - 96 + 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="700"
                fill="#a7f3d0"
                opacity="0.9"
              >
                {t.val}
              </text>
            </g>
          ))}

          {/* 12 Vertical Topic Columns (Comfortably spaced, NO scrollbar, NO clipping!) */}
          {top12.map((item, i) => {
            const colX = 76 + i * 51.5;
            const barHeight = Math.max(10, (item.solved / yMax) * 118);
            const barY = 150 - barHeight;

            // Pick color gradient based on level
            const isFund = item.level === "fundamental";
            const isInter = item.level === "intermediate";
            const barFill = isFund ? "url(#tcBarFund)" : isInter ? "url(#tcBarInter)" : "url(#tcBarAdv)";
            const [labelLine1, labelLine2] = splitTopicLabel(item.tag);

            return (
              <g key={item.tag + i}>
                {/* Count Number on top of bar */}
                <text
                  x={colX}
                  y={barY - 5}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="800"
                  fill="#ffffff"
                >
                  {item.solved}
                </text>

                {/* Vertical Bar */}
                <rect
                  x={colX - 15}
                  y={barY}
                  width="30"
                  height={barHeight}
                  rx="6"
                  fill={barFill}
                  stroke="rgba(255, 255, 255, 0.18)"
                  strokeWidth="0.8"
                />

                {/* 3D Specular Highlight down the left side */}
                <rect
                  x={colX - 13}
                  y={barY + 2}
                  width="2.5"
                  height={Math.max(2, barHeight - 4)}
                  rx="1"
                  fill="#ffffff"
                  opacity="0.32"
                />

                {/* Rounded Square Icon Box below baseline */}
                <rect
                  x={colX - 15}
                  y="162"
                  width="30"
                  height="30"
                  rx="8"
                  fill="#06180f"
                  stroke="rgba(74, 222, 128, 0.45)"
                  strokeWidth="1.2"
                />

                {/* Topic Vector Icon */}
                {renderTopicIcon(item.tag, colX - 10, 167)}

                {/* Topic Name Label (Centered, 2 lines without clipping!) */}
                <text
                  x={colX}
                  y="206"
                  textAnchor="middle"
                  fontSize="9.5"
                  fontWeight="700"
                  fill="#d1fae5"
                >
                  {labelLine1}
                </text>
                {labelLine2 && (
                  <text
                    x={colX}
                    y="217"
                    textAnchor="middle"
                    fontSize="9.5"
                    fontWeight="700"
                    fill="#d1fae5"
                  >
                    {labelLine2}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* 5. BOTTOM LEFT/CENTER: Top Covered Topics */}
        <g transform="translate(284, 366)">
          {/* Background Card */}
          <rect
            width="344"
            height="112"
            rx="20"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Top Specular Shine */}
          <path d="M 24 2 L 320 2" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeLinecap="round" />

          {/* Header with Target / Bullseye Icon */}
          <g transform="translate(18, 16)">
            <circle cx="8" cy="8" r="8" stroke="#34d399" strokeWidth="1.8" fill="none" />
            <circle cx="8" cy="8" r="4.8" stroke="#34d399" strokeWidth="1.5" fill="none" />
            <circle cx="8" cy="8" r="2" fill="#34d399" />
            <text x="24" y="12" fontSize="14" fontWeight="800" fill="#ffffff" letterSpacing="-0.3">
              Top Covered Topics
            </text>
          </g>

          {/* 3 Full-Word Badges (NO Arr..., NO Bi..., NO Tw...!) */}
          {/* Badge 1 (1st place) */}
          {top3[0] && (() => {
            const [t1w1, t1w2] = splitTopicLabel(top3[0].tag);
            return (
              <g transform="translate(14, 44)">
                <rect
                  width="100"
                  height="54"
                  rx="14"
                  fill="#082215"
                  stroke="url(#tcSubBorderGrad)"
                  strokeWidth="1.2"
                />
                {/* Golden Trophy Icon Badge */}
                <circle cx="18" cy="27" r="11" fill="#047857" stroke="#34d399" strokeWidth="1.2" />
                <path d="M14 22h8v3a4 4 0 0 1-8 0v-3z" fill="#facc15" stroke="#eab308" strokeWidth="0.8" />
                <path d="M14 23h-2a2 2 0 0 0 2 2v-2zm8 0h2a2 2 0 0 1-2 2v-2z" fill="#fde047" />
                <path d="M17 29h2v3h-2z" fill="#facc15" />
                <path d="M15 32h6v1.5h-6z" fill="#ca8a04" />

                {/* Text */}
                {t1w2 ? (
                  <>
                    <text x="34" y="20" fontSize="9.5" fontWeight="700" fill="#ffffff">
                      {t1w1}
                    </text>
                    <text x="34" y="31" fontSize="9.5" fontWeight="700" fill="#ffffff">
                      {t1w2}
                    </text>
                    <text x="34" y="46" fontSize="11" fontWeight="800" fill="#34d399">
                      ({top3[0].solved})
                    </text>
                  </>
                ) : (
                  <>
                    <text x="34" y="25" fontSize="11" fontWeight="700" fill="#ffffff">
                      {t1w1}
                    </text>
                    <text x="34" y="41" fontSize="11.5" fontWeight="800" fill="#34d399">
                      ({top3[0].solved})
                    </text>
                  </>
                )}
              </g>
            );
          })()}

          {/* Badge 2 (2nd place) */}
          {top3[1] && (() => {
            const [t2w1, t2w2] = splitTopicLabel(top3[1].tag);
            return (
              <g transform="translate(122, 44)">
                <rect
                  width="102"
                  height="54"
                  rx="14"
                  fill="#082215"
                  stroke="url(#tcSubBorderGrad)"
                  strokeWidth="1.2"
                />
                {/* Lime Medal Icon Badge */}
                <circle cx="18" cy="27" r="11" fill="#065f46" stroke="#4ade80" strokeWidth="1.2" />
                <path d="M15 19l3 4 3-4" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="18" cy="27" r="4.5" fill="#22c55e" stroke="#86efac" strokeWidth="0.8" />
                <path d="M18 25l0.6 1.3 1.4 0.2-1 1 0.2 1.4-1.2-0.6-1.2 0.6 0.2-1.4-1-1 1.4-0.2z" fill="#ffffff" />

                {/* Text */}
                {t2w2 ? (
                  <>
                    <text x="34" y="20" fontSize="9.5" fontWeight="700" fill="#ffffff">
                      {t2w1}
                    </text>
                    <text x="34" y="31" fontSize="9.5" fontWeight="700" fill="#ffffff">
                      {t2w2}
                    </text>
                    <text x="34" y="46" fontSize="11" fontWeight="800" fill="#34d399">
                      ({top3[1].solved})
                    </text>
                  </>
                ) : (
                  <>
                    <text x="34" y="25" fontSize="11" fontWeight="700" fill="#ffffff">
                      {t2w1}
                    </text>
                    <text x="34" y="41" fontSize="11.5" fontWeight="800" fill="#34d399">
                      ({top3[1].solved})
                    </text>
                  </>
                )}
              </g>
            );
          })()}

          {/* Badge 3 (3rd place) */}
          {top3[2] && (() => {
            const [t3w1, t3w2] = splitTopicLabel(top3[2].tag);
            return (
              <g transform="translate(232, 44)">
                <rect
                  width="100"
                  height="54"
                  rx="14"
                  fill="#082215"
                  stroke="url(#tcSubBorderGrad)"
                  strokeWidth="1.2"
                />
                {/* Lime Medal Icon Badge */}
                <circle cx="18" cy="27" r="11" fill="#065f46" stroke="#4ade80" strokeWidth="1.2" />
                <path d="M15 19l3 4 3-4" stroke="#a7f3d0" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="18" cy="27" r="4.5" fill="#22c55e" stroke="#86efac" strokeWidth="0.8" />
                <path d="M18 25l0.6 1.3 1.4 0.2-1 1 0.2 1.4-1.2-0.6-1.2 0.6 0.2-1.4-1-1 1.4-0.2z" fill="#ffffff" />

                {/* Text */}
                {t3w2 ? (
                  <>
                    <text x="34" y="20" fontSize="9.5" fontWeight="700" fill="#ffffff">
                      {t3w1}
                    </text>
                    <text x="34" y="31" fontSize="9.5" fontWeight="700" fill="#ffffff">
                      {t3w2}
                    </text>
                    <text x="34" y="46" fontSize="11" fontWeight="800" fill="#34d399">
                      ({top3[2].solved})
                    </text>
                  </>
                ) : (
                  <>
                    <text x="34" y="25" fontSize="11" fontWeight="700" fill="#ffffff">
                      {t3w1}
                    </text>
                    <text x="34" y="41" fontSize="11.5" fontWeight="800" fill="#34d399">
                      ({top3[2].solved})
                    </text>
                  </>
                )}
              </g>
            );
          })()}
        </g>

        {/* 6. BOTTOM RIGHT: Coverage Insight (With 3D Rising Graphic Exactly Like Reference Image) */}
        <g transform="translate(640, 366)">
          {/* Background Card */}
          <rect
            width="348"
            height="112"
            rx="20"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Top Specular Shine */}
          <path d="M 24 2 L 324 2" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" strokeLinecap="round" />

          {/* Header with 3-Bar Chart Icon */}
          <g transform="translate(18, 16)">
            <rect x="0" y="8" width="3.5" height="8" rx="1" fill="#34d399" />
            <rect x="5.5" y="4" width="3.5" height="12" rx="1" fill="#4ade80" />
            <rect x="11" y="0" width="3.5" height="16" rx="1" fill="#86efac" />
            <text x="22" y="12" fontSize="14" fontWeight="800" fill="#ffffff" letterSpacing="-0.3">
              Coverage Insight
            </text>
          </g>

          {/* Dynamic Insight Prose based on actual percentages */}
          <text x="18" y="46" fontSize="11.5" fontWeight="500" fill="#d1fae5" opacity="0.9">
            <tspan x="18" dy="0">
              Most problems are Fundamental ({fundPct.toFixed(1)}%),
            </tspan>
            <tspan x="18" dy="16">
              with a good mix of Intermediate ({interPct.toFixed(1)}%)
            </tspan>
            <tspan x="18" dy="16">
              and Advanced ({advPct.toFixed(1)}%).
            </tspan>
          </text>

          {/* 3D Rising Bar Chart with Neon Upward Arrow Graphic (Exact Match to Image 2!) */}
          <g transform="translate(244, 26)">
            {/* 4 Rising Isometric-Style Green Columns */}
            {/* Bar 1 */}
            <rect x="10" y="46" width="11" height="18" rx="3" fill="#22c55e" />
            <rect x="11" y="47" width="2" height="16" rx="1" fill="#ffffff" opacity="0.3" />

            {/* Bar 2 */}
            <rect x="25" y="32" width="11" height="32" rx="3" fill="#4ade80" />
            <rect x="26" y="33" width="2" height="30" rx="1" fill="#ffffff" opacity="0.3" />

            {/* Bar 3 */}
            <rect x="40" y="18" width="11" height="46" rx="3" fill="#86efac" />
            <rect x="41" y="19" width="2" height="44" rx="1" fill="#ffffff" opacity="0.3" />

            {/* Bar 4 */}
            <rect x="55" y="4" width="11" height="60" rx="3" fill="#bbf7d0" />
            <rect x="56" y="5" width="2" height="58" rx="1" fill="#ffffff" opacity="0.3" />

            {/* Upward Curved Glowing Neon Arrow */}
            <path
              d="M 6 44 C 24 34, 48 20, 72 -2"
              stroke="url(#tcArrowGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#tcGlowLime)"
            />
            {/* Arrowhead */}
            <polygon points="72,-6 78,2 67,4" fill="#ffffff" filter="url(#tcGlowLime)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
