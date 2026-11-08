"use client";

import React from "react";

// =========================================================================
// 3D ICONS - PIXEL-PERFECT ASSETS MATCHING media_1794123896316_7f3aaa20.jpg
// =========================================================================

/**
 * 3D Open Laptop with glowing </> code screen matching reference design
 */
export function LaptopCode3D({ className = "w-10 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="laptopLidGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="25%" stopColor="#252f44" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="laptopScreenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <linearGradient id="laptopBaseGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#cbd5e1" />
          <stop offset="40%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <filter id="laptopDropShadow" x="-20%" y="-10%" width="140%" height="150%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.75" />
        </filter>
        <filter id="codeGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#4ade80" floodOpacity="0.95" />
        </filter>
      </defs>

      {/* Ambient shadow beneath laptop base */}
      <ellipse cx="28" cy="39" rx="25" ry="3" fill="#000000" opacity="0.7" filter="blur(1.5px)" />

      {/* Screen Lid (3D Beveled Box) */}
      <g filter="url(#laptopDropShadow)">
        <rect
          x="9"
          y="4"
          width="38"
          height="26"
          rx="4"
          fill="url(#laptopLidGrad)"
          stroke="#64748b"
          strokeWidth="1"
        />
        {/* Specular top highlight */}
        <line x1="13" y1="5" x2="43" y2="5" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.5" />

        {/* Inner OLED Display */}
        <rect x="11.5" y="6.5" width="33" height="21" rx="2.5" fill="url(#laptopScreenGrad)" />

        {/* Glowing Neon Code </> Brackets on Screen */}
        <g filter="url(#codeGlow)">
          <path
            d="M22.5 12.5L17.5 16.5L22.5 20.5"
            stroke="#4ade80"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M33.5 12.5L38.5 16.5L33.5 20.5"
            stroke="#4ade80"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="29.5"
            y1="11"
            x2="26.5"
            y2="22"
            stroke="#4ade80"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
        </g>
      </g>

      {/* Laptop Keyboard Deck (Front 3D Wedge) */}
      <path
        d="M5 29C5 27.6 6.1 26.5 7.5 26.5H48.5C49.9 26.5 51 27.6 51 29L49.5 35C49.2 36.2 48.1 37 46.9 37H9.1C7.9 37 6.8 36.2 6.5 35L5 29Z"
        fill="url(#laptopBaseGrad)"
        stroke="#64748b"
        strokeWidth="0.8"
      />
      {/* Front Edge Bevel */}
      <line x1="9" y1="36.5" x2="47" y2="36.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.6" />
      {/* Trackpad Notch */}
      <rect x="23.5" y="27.5" width="9" height="1.8" rx="0.9" fill="#1e293b" opacity="0.8" />
    </svg>
  );
}

/**
 * 3D Electric Lime-Cyan Lightning Bolt (Easy) matching reference design
 */
export function LightningBolt3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="boltLimeFront" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#bef264" />
          <stop offset="45%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
        <linearGradient id="boltLimeSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#052e16" />
        </linearGradient>
        <filter id="boltLimeNeonBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#4ade80" floodOpacity="0.9" />
        </filter>
      </defs>

      <g filter="url(#boltLimeNeonBloom)">
        {/* 3D Depth Extrusion */}
        <path
          d="M21 3L9 18.5H18.5L16 33L28 16.5H19L21 3Z"
          fill="url(#boltLimeSide)"
          transform="translate(1, 1)"
        />
        {/* Main Front Face */}
        <path
          d="M21 3L9 18.5H18.5L16 33L28 16.5H19L21 3Z"
          fill="url(#boltLimeFront)"
        />
        {/* Specular Ridge Line */}
        <path
          d="M21 3L9 18.5H18.5L16 33"
          stroke="#ffffff"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.85"
        />
      </g>
    </svg>
  );
}

/**
 * 3D Isometric Stacked Layers in Lime/Amber (Medium) matching reference design
 */
