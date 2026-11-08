"use client";

import React from "react";

// =========================================================================
// 3D ICONS - PIXEL-PERFECT ASSETS
// =========================================================================

/**
 * 3D Open Laptop with </> code on screen matching reference design
 */
export function LaptopCode3D({ className = "w-8 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="laptopLidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3d4966" />
          <stop offset="25%" stopColor="#252f44" />
          <stop offset="100%" stopColor="#141a27" />
        </linearGradient>
        <linearGradient id="laptopScreenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b101c" />
          <stop offset="100%" stopColor="#05080e" />
        </linearGradient>
        <linearGradient id="laptopBaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="laptopDropShadow" x="-20%" y="-10%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="2" floodColor="#000000" floodOpacity="0.65" />
        </filter>
      </defs>

      {/* Ambient shadow beneath laptop */}
      <ellipse cx="27" cy="37.5" rx="23" ry="2.5" fill="#000000" opacity="0.6" filter="blur(1.5px)" />

      {/* Screen Lid (3D Bevel Box) */}
      <g filter="url(#laptopDropShadow)">
        {/* Outer Lid Frame */}
        <rect
          x="8.5"
          y="4"
          width="37"
          height="25"
          rx="3.5"
          fill="url(#laptopLidGrad)"
          stroke="#475569"
          strokeWidth="0.9"
        />
        {/* Specular top highlight */}
        <path d="M12 4.6H42" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />

        {/* Inner OLED Display */}
        <rect x="11" y="6.5" width="32" height="19.5" rx="2" fill="url(#laptopScreenGrad)" />

        {/* Code </> Brackets on Screen */}
        <path
          d="M21.5 12.5L16.5 16L21.5 19.5M32.5 12.5L37.5 16L32.5 19.5M28.5 11L25.5 21"
          stroke="#ffffff"
          strokeWidth="2.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Laptop Keyboard Deck (Front 3D Wedge) */}
      <path
        d="M4.5 28C4.5 26.6 5.6 25.5 7 25.5H47C48.4 25.5 49.5 26.6 49.5 28L48 33.5C47.7 34.7 46.6 35.5 45.4 35.5H8.6C7.4 35.5 6.3 34.7 6 33.5L4.5 28Z"
        fill="url(#laptopBaseGrad)"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      {/* Front Edge Bevel */}
      <path d="M8 35H46" stroke="#ffffff" strokeWidth="0.75" opacity="0.5" />
      {/* Trackpad Notch */}
      <rect x="23" y="26.2" width="8" height="1.6" rx="0.8" fill="#1e293b" opacity="0.8" />
    </svg>
  );
}

/**
 * 3D Mint-Cyan Glowing Lightning Bolt (Easy)
 */
export function LightningBolt3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="boltFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#67e8f9" />
          <stop offset="40%" stopColor="#00f5c4" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="boltSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#064e3b" />
        </linearGradient>
        <filter id="boltNeonBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#00f5c4" floodOpacity="0.85" />
        </filter>
      </defs>

      <g filter="url(#boltNeonBloom)">
        {/* 3D Depth Extrusion */}
        <path
          d="M21 3L9 18.5H18.5L16 33L28 16.5H19L21 3Z"
          fill="url(#boltSide)"
          transform="translate(1, 1)"
        />
        {/* Main Front Face */}
        <path
          d="M21 3L9 18.5H18.5L16 33L28 16.5H19L21 3Z"
          fill="url(#boltFront)"
        />
        {/* Specular Ridge Line */}
        <path
          d="M21 3L9 18.5H18.5L16 33"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

/**
 * 3D Isometric Stacked Golden Layers (Medium)
 */
export function Layers3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="layerTopFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="45%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
        <linearGradient id="layerMidFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="layerBotFace" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <filter id="layerAmberBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#f59e0b" floodOpacity="0.8" />
        </filter>
      </defs>

      <g filter="url(#layerAmberBloom)">
        {/* BOTTOM LAYER */}
        <path d="M18 26.5L7 21.5L18 16.5L29 21.5L18 26.5Z" fill="url(#layerBotFace)" />
        <path d="M7 21.5L18 26.5L29 21.5V23.5L18 28.5L7 23.5V21.5Z" fill="#78350f" />

        {/* MIDDLE LAYER */}
        <path d="M18 20.5L7 15.5L18 10.5L29 15.5L18 20.5Z" fill="url(#layerMidFace)" />
        <path d="M7 15.5L18 20.5L29 15.5V17.5L18 22.5L7 17.5V15.5Z" fill="#92400e" />

        {/* TOP LAYER */}
        <path
          d="M18 14.5L7 9.5L18 4.5L29 9.5L18 14.5Z"
          fill="url(#layerTopFace)"
          stroke="#fffbeb"
          strokeWidth="0.8"
        />
        <path d="M7 9.5L18 14.5L29 9.5V11.5L18 16.5L7 11.5V9.5Z" fill="#b45309" />
        {/* Centerline shine */}
        <path d="M7 9.5L18 14.5L29 9.5" stroke="#ffffff" strokeWidth="1" opacity="0.65" />
      </g>
    </svg>
  );
}

