"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";

export interface TopicItem {
  tag: string;
  solved: number;
  level: "fundamental" | "intermediate" | "advanced" | string;
}

interface TopicBreakdownProps {
  topics?: TopicItem[];
}

// Canonical 12 DSA topics matching the reference design exactly
interface CanonicalTopic {
  id: string;
  name: string;
  level: "fundamental" | "intermediate" | "advanced";
  aliases: string[];
}

const CANONICAL_TOPICS: CanonicalTopic[] = [
  { id: "array", name: "Array", level: "fundamental", aliases: ["array", "arrays"] },
  { id: "string", name: "String", level: "fundamental", aliases: ["string", "strings"] },
  { id: "hash-table", name: "Hash Table", level: "fundamental", aliases: ["hash table", "hash map", "hashmap", "hashtable"] },
  { id: "dp", name: "Dynamic Programming", level: "intermediate", aliases: ["dynamic programming", "dp"] },
  { id: "math", name: "Math", level: "fundamental", aliases: ["math", "mathematics"] },
  { id: "sorting", name: "Sorting", level: "fundamental", aliases: ["sorting", "sort"] },
  { id: "greedy", name: "Greedy", level: "intermediate", aliases: ["greedy"] },
  { id: "dfs", name: "Depth-First Search", level: "intermediate", aliases: ["depth-first search", "dfs"] },
  { id: "binary-search", name: "Binary Search", level: "intermediate", aliases: ["binary search"] },
  { id: "tree", name: "Tree", level: "intermediate", aliases: ["tree", "trees", "binary tree"] },
  { id: "bfs", name: "Breadth-First Search", level: "intermediate", aliases: ["breadth-first search", "bfs"] },
  { id: "two-pointers", name: "Two Pointers", level: "fundamental", aliases: ["two pointers", "two-pointer"] },
];

// High-fidelity vector icons for the 12 floating topic tiles
function TopicTileIcon({ id }: { id: string }) {
  switch (id) {
    case "array":
      // < >
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="8 7 3 12 8 17" />
          <polyline points="16 7 21 12 16 17" />
        </svg>
      );
    case "string":
      // " "
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="currentColor">
          <path d="M7 8h2v5H6.5c0 1.5 1 2.5 2.5 2.5v1.5C6.5 17 5 15.5 5 13V8h2zm8 0h2v5h-2.5c0 1.5 1 2.5 2.5 2.5v1.5c-2.5 0-4-1.5-4-4V8h2z" />
        </svg>
      );
    case "hash-table":
      // #
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <line x1="4" y1="9" x2="20" y2="9" />
          <line x1="4" y1="15" x2="20" y2="15" />
          <line x1="10" y1="3" x2="8" y2="21" />
          <line x1="16" y1="3" x2="14" y2="21" />
        </svg>
      );
    case "dp":
      // </>
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="7 8 3 12 7 16" />
          <polyline points="17 8 21 12 17 16" />
          <line x1="14" y1="4" x2="10" y2="20" />
        </svg>
      );
    case "math":
      // Σ
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 4 6 4 13 12 6 20 18 20" />
        </svg>
      );
    case "sorting":
      // ⇅
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 18V6m0 0l-3 3m3-3l3 3" />
          <path d="M16 6v12m0 0l-3-3m3 3l3-3" />
        </svg>
      );
    case "greedy":
      // <>
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 8 5 12 9 16" />
          <polyline points="15 8 19 12 15 16" />
        </svg>
      );
    case "dfs":
      // 🔍 depth
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="6" />
          <line x1="15" y1="15" x2="20" y2="20" />
        </svg>
      );
    case "binary-search":
      // 🔍 binary
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="6" />
          <line x1="15" y1="15" x2="20" y2="20" />
        </svg>
      );
    case "tree":
      // ⑂
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="6" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <circle cx="18" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
          <path d="M12 7.5v4m0 0l-6 4m6-4l6 4" />
        </svg>
      );
    case "bfs":
      // 🔍 bfs
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="10.5" cy="10.5" r="6" />
          <line x1="15" y1="15" x2="20" y2="20" />
        </svg>
      );
    case "two-pointers":
      // ⇄
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 7l4 4-4 4" />
          <path d="M21 11H7" />
          <path d="M7 17l-4-4 4-4" />
          <path d="M3 13h14" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