export function Layers3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="layerLimeTop" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#bef264" />
          <stop offset="100%" stopColor="#84cc16" />
        </linearGradient>
        <linearGradient id="layerLimeMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bef264" />
          <stop offset="100%" stopColor="#65a30d" />
        </linearGradient>
        <linearGradient id="layerLimeBot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a3e635" />
          <stop offset="100%" stopColor="#4d7c0f" />
        </linearGradient>
        <filter id="layerLimeBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#bef264" floodOpacity="0.85" />
        </filter>
      </defs>

      <g filter="url(#layerLimeBloom)">
        {/* BOTTOM LAYER */}
        <path d="M18 26.5L7 21.5L18 16.5L29 21.5L18 26.5Z" fill="url(#layerLimeBot)" />
        <path d="M7 21.5L18 26.5L29 21.5V23.5L18 28.5L7 23.5V21.5Z" fill="#365314" />

        {/* MIDDLE LAYER */}
        <path d="M18 20.5L7 15.5L18 10.5L29 15.5L18 20.5Z" fill="url(#layerLimeMid)" />
        <path d="M7 15.5L18 20.5L29 15.5V17.5L18 22.5L7 17.5V15.5Z" fill="#3f6212" />

        {/* TOP LAYER */}
        <path
          d="M18 14.5L7 9.5L18 4.5L29 9.5L18 14.5Z"
          fill="url(#layerLimeTop)"
          stroke="#fef08a"
          strokeWidth="0.8"
        />
        <path d="M7 9.5L18 14.5L29 9.5V11.5L18 16.5L7 11.5V9.5Z" fill="#4d7c0f" />
        {/* Centerline shine */}
        <path d="M7 9.5L18 14.5L29 9.5" stroke="#ffffff" strokeWidth="1.1" opacity="0.75" />
      </g>
    </svg>
  );
}

/**
 * 3D Waving Pennant Flag in Electric Lime (Hard) matching reference design
 */