/**
 * 3D Waving Crimson Pennant Flag (Hard)
 */
export function Flag3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="flagCloth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fda4af" />
          <stop offset="30%" stopColor="#f43f5e" />
          <stop offset="75%" stopColor="#e11d48" />
          <stop offset="100%" stopColor="#9f1239" />
        </linearGradient>
        <linearGradient id="flagPoleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <filter id="flagCrimsonBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#f43f5e" floodOpacity="0.8" />
        </filter>
      </defs>

      <g filter="url(#flagCrimsonBloom)">
        {/* Flag Pole */}
        <rect x="7" y="4.5" width="2.8" height="27" rx="1.4" fill="url(#flagPoleGrad)" />
        {/* Golden Finial Ball on top */}
        <circle cx="8.4" cy="4.5" r="2.2" fill="#fef08a" stroke="#d97706" strokeWidth="0.6" />

        {/* 3D Pennant Flag Body */}
        <path
          d="M9.8 6.5L29 13.5C29.8 13.8 29.8 14.8 29 15.1L9.8 22V6.5Z"
          fill="url(#flagCloth)"
        />

        {/* 3D Wave Ripple Highlight */}
        <path
          d="M9.8 6.5Q19 11 29 14.3"
          stroke="#ffe4e6"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* Shadow crease */}
        <path
          d="M10 20Q18 16 27 15"
          stroke="#881337"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </g>
    </svg>
  );
}

/**
 * 3D Golden Trophy with Laurel Wreath (Global Ranking)
 */
export function TrophyLaurel3D({ className = "w-14 h-13" }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 50" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="goldCupGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="25%" stopColor="#fbbf24" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="goldShine" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="laurelLeafGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <filter id="trophyGoldBloom" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.8" floodColor="#f59e0b" floodOpacity="0.75" />
        </filter>
      </defs>

      <g filter="url(#trophyGoldBloom)">
        {/* LEFT LAUREL LEAVES & STEM */}
        <g fill="url(#laurelLeafGrad)">
          <path d="M13.5 17.5C11.5 15.8 8.8 18.5 11 20.8C13.2 21.8 15.2 19 13.5 17.5Z" />
          <path d="M10.8 23.5C8.8 22.2 6.5 25.5 8.8 27.8C11 28.8 12.5 26.2 10.8 23.5Z" />
          <path d="M11 30C9.2 29.2 7.8 32.5 10 34.2C12.2 35.2 13.2 32.8 11 30Z" />
          <path d="M13.5 36.5C12.2 35.8 11.2 39 13.5 40.2C15.8 41.2 16.5 38.5 13.5 36.5Z" />
          <path
            d="M15.5 15C11 23 11 34 19 41.5"
            stroke="url(#laurelLeafGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* RIGHT LAUREL LEAVES & STEM */}
        <g fill="url(#laurelLeafGrad)">
          <path d="M44.5 17.5C46.5 15.8 49.2 18.5 47 20.8C44.8 21.8 42.8 19 44.5 17.5Z" />
          <path d="M47.2 23.5C49.2 22.2 51.5 25.5 49.2 27.8C47 28.8 45.5 26.2 47.2 23.5Z" />
          <path d="M47 30C48.8 29.2 50.2 32.5 48 34.2C45.8 35.2 44.8 32.8 47 30Z" />
          <path d="M44.5 36.5C45.8 35.8 46.8 39 44.5 40.2C42.2 41.2 41.5 38.5 44.5 36.5Z" />
          <path
            d="M42.5 15C47 23 47 34 39 41.5"
            stroke="url(#laurelLeafGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* TROPHY HANDLES */}
        <path
          d="M20 14C14 14 14 24 20 24"
          stroke="url(#goldCupGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M38 14C44 14 44 24 38 24"
          stroke="url(#goldCupGrad)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* TROPHY CUP BODY */}
        <path
          d="M20 11H38V20C38 25 34 29 29 29C24 29 20 25 20 20V11Z"
          fill="url(#goldCupGrad)"
        />

        {/* Top Rim of Cup */}
        <ellipse cx="29" cy="11" rx="9" ry="2" fill="#fef08a" />

        {/* Embossed Star on Cup */}
        <path
          d="M29 15.5L30.2 18.2H33L30.8 19.8L31.6 22.5L29 20.8L26.4 22.5L27.2 19.8L25 18.2H27.8L29 15.5Z"
          fill="#ffffff"
          opacity="0.95"
        />

        {/* Specular Cup Edge Reflection */}
        <path
          d="M22 13V20C22 23 24 25.5 26 26.5"
          stroke="url(#goldShine)"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
        />

        {/* Stem & Pedestal Base */}
        <path d="M26.8 29H31.2V34.5H26.8V29Z" fill="url(#goldCupGrad)" />
        <path d="M23.5 34.5H34.5L36.5 39.5H21.5L23.5 34.5Z" fill="url(#goldCupGrad)" />
        {/* Base Bottom Plate */}
        <rect x="20" y="39.5" width="18" height="3.5" rx="1.7" fill="#b45309" stroke="#f59e0b" strokeWidth="0.6" />
      </g>
    </svg>
  );
}

