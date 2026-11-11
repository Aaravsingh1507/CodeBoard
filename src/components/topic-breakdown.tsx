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

// High-fidelity vector icons dynamically mapped for any real-time DSA topic
function TopicTileIcon({ tag, level }: { tag: string; level?: string }) {
  const norm = tag.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  
  // Theme color dynamically based on level
  const colorClass =
    level === "fundamental"
      ? "text-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]"
      : level === "advanced"
      ? "text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]"
      : "text-purple-400 drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]";

  if (norm.includes("array")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 7 3 12 8 17" />
        <polyline points="16 7 21 12 16 17" />
      </svg>
    );
  }
  if (norm.includes("string")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="currentColor">
        <path d="M7 8h2v5H6.5c0 1.5 1 2.5 2.5 2.5v1.5C6.5 17 5 15.5 5 13V8h2zm8 0h2v5h-2.5c0 1.5 1 2.5 2.5 2.5v1.5c-2.5 0-4-1.5-4-4V8h2z" />
      </svg>
    );
  }
  if (norm.includes("hash")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    );
  }
  if (norm.includes("dynamic") || norm === "dp") {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="7 8 3 12 7 16" />
        <polyline points="17 8 21 12 17 16" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    );
  }
  if (norm.includes("math")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 4 6 4 13 12 6 20 18 20" />
      </svg>
    );
  }
  if (norm.includes("sort")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 18V6m0 0l-3 3m3-3l3 3" />
        <path d="M16 6v12m0 0l-3-3m3 3l3-3" />
      </svg>
    );
  }
  if (norm.includes("greedy")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 8 5 12 9 16" />
        <polyline points="15 8 19 12 15 16" />
      </svg>
    );
  }
  if (norm.includes("dfs") || norm.includes("depth-first")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6" />
        <line x1="15" y1="15" x2="20" y2="20" />
      </svg>
    );
  }
  if (norm.includes("binary-search")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6" />
        <line x1="15" y1="15" x2="20" y2="20" />
      </svg>
    );
  }
  if (norm.includes("tree")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2.5" fill="currentColor" fillOpacity="0.4" />
        <circle cx="6" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
        <circle cx="18" cy="18" r="2.5" fill="currentColor" fillOpacity="0.4" />
        <path d="M12 7.5v4m0 0l-6 4m6-4l6 4" />
      </svg>
    );
  }
  if (norm.includes("bfs") || norm.includes("breadth-first")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10.5" cy="10.5" r="6" />
        <line x1="15" y1="15" x2="20" y2="20" />
      </svg>
    );
  }
  if (norm.includes("two-pointer")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 7l4 4-4 4" />
        <path d="M21 11H7" />
        <path d="M7 17l-4-4 4-4" />
        <path d="M3 13h14" />
      </svg>
    );
  }
  if (norm.includes("matrix")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="9" y1="3" x2="9" y2="21" />
        <line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    );
  }
  if (norm.includes("stack")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 10c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        <path d="M4 14c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        <path d="M4 18c0 1.66 3.58 3 8 3s8-1.34 8-3" />
      </svg>
    );
  }
  if (norm.includes("queue")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 8 10 8 10 16 4 16" />
        <polyline points="14 8 20 8 20 16 14 16" />
        <line x1="10" y1="12" x2="14" y2="12" />
      </svg>
    );
  }
  if (norm.includes("heap") || norm.includes("priority")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 3 2 21 22 21" />
        <line x1="8" y1="13" x2="16" y2="13" />
      </svg>
    );
  }
  if (norm.includes("graph")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="18" r="3" />
        <line x1="9" y1="6" x2="15" y2="6" />
        <line x1="18" y1="9" x2="18" y2="15" />
        <line x1="15" y1="18" x2="9" y2="18" />
        <line x1="6" y1="15" x2="6" y2="9" />
        <line x1="8" y1="8" x2="16" y2="16" />
      </svg>
    );
  }
  if (norm.includes("linked-list") || norm.includes("list")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="6" height="8" rx="1" />
        <rect x="15" y="8" width="6" height="8" rx="1" />
        <line x1="9" y1="12" x2="15" y2="12" />
        <polyline points="13 10 15 12 13 14" />
      </svg>
    );
  }
  if (norm.includes("backtracking")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 14 4 9 9 4" />
        <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
      </svg>
    );
  }
  if (norm.includes("bit")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="7" cy="12" r="4" />
        <line x1="17" y1="8" x2="17" y2="16" />
      </svg>
    );
  }
  if (norm.includes("trie")) {
    return (
      <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="12" cy="4" r="2" />
        <circle cx="7" cy="12" r="2" />
        <circle cx="17" cy="12" r="2" />
        <circle cx="4" cy="20" r="2" />
        <circle cx="10" cy="20" r="2" />
        <line x1="12" y1="6" x2="7" y2="10" />
        <line x1="12" y1="6" x2="17" y2="10" />
        <line x1="7" y1="14" x2="4" y2="18" />
        <line x1="7" y1="14" x2="10" y2="18" />
      </svg>
    );
  }
  // Universal DSA fallback code icon
  return (
    <svg viewBox="0 0 24 24" className={`w-4 h-4 ${colorClass}`} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Animated 3D Vector Assets for the 3 Podiums in "Top Covered Topics"
// -----------------------------------------------------------------------------

// 1. Golden Trophy Cup Animation (Rank 1)
function PodiumCupAnimation() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center pointer-events-none select-none">
      {/* Golden Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-md animate-pulse" />

      {/* Floating Trophy Cup */}
      <div className="relative z-10 animate-cup-float filter drop-shadow-[0_0_10px_rgba(245,158,11,0.7)]">
        <svg viewBox="0 0 48 48" className="w-12 h-12 overflow-visible" fill="none">
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
              <stop offset="50%" stopColor="rgba(255,255,255,0.75)" />
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
            strokeWidth="2.6"
            strokeLinecap="round"
            fill="none"
          />

          {/* Right Handle */}
          <path
            d="M 35 14 C 42 14, 42 24, 33 24"
            stroke="url(#cupGoldHandle)"
            strokeWidth="2.6"
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
            <rect x="0" y="8" width="18" height="24" fill="url(#cupShimmer)" className="animate-cup-shimmer" />
          </g>

          {/* Center Star Emblem on Cup */}
          <path
            d="M 24 16 L 25.2 19 L 28.5 19.3 L 26 21.4 L 26.8 24.5 L 24 22.8 L 21.2 24.5 L 22 21.4 L 19.5 19.3 L 22.8 19 Z"
            fill="#fef9c3"
            filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
          />

          {/* Cup Stem */}
          <path d="M 22 29 L 22 34 L 26 34 L 26 29 Z" fill="url(#cupGoldHandle)" />

          {/* Stepped Base Foot */}
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
    <div className="relative w-14 h-14 flex items-center justify-center pointer-events-none select-none">
      {/* Cyan/Blue Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/25 blur-md animate-pulse" />

      {/* Rotating Sparkle Rays behind Star */}
      <div className="absolute inset-0 flex items-center justify-center animate-spin-slow opacity-60">
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
        <div className="w-0.5 h-12 bg-gradient-to-b from-transparent via-cyan-300 to-transparent absolute" />
      </div>

      {/* Floating 3D Beveled Star */}
      <div className="relative z-10 animate-star-float filter drop-shadow-[0_0_12px_rgba(56,189,248,0.75)]">
        <svg viewBox="0 0 48 48" className="w-12 h-12 overflow-visible" fill="none">
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
          <polygon points="24,9 24,24 20.5,19" fill="url(#starHighlight)" />
          <polygon points="24,9 24,24 27.5,19" fill="url(#starShadow)" />
          <polygon points="38,19 24,24 27.5,19" fill="url(#starHighlight)" />
          <polygon points="38,19 24,24 30.5,26.5" fill="url(#starShadow)" />
          <polygon points="33,36 24,24 30.5,26.5" fill="url(#starMid)" />
          <polygon points="33,36 24,24 24,31" fill="url(#starShadow)" />
          <polygon points="15,36 24,24 24,31" fill="url(#starHighlight)" />
          <polygon points="15,36 24,24 17.5,26.5" fill="url(#starShadow)" />
          <polygon points="10,19 24,24 17.5,26.5" fill="url(#starMid)" />
          <polygon points="10,19 24,24 20.5,19" fill="url(#starShadow)" />

          {/* Center Jewel Glint */}
          <circle cx="24" cy="24" r="2.4" fill="#ffffff" filter="drop-shadow(0 0 3px #ffffff)" />

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
    <div className="relative w-14 h-14 flex items-center justify-center pointer-events-none select-none">
      {/* Magenta/Purple Aura Glow */}
      <div className="absolute inset-0 rounded-full bg-purple-500/25 blur-md animate-pulse" />

      {/* Floating & Swaying Medal */}
      <div className="relative z-10 animate-medal-sway origin-top filter drop-shadow-[0_0_10px_rgba(192,132,252,0.7)]">
        <svg viewBox="0 0 48 48" className="w-12 h-12 overflow-visible" fill="none">
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
          <polygon points="16,8 24,21 21,21 13,8" fill="url(#medalRibbonLeft)" />
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
// 3D Cylindrical Stage Pedestal Component (Exact match to target design)
// -----------------------------------------------------------------------------
function PodiumPedestal({ variant }: { variant: "amber" | "cyan" | "purple" }) {
  if (variant === "amber") {
    return (
      <div className="relative w-full h-[26px] flex items-center justify-center pointer-events-none select-none">
        <svg viewBox="0 0 80 26" className="w-[82px] h-[26px] overflow-visible" fill="none">
          <defs>
            <radialGradient id="amberGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#b45309" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="amberCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#92400e" />
              <stop offset="25%" stopColor="#fbbf24" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="amberTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          <ellipse cx="40" cy="18" rx="36" ry="6" fill="url(#amberGlow)" filter="drop-shadow(0 0 8px rgba(245,158,11,0.6))" />
          <path d="M 8 10 A 32 6.5 0 0 0 72 10 L 72 16 A 32 6.5 0 0 1 8 16 Z" fill="url(#amberCylinder)" />
          <path d="M 8 16 A 32 6.5 0 0 0 72 16" stroke="#fbbf24" strokeWidth="1" strokeOpacity="0.9" fill="none" />
          <ellipse cx="40" cy="10" rx="32" ry="6.5" fill="url(#amberTop)" stroke="#fef9c3" strokeWidth="1.2" />
          <ellipse cx="40" cy="9.5" rx="27" ry="5" fill="#ca8a04" fillOpacity="0.4" />
        </svg>
      </div>
    );
  }
  if (variant === "cyan") {
    return (
      <div className="relative w-full h-[26px] flex items-center justify-center pointer-events-none select-none">
        <svg viewBox="0 0 80 26" className="w-[82px] h-[26px] overflow-visible" fill="none">
          <defs>
            <radialGradient id="cyanGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#1e40af" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cyanCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e3a8a" />
              <stop offset="25%" stopColor="#818cf8" />
              <stop offset="70%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#172554" />
            </linearGradient>
            <linearGradient id="cyanTop" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e0e7ff" />
              <stop offset="45%" stopColor="#818cf8" />
              <stop offset="100%" stopColor="#4f46e5" />
            </linearGradient>
          </defs>
          <ellipse cx="40" cy="18" rx="36" ry="6" fill="url(#cyanGlow)" filter="drop-shadow(0 0 8px rgba(99,102,241,0.6))" />
          <path d="M 8 10 A 32 6.5 0 0 0 72 10 L 72 16 A 32 6.5 0 0 1 8 16 Z" fill="url(#cyanCylinder)" />
          <path d="M 8 16 A 32 6.5 0 0 0 72 16" stroke="#818cf8" strokeWidth="1" strokeOpacity="0.9" fill="none" />
          <ellipse cx="40" cy="10" rx="32" ry="6.5" fill="url(#cyanTop)" stroke="#e0e7ff" strokeWidth="1.2" />
          <ellipse cx="40" cy="9.5" rx="27" ry="5" fill="#3730a3" fillOpacity="0.4" />
        </svg>
      </div>
    );
  }
  return (
    <div className="relative w-full h-[26px] flex items-center justify-center pointer-events-none select-none">
      <svg viewBox="0 0 80 26" className="w-[82px] h-[26px] overflow-visible" fill="none">
        <defs>
          <radialGradient id="purpleGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#581c87" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="purpleCylinder" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#581c87" />
            <stop offset="25%" stopColor="#e879f9" />
            <stop offset="70%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b0764" />
          </linearGradient>
          <linearGradient id="purpleTop" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fae8ff" />
            <stop offset="45%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#9333ea" />
          </linearGradient>
        </defs>
        <ellipse cx="40" cy="18" rx="36" ry="6" fill="url(#purpleGlow)" filter="drop-shadow(0 0 8px rgba(192,132,252,0.6))" />
        <path d="M 8 10 A 32 6.5 0 0 0 72 10 L 72 16 A 32 6.5 0 0 1 8 16 Z" fill="url(#purpleCylinder)" />
        <path d="M 8 16 A 32 6.5 0 0 0 72 16" stroke="#e879f9" strokeWidth="1" strokeOpacity="0.9" fill="none" />
        <ellipse cx="40" cy="10" rx="32" ry="6.5" fill="url(#purpleTop)" stroke="#fae8ff" strokeWidth="1.2" />
        <ellipse cx="40" cy="9.5" rx="27" ry="5" fill="#7e22ce" fillOpacity="0.4" />
      </svg>
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

  const handlePillClick = (filter: "fundamental" | "intermediate" | "advanced") => {
    setActiveFilter((prev) => (prev === filter ? "all" : filter));
  };

  return (
    <div className="relative w-full text-white select-none">
      {/* Scoped CSS Keyframe Animations */}
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
        @keyframes lampCorePulse {
          0%, 100% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(1.25); opacity: 1; filter: brightness(1.25); }
        }
        @keyframes lampFlarePulse {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.75; }
          50% { transform: scale(1.25) rotate(12deg); opacity: 1; }
        }
        @keyframes lampBeamPulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes lampDeskGlowPulse {
          0%, 100% { opacity: 0.65; transform: scale(1); }
          50% { opacity: 0.95; transform: scale(1.06); }
        }
        @keyframes gasLanternFlicker {
          0%, 100% {
            opacity: 0.98;
            transform: scale(1);
            filter: drop-shadow(0 0 16px rgba(251, 191, 36, 0.95)) drop-shadow(0 0 35px rgba(245, 158, 11, 0.6));
          }
          6% {
            opacity: 0.82;
            transform: scale(0.96);
            filter: drop-shadow(0 0 12px rgba(251, 191, 36, 0.75)) drop-shadow(0 0 20px rgba(245, 158, 11, 0.4));
          }
          12% {
            opacity: 1;
            transform: scale(1.05);
            filter: drop-shadow(0 0 24px rgba(251, 191, 36, 1)) drop-shadow(0 0 45px rgba(245, 158, 11, 0.85));
          }
          25% {
            opacity: 0.90;
            transform: scale(0.98);
            filter: drop-shadow(0 0 14px rgba(251, 191, 36, 0.8));
          }
          38% {
            opacity: 0.68;
            transform: scale(0.92);
            filter: drop-shadow(0 0 9px rgba(251, 191, 36, 0.5));
          }
          42% {
            opacity: 0.96;
            transform: scale(1.03);
            filter: drop-shadow(0 0 20px rgba(251, 191, 36, 0.9));
          }
          58% {
            opacity: 0.85;
            transform: scale(0.97);
            filter: drop-shadow(0 0 13px rgba(251, 191, 36, 0.75));
          }
          64% {
            opacity: 0.65;
            transform: scale(0.90);
            filter: drop-shadow(0 0 8px rgba(251, 191, 36, 0.45));
          }
          68% {
            opacity: 1;
            transform: scale(1.07);
            filter: drop-shadow(0 0 28px rgba(251, 191, 36, 1)) drop-shadow(0 0 52px rgba(245, 158, 11, 0.9));
          }
          82% {
            opacity: 0.92;
            transform: scale(0.99);
            filter: drop-shadow(0 0 15px rgba(251, 191, 36, 0.8));
          }
          94% {
            opacity: 0.75;
            transform: scale(0.94);
            filter: drop-shadow(0 0 10px rgba(251, 191, 36, 0.6));
          }
        }
        @keyframes volumetricBeamFlicker {
          0%, 100% { opacity: 0.70; transform: scaleY(1); }
          6% { opacity: 0.52; transform: scaleY(0.97); }
          12% { opacity: 0.88; transform: scaleY(1.03); }
          38% { opacity: 0.38; transform: scaleY(0.93); }
          42% { opacity: 0.80; transform: scaleY(1.02); }
          64% { opacity: 0.32; transform: scaleY(0.91); }
          68% { opacity: 0.90; transform: scaleY(1.05); }
          94% { opacity: 0.48; transform: scaleY(0.95); }
        }
        .animate-cup-float { animation: cupFloat 3.2s ease-in-out infinite; }
        .animate-star-float { animation: starFloat 2.8s ease-in-out infinite; }
        .animate-medal-sway { animation: medalSway 3.4s ease-in-out infinite; }
        .animate-cup-shimmer { animation: cupShimmer 2.6s ease-in-out infinite; }
        .animate-glint-1 { animation: glintTwinkle 2.4s ease-in-out infinite 0.2s; }
        .animate-glint-2 { animation: glintTwinkle 2.4s ease-in-out infinite 1.4s; }
        .animate-spin-slow { animation: spinSlow 8s linear infinite; }
        .animate-dart-float { animation: dartFloat 3.6s ease-in-out infinite; }
        .animate-lantern-flicker { animation: gasLanternFlicker 2.6s infinite ease-in-out; }
        .animate-beam-flicker { animation: volumetricBeamFlicker 2.6s infinite ease-in-out; }
      `}</style>

      {/* Main Grid: Left Lamp Post and Right Dashboard Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-[320px_minmax(0,1fr)] gap-5 items-stretch w-full">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: 2D Victorian Street Lamp with Flickering Light & 2D Signposts */}
        {/* ========================================================================= */}
        <div className="relative w-full max-w-[340px] mx-auto lg:max-w-none flex flex-col justify-between select-none min-h-[460px] h-full overflow-hidden">
          {/* Responsive 2D Lamppost SVG Canvas */}
          <svg
            viewBox="0 0 320 480"
            className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              {/* Metallic Lamp Post Gradient */}
              <linearGradient id="lampPoleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1a0f2c" />
                <stop offset="35%" stopColor="#3d2258" />
                <stop offset="70%" stopColor="#2b1740" />
                <stop offset="100%" stopColor="#150b24" />
              </linearGradient>

              {/* Lantern Hood Gradient */}
              <linearGradient id="lanternCapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4c2872" />
                <stop offset="50%" stopColor="#351a52" />
                <stop offset="100%" stopColor="#210f35" />
              </linearGradient>

              {/* Gas Flame Outer Ambient Radiant Glow */}
              <radialGradient id="gasFlameOuterGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.75" />
                <stop offset="65%" stopColor="#f59e0b" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Gas Flame Mid Glow */}
              <radialGradient id="gasFlameMidGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                <stop offset="45%" stopColor="#fef08a" stopOpacity="0.85" />
                <stop offset="80%" stopColor="#fde047" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </radialGradient>

              {/* Volumetric Downward Light Beam Gradient */}
              <linearGradient id="volumetricBeamGrad" x1="50" y1="90" x2="70" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#fef08a" stopOpacity="0.5" />
                <stop offset="30%" stopColor="#fbbf24" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </linearGradient>

              {/* Ground Pool Warm Light Gradient */}
              <radialGradient id="groundGlowGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#d97706" stopOpacity="0" />
              </radialGradient>

              {/* Winding Ivy Vine Gradient */}
              <linearGradient id="ivyVineGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="#15803d" />
                <stop offset="50%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#4ade80" />
              </linearGradient>

              {/* Golden Chain Link Gradient */}
              <linearGradient id="goldChainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#b45309" />
              </linearGradient>

              {/* Sign 1 (Cyan) Glass & Border Gradients */}
              <linearGradient id="cyanSignGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0b1b36" stopOpacity="0.94" />
                <stop offset="65%" stopColor="#0e254b" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#0c2d5e" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="cyanBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#22d3ee" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#67e8f9" stopOpacity="1" />
              </linearGradient>

              {/* Sign 2 (Purple) Glass & Border Gradients */}
              <linearGradient id="purpleSignGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#200e36" stopOpacity="0.94" />
                <stop offset="65%" stopColor="#2d124c" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#220b38" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="purpleBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#c084fc" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#d946ef" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#e879f9" stopOpacity="1" />
              </linearGradient>

              {/* Sign 3 (Amber) Glass & Border Gradients */}
              <linearGradient id="amberSignGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#261306" stopOpacity="0.94" />
                <stop offset="65%" stopColor="#381908" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#2a1205" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="amberBorderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
                <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#fcd34d" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* 1. Ambient Warm Ground Pool of Light */}
            <ellipse cx="50" cy="468" rx="42" ry="10" fill="url(#groundGlowGrad)" />

            {/* 2. Ground Stones with Highlight Reflections */}
            <ellipse cx="32" cy="470" rx="9" ry="5" fill="#1b122c" stroke="#3b2554" strokeWidth="1" />
            <ellipse cx="68" cy="471" rx="8" ry="4.5" fill="#1f1433" stroke="#482c66" strokeWidth="1" />
            <ellipse cx="50" cy="473" rx="12" ry="4" fill="#160e24" />

            {/* 3. Pedestal Fluted Victorian Base */}
            <path
              d="M 22 472 L 78 472 L 74 456 L 68 448 L 60 425 L 40 425 L 32 448 L 26 456 Z"
              fill="url(#lampPoleGrad)"
              stroke="#4c2872"
              strokeWidth="1.2"
            />
            {/* Fluting Ridges on Base */}
            <line x1="45" y1="428" x2="38" y2="452" stroke="#5b328a" strokeWidth="1.2" />
            <line x1="50" y1="428" x2="50" y2="454" stroke="#6b3ca3" strokeWidth="1.5" />
            <line x1="55" y1="428" x2="62" y2="452" stroke="#5b328a" strokeWidth="1.2" />

            {/* Base Collar Ring */}
            <rect x="37" y="422" width="26" height="5" rx="2.5" fill="url(#lanternCapGrad)" stroke="#5b328a" strokeWidth="1" />

            {/* 4. Foliage / Grass Blades at Pedestal Foot */}
            <path d="M 18 472 Q 14 458 10 448 Q 16 458 22 470 Z" fill="#22c55e" />
            <path d="M 24 472 Q 22 452 18 438 Q 26 450 28 470 Z" fill="#16a34a" />
            <path d="M 72 472 Q 76 454 84 442 Q 78 454 76 470 Z" fill="#22c55e" />
            <path d="M 78 472 Q 82 460 90 450 Q 82 462 80 472 Z" fill="#15803d" />

            {/* 5. Volumetric Light Beam Streaming Down */}
            <polygon
              points="34,88 66,88 135,270 5,270"
              fill="url(#volumetricBeamGrad)"
              className="animate-beam-flicker pointer-events-none"
            />

            {/* 6. Vertical Fluted Pole Shaft */}
            <rect x="43" y="105" width="14" height="318" fill="url(#lampPoleGrad)" stroke="#452468" strokeWidth="1" />
            {/* Cylinder Specular Highlight */}
            <line x1="48" y1="106" x2="48" y2="422" stroke="#683d96" strokeWidth="1.2" opacity="0.65" />

            {/* 7. Collars on Pole Shaft */}
            <rect x="40" y="135" width="20" height="6" rx="2" fill="url(#lanternCapGrad)" stroke="#522b7a" strokeWidth="0.8" />
            <rect x="40" y="199" width="20" height="6" rx="2" fill="url(#lanternCapGrad)" stroke="#522b7a" strokeWidth="0.8" />
            <rect x="40" y="263" width="20" height="6" rx="2" fill="url(#lanternCapGrad)" stroke="#522b7a" strokeWidth="0.8" />
            <rect x="40" y="325" width="20" height="6" rx="2" fill="url(#lanternCapGrad)" stroke="#522b7a" strokeWidth="0.8" />

            {/* 8. Metal Mounting Brackets (Connecting to right signposts) */}
            {/* Bracket 1 */}
            <rect x="57" y="136" width="14" height="4" fill="#2c1742" stroke="#522b7a" strokeWidth="0.8" />
            <circle cx="68" cy="138" r="2.5" fill="#1b0e2b" stroke="#7e4ab8" strokeWidth="0.8" />
            {/* Bracket 2 */}
            <rect x="57" y="200" width="14" height="4" fill="#2c1742" stroke="#522b7a" strokeWidth="0.8" />
            <circle cx="68" cy="202" r="2.5" fill="#1b0e2b" stroke="#7e4ab8" strokeWidth="0.8" />
            {/* Bracket 3 */}
            <rect x="57" y="264" width="14" height="4" fill="#2c1742" stroke="#522b7a" strokeWidth="0.8" />
            <circle cx="68" cy="266" r="2.5" fill="#1b0e2b" stroke="#7e4ab8" strokeWidth="0.8" />

            {/* Horizontal Hanging Arm for Plaque */}
            <path
              d="M 57 327 L 235 327 Q 242 327 245 323 Q 248 318 243 315"
              fill="none"
              stroke="#3d215c"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Golden Hanging Chain Links */}
            {/* Chain 1 */}
            <ellipse cx="115" cy="333" rx="2.5" ry="4" stroke="url(#goldChainGrad)" strokeWidth="1.6" fill="none" />
            <ellipse cx="115" cy="340" rx="2.5" ry="4" stroke="url(#goldChainGrad)" strokeWidth="1.6" fill="none" />
            {/* Chain 2 */}
            <ellipse cx="205" cy="333" rx="2.5" ry="4" stroke="url(#goldChainGrad)" strokeWidth="1.6" fill="none" />
            <ellipse cx="205" cy="340" rx="2.5" ry="4" stroke="url(#goldChainGrad)" strokeWidth="1.6" fill="none" />

            {/* 9. Winding Ivy Vine Wrapping Around the Pole */}
            <path
              d="M 48 425 Q 36 380 49 330 T 45 260 T 52 195 T 47 135 T 50 108"
              fill="none"
              stroke="url(#ivyVineGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* 14 Stylized 2D Ivy Leaves */}
            <g fill="#22c55e" stroke="#14532d" strokeWidth="0.8">
              {/* Leaf 1 */}
              <path d="M 46 395 C 40 390 35 394 36 399 C 38 404 43 403 46 395 Z" fill="#4ade80" />
              {/* Leaf 2 */}
              <path d="M 52 380 C 58 376 63 381 60 386 C 56 389 53 385 52 380 Z" />
              {/* Leaf 3 */}
              <path d="M 44 350 C 37 346 34 352 38 357 C 42 360 45 356 44 350 Z" fill="#4ade80" />
              {/* Leaf 4 */}
              <path d="M 50 332 C 56 328 62 332 59 338 C 55 341 51 337 50 332 Z" />
              {/* Leaf 5 */}
              <path d="M 43 305 C 36 300 33 306 37 312 C 41 315 44 311 43 305 Z" fill="#4ade80" />
              {/* Leaf 6 */}
              <path d="M 51 285 C 57 280 63 285 60 291 C 55 294 52 290 51 285 Z" />
              {/* Leaf 7 */}
              <path d="M 45 250 C 38 245 35 251 39 257 C 43 260 46 256 45 250 Z" fill="#4ade80" />
              {/* Leaf 8 */}
              <path d="M 53 230 C 59 225 65 230 62 236 C 57 239 54 235 53 230 Z" />
              {/* Leaf 9 */}
              <path d="M 44 190 C 37 185 34 191 38 197 C 42 200 45 196 44 190 Z" fill="#4ade80" />
              {/* Leaf 10 */}
              <path d="M 52 170 C 58 165 64 170 61 176 C 56 179 53 175 52 170 Z" />
              {/* Leaf 11 */}
              <path d="M 45 145 C 38 140 35 146 39 152 C 43 155 46 151 45 145 Z" fill="#4ade80" />
              {/* Leaf 12 */}
              <path d="M 53 125 C 59 120 65 125 62 131 C 57 134 54 130 53 125 Z" />
            </g>

            {/* 10. Lantern Housing Support Bracket */}
            <path
              d="M 40 105 L 50 92 L 60 105 Z"
              fill="url(#lanternCapGrad)"
              stroke="#522b7a"
              strokeWidth="1"
            />

            {/* 11. Victorian Street Lantern (x=20..80, y=14..92) */}
            {/* Lantern Glass Chamber */}
            <polygon
              points="26,45 74,45 66,88 34,88"
              fill="#180e2a"
              fillOpacity="0.85"
              stroke="#432262"
              strokeWidth="1.2"
            />
            {/* Beveled Glass Reflection */}
            <polygon
              points="28,47 48,47 40,86 35,86"
              fill="#fbbf24"
              fillOpacity="0.12"
            />

            {/* =================================================================== */}
            {/* 12. REALISTIC FLICKERING GAS LANTERN FLAME & GLOW                    */}
            {/* =================================================================== */}
            <g className="animate-lantern-flicker origin-center">
              {/* Outer Amber Flare Aura */}
              <circle cx="50" cy="66" r="36" fill="url(#gasFlameOuterGlow)" />
              {/* Mid Golden Glow */}
              <circle cx="50" cy="66" r="18" fill="url(#gasFlameMidGlow)" />
              {/* Incandescent White Flame Core */}
              <ellipse cx="50" cy="66" rx="5" ry="7.5" fill="#ffffff" filter="drop-shadow(0 0 8px #fef08a)" />
              {/* Flame Tip Teardrop */}
              <path d="M 50 56 Q 47 62 50 66 Q 53 62 50 56 Z" fill="#fef08a" />
            </g>

            {/* Lantern Burner Base */}
            <rect x="46" y="80" width="8" height="5" rx="1.5" fill="#2d1744" stroke="#683d96" strokeWidth="0.8" />

            {/* Four Corner Struts on Lantern Glass */}
            <line x1="26" y1="45" x2="34" y2="88" stroke="#522b7a" strokeWidth="1.5" />
            <line x1="42" y1="45" x2="45" y2="88" stroke="#683d96" strokeWidth="1" opacity="0.65" />
            <line x1="58" y1="45" x2="55" y2="88" stroke="#683d96" strokeWidth="1" opacity="0.65" />
            <line x1="74" y1="45" x2="66" y2="88" stroke="#522b7a" strokeWidth="1.5" />

            {/* Lantern Roof / Cap */}
            <polygon
              points="18,45 82,45 68,26 32,26"
              fill="url(#lanternCapGrad)"
              stroke="#582f84"
              strokeWidth="1.5"
            />
            {/* Cap Moldings */}
            <rect x="16" y="43" width="68" height="3.5" rx="1.5" fill="#2d1744" stroke="#683d96" strokeWidth="1" />
            <rect x="30" y="24" width="40" height="3" rx="1" fill="#2d1744" stroke="#683d96" strokeWidth="0.8" />
            {/* Crown Finial Spike */}
            <path d="M 50 12 L 53 22 L 47 22 Z" fill="#f59e0b" stroke="#78350f" strokeWidth="0.8" />
            <circle cx="50" cy="11" r="2.5" fill="#fef08a" stroke="#d97706" strokeWidth="0.8" />
          </svg>

          {/* =================================================================== */}
          {/* 3 DIRECTIONAL 2D GLASS ARROW SIGNPOSTS                              */}
          {/* =================================================================== */}
          <div className="relative z-10 w-full pl-[70px] pr-2 pt-[112px] flex flex-col gap-3">
            {/* Signpost 1: Fundamental (Cyan) */}
            <div
              onClick={() => handlePillClick("fundamental")}
              title="Filter by Fundamental topics"
              className={`group relative w-full h-[46px] cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                activeFilter === "fundamental" ? "brightness-125 ring-1 ring-cyan-400/80 rounded-l-md" : ""
              }`}
            >
              <svg viewBox="0 0 232 46" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 6 1 L 214 1 L 230 23 L 214 45 L 6 45 A 5 5 0 0 1 1 40 L 1 6 A 5 5 0 0 1 6 1 Z"
                  fill="url(#cyanSignGrad)"
                  stroke="url(#cyanBorderGrad)"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 10px rgba(34,211,238,0.35))"
                />
              </svg>
              <div className="absolute inset-0 flex items-center px-3.5 gap-2.5 pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-cyan-400 via-sky-500 to-blue-600 shadow-[0_0_10px_#22d3ee] border border-cyan-300/50 flex-shrink-0" />
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Fundamental
                  </span>
                  <div className="text-xs font-bold text-white leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <span>{stats.fundamentalCount}</span>
                    <span className="text-cyan-300 font-semibold drop-shadow-[0_0_6px_rgba(34,211,238,0.7)]">
                      ({stats.fundamentalPct}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signpost 2: Intermediate (Purple) */}
            <div
              onClick={() => handlePillClick("intermediate")}
              title="Filter by Intermediate topics"
              className={`group relative w-full h-[46px] cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                activeFilter === "intermediate" ? "brightness-125 ring-1 ring-purple-400/80 rounded-l-md" : ""
              }`}
            >
              <svg viewBox="0 0 232 46" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 6 1 L 214 1 L 230 23 L 214 45 L 6 45 A 5 5 0 0 1 1 40 L 1 6 A 5 5 0 0 1 6 1 Z"
                  fill="url(#purpleSignGrad)"
                  stroke="url(#purpleBorderGrad)"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 10px rgba(192,132,252,0.35))"
                />
              </svg>
              <div className="absolute inset-0 flex items-center px-3.5 gap-2.5 pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-fuchsia-400 via-purple-500 to-indigo-600 shadow-[0_0_10px_#c084fc] border border-purple-300/50 flex-shrink-0" />
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Intermediate
                  </span>
                  <div className="text-xs font-bold text-white leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <span>{stats.intermediateCount}</span>
                    <span className="text-purple-300 font-semibold drop-shadow-[0_0_6px_rgba(192,132,252,0.7)]">
                      ({stats.intermediatePct}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signpost 3: Advanced (Amber) */}
            <div
              onClick={() => handlePillClick("advanced")}
              title="Filter by Advanced topics"
              className={`group relative w-full h-[46px] cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                activeFilter === "advanced" ? "brightness-125 ring-1 ring-amber-400/80 rounded-l-md" : ""
              }`}
            >
              <svg viewBox="0 0 232 46" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <path
                  d="M 6 1 L 214 1 L 230 23 L 214 45 L 6 45 A 5 5 0 0 1 1 40 L 1 6 A 5 5 0 0 1 6 1 Z"
                  fill="url(#amberSignGrad)"
                  stroke="url(#amberBorderGrad)"
                  strokeWidth="1.5"
                  filter="drop-shadow(0 0 10px rgba(251,191,36,0.35))"
                />
              </svg>
              <div className="absolute inset-0 flex items-center px-3.5 gap-2.5 pointer-events-none">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 shadow-[0_0_10px_#fbbf24] border border-amber-300/50 flex-shrink-0" />
                <div className="flex flex-col justify-center min-w-0">
                  <span className="text-xs font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    Advanced
                  </span>
                  <div className="text-xs font-bold text-white leading-tight flex items-center gap-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    <span>{stats.advancedCount}</span>
                    <span className="text-amber-300 font-semibold drop-shadow-[0_0_6px_rgba(251,191,36,0.7)]">
                      ({stats.advancedPct}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hanging Glass Plaque (Real-Time Summary Stats) */}
            <div className="mt-7 relative w-full rounded-2xl p-2.5 bg-gradient-to-br from-[#1c0f32]/92 via-[#241240]/88 to-[#150a28]/92 backdrop-blur-xl border border-purple-400/40 shadow-[0_8px_24px_rgba(112,66,248,0.25)] flex items-center justify-around">
              {/* Stat 1: Topics */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-4 h-4 flex items-center justify-center text-purple-300 mb-0.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white font-mono leading-tight">
                  {stats.totalTopicsCount}
                </span>
                <span className="text-[10px] font-medium text-slate-300">Topics</span>
              </div>

              <div className="w-[1px] h-7 bg-purple-500/25" />

              {/* Stat 2: Problems */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-4 h-4 flex items-center justify-center text-cyan-300 mb-0.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white font-mono leading-tight">
                  {stats.totalProblems}
                </span>
                <span className="text-[10px] font-medium text-slate-300">Problems</span>
              </div>

              <div className="w-[1px] h-7 bg-purple-500/25" />

              {/* Stat 3: Fundamental */}
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <div className="w-4 h-4 flex items-center justify-center text-amber-300 mb-0.5">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="8" strokeOpacity="0.3" />
                    <path d="M12 4a8 8 0 0 1 8 8" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-xs font-black text-white font-mono leading-tight">
                  {stats.fundamentalPct}%
                </span>
                <span className="text-[10px] font-medium text-slate-300">Fundamental</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: Filter Pills on top + Distribution Chart + Bottom 2 Cards   */}
        {/* ========================================================================= */}
        <div className="flex flex-col gap-3 justify-between min-w-0 w-full">
          {/* Top Filter Pills Row (Aligned Right above Card 2) */}
          <div className="flex items-center justify-end gap-3 px-1">
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

          {/* Card 2: Topic-wise Problem Distribution */}
          <div className="relative rounded-2xl p-3.5 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent">
            {/* Header: Trending Graph Icon + Title */}
            <div className="flex items-center gap-2 mb-2.5">
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

            {/* Chart Area: Displays ONLY real-time topics solved by user; clean empty state if none */}
            {solvedTopics.length === 0 ? (
              <div className="h-[155px] flex flex-col items-center justify-center text-center px-4">
                <div className="w-11 h-11 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-2 shadow-[0_0_16px_rgba(168,85,247,0.2)]">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-purple-300" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18" />
                    <path d="M18 17V9" />
                    <path d="M13 17V5" />
                    <path d="M8 17v-3" />
                  </svg>
                </div>
                <p className="text-xs font-semibold text-slate-200">No topic data available yet</p>
                <p className="text-[11px] text-slate-400 mt-0.5 max-w-[320px]">
                  Solved problems on LeetCode will automatically display here broken down by topic in real time.
                </p>
              </div>
            ) : displayColumns.length === 0 ? (
              <div className="h-[155px] flex flex-col items-center justify-center text-center px-4">
                <p className="text-xs font-semibold text-slate-300">
                  No {activeFilter} topics solved yet
                </p>
                <button
                  onClick={() => setActiveFilter("all")}
                  className="mt-2 px-3 py-1 text-[11px] font-semibold rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/40 hover:bg-purple-500/30 transition-colors"
                >
                  Show all solved topics ({solvedTopics.length})
                </button>
              </div>
            ) : (
              <div className="relative w-full overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-purple-500/30">
                <div className="min-w-full w-full px-2">
                  {/* Upper Chart Plot Area: Gridlines + Rising Bars + Numbers + Discs */}
                  <div className="relative h-[106px] w-full pl-6 pr-2 pt-2">
                    {/* 6 Horizontal Dashed Gridlines (10, 8, 6, 4, 2, 0) */}
                    <div className="absolute inset-0 pl-6 pr-2 pt-2 flex flex-col justify-between pointer-events-none pb-2">
                      {yTicks.map((val, idx) => (
                        <div key={idx} className="relative w-full flex items-center">
                          <span className="absolute -left-6 text-[10px] font-mono text-slate-400 w-4 text-right">
                            {val}
                          </span>
                          <div className="w-full border-b border-dashed border-purple-500/20" />
                        </div>
                      ))}
                    </div>

                    {/* Columns: Rising Neon Bars, Numbers on Top, and 3D Pedestals on Baseline */}
                    <div
                      className={`relative h-full flex items-end ${
                        displayColumns.length <= 6 ? "justify-center gap-6 sm:gap-8" : "justify-between"
                      } z-10 pb-2 w-full`}
                    >
                      {displayColumns.map((col) => {
                        const maxPlotHeight = 66;
                        const barHeight = Math.max(8, Math.min(maxPlotHeight, (col.solved / maxSolved) * maxPlotHeight));
                        const numberBottom = barHeight + 6;

                        const barGradient =
                          col.level === "fundamental"
                            ? "from-cyan-600 via-sky-400 to-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.85)]"
                            : col.level === "advanced"
                            ? "from-amber-600 via-orange-400 to-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.85)]"
                            : "from-purple-600 via-fuchsia-400 to-purple-300 shadow-[0_0_12px_rgba(192,132,252,0.85)]";

                        return (
                          <div
                            key={col.id}
                            className="relative h-full flex-1 min-w-[46px] max-w-[72px] flex flex-col items-center justify-end transition-all duration-300"
                          >
                            {/* Solved Count Hover/Display */}
                            <div
                              style={{ bottom: `${numberBottom}px` }}
                              className="absolute text-[11px] font-black font-mono text-white text-center transition-all duration-500 ease-out z-20 pointer-events-none select-none drop-shadow-[0_0_6px_rgba(34,211,238,0.9),0_1px_3px_rgba(0,0,0,0.9)]"
                            >
                              {col.solved}
                            </div>

                            {/* Animated Rising Neon Bar */}
                            <div
                              style={{ height: `${barHeight}px` }}
                              className={`absolute bottom-1 w-3 rounded-t-md bg-gradient-to-t ${barGradient} transition-all duration-700 ease-out z-10`}
                            />

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
                  <div
                    className={`flex items-start ${
                      displayColumns.length <= 6 ? "justify-center gap-6 sm:gap-8" : "justify-between"
                    } pl-6 pr-2 pt-1.5 w-full`}
                  >
                    {displayColumns.map((col) => {
                      return (
                        <div
                          key={col.id}
                          className="flex-1 min-w-[46px] max-w-[72px] flex flex-col items-center transition-all duration-300"
                        >
                          {/* Floating Neon Icon Tile */}
                          <div className="w-7.5 h-7.5 rounded-lg bg-[#140e2b]/90 border border-purple-400/40 shadow-[0_0_8px_rgba(168,85,247,0.3)] flex items-center justify-center transition-transform duration-200 hover:scale-110 hover:border-purple-300 my-0.5">
                            <TopicTileIcon tag={col.name} level={col.level} />
                          </div>

                          {/* Full Topic Label */}
                          <div
                            title={col.name}
                            className="h-[28px] w-full flex items-center justify-center text-[9px] font-medium text-slate-300 text-center leading-[11px] px-0.5 break-words line-clamp-2"
                          >
                            <span>{col.name}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom 2 Cards Grid: Top Covered Topics & Coverage Insight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* ========================================================================= */}
            {/* Card 3: Top Covered Topics (with True 3D Stage Pedestals)                 */}
            {/* ========================================================================= */}
            <div className="relative rounded-2xl p-3.5 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent flex flex-col justify-between">
              {/* Header: Crisp 3D Golden Trophy Icon + Title (Arrow removed per user request) */}
              <div className="flex items-center gap-2 mb-2">
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.85)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
                  <path d="M6 4h12v5a6 6 0 0 1-12 0V4z" fill="#f59e0b" fillOpacity="0.4" />
                </svg>
                <h4 className="text-sm font-bold text-white tracking-wide">Top Covered Topics</h4>
              </div>

              {stats.totalTopicsCount === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-3 min-h-[140px]">
                  <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-2 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
                    <svg viewBox="0 0 24 24" className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                      <path d="M4 22h16" />
                      <path d="M10 14.66V17c0 .55-.45 1-1 1H8v4h8v-4h-1c-.55 0-1-.45-1-1v-2.34" />
                      <path d="M6 4h12v5a6 6 0 0 1-12 0V4z" fill="#f59e0b" fillOpacity="0.4" />
                    </svg>
                  </div>
                  <p className="text-xs font-semibold text-slate-300">No covered topics yet</p>
                  <p className="text-[11px] text-slate-400 mt-0.5 max-w-[200px]">
                    Your top solved topics will take the podium here.
                  </p>
                </div>
              ) : (
                /* 3 Stepped Glowing Podiums */
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {/* Podium 1 (Rank 1): Golden Trophy Cup on 3D Amber Stage Pedestal */}
                  <div className="relative flex flex-col items-center justify-between p-2 pt-1 pb-1.5 rounded-xl bg-gradient-to-b from-[#2a1708]/60 via-[#180e22]/70 to-[#120a1c]/80 border border-amber-500/30 shadow-[inset_0_1px_1px_rgba(251,191,36,0.2)]">
                    <PodiumCupAnimation />

                    <div className="text-center my-0.5 min-h-[34px] flex flex-col justify-center">
                      <div
                        title={stats.top1?.tag ?? "—"}
                        className="text-xs font-bold text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        {stats.top1 ? stats.top1.tag : "—"}
                      </div>
                      {/* High-visibility illuminated number pill badge */}
                      <div className="mt-1 flex items-center justify-center">
                        <span className="inline-block px-2.5 py-0.5 text-xs font-black font-mono text-amber-200 bg-amber-500/25 border border-amber-400/60 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.55)]">
                          ({stats.top1 ? stats.top1.solved : 0})
                        </span>
                      </div>
                    </div>

                    <PodiumPedestal variant="amber" />
                  </div>

                  {/* Podium 2 (Rank 2): Glowing 3D Star on 3D Blue Stage Pedestal */}
                  <div className="relative flex flex-col items-center justify-between p-2 pt-1 pb-1.5 rounded-xl bg-gradient-to-b from-[#0c1830]/60 via-[#120e28]/70 to-[#100a1c]/80 border border-cyan-500/30 shadow-[inset_0_1px_1px_rgba(56,189,248,0.2)]">
                    <PodiumStarAnimation />

                    <div className="text-center my-0.5 min-h-[34px] flex flex-col justify-center">
                      <div
                        title={stats.top2?.tag ?? "—"}
                        className="text-xs font-bold text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        {stats.top2 ? stats.top2.tag : "—"}
                      </div>
                      {/* High-visibility illuminated number pill badge or empty indicator */}
                      <div className="mt-1 flex items-center justify-center">
                        {stats.top2 ? (
                          <span className="inline-block px-2.5 py-0.5 text-xs font-black font-mono text-cyan-100 bg-cyan-500/25 border border-cyan-400/60 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.55)]">
                            ({stats.top2.solved})
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">—</span>
                        )}
                      </div>
                    </div>

                    <PodiumPedestal variant="cyan" />
                  </div>

                  {/* Podium 3 (Rank 3): Glowing Award Medal on 3D Purple Stage Pedestal */}
                  <div className="relative flex flex-col items-center justify-between p-2 pt-1 pb-1.5 rounded-xl bg-gradient-to-b from-[#240e32]/60 via-[#160c26]/70 to-[#100a1c]/80 border border-purple-500/30 shadow-[inset_0_1px_1px_rgba(192,132,252,0.2)]">
                    <PodiumMedalAnimation />

                    <div className="text-center my-0.5 min-h-[34px] flex flex-col justify-center">
                      <div
                        title={stats.top3?.tag ?? "—"}
                        className="text-xs font-bold text-white leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      >
                        {stats.top3 ? stats.top3.tag : "—"}
                      </div>
                      {/* High-visibility illuminated number pill badge or empty indicator */}
                      <div className="mt-1 flex items-center justify-center">
                        {stats.top3 ? (
                          <span className="inline-block px-2.5 py-0.5 text-xs font-black font-mono text-purple-100 bg-purple-500/25 border border-purple-400/60 rounded-full shadow-[0_0_10px_rgba(192,132,252,0.55)]">
                            ({stats.top3.solved})
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">—</span>
                        )}
                      </div>
                    </div>

                    <PodiumPedestal variant="purple" />
                  </div>
                </div>
              )}
            </div>

            {/* ========================================================================= */}
            {/* Card 4: Coverage Insight (with Clean 3D Cutout Target Dart)               */}
            {/* ========================================================================= */}
            <div className="relative rounded-2xl p-3.5 bg-gradient-to-br from-[#1b143d]/85 via-[#130f2f]/85 to-[#0e0b24]/90 backdrop-blur-xl border border-purple-500/25 shadow-[0_8px_32px_0_rgba(112,66,248,0.22)] overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-[1px] before:bg-gradient-to-r before:from-transparent before:via-purple-400/40 before:to-transparent flex items-center justify-between">
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
                <p className="text-xs text-slate-300/90 leading-relaxed mt-1.5 pr-2">
                  {stats.totalProblems === 0
                    ? "Connect your LeetCode account in Settings to track your real-time topic progress."
                    : stats.top1
                    ? `Top focus in ${stats.top1.tag} (${stats.top1.solved} solved). Expand coverage into other fundamental and intermediate patterns!`
                    : "Solve more problems to see personalized coverage insights."}
                </p>
              </div>

              {/* Right Side: Clean 3D Cutout Target Dart */}
              <div className="relative w-[115px] h-[100px] flex-shrink-0 animate-dart-float filter drop-shadow-[0_0_12px_rgba(168,85,247,0.4)] pointer-events-none select-none">
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
