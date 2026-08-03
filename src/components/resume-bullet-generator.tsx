"use client";

import { useState } from "react";
import { Sparkles, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ResumeBulletGenerator() {
  const [bullets, setBullets] = useState<string[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/resume/bullets", { method: "POST" });
    const json = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(json.error ?? "Something went wrong.");
      return;
    }
    setBullets(json.data);
  }

  function copy(text: string, i: number) {
    navigator.clipboard.writeText(text);
    setCopiedIndex(i);
    setTimeout(() => setCopiedIndex(null), 1500);
  }

  return (
    <Card className="mb-5 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-1.5 text-sm font-semibold">
            <Sparkles size={14} className="text-accent" />
            Resume bullets from your real work
          </h2>
          <p className="mt-1 text-xs text-muted">
            Pulls your last 30 days of GitHub and LeetCode activity and drafts resume-ready lines —
            nothing invented, only what actually happened.
          </p>
        </div>
        <Button size="sm" variant="secondary" onClick={generate} disabled={loading}>
          {loading ? "Generating…" : bullets ? "Regenerate" : "Generate"}
        </Button>
      </div>

      {error && <p className="mt-3 text-xs text-danger">{error}</p>}

      {bullets && bullets.length > 0 && (
        <ul className="mt-3 space-y-2">
          {bullets.map((b, i) => (
            <li
              key={i}
              className="flex items-start justify-between gap-3 rounded-lg bg-surface-2 px-3 py-2 text-sm text-foreground"
            >
              <span>{b}</span>
              <button
                onClick={() => copy(b, i)}
                className="shrink-0 text-muted hover:text-accent"
                aria-label="Copy bullet"
              >
                {copiedIndex === i ? <Check size={14} className="text-accent-2" /> : <Copy size={14} />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