// -----------------------------------------------------------------------------
// Animated 3D Vector Assets for the 3 Podiums in "Top Covered Topics"
// -----------------------------------------------------------------------------

// 1. Golden Trophy Cup Animation (Rank 1)
function PodiumCupAnimation() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none select-none">
      {/* Golden Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-amber-500/20 blur-md animate-pulse" />

      {/* Floating Trophy Cup */}
      <div className="relative z-10 animate-cup-float filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]">
        <svg viewBox="0 0 48 48" className="w-10 h-10 overflow-visible" fill="none">
          <defs>
            <linearGradient id="cupGoldBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="35%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="cupGoldHandle" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="cupShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.7)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
            <clipPath id="cupClip">
              <path d="M 12 11 C 12 25, 18 29, 24 29 C 30 29, 36 25, 36 11 Z" />
            </clipPath>
          </defs>

          {/* Left Handle */}
          <path
            d="M 13 14 C 6 14, 6 24, 15 24"
            stroke="url(#cupGoldHandle)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Handle */}
          <path
            d="M 35 14 C 42 14, 42 24, 33 24"
            stroke="url(#cupGoldHandle)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cup Bowl */}
          <path d="M 12 11 C 12 25, 18 29, 24 29 C 30 29, 36 25, 36 11 Z" fill="url(#cupGoldBody)" />

          {/* Top Rim */}
          <ellipse cx="24" cy="11" rx="12" ry="2.8" fill="#fde047" stroke="#b45309" strokeWidth="0.8" />
          <ellipse cx="24" cy="11" rx="10" ry="1.8" fill="#ca8a04" />

          {/* Shimmer Light Sweep across Bowl */}
          <g clipPath="url(#cupClip)">
            <rect x="0" y="8" width="16" height="24" fill="url(#cupShimmer)" className="animate-cup-shimmer" />
          </g>

          {/* Center Star Emblem on Cup */}
          <path
            d="M 24 16 L 25.2 19 L 28.5 19.3 L 26 21.4 L 26.8 24.5 L 24 22.8 L 21.2 24.5 L 22 21.4 L 19.5 19.3 L 22.8 19 Z"
            fill="#fef9c3"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
          />

          {/* Cup Stem */}
          <path d="M 22 29 L 22 34 L 26 34 L 26 29 Z" fill="url(#cupGoldHandle)" />

          {/* Stepped Pedestal Base */}
          <ellipse cx="24" cy="35" rx="8" ry="2" fill="#ca8a04" />
          <path d="M 16 35 L 14 38 L 34 38 L 32 35 Z" fill="url(#cupGoldBody)" />
          <ellipse cx="24" cy="38" rx="10" ry="2.5" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />

          {/* Twinkling Star Glints */}
          <g className="animate-glint-1">
            <polygon points="12,11 13.5,8 15,11 13.5,14" fill="#ffffff" />
            <polygon points="10.5,11 13.5,9.5 16.5,11 13.5,12.5" fill="#ffffff" />
          </g>
          <g className="animate-glint-2">
            <polygon points="36,12 37.5,9 39,12 37.5,15" fill="#ffffff" />
            <polygon points="34.5,12 37.5,10.5 40.5,12 37.5,13.5" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// 2. Glowing 3D Star Animation (Rank 2)
