"use client";

import React from "react";

export interface TopicItem {
  tag: string;
  solved: number;
  level: "fundamental" | "intermediate" | "advanced" | string;
}

// Default standard DSA topics shown with 0 solved if user has not solved problems yet
const DEFAULT_12_TOPIC_NAMES = [
  "Array",
  "String",
  "Hash Table",
  "Dynamic Programming",
  "Math",
  "Sorting",
  "Greedy",
  "Depth-First Search",
  "Binary Search",
  "Tree",
  "Breadth-First Search",
  "Two Pointers",
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
  const diff = (endAngle - startAngle + 360) % 360;
  const largeArcFlag = diff > 180 ? "1" : "0";
  return ["M", start.x, start.y, "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y].join(" ");
}

// Helper: creates a clean 3D glass arc path with capsule caps
function getGlassArcPath(centerX: number, centerY: number, radius: number, startDeg: number, spanDeg: number) {
  if (spanDeg <= 0) return null;
  if (spanDeg > 8) {
    const s = (startDeg + 2.5) % 360;
    const e = (startDeg + spanDeg - 2.5) % 360;
    return describeArc(centerX, centerY, radius, s, e);
  } else {
    const mid = (startDeg + spanDeg / 2) % 360;
    const s = (mid - 1.5 + 360) % 360;
    const e = (mid + 1.5) % 360;
    return describeArc(centerX, centerY, radius, s, e);
  }
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
  if (norm.includes("tree")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2.2" fill="#34d399" />
        <circle cx="4.5" cy="15" r="2.2" fill="#34d399" />
        <circle cx="15.5" cy="15" r="2.2" fill="#34d399" />
        <path d="M10 6v3m0 0l-5.5 4m5.5-4l5.5 4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("stack")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <ellipse cx="10" cy="5" rx="7" ry="2.2" stroke="#34d399" strokeWidth="1.4" fill="none" />
        <path d="M3 5v4c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V5" stroke="#34d399" strokeWidth="1.4" fill="none" />
        <path d="M3 9v4c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V9" stroke="#34d399" strokeWidth="1.4" fill="none" />
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
  if (norm.includes("divide") || norm.includes("conquer")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2.2" fill="#34d399" />
        <circle cx="4.5" cy="15" r="2.2" fill="#34d399" />
        <circle cx="15.5" cy="15" r="2.2" fill="#34d399" />
        <path d="M10 6v3m0 0l-5.5 4m5.5-4l5.5 4" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("dfs") || norm.includes("depth")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2.2" fill="#34d399" />
        <circle cx="10" cy="10.5" r="2.2" fill="#34d399" />
        <circle cx="10" cy="16.5" r="2.2" fill="#34d399" />
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

  // Default code icon
  return (
    <text x={x + 10} y={y + 14} textAnchor="middle" fontSize="11" fontWeight="800" fill="#34d399" fontFamily="monospace">
      &lt;&gt;
    </text>
  );
}

// Format 2-line labels nicely so long names fit without truncation
function splitTopicLabel(tag: string): [string, string | null] {
  const norm = tag.trim();
  const lower = norm.toLowerCase();
  if (lower === "binary search") return ["Binary", "Search"];
  if (lower === "binary tree") return ["Binary", "Tree"];
  if (lower === "two pointers") return ["Two", "Pointers"];
  if (lower === "linked list") return ["Linked", "List"];
  if (lower === "hash table") return ["Hash", "Table"];
  if (lower === "dynamic programming") return ["Dynamic", "Programming"];
  if (lower.includes("divide") && lower.includes("conquer")) return ["Divide &", "Conquer"];
  if (lower.includes("depth") || lower === "dfs") return ["Depth-First", "Search"];
  if (lower.includes("breadth") || lower === "bfs") return ["Breadth-First", "Search"];
  if (lower.includes("bit manip")) return ["Bit", "Manip."];
  if (lower.includes("sliding window")) return ["Sliding", "Window"];
  return [norm, null];
}

interface TopicBreakdownProps {
  topics?: TopicItem[];
}

export function TopicBreakdown({ topics }: TopicBreakdownProps) {
  // Use ONLY real topics passed from the user's account. No fake preloaded data!
  const userTopics = topics ?? [];
  const hasRealData = userTopics.length > 0 && userTopics.some((t) => t.solved > 0);

  // Sort descending by solved count
  const sorted = hasRealData ? [...userTopics].sort((a, b) => b.solved - a.solved) : [];

  // Top 12 columns for the bar chart
  const top12: TopicItem[] = hasRealData
    ? sorted.slice(0, 12)
    : DEFAULT_12_TOPIC_NAMES.map((name) => ({ tag: name, solved: 0, level: "fundamental" }));

  // Calculate real metrics across all topics
  let fundSolved = 0;
  let interSolved = 0;
  let advSolved = 0;

  userTopics.forEach((t) => {
    const lvl = (t.level || "").toLowerCase();
    if (lvl.includes("fund")) fundSolved += t.solved;
    else if (lvl.includes("inter")) interSolved += t.solved;
    else if (lvl.includes("adv")) advSolved += t.solved;
    else fundSolved += t.solved;
  });

  const totalProblems = fundSolved + interSolved + advSolved;
  const fundPct = totalProblems > 0 ? (fundSolved / totalProblems) * 100 : 0;
  const interPct = totalProblems > 0 ? (interSolved / totalProblems) * 100 : 0;
  const advPct = totalProblems > 0 ? (advSolved / totalProblems) * 100 : 0;

  // Dynamic Y-axis scale based on the maximum solved topic (default 10 if 0 solved)
  const maxSolved = Math.max(...top12.map((t) => t.solved), 0);
  const yMax = Math.max(10, Math.ceil((maxSolved || 1) / 2) * 2);

  // Y-axis ticks strictly mapped to card local coordinates (baseline at y=150, top at y=35)
  const yTicks = [
    { val: yMax, y: 35 },
    { val: Math.round(yMax * 0.8), y: 58 },
    { val: Math.round(yMax * 0.6), y: 81 },
    { val: Math.round(yMax * 0.4), y: 104 },
    { val: Math.round(yMax * 0.2), y: 127 },
    { val: 0, y: 150 },
  ];

  // Top 3 for the badges (empty dashes if 0 solved)
  const top3 = sorted.filter((t) => t.solved > 0).slice(0, 3);
  const first = top3[0] ?? { tag: "—", solved: 0 };
  const second = top3[1] ?? { tag: "—", solved: 0 };
  const third = top3[2] ?? { tag: "—", solved: 0 };

  // =========================================================================
  // 3D GLASS PROGRESS RING CALCULATIONS
  // Center is at (112, 104) in left subcard, radius is 62px
  // =========================================================================
  const cx = 112;
  const cy = 104;
  const radius = 62;

  const fundDeg = totalProblems > 0 ? Math.round((fundSolved / totalProblems) * 360) : 0;
  const interDeg = totalProblems > 0 ? Math.round((interSolved / totalProblems) * 360) : 0;
  const advDeg = totalProblems > 0 ? 360 - fundDeg - interDeg : 0;

  // Arcs are ONLY rendered when the user has actual solved problems!
  const arcPathFund = totalProblems > 0 && fundSolved > 0 ? getGlassArcPath(cx, cy, radius, 0, fundDeg) : null;
  const arcPathInter = totalProblems > 0 && interSolved > 0 ? getGlassArcPath(cx, cy, radius, fundDeg, interDeg) : null;
  const arcPathAdv = totalProblems > 0 && advSolved > 0 ? getGlassArcPath(cx, cy, radius, fundDeg + interDeg, advDeg) : null;

  return (
    <div className="w-full overflow-hidden select-none">
      <svg
        viewBox="0 0 1024 490"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          {/* Subcard Frosted Glass Fill */}
          <linearGradient id="tcSubGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d1f15" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#030c07" stopOpacity="0.95" />
          </linearGradient>

          {/* Subcard Border Gradient */}
          <linearGradient id="tcSubBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#15803d" stopOpacity="0.22" />
          </linearGradient>

          {/* 3D Glass Tube Progress Ring Gradients */}
          <linearGradient id="tcRingFund3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86efac" />
            <stop offset="25%" stopColor="#00f076" />
            <stop offset="65%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>

          <linearGradient id="tcRingInter3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d9f99d" />
            <stop offset="25%" stopColor="#88ff00" />
            <stop offset="65%" stopColor="#65a30d" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>

          <linearGradient id="tcRingAdv3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#facc15" />
            <stop offset="65%" stopColor="#ca8a04" />
            <stop offset="100%" stopColor="#713f12" />
          </linearGradient>

          {/* Specular White Glass Crest Gradient */}
          <linearGradient id="tcSpecularWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          {/* Center Convex Glass Lens */}
          <radialGradient id="tcLensGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#0a321e" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#04160e" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#010604" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="tcLensShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="tcBadgeGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a3822" />
            <stop offset="100%" stopColor="#03170e" />
          </linearGradient>

          {/* 3D Glass Column Bar Gradients */}
          <linearGradient id="tcBarFund3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#bbf7d0" />
            <stop offset="12%" stopColor="#4ade80" />
            <stop offset="45%" stopColor="#16a34a" />
            <stop offset="85%" stopColor="#15803d" />
            <stop offset="100%" stopColor="#052e16" />
          </linearGradient>

          <linearGradient id="tcBarInter3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ecfccb" />
            <stop offset="12%" stopColor="#a3e635" />
            <stop offset="45%" stopColor="#65a30d" />
            <stop offset="85%" stopColor="#4d7c0f" />
            <stop offset="100%" stopColor="#1a2e05" />
          </linearGradient>

          <linearGradient id="tcBarAdv3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="12%" stopColor="#facc15" />
            <stop offset="45%" stopColor="#ca8a04" />
            <stop offset="85%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>

          {/* Specular Streak down left side of bar */}
          <linearGradient id="tcSpecularVertical" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>

          {/* Topic Icon Frosted Glass Fill */}
          <linearGradient id="tcIconGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0a2a1b" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#02120b" stopOpacity="0.95" />
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
          <filter id="tcGlowGreen" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#00f076" floodOpacity="0.8" />
          </filter>
          <filter id="tcGlowLime" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#88ff00" floodOpacity="0.8" />
          </filter>
          <filter id="tcGlowYellow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#eaff00" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ambient Radial Lighting (Subtle, pure obsidian black page) */}
        <circle cx="120" cy="80" r="140" fill="#10b981" opacity="0.04" filter="blur(40px)" />
        <circle cx="860" cy="420" r="150" fill="#84cc16" opacity="0.03" filter="blur(50px)" />

        {/* =====================================================
            1. HEADER BAR
           ===================================================== */}
        {/* 3D Stacked Layers Icon Badge */}
        <g transform="translate(32, 20)">
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
        <text x="92" y="42" fontSize="24" fontWeight="800" fill="#ffffff" letterSpacing="-0.5">
          Topic Coverage
        </text>
        <text x="92" y="60" fontSize="12.5" fontWeight="500" fill="#86efac" opacity="0.85">
          Problem distribution across DSA topics
        </text>

        {/* Legend Filter Pills (Top Right) */}
        {/* Fundamental */}
        <g transform="translate(572, 26)">
          <rect
            width="124"
            height="34"
            rx="17"
            fill="#06160d"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          <line x1="12" y1="1" x2="112" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill="#00f076" filter="url(#tcGlowGreen)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Fundamental
          </text>
        </g>

        {/* Intermediate */}
        <g transform="translate(712, 26)">
          <rect
            width="134"
            height="34"
            rx="17"
            fill="#0a180d"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          <line x1="12" y1="1" x2="122" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill="#88ff00" filter="url(#tcGlowLime)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Intermediate
          </text>
        </g>

        {/* Advanced */}
        <g transform="translate(862, 26)">
          <rect
            width="114"
            height="34"
            rx="17"
            fill="#161c07"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          <line x1="12" y1="1" x2="102" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill="#eaff00" filter="url(#tcGlowYellow)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Advanced
          </text>
        </g>

        {/* =====================================================
            2. LEFT SUBCARD: 3D Glassmorphic Donut Gauge & Summary
           ===================================================== */}
        <g transform="translate(32, 80)">
          {/* Background Card */}
          <rect
            width="224"
            height="382"
            rx="22"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Frosted Specular Sheen at Top of Subcard */}
          <path d="M 66 2 L 202 2" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1" strokeLinecap="round" />

          {/* ===================================================
              3D GLASS TUBE PROGRESS DONUT GAUGE (Center cx, cy)
             =================================================== */}
          <g>
            {/* Ambient Halo behind Track */}
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#00f076" strokeWidth="20" opacity="0.08" filter="blur(8px)" />

            {/* Recessed Dark Glass Track Groove */}
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#03150c" strokeWidth="16" />
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#010804" strokeWidth="12" />

            {/* Concentric Frosted Glass Rims */}
            <circle cx={cx} cy={cy} r="70" fill="none" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="54" fill="none" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />

            {/* ARC 1: FUNDAMENTAL (Emerald Glass Tube) */}
            {arcPathFund && (
              <g>
                <path d={arcPathFund} fill="none" stroke="url(#tcRingFund3D)" strokeWidth="13" strokeLinecap="round" />
                <path d={arcPathFund} fill="none" stroke="url(#tcSpecularWhite)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              </g>
            )}

            {/* ARC 2: INTERMEDIATE (Lime Glass Tube) */}
            {arcPathInter && (
              <g>
                <path d={arcPathInter} fill="none" stroke="url(#tcRingInter3D)" strokeWidth="13" strokeLinecap="round" />
                <path d={arcPathInter} fill="none" stroke="url(#tcSpecularWhite)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              </g>
            )}

            {/* ARC 3: ADVANCED (Amber/Yellow Glass Tube) */}
            {arcPathAdv && (
              <g>
                <path d={arcPathAdv} fill="none" stroke="url(#tcRingAdv3D)" strokeWidth="13" strokeLinecap="round" />
                <path d={arcPathAdv} fill="none" stroke="url(#tcSpecularWhite)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
              </g>
            )}

            {/* ===================================================
                CENTER 3D CONVEX FROSTED GLASS LENS
               =================================================== */}
            <circle cx={cx} cy={cy} r="48" fill="url(#tcLensGrad)" stroke="rgba(74, 222, 128, 0.35)" strokeWidth="1.2" />

            {/* Crescent Glass Specular Reflection */}
            <path
              d={`M ${cx - 32} ${cy - 16} A 48 48 0 0 1 ${cx + 32} ${cy - 16} A 39 39 0 0 0 ${cx - 32} ${cy - 16} Z`}
              fill="url(#tcLensShine)"
              opacity="0.65"
            />

            {/* Frosted Badge for </> */}
            <rect
              x={cx - 16}
              y={cy - 38}
              width="32"
              height="19"
              rx="6"
              fill="url(#tcBadgeGlass)"
              stroke="rgba(74, 222, 128, 0.6)"
              strokeWidth="1.2"
            />
            {/* Top Shine on Badge */}
            <line
              x1={cx - 12}
              y1={cy - 37}
              x2={cx + 12}
              y2={cy - 37}
              stroke="rgba(255, 255, 255, 0.45)"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <text x={cx} y={cy - 25} textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#6ee7b7" fontFamily="monospace">
              &lt;/&gt;
            </text>

            {/* Large Total Count */}
            <text
              x={cx}
              y={cy + 8}
              textAnchor="middle"
              fontSize="36"
              fontWeight="900"
              fill="#ffffff"
              letterSpacing="-1"
              filter="drop-shadow(0 2px 5px rgba(0,0,0,0.95))"
            >
              {totalProblems}
            </text>

            {/* Total Problems Subtitle */}
            <text x={cx} y={cy + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill="#a7f3d0" letterSpacing="-0.2">
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
          <circle cx="24" cy="238" r="4.5" fill="#88ff00" filter="url(#tcGlowLime)" />
          <text x="36" y="242" fontSize="12" fontWeight="600" fill="#e6fffa">
            Intermediate
          </text>
          <text x="204" y="242" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
            {interSolved}{" "}
            <tspan fontWeight="500" fill="#86efac" opacity="0.85">
              ({interPct.toFixed(1)}%)
            </tspan>
          </text>

          {/* Row 3: Advanced */}
          <circle cx="24" cy="262" r="4.5" fill="#eaff00" filter="url(#tcGlowYellow)" />
          <text x="36" y="266" fontSize="12" fontWeight="600" fill="#e6fffa">
            Advanced
          </text>
          <text x="204" y="266" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
            {advSolved}{" "}
            <tspan fontWeight="500" fill="#86efac" opacity="0.85">
              ({advPct.toFixed(1)}%)
            </tspan>
          </text>

          {/* Bottom 3-Stat Glass Box */}
          <g transform="translate(14, 296)">
            <rect
              width="196"
              height="64"
              rx="12"
              fill="#06160d"
              stroke="url(#tcSubBorderGrad)"
              strokeWidth="1"
            />
            {/* Top Shine */}
            <line x1="20" y1="1" x2="176" y2="1" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Vertical Dividers */}
            <line x1="65" y1="12" x2="65" y2="52" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="1" />
            <line x1="130" y1="12" x2="130" y2="52" stroke="rgba(74, 222, 128, 0.15)" strokeWidth="1" />

            {/* Stat 1: Topics */}
            <text x="32" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {hasRealData ? sorted.length : 0}
            </text>
            <text x="32" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6ee7b7" opacity="0.8">
              Topics
            </text>

            {/* Stat 2: Problems */}
            <text x="98" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {totalProblems}
            </text>
            <text x="98" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6ee7b7" opacity="0.8">
              Problems
            </text>

            {/* Stat 3: Fundamental % */}
            <text x="163" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {fundPct.toFixed(1)}%
            </text>
            <text x="163" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#6ee7b7" opacity="0.8">
              Fundamental
            </text>
          </g>
        </g>

        {/* =====================================================
            3. CENTER/RIGHT TOP: 12-Bar DSA 3D Glass Chart
           ===================================================== */}
        <g transform="translate(272, 80)">
          {/* Background Card */}
          <rect
            width="720"
            height="254"
            rx="22"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Top Specular Shine */}
          <path d="M 30 2 L 690 2" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeLinecap="round" />

          {/* Y-Axis Line (Placed at x=46, inside card bounds) */}
          <line x1="46" y1="35" x2="46" y2="150" stroke="rgba(74, 222, 128, 0.4)" strokeWidth="1.2" />

          {/* Horizontal Reference Lines & Y-Axis Ticks (Mathematically mapped directly inside the card!) */}
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1="46"
                y1={t.y}
                x2="698"
                y2={t.y}
                stroke="rgba(74, 222, 128, 0.12)"
                strokeDasharray={t.val === 0 ? "none" : "3 3"}
                strokeWidth={t.val === 0 ? "1.4" : "1"}
              />
              <line x1="42" y1={t.y} x2="46" y2={t.y} stroke="rgba(74, 222, 128, 0.4)" strokeWidth="1.2" />
              <text
                x="38"
                y={t.y + 4}
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
            const colX = 76 + i * 52.5;
            const barHeight = hasRealData && item.solved > 0 ? Math.max(10, (item.solved / yMax) * 115) : 0;
            const barY = 150 - barHeight;

            // Pick 3D glass gradient and glow based on tier
            const isFund = item.level === "fundamental";
            const isInter = item.level === "intermediate";
            const barFill = isFund ? "url(#tcBarFund3D)" : isInter ? "url(#tcBarInter3D)" : "url(#tcBarAdv3D)";
            const glowColor = isFund ? "#00f076" : isInter ? "#88ff00" : "#facc15";
            const [labelLine1, labelLine2] = splitTopicLabel(item.tag);

            return (
              <g key={item.tag + i}>
                {/* Count Number on top of bar */}
                <text
                  x={colX}
                  y={barHeight > 0 ? barY - 6 : 144}
                  textAnchor="middle"
                  fontSize="13.5"
                  fontWeight="900"
                  fill="#ffffff"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))"
                >
                  {item.solved}
                </text>

                {/* Base Pedestal Glow on Baseline */}
                <ellipse cx={colX} cy="150" rx="14" ry="3.5" fill={glowColor} opacity={barHeight > 0 ? 0.4 : 0.15} filter="blur(2px)" />

                {/* Ambient Backlight Glow behind the Glass Pillar (if solved > 0) */}
                {barHeight > 0 && (
                  <rect
                    x={colX - 14}
                    y={barY}
                    width="28"
                    height={barHeight}
                    rx="8"
                    fill={glowColor}
                    opacity="0.25"
                    filter="blur(4px)"
                  />
                )}

                {/* Main 3D Frosted Glass Column Pillar (or sleek resting baseline marker if 0) */}
                {barHeight > 0 ? (
                  <>
                    <rect
                      x={colX - 16}
                      y={barY}
                      width="32"
                      height={barHeight}
                      rx="8"
                      fill={barFill}
                      stroke="rgba(255, 255, 255, 0.35)"
                      strokeWidth="1"
                    />
                    {/* Specular Curved Reflection at Top Cap of Bar */}
                    <rect
                      x={colX - 13}
                      y={barY + 1.5}
                      width="26"
                      height="4"
                      rx="2"
                      fill="#ffffff"
                      opacity="0.45"
                    />
                    {/* Specular Vertical Light Streak down Left Side */}
                    <rect
                      x={colX - 13}
                      y={barY + 5}
                      width="2.8"
                      height={Math.max(2, barHeight - 9)}
                      rx="1.2"
                      fill="url(#tcSpecularVertical)"
                    />
                    {/* Subtle Right Edge Depth Shadow */}
                    <rect
                      x={colX + 11}
                      y={barY + 5}
                      width="1.8"
                      height={Math.max(2, barHeight - 9)}
                      rx="0.8"
                      fill="#000000"
                      opacity="0.35"
                    />
                  </>
                ) : (
                  <rect
                    x={colX - 14}
                    y="148"
                    width="28"
                    height="3"
                    rx="1.5"
                    fill="rgba(74, 222, 128, 0.25)"
                  />
                )}

                {/* Rounded Square Frosted Icon Box below baseline */}
                <rect
                  x={colX - 16}
                  y="162"
                  width="32"
                  height="32"
                  rx="9"
                  fill="url(#tcIconGlass)"
                  stroke="rgba(74, 222, 128, 0.45)"
                  strokeWidth="1.2"
                />

                {/* Top Glass Shine Line on Icon Box */}
                <line
                  x1={colX - 11}
                  y1="163.5"
                  x2={colX + 11}
                  y2="163.5"
                  stroke="rgba(255, 255, 255, 0.4)"
                  strokeWidth="1"
                  strokeLinecap="round"
                />

                {/* Topic Vector Icon */}
                {renderTopicIcon(item.tag, colX - 10, 168)}

                {/* Topic Name Label (Centered, 2 lines without clipping!) */}
                <text
                  x={colX}
                  y="208"
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
                    y="220"
                    textAnchor="middle"
                    fontSize="8.5"
                    fontWeight="600"
                    fill="#a7f3d0"
                    opacity="0.85"
                  >
                    {labelLine2}
                  </text>
                )}
              </g>
            );
          })}
        </g>

        {/* =====================================================
            4. BOTTOM LEFT: Top Covered Topics Badges
           ===================================================== */}
        <g transform="translate(272, 350)">
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
          <path d="M 24 2 L 324 2" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeLinecap="round" />

          {/* Header with Target Icon */}
          <g transform="translate(18, 16)">
            <circle cx="10" cy="10" r="9" stroke="#34d399" strokeWidth="1.8" fill="none" />
            <circle cx="10" cy="10" r="5" stroke="#4ade80" strokeWidth="1.6" fill="none" />
            <circle cx="10" cy="10" r="2" fill="#86efac" />
            <path d="M 17 3 L 13 7" stroke="#34d399" strokeWidth="1.8" strokeLinecap="round" />
            <text x="26" y="14" fontSize="14" fontWeight="800" fill="#ffffff" letterSpacing="-0.3">
              Top Covered Topics
            </text>
          </g>

          {/* 3 Topic Badges with 3D Trophy and Medals */}
          {/* Badge 1: Golden Trophy (#1) */}
          <g transform="translate(14, 44)">
            <rect
              width="100"
              height="52"
              rx="12"
              fill="#061e12"
              stroke="rgba(74, 222, 128, 0.4)"
              strokeWidth="1.2"
            />
            {/* Top Shine */}
            <line x1="8" y1="1" x2="92" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

            {/* 3D Realistic Golden Trophy Icon */}
            <g transform="translate(8, 10)">
              {/* Handles */}
              <path d="M 2 5 C -2 5, -2 13, 2 13 M 16 5 C 20 5, 20 13, 16 13" stroke="#facc15" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* Cup Body */}
              <path d="M 2 3 L 16 3 L 15 11 C 15 14, 11 16, 9 16 C 7 16, 3 14, 3 11 Z" fill="#eab308" stroke="#fef08a" strokeWidth="0.8" />
              {/* Stem & Base */}
              <rect x="7.5" y="16" width="3" height="4" fill="#ca8a04" />
              <rect x="5" y="20" width="8" height="2.5" rx="1" fill="#facc15" />
            </g>

            {/* Text */}
            <text x="36" y="24" fontSize="11" fontWeight="800" fill="#ffffff">
              {first.tag}
            </text>
            <text x="36" y="39" fontSize="10.5" fontWeight="700" fill="#86efac">
              ({first.solved})
            </text>
          </g>

          {/* Badge 2: Star Medal (#2) */}
          <g transform="translate(122, 44)">
            <rect
              width="104"
              height="52"
              rx="12"
              fill="#061e12"
              stroke="rgba(74, 222, 128, 0.4)"
              strokeWidth="1.2"
            />
            {/* Top Shine */}
            <line x1="8" y1="1" x2="96" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Lime-Green Star Medal Icon */}
            <g transform="translate(8, 10)">
              {/* Ribbons */}
              <path d="M 5 2 L 7 10 L 9 2" fill="#22c55e" opacity="0.8" />
              <path d="M 13 2 L 11 10 L 9 2" fill="#16a34a" opacity="0.8" />
              {/* Medal Disc */}
              <circle cx="9" cy="13" r="7" fill="#84cc16" stroke="#bef264" strokeWidth="0.8" />
              {/* Star inside medal */}
              <polygon points="9,9 10.2,12 13,12 10.8,13.8 11.6,16.5 9,14.8 6.4,16.5 7.2,13.8 5,12 7.8,12" fill="#ffffff" />
            </g>

            {/* Text */}
            <text x="35" y="21" fontSize="10" fontWeight="800" fill="#ffffff">
              {splitTopicLabel(second.tag)[0]}
            </text>
            {splitTopicLabel(second.tag)[1] && (
              <text x="35" y="32" fontSize="9" fontWeight="700" fill="#ffffff">
                {splitTopicLabel(second.tag)[1]}
              </text>
            )}
            <text x="35" y={splitTopicLabel(second.tag)[1] ? "44" : "37"} fontSize="10.5" fontWeight="700" fill="#86efac">
              ({second.solved})
            </text>
          </g>

          {/* Badge 3: Star Medal (#3) */}
          <g transform="translate(234, 44)">
            <rect
              width="104"
              height="52"
              rx="12"
              fill="#061e12"
              stroke="rgba(74, 222, 128, 0.4)"
              strokeWidth="1.2"
            />
            {/* Top Shine */}
            <line x1="8" y1="1" x2="96" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Lime-Green Star Medal Icon */}
            <g transform="translate(8, 10)">
              {/* Ribbons */}
              <path d="M 5 2 L 7 10 L 9 2" fill="#22c55e" opacity="0.8" />
              <path d="M 13 2 L 11 10 L 9 2" fill="#16a34a" opacity="0.8" />
              {/* Medal Disc */}
              <circle cx="9" cy="13" r="7" fill="#84cc16" stroke="#bef264" strokeWidth="0.8" />
              {/* Star inside medal */}
              <polygon points="9,9 10.2,12 13,12 10.8,13.8 11.6,16.5 9,14.8 6.4,16.5 7.2,13.8 5,12 7.8,12" fill="#ffffff" />
            </g>

            {/* Text */}
            <text x="35" y="21" fontSize="10" fontWeight="800" fill="#ffffff">
              {splitTopicLabel(third.tag)[0]}
            </text>
            {splitTopicLabel(third.tag)[1] && (
              <text x="35" y="32" fontSize="9" fontWeight="700" fill="#ffffff">
                {splitTopicLabel(third.tag)[1]}
              </text>
            )}
            <text x="35" y={splitTopicLabel(third.tag)[1] ? "44" : "37"} fontSize="10.5" fontWeight="700" fill="#86efac">
              ({third.solved})
            </text>
          </g>
        </g>

        {/* =====================================================
            5. BOTTOM RIGHT: Coverage Insight (With 3D Rising Graphic)
           ===================================================== */}
        <g transform="translate(636, 350)">
          {/* Background Card */}
          <rect
            width="356"
            height="112"
            rx="20"
            fill="url(#tcSubGlass)"
            stroke="url(#tcSubBorderGrad)"
            strokeWidth="1.2"
          />
          {/* Top Specular Shine */}
          <path d="M 24 2 L 332 2" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1" strokeLinecap="round" />

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
            {totalProblems > 0 ? (
              <>
                <tspan x="18" dy="0">
                  Most problems are Fundamental ({fundPct.toFixed(1)}%),
                </tspan>
                <tspan x="18" dy="16">
                  with a good mix of Intermediate ({interPct.toFixed(1)}%)
                </tspan>
                <tspan x="18" dy="16">
                  and Advanced ({advPct.toFixed(1)}%).
                </tspan>
              </>
            ) : (
              <>
                <tspan x="18" dy="0">
                  No DSA problems solved yet.
                </tspan>
                <tspan x="18" dy="16">
                  Connect your LeetCode account in Settings
                </tspan>
                <tspan x="18" dy="16">
                  to track your real-time topic progress.
                </tspan>
              </>
            )}
          </text>

          {/* 3D Rising Bar Chart with Neon Upward Arrow Graphic */}
          <g transform="translate(250, 26)">
            {/* 4 Rising Isometric-Style Green Columns */}
            {/* Bar 1 */}
            <rect x="10" y="46" width="11" height="18" rx="3" fill="#22c55e" opacity={hasRealData ? 1 : 0.4} />
            <rect x="11" y="47" width="2" height="16" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />

            {/* Bar 2 */}
            <rect x="25" y="32" width="11" height="32" rx="3" fill="#4ade80" opacity={hasRealData ? 1 : 0.4} />
            <rect x="26" y="33" width="2" height="30" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />

            {/* Bar 3 */}
            <rect x="40" y="18" width="11" height="46" rx="3" fill="#86efac" opacity={hasRealData ? 1 : 0.4} />
            <rect x="41" y="19" width="2" height="44" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />

            {/* Bar 4 */}
            <rect x="55" y="4" width="11" height="60" rx="3" fill="#bbf7d0" opacity={hasRealData ? 1 : 0.4} />
            <rect x="56" y="5" width="2" height="58" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />

            {/* Upward Curved Glowing Neon Arrow */}
            <path
              d="M 6 44 C 24 34, 48 20, 72 -2"
              stroke="url(#tcArrowGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#tcGlowLime)"
              opacity={hasRealData ? 1 : 0.5}
            />
            {/* Arrowhead */}
            <polygon points="72,-6 78,2 67,4" fill="#ffffff" filter="url(#tcGlowLime)" opacity={hasRealData ? 1 : 0.5} />
          </g>
        </g>
      </svg>
    </div>
  );
}
