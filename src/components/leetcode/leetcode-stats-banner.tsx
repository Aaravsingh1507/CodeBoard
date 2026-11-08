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
// HELPER FOR PRECISION SVG ARCS
// =========================================================================

function polarToCartesian(cx: number, cy: number, r: number, angleInDegrees: number) {
  // 0 degrees is 12 o'clock, progressing clockwise
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: Number((cx + r * Math.cos(angleInRadians)).toFixed(2)),
    y: Number((cy + r * Math.sin(angleInRadians)).toFixed(2)),
  };
}

function describeSvgArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const diff = endAngle - startAngle;
  const largeArcFlag = diff <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`;
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
  const safeTotal = totalSolved || 0;

  // Center & Radius for the 3D Torus
  const cx = 70;
  const cy = 70;
  const radius = 54;

  // In the reference image:
  // - Start angle: ~11:30 (approx -15° or 345° from 12 o'clock)
  // - Reference end angle: ~4:30 (approx +135° from 12 o'clock for 16 solved problems)
  const startAngle = -15;
  // Dynamic arc smoothly expands with totalSolved, perfectly hitting 135° for reference 16 problems
  const endAngle = Math.min(270, Math.max(65, 135 + (safeTotal - 16) * 1.5));

  // Precision coordinates for active arc and its gradient
  const startPoint = polarToCartesian(cx, cy, radius, startAngle);
  const endPoint = polarToCartesian(cx, cy, radius, endAngle);
  const activeArcPath = describeSvgArc(cx, cy, radius, startAngle, endAngle);

  // Specular top-left metallic highlight (from 10:00 to 11:20: -65° to -20°)
  const specularArcPath = describeSvgArc(cx, cy, radius, -65, -20);

  // Purple ambient reflection on bottom curve (from 5:00 to 7:00: 145° to 215°)
  const purpleReflectPath = describeSvgArc(cx, cy, radius, 145, 215);

  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  return (
    <div
      className={`relative w-full max-w-[940px] mx-auto rounded-[38px] sm:rounded-[42px] border-[1.5px] border-[#1e2538] bg-gradient-to-b from-[#111624] via-[#0c0f18] to-[#070912] px-4 sm:px-6 md:px-7 py-3 sm:py-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1.5px_rgba(255,255,255,0.12)] overflow-visible transition-all duration-300 ${className}`}
    >
      {/* Specular Top Edge Light Highlight */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Atmospheric neon back-glow */}
      <div className="absolute -top-16 left-1/4 w-72 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 right-1/4 w-72 h-32 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Main Horizontal Flex Layout matching Reference Image Exactly */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-5">
        
        {/* ========================================================
            1. LEFT: 3D Toroidal Donut Ring (Total Solved)
               Protrudes slightly above and below the bar like reference
           ======================================================== */}
        <div className="flex items-center justify-center shrink-0 -my-2.5 sm:-my-3 md:-my-3.5">
          <div className="relative flex items-center justify-center w-[138px] h-[138px] sm:w-[144px] sm:h-[144px]">
            {/* SVG 3D Donut Ring */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 140 140"
            >
              <defs>
                {/* Active Arc Gradient: Pure Cyan (#00f5c4) -> Electric Teal (#06b6d4) -> Vivid Purple (#a855f7) */}
                <linearGradient
                  id="activeNeonArcGrad"
                  gradientUnits="userSpaceOnUse"
                  x1={startPoint.x}
                  y1={startPoint.y}
                  x2={endPoint.x}
                  y2={endPoint.y}
                >
                  <stop offset="0%" stopColor="#00f5c4" />
                  <stop offset="25%" stopColor="#00f5c4" />
                  <stop offset="50%" stopColor="#06b6d4" />
                  <stop offset="75%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>

                {/* 3D Inactive Ring Gradient (gunmetal metallic tube with light falloff) */}
                <linearGradient id="torusBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c364c" />
                  <stop offset="45%" stopColor="#192030" />
                  <stop offset="100%" stopColor="#0f141f" />
                </linearGradient>

                {/* Top-Left Specular Glint Gradient */}
                <linearGradient id="specularGlintGrad" x1="21" y1="47" x2="52" y2="19" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
                </linearGradient>

                {/* Specialized blur filters */}
                <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
                <filter id="blurPurple" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="3.5" />
                </filter>
                <filter id="blurHalo" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="6" />
                </filter>
                {/* Neon Bloom Filters */}
                <filter id="arcGlowWide" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur1" />
                  <feGaussianBlur stdDeviation="8" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* 1. Inactive 3D Toroidal Tube Track */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke="url(#torusBaseGrad)"
                strokeWidth="16"
                fill="none"
              />

              {/* Inactive Tube Inner Shadow Bevel */}
              <circle
                cx={cx}
                cy={cy}
                r={radius - 8}
                stroke="#070a12"
                strokeWidth="1.2"
                fill="none"
                opacity="0.8"
              />
              {/* Inactive Tube Outer Rim Bevel */}
              <circle
                cx={cx}
                cy={cy}
                r={radius + 8}
                stroke="#ffffff"
                strokeWidth="0.8"
                fill="none"
                opacity="0.1"
              />

              {/* 2. Top-Left Specular Highlight on Inactive Tube (~10:00 - 11:20) */}
              <path
                d={specularArcPath}
                stroke="#ffffff"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                opacity="0.15"
                filter="url(#blurSoft)"
              />
              <path
                d={specularArcPath}
                stroke="url(#specularGlintGrad)"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />

              {/* 3. Soft Purple Ambient Reflection on Bottom Rim (~5:00 - 7:00) */}
              <path
                d={purpleReflectPath}
                stroke="#8b5cf6"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
                opacity="0.32"
                filter="url(#blurPurple)"
              />

              {/* 4. Active Glowing Arc - Ambient Neon Halo */}
              <path
                d={activeArcPath}
                stroke="url(#activeNeonArcGrad)"
                strokeWidth="24"
                strokeLinecap="round"
                fill="none"
                opacity="0.45"
                filter="url(#blurHalo)"
                className="transition-all duration-700 ease-out"
              />

              {/* 5. Active Glowing Arc - Core High-Intensity Tube */}
              <path
                d={activeArcPath}
                stroke="url(#activeNeonArcGrad)"
                strokeWidth="16"
                strokeLinecap="round"
                fill="none"
                filter="url(#arcGlowWide)"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Content: 3D Laptop + Bold Number + "Total Solved" */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-0.5">
              <LaptopCode3D className="w-[34px] h-[26px] shrink-0 transition-transform duration-200 hover:scale-105" />
              <span className="font-extrabold text-[28px] sm:text-[30px] text-white tracking-tight leading-none mt-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                {loading ? "—" : safeTotal}
              </span>
              <span className="text-[11px] sm:text-[11.5px] font-semibold text-slate-300 mt-1 leading-none tracking-wide">
                Total Solved
              </span>
            </div>
          </div>
        </div>

        {/* Hairline Divider 1 */}
        <div className="hidden md:block w-[1px] h-12 bg-white/[0.08] shrink-0" />

        {/* ========================================================
            2. MIDDLE: 3 Glowing Squircle Cards (Easy, Medium, Hard)
           ======================================================== */}
        <div className="flex items-center justify-center gap-3.5 sm:gap-4 shrink-0">
          
          {/* EASY SQUIRCLE (Cyan / Mint) */}
          <div className="group relative flex flex-col items-center justify-center w-[82px] h-[88px] sm:w-[86px] sm:h-[92px] rounded-[22px] border-[1.5px] border-[#00f5c4]/50 bg-gradient-to-b from-[#063b32] via-[#02241e] to-[#011411] p-2 text-center shadow-[0_0_24px_rgba(0,245,196,0.42),0_8px_20px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(0,245,196,0.65)]">
            <LightningBolt3D className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-extrabold text-[26px] sm:text-[28px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : easySolved}
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold text-slate-200 mt-1 leading-none">
              Easy
            </span>
          </div>

          {/* MEDIUM SQUIRCLE (Warm Amber / Gold) */}
          <div className="group relative flex flex-col items-center justify-center w-[82px] h-[88px] sm:w-[86px] sm:h-[92px] rounded-[22px] border-[1.5px] border-[#f59e0b]/50 bg-gradient-to-b from-[#422605] via-[#241402] to-[#120a01] p-2 text-center shadow-[0_0_24px_rgba(245,158,11,0.42),0_8px_20px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(245,158,11,0.65)]">
            <Layers3D className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-extrabold text-[26px] sm:text-[28px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : mediumSolved}
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold text-slate-200 mt-1 leading-none">
              Medium
            </span>
          </div>

          {/* HARD SQUIRCLE (Crimson / Ruby) */}
          <div className="group relative flex flex-col items-center justify-center w-[82px] h-[88px] sm:w-[86px] sm:h-[92px] rounded-[22px] border-[1.5px] border-[#f43f5e]/50 bg-gradient-to-b from-[#3d0d17] via-[#22050b] to-[#120205] p-2 text-center shadow-[0_0_24px_rgba(244,63,94,0.42),0_8px_20px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_0_35px_rgba(244,63,94,0.65)]">
            <Flag3D className="w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] shrink-0 transition-transform duration-200 group-hover:scale-110" />
            <span className="font-extrabold text-[26px] sm:text-[28px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : hardSolved}
            </span>
            <span className="text-[12px] sm:text-[13px] font-semibold text-slate-200 mt-1 leading-none">
              Hard
            </span>
          </div>
        </div>

        {/* Hairline Divider 2 */}
        <div className="hidden md:block w-[1px] h-12 bg-white/[0.08] shrink-0" />

        {/* ========================================================
            3. RIGHT: Global Ranking Pill (Trophy with Laurels)
           ======================================================== */}
        <div className="w-full md:w-auto shrink-0 flex items-center justify-center">
          <div className="group relative flex items-center justify-between sm:justify-start gap-3 sm:gap-3.5 px-4 sm:px-5 py-2.5 h-[88px] sm:h-[92px] w-full md:w-[260px] lg:w-[280px] rounded-[24px] border-[1.5px] border-[#a855f7]/50 bg-gradient-to-b from-[#2a1350] via-[#16092d] to-[#0d041c] shadow-[0_0_28px_rgba(168,85,247,0.42),0_8px_20px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.65)]">
            {/* 3D Golden Trophy with Laurel Wreaths */}
            <div className="shrink-0 flex items-center justify-center">
              <TrophyLaurel3D className="w-[54px] h-[46px] transition-transform duration-200 group-hover:scale-105" />
            </div>

            {/* Crisp Vertical Divider */}
            <div className="w-[1px] h-9 bg-white/20 shrink-0" />

            {/* Ranking Number & Subtitle */}
            <div className="flex flex-col text-left pr-1 min-w-0">
              <span className="font-black text-[23px] sm:text-[25px] text-white tracking-tight leading-none truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {loading ? "—" : formattedRanking}
              </span>
              <span className="text-[12px] font-semibold text-purple-200/80 mt-1 leading-none tracking-wide">
                Global Ranking
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
