"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";

interface Round {
  id: string;
  roundName: string;
  scheduledAt: string | null;
  outcome: string;
  debrief: string | null;
}

export function InterviewRounds({ applicationId }: { applicationId: string }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Round[] | null>(null);
  const [adding, setAdding] = useState(false);

  async function load() {
    const res = await fetch(`/api/applications/${applicationId}/rounds`);
    const json = await res.json();
    if (res.ok) setData(json.data);
  }

  useEffect(() => {
    if (open && data === null) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  async function addRound(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const roundName = String(fd.get("roundName") ?? "").trim();
    if (!roundName) return;
    await fetch(`/api/applications/${applicationId}/rounds`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roundName }),
    });
    setAdding(false);
    load();
  }

  async function updateRound(id: string, patch: Record<string, unknown>) {
    await fetch(`/api/applications/${applicationId}/rounds/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    load();
  }

  async function removeRound(id: string) {
    await fetch(`/api/applications/${applicationId}/rounds/${id}`, { method: "DELETE" });
    load();
  }

  return (
    <div className="border-t border-border pt-2">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between text-xs text-muted hover:text-foreground"
      >
        <span>Interview rounds{data ? ` (${data.length})` : ""}</span>
        {open ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
      </button>

      {open && (
        <div className="mt-2 space-y-2">
          {(data ?? []).map((r) => (
            <div key={r.id} className="rounded-lg bg-surface-2 p-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-foreground">{r.roundName}</span>
                <div className="flex items-center gap-1">
                  <Select
                    value={r.outcome}
                    onChange={(e) => updateRound(r.id, { outcome: e.target.value })}
                    className="h-6 w-20 text-[11px]"
                  >
                    <option value="pending">Pending</option>
                    <option value="passed">Passed</option>
                    <option value="failed">Failed</option>
                  </Select>
                  <button onClick={() => removeRound(r.id)} className="text-muted hover:text-danger">
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
              <textarea
                defaultValue={r.debrief ?? ""}
                placeholder="Debrief: what was asked, how it went…"
                onBlur={(e) => updateRound(r.id, { debrief: e.target.value })}
                rows={2}
                className="mt-1.5 w-full rounded-md border border-border bg-surface px-2 py-1 text-[11px] text-foreground placeholder:text-muted"
              />
            </div>
          ))}

          {!adding && (
            <button
              onClick={() => setAdding(true)}
              className="flex items-center gap-1 text-xs text-accent hover:underline"
            >
              <Plus size={12} /> Add round
            </button>
          )}
          {adding && (
            <form onSubmit={addRound} className="flex items-center gap-1.5">
              <Input
                name="roundName"
                placeholder="e.g. Technical 1"
                className="h-7 text-xs"
                autoFocus
                required
              />
              <Button type="submit" size="sm" variant="secondary">
                Add
              </Button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
