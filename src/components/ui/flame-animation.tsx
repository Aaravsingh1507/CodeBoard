"use client";

import React, { useId } from "react";

interface FlameAnimationProps {
  className?: string;
  size?: number;
}

export function FlameAnimation({ className = "h-7 w-7", size }: FlameAnimationProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "_");
  const outerGradId = `flame-outer-${uid}`;
  const midGradId = `flame-mid-${uid}`;
  const coreGradId = `flame-core-${uid}`;
  const glowGradId = `flame-glow-${uid}`;

  const style = size ? { width: size, height: size } : undefined;

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className="w-full h-full overflow-visible"
        style={{
          filter: "drop-shadow(0 0 7px rgba(249, 115, 22, 0.75)) drop-shadow(0 0 14px rgba(234, 88, 12, 0.45))",
          animation: "flame-glow 2.2s ease-in-out infinite alternate",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <defs>
          {/* Outer Flame Gradient: deep red/crimson to fiery orange */}
          <linearGradient id={outerGradId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="25%" stopColor="#ea580c" />
            <stop offset="65%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Middle Flame Gradient: hot fiery amber to gold */}
          <linearGradient id={midGradId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#ea580c" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="80%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* Inner Flame Core: blazing white-hot yellow to radiant pure white */}
          <linearGradient id={coreGradId} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="35%" stopColor="#fbbf24" />
            <stop offset="75%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          {/* Base bottom ambient glow radial */}
          <radialGradient id={glowGradId} cx="50%" cy="85%" r="45%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient bottom base glow */}
        <ellipse cx="32" cy="53" rx="14" ry="5" fill={`url(#${glowGradId})`} opacity="0.7" />

        {/* Floating Sparks / Embers rising above the flame */}
        <circle
          cx="28"
          cy="20"
          r="1.4"
          fill="#fef08a"
          style={{
            transformOrigin: "28px 20px",
            animation: "ember-drift-1 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
          }}
        />
        <circle
          cx="37"
          cy="22"
          r="1.2"
          fill="#fbbf24"
          style={{
            transformOrigin: "37px 22px",
            animation: "ember-drift-2 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.6s",
          }}
        />
        <circle
          cx="32"
          cy="15"
          r="1.1"
          fill="#ffffff"
          style={{
            transformOrigin: "32px 15px",
            animation: "ember-drift-1 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.1s",
          }}
        />

        {/* Outer Flame Tongue (organic sway & flicker) */}
        <g
          style={{
            transformOrigin: "32px 56px",
            animation: "flame-outer 1.6s ease-in-out infinite alternate",
          }}
        >
          <path
            d="M 32 56 C 20 56 13 46 13 36 C 13 26 21 19 25 13 C 26 17 28 21 31 19 C 32 15 32 8 33 6 C 38 13 45 20 47 27 C 50 22 50 18 49 14 C 54 21 55 29 55 37 C 55 48 45 56 32 56 Z"
            fill={`url(#${outerGradId})`}
          />
        </g>

        {/* Middle Flame Tongue (faster, independent dancing motion) */}
        <g
          style={{
            transformOrigin: "32px 54px",
            animation: "flame-mid 1.2s ease-in-out infinite alternate-reverse",
          }}
        >
          <path
            d="M 32 54 C 23 54 18 45 18 37 C 18 29 24 23 27 18 C 28 22 30 24 32 22 C 34 17 34 12 34 10 C 38 16 43 22 44 29 C 46 25 45 21 44 19 C 48 25 49 31 49 38 C 49 46 42 54 32 54 Z"
            fill={`url(#${midGradId})`}
          />
        </g>

        {/* Inner Core Flame (heat pulse and micro-flicker) */}
        <g
          style={{
            transformOrigin: "32px 51px",
            animation: "flame-core 0.9s ease-in-out infinite alternate",
          }}
        >
          <path
            d="M 32 51 C 25 51 22 44 22 38 C 22 32 26 27 28 22 C 29 26 31 27 32 24 C 33 21 34 17 34 15 C 36 20 40 25 40 31 C 41 28 40 25 39 23 C 42 28 42 33 42 39 C 42 45 38 51 32 51 Z"
            fill={`url(#${coreGradId})`}
            opacity="0.96"
          />
        </g>
      </svg>
    </div>
  );
}