export function Flag3D({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="flagLimeCloth" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="35%" stopColor="#bef264" />
          <stop offset="75%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>
        <linearGradient id="flagPoleGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="50%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>
        <filter id="flagLimeBloom" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#bef264" floodOpacity="0.85" />
        </filter>
      </defs>

      <g filter="url(#flagLimeBloom)">
        {/* Flag Pole */}
        <rect x="7" y="4.5" width="2.8" height="27" rx="1.4" fill="url(#flagPoleGrad)" />
        {/* Golden/Lime Finial Ball on top */}
        <circle cx="8.4" cy="4.5" r="2.2" fill="#fef08a" stroke="#84cc16" strokeWidth="0.6" />

        {/* 3D Pennant Flag Body */}
        <path
          d="M9.8 6.5L29 13.5C29.8 13.8 29.8 14.8 29 15.1L9.8 22V6.5Z"
          fill="url(#flagLimeCloth)"
        />

        {/* 3D Wave Ripple Highlight */}
        <path
          d="M9.8 6.5Q19 11 29 14.3"
          stroke="#ffffff"
          strokeWidth="1.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        {/* Shadow crease */}
        <path
          d="M10 20Q18 16 27 15"
          stroke="#14532d"
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
 * 3D Electric Lime-Golden Trophy with Laurel Wreath matching media_1794123896316_7f3aaa20.jpg exactly
 */
export function TrophyLaurel3D({ className = "w-20 h-18" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Vibrant Lime-Gold Gradients */}
        <linearGradient id="trophyGoldLimeBody" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="20%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#bef264" />
          <stop offset="80%" stopColor="#84cc16" />
          <stop offset="100%" stopColor="#3f6212" />
        </linearGradient>

        <linearGradient id="trophyRimGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="50%" stopColor="#bef264" />
          <stop offset="100%" stopColor="#65a30d" />
        </linearGradient>

        <linearGradient id="trophyHandleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#bef264" />
          <stop offset="80%" stopColor="#65a30d" />
          <stop offset="100%" stopColor="#365314" />
        </linearGradient>

        <linearGradient id="laurelLeafGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="25%" stopColor="#bef264" />
          <stop offset="70%" stopColor="#4ade80" />
          <stop offset="100%" stopColor="#15803d" />
        </linearGradient>

        <filter id="trophyLimeGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="4.5" floodColor="#bef264" floodOpacity="0.85" />
        </filter>
      </defs>

      <g filter="url(#trophyLimeGlow)">
        {/* ========================================================
            1. LAUREL WREATH STEMS & LEAVES (Lime-Green Wreath)
           ======================================================== */}
        {/* Left Laurel Branch Stem */}
        <path
          d="M20 25C13 35 13 47 23 55"
          stroke="url(#laurelLeafGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Left Laurel Leaves */}
        <g fill="url(#laurelLeafGrad)">
          <path d="M15 24C12 22.8 10 25.5 12.5 28C15 29.8 17.5 27 15 24Z" />
          <path d="M11.5 31C8.5 30.2 7.5 33.8 10.3 35.8C13.3 37 14.5 34 11.5 31Z" />
          <path d="M12 39C9.3 39 9 42.8 12 44.5C15 45.8 16 42 12 39Z" />
          <path d="M16 47C13.5 47.8 14 51.5 17 52.8C20 53.5 20.5 49.8 16 47Z" />
        </g>
        {/* Left Leaf Center Ribs */}
        <path d="M12.5 26.5C14 27.5 15.5 26.5 15.5 26.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        <path d="M10.3 34C12 35 13.3 34 13.3 34" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        <path d="M11 42C12.7 43 14.3 42 14.3 42" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        <path d="M15.5 49.5C17.3 50.5 18.5 49.5 18.5 49.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />

        {/* Right Laurel Branch Stem */}
        <path
          d="M60 25C67 35 67 47 57 55"
          stroke="url(#laurelLeafGrad)"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right Laurel Leaves */}
        <g fill="url(#laurelLeafGrad)">
          <path d="M65 24C68 22.8 70 25.5 67.5 28C65 29.8 62.5 27 65 24Z" />
          <path d="M68.5 31C71.5 30.2 72.5 33.8 69.7 35.8C66.7 37 65.5 34 68.5 31Z" />
          <path d="M68 39C70.7 39 71 42.8 68 44.5C65 45.8 64 42 68 39Z" />
          <path d="M64 47C66.5 47.8 66 51.5 63 52.8C60 53.5 59.5 49.8 64 47Z" />
        </g>
        {/* Right Leaf Center Ribs */}
        <path d="M67.5 26.5C66 27.5 64.5 26.5 64.5 26.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        <path d="M69.7 34C68 35 66.7 34 66.7 34" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        <path d="M69 42C67.3 43 65.7 42 65.7 42" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />
        <path d="M64.5 49.5C62.7 50.5 61.5 49.5 61.5 49.5" stroke="#ffffff" strokeWidth="0.8" strokeLinecap="round" opacity="0.7" />

        {/* ========================================================
            2. 3D CUP HANDLES
           ======================================================== */}
        <path
          d="M27 21C17 21 17 36 27 36"
          stroke="url(#trophyHandleGrad)"
          strokeWidth="3.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M26.5 21.5C18.5 21.5 18.5 35 26.5 35"
          stroke="#ffffff"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        <path
          d="M53 21C63 21 63 36 53 36"
          stroke="url(#trophyHandleGrad)"
          strokeWidth="3.8"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M53.5 21.5C61.5 21.5 61.5 35 53.5 35"
          stroke="#ffffff"
          strokeWidth="1.1"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* ========================================================
            3. 3D TROPHY CUP BODY & SPECULAR SHINE
           ======================================================== */}
        <path
          d="M26 17H54V30C54 39 47 44 40 44C33 44 26 39 26 30V17Z"
          fill="url(#trophyGoldLimeBody)"
        />

        {/* Specular curved reflection on cup face */}
        <path
          d="M29 20C29 30 33 38 38 41"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />

        {/* Top Rim Oval Bevel */}
        <ellipse cx="40" cy="17" rx="14" ry="2.8" fill="url(#trophyRimGrad)" />
        <ellipse cx="40" cy="17" rx="12" ry="1.9" fill="#65a30d" opacity="0.7" />

        {/* 3D Embossed Star on Front of Cup */}
        <path
          d="M40 24L41.5 27.5L45.5 27.8L42.5 30.3L43.4 34.2L40 31.9L36.6 34.2L37.5 30.3L34.5 27.8L38.5 27.5Z"
          fill="#14532d"
          stroke="#bef264"
          strokeWidth="0.8"
          filter="drop-shadow(0 1px 2px rgba(0,0,0,0.5))"
        />

        {/* ========================================================
            4. 3D STEM & STEPPED PEDESTAL BASE
           ======================================================== */}
        <rect x="37.5" y="44" width="5" height="6" rx="1" fill="#4d7c0f" />

        {/* Flared Pedestal Tier */}
        <path d="M31 50H49L51 56H29L31 50Z" fill="url(#trophyGoldLimeBody)" />
        <line x1="31.5" y1="50.5" x2="48.5" y2="50.5" stroke="#ffffff" strokeWidth="0.8" opacity="0.8" />

        {/* Bottom Base Plinth */}
        <rect x="25" y="56" width="30" height="4.5" rx="2.2" fill="#14532d" stroke="#bef264" strokeWidth="0.9" />
        <rect x="26" y="56.5" width="28" height="1.4" rx="0.7" fill="#fef08a" opacity="0.85" />
      </g>
    </svg>
  );
}

