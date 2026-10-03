"use client";

import React from "react";
import { Card } from "@/components/ui/card";

export function ReadinessWidget({ previewData }: { previewData?: any } = {}) {
  return (
    <Card className="relative overflow-hidden rounded-[24px] border border-white/10 bg-[#080c18] p-0 shadow-2xl shadow-purple-950/40">
      <div className="relative w-full aspect-[1024/341] overflow-hidden select-none cursor-default">
        {/* Full-fidelity lossless banner - clicking will not redirect */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/small-steps-banner.png"
          alt="Small Steps Big Progress — Stay consistent, solve one problem at a time, and watch your progress grow."
          className="w-full h-full object-cover select-none pointer-events-none"
        />
      </div>
    </Card>
  );
}
