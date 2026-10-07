"use client";

import { useState } from "react";
import { Globe, ChevronRight, Loader2 } from "lucide-react";
import { CopyLink } from "@/components/copy-link";

interface PublicProfileToggleProps {
  isEnabled: boolean;
  publicUrl: string | null;
  action: (formData: FormData) => Promise<void>;
}

export function PublicProfileToggle({
  isEnabled,
  publicUrl,
  action,
}: PublicProfileToggleProps) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await action(formData);
    } finally {
      setLoading(false);
    }
  };

  if (isEnabled && publicUrl) {
    return (
      <div className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <CopyLink url={publicUrl} />
        </div>
        <form action={handleSubmit} className="shrink-0">
          <input type="hidden" name="enable" value="false" />
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 hover:bg-red-900/60 hover:border-red-500/50 px-4 py-2 text-xs font-semibold text-red-300 hover:text-white transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={13} className="animate-spin text-red-300" />
                <span>Disabling...</span>
              </>
            ) : (
              <span>Disable public profile</span>
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <form action={handleSubmit}>
      <input type="hidden" name="enable" value="true" />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_0_20px_rgba(99,102,241,0.45)] hover:shadow-[0_0_28px_rgba(99,102,241,0.65)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 size={14} className="animate-spin text-white" />
            <span>Enabling...</span>
          </>
        ) : (
          <>
            <Globe size={14} />
            <span>Enable public profile</span>
            <ChevronRight size={14} />
          </>
        )}
      </button>
    </form>
  );
}
