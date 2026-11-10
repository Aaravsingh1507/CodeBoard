"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function getClockAngles() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const seconds = now.getSeconds() + ms / 1000;
  const minutes = now.getMinutes() + seconds / 60;
  const hours = (now.getHours() % 12) + minutes / 60;

  return {
    secondDeg: seconds * 6, // 360deg / 60s
    minuteDeg: minutes * 6, // 360deg / 60m
    hourDeg: hours * 30, // 360deg / 12h
    formatted: now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  };
}

export function DeveloperClock() {
  const hourHandRef = useRef<SVGGElement>(null);
  const minuteHandRef = useRef<SVGGElement>(null);
  const secondHandRef = useRef<SVGGElement>(null);
  const [timeDisplay, setTimeDisplay] = useState<string>("");

  useEffect(() => {
    let animId: number;

    const applyAngles = () => {
      const { secondDeg, minuteDeg, hourDeg, formatted } = getClockAngles();

      if (secondHandRef.current) {
        secondHandRef.current.setAttribute("transform", `rotate(${secondDeg.toFixed(2)} 512 512)`);
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.setAttribute("transform", `rotate(${minuteDeg.toFixed(2)} 512 512)`);
      }
      if (hourHandRef.current) {
        hourHandRef.current.setAttribute("transform", `rotate(${hourDeg.toFixed(2)} 512 512)`);
      }

      return formatted;
    };

    // Immediate first tick
    const initialTime = applyAngles();
    setTimeDisplay(initialTime);

    // Continuous 60fps/120fps sweeping animation loop
    const tick = () => {
      applyAngles();
      animId = requestAnimationFrame(tick);
    };
    animId = requestAnimationFrame(tick);

    // 1-second interval backup to update tooltip/aria text and handle tab throttling
    const intervalId = setInterval(() => {
      setTimeDisplay(applyAngles());
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[320px] lg:min-h-[350px] flex items-center justify-center p-0">
      {/* Tight circular black background directly hugging the clock so it does not spread out */}
      <div
        className="group relative w-full max-w-[315px] xl:max-w-[345px] aspect-square rounded-full bg-black border border-white/[0.08] shadow-[0_16px_44px_rgba(0,0,0,0.85)] flex items-center justify-center p-1 overflow-hidden transition-transform duration-300"
        title={timeDisplay ? `Real-Time Developer Clock — ${timeDisplay}` : "Real-Time Developer Clock"}
        aria-label={timeDisplay ? `Real-Time Developer Clock: ${timeDisplay}` : "Real-Time Developer Clock"}
      >
        {/* Subtle inner ambient glow under the glass orb */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-purple-950/40 via-black to-amber-950/40" />

        {/* Circular glassmorphic dial face with purple/amber rim, caustics, and no background */}
        <Image
          src="/developer-clock-dial.png?v=orb3"
          alt="Real-time Circular Glassmorphic Developer Clock"
          fill
          priority
          unoptimized
          className="object-contain object-center select-none pointer-events-none"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />

        {/* Dynamic Real-Time Skeleton Clock Hands Layer */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
        >
          <defs>
            {/* Hour hand soft 3D drop shadow */}
            <filter id="clock-hour-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="3" dy="8" stdDeviation="7" floodColor="#000000" floodOpacity="0.6" />
            </filter>

            {/* Minute hand soft 3D drop shadow */}
            <filter id="clock-minute-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="4" dy="10" stdDeviation="9" floodColor="#000000" floodOpacity="0.65" />
            </filter>

            {/* Second hand glow and drop shadow */}
            <filter id="clock-second-shadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#000000" floodOpacity="0.45" />
              <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#f59e0b" floodOpacity="0.55" />
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

          {/* Skeleton Hour Hand: Tapered needle with central slit cutout */}
          <g ref={hourHandRef}>
            <path
              d="M 503 522 L 505 450 L 509 336 A 3 3 0 0 1 515 336 L 519 450 L 521 522 Z M 509 445 L 509 360 A 3 3 0 0 1 515 360 L 515 445 A 3 3 0 0 1 509 445 Z"
              fill="url(#clock-hand-white)"
              fillRule="evenodd"
              filter="url(#clock-hour-shadow)"
            />
          </g>

          {/* Skeleton Minute Hand: Longer tapered needle with elongated slit cutout */}
          <g ref={minuteHandRef}>
            <path
              d="M 503 522 L 506 430 L 509.5 248 A 2.5 2.5 0 0 1 514.5 248 L 518 430 L 521 522 Z M 509.5 450 L 509.5 280 A 2.5 2.5 0 0 1 514.5 280 L 514.5 450 A 2.5 2.5 0 0 1 509.5 450 Z"
              fill="url(#clock-hand-white)"
              fillRule="evenodd"
              filter="url(#clock-minute-shadow)"
            />
          </g>

          {/* Second Hand: Razor-thin needle with counterweight */}
          <g ref={secondHandRef}>
            {/* Counterweight */}
            <path
              d="M 510.5 512 L 510 564 A 2 2 0 0 0 514 564 L 513.5 512 Z"
              fill="url(#clock-second-gradient)"
              filter="url(#clock-second-shadow)"
            />
            {/* Forward needle extending 280px */}
            <path
              d="M 510.5 512 L 511.2 232 A 0.8 0.8 0 0 1 512.8 232 L 513.5 512 Z"
              fill="url(#clock-second-gradient)"
              filter="url(#clock-second-shadow)"
            />
          </g>

          {/* Center Hub: Amber/gold ring with dark center dot and highlight */}
          <g>
            <circle
              cx="512"
              cy="512"
              r="19"
              fill="#f59e0b"
              stroke="#fbbf24"
              strokeWidth="1.5"
              filter="drop-shadow(0 2px 6px rgba(0,0,0,0.6))"
            />
            <circle cx="512" cy="512" r="8.5" fill="#0c0714" />
            <circle cx="509" cy="509" r="2.5" fill="#ffffff" opacity="0.8" />
          </g>
        </svg>
      </div>
    </div>
  );
}
