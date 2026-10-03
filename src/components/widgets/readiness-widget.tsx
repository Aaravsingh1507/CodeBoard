"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function ReadinessWidget(props?: { previewData?: unknown }) {
  void props;
  return (
    <Card className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#080c18] p-0 shadow-2xl shadow-purple-950/40">
      <div className="relative w-full aspect-[1024/341] overflow-hidden select-none cursor-default">
        {/* Subtle ambient backlight glow */}
        <div className="pointer-events-none absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-indigo-600/20 blur-2xl opacity-60" />

        {/* High-fidelity picture with Retina/High-DPI responsive sources */}
        <picture className="relative z-10 block w-full h-full">
          <source
            type="image/webp"
            srcSet="/small-steps-banner@3x.webp 3072w, /small-steps-banner@2x.webp 2048w"
            sizes="(max-width: 768px) 100vw, 1280px"
          />
          <source
            type="image/png"
            srcSet="/small-steps-banner@3x.png 3072w, /small-steps-banner@2x.png 2048w"
            sizes="(max-width: 768px) 100vw, 1280px"
          />
          <img
            src="/small-steps-banner.png"
            alt="Small Steps Big Progress — Stay consistent, solve one problem at a time, and watch your progress grow."
            width={1024}
            height={341}
            draggable={false}
            className="w-full h-full object-cover select-none pointer-events-none"
            style={{
              imageRendering: "auto",
              WebkitFontSmoothing: "antialiased",
            }}
          />
        </picture>
      </div>
    </Card>
  );
}
