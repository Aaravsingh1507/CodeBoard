"use client";

import { useState, useEffect } from "react";

export interface ProfileStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
  following: number;
  totalForks: number;
  totalWatchers: number;
  totalPRs: number;
  totalIssues: number;
}

// 1. Neon Repositories Icon (Window with Octocat Silhouette inside)
function NeonRepoIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.7)]"
    >
      {/* Background card */}
      <rect
        x="6"
        y="4"
        width="22"
        height="18"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeOpacity="0.6"
      />
      {/* Front foreground card */}
      <rect
        x="9"
        y="9"
        width="23"
        height="22"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="#120c24"
        fillOpacity="0.7"
      />
      {/* GitHub Octocat Head Silhouette */}
      <path
        d="M15 21C15 17.5 17.5 15.5 20.5 15.5C23.5 15.5 26 17.5 26 21C26 23.5 24 25.5 20.5 25.5C17 25.5 15 23.5 15 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      {/* Cat ears */}
      <path
        d="M16 16.5L14.5 14L18 15.5M25 16.5L26.5 14L23 15.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 2. Neon Stars Earned Icon (3D Faceted Golden Star)
function NeonStarIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-amber-400 drop-shadow-[0_0_8px_rgba(245,158,11,0.8)]"
    >
      {/* Star outline */}
      <path
        d="M18 4L22.2 12.8L32 14.2L24.9 21.1L26.6 30.8L18 26.2L9.4 30.8L11.1 21.1L4 14.2L13.8 12.8L18 4Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="#2a1e06"
        fillOpacity="0.5"
      />
      {/* Facet lines from center to points */}
      <path
        d="M18 4V19M32 14.2L18 19M26.6 30.8L18 19M9.4 30.8L18 19M4 14.2L18 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

// 3. Neon Followers Icon (Two users with Plus circle badge)
function NeonFollowersIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
    >
      {/* Main user */}
      <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M6 29C6 24 10 21 15 21C20 21 24 24 24 29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Second user behind */}
      <path
        d="M23 8C24.5 9 25.5 10.8 25.5 13C25.5 14.8 24.8 16.5 23.5 17.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M25 22C27.5 23 29.5 25.2 30 28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Plus badge */}
      <circle cx="28" cy="10" r="4.5" stroke="currentColor" strokeWidth="1.6" fill="#071b26" />
      <path d="M28 8V12M26 10H30" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// 4. Neon Following Icon (User with Orbiting Arrow loop)
function NeonFollowingIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-teal-400 drop-shadow-[0_0_8px_rgba(20,184,166,0.8)]"
    >
      {/* User bust */}
      <circle cx="17" cy="13" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 29C8 24 12 21 17 21C22 21 26 24 26 29"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Dynamic looping arrow around head */}
      <path
        d="M28 12C28 7.5 24 4.5 19 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M25.5 6L29 4.5L29.5 8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 21C27.5 22.5 29 25 29 28"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

// 5. Neon Forks Icon (Git Branching Tree)
function NeonForksIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-fuchsia-400 drop-shadow-[0_0_8px_rgba(217,70,239,0.8)]"
    >
      {/* Root node */}
      <circle cx="12" cy="27" r="3.5" stroke="currentColor" strokeWidth="2" fill="#1e0b29" />
      {/* Left branch node */}
      <circle cx="12" cy="10" r="3.5" stroke="currentColor" strokeWidth="2" fill="#1e0b29" />
      {/* Right branch node */}
      <circle cx="26" cy="12" r="3.5" stroke="currentColor" strokeWidth="2" fill="#1e0b29" />
      {/* Main vertical stem */}
      <path d="M12 23.5V13.5" stroke="currentColor" strokeWidth="2" />
      {/* Branch path */}
      <path
        d="M12 20C17 20 23 18 24 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Little node dots */}
      <circle cx="20" cy="18" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 6. Neon Watchers Icon (Eye with Iris and Radial Energy)
function NeonWatchersIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
    >
      {/* Outer eye shape */}
      <path
        d="M4 18C7 10 12 7 18 7C24 7 29 10 32 18C29 26 24 29 18 29C12 29 7 26 4 18Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="#08142b"
        fillOpacity="0.5"
      />
      {/* Iris */}
      <circle cx="18" cy="18" r="6" stroke="currentColor" strokeWidth="2" />
      {/* Pupil */}
      <circle cx="18" cy="18" r="2.5" fill="currentColor" />
      {/* Glint */}
      <circle cx="16.5" cy="16.5" r="1" fill="#ffffff" />
    </svg>
  );
}

// 7. Neon Pull Requests Icon (Commit Line with Ticket/Tag)
function NeonPullRequestsIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
    >
      {/* Bottom commit node */}
      <circle cx="10" cy="27" r="3.5" stroke="currentColor" strokeWidth="2" fill="#082218" />
      {/* Top commit node */}
      <circle cx="10" cy="11" r="3.5" stroke="currentColor" strokeWidth="2" fill="#082218" />
      {/* Commit stem */}
      <path d="M10 14.5V23.5" stroke="currentColor" strokeWidth="2" />
      {/* Branch line into tag */}
      <path
        d="M10 11C16 11 20 12 22 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* PR Tag / Ticket shape */}
      <path
        d="M21 16L27 19L24 29L18 26L21 16Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="#082218"
      />
      <circle cx="21.5" cy="19.5" r="1.5" fill="currentColor" />
    </svg>
  );
}