function PodiumStarAnimation() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none select-none">
      {/* Cyan/Blue Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-md animate-pulse" />

      {/* Rotating Sparkle Rays behind Star */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow opacity-60">
        <div className="w-10 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="w-0.5 h-10 bg-gradient-to-b from-transparent via-cyan-300 to-transparent absolute" />
      </div>

      {/* Floating 3D Beveled Star */}
      <div className="relative z-10 animate-star-float filter drop-shadow-[0_0_10px_rgba(56,189,248,0.7)]">
        <svg viewBox="0 0 48 48" className="w-10 h-10 overflow-visible" fill="none">
          <defs>
            <linearGradient id="starHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#cffafe" />
              <stop offset="100%" stopColor="#7dd3fc" />
            </linearGradient>
            <linearGradient id="starMid" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5f3fc" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
            <linearGradient id="starShadow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
          </defs>

          {/* 3D Beveled 5-point Star Facets with Center Vertex (24, 24) */}
          {/* Top Tip */}
          <polygon points="24,9 24,24 20.5,19" fill="url(#starHighlight)" />
          <polygon points="24,9 24,24 27.5,19" fill="url(#starShadow)" />

          {/* Top Right Tip */}
          <polygon points="38,19 24,24 27.5,19" fill="url(#starHighlight)" />
          <polygon points="38,19 24,24 30.5,26.5" fill="url(#starShadow)" />

          {/* Bottom Right Tip */}
          <polygon points="33,36 24,24 30.5,26.5" fill="url(#starMid)" />
          <polygon points="33,36 24,24 24,31" fill="url(#starShadow)" />

          {/* Bottom Left Tip */}
          <polygon points="15,36 24,24 24,31" fill="url(#starHighlight)" />
          <polygon points="15,36 24,24 17.5,26.5" fill="url(#starShadow)" />

          {/* Top Left Tip */}
          <polygon points="10,19 24,24 17.5,26.5" fill="url(#starMid)" />
          <polygon points="10,19 24,24 20.5,19" fill="url(#starShadow)" />

          {/* Center Jewel Glint */}
          <circle cx="24" cy="24" r="2.2" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)" />

          {/* Twinkle Glint on Top Tip */}
          <g className="animate-glint-1">
            <polygon points="24,9 25,6 26,9 25,12" fill="#ffffff" />
            <polygon points="22,9 25,7.5 28,9 25,10.5" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// 3. Glowing Award Medal Animation (Rank 3)
function PodiumMedalAnimation() {
  return (
    <div className="relative w-12 h-12 flex items-center justify-center pointer-events-none select-none">
      {/* Magenta/Purple Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-md animate-pulse" />

      {/* Floating & Swaying Medal */}
      <div className="relative z-10 animate-medal-sway origin-top filter drop-shadow-[0_0_8px_rgba(192,132,252,0.65)]">
        <svg viewBox="0 0 48 48" className="w-10 h-10 overflow-visible" fill="none">
          <defs>
            <linearGradient id="medalRibbonLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#86198f" />
            </linearGradient>
            <linearGradient id="medalRibbonRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f472b6" />
              <stop offset="100%" stopColor="#9d174d" />
            </linearGradient>
            <linearGradient id="medalCoin" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f5d0fe" />
              <stop offset="40%" stopColor="#c084fc" />
              <stop offset="80%" stopColor="#7e22ce" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>
            <linearGradient id="medalRim" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e879f9" />
              <stop offset="100%" stopColor="#701a75" />
            </linearGradient>
          </defs>

          {/* Draped Satin Ribbon on Top */}
          {/* Left Ribbon */}
          <polygon points="16,8 24,21 21,21 13,8" fill="url(#medalRibbonLeft)" />
          {/* Right Ribbon */}
          <polygon points="32,8 24,21 27,21 35,8" fill="url(#medalRibbonRight)" />

          {/* Gold Connector Ring */}
          <circle cx="24" cy="21" r="3.2" stroke="#fde047" strokeWidth="1.5" fill="none" />

          {/* Round Medal Coin */}
          <circle cx="24" cy="31" r="10.5" fill="url(#medalCoin)" />
          <circle cx="24" cy="31" r="10.5" stroke="url(#medalRim)" strokeWidth="1.2" fill="none" />
          <circle cx="24" cy="31" r="8.5" stroke="#fbcfe8" strokeWidth="0.8" strokeDasharray="1.5 1.5" fill="none" />

          {/* Embossed Star inside Medal */}
          <path
            d="M 24 25.5 L 25.4 28.8 L 29 29.2 L 26.3 31.6 L 27.1 35 L 24 33.2 L 20.9 35 L 21.7 31.6 L 19 29.2 L 22.6 28.8 Z"
            fill="#fdf4ff"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))"
          />

          {/* Specular Glint */}
          <g className="animate-glint-1">
            <polygon points="31,25 32,23 33,25 32,27" fill="#ffffff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main TopicBreakdown Component
