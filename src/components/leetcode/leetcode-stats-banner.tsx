"use client";

import React from "react";

// ==========================================
// 3D & GLOW ICONS
// ==========================================

export function LaptopCode3DIcon({ className = "w-7 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="laptopBodyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2e3852" />
          <stop offset="100%" stopColor="#151b2a" />
        </linearGradient>
        <linearGradient id="laptopBaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="60%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <filter id="laptopShadow" x="-10%" y="-10%" width="120%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.5" />
        </filter>
      </defs>
      {/* Base shadow */}
      <ellipse cx="24" cy="33.5" rx="20" ry="2" fill="rgba(0,0,0,0.4)" filter="blur(1px)" />
      {/* Screen lid bezel */}
      <rect x="7" y="3" width="34" height="23" rx="3.5" fill="url(#laptopBodyGrad)" stroke="#475569" strokeWidth="1" filter="url(#laptopShadow)" />
      {/* Screen display inner */}
      <rect x="9.5" y="5.5" width="29" height="18" rx="2" fill="#0d111c" />
      {/* Code </ > brackets inside screen */}
      <path
        d="M19 11.5L15 14.5L19 17.5M29 11.5L33 14.5L29 17.5M25.5 10L22.5 19"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Laptop Keyboard Base */}
      <path
        d="M3 26.5C3 25.4 3.9 24.5 5 24.5H43C44.1 24.5 45 25.4 45 26.5L43.8 30C43.5 30.8 42.7 31.5 41.8 31.5H6.2C5.3 31.5 4.5 30.8 4.2 30L3 26.5Z"
        fill="url(#laptopBaseGrad)"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      {/* Trackpad notch */}
      <rect x="20.5" y="25" width="7" height="1.2" rx="0.6" fill="#1e293b" />
    </svg>
  );
}

export function LightningBolt3DIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="boltGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="40%" stopColor="#2dd4bf" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <linearGradient id="boltShine" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#5eead4" stopOpacity="0.1" />
        </linearGradient>
        <filter id="boltGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#14b8a6" floodOpacity="0.75" />
        </filter>
      </defs>
      <path
        d="M18.5 2.5L7.5 17H16L13.5 29.5L24.5 15H16L18.5 2.5Z"
        fill="url(#boltGrad)"
        filter="url(#boltGlow)"
      />
      <path
        d="M18.5 2.5L16 15H24.5L13.5 29.5"
        stroke="url(#boltShine)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Layers3DIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="layerTopGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="layerMidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="layerBotGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <filter id="layerGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#f59e0b" floodOpacity="0.65" />
        </filter>
      </defs>
      <g filter="url(#layerGlow)">
        {/* Bottom layer */}
        <path d="M16 23.5L6.5 19L16 14.5L25.5 19L16 23.5Z" fill="url(#layerBotGrad)" />
        <path d="M6.5 19L16 23.5L25.5 19L25.5 21L16 25.5L6.5 21V19Z" fill="#78350f" />

        {/* Middle layer */}
        <path d="M16 18L6.5 13.5L16 9L25.5 13.5L16 18Z" fill="url(#layerMidGrad)" />
        <path d="M6.5 13.5L16 18L25.5 13.5L25.5 15.5L16 20L6.5 15.5V13.5Z" fill="#92400e" />

        {/* Top layer with 3D bevel */}
        <path d="M16 12.5L6.5 8L16 3.5L25.5 8L16 12.5Z" fill="url(#layerTopGrad)" stroke="#fef3c7" strokeWidth="0.75" />
        <path d="M6.5 8L16 12.5L25.5 8L25.5 10L16 14.5L6.5 10V8Z" fill="#b45309" />
      </g>
    </svg>
  );
}

export function Flag3DIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="flagGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="50%" stopColor="#f43f5e" />
          <stop offset="100%" stopColor="#be123c" />
        </linearGradient>
        <linearGradient id="poleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="flagGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#f43f5e" floodOpacity="0.65" />
        </filter>
      </defs>
      {/* Pole */}
      <rect x="7" y="4" width="2.5" height="25" rx="1.25" fill="url(#poleGrad)" />
      <circle cx="8.25" cy="4" r="2" fill="#e2e8f0" />
      {/* 3D Pennant Flag */}
      <path
        d="M9.5 5.5L26 12C26.5 12.2 26.5 12.8 26 13L9.5 19.5V5.5Z"
        fill="url(#flagGrad)"
        filter="url(#flagGlow)"
      />
      {/* Wavy highlight ripple */}
      <path
        d="M9.5 5.5Q17 10 26 12.5"
        stroke="#ffe4e6"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

