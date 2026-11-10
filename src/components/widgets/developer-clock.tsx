"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export function DeveloperClock() {
  const hourHandRef = useRef<SVGGElement>(null);
  const minuteHandRef = useRef<SVGGElement>(null);
  const secondHandRef = useRef<SVGGElement>(null);

  useEffect(() => {
    let animId: number;

    const updateClock = () => {
      const now = new Date();
      const ms = now.getMilliseconds();
      const seconds = now.getSeconds() + ms / 1000;
      const minutes = now.getMinutes() + seconds / 60;
      const hours = (now.getHours() % 12) + minutes / 60;

      const secondDeg = seconds * 6; // 360deg / 60s
      const minuteDeg = minutes * 6; // 360deg / 60m
      const hourDeg = hours * 30; // 360deg / 12h

      if (secondHandRef.current) {
        secondHandRef.current.setAttribute("transform", `rotate(${secondDeg.toFixed(2)} 512 512)`);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.setAttribute("transform", `rotate(${minuteDeg.toFixed(2)} 512 512)`);
      }
      if (hourHandRef.current) {
        hourHandRef.current.setAttribute("transform", `rotate(${hourDeg.toFixed(2)} 512 512)`);
      }

      animId = requestAnimationFrame(updateClock);
    };

    updateClock();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[360px] xl:min-h-[400px] flex items-center justify-center p-0">
      {/* Soft ambient aura matching the clock's green and amber glass glowing corners */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-amber-500/10 to-transparent blur-2xl" />

      {/* Clock housing matching exact scale and size of previous workspace artwork */}
      <div className="relative w-full h-full min-h-[360px] xl:min-h-[400px] max-w-[420px] max-h-[420px] aspect-square flex items-center justify-center scale-110 lg:scale-115 transition-transform duration-300 drop-shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
        {/* Glassmorphic dial face with GitHub grid, Octocat, LeetCode icon, and caustics */}
        <Image
          src="/developer-clock-dial.png?v=1"
          alt="Real-time Developer Glassmorphic Clock"
          fill
          priority
          unoptimized
          className="object-contain object-center select-none pointer-events-none"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />

        {/* Dynamic Real-Time Clock Hands Layer */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
        >
          <defs>
            {/* Hour hand soft 3D drop shadow */}
            <filter id="clock-hour-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="3" dy="8" stdDeviation="8" floodColor="#000000" floodOpacity="0.55" />
            </filter>

            {/* Minute hand soft 3D drop shadow */}
            <filter id="clock-minute-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="4" dy="10" stdDeviation="10" floodColor="#000000" floodOpacity="0.6" />
            </filter>

            {/* Second hand glow and drop shadow */}
            <filter id="clock-second-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="2" dy="6" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.5" />
            </filter>

            {/* Specular White Hand Gradient */}
            <linearGradient id="clock-hand-white" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>

            {/* Second Hand Neon Amber/Orange Gradient */}
            <linearGradient id="clock-second-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>

          {/* Hour Hand: 175px reach, 26px wide, rounded pill cap */}
          <g ref={hourHandRef} transform="rotate(300 512 512)">
            <rect
              x={512 - 13}
              y={512 - 175}
              width="26"
              height="190"
              rx="13"
              ry="13"
              fill="url(#clock-hand-white)"
              filter="url(#clock-hour-shadow)"
            />
          </g>

          {/* Minute Hand: 265px reach, 26px wide, reaching out towards dial ticks */}
          <g ref={minuteHandRef} transform="rotate(60 512 512)">
            <rect
              x={512 - 13}
              y={512 - 265}
              width="26"
              height="280"
              rx="13"
              ry="13"
              fill="url(#clock-hand-white)"
              filter="url(#clock-minute-shadow)"
            />
          </g>

          {/* Second Hand: Sleek needle with 275px reach + 48px counterweight */}
          <g ref={secondHandRef} transform="rotate(225 512 512)">
            {/* Counterweight */}
            <path
              d="M 509.5 512 L 510 560 A 2 2 0 0 0 514 560 L 514.5 512 Z"
              fill="url(#clock-second-gradient)"
              filter="url(#clock-second-shadow)"
            />
            {/* Forward needle */}
            <path
              d="M 509.5 512 L 511 237 A 1 1 0 0 1 513 237 L 514.5 512 Z"
              fill="url(#clock-second-gradient)"
              filter="url(#clock-second-shadow)"
            />
          </g>

          {/* Center Hub: Orange ring with dark center dot and highlight */}
          <g>
            <circle
              cx="512"
              cy="512"
              r="20"
              fill="#f59e0b"
              stroke="#fbbf24"
              strokeWidth="1.5"
              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
            />
            <circle cx="512" cy="512" r="9" fill="#0a0f1d" />
            <circle cx="509" cy="509" r="2.5" fill="#ffffff" opacity="0.75" />
          </g>
        </svg>
      </div>
    </div>
  );
}