// -----------------------------------------------------------------------------
export function TopicBreakdown({ topics = [] }: TopicBreakdownProps) {
  // Active category filter state ('all' or 'fundamental' | 'intermediate' | 'advanced')
  const [activeFilter, setActiveFilter] = useState<"all" | "fundamental" | "intermediate" | "advanced">("all");

  // Clean, real-time user LeetCode statistics calculation
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
        // Fallback classification based on standard LeetCode tags
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

    // Sort user's solved topics descending to pick Top 3 Covered Topics
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

  // Map user data to the canonical 12 columns
  const chartColumns = useMemo(() => {
    return CANONICAL_TOPICS.map((canonical) => {
      // Find matching topic in user's real LeetCode list
      const matched = topics.find((t) => {
        const norm = t.tag.toLowerCase().trim();
        return (
          norm === canonical.name.toLowerCase() ||
          canonical.aliases.some((alias) => norm === alias || norm.includes(alias))
        );
      });
      const solved = matched ? Number(matched.solved) || 0 : 0;
      return {
        ...canonical,
        solved,
      };
    });
  }, [topics]);

  // Compute maximum solved value for dynamic Y-axis scaling
  const maxSolved = useMemo(() => {
    const rawMax = Math.max(0, ...chartColumns.map((c) => c.solved));
    if (rawMax <= 10) return 10;
    // Round up to a pleasant multiple of 10
    return Math.ceil(rawMax / 10) * 10;
  }, [chartColumns]);

  // Y-axis 6 gridline ticks (10, 8, 6, 4, 2, 0 when max=10)
  const yTicks = useMemo(() => {
    const step = maxSolved / 5;
    return [
      maxSolved,
      Math.round(step * 4),
      Math.round(step * 3),
      Math.round(step * 2),
      Math.round(step * 1),
      0,
    ];
  }, [maxSolved]);

  // Filter handler
  const handlePillClick = (filter: "fundamental" | "intermediate" | "advanced") => {
    setActiveFilter((prev) => (prev === filter ? "all" : filter));
  };

  return (
    <div className="relative w-full max-w-[1024px] mx-auto text-white select-none">
      {/* Component-level scoped keyframe animations */}
      <style jsx global>{`
        @keyframes cupFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-4px) rotate(1.2deg); }
        }
        @keyframes starFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-4px) rotate(-3deg) scale(1.05); }
        }
        @keyframes medalSway {
          0%, 100% { transform: rotate(-3deg) translateY(0px); }
          50% { transform: rotate(3deg) translateY(-2.5px); }
        }
        @keyframes cupShimmer {
          0% { transform: translateX(-150%) skewX(-20deg); opacity: 0; }
          40% { opacity: 0.9; }
          100% { transform: translateX(180%) skewX(-20deg); opacity: 0; }
        }
        @keyframes glintTwinkle {
          0%, 100% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1) rotate(90deg); opacity: 1; }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes dartFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        .animate-cup-float { animation: cupFloat 3.2s ease-in-out infinite; }
        .animate-star-float { animation: starFloat 2.8s ease-in-out infinite; }
        .animate-medal-sway { animation: medalSway 3.4s ease-in-out infinite; }
        .animate-cup-shimmer { animation: cupShimmer 2.6s ease-in-out infinite; }
        .animate-glint-1 { animation: glintTwinkle 2.4s ease-in-out infinite 0.2s; }
        .animate-glint-2 { animation: glintTwinkle 2.4s ease-in-out infinite 1.4s; }
        .animate-spin-slow { animation: spinSlow 8s linear infinite; }
        .animate-dart-float { animation: dartFloat 3.6s ease-in-out infinite; }
      `}</style>

      {/* Top Filter Pills Row (Aligned Right, matching image) */}
      <div className="flex items-center justify-end gap-3 mb-3 px-1">
        {/* Fundamental Pill */}
        <button
          onClick={() => handlePillClick("fundamental")}
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
            activeFilter === "fundamental"
              ? "bg-[#0b1d30] border-cyan-400 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.45)] ring-1 ring-cyan-400"
              : "bg-[#0c1424]/90 border-cyan-500/30 text-cyan-200/90 hover:border-cyan-400/60 hover:shadow-[0_0_12px_rgba(6,182,212,0.25)]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse" />
          <span>Fundamental</span>
        </button>

        {/* Intermediate Pill */}
        <button
          onClick={() => handlePillClick("intermediate")}
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
            activeFilter === "intermediate"
              ? "bg-[#201035] border-purple-400 text-purple-200 shadow-[0_0_16px_rgba(192,132,252,0.45)] ring-1 ring-purple-400"
              : "bg-[#180e29]/90 border-purple-500/30 text-purple-200/90 hover:border-purple-400/60 hover:shadow-[0_0_12px_rgba(168,85,247,0.25)]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse" />
          <span>Intermediate</span>
        </button>

        {/* Advanced Pill */}
        <button
          onClick={() => handlePillClick("advanced")}
          className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 border ${
            activeFilter === "advanced"
              ? "bg-[#2c1908] border-amber-400 text-amber-200 shadow-[0_0_16px_rgba(251,191,36,0.45)] ring-1 ring-amber-400"
              : "bg-[#211208]/90 border-amber-500/30 text-amber-200/90 hover:border-amber-400/60 hover:shadow-[0_0_12px_rgba(245,158,11,0.25)]"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24] animate-pulse" />
          <span>Advanced</span>
        </button>
      </div>

      {/* Main Grid Container (No artificial outer background, pure glassmorphic floating cards) */}
      <div className="grid grid-cols-1 lg:grid-cols-[265px_1fr] gap-4 items-stretch">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: 3D Desk Scene on top + Summary Card underneath               */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-center h-full">
          {/* 3D Desk Scene Illustration (Floating naturally above card) */}
          <div className="relative w-[265px] h-[200px] -mb-4 z-10 flex-shrink-0 pointer-events-none select-none">
            <Image
              src="/dsa-desk-scene.webp"
              alt="DSA Desk Scene"
              fill
              priority
              className="object-contain filter drop-shadow-[0_10px_20px_rgba(168,85,247,0.3)]"
            />
            {/* Ambient lamp glow reflection on desk */}
            <div className="absolute top-10 left-6 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />
            {/* Glowing </> Code bracket pulse on laptop screen */}
            <div className="absolute top-[84px] left-[138px] w-8 h-8 rounded-full bg-cyan-400/25 blur-md animate-pulse pointer-events-none" />
          </div>

          {/* Left Glassmorphism Summary Card (flex-1 to match right column height perfectly) */}
          <div className="relative w-full flex-1 flex flex-col justify-between rounded-2xl p-4 pt-6 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent">
            {/* Top Section: 3 Levels */}
            <div className="space-y-1">
              {/* Row 1: Fundamental */}
              <div className="flex items-center justify-between py-2 border-b border-purple-500/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 shadow-[0_0_10px_rgba(34,211,238,0.6)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-white/90" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Fundamental</span>
                </div>
                <span className="text-sm font-bold text-white tracking-wide">
                  {stats.fundamentalCount}{" "}
                  <span className="text-xs font-normal text-slate-400">({stats.fundamentalPct}%)</span>
                </span>
              </div>

              {/* Row 2: Intermediate */}
              <div className="flex items-center justify-between py-2 border-b border-purple-500/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-purple-400 to-indigo-600 shadow-[0_0_10px_rgba(192,132,252,0.6)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-white/90" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Intermediate</span>
                </div>
                <span className="text-sm font-bold text-white tracking-wide">
                  {stats.intermediateCount}{" "}
                  <span className="text-xs font-normal text-slate-400">({stats.intermediatePct}%)</span>
                </span>
              </div>

              {/* Row 3: Advanced */}
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-amber-400 to-orange-600 shadow-[0_0_10px_rgba(251,191,36,0.6)] flex items-center justify-center">
                    <div className="w-2 h-2 rounded-sm bg-white/90" />
                  </div>
                  <span className="text-sm font-semibold text-slate-200">Advanced</span>
                </div>
                <span className="text-sm font-bold text-white tracking-wide">
                  {stats.advancedCount}{" "}
                  <span className="text-xs font-normal text-slate-400">({stats.advancedPct}%)</span>
                </span>
              </div>
            </div>

            {/* Bottom Section: Divider + 3 Stats */}
            <div>
              {/* Horizontal Divider Line */}
              <div className="h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent my-3.5" />

              {/* 3-Column Stats at Bottom */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {stats.totalTopicsCount}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">Topics</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {stats.totalProblems}
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">Problems</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-white font-mono">
                    {stats.fundamentalPct}%
                  </div>
                  <div className="text-[11px] font-medium text-slate-400">Fundamental</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Distribution Chart (Top) + Bottom 2 Cards                  */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-4 justify-between h-full">
          {/* Card 2: Topic-wise Problem Distribution */}
          <div className="relative rounded-2xl p-4 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent">
            {/* Header: Trending Graph Icon + Title */}
            <div className="flex items-center gap-2 mb-3">
              <div className="relative flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.85)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                  <polyline points="16 7 22 7 22 13" />
                </svg>
              </div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Topic-wise Problem Distribution
              </h3>
            </div>

            {/* Chart Area with Horizontal Dashed Gridlines & 12 Topic Columns */}
            <div className="relative w-full overflow-x-auto pb-1">
              <div className="min-w-[620px] relative">
                {/* Upper Chart Plot Area: Gridlines + Rising Bars + Numbers + Discs */}
                <div className="relative h-[105px] w-full pl-6 pr-2">
                  {/* 6 Horizontal Dashed Gridlines (10, 8, 6, 4, 2, 0) */}
                  <div className="absolute inset-0 pl-6 pr-2 flex flex-col justify-between pointer-events-none pb-1.5">
                    {yTicks.map((val, idx) => (
                      <div key={idx} className="relative w-full flex items-center">
                        <span className="absolute -left-6 text-[10px] font-mono text-slate-400 w-4 text-right">
                          {val}
                        </span>
                        <div className="w-full border-b border-dashed border-purple-500/20" />
                      </div>
                    ))}
                  </div>

                  {/* 12 Columns: Rising Neon Bars, Numbers on Top, and 3D Pedestals on Baseline */}
                  <div className="relative h-full grid grid-cols-12 gap-1 z-10 pb-1.5">
                    {chartColumns.map((col) => {
                      const isDimmed = activeFilter !== "all" && col.level !== activeFilter;
                      // Maximum pixel height from baseline to top grid line
                      const maxPlotHeight = 80;
                      const barHeight = col.solved > 0 ? Math.max(8, Math.min(maxPlotHeight, (col.solved / maxSolved) * maxPlotHeight)) : 0;
                      // Number is ALWAYS positioned directly above the summit of the bar (or above disc if 0)
                      const numberBottom = col.solved > 0 ? barHeight + 8 : 10;

                      return (
                        <div
                          key={col.id}
                          className={`relative h-full flex flex-col items-center justify-end transition-opacity duration-300 ${
                            isDimmed ? "opacity-30" : "opacity-100"
                          }`}
                        >
                          {/* Solved Count Hover/Display: ALWAYS sits on top of bar with neon white shine */}
                          <div
                            style={{ bottom: `${numberBottom}px` }}
                            className="absolute text-[11px] font-bold font-mono text-white text-center transition-all duration-500 ease-out z-20 pointer-events-none select-none drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]"
                          >
                            {col.solved}
                          </div>

                          {/* Animated Rising Neon Bar (when solved > 0) */}
                          {barHeight > 0 && (
                            <div
                              style={{ height: `${barHeight}px` }}
                              className="absolute bottom-1 w-3 rounded-t-md bg-gradient-to-t from-purple-600 via-cyan-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.85)] transition-all duration-700 ease-out z-10"
                            />
                          )}

                          {/* 3D Oval Glowing Disc / Pedestal at Baseline (Fixed on 0 gridline) */}
                          <div className="absolute bottom-0 w-9 h-3 flex items-center justify-center z-10">
                            <div className="w-8 h-2.5 rounded-[50%] bg-[#1a1238] border border-purple-400/60 shadow-[0_0_10px_rgba(168,85,247,0.5),inset_0_0_4px_rgba(192,132,252,0.3)]" />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lower Area: Floating Neon Icon Tiles & Full Topic Labels */}
                <div className="grid grid-cols-12 gap-1 pl-6 pr-2 pt-1">
                  {chartColumns.map((col) => {
                    const isDimmed = activeFilter !== "all" && col.level !== activeFilter;

                    return (
                      <div
                        key={col.id}
                        className={`flex flex-col items-center transition-opacity duration-300 ${
                          isDimmed ? "opacity-30" : "opacity-100"
                        }`}
                      >
                        {/* Floating Neon Icon Tile */}
                        <div className="w-8 h-8 rounded-lg bg-[#140e2b]/90 border border-purple-400/40 shadow-[0_0_8px_rgba(168,85,247,0.3)] flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:border-purple-300 my-0.5">
                          <TopicTileIcon id={col.id} />
                        </div>

                        {/* Full Topic Label (Neatly wrapped into 2 lines where needed, no truncation) */}
                        <div
                          title={col.name}
                          className="h-[26px] w-full flex items-center justify-center text-[9px] font-medium text-slate-300 text-center leading-[12px] px-0.5"
                        >
                          <span>
                            {col.name === "Dynamic Programming" ? (
                              <>
                                Dynamic<br />Programming
                              </>
                            ) : col.name === "Depth-First Search" ? (
                              <>
                                Depth-First<br />Search
                              </>
                            ) : col.name === "Breadth-First Search" ? (
                              <>
                                Breadth-First<br />Search
                              </>
                            ) : col.name === "Hash Table" ? (
                              <>
                                Hash<br />Table
                              </>
                            ) : col.name === "Binary Search" ? (
                              <>
                                Binary<br />Search
                              </>
                            ) : col.name === "Two Pointers" ? (
                              <>
                                Two<br />Pointers
                              </>
                            ) : (
                              col.name
                            )}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom 2 Cards Grid: EXACT SAME SIZE (50% / 50% grid-cols-2, equal height h-full) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch flex-1">
            {/* ========================================================================= */}
            {/* Card 3: Top Covered Topics (with Animated Cup, Star, Medal Podiums)       */}
            {/* ========================================================================= */}
            <div className="relative w-full h-full rounded-2xl p-4 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent flex flex-col justify-between">
              {/* Header: Trophy Icon + Title + Circular Chevron Button */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.85)]"
                    fill="currentColor"
                  >
                    <path d="M19 4h-3V3a1 1 0 00-1-1H9a1 1 0 00-1 1v1H5a1 1 0 00-1 1v4c0 3.3 2.7 6 6 6h.2c.6 1.4 1.8 2.5 3.3 2.9V20H11a1 1 0 000 2h2a1 1 0 000-2h-2.5v-2.1c1.5-.4 2.7-1.5 3.3-2.9H14c3.3 0 6-2.7 6-6V5a1 1 0 00-1-1zM6 9V6h2v3c0 2.2-1.8 4-4 4s2-1.8 2-4zm12 0c0 2.2.2 4-2 4s-4-1.8-4-4V6h2v3c0 2.2 1.8 4 4 4z" />
                  </svg>
                  <h4 className="text-sm font-bold text-white tracking-wide">Top Covered Topics</h4>
                </div>
                <div className="w-5 h-5 rounded-full bg-purple-900/40 border border-purple-500/30 flex items-center justify-center text-purple-300 text-xs">
                  &gt;
                </div>
              </div>

              {/* 3 Stepped Glowing Podiums (Equal width, equal height) */}
              <div className="grid grid-cols-3 gap-2 flex-1 items-stretch pt-1">
                {/* Podium 1 (Rank 1): Golden Trophy Cup */}
                <div className="relative flex flex-col items-center justify-between p-2 rounded-xl bg-gradient-to-b from-[#2a1a0f]/40 to-[#181126]/60 border border-amber-500/20 h-full">
                  {/* Animated Golden Trophy Cup */}
                  <PodiumCupAnimation />

                  {/* Topic Name & Count (No truncation, cleanly wrapped) */}
                  <div className="text-center my-0.5 min-h-[32px] flex flex-col justify-center">
                    <div
                      title={stats.top1?.tag ?? "—"}
                      className="text-[11px] font-bold text-white leading-tight"
                    >
                      {stats.top1 ? stats.top1.tag : "—"}
                    </div>
                    <div className="text-[10px] text-amber-300/90 font-mono mt-0.5">
                      ({stats.top1 ? stats.top1.solved : 0})
                    </div>
                  </div>

                  {/* Tiered Glowing Amber/Gold 3D Pedestal Base */}
                  <div className="relative w-full flex flex-col items-center mt-0.5">
                    <div className="w-14 h-2 rounded-[50%] bg-[#ca8a04] border border-amber-300/60 shadow-[0_0_10px_rgba(251,191,36,0.6)]" />
                    <div className="w-16 h-2 rounded-[50%] bg-[#b45309] -mt-1 shadow-[0_4px_14px_rgba(245,158,11,0.6)]" />
                  </div>
                </div>

                {/* Podium 2 (Rank 2): Glowing 3D Star */}
                <div className="relative flex flex-col items-center justify-between p-2 rounded-xl bg-gradient-to-b from-[#0f1f3a]/40 to-[#181126]/60 border border-cyan-500/20 h-full">
                  {/* Animated Glowing 3D Star */}
                  <PodiumStarAnimation />

                  {/* Topic Name & Count (No truncation, cleanly wrapped) */}
                  <div className="text-center my-0.5 min-h-[32px] flex flex-col justify-center">
                    <div
                      title={stats.top2?.tag ?? "—"}
                      className="text-[11px] font-bold text-white leading-tight"
                    >
                      {stats.top2 ? (
                        stats.top2.tag.includes(" ") ? (
                          stats.top2.tag.split(" ").map((w, idx) => (
                            <span key={idx} className="block">{w}</span>
                          ))
                        ) : (
                          stats.top2.tag
                        )
                      ) : (
                        "—"
                      )}
                    </div>
                    <div className="text-[10px] text-cyan-300/90 font-mono mt-0.5">
                      ({stats.top2 ? stats.top2.solved : 0})
                    </div>
                  </div>

                  {/* Tiered Glowing Cyan/Blue 3D Pedestal Base */}
                  <div className="relative w-full flex flex-col items-center mt-0.5">
                    <div className="w-14 h-2 rounded-[50%] bg-[#6366f1] border border-cyan-300/60 shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
                    <div className="w-16 h-2 rounded-[50%] bg-[#4338ca] -mt-1 shadow-[0_4px_14px_rgba(99,102,241,0.6)]" />
                  </div>
                </div>

                {/* Podium 3 (Rank 3): Glowing Award Medal */}
                <div className="relative flex flex-col items-center justify-between p-2 rounded-xl bg-gradient-to-b from-[#25103a]/40 to-[#181126]/60 border border-purple-500/20 h-full">
                  {/* Animated Award Medal */}
                  <PodiumMedalAnimation />

                  {/* Topic Name & Count (No truncation, cleanly wrapped) */}
                  <div className="text-center my-0.5 min-h-[32px] flex flex-col justify-center">
                    <div
                      title={stats.top3?.tag ?? "—"}
                      className="text-[11px] font-bold text-white leading-tight"
                    >
                      {stats.top3 ? (
                        stats.top3.tag.includes(" ") ? (
                          stats.top3.tag.split(" ").map((w, idx) => (
                            <span key={idx} className="block">{w}</span>
                          ))
                        ) : (
                          stats.top3.tag
                        )
                      ) : (
                        "—"
                      )}
                    </div>
                    <div className="text-[10px] text-purple-300/90 font-mono mt-0.5">
                      ({stats.top3 ? stats.top3.solved : 0})
                    </div>
                  </div>

                  {/* Tiered Glowing Magenta/Purple 3D Pedestal Base */}
                  <div className="relative w-full flex flex-col items-center mt-0.5">
                    <div className="w-14 h-2 rounded-[50%] bg-[#a855f7] border border-purple-300/60 shadow-[0_0_10px_rgba(192,132,252,0.6)]" />
                    <div className="w-16 h-2 rounded-[50%] bg-[#7e22ce] -mt-1 shadow-[0_4px_14px_rgba(168,85,247,0.6)]" />
                  </div>
                </div>
              </div>
            </div>

            {/* ========================================================================= */}
            {/* Card 4: Coverage Insight (EXACT SAME SIZE as Card 3)                       */}
            {/* ========================================================================= */}
            <div className="relative w-full h-full rounded-2xl p-4 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent flex items-center justify-between">
              {/* Left Content */}
              <div className="flex-1 pr-2 flex flex-col justify-center">
                {/* Header: Target Bullseye Icon + Title */}
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.85)]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <circle cx="12" cy="12" r="5" />
                    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                  </svg>
                  <h4 className="text-sm font-bold text-white tracking-wide">Coverage Insight</h4>
                </div>

                {/* Milestone Heading */}
                <div className="text-sm font-extrabold text-amber-400 leading-snug drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]">
                  {stats.totalProblems === 0
                    ? "No DSA problems solved yet."
                    : `Solved ${stats.totalProblems} problems across ${stats.totalTopicsCount} topics!`}
                </div>

                {/* Subtitle / Tip */}
                <p className="text-xs text-slate-300/90 leading-relaxed mt-1.5 max-w-[200px]">
                  {stats.totalProblems === 0
                    ? "Connect your LeetCode account in Settings to track your real-time topic progress."
                    : stats.top1
                    ? `Top focus in ${stats.top1.tag} (${stats.top1.solved} solved). Expand coverage into other fundamental and intermediate patterns!`
                    : "Solve more problems to see personalized coverage insights."}
                </p>
              </div>

              {/* Right Side: Clean 3D Cutout Target Dart Illustration */}
              <div className="relative w-[120px] h-[105px] flex-shrink-0 animate-dart-float filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] pointer-events-none select-none">
                <Image
                  src="/dsa-target-dart.webp"
                  alt="DSA Target Dart"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
