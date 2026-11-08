"use client";

import React from "react";

export interface LeetcodeStatsBannerProps {
  totalSolved?: number;
  easySolved?: number;
  mediumSolved?: number;
  hardSolved?: number;
  ranking?: number | null;
  loading?: boolean;
  className?: string;
}

/**
 * Pixel-Perfect Cyber-Glassmorphic LeetCode Stats Banner matching uploaded design:
 * - Left: Circular cyber HUD dial with dynamic real-time progress arc, 3D laptop with </> screen, live total solved count.
 * - Center: 3 circuit wires with glowing junction nodes connecting directly to 3 glass pills (Easy, Medium, Hard).
 *   In each pill, the question count is vertically centered, with a real continuous progress line underneath the label.
 * - Right: Hexagonal glass shield with an enlarged realistic 3D golden/lime trophy with laurel wreath, 3D bottom chevron bevel, and live real-time global ranking.
 */
export function LeetcodeStatsBanner({
  totalSolved = 0,
  easySolved = 0,
  mediumSolved = 0,
  hardSolved = 0,
  ranking,
  loading = false,
  className = "",
}: LeetcodeStatsBannerProps) {
  const safeTotal = totalSolved ?? 0;
  const safeEasy = easySolved ?? 0;
  const safeMedium = mediumSolved ?? 0;
  const safeHard = hardSolved ?? 0;

  // Format real-time global ranking
  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  // =========================================================================
  // REAL-TIME PROGRESS CALCULATIONS
  // =========================================================================

  // Circular Dial: 270° arc from (86, 329) to (284, 329), total length = 659.7px
  const totalArcLength = 659.73;
  // Adaptive milestone target (e.g. 50, 100, 150, 200...)
  const totalGoal = Math.max(100, Math.ceil(safeTotal / 50) * 50);
  const circlePct = safeTotal > 0 ? Math.min(1, safeTotal / totalGoal) : 0;
  // Lit arc length for stroke-dasharray (minimum 18px if at least 1 problem is solved)
  const litArcLength = safeTotal > 0 ? Math.max(18, Math.round(circlePct * totalArcLength)) : 0;
  const topAccentOpacity = circlePct > 0.4 ? Math.min(1, (circlePct - 0.4) / 0.4) : 0.2;

  // Real progress lines for Easy, Medium, Hard (bar track width = 145px)
  const progressBarWidth = 145;
  const easyTarget = Math.max(50, Math.ceil(safeEasy / 50) * 50);
  const medTarget = Math.max(50, Math.ceil(safeMedium / 50) * 50);
  const hardTarget = Math.max(20, Math.ceil(safeHard / 20) * 20);

  const easyLineWidth = safeEasy > 0 ? Math.max(10, Math.min(progressBarWidth, Math.round((safeEasy / easyTarget) * progressBarWidth))) : 0;
  const medLineWidth = safeMedium > 0 ? Math.max(10, Math.min(progressBarWidth, Math.round((safeMedium / medTarget) * progressBarWidth))) : 0;
  const hardLineWidth = safeHard > 0 ? Math.max(10, Math.min(progressBarWidth, Math.round((safeHard / hardTarget) * progressBarWidth))) : 0;

  return (
    <div className={`relative w-full max-w-[1040px] mx-auto select-none overflow-visible ${className}`}>
      {/* Subtle Ambient Background Cyber Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-40 bg-lime-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Unified Proportional SVG Canvas */}
      <svg
        viewBox="0 0 1024 450"
        className="w-full h-auto overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Neon Arcs & Accents */}
          <linearGradient id="dialNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e3f610" />
            <stop offset="40%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#00f5c4" />
          </linearGradient>

          {/* Translucent Emerald Glass Backgrounds */}
          <radialGradient id="dialCoreGrad" cx="45%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#0a3524" />
            <stop offset="60%" stopColor="#031b12" />
            <stop offset="100%" stopColor="#010e08" />
          </radialGradient>

          <linearGradient id="dialGrooveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e3d2b" />
            <stop offset="50%" stopColor="#041810" />
            <stop offset="100%" stopColor="#072b1c" />
          </linearGradient>

          <linearGradient id="pillGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#073322" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#02140c" stopOpacity="0.95" />
          </linearGradient>

          <linearGradient id="litSegmentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#e3f610" />
          </linearGradient>

          <linearGradient id="shieldGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#083827" stopOpacity="0.82" />
            <stop offset="50%" stopColor="#031c12" stopOpacity="0.94" />
            <stop offset="100%" stopColor="#02120b" stopOpacity="0.98" />
          </linearGradient>

          <linearGradient id="chevronBevelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#e3f610" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          <linearGradient id="trophyGoldLimeBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fef08a" />
            <stop offset="55%" stopColor="#bef264" />
            <stop offset="85%" stopColor="#84cc16" />
            <stop offset="100%" stopColor="#3f6212" />
          </linearGradient>

          <linearGradient id="laurelLeafGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#bef264" />
            <stop offset="70%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="dialArcGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6.5" floodColor="#bef264" floodOpacity="0.95" />
          </filter>
          <filter id="dialPeakGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#e3f610" floodOpacity="1" />
          </filter>
          <filter id="wireGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4ade80" floodOpacity="0.95" />
          </filter>
          <filter id="nodeHalo" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#bef264" floodOpacity="1" />
          </filter>
          <filter id="segmentGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4ade80" floodOpacity="0.95" />
          </filter>
          <filter id="bevelGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#bef264" floodOpacity="0.95" />
          </filter>
          <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#22c55e" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* ========================================================
            1. LEFT: CYBER DIAL (Total Solved with Real Progress Arc)
           ======================================================== */}
        <g id="cyber-dial">
          {/* Groove Ring */}
          <circle cx="185" cy="230" r="142" stroke="url(#dialGrooveGrad)" strokeWidth="15" fill="none" />
          <circle cx="185" cy="230" r="150" stroke="rgba(74, 222, 128, 0.35)" strokeWidth="1.6" fill="none" />

          {/* Full Circular Track Arc Background (270° from 7:30 to 4:30) */}
          <path
            d="M 86 329 A 140 140 0 1 1 284 329"
            stroke="rgba(14, 61, 43, 0.55)"
            strokeWidth="14"
            strokeLinecap="round"
            fill="none"
          />

          {/* Real Dynamic Neon Progress Arc */}
          <path
            d="M 86 329 A 140 140 0 1 1 284 329"
            stroke="url(#dialNeonGrad)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={`${litArcLength} ${totalArcLength}`}
            fill="none"
            filter="url(#dialArcGlow)"
          />
          <path
            d="M 86 329 A 140 140 0 1 1 284 329"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={`${litArcLength} ${totalArcLength}`}
            fill="none"
            opacity="0.65"
          />

          {/* Top Neon Accent Arc (Illuminates brighter with progress) */}
          <path
            d="M 125 104 A 140 140 0 0 1 245 104"
            stroke="#e3f610"
            strokeWidth="13"
            strokeLinecap="round"
            fill="none"
            filter="url(#dialPeakGlow)"
            opacity={topAccentOpacity}
          />

          {/* Inner Glass Core Disk */}
          <circle cx="185" cy="230" r="114" fill="url(#dialCoreGrad)" stroke="rgba(74, 222, 128, 0.55)" strokeWidth="2.5" />
          <path d="M 115 150 A 114 114 0 0 1 245 145" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
          <ellipse cx="140" cy="154" rx="22" ry="6" fill="#ffffff" opacity="0.35" transform="rotate(-25 140 154)" filter="blur(1px)" />

          {/* 3D Open Laptop directly above the number */}
          <g id="laptop" transform="translate(156, 142)">
            <ellipse cx="29" cy="38" rx="26" ry="3" fill="#000000" opacity="0.7" filter="blur(1.5px)" />
            {/* Lid */}
            <rect x="9" y="3" width="40" height="27" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
            <line x1="13" y1="4.5" x2="45" y2="4.5" stroke="#ffffff" strokeWidth="0.9" opacity="0.5" />
            {/* OLED Screen */}
            <rect x="11.5" y="5.5" width="35" height="22" rx="2.5" fill="#020617" />
            {/* Glowing Code </> */}
            <path d="M 23 11.5 L 18 15.5 L 23 19.5" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 35 11.5 L 40 15.5 L 35 19.5" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="31" y1="10" x2="27" y2="21" stroke="#4ade80" strokeWidth="2.2" strokeLinecap="round" />
            {/* Deck */}
            <path d="M 4 29 C 4 27.6 5.1 26.5 6.5 26.5 H 51.5 C 52.9 26.5 54 27.6 54 29 L 52.5 35 C 52.2 36.2 51.1 37 49.9 37 H 8.1 C 6.9 37 5.8 36.2 5.5 35 L 4 29 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
            <line x1="8" y1="36.5" x2="50" y2="36.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
            <rect x="24.5" y="27.5" width="9" height="1.8" rx="0.9" fill="#1e293b" opacity="0.8" />
          </g>

          {/* Big Number (Real-Time Total Solved) */}
          <text
            x="185"
            y="246"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
            fontSize="64"
            fontWeight="900"
            letterSpacing="-1.5"
            filter="drop-shadow(0 2px 8px rgba(0,0,0,0.9))"
          >
            {loading ? "—" : safeTotal}
          </text>

          {/* Label */}
          <text
            x="185"
            y="278"
            textAnchor="middle"
            fill="#d1fae5"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
            fontSize="18"
            fontWeight="700"
            letterSpacing="0.4"
          >
            Total Solved
          </text>
        </g>

        {/* ========================================================
            2. CIRCUIT WIRES & NODES (Connecting Dial to Pills)
           ======================================================== */}
        <g id="circuit-wires">
          {/* Branch 1: to Easy Pill */}
          <path
            d="M 285 200 C 305 190, 318 160, 327 138 C 336 116, 350 118, 380 118"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#wireGlow)"
          />
          <circle cx="327" cy="138" r="8" fill="#bef264" filter="url(#nodeHalo)" />
          <circle cx="327" cy="138" r="3.2" fill="#ffffff" />

          {/* Branch 2: to Medium Pill (Straight line) */}
          <line
            x1="285"
            y1="230"
            x2="380"
            y2="230"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#wireGlow)"
          />
          <circle cx="357" cy="230" r="8" fill="#bef264" filter="url(#nodeHalo)" />
          <circle cx="357" cy="230" r="3.2" fill="#ffffff" />

          {/* Branch 3: to Hard Pill */}
          <path
            d="M 285 260 C 305 270, 318 300, 326 322 C 334 344, 350 342, 380 342"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            filter="url(#wireGlow)"
          />
          <circle cx="326" cy="322" r="8" fill="#bef264" filter="url(#nodeHalo)" />
          <circle cx="326" cy="322" r="3.2" fill="#ffffff" />
        </g>

        {/* ========================================================
            3. MIDDLE: 3 DIFFICULTY PILLS (Easy, Medium, Hard)
            Number vertically centered; real progress line underneath.
           ======================================================== */}

        {/* PILL 1: EASY (Center Y = 118) */}
        <g id="pill-easy">
          <rect x="380" y="65" width="325" height="106" rx="38" fill="url(#pillGlassGrad)" stroke="rgba(74, 222, 128, 0.75)" strokeWidth="1.8" />
          <path d="M 400 67 Q 542 66, 685 67" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <ellipse cx="410" cy="80" rx="14" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(-15 410 80)" filter="blur(1px)" />

          {/* Icon Badge */}
          <circle cx="422" cy="118" r="27" fill="url(#dialCoreGrad)" stroke="rgba(74, 222, 128, 0.75)" strokeWidth="1.6" />
          {/* 3D Lightning Bolt */}
          <g transform="translate(407, 103)">
            <path d="M 18 3 L 7 16 H 15.5 L 13.5 28 L 24 14 H 16.5 L 18 3 Z" fill="#15803d" transform="translate(1, 1)" />
            <path d="M 18 3 L 7 16 H 15.5 L 13.5 28 L 24 14 H 16.5 L 18 3 Z" fill="url(#dialNeonGrad)" filter="url(#dialArcGlow)" />
            <path d="M 18 3 L 7 16 H 15.5 L 13.5 28" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
          </g>

          {/* Label */}
          <text x="466" y="106" fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700">Easy</text>

          {/* Real Continuous Progress Line */}
          <g transform="translate(466, 118)">
            {/* Background Track */}
            <rect x="0" y="0" width={progressBarWidth} height="7" rx="3.5" fill="#0d2e20" fillOpacity="0.85" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            {/* Real Illuminated Progress Line */}
            {easyLineWidth > 0 && (
              <rect x="0" y="0" width={easyLineWidth} height="7" rx="3.5" fill="url(#litSegmentGrad)" filter="url(#segmentGlow)" />
            )}
          </g>

          {/* Real-Time Solved Count (Vertically Centered in the Pill) */}
          <text
            x="672"
            y="118"
            textAnchor="end"
            dominantBaseline="central"
            fill="#ffffff"
            fontFamily="Inter, sans-serif"
            fontSize="36"
            fontWeight="900"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          >
            {loading ? "—" : safeEasy}
          </text>
        </g>

        {/* PILL 2: MEDIUM (Center Y = 230) */}
        <g id="pill-medium">
          <rect x="380" y="177" width="325" height="106" rx="38" fill="url(#pillGlassGrad)" stroke="rgba(74, 222, 128, 0.75)" strokeWidth="1.8" />
          <path d="M 400 179 Q 542 178, 685 179" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <ellipse cx="410" cy="192" rx="14" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(-15 410 192)" filter="blur(1px)" />

          {/* Icon Badge */}
          <circle cx="422" cy="230" r="27" fill="url(#dialCoreGrad)" stroke="rgba(74, 222, 128, 0.75)" strokeWidth="1.6" />
          {/* 3D Stacked Layers */}
          <g transform="translate(407, 215)">
            <path d="M 15 22 L 5 18 L 15 14 L 25 18 L 15 22 Z" fill="#bef264" />
            <path d="M 5 18 L 15 22 L 25 18 V 20 L 15 24 L 5 20 Z" fill="#3f6212" />
            <path d="M 15 17 L 5 13 L 15 9 L 25 13 L 15 17 Z" fill="#e3f610" />
            <path d="M 5 13 L 15 17 L 25 13 V 15 L 15 19 L 5 15 Z" fill="#4d7c0f" />
            <path d="M 15 12 L 5 8 L 15 4 L 25 8 L 15 12 Z" fill="#fef08a" stroke="#ffffff" strokeWidth="0.6" />
            <path d="M 5 8 L 15 12 L 25 8 V 10 L 15 14 L 5 10 Z" fill="#65a30d" />
          </g>

          {/* Label */}
          <text x="466" y="218" fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700">Medium</text>

          {/* Real Continuous Progress Line */}
          <g transform="translate(466, 230)">
            {/* Background Track */}
            <rect x="0" y="0" width={progressBarWidth} height="7" rx="3.5" fill="#0d2e20" fillOpacity="0.85" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            {/* Real Illuminated Progress Line */}
            {medLineWidth > 0 && (
              <rect x="0" y="0" width={medLineWidth} height="7" rx="3.5" fill="url(#litSegmentGrad)" filter="url(#segmentGlow)" />
            )}
          </g>

          {/* Real-Time Solved Count (Vertically Centered in the Pill) */}
          <text
            x="672"
            y="230"
            textAnchor="end"
            dominantBaseline="central"
            fill="#ffffff"
            fontFamily="Inter, sans-serif"
            fontSize="36"
            fontWeight="900"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          >
            {loading ? "—" : safeMedium}
          </text>
        </g>

        {/* PILL 3: HARD (Center Y = 342) */}
        <g id="pill-hard">
          <rect x="380" y="289" width="325" height="106" rx="38" fill="url(#pillGlassGrad)" stroke="rgba(74, 222, 128, 0.75)" strokeWidth="1.8" />
          <path d="M 400 291 Q 542 290, 685 291" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
          <ellipse cx="410" cy="304" rx="14" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(-15 410 304)" filter="blur(1px)" />

          {/* Icon Badge */}
          <circle cx="422" cy="342" r="27" fill="url(#dialCoreGrad)" stroke="rgba(74, 222, 128, 0.75)" strokeWidth="1.6" />
          {/* 3D Pennant Flag */}
          <g transform="translate(407, 327)">
            <rect x="6" y="3" width="2.4" height="23" rx="1.2" fill="#cbd5e1" />
            <circle cx="7.2" cy="3" r="1.8" fill="#fef08a" stroke="#84cc16" strokeWidth="0.5" />
            <path d="M 8.4 5 L 24 11 C 24.8 11.3 24.8 12.3 24 12.6 L 8.4 18.5 Z" fill="url(#litSegmentGrad)" filter="url(#segmentGlow)" />
            <path d="M 8.4 5 Q 16 9 24 12" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.85" />
          </g>

          {/* Label */}
          <text x="466" y="330" fill="#ffffff" fontFamily="Inter, sans-serif" fontSize="20" fontWeight="700">Hard</text>

          {/* Real Continuous Progress Line */}
          <g transform="translate(466, 342)">
            {/* Background Track */}
            <rect x="0" y="0" width={progressBarWidth} height="7" rx="3.5" fill="#0d2e20" fillOpacity="0.85" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
            {/* Real Illuminated Progress Line */}
            {hardLineWidth > 0 && (
              <rect x="0" y="0" width={hardLineWidth} height="7" rx="3.5" fill="url(#litSegmentGrad)" filter="url(#segmentGlow)" />
            )}
          </g>

          {/* Real-Time Solved Count (Vertically Centered in the Pill) */}
          <text
            x="672"
            y="342"
            textAnchor="end"
            dominantBaseline="central"
            fill="#ffffff"
            fontFamily="Inter, sans-serif"
            fontSize="36"
            fontWeight="900"
            filter="drop-shadow(0 2px 4px rgba(0,0,0,0.8))"
          >
            {loading ? "—" : safeHard}
          </text>
        </g>

        {/* ========================================================
            4. RIGHT: GLOBAL RANKING SHIELD (With Enlarged Realistic Trophy)
           ======================================================== */}
        <g id="shield">
          <path
            d="M 745 65 L 975 65 Q 1005 65, 1005 92 L 1005 340 L 860 415 L 715 340 L 715 92 Q 715 65, 745 65 Z"
            fill="url(#shieldGlassGrad)"
            stroke="rgba(74, 222, 128, 0.75)"
            strokeWidth="2.2"
            filter="url(#shieldGlow)"
          />
          {/* Specular highlights on shield shoulder */}
          <path d="M 745 68 L 975 68" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
          <path d="M 718 96 Q 718 68, 748 68" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" fill="none" opacity="0.65" />
          <ellipse cx="742" cy="78" rx="14" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(-30 742 78)" filter="blur(1px)" />

          {/* Raised 3D Neon Lime Chevron Bevel along bottom V-edge */}
          <path
            d="M 718 340 L 860 413 L 1002 340 L 992 328 L 860 398 L 728 328 Z"
            fill="url(#chevronBevelGrad)"
            filter="url(#bevelGlow)"
          />
          <line x1="860" y1="398" x2="860" y2="413" stroke="#ffffff" strokeWidth="2" opacity="0.85" />

          {/* ENLARGED 3D Golden-Lime Trophy with Full Laurel Wreath (Scaled up ~1.85x) */}
          <g id="trophy-enlarged" transform="translate(758, 80) scale(1.85)">
            {/* Left Laurel Branch */}
            <path d="M 23 22 C 15 33 15 46 26 55" stroke="url(#laurelLeafGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <g fill="url(#laurelLeafGrad)">
              <path d="M 17 21 C 14 19.8 12 22.5 14.5 25 C 17 26.8 19.5 24 17 21 Z" />
              <path d="M 13 28 C 10 27.2 9 30.8 11.8 32.8 C 14.8 34 16 31 13 28 Z" />
              <path d="M 13.5 37 C 10.8 37 10.5 40.8 13.5 42.5 C 16.5 43.8 17.5 40 13.5 37 Z" />
              <path d="M 18 45 C 15.5 45.8 16 49.5 19 50.8 C 22 51.5 22.5 47.8 18 45 Z" />
            </g>
            {/* Right Laurel Branch */}
            <path d="M 87 22 C 95 33 95 46 84 55" stroke="url(#laurelLeafGrad)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <g fill="url(#laurelLeafGrad)">
              <path d="M 93 21 C 96 19.8 98 22.5 95.5 25 C 93 26.8 90.5 24 93 21 Z" />
              <path d="M 97 28 C 100 27.2 101 30.8 98.2 32.8 C 95.2 34 94 31 97 28 Z" />
              <path d="M 96.5 37 C 99.2 37 99.5 40.8 96.5 42.5 C 93.5 43.8 92.5 40 96.5 37 Z" />
              <path d="M 92 45 C 94.5 45.8 94 49.5 91 50.8 C 88 51.5 87.5 47.8 92 45 Z" />
            </g>

            {/* Cup Handles */}
            <path d="M 38 18 C 25 18 25 35 38 35" stroke="url(#trophyGoldLimeBody)" strokeWidth="4.2" strokeLinecap="round" fill="none" />
            <path d="M 37.5 18.5 C 27 18.5 27 34 37.5 34" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />
            <path d="M 72 18 C 85 18 85 35 72 35" stroke="url(#trophyGoldLimeBody)" strokeWidth="4.2" strokeLinecap="round" fill="none" />
            <path d="M 72.5 18.5 C 83 18.5 83 34 72.5 34" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.75" />

            {/* Main Cup Body */}
            <path d="M 37 14 H 73 V 29 C 73 39 65 45 55 45 C 45 45 37 39 37 29 V 14 Z" fill="url(#trophyGoldLimeBody)" />
            <path d="M 41 18 C 41 29 46 38 52 41" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.7" />

            {/* Rim */}
            <ellipse cx="55" cy="14" rx="18" ry="3.5" fill="#bef264" />
            <ellipse cx="55" cy="14" rx="15" ry="2.2" fill="#65a30d" opacity="0.8" />

            {/* Embossed Center Star */}
            <path d="M 55 22 L 56.8 26.5 L 61.5 26.8 L 57.8 30 L 59 34.8 L 55 32 L 51 34.8 L 52.2 30 L 48.5 26.8 L 53.2 26.5 Z" fill="#14532d" stroke="#bef264" strokeWidth="1" filter="drop-shadow(0 1px 2px rgba(0,0,0,0.6))" />

            {/* Stem & Base */}
            <rect x="52" y="45" width="6" height="7" rx="1" fill="#4d7c0f" />
            <path d="M 44 52 H 66 L 68 59 H 42 L 44 52 Z" fill="url(#trophyGoldLimeBody)" />
            <line x1="44.5" y1="52.5" x2="65.5" y2="52.5" stroke="#ffffff" strokeWidth="1" opacity="0.85" />
            <rect x="36" y="59" width="38" height="5.5" rx="2.5" fill="#14532d" stroke="#bef264" strokeWidth="1" />
            <rect x="38" y="59.5" width="34" height="1.6" rx="0.8" fill="#fef08a" opacity="0.9" />
          </g>

          {/* Real-Time Global Ranking Number */}
          <text
            x="860"
            y="262"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
            fontSize="34"
            fontWeight="900"
            letterSpacing="-1"
            filter="drop-shadow(0 2px 6px rgba(0,0,0,0.85))"
          >
            {loading ? "—" : formattedRanking}
          </text>

          {/* Subtitle */}
          <text
            x="860"
            y="296"
            textAnchor="middle"
            fill="#d1fae5"
            fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
            fontSize="18"
            fontWeight="600"
            letterSpacing="0.4"
          >
            Global Ranking
          </text>
        </g>
      </svg>
    </div>
  );
}
