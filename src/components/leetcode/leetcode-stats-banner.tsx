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
// 1. TOTAL SOLVED CYBER DIAL (With Branching Circuit Connector Nodes)
// Matching media_1794123896316_7f3aaa20.jpg with glassmorphism
// =========================================================================

export interface TotalSolvedCyberDialProps {
  totalSolved?: number;
  loading?: boolean;
  className?: string;
}

export function TotalSolvedCyberDial({
  totalSolved = 0,
  loading = false,
  className = "",
}: TotalSolvedCyberDialProps) {
  const safeTotal = totalSolved || 0;

  return (
    <div className={`relative flex items-center justify-center w-full max-w-[370px] aspect-square mx-auto ${className}`}>
      <svg
        viewBox="0 0 370 380"
        className="w-full h-full overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Neon Arc Gradient (Lime to Emerald to Mint Cyan) */}
          <linearGradient id="dialNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bef264" />
            <stop offset="40%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#00f5c4" />
          </linearGradient>

          {/* Core Dark Glass Gradient */}
          <radialGradient id="dialCoreGrad" cx="45%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#0a2a1d" />
            <stop offset="70%" stopColor="#03150d" />
            <stop offset="100%" stopColor="#010a06" />
          </radialGradient>

          {/* Outer Ring Groove Gradient */}
          <linearGradient id="dialGrooveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0d3324" />
            <stop offset="50%" stopColor="#041810" />
            <stop offset="100%" stopColor="#062216" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="dialArcGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="5.5" floodColor="#4ade80" floodOpacity="0.85" />
          </filter>

          <filter id="dialPeakGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#bef264" floodOpacity="0.95" />
          </filter>

          <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22c55e" floodOpacity="0.8" />
          </filter>

          <filter id="nodeHalo" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="3.5" floodColor="#4ade80" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* Ambient Outer Halo */}
        <circle cx="160" cy="190" r="132" fill="#22c55e" opacity="0.08" filter="blur(16px)" />

        {/* 1. OUTER GROOVE BEVEL RING */}
        <circle
          cx="160"
          cy="190"
          r="130"
          stroke="url(#dialGrooveGrad)"
          strokeWidth="14"
          fill="none"
        />
        <circle
          cx="160"
          cy="190"
          r="137"
          stroke="rgba(74, 222, 128, 0.3)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* 2. MAIN ACTIVE NEON ARC (Left side from ~5:20 to ~12:20, span 210°) */}
        <path
          d="M 203.8 310.3 A 128 128 0 1 1 182.2 63.9"
          stroke="url(#dialNeonGrad)"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
          filter="url(#dialArcGlow)"
        />

        {/* Specular Ridge Line on Main Arc */}
        <path
          d="M 203.8 310.3 A 128 128 0 1 1 182.2 63.9"
          stroke="#ffffff"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* 3. TOP SECONDARY NEON ARC (~11:00 to ~1:00) */}
        <path
          d="M 105.9 74.0 A 128 128 0 0 1 214.1 74.0"
          stroke="#bef264"
          strokeWidth="12"
          strokeLinecap="round"
          fill="none"
          filter="url(#dialPeakGlow)"
        />

        {/* 4. INNER GLASS CORE DISK */}
        <circle
          cx="160"
          cy="190"
          r="104"
          fill="url(#dialCoreGrad)"
          stroke="rgba(74, 222, 128, 0.45)"
          strokeWidth="2.2"
        />

        {/* Specular Top-Left Glass Reflection on Core */}
        <path
          d="M 96 116 A 104 104 0 0 1 216 112"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.45"
        />
        <ellipse cx="120" cy="120" rx="18" ry="5" fill="#ffffff" opacity="0.3" transform="rotate(-25 120 120)" filter="blur(1px)" />

        {/* 5. 3D OPEN LAPTOP INSIDE CORE */}
        <g transform="translate(133, 116)">
          {/* Lid Bezel */}
          <rect x="5" y="4" width="44" height="29" rx="3.5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
          <line x1="8" y1="5.5" x2="46" y2="5.5" stroke="#94a3b8" strokeWidth="0.8" opacity="0.7" />
          {/* OLED Screen */}
          <rect x="7.5" y="6.5" width="39" height="24" rx="2" fill="#020408" />
          {/* Glowing Code on Screen */}
          <path d="M 22 15 L 17 18.5 L 22 22" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M 32 15 L 37 18.5 L 32 22" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <line x1="29" y1="13" x2="25" y2="24" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" />
          {/* Deck */}
          <path d="M 1 33 L 53 33 L 49 40 L 5 40 Z" fill="#94a3b8" stroke="#64748b" strokeWidth="0.8" />
          <line x1="5" y1="40" x2="49" y2="40" stroke="#f8fafc" strokeWidth="1" opacity="0.7" />
          <rect x="22" y="34.5" width="10" height="1.8" rx="0.8" fill="#1e293b" />
        </g>

        {/* 6. BIG NUMBER & LABEL */}
        <text
          x="160"
          y="204"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="64"
          fontWeight="900"
          letterSpacing="-1.5"
          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.85))"
        >
          {loading ? "—" : safeTotal}
        </text>

        <text
          x="160"
          y="232"
          textAnchor="middle"
          fill="#d1fae5"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="17"
          fontWeight="700"
          letterSpacing="0.4"
        >
          Total Solved
        </text>

        {/* 7. 3-WAY BRANCHING CIRCUIT WIRES WITH GLOWING JUNCTION NODES */}
        {/* Branch 1 to Easy */}
        <path
          d="M 284 150 Q 306 150, 327 160 Q 348 170, 370 120"
          stroke="#4ade80"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
          filter="url(#wireGlow)"
        />
        <circle cx="327" cy="160" r="7.5" fill="#22c55e" filter="url(#nodeHalo)" />
        <circle cx="327" cy="160" r="3.2" fill="#ffffff" />

        {/* Branch 2 to Medium (Horizontal) */}
        <line
          x1="290"
          y1="252"
          x2="370"
          y2="252"
          stroke="#4ade80"
          strokeWidth="2.8"
          strokeLinecap="round"
          filter="url(#wireGlow)"
        />
        <circle cx="357" cy="252" r="7.5" fill="#22c55e" filter="url(#nodeHalo)" />
        <circle cx="357" cy="252" r="3.2" fill="#ffffff" />

        {/* Branch 3 to Hard */}
        <path
          d="M 284 230 Q 306 230, 327 220 Q 348 210, 370 270"
          stroke="#4ade80"
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
          filter="url(#wireGlow)"
        />
        <circle cx="326" cy="220" r="7.5" fill="#22c55e" filter="url(#nodeHalo)" />
        <circle cx="326" cy="220" r="3.2" fill="#ffffff" />
      </svg>
    </div>
  );
}

