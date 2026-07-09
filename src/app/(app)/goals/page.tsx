"use client";

import { useState } from "react";
import { Plus, X, Trash2, CheckCircle2 } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { formatDate, daysBetween } from "@/lib/utils";

interface Goal {
  id: string;
  type: string;
  label: string;
  target: number;
  current: number;
  deadline: string;
  status: string;
}

const TYPE_LABEL: Record<string, string> = {
  leetcode_count: "LeetCode problems (auto-tracked)",
  github_streak: "GitHub streak days (auto-tracked)",
  applications_sent: "Applications sent (auto-tracked)",
  custom: "Custom (manual progress)",
};

export default function GoalsPage() {
  const { data, loading, error, refetch } = useFetch<Goal[]>("/api/goals");
  const [showForm, setShowForm] = useState(false);

  async function markProgress(goal: Goal, current: number) {
    await fetch(`/api/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current }),
    });
    refetch();
  }

  async function removeGoal(id: string) {
    await fetch(`/api/goals/${id}`, { method: "DELETE" });
    refetch();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Goals</h1>
          <p className="mt-1 text-sm text-muted">Set targets and watch your progress fill in.</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={15} /> New goal
        </Button>
      </div>

      {showForm && (
        <NewGoalForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}

      {loading && <Skeleton className="h-40 w-full" />}
      {error && <ErrorState message={error} onRetry={() => refetch()} />}
      {data && data.length === 0 && (
        <EmptyState
          title="No goals yet"
          description="Set a LeetCode, streak, application, or custom goal to track progress automatically."
          action={
            <Button size="sm" onClick={() => setShowForm(true)}>
              <Plus size={14} /> Set your first goal
            </Button>
          }
        />
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {(data ?? []).map((g) => {
          const pct = (g.current / g.target) * 100;
          const daysLeft = daysBetween(new Date(), new Date(g.deadline));
          const closeToDeadline = g.status === "in_progress" && daysLeft <= 3;
          return (
            <Card key={g.id} className="p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{g.label}</p>
                  <p className="text-xs text-muted">{TYPE_LABEL[g.type]}</p>
                </div>
                <button onClick={() => removeGoal(g.id)} className="text-muted hover:text-danger">
                  <Trash2 size={13} />
                </button>
              </div>

              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-data text-foreground">
                  {g.current} / {g.target}
                </span>
                {g.status === "completed" ? (
                  <Badge tone="success">
                    <CheckCircle2 size={11} className="mr-1" /> Completed
                  </Badge>
                ) : closeToDeadline ? (
                  <Badge tone="warn">{daysLeft <= 0 ? "Due today" : `${daysLeft}d left`}</Badge>
                ) : (
                  <Badge>Due {formatDate(g.deadline)}</Badge>
                )}
              </div>
              <Progress value={pct} />

              {g.type === "custom" && g.status === "in_progress" && (
                <form
                  className="mt-3 flex items-center gap-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.currentTarget);
                    markProgress(g, Number(fd.get("current")));
                  }}
                >
                  <Input
                    name="current"
                    type="number"
                    min={0}
                    defaultValue={g.current}
                    className="h-8 w-24 text-xs"
                  />
                  <Button size="sm" type="submit" variant="secondary">
                    Update
                  </Button>
                </form>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function NewGoalForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const deadline = String(fd.get("deadline"));
    if (deadline < today) {
      setFormError("Deadline can't be in the past.");
      setSubmitting(false);
      return;
    }
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: fd.get("type"),
        label: fd.get("label"),
        target: Number(fd.get("target")),
        deadline,
      }),
    });
    setSubmitting(false);
    if (!res.ok) {
      const json = await res.json();
      setFormError(json.error ?? "Something went wrong.");
      return;
    }
    onCreated();
  }

  return (
    <Card className="mb-5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">New goal</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input name="label" placeholder="e.g. Solve 50 problems before placements" className="sm:col-span-2" required />
        <Select name="type" defaultValue="custom">
          <option value="leetcode_count">LeetCode problems (auto)</option>
          <option value="github_streak">GitHub streak days (auto)</option>
          <option value="applications_sent">Applications sent (auto)</option>
          <option value="custom">Custom (manual)</option>
        </Select>
        <Input name="target" type="number" min={1} placeholder="Target number *" required />
        <Input name="deadline" type="date" min={today} required className="sm:col-span-2" />
        {formError && <p className="text-xs text-danger sm:col-span-2">{formError}</p>}
        <div className="sm:col-span-2">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating…" : "Create goal"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
