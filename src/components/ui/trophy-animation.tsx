"use client";

import React, { useId } from "react";

interface TrophyAnimationProps {
  className?: string;
  size?: number;
}

export function TrophyAnimation({ className = "h-7 w-7", size }: TrophyAnimationProps) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, "_");

  const goldBowlId = `trophy-gold-bowl-${uid}`;
  const goldRimId = `trophy-gold-rim-${uid}`;
  const goldInsideId = `trophy-gold-inside-${uid}`;
  const goldStemId = `trophy-gold-stem-${uid}`;
  const goldBaseId = `trophy-gold-base-${uid}`;
  const goldHandleId = `trophy-gold-handle-${uid}`;
  const handleHighlightId = `trophy-handle-high-${uid}`;
  const shimmerGradId = `trophy-shimmer-grad-${uid}`;
  const starGradId = `trophy-star-grad-${uid}`;
  const glowGradId = `trophy-glow-grad-${uid}`;
  const cupMaskId = `trophy-cup-mask-${uid}`;

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
          filter: "drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)) drop-shadow(0 0 12px rgba(217, 119, 6, 0.35))",
          animation: "trophy-glow 2.5s ease-in-out infinite alternate",
          willChange: "transform",
          transform: "translateZ(0)",
        }}
      >
        <defs>
          {/* Main Cup Bowl 3D Gradient: Left Highlight -> Center Gold -> Right Bronze Shadow */}
          <linearGradient id={goldBowlId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="20%" stopColor="#fde047" />
            <stop offset="45%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>

          {/* Top Rim Ellipse Gradient */}
          <linearGradient id={goldRimId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="35%" stopColor="#fde047" />
            <stop offset="70%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Cup Bowl Interior Shadow */}
          <linearGradient id={goldInsideId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          {/* Stem & Node Gradient */}
          <linearGradient id={goldStemId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Stepped Pedestal Base Gradient */}
          <linearGradient id={goldBaseId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="25%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Curved Handles Gradient */}
          <linearGradient id={goldHandleId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde047" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>

          {/* Handle Highlight Stroke */}
          <linearGradient id={handleHighlightId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#fef08a" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
          </linearGradient>

          {/* Embossed Star Gradient */}
          <linearGradient id={starGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Dynamic Specular Shimmer Streak */}
          <linearGradient id={shimmerGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Radial Ambient Backlight Behind Trophy */}
          <radialGradient id={glowGradId} cx="50%" cy="45%" r="50%">
            <stop offset="0%" stopColor="#fde047" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#f59e0b" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#78350f" stopOpacity="0" />
          </radialGradient>

          {/* Mask to keep the specular sheen confined strictly inside the cup bowl & base */}
          <mask id={cupMaskId}>
            <g fill="#ffffff">
              {/* Cup Bowl Shape */}
              <path d="M 20 16 L 44 16 C 44 26 42 34 35 37.5 C 33.5 38.3 30.5 38.3 29 37.5 C 22 34 20 26 20 16 Z" />
              <ellipse cx="32" cy="16" rx="12" ry="3" />
              {/* Stem & Base */}
              <path d="M 29 37.5 L 35 37.5 L 34.5 45 L 29.5 45 Z" />
              <path d="M 24 45 L 40 45 L 42 51 L 22 51 Z" />
              <rect x="17" y="51" width="30" height="5.5" rx="2" />
            </g>
          </mask>
        </defs>

        {/* Ambient Backlight Aura */}
        <circle cx="32" cy="32" r="24" fill={`url(#${glowGradId})`} />

        {/* Main Trophy Group with Subtle Float Animation */}
        <g
          style={{
            animation: "trophy-float 3s ease-in-out infinite",
            transformOrigin: "32px 35px",
          }}
        >
          {/* 1. Curved Handles (Left & Right) */}
          {/* Left Handle Shadow & Body */}
          <path
            d="M 22 19 C 12 19 10 27 14 33 C 17.5 36.5 22.5 35 25 33"
            fill="none"
            stroke={`url(#${goldHandleId})`}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 22 19 C 13.5 19 12 25.5 14.5 30.5"
            fill="none"
            stroke={`url(#${handleHighlightId})`}
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* Right Handle Shadow & Body */}
          <path
            d="M 42 19 C 52 19 54 27 50 33 C 46.5 36.5 41.5 35 39 33"
            fill="none"
            stroke={`url(#${goldHandleId})`}
            strokeWidth="3.4"
            strokeLinecap="round"
          />
          <path
            d="M 42 19 C 48.5 19 50.5 24 49 29"
            fill="none"
            stroke={`url(#${handleHighlightId})`}
            strokeWidth="1.2"
            strokeLinecap="round"
          />

          {/* 2. Pedestal / Stepped Base */}
          {/* Bottom Foot Plate */}
          <rect
            x="17"
            y="51"
            width="30"
            height="5.5"
            rx="2"
            fill={`url(#${goldBaseId})`}
          />
          <line
            x1="19"
            y1="51.8"
            x2="45"
            y2="51.8"
            stroke="#ffffff"
            strokeWidth="0.8"
            strokeOpacity="0.75"
          />

          {/* Base Middle Tier (Bevel) */}
          <path
            d="M 24 45 L 40 45 L 42 51 L 22 51 Z"
            fill={`url(#${goldBaseId})`}
          />

          {/* 3. Stem (Slender Neck & Node) */}
          <path
            d="M 29.5 37.5 L 34.5 37.5 L 34 45 L 30 45 Z"
            fill={`url(#${goldStemId})`}
          />
          {/* Stem Decorative Spherical Bead */}
          <ellipse
            cx="32"
            cy="41.5"
            rx="4.2"
            ry="1.8"
            fill={`url(#${goldBowlId})`}
          />

          {/* 4. Cup Chalice Body */}
          <path
            d="M 20 16 L 44 16 C 44 26 42 34 35 37.5 C 33.5 38.3 30.5 38.3 29 37.5 C 22 34 20 26 20 16 Z"
            fill={`url(#${goldBowlId})`}
          />

          {/* Left Specular Highlight Glint Curve */}
          <path
            d="M 21.5 18 C 21.5 24.5 23 31.5 28 35"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            strokeOpacity="0.55"
            strokeLinecap="round"
          />

          {/* Inside Cup Interior Cavity */}
          <ellipse
            cx="32"
            cy="16"
            rx="11.5"
            ry="2.6"
            fill={`url(#${goldInsideId})`}
          />

          {/* Top Golden Rim Lip */}
          <ellipse
            cx="32"
            cy="15.8"
            rx="12"
            ry="2.7"
            fill="none"
            stroke={`url(#${goldRimId})`}
            strokeWidth="1.4"
          />

          {/* 5. Embossed Champion Star in Center of Cup */}
          <g filter="drop-shadow(0 1px 2px rgba(120,53,15,0.7))">
            <path
              d="M 32 22.8 L 33.4 25.4 L 36.3 25.6 L 34.1 27.5 L 34.8 30.3 L 32 28.7 L 29.2 30.3 L 29.9 27.5 L 27.7 25.6 L 30.6 25.4 Z"
              fill={`url(#${starGradId})`}
            />
          </g>

          {/* 6. Dynamic Specular Light Sweep Across Cup */}
          <g mask={`url(#${cupMaskId})`}>
            <rect
              x="-20"
              y="10"
              width="18"
              height="48"
              fill={`url(#${shimmerGradId})`}
              style={{
                animation: "trophy-shimmer 3.2s cubic-bezier(0.4, 0, 0.2, 1) infinite",
              }}
            />
          </g>

          {/* 7. Twinkling Sparkles / Star Glints */}
          {/* Sparkle 1: Top Left Rim */}
          <g
            style={{
              transformOrigin: "19px 15px",
              animation: "trophy-sparkle-1 2.6s ease-in-out infinite",
            }}
          >
            <path
              d="M 19 11 Q 19 15 23 15 Q 19 15 19 19 Q 19 15 15 15 Q 19 15 19 11 Z"
              fill="#ffffff"
              filter="drop-shadow(0 0 3px #fde047)"
            />
          </g>

          {/* Sparkle 2: Right Handle Peak */}
          <g
            style={{
              transformOrigin: "49px 19px",
              animation: "trophy-sparkle-2 2.6s ease-in-out infinite",
            }}
          >
            <path
              d="M 49 15.5 Q 49 19 52.5 19 Q 49 19 49 22.5 Q 49 19 45.5 19 Q 49 19 49 15.5 Z"
              fill="#ffffff"
              filter="drop-shadow(0 0 3px #fde047)"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}

