"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyLink({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-surface-2 px-3 py-1.5 text-xs text-foreground hover:border-accent"
    >
      {copied ? <Check size={13} className="text-accent-2" /> : <Copy size={13} />}
      {url}
    </button>
  );
}
