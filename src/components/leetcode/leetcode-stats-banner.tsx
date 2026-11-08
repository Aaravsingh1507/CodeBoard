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
// TOTAL SOLVED SPEEDOMETER ARCH & 3D LAPTOP ON PODIUM CARD
// Matching media_1794122991334_1e1e6bb2.jpg with full glassmorphism
// =========================================================================

export interface TotalSolvedSpeedometerCardProps {
  totalSolved?: number;
  maxDisplay?: number;
  loading?: boolean;
  className?: string;
}

export function TotalSolvedSpeedometerCard({
  totalSolved = 0,
  maxDisplay = 32,
  loading = false,
  className = "",
}: TotalSolvedSpeedometerCardProps) {
  const safeTotal = totalSolved || 0;
  // Calculate lit segments dynamically: for 16/32 -> exactly 10 segments lit
  const litCount = Math.max(1, Math.min(20, Math.round((safeTotal / maxDisplay) * 20)));

  // 20 discrete radial curved pill segments spanning from 200° to 340°
  const totalSegs = 20;
  const cx = 282;
  const cy = 162;
  const rIn = 68;
  const rOut = 88;

  const segments = Array.from({ length: totalSegs }, (_, i) => {
    const deg = 200 + i * (140.0 / (totalSegs - 1));
    const rad = (deg * Math.PI) / 180;
    const x1 = Number((cx + rIn * Math.cos(rad)).toFixed(1));
    const y1 = Number((cy + rIn * Math.sin(rad)).toFixed(1));
    const x2 = Number((cx + rOut * Math.cos(rad)).toFixed(1));
    const y2 = Number((cy + rOut * Math.sin(rad)).toFixed(1));

    const isLit = i < litCount;
    const isPeak = i === litCount - 1;

    let stroke = "#0c321e";
    let filter: string | undefined = undefined;
    let opacity = 0.42;

    if (isPeak) {
      stroke = "#bef264";
      filter = "url(#peakGlow)";
      opacity = 1;
    } else if (isLit && i >= litCount - 3) {
      stroke = "#4ade80";
      filter = "url(#limeGlow)";
      opacity = 1;
    } else if (isLit) {
      stroke = "#22c55e";
      filter = "url(#emeraldGlow)";
      opacity = 1;
    }

    return { x1, y1, x2, y2, stroke, filter, opacity, isLit };
  });

  return (
    <div
      className={`group relative w-full h-full rounded-[30px] sm:rounded-[34px] overflow-hidden transition-all duration-300 hover:scale-[1.01] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(6, 45, 32, 0.62) 0%, rgba(2, 22, 15, 0.85) 100%)",
        border: "1.5px solid rgba(74, 222, 128, 0.65)",
        boxShadow:
          "inset 0 1.5px 3px rgba(255, 255, 255, 0.4), inset 0 0 18px rgba(34, 197, 94, 0.22), 0 0 24px rgba(34, 197, 94, 0.3)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
    >
      {/* Specular Top-Left Glass Bubble Sheen */}
      <div className="absolute inset-x-3 top-1 h-[42%] rounded-t-[26px] bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-2 left-4 w-7 h-3 rounded-full bg-white/45 blur-[1px] pointer-events-none transform -rotate-12" />

      <svg
        viewBox="0 0 402 245"
        className="w-full h-full block select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cardBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#083827" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#031b12" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#052418" stopOpacity="0.8" />
          </linearGradient>

          <linearGradient id="numGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dcfce7" />
            <stop offset="35%" stopColor="#86efac" />
            <stop offset="70%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          <linearGradient id="pedestalRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#bef264" />
          </linearGradient>

          <radialGradient id="pedestalTopGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0d3d27" />
            <stop offset="70%" stopColor="#051e13" />
            <stop offset="100%" stopColor="#020c07" />
          </radialGradient>

          <linearGradient id="pedestalCylinderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#041a10" />
            <stop offset="100%" stopColor="#010805" />
          </linearGradient>

          <linearGradient id="waveCrestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#4ade80" stopOpacity="0.85" />
            <stop offset="70%" stopColor="#86efac" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.4" />
          </linearGradient>

          <filter id="peakGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#bef264" floodOpacity="0.95" />
          </filter>

          <filter id="limeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#4ade80" floodOpacity="0.85" />
          </filter>

          <filter id="emeraldGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#22c55e" floodOpacity="0.75" />
          </filter>

          <filter id="pedestalBloom" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#4ade80" floodOpacity="0.9" />
          </filter>

          <filter id="codeBloom" x="-40%" y="-40%" width="180%" height="180%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#4ade80" floodOpacity="0.95" />
          </filter>

          <filter id="waveBloom" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4ade80" floodOpacity="0.7" />
          </filter>

          <filter id="numShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="#22c55e" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* 1. LAYERED ORGANIC WAVES AT BOTTOM */}
        <path
          d="M 0 190 Q 95 160, 200 180 T 402 170 L 402 245 L 0 245 Z"
          fill="rgba(6, 45, 30, 0.45)"
        />
        <path
          d="M 0 205 Q 120 175, 240 200 T 402 190 L 402 245 L 0 245 Z"
          fill="rgba(3, 22, 14, 0.75)"
        />
        <path
          d="M 0 205 Q 120 175, 240 200 T 402 190"
          stroke="url(#waveCrestGrad)"
          strokeWidth="2.4"
          fill="none"
          opacity="0.85"
          filter="url(#waveBloom)"
        />

        {/* 2. TOP-LEFT HEADER: SQUIRCLE + TITLE (NO DIVIDER) */}
        <rect
          x="22"
          y="20"
          width="44"
          height="44"
          rx="13"
          ry="13"
          fill="rgba(10, 46, 32, 0.85)"
          stroke="#22c55e"
          strokeWidth="1.8"
          strokeOpacity="0.7"
          filter="url(#emeraldGlow)"
        />
        <path d="M 28 23 L 60 23" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" opacity="0.4" />

        {/* </> in Header Squircle */}
        <g filter="url(#codeBloom)">
          <path
            d="M 39 36 L 33 42 L 39 48"
            stroke="#4ade80"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 49 36 L 55 42 L 49 48"
            stroke="#4ade80"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line x1="47" y1="34" x2="41" y2="50" stroke="#4ade80" strokeWidth="2.6" strokeLinecap="round" />
        </g>

        {/* "Total Solved" Title (directly next to squircle, matching image) */}
        <text
          x="78"
          y="48"
          fill="#ffffff"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="20"
          fontWeight="700"
          letterSpacing="0.3"
        >
          Total Solved
        </text>

        {/* 3. BIG METRIC (Number ONLY, NO underline, matching image) */}
        <text
          x="24"
          y="160"
          fill="url(#numGrad)"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="82"
          fontWeight="900"
          letterSpacing="-2"
          filter="url(#numShadow)"
        >
          {loading ? "—" : safeTotal}
        </text>

        {/* 4. SPEEDOMETER ARCH SEGMENTS */}
        {segments.map((s, idx) => (
          <line
            key={idx}
            x1={s.x1}
            y1={s.y1}
            x2={s.x2}
            y2={s.y2}
            stroke={s.stroke}
            strokeWidth="6.5"
            strokeLinecap="round"
            filter={s.filter}
            opacity={s.opacity}
          />
        ))}

        {/* 5. 3D GLOWING PEDESTAL */}
        <ellipse cx="282" cy="186" rx="60" ry="10" fill="#000000" opacity="0.75" />
        <path
          d="M 224 168 A 58 12 0 0 0 340 168 V 184 A 58 12 0 0 1 224 184 Z"
          fill="url(#pedestalCylinderGrad)"
        />
        <path d="M 226 172 A 58 12 0 0 0 338 172" stroke="#22c55e" strokeWidth="1" opacity="0.3" fill="none" />
        <ellipse cx="282" cy="168" rx="58" ry="12" fill="url(#pedestalTopGrad)" />
        <ellipse
          cx="282"
          cy="168"
          rx="58"
          ry="12"
          fill="none"
          stroke="url(#pedestalRimGrad)"
          strokeWidth="3.2"
          filter="url(#pedestalBloom)"
        />
        <path
          d="M 238 175 A 58 12 0 0 0 326 175"
          stroke="#ffffff"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />

        {/* 6. 3D METALLIC OPEN LAPTOP */}
        <ellipse cx="282" cy="160" rx="38" ry="4" fill="#000000" opacity="0.7" />
        {/* Lid Bezel */}
        <rect
          x="252"
          y="110"
          width="60"
          height="40"
          rx="5"
          ry="5"
          fill="#1e293b"
          stroke="#475569"
          strokeWidth="1.2"
        />
        <path d="M 257 111.5 L 307 111.5" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
        {/* OLED Screen */}
        <rect x="255.5" y="113.5" width="53" height="33" rx="3" ry="3" fill="#020408" />
        <path d="M 257 115 L 274 115 L 263 145 L 257 145 Z" fill="#ffffff" opacity="0.08" />
        {/* Glowing Code on Screen */}
        <g filter="url(#codeBloom)">
          <path
            d="M 275 125 L 268 130 L 275 135"
            stroke="#4ade80"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M 289 125 L 296 130 L 289 135"
            stroke="#4ade80"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <line x1="285" y1="122" x2="279" y2="138" stroke="#4ade80" strokeWidth="2.6" strokeLinecap="round" />
        </g>
        {/* Keyboard Deck */}
        <path
          d="M 241 150 L 323 150 L 332 163 L 232 163 Z"
          fill="#94a3b8"
          stroke="#64748b"
          strokeWidth="1"
        />
        <line x1="232" y1="163" x2="332" y2="163" stroke="#f8fafc" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        {/* Keyboard Well */}
        <path d="M 248 152 L 316 152 L 322 158 L 242 158 Z" fill="#0f172a" />
        {/* Trackpad */}
        <rect x="274" y="159" width="16" height="2.5" rx="1" fill="#1e293b" stroke="#475569" strokeWidth="0.6" />
      </svg>
    </div>
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
  const safeTotal = totalSolved || 0;

  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  return (
    <div
      className={`relative w-full max-w-[1040px] mx-auto rounded-[46px] sm:rounded-[54px] p-3 sm:p-4 md:p-5 overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(25, 34, 48, 0.45) 0%, rgba(10, 14, 22, 0.72) 50%, rgba(22, 18, 34, 0.45) 100%)",
        border: "2px solid rgba(255, 255, 255, 0.32)",
        boxShadow:
          "0 25px 60px rgba(0, 0, 0, 0.85), inset 0 2px 6px rgba(255, 255, 255, 0.45), inset 0 -4px 12px rgba(0, 0, 0, 0.7), 0 0 35px rgba(255, 255, 255, 0.06)",
        backdropFilter: "blur(35px)",
        WebkitBackdropFilter: "blur(35px)",
      }}
    >
      {/* Specular Outer Glass Capsule Highlights */}
      {/* Top-Left Specular Lens Glint */}
      <div className="absolute top-2 left-6 w-14 h-3.5 rounded-full bg-white/60 blur-[2px] pointer-events-none transform -rotate-6" />
      <div className="absolute top-2.5 left-7 w-3 h-3 rounded-full bg-cyan-200 blur-[1px] pointer-events-none" />

      {/* Bottom-Right Specular Lens Glint */}
      <div className="absolute bottom-2 right-6 w-14 h-3.5 rounded-full bg-white/45 blur-[2px] pointer-events-none transform -rotate-6" />
      <div className="absolute bottom-2.5 right-7 w-3 h-3 rounded-full bg-purple-300 blur-[1px] pointer-events-none" />

      {/* Top Outer Rim Light Refraction */}
      <div className="absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

      {/* Atmospheric neon back-glow */}
      <div className="absolute -top-16 left-1/4 w-72 h-32 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 right-1/4 w-72 h-32 bg-purple-600/15 blur-3xl rounded-full pointer-events-none" />

      {/* Proportional 2-Column Layout matching media_1794122991334_1e1e6bb2.jpg exactly:
          Left Column (44%): Speedometer Arch Card
          Right Column (56%): 2 Rows:
            - Top Row: 3 Glass Squircles (Easy, Medium, Hard)
            - Bottom Row: Global Ranking Pill
      */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1.28fr] items-stretch gap-3.5 sm:gap-4 md:gap-4.5">
        
        {/* ========================================================
            1. LEFT COLUMN: Total Solved Speedometer Arch Card
           ======================================================== */}
        <div className="flex w-full">
          <TotalSolvedSpeedometerCard
            totalSolved={safeTotal}
            loading={loading}
          />
        </div>

        {/* ========================================================
            2. RIGHT COLUMN: 2 Rows (3 Squircles + Global Ranking)
           ======================================================== */}
        <div className="flex flex-col justify-between gap-3 sm:gap-3.5">
          
          {/* TOP ROW: 3 Glassmorphic Squircles (Easy, Medium, Hard) */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            
            {/* EASY SQUIRCLE (Cyan / Mint Glass) */}
            <div
              className="group relative flex flex-col items-center justify-center h-[112px] sm:h-[118px] rounded-[26px] sm:rounded-[28px] p-2 text-center transition-all duration-200 hover:scale-[1.04] cursor-default overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(0, 150, 135, 0.52), rgba(0, 60, 55, 0.78))",
                border: "1.5px solid rgba(58, 255, 220, 0.75)",
                boxShadow:
                  "inset 0 1.5px 3px rgba(255, 255, 255, 0.45), inset 0 0 16px rgba(0, 245, 196, 0.25), 0 0 22px rgba(0, 255, 210, 0.35)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Glassmorphic Specular Bubble Sheen */}
              <div className="absolute inset-x-2 top-1 h-[48%] rounded-t-[22px] bg-gradient-to-b from-white/35 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute top-1.5 left-2.5 w-5 h-2.5 rounded-full bg-white/50 blur-[1px] pointer-events-none transform -rotate-12" />

              <LightningBolt3D className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(0,245,210,0.7)]" />
              <span className="font-extrabold text-2xl sm:text-[29px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                {loading ? "—" : easySolved}
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-cyan-100 mt-1 leading-none">
                Easy
              </span>
            </div>

            {/* MEDIUM SQUIRCLE (Warm Amber / Gold Glass) */}
            <div
              className="group relative flex flex-col items-center justify-center h-[112px] sm:h-[118px] rounded-[26px] sm:rounded-[28px] p-2 text-center transition-all duration-200 hover:scale-[1.04] cursor-default overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(200, 115, 15, 0.52), rgba(95, 45, 5, 0.78))",
                border: "1.5px solid rgba(255, 190, 60, 0.8)",
                boxShadow:
                  "inset 0 1.5px 3px rgba(255, 255, 255, 0.45), inset 0 0 16px rgba(245, 158, 11, 0.25), 0 0 22px rgba(255, 163, 30, 0.35)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Glassmorphic Specular Bubble Sheen */}
              <div className="absolute inset-x-2 top-1 h-[48%] rounded-t-[22px] bg-gradient-to-b from-white/35 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute top-1.5 left-2.5 w-5 h-2.5 rounded-full bg-white/50 blur-[1px] pointer-events-none transform -rotate-12" />

              <Layers3D className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,174,34,0.7)]" />
              <span className="font-extrabold text-2xl sm:text-[29px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                {loading ? "—" : mediumSolved}
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-amber-100 mt-1 leading-none">
                Medium
              </span>
            </div>

            {/* HARD SQUIRCLE (Crimson / Ruby Glass) */}
            <div
              className="group relative flex flex-col items-center justify-center h-[112px] sm:h-[118px] rounded-[26px] sm:rounded-[28px] p-2 text-center transition-all duration-200 hover:scale-[1.04] cursor-default overflow-hidden"
              style={{
                background:
                  "linear-gradient(145deg, rgba(180, 45, 65, 0.52), rgba(85, 18, 28, 0.78))",
                border: "1.5px solid rgba(255, 110, 120, 0.8)",
                boxShadow:
                  "inset 0 1.5px 3px rgba(255, 255, 255, 0.45), inset 0 0 16px rgba(244, 63, 94, 0.25), 0 0 22px rgba(255, 65, 80, 0.35)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
              }}
            >
              {/* Glassmorphic Specular Bubble Sheen */}
              <div className="absolute inset-x-2 top-1 h-[48%] rounded-t-[22px] bg-gradient-to-b from-white/35 via-white/5 to-transparent pointer-events-none" />
              <div className="absolute top-1.5 left-2.5 w-5 h-2.5 rounded-full bg-white/50 blur-[1px] pointer-events-none transform -rotate-12" />

              <Flag3D className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 transition-transform duration-200 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,68,78,0.7)]" />
              <span className="font-extrabold text-2xl sm:text-[29px] text-white leading-none mt-1.5 tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)]">
                {loading ? "—" : hardSolved}
              </span>
              <span className="text-xs sm:text-[13px] font-semibold text-rose-100 mt-1 leading-none">
                Hard
              </span>
            </div>
          </div>

          {/* BOTTOM ROW: Global Ranking Pill (Spans width of 3 cards above) */}
          <div
            className="group relative flex items-center justify-evenly gap-3 sm:gap-4 px-4 sm:px-6 py-2.5 h-[110px] sm:h-[116px] w-full rounded-[30px] sm:rounded-[34px] transition-all duration-200 hover:scale-[1.02] cursor-default overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(85, 25, 145, 0.58), rgba(40, 10, 75, 0.82))",
              border: "1.5px solid rgba(175, 95, 255, 0.8)",
              boxShadow:
                "inset 0 1.5px 3px rgba(255, 255, 255, 0.45), inset 0 0 18px rgba(168, 85, 247, 0.3), 0 0 26px rgba(168, 85, 247, 0.4)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Glassmorphic Specular Bubble Sheen */}
            <div className="absolute inset-x-3 top-1 h-[48%] rounded-t-[26px] bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none" />
            <div className="absolute top-1.5 left-4 w-7 h-3 rounded-full bg-white/50 blur-[1px] pointer-events-none transform -rotate-12" />

            {/* 3D Realistic Golden Trophy with Laurel Wreaths */}
            <div className="shrink-0 flex items-center justify-center">
              <TrophyLaurel3D className="w-[66px] h-[56px] sm:w-[72px] sm:h-[62px] transition-transform duration-200 group-hover:scale-105" />
            </div>

            {/* Crisp Vertical Divider */}
            <div className="w-[1.5px] h-12 bg-white/35 shrink-0 mx-2 sm:mx-3 rounded-full" />

            {/* Ranking Number & Subtitle */}
            <div className="flex flex-col text-left pr-1 min-w-0">
              <span className="font-extrabold text-2xl sm:text-[28px] lg:text-[34px] text-white tracking-tight leading-none truncate drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
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
