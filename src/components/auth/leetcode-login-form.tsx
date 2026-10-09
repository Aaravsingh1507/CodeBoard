"use client";

import { useState, useTransition } from "react";
import { LeetcodeIcon } from "@/components/icons";
import { loginWithLeetcodeAction } from "@/app/login/actions";
import { Loader2, AlertCircle, ArrowRight } from "lucide-react";

export function LeetcodeLoginForm() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter a LeetCode username.");
      return;
    }

    setError(null);
    startTransition(async () => {
      try {
        const res = await loginWithLeetcodeAction(username);
        if (res?.error) {
          setError(res.error);
        }
      } catch (err: any) {
        // If it's a redirect, let it pass
        if (err?.digest?.startsWith("NEXT_REDIRECT")) return;
        setError("Sign in failed. Please check your connection.");
      }
    });
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-amber-500">
            <LeetcodeIcon size={16} />
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (error) setError(null);
            }}
            placeholder="LeetCode username (e.g. tourpramod)"
            disabled={isPending}
            className="w-full rounded-xl border border-slate-700/80 bg-[#090d19]/90 py-2.5 pl-10 pr-3 text-xs text-white placeholder-slate-500 shadow-inner outline-none transition-all focus:border-amber-500/80 focus:ring-1 focus:ring-amber-500/30 disabled:opacity-60"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-rose-500/30 bg-rose-950/40 px-3 py-2 text-left text-xs text-rose-300 animate-fade-in">
            <AlertCircle size={14} className="shrink-0 text-rose-400" />
            <span className="leading-tight">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending || !username.trim()}
          className="group relative flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-amber-500/20 transition-all hover:from-amber-400 hover:to-orange-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 size={14} className="animate-spin text-white" />
              <span>Verifying LeetCode Profile...</span>
            </>
          ) : (
            <>
              <span>Continue with LeetCode</span>
              <ArrowRight
                size={14}
                className="transition-transform group-hover:translate-x-0.5 text-white/80"
              />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