// 8. Neon Issues Icon (Bug / Beetle with Antennae and Legs)
function NeonIssuesIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
    >
      {/* Antennae */}
      <path
        d="M14 9L11 5M22 9L25 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="10" cy="5" r="1.5" fill="currentColor" />
      <circle cx="26" cy="5" r="1.5" fill="currentColor" />
      {/* Head */}
      <path
        d="M13 11C13 9 15 8 18 8C21 8 23 9 23 11"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Body / Carapace */}
      <rect
        x="12"
        y="12"
        width="12"
        height="16"
        rx="6"
        stroke="currentColor"
        strokeWidth="2"
        fill="#260b12"
        fillOpacity="0.5"
      />
      {/* Center split line */}
      <path d="M18 12V28" stroke="currentColor" strokeWidth="1.6" />
      {/* 6 Legs */}
      <path
        d="M12 15L6 14M12 20L5 20M12 25L6 27"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M24 15L30 14M24 20L31 20M24 25L30 27"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ProfileOverviewCard({
  stats,
  className = "",
}: {
  stats: ProfileStats;
  className?: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const tiles = [
    {
      id: "repos",
      label: "Repositories",
      value: stats.publicRepos,
      icon: <NeonRepoIcon />,
      color: "#a855f7", // purple
      glowColor: "rgba(168, 85, 247, 0.4)",
    },
    {
      id: "stars",
      label: "Stars earned",
      value: stats.totalStars,
      icon: <NeonStarIcon />,
      color: "#f59e0b", // amber/gold
      glowColor: "rgba(245, 158, 11, 0.4)",
    },
    {
      id: "followers",
      label: "Followers",
      value: stats.followers,
      icon: <NeonFollowersIcon />,
      color: "#06b6d4", // cyan
      glowColor: "rgba(6, 182, 212, 0.4)",
    },
    {
      id: "following",
      label: "Following",
      value: stats.following,
      icon: <NeonFollowingIcon />,
      color: "#14b8a6", // teal
      glowColor: "rgba(20, 184, 166, 0.4)",
    },
    {
      id: "forks",
      label: "Forks",
      value: stats.totalForks,
      icon: <NeonForksIcon />,
      color: "#d946ef", // fuchsia / magenta
      glowColor: "rgba(217, 70, 239, 0.4)",
    },
    {
      id: "watchers",
      label: "Watchers",
      value: stats.totalWatchers,
      icon: <NeonWatchersIcon />,
      color: "#3b82f6", // royal blue
      glowColor: "rgba(59, 130, 246, 0.4)",
    },
    {
      id: "prs",
      label: "Pull requests",
      value: stats.totalPRs,
      icon: <NeonPullRequestsIcon />,
      color: "#10b981", // emerald
      glowColor: "rgba(16, 185, 129, 0.4)",
    },
    {
      id: "issues",
      label: "Issues",
      value: stats.totalIssues,
      icon: <NeonIssuesIcon />,
      color: "#ef4444", // rose/red
      glowColor: "rgba(239, 68, 68, 0.4)",
    },
  ];

  return (
    <div
      className={`relative overflow-hidden rounded-3xl sm:rounded-[28px] border border-cyan-500/25 bg-gradient-to-b from-[#0c1322]/95 via-[#080d1a]/95 to-[#050813]/98 p-5 sm:p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] backdrop-blur-xl transition-all ${className}`}
    >
      {/* Top ambient color glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-48 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-48 w-80 rounded-full bg-purple-500/10 blur-3xl" />

      {/* Top specular edge reflection */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

      {/* Card Header matching Image 1 */}
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Profile overview
          </h2>
          <p className="mt-0.5 text-xs text-slate-300 font-serif italic tracking-wide">
            A quick glance at your GitHub journey
          </p>
        </div>

        {/* Hand-drawn scribble speech bubble: "Small commits, Big progress!" */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl border border-purple-400/40 bg-[#160e2e]/50 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.15)] relative">
          <div className="text-right leading-tight">
            <p className="text-[10px] font-medium text-purple-200 italic font-serif">
              Small commits
            </p>
            <p className="text-[11px] font-bold text-white tracking-wide">
              Big progress!
            </p>
          </div>
          {/* Paper airplane icon */}
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            className="text-purple-300 transform -rotate-12"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 2L11 13M22 2L15 22L11 13L2 9L22 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* 2x4 Grid of 8 Glowing Stat Cards matching Image 1 */}
      <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 sm:gap-3.5">
        {tiles.map((tile, i) => {
          const delayClass = `delay-${Math.min(i + 1, 8)}`;
          return (
            <div
              key={tile.id}
              className={`group relative flex items-center gap-3 sm:gap-3.5 rounded-2xl border border-slate-800/80 bg-[#0d1424]/75 p-3 sm:p-3.5 shadow-sm transition-all duration-300 hover:border-slate-700/80 hover:bg-[#111a2e]/90 hover:scale-[1.01] overflow-hidden ${
                mounted ? `animate-slide-up ${delayClass}` : "opacity-0"
              }`}
            >
              {/* Top specular edge inside the tile */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              {/* Left: Neon Icon with artistic brush smudge aura backdrop */}
              <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 shrink-0 items-center justify-center">
                {/* Watercolor / Neon Smudge Aura behind the icon */}
                <div
                  className="absolute inset-0 rounded-2xl blur-md opacity-45 transition-opacity duration-300 group-hover:opacity-80"
                  style={{ backgroundColor: tile.glowColor }}
                />
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  {tile.icon}
                </div>
              </div>

              {/* Right: Data Number, Text Label & Glowing Gradient Bar */}
              <div className="min-w-0 flex-1">
                <div className="font-data text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                  {tile.value.toLocaleString()}
                </div>
                <div className="text-[11px] sm:text-xs font-medium text-slate-300/85 truncate mt-1">
                  {tile.label}
                </div>
                {/* Glowing Bottom Accent Bar extending rightwards */}
                <div
                  className="mt-1.5 h-1 sm:h-1.5 w-14 sm:w-18 rounded-full transition-all duration-300 group-hover:w-20"
                  style={{
                    background: `linear-gradient(to right, ${tile.color}, transparent)`,
                    boxShadow: `0 0 10px ${tile.color}80`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
