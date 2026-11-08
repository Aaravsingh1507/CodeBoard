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
 * Realistic 3D Golden Trophy with Laurel Wreath (Global Ranking) matching reference design exactly
 */
export function TrophyLaurel3D({ className = "w-18 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 72 62" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Realistic Metallic Gold Gradients */}
        <linearGradient id="goldCupBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff8b8" />
          <stop offset="20%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="85%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <linearGradient id="goldRimGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#fde047" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="goldHandleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#f59e0b" />
          <stop offset="70%" stopColor="#b45309" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>

        <linearGradient id="goldLeafGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffbeb" />
          <stop offset="30%" stopColor="#fde047" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>

        <linearGradient id="goldStemGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#92400e" />
        </linearGradient>

        <filter id="realisticTrophyGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3.5" floodColor="#f59e0b" floodOpacity="0.75" />
        </filter>
      </defs>

      <g filter="url(#realisticTrophyGlow)">
        {/* ========================================================
            1. LAUREL WREATH STEMS & LEAVES
           ======================================================== */}
        {/* Left Laurel Branch Stem */}
        <path
          d="M17 22C10.5 32 10.5 44 20 52"
          stroke="url(#goldLeafGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left Laurel Leaves (4 discrete 3D sculpted leaves) */}
        <g fill="url(#goldLeafGrad)">
          <path d="M12.5 22C9.5 20.8 7.5 23.5 10 26C12.5 27.8 15 25 12.5 22Z" />
          <path d="M9 29C6 28.2 5 31.8 7.8 33.8C10.8 35 12 32 9 29Z" />
          <path d="M9.5 37C6.8 37 6.5 40.8 9.5 42.5C12.5 43.8 13.5 40 9.5 37Z" />
          <path d="M13.5 44C11 44.8 11.5 48.5 14.5 49.8C17.5 50.5 18 46.8 13.5 44Z" />
        </g>
        {/* Left Leaf Center Ribs (Metallic Specular Highlights) */}
        <path d="M10 24.5C11.5 25.5 13 24.5 13 24.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M7.8 32C9.5 33 10.8 32 10.8 32" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M8.5 40C10.2 41 11.8 40 11.8 40" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M13 47C14.8 48 16 47 16 47" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

        {/* Right Laurel Branch Stem */}
        <path
          d="M55 22C61.5 32 61.5 44 52 52"
          stroke="url(#goldLeafGrad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Laurel Leaves (4 discrete 3D sculpted leaves) */}
        <g fill="url(#goldLeafGrad)">
          <path d="M59.5 22C62.5 20.8 64.5 23.5 62 26C59.5 27.8 57 25 59.5 22Z" />
          <path d="M63 29C66 28.2 67 31.8 64.2 33.8C61.2 35 60 32 63 29Z" />
          <path d="M62.5 37C65.2 37 65.5 40.8 62.5 42.5C59.5 43.8 58.5 40 62.5 37Z" />
          <path d="M58.5 44C61 44.8 60.5 48.5 57.5 49.8C54.5 50.5 54 46.8 58.5 44Z" />
        </g>
        {/* Right Leaf Center Ribs (Metallic Specular Highlights) */}
        <path d="M62 24.5C60.5 25.5 59 24.5 59 24.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M64.2 32C62.5 33 61.2 32 61.2 32" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M63.5 40C61.8 41 60.2 40 60.2 40" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />
        <path d="M59 47C57.2 48 56 47 56 47" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.6" />

        {/* ========================================================
            2. 3D CUP HANDLES
           ======================================================== */}
        {/* Left Curved Handle */}
        <path
          d="M24 19C15 19 15 33 24 33"
          stroke="url(#goldHandleGrad)"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M23.5 19.5C16.5 19.5 16.5 32 23.5 32"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />

        {/* Right Curved Handle */}
        <path
          d="M48 19C57 19 57 33 48 33"
          stroke="url(#goldHandleGrad)"
          strokeWidth="3.6"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M48.5 19.5C55.5 19.5 55.5 32 48.5 32"
          stroke="#ffffff"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />

        {/* ========================================================
            3. 3D TROPHY CUP BODY & SPECULAR SHINE
           ======================================================== */}
        {/* Main Cup Body */}
        <path
          d="M23 15H49V27C49 35 43 40 36 40C29 40 23 35 23 27V15Z"
          fill="url(#goldCupBody)"
        />

        {/* 3D Curved Specular Highlight on Left Face of Cup */}
        <path
          d="M26 18C26 27 29.5 34.5 34 37"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* Top Rim Oval Bevel */}
        <ellipse cx="36" cy="15" rx="13" ry="2.6" fill="url(#goldRimGrad)" />
        <ellipse cx="36" cy="15" rx="11" ry="1.8" fill="#d97706" opacity="0.6" />

        {/* 3D Embossed Golden/White 5-Point Star */}
        <path
          d="M36 21.2L37.4 24.6L41 24.9L38.3 27.2L39.1 30.8L36 28.7L32.9 30.8L33.7 27.2L31 24.9L34.6 24.6Z"
          fill="#ffffff"
          opacity="0.95"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.4))"
        />

        {/* ========================================================
            4. 3D STEM & STEPPED PEDESTAL BASE
           ======================================================== */}
        {/* Cylindrical Stem */}
        <rect x="33.5" y="40" width="5" height="5.5" rx="1" fill="url(#goldStemGrad)" />

        {/* Flared Pedestal Tier */}
        <path d="M28 45.5H44L46 51H26L28 45.5Z" fill="url(#goldCupBody)" />
        <path d="M28.5 46H43.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.7" />

        {/* Bottom Base Plinth */}
        <rect x="23" y="51" width="26" height="4" rx="2" fill="#78350f" stroke="#f59e0b" strokeWidth="0.8" />
        <rect x="24" y="51.5" width="24" height="1.2" rx="0.6" fill="#fef08a" opacity="0.8" />
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

  // Center & Radius for the enlarged 3D Torus
  const cx = 95;
  const cy = 95;
  const radius = 74;
  const strokeWidth = 14;

  // In Reference Image 2:
  // - The active neon cyan arc is a crisp top segment: ~11:20 (-20°) to ~1:30 (+45°) for 16 solved problems
  const startAngle = -20;
  const endAngle = Math.min(270, Math.max(15, 45 + (safeTotal - 16) * 1.2));

  // Precision coordinates for active cyan arc
  const startPoint = polarToCartesian(cx, cy, radius, startAngle);
  const endPoint = polarToCartesian(cx, cy, radius, endAngle);
  const activeArcPath = describeSvgArc(cx, cy, radius, startAngle, endAngle);

  // Specular top-left metallic highlight (from ~9:30 to 11:15: -70° to -18°)
  const specularArcPath = describeSvgArc(cx, cy, radius, -70, -18);

  // 3D Metallic Purple Sheen on right & bottom curve (from ~1:30 to 7:00: 38° to 215°)
  const purpleTorusPath = describeSvgArc(cx, cy, radius, 38, 215);
  const purpleStart = polarToCartesian(cx, cy, radius, 38);
  const purpleEnd = polarToCartesian(cx, cy, radius, 215);

  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  return (
    <div
      className={`relative w-full max-w-[1100px] mx-auto rounded-[46px] p-4 sm:p-5 md:p-6 overflow-visible transition-all duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(28, 34, 46, 0.95), rgba(12, 14, 20, 0.98) 45%, rgba(24, 18, 34, 0.95))",
        border: "1.5px solid rgba(160, 180, 220, 0.25)",
        boxShadow:
          "inset 0 2px 5px rgba(255,255,255,0.16), inset 0 -5px 12px rgba(0,0,0,0.7), 0 20px 50px rgba(0,0,0,0.85)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
    >
      {/* Specular Top Edge Light Highlight */}
      <div className="absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

      {/* Atmospheric neon back-glow */}
      <div className="absolute -top-16 left-1/4 w-72 h-32 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 right-1/4 w-72 h-32 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* 3-Column Proportional Layout matching reference */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1.85fr_1.65fr] items-center gap-5 lg:gap-6">
        
        {/* ========================================================
            1. LEFT: Enlarged 3D Toroidal Donut Ring matching Image 2
           ======================================================== */}
        <div className="flex items-center justify-center lg:border-r lg:border-white/15 lg:pr-6 py-1">
          <div className="relative flex items-center justify-center w-[180px] h-[180px] sm:w-[194px] sm:h-[194px] md:w-[204px] md:h-[204px] shrink-0 -my-3 sm:-my-4 md:-my-5">
            {/* SVG 3D Donut Ring */}
            <svg
              className="w-full h-full overflow-visible"
              viewBox="0 0 190 190"
            >
              <defs>
                {/* Active Cyan Gradient */}
                <linearGradient
                  id="activeCyanGrad"
                  gradientUnits="userSpaceOnUse"
                  x1={startPoint.x}
                  y1={startPoint.y}
                  x2={endPoint.x}
                  y2={endPoint.y}
                >
                  <stop offset="0%" stopColor="#5eead4" />
                  <stop offset="40%" stopColor="#00f5c4" />
                  <stop offset="100%" stopColor="#00e5b8" />
                </linearGradient>

                {/* 3D Metallic Torus Base Gradient */}
                <linearGradient id="torusBaseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2c364c" />
                  <stop offset="50%" stopColor="#182030" />
                  <stop offset="100%" stopColor="#0e131e" />
                </linearGradient>

                {/* 3D Metallic Purple Sheen Gradient on right/bottom curve */}
                <linearGradient
                  id="purpleTubeGrad"
                  x1={purpleStart.x}
                  y1={purpleStart.y}
                  x2={purpleEnd.x}
                  y2={purpleEnd.y}
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="85%" stopColor="#6d28d9" />
                  <stop offset="100%" stopColor="#4c1d95" />
                </linearGradient>

                {/* Top-Left Specular Highlight Gradient */}
                <linearGradient id="specularGlintGrad" x1="28" y1="62" x2="72" y2="28" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.1" />
                  <stop offset="45%" stopColor="#ffffff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.95" />
                </linearGradient>

                {/* Blur Filters */}
                <filter id="blurSoft" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="1.5" />
                </filter>
                <filter id="blurPurple" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
                <filter id="blurCyan" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="5" />
                </filter>
              </defs>

              {/* 1. Base Inactive 3D Toroidal Tube (Full 360°) */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                stroke="url(#torusBaseGrad)"
                strokeWidth={strokeWidth}
                fill="none"
              />

              {/* 2. Metallic Purple Sheen on right and bottom curve (~1:30 - 7:00) */}
              <path
                d={purpleTorusPath}
                stroke="#8b5cf6"
                strokeWidth={strokeWidth + 6}
                strokeLinecap="round"
                fill="none"
                opacity="0.3"
                filter="url(#blurPurple)"
              />
              <path
                d={purpleTorusPath}
                stroke="url(#purpleTubeGrad)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                opacity="0.9"
              />

              {/* 3. Top-Left Metallic Specular Highlight on Inactive Tube */}
              <path
                d={specularArcPath}
                stroke="#ffffff"
                strokeWidth={strokeWidth - 6}
                strokeLinecap="round"
                fill="none"
                opacity="0.2"
                filter="url(#blurSoft)"
              />
              <path
                d={specularArcPath}
                stroke="url(#specularGlintGrad)"
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
                opacity="0.95"
              />

              {/* 4. Active Glowing Neon Cyan Segment at top (~11:20 - 1:30) */}
              <path
                d={activeArcPath}
                stroke="#00f5c4"
                strokeWidth={strokeWidth + 8}
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
                filter="url(#blurCyan)"
                className="transition-all duration-700 ease-out"
              />
              <path
                d={activeArcPath}
                stroke="url(#activeCyanGrad)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Center Content: 3D Laptop + Bold Number + "Total Solved" */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pt-0.5">
              <LaptopCode3D className="w-11 h-8 sm:w-12 sm:h-9 shrink-0 transition-transform duration-200 hover:scale-105" />
              <span className="font-bold text-4xl sm:text-[44px] text-white tracking-tight leading-none mt-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                {loading ? "—" : safeTotal}
              </span>
              <span className="text-xs sm:text-[14px] font-medium text-slate-300 mt-1 leading-none tracking-wide">
                Total Solved
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            2. MIDDLE: 3 Glowing Squircle Cards (Easy, Medium, Hard)
           ======================================================== */}
        <div className="grid grid-cols-3 gap-3 sm:gap-3.5 lg:border-r lg:border-white/15 lg:pr-6 py-1">
          
          {/* EASY SQUIRCLE (Green / Mint) */}
          <div
            className="group relative flex flex-col items-center justify-center h-[114px] sm:h-[120px] rounded-[28px] p-2 text-center transition-all duration-200 hover:scale-[1.04] cursor-default"
            style={{
              background:
                "linear-gradient(145deg, rgba(0, 115, 95, 0.95), rgba(0, 48, 42, 0.98))",
              border: "2px solid rgba(58, 255, 220, 0.8)",
              boxShadow:
                "inset 0 0 14px rgba(0, 245, 196, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 0 22px rgba(0, 255, 210, 0.42)",
            }}
          >
            <LightningBolt3D className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,245,210,0.7)]" />
            <span className="font-bold text-2xl sm:text-[30px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : easySolved}
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-100 mt-1 leading-none">
              Easy
            </span>
          </div>

          {/* MEDIUM SQUIRCLE (Warm Amber / Gold) */}
          <div
            className="group relative flex flex-col items-center justify-center h-[114px] sm:h-[120px] rounded-[28px] p-2 text-center transition-all duration-200 hover:scale-[1.04] cursor-default"
            style={{
              background:
                "linear-gradient(145deg, rgba(165, 95, 12, 0.95), rgba(85, 42, 4, 0.98))",
              border: "2px solid rgba(255, 190, 60, 0.85)",
              boxShadow:
                "inset 0 0 14px rgba(245, 158, 11, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 0 24px rgba(255, 163, 30, 0.45)",
            }}
          >
            <Layers3D className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,174,34,0.7)]" />
            <span className="font-bold text-2xl sm:text-[30px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : mediumSolved}
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-100 mt-1 leading-none">
              Medium
            </span>
          </div>

          {/* HARD SQUIRCLE (Crimson / Ruby) */}
          <div
            className="group relative flex flex-col items-center justify-center h-[114px] sm:h-[120px] rounded-[28px] p-2 text-center transition-all duration-200 hover:scale-[1.04] cursor-default"
            style={{
              background:
                "linear-gradient(145deg, rgba(150, 48, 58, 0.95), rgba(75, 20, 28, 0.98))",
              border: "2px solid rgba(255, 110, 120, 0.85)",
              boxShadow:
                "inset 0 0 14px rgba(244, 63, 94, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 0 24px rgba(255, 65, 80, 0.45)",
            }}
          >
            <Flag3D className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,68,78,0.7)]" />
            <span className="font-bold text-2xl sm:text-[30px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
              {loading ? "—" : hardSolved}
            </span>
            <span className="text-xs sm:text-[13px] font-semibold text-slate-100 mt-1 leading-none">
              Hard
            </span>
          </div>
        </div>

        {/* ========================================================
            3. RIGHT: Global Ranking Pill matching Image 3 exactly
           ======================================================== */}
        <div className="flex items-center justify-center py-1">
          <div
            className="group relative flex items-center justify-evenly gap-3 sm:gap-4 px-4 sm:px-5 py-2.5 h-[114px] sm:h-[120px] w-full rounded-[32px] sm:rounded-[34px] transition-all duration-200 hover:scale-[1.02] cursor-default"
            style={{
              background:
                "linear-gradient(135deg, rgba(65, 22, 112, 0.96), rgba(35, 11, 62, 0.98))",
              border: "2px solid rgba(175, 95, 255, 0.85)",
              boxShadow:
                "inset 0 0 16px rgba(168, 85, 247, 0.35), inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 0 24px rgba(168, 85, 247, 0.5)",
            }}
          >
            {/* 3D Realistic Golden Trophy with Laurel Wreaths */}
            <div className="shrink-0 flex items-center justify-center">
              <TrophyLaurel3D className="w-[66px] h-[56px] sm:w-[72px] sm:h-[62px] transition-transform duration-200 group-hover:scale-105" />
            </div>

            {/* Crisp Vertical Divider */}
            <div className="w-[1.5px] h-14 bg-white/35 shrink-0 mx-2 sm:mx-2.5 rounded-full" />

            {/* Ranking Number & Subtitle */}
            <div className="flex flex-col text-left pr-1 min-w-0">
              <span className="font-bold text-2xl sm:text-[28px] lg:text-[32px] text-white tracking-tight leading-none truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                {loading ? "—" : formattedRanking}
              </span>
              <span className="text-xs sm:text-[13px] font-medium text-[#d8b4fe] mt-1.5 leading-none tracking-wide">
                Global Ranking
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
