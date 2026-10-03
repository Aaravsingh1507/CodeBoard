"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export function ReadinessWidget({ previewData }: { previewData?: any } = {}) {
  return (
    <Card className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#080c18] p-0 shadow-2xl shadow-purple-950/40 transition-all duration-300 hover:border-purple-500/35 hover:shadow-purple-900/50">
      <Link
        href="/goals"
        className="block relative w-full aspect-[1024/341] min-h-[140px] sm:min-h-[180px] overflow-hidden select-none cursor-pointer"
        aria-label="Small Steps Big Progress — Stay consistent, solve one problem at a time, and watch your progress grow"
      >
        {/* Ambient backlight glow */}
        <div className="pointer-events-none absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-indigo-600/20 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/small-steps-banner.png"
          alt="Small Steps Big Progress — Stay consistent, solve one problem at a time, and watch your progress grow. Discipline today, a better tomorrow."
          className="relative z-10 w-full h-full object-cover object-left sm:object-center transition-transform duration-500 ease-out group-hover:scale-[1.012]"
        />
      </Link>
    </Card>
  );
}