// =========================================================================
// 1. TOTAL SOLVED CYBER DIAL (With Branching Circuit Connector Nodes)
// Matching media_1794123896316_7f3aaa20.jpg exactly
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
        viewBox="0 0 380 380"
        className="w-full h-full overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Outer Neon Arc Gradient: Electric Lime to Vibrant Green to Mint Cyan */}
          <linearGradient id="dialNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e3f610" />
            <stop offset="40%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#00f5c4" />
          </linearGradient>

          {/* Core Dark Translucent Emerald Glass Gradient */}
          <radialGradient id="dialCoreGrad" cx="45%" cy="38%" r="68%">
            <stop offset="0%" stopColor="#0a3524" />
            <stop offset="60%" stopColor="#031b12" />
            <stop offset="100%" stopColor="#010e08" />
          </radialGradient>

          {/* Outer Ring Groove Gradient */}
          <linearGradient id="dialGrooveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0e3d2b" />
            <stop offset="50%" stopColor="#041810" />
            <stop offset="100%" stopColor="#072b1c" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="dialArcGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6.5" floodColor="#bef264" floodOpacity="0.95" />
          </filter>

          <filter id="dialPeakGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="7" floodColor="#e3f610" floodOpacity="1" />
          </filter>

          <filter id="wireGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#4ade80" floodOpacity="0.9" />
          </filter>

          <filter id="nodeHalo" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="4.5" floodColor="#bef264" floodOpacity="1" />
          </filter>
        </defs>

        {/* Ambient Outer Emerald Halo */}
        <circle cx="165" cy="190" r="135" fill="#22c55e" opacity="0.1" filter="blur(20px)" />

        {/* 1. OUTER GROOVE BEVEL RING */}
        <circle
          cx="165"
          cy="190"
          r="132"
          stroke="url(#dialGrooveGrad)"
          strokeWidth="15"
          fill="none"
        />
        <circle
          cx="165"
          cy="190"
          r="140"
          stroke="rgba(74, 222, 128, 0.4)"
          strokeWidth="1.6"
          fill="none"
        />

        {/* 2. MAIN ACTIVE NEON ARC (Left side from ~5:15 to ~12:15) */}
        <path
          d="M 212 314 A 130 130 0 1 1 188 62"
          stroke="url(#dialNeonGrad)"
          strokeWidth="14"
          strokeLinecap="round"
          fill="none"
          filter="url(#dialArcGlow)"
        />

        {/* Specular Ridge Line along Main Arc */}
        <path
          d="M 212 314 A 130 130 0 1 1 188 62"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
          opacity="0.65"
        />

        {/* 3. TOP SECONDARY NEON ACCENT ARC (~11:00 to ~1:00) */}
        <path
          d="M 110 73 A 130 130 0 0 1 220 73"
          stroke="#e3f610"
          strokeWidth="13"
          strokeLinecap="round"
          fill="none"
          filter="url(#dialPeakGlow)"
        />

        {/* 4. INNER GLASS CORE DISK */}
        <circle
          cx="165"
          cy="190"
          r="106"
          fill="url(#dialCoreGrad)"
          stroke="rgba(74, 222, 128, 0.55)"
          strokeWidth="2.4"
        />

        {/* Specular Top-Left Glass Arc Reflection */}
        <path
          d="M 100 114 A 106 106 0 0 1 222 110"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <ellipse cx="125" cy="118" rx="20" ry="5.5" fill="#ffffff" opacity="0.35" transform="rotate(-25 125 118)" filter="blur(1px)" />

        {/* 5. 3D OPEN LAPTOP INSIDE CORE */}
        <g transform="translate(137, 108)">
          <LaptopCode3D className="w-[56px] h-[42px]" />
        </g>

        {/* 6. BIG NUMBER & LABEL */}
        <text
          x="165"
          y="204"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="66"
          fontWeight="900"
          letterSpacing="-1.5"
          filter="drop-shadow(0 2px 8px rgba(0,0,0,0.9))"
        >
          {loading ? "—" : safeTotal}
        </text>

        <text
          x="165"
          y="233"
          textAnchor="middle"
          fill="#d1fae5"
          fontFamily="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="0.4"
        >
          Total Solved
        </text>

        {/* 7. 3-WAY BRANCHING CIRCUIT WIRES WITH GLOWING JUNCTION NODES */}
        {/* Branch 1: Curves UP towards Easy Pill */}
        <path
          d="M 292 186 C 308 186, 318 168, 330 156 C 342 144, 355 128, 380 61"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#wireGlow)"
        />
        {/* Node 1 */}
        <circle cx="330" cy="156" r="8" fill="#bef264" filter="url(#nodeHalo)" />
        <circle cx="330" cy="156" r="3.2" fill="#ffffff" />

        {/* Branch 2: Horizontal straight into Medium Pill */}
        <line
          x1="295"
          y1="186"
          x2="380"
          y2="186"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#wireGlow)"
        />
        {/* Node 2 */}
        <circle cx="355" cy="186" r="8" fill="#bef264" filter="url(#nodeHalo)" />
        <circle cx="355" cy="186" r="3.2" fill="#ffffff" />

        {/* Branch 3: Curves DOWN towards Hard Pill */}
        <path
          d="M 292 186 C 308 186, 318 204, 330 216 C 342 228, 355 244, 380 311"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          filter="url(#wireGlow)"
        />
        {/* Node 3 */}
        <circle cx="330" cy="216" r="8" fill="#bef264" filter="url(#nodeHalo)" />
        <circle cx="330" cy="216" r="3.2" fill="#ffffff" />
      </svg>
    </div>
  );
}