export function TrophyLaurel3DIcon({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 46" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="trophyGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#fbbf24" />
          <stop offset="85%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="trophyShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="laurelGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <filter id="trophyGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f59e0b" floodOpacity="0.6" />
        </filter>
      </defs>

      <g filter="url(#trophyGlow)">
        {/* Left Laurel Leaves */}
        <g fill="url(#laurelGold)">
          <path d="M12.5 17C10.5 15.5 8 18 10 20C12 21 14 18.5 12.5 17Z" />
          <path d="M10 22C8 21 6 24 8 26C10 27 11.5 24.5 10 22Z" />
          <path d="M10 28C8.5 27.5 7 30.5 9 32C11 33 12 30.5 10 28Z" />
          <path d="M12 34C11 33.5 10 36.5 12 37.5C14 38.5 14.5 36 12 34Z" />
          <path d="M14 15C10 22 10 32 17 38" stroke="url(#laurelGold)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Right Laurel Leaves */}
        <g fill="url(#laurelGold)">
          <path d="M39.5 17C41.5 15.5 44 18 42 20C40 21 38 18.5 39.5 17Z" />
          <path d="M42 22C44 21 46 24 44 26C42 27 40.5 24.5 42 22Z" />
          <path d="M42 28C43.5 27.5 45 30.5 43 32C41 33 40 30.5 42 28Z" />
          <path d="M40 34C41 33.5 42 36.5 40 37.5C38 38.5 37.5 36 40 34Z" />
          <path d="M38 15C42 22 42 32 35 38" stroke="url(#laurelGold)" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Trophy Handles */}
        <path
          d="M18 13C13 13 13 22 18 22"
          stroke="url(#trophyGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M34 13C39 13 39 22 34 22"
          stroke="url(#trophyGold)"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />

        {/* Trophy Cup Body */}
        <path
          d="M18 10H34V18C34 22.4 30.4 26 26 26C21.6 26 18 22.4 18 18V10Z"
          fill="url(#trophyGold)"
        />

        {/* Trophy Rim */}
        <ellipse cx="26" cy="10" rx="8" ry="1.8" fill="#fef08a" />

        {/* Star on Cup */}
        <path
          d="M26 14L27 16.5H29.5L27.5 18L28.2 20.5L26 19L23.8 20.5L24.5 18L22.5 16.5H25L26 14Z"
          fill="#ffffff"
          opacity="0.9"
        />

        {/* Trophy Stem & Pedestal Base */}
        <path d="M24 26H28V31H24V26Z" fill="url(#trophyGold)" />
        <path d="M21 31H31L32.5 35H19.5L21 31Z" fill="url(#trophyGold)" />
        <rect x="18" y="35" width="16" height="3" rx="1.5" fill="#d97706" />

        {/* Specular shine */}
        <path
          d="M20 12V18C20 20.5 21.5 22.5 23 23.5"
          stroke="url(#trophyShine)"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

// ==========================================
// COMPONENT PROPS
// ==========================================

export interface LeetcodeStatsBannerProps {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number | null;
  loading?: boolean;
  className?: string;
  compact?: boolean;
}

export function LeetcodeStatsBanner({
  totalSolved = 0,
  easySolved = 0,
  mediumSolved = 0,
  hardSolved = 0,
  ranking,
  loading = false,
  className = "",
  compact = false,
}: LeetcodeStatsBannerProps) {
  // Circular ring calculation
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16

  // Progress percentage (visual arc)
  const safeTotal = totalSolved || 0;
  // Calculate a proportional arc (minimum 15% arc so the glowing cyan-purple gradient is always visible)
  const ratio = Math.max(0.15, Math.min(1, safeTotal > 0 ? (safeTotal / 60) * 0.45 + 0.15 : 0.15));
  const strokeDashoffset = circumference - circumference * ratio;

  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  return (
    <div
      className={`relative w-full rounded-[28px] sm:rounded-[34px] border border-slate-800/80 bg-gradient-to-b from-[#141824] via-[#0d101a] to-[#070913] shadow-[0_16px_50px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] overflow-hidden transition-all duration-300 ${
        compact ? "p-3 sm:p-4" : "p-4 sm:p-5 md:p-6"
      } ${className}`}
    >
      {/* Specular top light edge */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute -top-20 left-1/4 w-72 h-36 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-72 h-36 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

      <div
        className={`relative z-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 md:gap-5 ${
          compact ? "lg:flex-nowrap" : "xl:flex-nowrap"
        }`}
      >
        {/* ========================================================
            LEFT SECTION: Circular Donut Ring (Total Solved)
           ======================================================== */}
        <div className="flex items-center justify-center shrink-0 mx-auto sm:mx-0">
          <div
            className={`relative flex items-center justify-center ${
              compact
                ? "w-[110px] h-[110px] sm:w-[120px] sm:h-[120px]"
                : "w-[124px] h-[124px] sm:w-[136px] sm:h-[136px]"
            }`}
          >
            {/* SVG Progress Ring */}
            <svg
              className="w-full h-full -rotate-90"
              viewBox="0 0 120 120"
            >
              <defs>
                <linearGradient id="donutProgressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5c4" />
                  <stop offset="45%" stopColor="#06b6d4" />
                  <stop offset="80%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>
                <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#00f5c4" floodOpacity="0.7" />
                  <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#8b5cf6" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Background dark ring track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="stroke-[#252c42]/50"
                strokeWidth="10"
                fill="none"
              />

              {/* Inner subtle rim */}
              <circle
                cx="60"
                cy="60"
                r={radius - 6}
                className="stroke-white/5"
                strokeWidth="1"
                fill="none"
              />

              {/* Glowing Active Arc */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="url(#donutProgressGrad)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                filter="url(#ringGlow)"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Inner Content: Laptop Icon + Number + Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-1">
              <LaptopCode3DIcon
                className={`${
                  compact ? "w-6 h-4 sm:w-7 sm:h-5" : "w-7 h-5 sm:w-8 sm:h-6"
                } shrink-0 transition-transform duration-200 hover:scale-105`}
              />
              <span
                className={`font-extrabold text-white tracking-tight leading-none ${
                  compact
                    ? "text-xl sm:text-2xl mt-1"
                    : "text-2xl sm:text-3xl mt-1.5"
                }`}
              >
                {loading ? "—" : safeTotal}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium text-slate-400 mt-1 leading-none tracking-wide">
                Total Solved
              </span>
            </div>
          </div>
        </div>

        {/* Divider 1 */}
        <div className="hidden sm:block w-[1px] h-16 sm:h-20 bg-gradient-to-b from-transparent via-slate-700/60 to-transparent shrink-0" />

        {/* ========================================================
            MIDDLE SECTION: 3 Difficulty Cards (Easy, Medium, Hard)
           ======================================================== */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-3.5 mx-auto sm:mx-0 shrink-0">
          {/* 1. EASY CARD (Cyan / Teal) */}
          <div
            className={`group relative flex flex-col items-center justify-center rounded-[20px] sm:rounded-[22px] border border-[#00f5c4]/45 bg-gradient-to-b from-[#0f3a35]/95 via-[#06221f]/95 to-[#031513]/98 p-2 text-center shadow-[0_0_24px_-4px_rgba(0,245,196,0.28),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_32px_-2px_rgba(0,245,196,0.45)] hover:border-[#00f5c4]/70 ${
              compact
                ? "w-[66px] h-[82px] sm:w-[76px] sm:h-[88px]"
                : "w-[76px] h-[88px] sm:w-[88px] sm:h-[96px]"
            }`}
          >
            <LightningBolt3DIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span
              className={`font-extrabold text-white leading-none tracking-tight ${
                compact ? "text-lg sm:text-xl mt-1" : "text-xl sm:text-2xl mt-1 sm:mt-1.5"
              }`}
            >
              {loading ? "—" : easySolved}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-300 mt-1 leading-none">
              Easy
            </span>
          </div>

          {/* 2. MEDIUM CARD (Amber / Gold) */}
          <div
            className={`group relative flex flex-col items-center justify-center rounded-[20px] sm:rounded-[22px] border border-[#f59e0b]/45 bg-gradient-to-b from-[#422907]/95 via-[#231502]/95 to-[#140b01]/98 p-2 text-center shadow-[0_0_24px_-4px_rgba(245,158,11,0.28),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_32px_-2px_rgba(245,158,11,0.45)] hover:border-[#f59e0b]/70 ${
              compact
                ? "w-[66px] h-[82px] sm:w-[76px] sm:h-[88px]"
                : "w-[76px] h-[88px] sm:w-[88px] sm:h-[96px]"
            }`}
          >
            <Layers3DIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span
              className={`font-extrabold text-white leading-none tracking-tight ${
                compact ? "text-lg sm:text-xl mt-1" : "text-xl sm:text-2xl mt-1 sm:mt-1.5"
              }`}
            >
              {loading ? "—" : mediumSolved}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-300 mt-1 leading-none">
              Medium
            </span>
          </div>

          {/* 3. HARD CARD (Crimson / Ruby) */}
          <div
            className={`group relative flex flex-col items-center justify-center rounded-[20px] sm:rounded-[22px] border border-[#f43f5e]/45 bg-gradient-to-b from-[#3f0f18]/95 via-[#23060d]/95 to-[#130306]/98 p-2 text-center shadow-[0_0_24px_-4px_rgba(244,63,94,0.28),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_0_32px_-2px_rgba(244,63,94,0.45)] hover:border-[#f43f5e]/70 ${
              compact
                ? "w-[66px] h-[82px] sm:w-[76px] sm:h-[88px]"
                : "w-[76px] h-[88px] sm:w-[88px] sm:h-[96px]"
            }`}
          >
            <Flag3DIcon className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span
              className={`font-extrabold text-white leading-none tracking-tight ${
                compact ? "text-lg sm:text-xl mt-1" : "text-xl sm:text-2xl mt-1 sm:mt-1.5"
              }`}
            >
              {loading ? "—" : hardSolved}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-300 mt-1 leading-none">
              Hard
            </span>
          </div>
        </div>

        {/* Divider 2 */}
        <div className="hidden sm:block w-[1px] h-16 sm:h-20 bg-gradient-to-b from-transparent via-slate-700/60 to-transparent shrink-0" />

        {/* ========================================================
            RIGHT SECTION: Global Ranking Card (Trophy with Laurels)
           ======================================================== */}
        <div className="w-full sm:w-auto shrink-0 flex items-center justify-center mx-auto sm:mx-0">
          <div
            className={`group relative flex items-center justify-between sm:justify-start gap-2.5 sm:gap-3.5 rounded-[22px] sm:rounded-[26px] border border-[#a855f7]/45 bg-gradient-to-b from-[#221445]/95 via-[#140c2c]/95 to-[#0b061b]/98 shadow-[0_0_28px_-4px_rgba(168,85,247,0.32),inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_36px_-2px_rgba(168,85,247,0.48)] hover:border-[#a855f7]/70 ${
              compact
                ? "h-[82px] sm:h-[88px] px-3.5 sm:px-4 py-2"
                : "h-[88px] sm:h-[96px] px-4 sm:px-6 py-3"
            }`}
          >
            {/* 3D Golden Trophy with Laurel Wreath */}
            <div className="shrink-0 flex items-center justify-center">
              <TrophyLaurel3DIcon
                className={`${
                  compact ? "w-10 h-10 sm:w-11 sm:h-11" : "w-12 h-11 sm:w-14 sm:h-12"
                } transition-transform duration-200 group-hover:scale-105`}
              />
            </div>

            {/* Subtle Vertical Divider */}
            <div className="w-[1px] h-9 sm:h-11 bg-white/15 shrink-0" />

            {/* Ranking Number & Label */}
            <div className="flex flex-col text-left pr-1 min-w-0">
              <span
                className={`font-extrabold text-white tracking-tight leading-none truncate ${
                  compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
                }`}
              >
                {loading ? "—" : formattedRanking}
              </span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-300/80 mt-1 sm:mt-1.5 leading-none tracking-wide">
                Global Ranking
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