// =========================================================================
// 2. DIFFICULTY PILL CARD (With 10-Block Segmented Progress Bar)
// Matching media_1794123896316_7f3aaa20.jpg with glassmorphism
// =========================================================================

export interface DifficultyPillCardProps {
  label: "Easy" | "Medium" | "Hard";
  count: number;
  totalForMax?: number;
  icon: React.ReactNode;
  loading?: boolean;
}

export function DifficultyPillCard({
  label,
  count = 0,
  totalForMax = 10,
  icon,
  loading = false,
}: DifficultyPillCardProps) {
  // 10 discrete blocks in the progress bar
  const totalBlocks = 10;
  // Calculate lit blocks dynamically:
  const litBlocks = Math.max(0, Math.min(totalBlocks, Math.round((count / totalForMax) * totalBlocks)));

  return (
    <div
      className="group relative flex items-center justify-between px-4 sm:px-5 py-3 h-[112px] sm:h-[116px] w-full rounded-[38px] sm:rounded-[42px] transition-all duration-300 hover:scale-[1.02] cursor-default overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(6, 42, 28, 0.65) 0%, rgba(2, 20, 14, 0.88) 100%)",
        border: "1.6px solid rgba(74, 222, 128, 0.65)",
        boxShadow:
          "inset 0 1.5px 3px rgba(255, 255, 255, 0.45), inset 0 0 18px rgba(34, 197, 94, 0.22), 0 0 22px rgba(34, 197, 94, 0.3)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
      }}
    >
      {/* Specular Curved Glass Bubble Sheen along Top Rim */}
      <div className="absolute inset-x-4 top-1 h-[45%] rounded-t-[30px] bg-gradient-to-b from-white/35 via-white/5 to-transparent pointer-events-none" />
      <div className="absolute top-1.5 left-5 w-6 h-2.5 rounded-full bg-white/50 blur-[1px] pointer-events-none transform -rotate-12" />

      {/* Left: Circular Glass Icon Badge */}
      <div className="flex items-center gap-3.5 min-w-0">
        <div
          className="relative shrink-0 flex items-center justify-center w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 35%, rgba(12, 54, 38, 0.95), rgba(3, 20, 13, 0.98))",
            border: "1.5px solid rgba(74, 222, 128, 0.7)",
            boxShadow:
              "inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 0 14px rgba(34, 197, 94, 0.35)",
          }}
        >
          {icon}
        </div>

        {/* Center: Title + 10-Block Segmented Progress Bar */}
        <div className="flex flex-col text-left">
          <span className="font-bold text-lg sm:text-[20px] text-white tracking-wide leading-tight">
            {label}
          </span>

          {/* 10 Segmented Rounded Blocks */}
          <div className="flex items-center gap-1 sm:gap-1.5 mt-2">
            {Array.from({ length: totalBlocks }).map((_, idx) => {
              const isLit = idx < litBlocks;
              return (
                <div
                  key={idx}
                  className={`h-3 w-2 sm:w-2.5 rounded-[2.5px] transition-all duration-300 ${
                    isLit
                      ? "bg-gradient-to-b from-[#bef264] via-[#4ade80] to-[#22c55e] shadow-[0_0_6px_#4ade80]"
                      : "bg-[#0d2e20]/60 border border-white/5"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Big Bold Metric Number */}
      <div className="shrink-0 pl-2">
        <span className="font-black text-3xl sm:text-[38px] text-white tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
          {loading ? "—" : count}
        </span>
      </div>
    </div>
  );
}

// =========================================================================
// 3. GLOBAL RANKING HEXAGONAL SHIELD (With 3D Bottom Chevron Bevel)
// Matching media_1794123896316_7f3aaa20.jpg with glassmorphism
// =========================================================================

export interface GlobalRankingShieldProps {
  ranking?: number | null;
  loading?: boolean;
  className?: string;
}

export function GlobalRankingShield({
  ranking,
  loading = false,
  className = "",
}: GlobalRankingShieldProps) {
  const formattedRanking =
    ranking !== undefined && ranking !== null
      ? `#${ranking.toLocaleString()}`
      : "#—";

  return (
    <div
      className={`group relative flex flex-col items-center justify-between w-full max-w-[290px] h-[360px] sm:h-[375px] mx-auto transition-all duration-300 hover:scale-[1.01] select-none ${className}`}
    >
      <svg
        viewBox="0 0 280 375"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Shield Dark Glass Gradient */}
          <linearGradient id="shieldGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#083827" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#031c12" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#02120b" stopOpacity="0.95" />
          </linearGradient>

          {/* Bottom Chevron 3D Neon Bevel Gradient */}
          <linearGradient id="chevronBevelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#bef264" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#22c55e" floodOpacity="0.35" />
          </filter>

          <filter id="bevelGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#bef264" floodOpacity="0.9" />
          </filter>
        </defs>

        {/* 1. MAIN SHIELD BODY PATH */}
        {/* Top: rounded corners rx=24, Sides: vertical down to y=305, Bottom: chevron to (140, 365) */}
        <path
          d="M 38 15 L 242 15 Q 265 15, 265 38 L 265 305 L 140 365 L 15 305 L 15 38 Q 15 15, 38 15 Z"
          fill="url(#shieldGlassGrad)"
          stroke="rgba(74, 222, 128, 0.7)"
          strokeWidth="2.2"
          filter="url(#shieldGlow)"
        />

        {/* Specular Curved Highlight on Top-Left Shoulder */}
        <path
          d="M 38 18 L 242 18"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.45"
        />
        <path
          d="M 18 42 Q 18 18, 42 18"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />
        <ellipse cx="40" cy="28" rx="14" ry="4" fill="#ffffff" opacity="0.4" transform="rotate(-30 40 28)" filter="blur(1px)" />

        {/* 2. RAISED 3D NEON CHEVRON BEVEL ALONG BOTTOM V-EDGE */}
        <path
          d="M 18 305 L 140 363 L 262 305 L 252 293 L 140 348 L 28 293 Z"
          fill="url(#chevronBevelGrad)"
          filter="url(#bevelGlow)"
        />
        {/* Center Ridge Highlight on Chevron */}
        <line x1="140" y1="348" x2="140" y2="363" stroke="#ffffff" strokeWidth="1.8" opacity="0.8" />

        {/* 3. TROPHY WITH LAUREL WREATH */}
        <g transform="translate(104, 52) scale(1.02)">
          <TrophyLaurel3D className="w-[72px] h-[62px]" />
        </g>

        {/* 4. RANKING NUMBER */}
        <text
          x="140"
          y="235"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="31"
          fontWeight="900"
          letterSpacing="-1"
          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.85))"
        >
          {loading ? "—" : formattedRanking}
        </text>

        {/* 5. SUBTITLE */}
        <text
          x="140"
          y="272"
          textAnchor="middle"
          fill="#d1fae5"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="18"
          fontWeight="600"
          letterSpacing="0.4"
        >
          Global Ranking
        </text>
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

  return (
    <div
      className={`relative w-full max-w-[1080px] mx-auto rounded-[48px] p-4 sm:p-6 md:p-7 overflow-visible transition-all duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(8, 24, 18, 0.45) 0%, rgba(3, 12, 8, 0.72) 50%, rgba(6, 18, 14, 0.45) 100%)",
        border: "1.5px solid rgba(74, 222, 128, 0.25)",
        boxShadow:
          "0 25px 60px rgba(0, 0, 0, 0.85), inset 0 2px 6px rgba(255, 255, 255, 0.15), inset 0 -4px 12px rgba(0, 0, 0, 0.7)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
      }}
    >
      {/* Ambient Neon Glow in Background */}
      <div className="absolute -top-16 left-1/4 w-72 h-32 bg-emerald-500/15 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute -bottom-16 right-1/4 w-72 h-32 bg-lime-500/15 blur-3xl rounded-full pointer-events-none" />

      {/* Proportional 3-Column Cyber Layout matching media_1794123896316_7f3aaa20.jpg:
          Col 1: Cyber Dial with 3 Branching Connectors
          Col 2: 3 Stacked Difficulty Glass Pills (Easy, Medium, Hard)
          Col 3: Global Ranking Hexagonal Shield Badge
      */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_1.1fr_0.9fr] items-center gap-5 lg:gap-4 xl:gap-5">
        
        {/* 1. LEFT: Cyber Dial (Total Solved) */}
        <div className="flex items-center justify-center w-full">
          <TotalSolvedCyberDial
            totalSolved={safeTotal}
            loading={loading}
          />
        </div>

        {/* 2. MIDDLE: 3 Stacked Difficulty Glass Pills */}
        <div className="flex flex-col gap-3.5 sm:gap-4 justify-center w-full">
          {/* Easy Pill */}
          <DifficultyPillCard
            label="Easy"
            count={easySolved}
            totalForMax={14}
            icon={<LightningBolt3D className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(0,245,210,0.7)]" />}
            loading={loading}
          />

          {/* Medium Pill */}
          <DifficultyPillCard
            label="Medium"
            count={mediumSolved}
            totalForMax={10}
            icon={<Layers3D className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(255,174,34,0.7)]" />}
            loading={loading}
          />

          {/* Hard Pill */}
          <DifficultyPillCard
            label="Hard"
            count={hardSolved}
            totalForMax={5}
            icon={<Flag3D className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_0_8px_rgba(255,68,78,0.7)]" />}
            loading={loading}
          />
        </div>

        {/* 3. RIGHT: Global Ranking Hexagonal Shield */}
        <div className="flex items-center justify-center w-full">
          <GlobalRankingShield
            ranking={ranking}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
}