// =========================================================================
// 2. DIFFICULTY PILL CARD (With 10-Block Segmented Progress Bar)
// Matching media_1794123896316_7f3aaa20.jpg exactly
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
  // 10 discrete blocks in the progress bar matching reference
  const totalBlocks = 10;
  // Calculate lit blocks dynamically based on real data
  const litBlocks = Math.max(0, Math.min(totalBlocks, Math.round((count / totalForMax) * totalBlocks)));

  return (
    <div
      className="group relative flex items-center justify-between px-4 sm:px-5 py-3 h-[110px] w-full rounded-[38px] transition-all duration-300 hover:scale-[1.02] cursor-default overflow-hidden select-none"
      style={{
        background:
          "linear-gradient(135deg, rgba(6, 42, 28, 0.72) 0%, rgba(2, 20, 14, 0.92) 100%)",
        border: "1.8px solid rgba(74, 222, 128, 0.7)",
        boxShadow:
          "inset 0 1.5px 3px rgba(255, 255, 255, 0.45), inset 0 0 20px rgba(34, 197, 94, 0.25), 0 0 24px rgba(34, 197, 94, 0.35)",
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
            border: "1.6px solid rgba(74, 222, 128, 0.75)",
            boxShadow:
              "inset 0 1px 2px rgba(255, 255, 255, 0.4), 0 0 14px rgba(34, 197, 94, 0.4)",
          }}
        >
          {icon}
        </div>

        {/* Center: Title + 10-Block Segmented Progress Bar */}
        <div className="flex flex-col text-left">
          <span className="font-bold text-lg sm:text-[20px] text-white tracking-wide leading-tight">
            {label}
          </span>

          {/* 10 Segmented Rounded Blocks directly underneath Title */}
          <div className="flex items-center gap-1 sm:gap-1.5 mt-2">
            {Array.from({ length: totalBlocks }).map((_, idx) => {
              const isLit = idx < litBlocks;
              return (
                <div
                  key={idx}
                  className={`h-3 w-2 sm:w-2.5 rounded-[2.5px] transition-all duration-300 ${
                    isLit
                      ? "bg-gradient-to-b from-[#e3f610] via-[#4ade80] to-[#22c55e] shadow-[0_0_8px_#4ade80]"
                      : "bg-[#0d2e20]/70 border border-white/5"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Big Bold Metric Number matching reference */}
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
// Matching media_1794123896316_7f3aaa20.jpg exactly
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
      className={`group relative flex flex-col items-center justify-between w-full max-w-[290px] h-[360px] sm:h-[370px] mx-auto transition-all duration-300 hover:scale-[1.01] select-none ${className}`}
    >
      <svg
        viewBox="0 0 280 375"
        className="w-full h-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Shield Dark Emerald Glass Gradient */}
          <linearGradient id="shieldGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#083827" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#031c12" stopOpacity="0.92" />
            <stop offset="100%" stopColor="#02120b" stopOpacity="0.96" />
          </linearGradient>

          {/* Bottom Chevron 3D Neon Bevel Gradient */}
          <linearGradient id="chevronBevelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#e3f610" />
            <stop offset="100%" stopColor="#22c55e" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="shieldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#22c55e" floodOpacity="0.4" />
          </filter>

          <filter id="bevelGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#bef264" floodOpacity="0.95" />
          </filter>
        </defs>

        {/* 1. MAIN SHIELD BODY PATH */}
        {/* Top: rounded corners rx=24, Sides: vertical down to y=305, Bottom: chevron to (140, 365) */}
        <path
          d="M 38 15 L 242 15 Q 265 15, 265 38 L 265 305 L 140 365 L 15 305 L 15 38 Q 15 15, 38 15 Z"
          fill="url(#shieldGlassGrad)"
          stroke="rgba(74, 222, 128, 0.75)"
          strokeWidth="2.2"
          filter="url(#shieldGlow)"
        />

        {/* Specular Curved Highlight on Top-Left Shoulder */}
        <path
          d="M 38 18 L 242 18"
          stroke="#ffffff"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.5"
        />
        <path
          d="M 18 42 Q 18 18, 42 18"
          stroke="#ffffff"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <ellipse cx="40" cy="28" rx="14" ry="4" fill="#ffffff" opacity="0.45" transform="rotate(-30 40 28)" filter="blur(1px)" />

        {/* 2. RAISED 3D NEON CHEVRON BEVEL ALONG BOTTOM V-EDGE */}
        <path
          d="M 18 305 L 140 363 L 262 305 L 252 293 L 140 348 L 28 293 Z"
          fill="url(#chevronBevelGrad)"
          filter="url(#bevelGlow)"
        />
        {/* Center Ridge Highlight on Chevron */}
        <line x1="140" y1="348" x2="140" y2="363" stroke="#ffffff" strokeWidth="2" opacity="0.85" />

        {/* 3. TROPHY WITH LAUREL WREATH */}
        <g transform="translate(100, 48)">
          <TrophyLaurel3D className="w-[80px] h-[68px]" />
        </g>

        {/* 4. RANKING NUMBER */}
        <text
          x="140"
          y="232"
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
          y="268"
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
      className={`relative w-full max-w-[1040px] mx-auto overflow-visible select-none transition-all duration-300 ${className}`}
    >
      {/* Subtle Ambient Cyber Halos in Background (matching pure dark background) */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-80 h-40 bg-emerald-500/10 blur-3xl rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-40 bg-lime-500/10 blur-3xl rounded-full pointer-events-none" />

      {/* Proportional 3-Column Cyber Layout matching media_1794123896316_7f3aaa20.jpg:
          Col 1: Cyber Dial with 3 Branching Connectors
          Col 2: 3 Stacked Difficulty Glass Pills (Easy, Medium, Hard)
          Col 3: Global Ranking Hexagonal Shield Badge
      */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1.1fr_0.95fr] items-center gap-5 lg:gap-3 xl:gap-4">
        
        {/* 1. LEFT: Cyber Dial (Total Solved) */}
        <div className="flex items-center justify-center w-full">
          <TotalSolvedCyberDial
            totalSolved={safeTotal}
            loading={loading}
          />
        </div>

        {/* 2. MIDDLE: 3 Stacked Difficulty Glass Pills */}
        <div className="flex flex-col gap-3.5 justify-center w-full h-[360px]">
          {/* Easy Pill */}
          <DifficultyPillCard
            label="Easy"
            count={easySolved}
            totalForMax={14}
            icon={<LightningBolt3D className="w-7 h-7 sm:w-8 sm:h-8" />}
            loading={loading}
          />

          {/* Medium Pill */}
          <DifficultyPillCard
            label="Medium"
            count={mediumSolved}
            totalForMax={10}
            icon={<Layers3D className="w-7 h-7 sm:w-8 sm:h-8" />}
            loading={loading}
          />

          {/* Hard Pill */}
          <DifficultyPillCard
            label="Hard"
            count={hardSolved}
            totalForMax={5}
            icon={<Flag3D className="w-7 h-7 sm:w-8 sm:h-8" />}
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

