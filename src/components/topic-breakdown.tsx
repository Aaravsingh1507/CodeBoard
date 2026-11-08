"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";

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

// Helper: creates a continuous annular donut arc with clean radial cut gaps
function getDonutArcPath(centerX: number, centerY: number, radius: number, startDeg: number, spanDeg: number, gapDeg: number = 2.4) {
  if (spanDeg <= gapDeg) return null;
  const s = (startDeg + gapDeg / 2) % 360;
  const e = (startDeg + spanDeg - gapDeg / 2) % 360;
  return describeArc(centerX, centerY, radius, s, e);
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Memoize real topics passed from the user's account. No fake preloaded data!
  const userTopics = useMemo(() => topics ?? [], [topics]);
  const hasRealData = useMemo(() => userTopics.length > 0 && userTopics.some((t) => t.solved > 0), [userTopics]);

  // Sort descending by solved count
  const sorted = useMemo(() => {
    return hasRealData ? [...userTopics].sort((a, b) => b.solved - a.solved) : [];
  }, [hasRealData, userTopics]);

  // Top 12 columns for the bar chart
  const top12: TopicItem[] = useMemo(() => {
    return hasRealData
      ? sorted.slice(0, 12)
      : DEFAULT_12_TOPIC_NAMES.map((name) => ({ tag: name, solved: 0, level: "fundamental" }));
  }, [hasRealData, sorted]);

  // Calculate real metrics across all topics
  const { fundSolved, interSolved, advSolved, totalProblems, fundPct, interPct, advPct } = useMemo(() => {
    let f = 0;
    let i = 0;
    let a = 0;
    userTopics.forEach((t) => {
      const lvl = (t.level || "").toLowerCase();
      if (lvl.includes("fund")) f += t.solved;
      else if (lvl.includes("inter")) i += t.solved;
      else if (lvl.includes("adv")) a += t.solved;
      else f += t.solved;
    });
    const total = f + i + a;
    return {
      fundSolved: f,
      interSolved: i,
      advSolved: a,
      totalProblems: total,
      fundPct: total > 0 ? (f / total) * 100 : 0,
      interPct: total > 0 ? (i / total) * 100 : 0,
      advPct: total > 0 ? (a / total) * 100 : 0,
    };
  }, [userTopics]);

  // Number counting states for central dial and 12 bar columns - defaults to REAL VALUES so never stuck at 0!
  const [displayTotal, setDisplayTotal] = useState(totalProblems);
  const [displayCounts, setDisplayCounts] = useState<number[]>(() => top12.map((t) => t.solved));

  // Sync state immediately if totalProblems or topics change
  useEffect(() => {
    setDisplayTotal(totalProblems);
    setDisplayCounts(top12.map((t) => t.solved));
  }, [totalProblems, top12]);

  // IntersectionObserver: Triggers animations once when entering viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      setDisplayTotal(totalProblems);
      setDisplayCounts(top12.map((t) => t.solved));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalProblems, top12]);

  // Smooth counting animation on entrance: starts from 0 up to real values
  useEffect(() => {
    if (!isVisible) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayTotal(totalProblems);
      setDisplayCounts(top12.map((t) => t.solved));
      return;
    }

    const duration = 850;
    let startTime: number | null = null;
    let animId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayTotal(Math.round(ease * totalProblems));

      const counts = top12.map((item, i) => {
        const barDelay = i * 35 + 80;
        if (elapsed < barDelay) return 0;
        const barProgress = Math.min((elapsed - barDelay) / 450, 1);
        const barEase = 1 - Math.pow(1 - barProgress, 3);
        return Math.round(barEase * item.solved);
      });
      setDisplayCounts(counts);

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplayTotal(totalProblems);
        setDisplayCounts(top12.map((t) => t.solved));
      }
    };

    animId = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(animId);
      setDisplayTotal(totalProblems);
      setDisplayCounts(top12.map((t) => t.solved));
    };
  }, [isVisible, totalProblems, top12]);

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
  const arcPathFund = totalProblems > 0 && fundSolved > 0 ? getDonutArcPath(cx, cy, radius, 0, fundDeg) : null;
  const arcPathInter = totalProblems > 0 && interSolved > 0 ? getDonutArcPath(cx, cy, radius, fundDeg, interDeg) : null;
  const arcPathAdv = totalProblems > 0 && advSolved > 0 ? getDonutArcPath(cx, cy, radius, fundDeg + interDeg, advDeg) : null;

  return (
    <div
      ref={containerRef}
      className={`w-full overflow-hidden select-none transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <svg
        viewBox="0 0 1024 490"
        className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
        style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      >
        <defs>
          {/* Robust Native CSS Keyframe Animations - NEVER clobbers SVG coordinate transforms */}
          <style>{`
            @keyframes cbBarGrow {
              0% {
                transform: scaleY(0);
                opacity: 0.15;
              }
              100% {
                transform: scaleY(1);
                opacity: 1;
              }
            }
            @keyframes cbArcSweep {
              from {
                stroke-dashoffset: 400;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes cbFadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            @keyframes cbArrowSweep {
              from {
                stroke-dashoffset: 160;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes cbArrowheadPop {
              0% {
                opacity: 0;
                transform: scale(0.3);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            @keyframes cbDotPulse {
              0% {
                transform: scale(1);
                opacity: 0.9;
              }
              50% {
                transform: scale(1.45);
                opacity: 1;
                filter: drop-shadow(0 0 6px currentColor);
              }
              100% {
                transform: scale(1);
                opacity: 0.9;
              }
            }
            .cb-dot-pulse {
              transform-box: fill-box;
              transform-origin: center;
              animation: cbDotPulse 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s 1;
            }
            @keyframes cbFloat {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-2px);
              }
            }
            .cb-header-float {
              transform-box: fill-box;
              transform-origin: center;
              animation: cbFloat 4s ease-in-out infinite;
            }
            @keyframes cbIconEntrance {
              0% {
                opacity: 0;
                transform: scale(0.75);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            .cb-topic-icon-btn {
              cursor: pointer;
              transform-box: fill-box;
              transform-origin: center;
              transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;
            }
            .cb-topic-icon-btn:hover {
              transform: scale(1.06);
              filter: drop-shadow(0 0 8px rgba(45, 212, 191, 0.55)) drop-shadow(0 0 12px rgba(139, 92, 246, 0.35));
            }
            .cb-badge-card {
              cursor: pointer;
              transform-box: fill-box;
              transform-origin: center;
              transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), filter 0.25s ease;
            }
            .cb-badge-card:hover {
              transform: translateY(-3px);
              filter: drop-shadow(0 6px 14px rgba(139, 92, 246, 0.35));
            }
            .cb-badge-card .cb-trophy-icon {
              transform-box: fill-box;
              transform-origin: center;
              transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cb-badge-card:hover .cb-trophy-icon {
              transform: scale(1.15) rotate(4deg);
            }
            .cb-badge-card .cb-medal-icon {
              transform-box: fill-box;
              transform-origin: center;
              transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            .cb-badge-card:hover .cb-medal-icon {
              transform: scale(1.15) rotate(-4deg);
            }
            .cb-legend-pill {
              cursor: pointer;
              transform-box: fill-box;
              transform-origin: center;
              transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), filter 0.2s ease;
            }
            .cb-legend-pill:hover {
              transform: translateY(-2px);
              filter: drop-shadow(0 2px 8px rgba(139, 92, 246, 0.35));
            }
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                stroke-dashoffset: 0 !important;
              }
            }
          `}</style>

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
        {/* Title + Subtitle (Shifted to corner) */}
        <text x="32" y="42" fontSize="24" fontWeight="800" fill="#ffffff" letterSpacing="-0.5">
          Topic Coverage
        </text>
        <text x="32" y="60" fontSize="12.5" fontWeight="500" fill="#94a3b8" opacity="0.9">
          Problem distribution across DSA topics
        </text>

        {/* Legend Filter Pills (Top Right) */}
        {/* Fundamental - Cyan */}
        <g
          transform="translate(616, 26)"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.15s",
          }}
        >
          <g className="cb-legend-pill">
            <rect
              width="118"
              height="32"
              rx="16"
              fill="#0b1226"
              stroke="rgba(45, 212, 191, 0.45)"
              strokeWidth="1.2"
            />
            <line x1="12" y1="1" x2="106" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="16" cy="16" r="4.2" fill="#2dd4bf" filter="url(#tcGlowCyan)" className="cb-dot-pulse" />
            <text x="28" y="16.5" dominantBaseline="central" fontSize="11" fontWeight="600" fill="#ffffff" letterSpacing="0.2">
              Fundamental
            </text>
          </g>
        </g>

        {/* Intermediate - Violet */}
        <g
          transform="translate(748, 26)"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.25s",
          }}
        >
          <g className="cb-legend-pill">
            <rect
              width="126"
              height="32"
              rx="16"
              fill="#120f29"
              stroke="rgba(168, 85, 247, 0.45)"
              strokeWidth="1.2"
            />
            <line x1="12" y1="1" x2="114" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="16" cy="16" r="4.2" fill="#a855f7" filter="url(#tcGlowViolet)" className="cb-dot-pulse" style={{ animationDelay: "0.75s" }} />
            <text x="28" y="16.5" dominantBaseline="central" fontSize="11" fontWeight="600" fill="#ffffff" letterSpacing="0.2">
              Intermediate
            </text>
          </g>
        </g>

        {/* Advanced - Amber */}
        <g
          transform="translate(888, 26)"
          style={{
            opacity: isVisible ? 1 : 0,
            transition: "opacity 0.6s ease-out 0.35s",
          }}
        >
          <g className="cb-legend-pill">
            <rect
              width="104"
              height="32"
              rx="16"
              fill="#1c160a"
              stroke="rgba(251, 191, 36, 0.45)"
              strokeWidth="1.2"
            />
            <line x1="12" y1="1" x2="92" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />
            <circle cx="16" cy="16" r="4.2" fill="#fbbf24" filter="url(#tcGlowAmber)" className="cb-dot-pulse" style={{ animationDelay: "0.9s" }} />
            <text x="28" y="16.5" dominantBaseline="central" fontSize="11" fontWeight="600" fill="#ffffff" letterSpacing="0.2">
              Advanced
            </text>
          </g>
        </g>

        {/* =====================================================
            2. LEFT SUBCARD: 3D Glassmorphic Donut Gauge & Summary
           ===================================================== */}
        <g transform="translate(32, 80)">
          <g
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease-out 0.08s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.08s",
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

              {/* ARC 1: FUNDAMENTAL (Cyan Glass Ring with Draw-In Animation) */}
              {arcPathFund && (
                <g>
                  <path
                    d={arcPathFund}
                    fill="none"
                    stroke="url(#tcRingFund3D)"
                    strokeWidth="14"
                    strokeLinecap="butt"
                    strokeDasharray="400"
                    style={{ animation: isVisible ? "cbArcSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) both" : "none", animationDelay: "0.2s" }}
                  />
                  <path
                    d={arcPathFund}
                    fill="none"
                    stroke="url(#tcSpecularWhite)"
                    strokeWidth="2.5"
                    strokeLinecap="butt"
                    opacity="0.65"
                    strokeDasharray="400"
                    style={{ animation: isVisible ? "cbArcSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) both" : "none", animationDelay: "0.2s" }}
                  />
                </g>
              )}

              {/* ARC 2: INTERMEDIATE (Violet Glass Ring with Draw-In Animation) */}
              {arcPathInter && (
                <g>
                  <path
                    d={arcPathInter}
                    fill="none"
                    stroke="url(#tcRingInter3D)"
                    strokeWidth="14"
                    strokeLinecap="butt"
                    strokeDasharray="400"
                    style={{ animation: isVisible ? "cbArcSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) both" : "none", animationDelay: "0.35s" }}
                  />
                  <path
                    d={arcPathInter}
                    fill="none"
                    stroke="url(#tcSpecularWhite)"
                    strokeWidth="2.5"
                    strokeLinecap="butt"
                    opacity="0.65"
                    strokeDasharray="400"
                    style={{ animation: isVisible ? "cbArcSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) both" : "none", animationDelay: "0.35s" }}
                  />
                </g>
              )}

              {/* ARC 3: ADVANCED (Amber Glass Ring with Draw-In Animation) */}
              {arcPathAdv && (
                <g>
                  <path
                    d={arcPathAdv}
                    fill="none"
                    stroke="url(#tcRingAdv3D)"
                    strokeWidth="14"
                    strokeLinecap="butt"
                    strokeDasharray="400"
                    style={{ animation: isVisible ? "cbArcSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) both" : "none", animationDelay: "0.5s" }}
                  />
                  <path
                    d={arcPathAdv}
                    fill="none"
                    stroke="url(#tcSpecularWhite)"
                    strokeWidth="2.5"
                    strokeLinecap="butt"
                    opacity="0.65"
                    strokeDasharray="400"
                    style={{ animation: isVisible ? "cbArcSweep 1.2s cubic-bezier(0.16, 1, 0.3, 1) both" : "none", animationDelay: "0.5s" }}
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

              {/* Large Total Count with Counting Animation */}
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
                {displayTotal}
              </text>

              {/* Total Problems Subtitle */}
              <text x={cx} y={cy + 26} textAnchor="middle" fontSize="11" fontWeight="700" fill="#94a3b8" letterSpacing="-0.2">
                Total Problems
              </text>
            </g>

            {/* Breakdown Percentage Rows */}
            {/* Row 1: Fundamental - Cyan */}
            <g style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-out 0.4s" }}>
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
            <g style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-out 0.5s" }}>
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
            <g style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease-out 0.6s" }}>
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
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.7s",
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
                {displayTotal}
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
        </g>

        {/* =====================================================
            3. CENTER/RIGHT TOP: 12-Bar DSA 3D Glass Chart
           ===================================================== */}
        <g transform="translate(272, 80)">
          <g
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease-out 0.16s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.16s",
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
                  y={t.y}
                  dominantBaseline="middle"
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
              const barHeight = hasRealData && item.solved > 0 ? Math.max(10, (item.solved / yMax) * 115) : 0;
              const barY = 150 - barHeight;

              // Pick 3D glass gradient and glow based on tier
              const isFund = item.level === "fundamental";
              const isInter = item.level === "intermediate";
              const barFill = isFund ? "url(#tcBarFund3D)" : isInter ? "url(#tcBarInter3D)" : "url(#tcBarAdv3D)";
              const glowColor = isFund ? "#2dd4bf" : isInter ? "#a855f7" : "#fbbf24";
              const [labelLine1, labelLine2] = splitTopicLabel(item.tag);

              return (
                <g key={item.tag + i}>
                  {/* Count Number on top of bar with Counting Animation */}
                  <text
                    x={colX}
                    y={barHeight > 0 ? barY - 6 : 142}
                    textAnchor="middle"
                    fontSize="13.5"
                    fontWeight="900"
                    fill="#ffffff"
                    filter="drop-shadow(0 1px 3px rgba(0,0,0,0.9))"
                    style={{
                      animation: isVisible ? `cbFadeIn 0.5s ease-out both` : "none",
                      animationDelay: `${i * 35 + 140}ms`,
                    }}
                  >
                    {displayCounts[i] !== undefined ? displayCounts[i] : item.solved}
                  </text>

                  {/* Base Pedestal Glow on Baseline */}
                  <ellipse cx={colX} cy="150" rx="14" ry="3.5" fill={glowColor} opacity={barHeight > 0 ? 0.4 : 0.15} filter="blur(2px)" />

                  {/* Main 3D Frosted Glass Column Pillar (Animated Rise from Baseline) */}
                  {barHeight > 0 ? (
                    <g
                      style={{
                        transformOrigin: `${colX}px 150px`,
                        animation: isVisible ? `cbBarGrow 0.85s cubic-bezier(0.16, 1, 0.3, 1) both` : "none",
                        animationDelay: `${i * 45}ms`,
                      }}
                    >
                      {/* Ambient Backlight Glow behind the Glass Pillar */}
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
                      {/* Main Frosted Pillar Body */}
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
                      {barHeight > 4 && (
                        <rect
                          x={colX - 13}
                          y={barY + 1.5}
                          width="26"
                          height="4"
                          rx="2"
                          fill="#ffffff"
                          opacity="0.45"
                        />
                      )}
                      {/* Specular Vertical Light Streak down Left Side */}
                      {barHeight > 9 && (
                        <rect
                          x={colX - 13}
                          y={barY + 5}
                          width="2.8"
                          height={Math.max(2, barHeight - 9)}
                          rx="1.2"
                          fill="url(#tcSpecularVertical)"
                        />
                      )}
                      {/* Subtle Right Edge Depth Shadow */}
                      {barHeight > 9 && (
                        <rect
                          x={colX + 11}
                          y={barY + 5}
                          width="1.8"
                          height={Math.max(2, barHeight - 9)}
                          rx="0.8"
                          fill="#000000"
                          opacity="0.35"
                        />
                      )}
                    </g>
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

                  {/* Rounded Square Frosted Icon Box with Hover Scale & Soft Glow */}
                  <g
                    className="cb-topic-icon-btn"
                    style={{
                      transformOrigin: `${colX}px 178px`,
                      animation: isVisible ? `cbIconEntrance 0.6s cubic-bezier(0.16, 1, 0.3, 1) both` : "none",
                      animationDelay: `${i * 35 + 220}ms`,
                    }}
                  >
                    <rect
                      x={colX - 16}
                      y="162"
                      width="32"
                      height="32"
                      rx="9"
                      fill="url(#tcIconGlass)"
                      stroke="rgba(139, 92, 246, 0.45)"
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
                  </g>

                  {/* Topic Name Label (Harmonized vertical centering) */}
                  {labelLine2 ? (
                    <>
                      <text
                        x={colX}
                        y="207"
                        textAnchor="middle"
                        fontSize="9.5"
                        fontWeight="700"
                        fill="#e2e8f0"
                      >
                        {labelLine1}
                      </text>
                      <text
                        x={colX}
                        y="219"
                        textAnchor="middle"
                        fontSize="8.5"
                        fontWeight="600"
                        fill="#94a3b8"
                        opacity="0.9"
                      >
                        {labelLine2}
                      </text>
                    </>
                  ) : (
                    <text
                      x={colX}
                      y="213"
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="700"
                      fill="#e2e8f0"
                    >
                      {labelLine1}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </g>

        {/* =====================================================
            4. BOTTOM LEFT: Top Covered Topics Badges
           ===================================================== */}
        <g transform="translate(272, 350)">
          <g
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease-out 0.24s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.24s",
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

            {/* 3 Topic Badges with 3D Trophy and Medals */}
            {/* Badge 1: Golden Trophy (#1) */}
            <g
              transform="translate(14, 44)"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.35s",
              }}
            >
              <g className="cb-badge-card">
                <rect
                  width="102"
                  height="56"
                  rx="12"
                  fill="#0d1428"
                  stroke="rgba(139, 92, 246, 0.45)"
                  strokeWidth="1.2"
                />
                {/* Top Shine */}
                <line x1="8" y1="1" x2="94" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

                {/* 3D Realistic Golden Trophy Icon with Hover Rotation */}
                <g transform="translate(8, 12)" className="cb-trophy-icon">
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
                <text x="36" y="40" fontSize="10.5" fontWeight="700" fill="#2dd4bf">
                  ({first.solved})
                </text>
              </g>
            </g>

            {/* Badge 2: Star Medal (#2) */}
            <g
              transform="translate(122, 44)"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.45s",
              }}
            >
              <g className="cb-badge-card">
                <rect
                  width="104"
                  height="56"
                  rx="12"
                  fill="#0d1428"
                  stroke="rgba(139, 92, 246, 0.45)"
                  strokeWidth="1.2"
                />
                {/* Top Shine */}
                <line x1="8" y1="1" x2="96" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

                {/* Violet-Cyan Star Medal Icon with Hover Rotation */}
                <g transform="translate(8, 12)" className="cb-medal-icon">
                  {/* Ribbons */}
                  <path d="M 5 2 L 7 10 L 9 2" fill="#8b5cf6" opacity="0.8" />
                  <path d="M 13 2 L 11 10 L 9 2" fill="#6366f1" opacity="0.8" />
                  {/* Medal Disc */}
                  <circle cx="9" cy="13" r="7" fill="#2dd4bf" stroke="#5eead4" strokeWidth="0.8" />
                  {/* Star inside medal */}
                  <polygon points="9,9 10.2,12 13,12 10.8,13.8 11.6,16.5 9,14.8 6.4,16.5 7.2,13.8 5,12 7.8,12" fill="#042f2e" />
                </g>

                {/* Text */}
                {splitTopicLabel(second.tag)[1] ? (
                  <>
                    <text x="35" y="20" fontSize="10" fontWeight="800" fill="#ffffff">
                      {splitTopicLabel(second.tag)[0]}
                    </text>
                    <text x="35" y="31" fontSize="9" fontWeight="700" fill="#ffffff">
                      {splitTopicLabel(second.tag)[1]}
                    </text>
                    <text x="35" y="44" fontSize="10.5" fontWeight="700" fill="#2dd4bf">
                      ({second.solved})
                    </text>
                  </>
                ) : (
                  <>
                    <text x="35" y="24" fontSize="11" fontWeight="800" fill="#ffffff">
                      {second.tag}
                    </text>
                    <text x="35" y="40" fontSize="10.5" fontWeight="700" fill="#2dd4bf">
                      ({second.solved})
                    </text>
                  </>
                )}
              </g>
            </g>

            {/* Badge 3: Star Medal (#3) */}
            <g
              transform="translate(234, 44)"
              style={{
                opacity: isVisible ? 1 : 0,
                transition: "opacity 0.6s ease-out 0.55s",
              }}
            >
              <g className="cb-badge-card">
                <rect
                  width="104"
                  height="56"
                  rx="12"
                  fill="#0d1428"
                  stroke="rgba(139, 92, 246, 0.45)"
                  strokeWidth="1.2"
                />
                {/* Top Shine */}
                <line x1="8" y1="1" x2="96" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.8" strokeLinecap="round" />

                {/* Violet-Cyan Star Medal Icon with Hover Rotation */}
                <g transform="translate(8, 12)" className="cb-medal-icon">
                  {/* Ribbons */}
                  <path d="M 5 2 L 7 10 L 9 2" fill="#8b5cf6" opacity="0.8" />
                  <path d="M 13 2 L 11 10 L 9 2" fill="#6366f1" opacity="0.8" />
                  {/* Medal Disc */}
                  <circle cx="9" cy="13" r="7" fill="#a855f7" stroke="#c084fc" strokeWidth="0.8" />
                  {/* Star inside medal */}
                  <polygon points="9,9 10.2,12 13,12 10.8,13.8 11.6,16.5 9,14.8 6.4,16.5 7.2,13.8 5,12 7.8,12" fill="#ffffff" />
                </g>

                {/* Text */}
                {splitTopicLabel(third.tag)[1] ? (
                  <>
                    <text x="35" y="20" fontSize="10" fontWeight="800" fill="#ffffff">
                      {splitTopicLabel(third.tag)[0]}
                    </text>
                    <text x="35" y="31" fontSize="9" fontWeight="700" fill="#ffffff">
                      {splitTopicLabel(third.tag)[1]}
                    </text>
                    <text x="35" y="44" fontSize="10.5" fontWeight="700" fill="#2dd4bf">
                      ({third.solved})
                    </text>
                  </>
                ) : (
                  <>
                    <text x="35" y="24" fontSize="11" fontWeight="800" fill="#ffffff">
                      {third.tag}
                    </text>
                    <text x="35" y="40" fontSize="10.5" fontWeight="700" fill="#2dd4bf">
                      ({third.solved})
                    </text>
                  </>
                )}
              </g>
            </g>
          </g>
        </g>

        {/* =====================================================
            5. BOTTOM RIGHT: Coverage Insight (Clean Proportional Spacing & Animated Graphic)
           ===================================================== */}
        <g transform="translate(636, 350)">
          <g
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(10px)",
              transition: "opacity 0.7s ease-out 0.32s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.32s",
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

            {/* Dynamic Insight Prose - Clean professional spacing below heading (y=53 instead of cramped y=46) */}
            <text
              x="18"
              y="53"
              fontSize="11.5"
              fontWeight="500"
              fill="#e2e8f0"
              opacity="0.95"
              style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.8s ease-out 0.35s" }}
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
              {/* 4 Rising Columns */}
              {/* Bar 1 */}
              <g
                style={{
                  transformOrigin: "15.5px 64px",
                  animation: isVisible ? "cbBarGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
                  animationDelay: "0.2s",
                }}
              >
                <rect
                  x="10"
                  y="46"
                  width="11"
                  height="18"
                  rx="3"
                  fill="#2dd4bf"
                  opacity={hasRealData ? 1 : 0.4}
                />
                <rect x="11" y="47" width="2" height="16" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />
              </g>

              {/* Bar 2 */}
              <g
                style={{
                  transformOrigin: "30.5px 64px",
                  animation: isVisible ? "cbBarGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
                  animationDelay: "0.28s",
                }}
              >
                <rect
                  x="25"
                  y="32"
                  width="11"
                  height="32"
                  rx="3"
                  fill="#38bdf8"
                  opacity={hasRealData ? 1 : 0.4}
                />
                <rect x="26" y="33" width="2" height="30" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />
              </g>

              {/* Bar 3 */}
              <g
                style={{
                  transformOrigin: "45.5px 64px",
                  animation: isVisible ? "cbBarGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
                  animationDelay: "0.36s",
                }}
              >
                <rect
                  x="40"
                  y="18"
                  width="11"
                  height="46"
                  rx="3"
                  fill="#818cf8"
                  opacity={hasRealData ? 1 : 0.4}
                />
                <rect x="41" y="19" width="2" height="44" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />
              </g>

              {/* Bar 4 */}
              <g
                style={{
                  transformOrigin: "60.5px 64px",
                  animation: isVisible ? "cbBarGrow 0.7s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
                  animationDelay: "0.44s",
                }}
              >
                <rect
                  x="55"
                  y="4"
                  width="11"
                  height="60"
                  rx="3"
                  fill="#c084fc"
                  opacity={hasRealData ? 1 : 0.4}
                />
                <rect x="56" y="5" width="2" height="58" rx="1" fill="#ffffff" opacity={hasRealData ? 0.3 : 0.15} />
              </g>

              {/* Upward Curved Glowing Neon Arrow with Draw-In Animation */}
              <path
                d="M 6 44 C 22 34, 46 18, 68 2"
                stroke="url(#tcArrowGrad)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                filter="url(#tcGlowCyan)"
                strokeDasharray="160"
                style={{
                  animation: isVisible ? "cbArrowSweep 1.1s cubic-bezier(0.16, 1, 0.3, 1) both" : "none",
                  animationDelay: "0.45s",
                }}
                opacity={hasRealData ? 1 : 0.6}
              />
              {/* Arrowhead with Scale & Fade Entrance */}
              <polygon
                points="74,-3 64,1 69,9"
                fill="#ffffff"
                filter="url(#tcGlowCyan)"
                opacity={hasRealData ? 1 : 0.6}
                style={{
                  transformOrigin: "69px 3px",
                  animation: isVisible ? "cbArrowheadPop 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) both" : "none",
                  animationDelay: "1.15s",
                }}
              />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
