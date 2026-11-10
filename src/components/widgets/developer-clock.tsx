"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

function getClockAngles() {
  const now = new Date();
  const ms = now.getMilliseconds();
  const sec = now.getSeconds() + ms / 1000;
  const min = now.getMinutes() + sec / 60;
  const hr = (now.getHours() % 12) + min / 60;

  return {
    secondDeg: sec * 6,
    minuteDeg: min * 6,
    hourDeg: hr * 30,
    formatted: now.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }),
  };
}

export function DeveloperClock() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hourHandRef = useRef<SVGGElement>(null);
  const minuteHandRef = useRef<SVGGElement>(null);
  const secondHandRef = useRef<SVGGElement>(null);
  const [timeDisplay, setTimeDisplay] = useState<string>("");

  useEffect(() => {
    let animId: number | null = null;
    let isVisible = true;
    let isTabActive = !document.hidden;

    const applyAngles = () => {
      const { secondDeg, minuteDeg, hourDeg, formatted } = getClockAngles();

      if (secondHandRef.current) {
        secondHandRef.current.style.transform = `rotate(${secondDeg.toFixed(2)}deg)`;
      }
      if (minuteHandRef.current) {
        minuteHandRef.current.style.transform = `rotate(${minuteDeg.toFixed(2)}deg)`;
      }
      if (hourHandRef.current) {
        hourHandRef.current.style.transform = `rotate(${hourDeg.toFixed(2)}deg)`;
      }

      return formatted;
    };

    // Immediate initial sync
    const initialTime = applyAngles();
    setTimeDisplay(initialTime);

    // Continuous smooth sweeping animation loop, active ONLY when visible on screen & tab is active
    const loop = () => {
      if (isVisible && isTabActive) {
        applyAngles();
        animId = requestAnimationFrame(loop);
      }
    };

    const startLoop = () => {
      if (animId === null && isVisible && isTabActive) {
        animId = requestAnimationFrame(loop);
      }
    };

    const stopLoop = () => {
      if (animId !== null) {
        cancelAnimationFrame(animId);
        animId = null;
      }
    };

    startLoop();

    // Pause when tab is inactive/hidden to conserve 100% of CPU/GPU
    const onVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive) {
        applyAngles();
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Pause when scrolled out of view using IntersectionObserver
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          isVisible = entry.isIntersecting;
          if (isVisible) {
            applyAngles();
            startLoop();
          } else {
            stopLoop();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    // 1-second interval backup to update tooltip/aria text
    const intervalId = setInterval(() => {
      if (isVisible && isTabActive) {
        setTimeDisplay(applyAngles());
      }
    }, 1000);

    return () => {
      stopLoop();
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[320px] lg:min-h-[350px] flex items-center justify-center p-0"
    >
      {/* Tight circular black background directly hugging the clock so it does not spread out */}
      <div
        className="group relative w-full max-w-[315px] xl:max-w-[345px] aspect-square rounded-full bg-black border border-white/[0.08] shadow-[0_16px_44px_rgba(0,0,0,0.95)] flex items-center justify-center p-1 overflow-hidden transition-transform duration-300"
        title={timeDisplay ? `Real-Time Developer Clock — ${timeDisplay}` : "Real-Time Developer Clock"}
        aria-label={timeDisplay ? `Real-Time Developer Clock: ${timeDisplay}` : "Real-Time Developer Clock"}
      >
        {/* Subtle inner ambient glow under the glass orb */}
        <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-purple-950/40 via-black to-amber-950/40" />

        {/* Circular glassmorphic dial face with purple/amber rim (Optimized 66KB WebP) */}
        <Image
          src="/developer-clock-dial.webp"
          alt="Real-time Circular Glassmorphic Developer Clock"
          fill
          priority
          className="object-contain object-center select-none pointer-events-none"
          sizes="(min-width: 1024px) 45vw, 100vw"
        />

        {/* Dynamic Real-Time Skeleton Clock Hands Layer */}
        <svg
          viewBox="0 0 1024 1024"
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-10"
        >
          <defs>
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

          {/* Skeleton Hour Hand (GPU hardware-accelerated drop shadow and transform) */}
          <g
            ref={hourHandRef}
            style={{
              transformOrigin: "512px 512px",
              filter: "drop-shadow(3px 8px 7px rgba(0,0,0,0.6))",
              willChange: "transform",
            }}
          >
            <path
              d="M 503 522 L 505 450 L 509 336 A 3 3 0 0 1 515 336 L 519 450 L 521 522 Z M 509 445 L 509 360 A 3 3 0 0 1 515 360 L 515 445 A 3 3 0 0 1 509 445 Z"
              fill="url(#clock-hand-white)"
              fillRule="evenodd"
            />
          </g>

          {/* Skeleton Minute Hand (GPU hardware-accelerated drop shadow and transform) */}
          <g
            ref={minuteHandRef}
            style={{
              transformOrigin: "512px 512px",
              filter: "drop-shadow(4px 10px 9px rgba(0,0,0,0.65))",
              willChange: "transform",
            }}
          >
            <path
              d="M 503 522 L 506 430 L 509.5 248 A 2.5 2.5 0 0 1 514.5 248 L 518 430 L 521 522 Z M 509.5 450 L 509.5 280 A 2.5 2.5 0 0 1 514.5 280 L 514.5 450 A 2.5 2.5 0 0 1 509.5 450 Z"
              fill="url(#clock-hand-white)"
              fillRule="evenodd"
            />
          </g>

          {/* Second Hand (GPU hardware-accelerated drop shadow and transform) */}
          <g
            ref={secondHandRef}
            style={{
              transformOrigin: "512px 512px",
              filter: "drop-shadow(2px 5px 5px rgba(0,0,0,0.45)) drop-shadow(0 0 4px rgba(245,158,11,0.55))",
              willChange: "transform",
            }}
          >
            {/* Counterweight */}
            <path
              d="M 510.5 512 L 510 564 A 2 2 0 0 0 514 564 L 513.5 512 Z"
              fill="url(#clock-second-gradient)"
            />
            {/* Forward needle extending 280px */}
            <path
              d="M 510.5 512 L 511.2 232 A 0.8 0.8 0 0 1 512.8 232 L 513.5 512 Z"
              fill="url(#clock-second-gradient)"
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
