"use client";

import React, { useState, useEffect } from "react";

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

// Specialized vector icons for DSA topics (Using the app's Teal/Cyan & Violet palette)
function renderTopicIcon(tag: string, x: number, y: number) {
  const norm = tag.toLowerCase().trim();

  if (norm.includes("array")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <polyline points="13 14 17 10 13 6" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <polyline points="7 6 3 10 7 14" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("search") || norm.includes("binary search")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="9.5" cy="9.5" r="5" stroke="#38bdf8" strokeWidth="2" fill="none" />
        <line x1="13.5" y1="13.5" x2="17.5" y2="17.5" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }
  if (norm.includes("pointer")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <path d="M6 14l-3-3 3-3" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M3 11h9" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M14 6l3 3-3 3" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M17 9H8" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    );
  }
  if (norm.includes("tree")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2.2" fill="#a855f7" />
        <circle cx="4.5" cy="15" r="2.2" fill="#a855f7" />
        <circle cx="15.5" cy="15" r="2.2" fill="#a855f7" />
        <path d="M10 6v3m0 0l-5.5 4m5.5-4l5.5 4" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("stack")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <ellipse cx="10" cy="5" rx="7" ry="2.2" stroke="#2dd4bf" strokeWidth="1.4" fill="none" />
        <path d="M3 5v4c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V5" stroke="#2dd4bf" strokeWidth="1.4" fill="none" />
        <path d="M3 9v4c0 1.2 3.1 2.2 7 2.2s7-1 7-2.2V9" stroke="#2dd4bf" strokeWidth="1.4" fill="none" />
      </g>
    );
  }
  if (norm.includes("math")) {
    return (
      <text x={x + 10} y={y + 15} textAnchor="middle" fontSize="14" fontWeight="900" fill="#a855f7" fontFamily="serif">
        Σ
      </text>
    );
  }
  if (norm.includes("matrix")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <rect x="4" y="4" width="12" height="12" rx="1.5" stroke="#2dd4bf" strokeWidth="1.5" fill="none" />
        <line x1="8" y1="4" x2="8" y2="16" stroke="#2dd4bf" strokeWidth="1.2" />
        <line x1="12" y1="4" x2="12" y2="16" stroke="#2dd4bf" strokeWidth="1.2" />
        <line x1="4" y1="8" x2="16" y2="8" stroke="#2dd4bf" strokeWidth="1.2" />
        <line x1="4" y1="12" x2="16" y2="12" stroke="#2dd4bf" strokeWidth="1.2" />
      </g>
    );
  }
  if (norm.includes("string")) {
    return (
      <text x={x + 10} y={y + 15} textAnchor="middle" fontSize="13" fontWeight="900" fill="#2dd4bf" fontFamily="monospace">
        “ ”
      </text>
    );
  }
  if (norm.includes("sort")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <line x1="6" y1="4" x2="6" y2="16" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
        <polyline points="3 7 6 4 9 7" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="14" y1="16" x2="14" y2="4" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" />
        <polyline points="11 13 14 16 17 13" stroke="#2dd4bf" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("hash")) {
    return (
      <text x={x + 10} y={y + 15} textAnchor="middle" fontSize="14" fontWeight="900" fill="#a855f7">
        #
      </text>
    );
  }
  if (norm.includes("recursi")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="10" r="6" stroke="#a855f7" strokeWidth="1.8" fill="none" strokeDasharray="28 8" />
        <polyline points="8 4 10 2 12 4" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="10" cy="10" r="2.2" fill="#a855f7" />
      </g>
    );
  }
  if (norm.includes("dynamic") || norm.includes("dp")) {
    return (
      <text x={x + 10} y={y + 14} textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#fbbf24" fontFamily="monospace">
        &lt;/&gt;
      </text>
    );
  }
  if (norm.includes("divide") || norm.includes("conquer")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2.2" fill="#fbbf24" />
        <circle cx="4.5" cy="15" r="2.2" fill="#fbbf24" />
        <circle cx="15.5" cy="15" r="2.2" fill="#fbbf24" />
        <path d="M10 6v3m0 0l-5.5 4m5.5-4l5.5 4" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </g>
    );
  }
  if (norm.includes("dfs") || norm.includes("depth")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="10" cy="4" r="2.2" fill="#a855f7" />
        <circle cx="10" cy="10.5" r="2.2" fill="#a855f7" />
        <circle cx="10" cy="16.5" r="2.2" fill="#a855f7" />
        <line x1="10" y1="6" x2="10" y2="8.5" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="10" y1="12.5" x2="10" y2="14.5" stroke="#a855f7" strokeWidth="1.5" />
      </g>
    );
  }
  if (norm.includes("bfs") || norm.includes("breadth")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="4" cy="10" r="2" fill="#a855f7" />
        <circle cx="10" cy="10" r="2" fill="#a855f7" />
        <circle cx="16" cy="10" r="2" fill="#a855f7" />
        <line x1="6" y1="10" x2="8" y2="10" stroke="#a855f7" strokeWidth="1.5" />
        <line x1="12" y1="10" x2="14" y2="10" stroke="#a855f7" strokeWidth="1.5" />
      </g>
    );
  }
  if (norm.includes("list")) {
    return (
      <g transform={`translate(${x}, ${y})`}>
        <circle cx="5" cy="10" r="2" fill="#2dd4bf" />
        <circle cx="15" cy="10" r="2" fill="#2dd4bf" />
        <line x1="7" y1="10" x2="13" y2="10" stroke="#2dd4bf" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    );
  }

  // Default code icon
  return (
    <text x={x + 10} y={y + 14} textAnchor="middle" fontSize="11" fontWeight="800" fill="#2dd4bf" fontFamily="monospace">
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
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div
      className={`w-full overflow-hidden select-none transition-all duration-700 ease-out ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <svg
        viewBox="0 0 1024 490"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          {/* Subcard Frosted Glass Fill matching CodeBoard Dark Navy Theme */}
          <linearGradient id="tcSubGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f1730" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#070c1b" stopOpacity="0.96" />
          </linearGradient>

          {/* Subcard Border Gradient: Violet to Cyan specular accent */}
          <linearGradient id="tcSubBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.25" />
          </linearGradient>

          {/* 3D Glass Tube Progress Ring Gradients (Cyan, Violet, Amber) */}
          {/* Fundamental: Electric Teal / Cyan */}
          <linearGradient id="tcRingFund3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="25%" stopColor="#2dd4bf" />
            <stop offset="65%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#115e59" />
          </linearGradient>

          {/* Intermediate: Vibrant Violet / Purple */}
          <linearGradient id="tcRingInter3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="25%" stopColor="#c084fc" />
            <stop offset="65%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#581c87" />
          </linearGradient>

          {/* Advanced: Warm Amber / Gold */}
          <linearGradient id="tcRingAdv3D" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#fbbf24" />
            <stop offset="65%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Specular White Glass Crest Gradient */}
          <linearGradient id="tcSpecularWhite" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          {/* Center Convex Glass Lens: Deep Obsidian Navy */}
          <radialGradient id="tcLensGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#131d3d" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#0a0f24" stopOpacity="0.98" />
            <stop offset="100%" stopColor="#050814" stopOpacity="1" />
          </radialGradient>

          <linearGradient id="tcLensShine" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="tcBadgeGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="100%" stopColor="#0a0e22" />
          </linearGradient>

          {/* 3D Glass Column Bar Gradients */}
          {/* Fundamental: Cyan / Teal */}
          <linearGradient id="tcBarFund3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="12%" stopColor="#2dd4bf" />
            <stop offset="45%" stopColor="#0d9488" />
            <stop offset="85%" stopColor="#115e59" />
            <stop offset="100%" stopColor="#042f2e" />
          </linearGradient>

          {/* Intermediate: Vibrant Violet */}
          <linearGradient id="tcBarInter3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e9d5ff" />
            <stop offset="12%" stopColor="#c084fc" />
            <stop offset="45%" stopColor="#8b5cf6" />
            <stop offset="85%" stopColor="#6d28d9" />
            <stop offset="100%" stopColor="#2e1065" />
          </linearGradient>

          {/* Advanced: Warm Amber / Gold */}
          <linearGradient id="tcBarAdv3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef9c3" />
            <stop offset="12%" stopColor="#fbbf24" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#b45309" />
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
            <stop offset="0%" stopColor="#141c38" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#070c1b" stopOpacity="0.95" />
          </linearGradient>

          {/* 3D Stacked Layers Icon Gradients (Violet & Cyan) */}
          <linearGradient id="tcLayerBadge" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id="tcLayerTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5eead4" />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
          <linearGradient id="tcLayerMid" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
          <linearGradient id="tcLayerBot" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>

          {/* Coverage Insight Upward Arrow Gradient */}
          <linearGradient id="tcArrowGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2dd4bf" />
            <stop offset="60%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="tcGlowCyan" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#2dd4bf" floodOpacity="0.75" />
          </filter>
          <filter id="tcGlowViolet" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#8b5cf6" floodOpacity="0.75" />
          </filter>
          <filter id="tcGlowAmber" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#fbbf24" floodOpacity="0.75" />
          </filter>
        </defs>

        {/* Ambient Radial Lighting matching CodeBoard App Theme */}
        <circle cx="120" cy="80" r="140" fill="#8b5cf6" opacity="0.04" filter="blur(40px)" />
        <circle cx="860" cy="420" r="150" fill="#2dd4bf" opacity="0.04" filter="blur(50px)" />

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
            stroke="rgba(139, 92, 246, 0.55)"
            strokeWidth="1.4"
            filter="url(#tcGlowViolet)"
          />
          {/* Bottom Layer */}
          <path d="M23 29 L33 24 L23 19 L13 24 Z" fill="url(#tcLayerBot)" opacity="0.65" />
          <path d="M13 24 L23 29 L33 24 L33 26 L23 31 L13 26 Z" fill="#312e81" opacity="0.9" />
          {/* Middle Layer */}
          <path d="M23 24.5 L33 19.5 L23 14.5 L13 19.5 Z" fill="url(#tcLayerMid)" opacity="0.85" />
          <path d="M13 19.5 L23 24.5 L33 19.5 L33 21.5 L23 26.5 L13 21.5 Z" fill="#4c1d95" opacity="0.9" />
          {/* Top Layer */}
          <path d="M23 20 L33 15 L23 10 L13 15 Z" fill="url(#tcLayerTop)" />
          <path d="M13 15 L23 20 L33 15 L33 17 L23 22 L13 17 Z" fill="#0f766e" />
        </g>

        {/* Title + Subtitle */}
        <text x="92" y="42" fontSize="24" fontWeight="800" fill="#ffffff" letterSpacing="-0.5">
          Topic Coverage
        </text>
        <text x="92" y="60" fontSize="12.5" fontWeight="500" fill="#94a3b8" opacity="0.9">
          Problem distribution across DSA topics
        </text>

        {/* Legend Filter Pills (Top Right with Staggered Entrance Animation) */}
        {/* Fundamental - Cyan */}
        <g
          transform="translate(572, 26)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(12px)",
            transition: "all 0.6s ease-out 0.1s",
          }}
        >
          <rect
            width="124"
            height="34"
            rx="17"
            fill="#0b1226"
            stroke="rgba(45, 212, 191, 0.45)"
            strokeWidth="1.2"
          />
          <line x1="12" y1="1" x2="112" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill="#2dd4bf" filter="url(#tcGlowCyan)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Fundamental
          </text>
        </g>

        {/* Intermediate - Violet */}
        <g
          transform="translate(712, 26)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(12px)",
            transition: "all 0.6s ease-out 0.2s",
          }}
        >
          <rect
            width="134"
            height="34"
            rx="17"
            fill="#120f29"
            stroke="rgba(168, 85, 247, 0.45)"
            strokeWidth="1.2"
          />
          <line x1="12" y1="1" x2="122" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill="#a855f7" filter="url(#tcGlowViolet)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Intermediate
          </text>
        </g>

        {/* Advanced - Amber */}
        <g
          transform="translate(862, 26)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(12px)",
            transition: "all 0.6s ease-out 0.3s",
          }}
        >
          <rect
            width="114"
            height="34"
            rx="17"
            fill="#1c160a"
            stroke="rgba(251, 191, 36, 0.45)"
            strokeWidth="1.2"
          />
          <line x1="12" y1="1" x2="102" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
          <circle cx="18" cy="17" r="5" fill="#fbbf24" filter="url(#tcGlowAmber)" />
          <text x="32" y="21.5" fontSize="12" fontWeight="700" fill="#ffffff">
            Advanced
          </text>
        </g>

        {/* =====================================================
            2. LEFT SUBCARD: 3D Glassmorphic Donut Gauge & Summary
           ===================================================== */}
        <g
          transform="translate(32, 80)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease-out, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
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
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#8b5cf6" strokeWidth="20" opacity="0.08" filter="blur(8px)" />

            {/* Recessed Dark Glass Track Groove */}
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#090f22" strokeWidth="16" />
            <circle cx={cx} cy={cy} r="62" fill="none" stroke="#040713" strokeWidth="12" />

            {/* Concentric Frosted Glass Rims */}
            <circle cx={cx} cy={cy} r="70" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            <circle cx={cx} cy={cy} r="54" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

            {/* ARC 1: FUNDAMENTAL (Cyan Glass Tube with Draw-In Animation) */}
            {arcPathFund && (
              <g>
                <path
                  d={arcPathFund}
                  fill="none"
                  stroke="url(#tcRingFund3D)"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset={mounted ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
                <path
                  d={arcPathFund}
                  fill="none"
                  stroke="url(#tcSpecularWhite)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                  strokeDasharray="400"
                  strokeDashoffset={mounted ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
                />
              </g>
            )}

            {/* ARC 2: INTERMEDIATE (Violet Glass Tube with Draw-In Animation) */}
            {arcPathInter && (
              <g>
                <path
                  d={arcPathInter}
                  fill="none"
                  stroke="url(#tcRingInter3D)"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset={mounted ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}
                />
                <path
                  d={arcPathInter}
                  fill="none"
                  stroke="url(#tcSpecularWhite)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                  strokeDasharray="400"
                  strokeDashoffset={mounted ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s" }}
                />
              </g>
            )}

            {/* ARC 3: ADVANCED (Amber Glass Tube with Draw-In Animation) */}
            {arcPathAdv && (
              <g>
                <path
                  d={arcPathAdv}
                  fill="none"
                  stroke="url(#tcRingAdv3D)"
                  strokeWidth="13"
                  strokeLinecap="round"
                  strokeDasharray="400"
                  strokeDashoffset={mounted ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
                />
                <path
                  d={arcPathAdv}
                  fill="none"
                  stroke="url(#tcSpecularWhite)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.8"
                  strokeDasharray="400"
                  strokeDashoffset={mounted ? 0 : 400}
                  style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
                />
              </g>
            )}

            {/* ===================================================
                CENTER 3D CONVEX FROSTED GLASS LENS
               =================================================== */}
            <circle cx={cx} cy={cy} r="48" fill="url(#tcLensGrad)" stroke="rgba(139, 92, 246, 0.45)" strokeWidth="1.2" />

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
              stroke="rgba(139, 92, 246, 0.6)"
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
            <text x={cx} y={cy - 25} textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#2dd4bf" fontFamily="monospace">
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
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.85)",
                transformOrigin: `${cx}px ${cy}px`,
                transition: "opacity 0.8s ease-out 0.2s, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
              }}
            >
              {totalProblems}
            </text>

            {/* Total Problems Subtitle */}
            <text x={cx} y={cy + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill="#94a3b8" letterSpacing="-0.2">
              Total Problems
            </text>
          </g>

          {/* Breakdown Percentage Rows (Staggered Fade-In) */}
          {/* Row 1: Fundamental - Cyan */}
          <g
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-6px)",
              transition: "all 0.5s ease-out 0.25s",
            }}
          >
            <circle cx="24" cy="214" r="4.5" fill="#2dd4bf" filter="url(#tcGlowCyan)" />
            <text x="36" y="218" fontSize="12" fontWeight="600" fill="#e2e8f0">
              Fundamental
            </text>
            <text x="204" y="218" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
              {fundSolved}{" "}
              <tspan fontWeight="500" fill="#2dd4bf" opacity="0.9">
                ({fundPct.toFixed(1)}%)
              </tspan>
            </text>
          </g>

          {/* Row 2: Intermediate - Violet */}
          <g
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-6px)",
              transition: "all 0.5s ease-out 0.35s",
            }}
          >
            <circle cx="24" cy="238" r="4.5" fill="#a855f7" filter="url(#tcGlowViolet)" />
            <text x="36" y="242" fontSize="12" fontWeight="600" fill="#e2e8f0">
              Intermediate
            </text>
            <text x="204" y="242" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
              {interSolved}{" "}
              <tspan fontWeight="500" fill="#c084fc" opacity="0.9">
                ({interPct.toFixed(1)}%)
              </tspan>
            </text>
          </g>

          {/* Row 3: Advanced - Amber */}
          <g
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateX(0)" : "translateX(-6px)",
              transition: "all 0.5s ease-out 0.45s",
            }}
          >
            <circle cx="24" cy="262" r="4.5" fill="#fbbf24" filter="url(#tcGlowAmber)" />
            <text x="36" y="266" fontSize="12" fontWeight="600" fill="#e2e8f0">
              Advanced
            </text>
            <text x="204" y="266" textAnchor="end" fontSize="12" fontWeight="800" fill="#ffffff">
              {advSolved}{" "}
              <tspan fontWeight="500" fill="#fbbf24" opacity="0.9">
                ({advPct.toFixed(1)}%)
              </tspan>
            </text>
          </g>

          {/* Bottom 3-Stat Glass Box */}
          <g
            transform="translate(14, 296)"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(6px)",
              transition: "all 0.6s ease-out 0.4s",
            }}
          >
            <rect
              width="196"
              height="64"
              rx="12"
              fill="#0a1024"
              stroke="url(#tcSubBorderGrad)"
              strokeWidth="1"
            />
            {/* Top Shine */}
            <line x1="20" y1="1" x2="176" y2="1" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Vertical Dividers */}
            <line x1="65" y1="12" x2="65" y2="52" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
            <line x1="130" y1="12" x2="130" y2="52" stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />

            {/* Stat 1: Topics */}
            <text x="32" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {hasRealData ? sorted.length : 0}
            </text>
            <text x="32" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#94a3b8" opacity="0.9">
              Topics
            </text>

            {/* Stat 2: Problems */}
            <text x="98" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {totalProblems}
            </text>
            <text x="98" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#94a3b8" opacity="0.9">
              Problems
            </text>

            {/* Stat 3: Fundamental % */}
            <text x="163" y="33" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">
              {fundPct.toFixed(1)}%
            </text>
            <text x="163" y="50" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#94a3b8" opacity="0.9">
              Fundamental
            </text>
          </g>
        </g>

        {/* =====================================================
            3. CENTER/RIGHT TOP: 12-Bar DSA 3D Glass Chart
           ===================================================== */}
        <g
          transform="translate(272, 80)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease-out 0.1s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s",
          }}
        >
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
          <line x1="46" y1="35" x2="46" y2="150" stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1.2" />

          {/* Horizontal Reference Lines & Y-Axis Ticks (Mathematically mapped directly inside the card!) */}
          {yTicks.map((t, idx) => (
            <g key={idx}>
              <line
                x1="46"
                y1={t.y}
                x2="698"
                y2={t.y}
                stroke="rgba(148, 163, 184, 0.12)"
                strokeDasharray={t.val === 0 ? "none" : "3 3"}
                strokeWidth={t.val === 0 ? "1.4" : "1"}
              />
              <line x1="42" y1={t.y} x2="46" y2={t.y} stroke="rgba(148, 163, 184, 0.35)" strokeWidth="1.2" />
              <text
                x="38"
                y={t.y + 4}
                textAnchor="end"
                fontSize="11"
                fontWeight="700"
                fill="#94a3b8"
                opacity="0.9"
              >
                {t.val}
              </text>
            </g>
          ))}

          {/* 12 Vertical Topic Columns (Animated Equalizer-Style Cascade!) */}
          {top12.map((item, i) => {
            const colX = 76 + i * 52.5;
            const targetBarHeight = hasRealData && item.solved > 0 ? Math.max(10, (item.solved / yMax) * 115) : 0;
            const currentBarHeight = mounted ? targetBarHeight : 0;
            const currentBarY = 150 - currentBarHeight;

            // Pick 3D glass gradient and glow based on tier
            const isFund = item.level === "fundamental";
            const isInter = item.level === "intermediate";
            const barFill = isFund ? "url(#tcBarFund3D)" : isInter ? "url(#tcBarInter3D)" : "url(#tcBarAdv3D)";
            const glowColor = isFund ? "#2dd4bf" : isInter ? "#a855f7" : "#fbbf24";
            const [labelLine1, labelLine2] = splitTopicLabel(item.tag);

            return (
              <g key={item.tag + i}>
                {/* Count Number on top of bar with Smooth Fade */}
                <text
                  x={colX}
                  y={currentBarHeight > 0 ? currentBarY - 6 : 144}
                  textAnchor="middle"
                  fontSize="13.5"
                  fontWeight="900"
                  fill="#ffffff"
                  filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 0.6s ease-out ${i * 45 + 200}ms, transform 0.6s ease-out ${i * 45 + 200}ms`,
                  }}
                >
                  {item.solved}
                </text>

                {/* Base Pedestal Glow on Baseline */}
                <ellipse cx={colX} cy="150" rx="14" ry="3.5" fill={glowColor} opacity={currentBarHeight > 0 ? 0.4 : 0.15} filter="blur(2px)" />

                {/* Ambient Backlight Glow behind the Glass Pillar (if solved > 0) */}
                {targetBarHeight > 0 && (
                  <rect
                    x={colX - 14}
                    y={currentBarY}
                    width="28"
                    height={currentBarHeight}
                    rx="8"
                    fill={glowColor}
                    opacity="0.25"
                    filter="blur(4px)"
                    style={{
                      transition: `height 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms, y 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms`,
                    }}
                  />
                )}

                {/* Main 3D Frosted Glass Column Pillar (Animated Rise from Baseline) */}
                {targetBarHeight > 0 ? (
                  <>
                    <rect
                      x={colX - 16}
                      y={currentBarY}
                      width="32"
                      height={currentBarHeight}
                      rx="8"
                      fill={barFill}
                      stroke="rgba(255, 255, 255, 0.35)"
                      strokeWidth="1"
                      style={{
                        transition: `height 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms, y 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms`,
                      }}
                    />
                    {/* Specular Curved Reflection at Top Cap of Bar */}
                    {currentBarHeight > 4 && (
                      <rect
                        x={colX - 13}
                        y={currentBarY + 1.5}
                        width="26"
                        height="4"
                        rx="2"
                        fill="#ffffff"
                        opacity="0.45"
                        style={{
                          transition: `y 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms`,
                        }}
                      />
                    )}
                    {/* Specular Vertical Light Streak down Left Side */}
                    {currentBarHeight > 9 && (
                      <rect
                        x={colX - 13}
                        y={currentBarY + 5}
                        width="2.8"
                        height={Math.max(2, currentBarHeight - 9)}
                        rx="1.2"
                        fill="url(#tcSpecularVertical)"
                        style={{
                          transition: `height 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms, y 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms`,
                        }}
                      />
                    )}
                    {/* Subtle Right Edge Depth Shadow */}
                    {currentBarHeight > 9 && (
                      <rect
                        x={colX + 11}
                        y={currentBarY + 5}
                        width="1.8"
                        height={Math.max(2, currentBarHeight - 9)}
                        rx="0.8"
                        fill="#000000"
                        opacity="0.35"
                        style={{
                          transition: `height 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms, y 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${i * 45 + 80}ms`,
                        }}
                      />
                    )}
                  </>
                ) : (
                  <rect
                    x={colX - 14}
                    y="148"
                    width="28"
                    height="3"
                    rx="1.5"
                    fill="rgba(139, 92, 246, 0.25)"
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
                  stroke="rgba(139, 92, 246, 0.45)"
                  strokeWidth="1.2"
                  style={{
                    opacity: mounted ? 1 : 0,
                    transform: mounted ? "scale(1)" : "scale(0.85)",
                    transformOrigin: `${colX}px 178px`,
                    transition: `all 0.5s ease-out ${i * 45 + 120}ms`,
                  }}
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
                  fill="#e2e8f0"
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
                    fill="#94a3b8"
                    opacity="0.9"
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
        <g
          transform="translate(272, 350)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease-out 0.2s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
          }}
        >
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
            <circle cx="10" cy="10" r="9" stroke="#8b5cf6" strokeWidth="1.8" fill="none" />
            <circle cx="10" cy="10" r="5" stroke="#2dd4bf" strokeWidth="1.6" fill="none" />
            <circle cx="10" cy="10" r="2" fill="#38bdf8" />
            <path d="M 17 3 L 13 7" stroke="#8b5cf6" strokeWidth="1.8" strokeLinecap="round" />
            <text x="26" y="14" fontSize="14" fontWeight="800" fill="#ffffff" letterSpacing="-0.3">
              Top Covered Topics
            </text>
          </g>

          {/* 3 Topic Badges with 3D Trophy and Medals (Staggered Pop-In Animation) */}
          {/* Badge 1: Golden Trophy (#1) */}
          <g
            transform="translate(14, 44)"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.9)",
              transformOrigin: "64px 70px",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
            }}
          >
            <rect
              width="100"
              height="52"
              rx="12"
              fill="#0d1428"
              stroke="rgba(139, 92, 246, 0.45)"
              strokeWidth="1.2"
            />
            {/* Top Shine */}
            <line x1="8" y1="1" x2="92" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

            {/* 3D Realistic Golden Trophy Icon */}
            <g transform="translate(8, 10)">
              {/* Handles */}
              <path d="M 2 5 C -2 5, -2 13, 2 13 M 16 5 C 20 5, 20 13, 16 13" stroke="#fbbf24" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              {/* Cup Body */}
              <path d="M 2 3 L 16 3 L 15 11 C 15 14, 11 16, 9 16 C 7 16, 3 14, 3 11 Z" fill="#f59e0b" stroke="#fef08a" strokeWidth="0.8" />
              {/* Stem & Base */}
              <rect x="7.5" y="16" width="3" height="4" fill="#b45309" />
              <rect x="5" y="20" width="8" height="2.5" rx="1" fill="#fbbf24" />
            </g>

            {/* Text */}
            <text x="36" y="24" fontSize="11" fontWeight="800" fill="#ffffff">
              {first.tag}
            </text>
            <text x="36" y="39" fontSize="10.5" fontWeight="700" fill="#2dd4bf">
              ({first.solved})
            </text>
          </g>

          {/* Badge 2: Star Medal (#2) */}
          <g
            transform="translate(122, 44)"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.9)",
              transformOrigin: "174px 70px",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.35s",
            }}
          >
            <rect
              width="104"
              height="52"
              rx="12"
              fill="#0d1428"
              stroke="rgba(139, 92, 246, 0.45)"
              strokeWidth="1.2"
            />
            {/* Top Shine */}
            <line x1="8" y1="1" x2="96" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Violet-Cyan Star Medal Icon */}
            <g transform="translate(8, 10)">
              {/* Ribbons */}
              <path d="M 5 2 L 7 10 L 9 2" fill="#8b5cf6" opacity="0.8" />
              <path d="M 13 2 L 11 10 L 9 2" fill="#6366f1" opacity="0.8" />
              {/* Medal Disc */}
              <circle cx="9" cy="13" r="7" fill="#2dd4bf" stroke="#5eead4" strokeWidth="0.8" />
              {/* Star inside medal */}
              <polygon points="9,9 10.2,12 13,12 10.8,13.8 11.6,16.5 9,14.8 6.4,16.5 7.2,13.8 5,12 7.8,12" fill="#042f2e" />
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
            <text x="35" y={splitTopicLabel(second.tag)[1] ? "44" : "37"} fontSize="10.5" fontWeight="700" fill="#2dd4bf">
              ({second.solved})
            </text>
          </g>

          {/* Badge 3: Star Medal (#3) */}
          <g
            transform="translate(234, 44)"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "scale(1)" : "scale(0.9)",
              transformOrigin: "286px 70px",
              transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.45s",
            }}
          >
            <rect
              width="104"
              height="52"
              rx="12"
              fill="#0d1428"
              stroke="rgba(139, 92, 246, 0.45)"
              strokeWidth="1.2"
            />
            {/* Top Shine */}
            <line x1="8" y1="1" x2="96" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

            {/* Violet-Cyan Star Medal Icon */}
            <g transform="translate(8, 10)">
              {/* Ribbons */}
              <path d="M 5 2 L 7 10 L 9 2" fill="#8b5cf6" opacity="0.8" />
              <path d="M 13 2 L 11 10 L 9 2" fill="#6366f1" opacity="0.8" />
              {/* Medal Disc */}
              <circle cx="9" cy="13" r="7" fill="#a855f7" stroke="#c084fc" strokeWidth="0.8" />
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
            <text x="35" y={splitTopicLabel(third.tag)[1] ? "44" : "37"} fontSize="10.5" fontWeight="700" fill="#2dd4bf">
              ({third.solved})
            </text>
          </g>
        </g>

        {/* =====================================================
            5. BOTTOM RIGHT: Coverage Insight (Clean Proportional Spacing & Animated Graphic)
           ===================================================== */}
        <g
          transform="translate(636, 350)"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.7s ease-out 0.25s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.25s",
          }}
        >
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
            <rect x="0" y="8" width="3.5" height="8" rx="1" fill="#2dd4bf" />
            <rect x="5.5" y="4" width="3.5" height="12" rx="1" fill="#818cf8" />
            <rect x="11" y="0" width="3.5" height="16" rx="1" fill="#c084fc" />
            <text x="22" y="12" fontSize="14" fontWeight="800" fill="#ffffff" letterSpacing="-0.3">
              Coverage Insight
            </text>
          </g>

          {/* Dynamic Insight Prose - Clean professional spacing below heading (y=52 instead of y=46) */}
          <text
            x="18"
            y="52"
            fontSize="11.5"
            fontWeight="500"
            fill="#e2e8f0"
            opacity="0.95"
            style={{
              opacity: mounted ? 0.95 : 0,
              transition: "opacity 0.8s ease-out 0.35s",
            }}
          >
            {totalProblems > 0 ? (
              <>
                <tspan x="18" dy="0">
                  Most problems are Fundamental ({fundPct.toFixed(1)}%),
                </tspan>
                <tspan x="18" dy="16.5">
                  with a good mix of Intermediate ({interPct.toFixed(1)}%)
                </tspan>
                <tspan x="18" dy="16.5">
                  and Advanced ({advPct.toFixed(1)}%).
                </tspan>
              </>
            ) : (
              <>
                <tspan x="18" dy="0">
                  No DSA problems solved yet.
                </tspan>
                <tspan x="18" dy="16.5">
                  Connect your LeetCode account in Settings
                </tspan>
                <tspan x="18" dy="16.5">
                  to track your real-time topic progress.
                </tspan>
              </>
            )}
          </text>

          {/* 3D Rising Bar Chart with Neon Upward Arrow Graphic (Animated Cascade) */}
          <g transform="translate(250, 26)">
            {/* 4 Rising Isometric-Style Columns */}
            {/* Bar 1 */}
            <rect
              x="10"
              y={mounted ? 46 : 64}
              width="11"
              height={mounted ? 18 : 0}
              rx="3"
              fill="#2dd4bf"
              opacity={hasRealData ? 1 : 0.4}
              style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1), y 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }}
            />
            <rect x="11" y={mounted ? 47 : 64} width="2" height={mounted ? 16 : 0} rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1), y 0.7s cubic-bezier(0.16, 1, 0.3, 1)" }} />

            {/* Bar 2 */}
            <rect
              x="25"
              y={mounted ? 32 : 64}
              width="11"
              height={mounted ? 32 : 0}
              rx="3"
              fill="#38bdf8"
              opacity={hasRealData ? 1 : 0.4}
              style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, y 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s" }}
            />
            <rect x="26" y={mounted ? 33 : 64} width="2" height={mounted ? 30 : 0} rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s, y 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s" }} />

            {/* Bar 3 */}
            <rect
              x="40"
              y={mounted ? 18 : 64}
              width="11"
              height={mounted ? 46 : 0}
              rx="3"
              fill="#818cf8"
              opacity={hasRealData ? 1 : 0.4}
              style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, y 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.16s" }}
            />
            <rect x="41" y={mounted ? 19 : 64} width="2" height={mounted ? 44 : 0} rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.16s, y 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.16s" }} />

            {/* Bar 4 */}
            <rect
              x="55"
              y={mounted ? 4 : 64}
              width="11"
              height={mounted ? 60 : 0}
              rx="3"
              fill="#c084fc"
              opacity={hasRealData ? 1 : 0.4}
              style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s, y 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s" }}
            />
            <rect x="56" y={mounted ? 5 : 64} width="2" height={mounted ? 58 : 0} rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} style={{ transition: "height 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s, y 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s" }} />

            {/* Upward Curved Glowing Neon Arrow with Draw-In Animation */}
            <path
              d="M 6 44 C 24 34, 48 20, 72 -2"
              stroke="url(#tcArrowGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              filter="url(#tcGlowCyan)"
              strokeDasharray="160"
              strokeDashoffset={mounted ? 0 : 160}
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.3s" }}
              opacity={hasRealData ? 1 : 0.6}
            />
            {/* Arrowhead */}
            <polygon
              points="72,-6 78,2 67,4"
              fill="#ffffff"
              filter="url(#tcGlowCyan)"
              opacity={mounted ? (hasRealData ? 1 : 0.6) : 0}
              style={{ transition: "opacity 0.6s ease-out 1.2s" }}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
