"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Lightbulb,
  Code2,
  Target,
  BarChart3,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Small Steps Big Progress - fully coded banner (no static image)   */
/* ------------------------------------------------------------------ */

export function ReadinessWidget({ previewData }: { previewData?: any } = {}) {
  return (
    <Card className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#080c18] p-0 shadow-2xl shadow-purple-950/40 select-none cursor-default">
      {/* ---- Main container ---- */}
      <div className="relative w-full min-h-[180px] sm:min-h-[220px] md:min-h-[260px] overflow-hidden">
        {/* ===== BACKGROUND LAYERS ===== */}

        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#080c18] via-[#0d1330] to-[#12082a]" />

        {/* Wave decoration - bottom */}
        <svg
          className="absolute bottom-0 left-0 w-full h-[60%] opacity-30"
          viewBox="0 0 1024 200"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 120 C200 60, 400 160, 600 100 S900 40, 1024 80 L1024 200 L0 200Z"
            fill="url(#wave1)"
          />
          <path
            d="M0 160 C150 120, 350 180, 550 140 S800 100, 1024 130 L1024 200 L0 200Z"
            fill="url(#wave2)"
          />
          <defs>
            <linearGradient id="wave1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#1e1052" />
              <stop offset="50%" stopColor="#2d1a6e" />
              <stop offset="100%" stopColor="#1a0e40" />
            </linearGradient>
            <linearGradient id="wave2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#150d3a" />
              <stop offset="100%" stopColor="#0d0820" />
            </linearGradient>
          </defs>
        </svg>

        {/* Ambient glow spots */}
        <div className="absolute top-[20%] right-[30%] w-48 h-48 rounded-full bg-purple-600/15 blur-[80px]" />
        <div className="absolute bottom-[10%] right-[15%] w-40 h-40 rounded-full bg-fuchsia-500/10 blur-[60px]" />
        <div className="absolute top-[40%] left-[10%] w-32 h-32 rounded-full bg-indigo-600/10 blur-[60px]" />

        {/* ===== CONTENT ===== */}
        <div className="relative z-10 flex h-full min-h-[180px] sm:min-h-[220px] md:min-h-[260px]">
          {/* ---- LEFT: Text + milestone icons ---- */}
          <div className="flex flex-col justify-center px-6 sm:px-8 md:px-10 py-6 sm:py-8 w-[55%] sm:w-[50%]">
            {/* Sparkle accent */}
            <div className="mb-2 sm:mb-3 flex items-center gap-1 text-purple-300/60">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="w-1 h-1 rounded-full bg-purple-400/50 animate-pulse" style={{ animationDelay: "0.3s" }} />
              <span className="w-0.5 h-0.5 rounded-full bg-purple-300/40 animate-pulse" style={{ animationDelay: "0.6s" }} />
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold leading-[1.1] tracking-tight">
              <span className="text-white">Small Steps</span>
              <br />
              <span className="bg-gradient-to-r from-fuchsia-400 via-pink-400 to-purple-400 bg-clip-text text-transparent italic">
                Big Progress
              </span>
            </h2>

            {/* Pink underline swash */}
            <svg className="w-28 sm:w-36 h-3 mt-1 mb-3 sm:mb-4" viewBox="0 0 140 12" fill="none">
              <path
                d="M2 8 Q35 2, 70 6 T138 4"
                stroke="url(#swash)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <defs>
                <linearGradient id="swash" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Subtitle */}
            <p className="text-[11px] sm:text-sm md:text-[15px] text-slate-400 leading-relaxed max-w-[260px] sm:max-w-[300px]">
              Stay consistent, solve one problem at a time, and watch your progress grow.
            </p>

            {/* ---- Milestone stepping stones ---- */}
            <div className="mt-4 sm:mt-6 flex items-end gap-2 sm:gap-3">
              {[
                { Icon: FileText, color: "from-slate-500/80 to-slate-600/80", delay: "0s" },
                { Icon: Lightbulb, color: "from-amber-500/80 to-yellow-600/80", delay: "0.1s" },
                { Icon: Code2, color: "from-purple-500/80 to-indigo-600/80", delay: "0.2s" },
                { Icon: Target, color: "from-pink-500/80 to-fuchsia-600/80", delay: "0.3s" },
              ].map(({ Icon, color, delay }, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br ${color} backdrop-blur-sm border border-white/10 flex items-center justify-center shadow-lg`}
                    style={{
                      animation: "floatUp 3s ease-in-out infinite",
                      animationDelay: delay,
                    }}
                  >
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white/90" />
                  </div>
                  {/* Connector dot */}
                  <span className="w-1 h-1 rounded-full bg-purple-500/60" />
                </div>
              ))}

              {/* Rising arrow */}
              <svg className="w-16 h-10 ml-1 -mb-1" viewBox="0 0 64 40" fill="none">
                <path
                  d="M4 36 Q16 30, 24 24 T44 10 L56 4"
                  stroke="url(#arrowGrad)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                />
                <polygon points="54,2 60,6 54,10" fill="#06b6d4" />
                <defs>
                  <linearGradient id="arrowGrad" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* ---- RIGHT: Staircase + trophy ---- */}
          <div className="relative w-[45%] sm:w-[50%] flex items-end justify-center pb-2">
            {/* Staircase SVG */}
            <svg
              className="w-full h-full max-h-[240px]"
              viewBox="0 0 420 260"
              fill="none"
              preserveAspectRatio="xMidYMax meet"
            >
              {/* Glow filter */}
              <defs>
                <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="stairGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="50%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <linearGradient id="stairFace" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1e1252" />
                  <stop offset="100%" stopColor="#0d0828" />
                </linearGradient>
                <linearGradient id="pathGrad" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6d28d9" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Curved path at base */}
              <path
                d="M30 250 Q100 240, 160 220 T280 170 Q320 155, 360 140"
                stroke="url(#pathGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                filter="url(#neonGlow)"
              />

              {/* Stair steps */}
              {[
                { x: 140, y: 195, w: 90, h: 22 },
                { x: 170, y: 168, w: 95, h: 22 },
                { x: 200, y: 141, w: 100, h: 22 },
                { x: 230, y: 114, w: 105, h: 22 },
                { x: 260, y: 87, w: 110, h: 22 },
              ].map(({ x, y, w, h }, i) => (
                <g key={i}>
                  {/* Step top face */}
                  <rect
                    x={x}
                    y={y}
                    width={w}
                    height={h}
                    rx={4}
                    fill="url(#stairFace)"
                    stroke="url(#stairGrad)"
                    strokeWidth="1.5"
                    filter="url(#neonGlow)"
                  />
                  {/* Neon edge glow */}
                  <line
                    x1={x + 2}
                    y1={y}
                    x2={x + w - 2}
                    y2={y}
                    stroke="#a855f7"
                    strokeWidth="2"
                    filter="url(#neonGlow)"
                    opacity="0.8"
                  />
                  {/* Front face */}
                  <rect
                    x={x}
                    y={y + h}
                    width={w}
                    height={10}
                    fill="#0a0620"
                    stroke="url(#stairGrad)"
                    strokeWidth="0.5"
                    opacity="0.5"
                  />
                </g>
              ))}

              {/* Person silhouette on stair 4 */}
              <g transform="translate(290, 55)">
                <ellipse cx="12" cy="4" rx="6" ry="6" fill="#1a1535" stroke="#2d2060" strokeWidth="0.5" />
                <path d="M12 10 L12 32 M12 16 L4 24 M12 16 L20 22 M12 32 L6 48 M12 32 L18 48" stroke="#1a1535" strokeWidth="4" strokeLinecap="round" />
                <path d="M12 10 L12 32 M12 16 L4 24 M12 16 L20 22 M12 32 L6 48 M12 32 L18 48" stroke="#2d2060" strokeWidth="2.5" strokeLinecap="round" />
                <rect x="14" y="12" width="7" height="10" rx="2" fill="#1e1545" stroke="#2d2060" strokeWidth="0.5" />
              </g>

              {/* Trophy at top */}
              <g transform="translate(320, 30)">
                <path
                  d="M20 12 C20 4, 50 4, 50 12 L48 32 C48 36, 22 36, 22 32 Z"
                  fill="url(#trophyGrad)"
                  stroke="#fbbf24"
                  strokeWidth="1"
                />
                <path d="M20 16 C10 16, 10 28, 20 28" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <path d="M50 16 C60 16, 60 28, 50 28" stroke="#f59e0b" strokeWidth="2" fill="none" />
                <rect x="28" y="36" width="14" height="4" rx="1" fill="#b45309" />
                <rect x="24" y="40" width="22" height="3" rx="1" fill="#92400e" />
                <polygon
                  points="35,14 37,20 43,20 38,24 40,30 35,26 30,30 32,24 27,20 33,20"
                  fill="#fde68a"
                  opacity="0.9"
                />
                <circle cx="35" cy="22" r="18" fill="#f59e0b" opacity="0.08" />
                <defs>
                  <linearGradient id="trophyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="50%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#b45309" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="10" r="1.5" fill="#e9d5ff" opacity="0.7">
                  <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite" />
                </circle>
                <circle cx="55" cy="5" r="1" fill="#c4b5fd" opacity="0.5">
                  <animate attributeName="opacity" values="0.5;0.1;0.5" dur="2.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="65" cy="18" r="1" fill="#e9d5ff" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;0.15;0.6" dur="1.8s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Floating badge: BarChart */}
              <g transform="translate(245, 52)">
                <rect x="0" y="0" width="30" height="30" rx="8" fill="#111836" stroke="#334155" strokeWidth="1" opacity="0.9" />
                <rect x="8" y="18" width="4" height="6" rx="1" fill="#818cf8" />
                <rect x="13" y="12" width="4" height="12" rx="1" fill="#818cf8" />
                <rect x="18" y="15" width="4" height="9" rx="1" fill="#818cf8" />
              </g>

              {/* Floating badge: Checkmark */}
              <g transform="translate(275, 128)">
                <rect x="0" y="0" width="30" height="30" rx="8" fill="#111836" stroke="#334155" strokeWidth="1" opacity="0.9" />
                <path d="M8 15 L13 20 L22 11" stroke="#60a5fa" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </g>

              {/* Floating badge: Target (right side) */}
              <g transform="translate(370, 130)">
                <rect x="0" y="0" width="30" height="30" rx="8" fill="#111836" stroke="#334155" strokeWidth="1" opacity="0.9" />
                <circle cx="15" cy="15" r="8" stroke="#818cf8" strokeWidth="1.5" fill="none" />
                <circle cx="15" cy="15" r="4" stroke="#818cf8" strokeWidth="1.5" fill="none" />
                <circle cx="15" cy="15" r="1.5" fill="#818cf8" />
              </g>
            </svg>

            {/* Scattered star particles */}
            <div className="absolute top-[15%] right-[20%] w-1 h-1 rounded-full bg-purple-300/50 animate-pulse" />
            <div className="absolute top-[25%] right-[40%] w-1.5 h-1.5 rounded-full bg-indigo-300/40 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute top-[10%] right-[55%] w-1 h-1 rounded-full bg-fuchsia-300/30 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>
      </div>
    </Card>
  );
}
