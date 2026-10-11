"use client";

import { useState } from "react";
import { RotateCcw, ChevronRight, Loader2 } from "lucide-react";

interface ReconnectGithubButtonProps {
  action: () => Promise<void>;
}

export function ReconnectGithubButton({ action }: ReconnectGithubButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await action();
    } catch {
      setLoading(false);
    }
  };

  return (
    <form action={handleClick} className="shrink-0">
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-2/80 hover:bg-surface-2 text-foreground dark:border-indigo-400/25 dark:bg-[#141933]/90 dark:hover:bg-[#1b2246] dark:hover:border-indigo-400/45 dark:text-slate-200 dark:hover:text-white px-4 py-2 sm:px-4.5 sm:py-2.5 text-xs sm:text-sm font-medium transition-all shadow-xs dark:shadow-[0_0_15px_rgba(99,102,241,0.15)] dark:hover:shadow-[0_0_22px_rgba(99,102,241,0.3)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin text-muted dark:text-slate-300" />
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <RotateCcw size={14} className="text-muted dark:text-slate-300" />
            <span>Reconnect GitHub</span>
            <ChevronRight size={14} className="text-muted dark:text-slate-400" />
          </>
        )}
      </button>
    </form>
  );
}