// =========================================================================
// MAIN BANNER COMPONENT
// =========================================================================

export interface LeetcodeStatsBannerProps {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number | null;
  loading?: boolean;
  className?: string;
}

export function LeetcodeStatsBanner({
  totalSolved = 0,
  easySolved = 0,
  mediumSolved = 0,
  hardSolved = 0,
  ranking,
  loading = false,
  className = "",
}: LeetcodeStatsBannerProps) {
  // Radius and circumference for 3D toroidal ring
  const radius = 50;
  const circumference = 2 * Math.PI * radius; // ~314.16

  // In Image 2, the glowing cyan-purple arc spans ~38% of the circle from 11:30 to 4:30
  const safeTotal = totalSolved || 0;
  // Calculate dynamic arc: smoothly advances as user solves problems, with minimum visible neon arc
  const arcRatio = Math.max(0.22, Math.min(0.9, safeTotal > 0 ? 0.22 + (safeTotal / 100) * 0.45 : 0.22));
  const strokeDashoffset = circumference - circumference * arcRatio;

  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  return (
    <div
      className={`relative w-full rounded-[38px] sm:rounded-[44px] border-[1.5px] border-[#22293b] bg-gradient-to-b from-[#111624] via-[#0b0e18] to-[#070912] p-4 sm:p-6 md:p-7 shadow-[0_24px_65px_-12px_rgba(0,0,0,0.85),inset_0_1.5px_1.5px_rgba(255,255,255,0.12)] overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Specular Top Edge Light Highlight */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

      {/* Atmospheric neon back-glow */}
      <div className="absolute -top-24 left-1/4 w-80 h-40 bg-cyan-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-80 h-40 bg-purple-600/20 blur-3xl rounded-full pointer-events-none" />

      {/* Main Horizontal Flex Layout matching Image 2 */}
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-5 sm:gap-6 md:gap-7">
        
        {/* ========================================================
            1. LEFT: 3D Toroidal Donut Ring (Total Solved)
           ======================================================== */}
        <div className="flex items-center justify-center shrink-0">
          <div className="relative flex items-center justify-center w-[136px] h-[136px] sm:w-[146px] sm:h-[146px]">
            {/* SVG 3D Donut Ring */}
            <svg
              className="w-full h-full -rotate-90 overflow-visible"
              viewBox="0 0 120 120"
            >
              <defs>
                {/* Active Arc Gradient: Bright Cyan -> Electric Teal -> Vivid Purple */}
                <linearGradient id="neonArcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f5c4" />
                  <stop offset="40%" stopColor="#06b6d4" />
                  <stop offset="75%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#c084fc" />
                </linearGradient>

                {/* 3D Inactive Ring Gradient (gunmetal tube with top sheen) */}
                <linearGradient id="torusBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2e384d" />
                  <stop offset="50%" stopColor="#1a2030" />
                  <stop offset="100%" stopColor="#0f131d" />
                </linearGradient>

                {/* Neon Bloom Filters */}
                <filter id="arcGlowWide" x="-40%" y="-40%" width="180%" height="180%">
                  <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#00f5c4" floodOpacity="0.8" />
                  <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#8b5cf6" floodOpacity="0.65" />
                </filter>
              </defs>

              {/* Inactive 3D Toroidal Tube Track */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="url(#torusBaseGrad)"
                strokeWidth="15"
                fill="none"
              />

              {/* Inactive Tube Inner Shadow / Bevel */}
              <circle
                cx="60"
                cy="60"
                r={radius - 7.5}
                stroke="#090d16"
                strokeWidth="1.5"
                fill="none"
                opacity="0.8"
              />
              <circle
                cx="60"
                cy="60"
                r={radius + 7.5}
                stroke="#ffffff"
                strokeWidth="0.8"
                fill="none"
                opacity="0.12"
              />

              {/* Glowing Active Neon Arc */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="url(#neonArcGrad)"
                strokeWidth="15"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                filter="url(#arcGlowWide)"
                className="transition-all duration-700 ease-out"
              />

              {/* Centerline 3D Specular Highlight on Arc */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset + 2}
                strokeLinecap="round"
                fill="none"
                opacity="0.55"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Content: 3D Laptop + Bold Number + "Total Solved" */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-1">
              <LaptopCode3D className="w-8 h-6 sm:w-9 sm:h-7 shrink-0 transition-transform duration-200 hover:scale-105" />
              <span className="font-black text-2xl sm:text-3xl text-white tracking-tight leading-none mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {loading ? "—" : safeTotal}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-400 mt-1 leading-none tracking-wide">
                Total Solved
              </span>
            </div>
          </div>
        </div>

        {/* Hairline Divider 1 */}
        <div className="hidden xl:block w-[1.5px] h-20 bg-gradient-to-b from-transparent via-[#2a344d]/70 to-transparent shrink-0" />

        {/* ========================================================
            2. MIDDLE: 3 Glowing Squircle Cards (Easy, Medium, Hard)
           ======================================================== */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 w-full sm:w-auto shrink-0">
          
          {/* EASY SQUIRCLE (Cyan / Aquamarine) */}
          <div className="group relative flex flex-col items-center justify-center w-[84px] h-[96px] sm:w-[94px] sm:h-[104px] rounded-[24px] sm:rounded-[26px] border-[1.5px] border-[#00f5c4] bg-gradient-to-b from-[#0f443b] via-[#072c26] to-[#041916] p-2 text-center shadow-[0_0_35px_-2px_rgba(0,245,196,0.55),0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_45px_0px_rgba(0,245,196,0.7)]">
            <LightningBolt3D className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-black text-2xl sm:text-3xl text-white leading-none mt-1 sm:mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : easySolved}
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-200 mt-1 leading-none">
              Easy
            </span>
          </div>

          {/* MEDIUM SQUIRCLE (Warm Amber / Gold) */}
          <div className="group relative flex flex-col items-center justify-center w-[84px] h-[96px] sm:w-[94px] sm:h-[104px] rounded-[24px] sm:rounded-[26px] border-[1.5px] border-[#f59e0b] bg-gradient-to-b from-[#482e05] via-[#281902] to-[#150d01] p-2 text-center shadow-[0_0_35px_-2px_rgba(245,158,11,0.55),0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_45px_0px_rgba(245,158,11,0.7)]">
            <Layers3D className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-black text-2xl sm:text-3xl text-white leading-none mt-1 sm:mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : mediumSolved}
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-200 mt-1 leading-none">
              Medium
            </span>
          </div>

          {/* HARD SQUIRCLE (Crimson / Ruby) */}
          <div className="group relative flex flex-col items-center justify-center w-[84px] h-[96px] sm:w-[94px] sm:h-[104px] rounded-[24px] sm:rounded-[26px] border-[1.5px] border-[#f43f5e] bg-gradient-to-b from-[#460c17] via-[#26050c] to-[#140205] p-2 text-center shadow-[0_0_35px_-2px_rgba(244,63,94,0.55),0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_45px_0px_rgba(244,63,94,0.7)]">
            <Flag3D className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-black text-2xl sm:text-3xl text-white leading-none mt-1 sm:mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : hardSolved}
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-200 mt-1 leading-none">
              Hard
            </span>
          </div>
        </div>

        {/* Hairline Divider 2 */}
        <div className="hidden xl:block w-[1.5px] h-20 bg-gradient-to-b from-transparent via-[#2a344d]/70 to-transparent shrink-0" />

        {/* ========================================================
            3. RIGHT: Global Ranking Pill (Trophy with Laurels)
           ======================================================== */}
        <div className="w-full sm:w-auto shrink-0 flex items-center justify-center">
          <div className="group relative flex items-center justify-between sm:justify-start gap-3 sm:gap-4 px-5 sm:px-6 py-3.5 h-[96px] sm:h-[104px] w-full sm:w-auto rounded-[28px] sm:rounded-[30px] border-[1.5px] border-[#a855f7] bg-gradient-to-b from-[#2a1650] via-[#160b2d] to-[#0c051a] shadow-[0_0_40px_-2px_rgba(168,85,247,0.55),0_8px_24px_-4px_rgba(0,0,0,0.7),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_50px_0px_rgba(168,85,247,0.75)]">
            {/* 3D Golden Trophy with Laurel Wreaths */}
            <div className="shrink-0 flex items-center justify-center">
              <TrophyLaurel3D className="w-13 h-12 sm:w-15 sm:h-13 transition-transform duration-200 group-hover:scale-105" />
            </div>

            {/* Crisp Vertical Divider */}
            <div className="w-[1.5px] h-10 sm:h-12 bg-white/20 shrink-0" />

            {/* Ranking Number & Subtitle */}
            <div className="flex flex-col text-left pr-1 min-w-0">
              <span className="font-black text-2xl sm:text-3xl text-white tracking-tight leading-none truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {loading ? "—" : formattedRanking}
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-slate-300 mt-1.5 leading-none tracking-wide">
                Global Ranking
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
