"use client";

import { useState, useMemo } from "react";
import { Plus, Users, LogOut, Copy, Check, ChevronDown, Flame } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn, formatDate } from "@/lib/utils";
import { subDays, format } from "date-fns";

interface Member {
  id: string;
  name: string;
  image: string | null;
  currentStreak: number;
  readinessScore: number;
  scoreDelta: number;
  lcSolvesThisWeek: number;
  ghCommitsThisWeek: number;
  weeklyCombinedActivity?: number;
  activityLast7Days: boolean[]; // index 0 = 6 days ago, index 6 = today
  lastActiveDate: string;
}

interface CircleData {
  id: string;
  name: string;
  inviteCode: string;
  isOwner: boolean;
  members: Member[];
}

function getActivityDot(activityLast7Days: boolean[] = []) {
  // index 6 is today
  if (activityLast7Days[6]) {
    return {
      color: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.7)] ring-1 ring-emerald-400/50",
      label: "Active today",
    };
  }
  // Active in last 2 days (yesterday or 2 days ago)
  if (activityLast7Days[5] || activityLast7Days[4]) {
    return {
      color: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)] ring-1 ring-amber-300/50",
      label: "Active this week (not today)",
    };
  }
  // No activity in 3+ days
  return {
    color: "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] ring-1 ring-rose-400/50",
    label: "No activity in 3+ days",
  };
}

export default function CirclesPage() {
  const { data, loading, error, refetch } = useFetch<CircleData[]>("/api/circles");
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [expandedMembers, setExpandedMembers] = useState<Record<string, boolean>>({});

  const toggleExpand = (memberId: string) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [memberId]: !prev[memberId],
    }));
  };

  // Precompute 7-day metadata for the mini heatmap
  const dayLabels = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = subDays(new Date(), 6 - i);
      return {
        name: i === 6 ? "Today" : format(d, "EEE"),
        short: format(d, "EEEEE"),
        dateStr: format(d, "MMM d"),
        isToday: i === 6,
      };
    });
  }, []);

  async function leaveCircle(id: string) {
    await fetch(`/api/circles/${id}`, { method: "DELETE" });
    refetch();
  }

  return (
    <div className="space-y-6 pb-20 sm:pb-8 min-w-0 max-w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground dark:text-white sm:text-3xl">Circles</h1>
          <p className="mt-1 text-sm text-muted dark:text-slate-400">
            Track each other&apos;s LeetCode and GitHub activity &mdash; compete, not compare.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setShowJoin(true)}>
            Join with code
          </Button>
          <Button onClick={() => setShowCreate(true)}>
            <Plus size={15} /> Create circle
          </Button>
        </div>
      </div>

      {showCreate && (
        <CreateCircleForm onClose={() => setShowCreate(false)} onCreated={() => { setShowCreate(false); refetch(); }} />
      )}
      {showJoin && (
        <JoinCircleForm onClose={() => setShowJoin(false)} onJoined={() => { setShowJoin(false); refetch(); }} />
      )}

      {loading && <Skeleton className="h-40 w-full" />}
      {error && <ErrorState message={error} onRetry={() => refetch()} />}
      {data && data.length === 0 && (
        <EmptyState
          icon={<Users size={20} />}
          title="No circles yet"
          description="Create one and share the invite code with a few batchmates, or join one with a code."
          action={
            <Button size="sm" onClick={() => setShowCreate(true)}>
              <Plus size={14} /> Create your first circle
            </Button>
          }
        />
      )}

      <div className="space-y-5">
        {(data ?? []).map((circle) => {
          // Determine "This week's leader" — member with highest combined LC + GH activity this week
          const sortedByWeekly = [...circle.members].sort((a, b) => {
            const totalA = a.weeklyCombinedActivity ?? (a.lcSolvesThisWeek + a.ghCommitsThisWeek);
            const totalB = b.weeklyCombinedActivity ?? (b.lcSolvesThisWeek + b.ghCommitsThisWeek);
            return totalB - totalA;
          });
          const leader = sortedByWeekly[0];
          const leaderTotal = leader
            ? (leader.weeklyCombinedActivity ?? (leader.lcSolvesThisWeek + leader.ghCommitsThisWeek))
            : 0;

          return (
            <Card key={circle.id} className="p-4 sm:p-5 border-border/60 bg-surface/95 dark:bg-[#0f1117] shadow-lg">
              {/* Circle Header */}
              <div className="mb-3.5 flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-foreground dark:text-white">{circle.name}</p>
                  <p className="text-xs text-muted dark:text-slate-400">
                    Invite code: <span className="font-data text-foreground dark:text-slate-200">{circle.inviteCode}</span> ·{" "}
                    {circle.members.length} member{circle.members.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <button
                  onClick={() => leaveCircle(circle.id)}
                  className="flex items-center gap-1 text-xs text-muted hover:text-danger cursor-pointer transition-colors"
                >
                  <LogOut size={13} /> Leave
                </button>
              </div>

              {/* "This week's leader" highlight banner */}
              {circle.members.length > 0 && leader && (
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 px-3.5 py-2.5 shadow-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/20 text-base shrink-0 shadow-xs">
                      🏆
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-500 dark:text-amber-400">
                          This week&apos;s leader
                        </span>
                        <span className="text-[10px] text-muted dark:text-slate-400">
                          (Resets Mon)
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate mt-0.5">
                        {leader.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={leader.image} alt="" className="h-4 w-4 rounded-full object-cover ring-1 ring-amber-400/50" />
                        ) : (
                          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500/30 text-[9px] font-bold text-amber-300">
                            {leader.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <span className="text-xs font-bold text-foreground dark:text-white truncate">
                          {leader.name}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-data text-xs text-muted">
                    <span className="rounded-md bg-surface/90 dark:bg-surface border border-border/60 px-2 py-0.5 text-foreground dark:text-white font-semibold shadow-2xs">
                      {leaderTotal} combined
                    </span>
                    <span className="hidden sm:inline text-[11px] text-muted dark:text-slate-400">
                      ({leader.lcSolvesThisWeek} LC · {leader.ghCommitsThisWeek} GH)
                    </span>
                  </div>
                </div>
              )}

              {/* Members List */}
              <div className="space-y-2">
                {circle.members.map((m, i) => {
                  const isExpanded = !!expandedMembers[m.id];
                  const dot = getActivityDot(m.activityLast7Days);

                  return (
                    <div
                      key={m.id}
                      className="rounded-xl border border-border/60 bg-surface-2/70 dark:bg-[#141824] transition-all hover:border-purple-500/30 overflow-hidden"
                    >
                      {/* Main Clickable Row */}
                      <div
                        onClick={() => toggleExpand(m.id)}
                        className="flex flex-wrap items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer select-none transition-colors hover:bg-surface-2 dark:hover:bg-[#181e30]"
                      >
                        {/* Left: Rank, Avatar, Name */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="font-data w-4 text-xs text-muted font-medium shrink-0">
                            #{i + 1}
                          </span>
                          {m.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={m.image} alt="" className="h-7 w-7 rounded-full object-cover ring-1 ring-border shrink-0" />
                          ) : (
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-accent text-xs font-bold shrink-0">
                              {m.name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="truncate text-sm font-medium text-foreground dark:text-white">
                            {m.name}
                          </span>
                        </div>

                        {/* Right: Stat Strip */}
                        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 ml-auto">
                          {/* Streak */}
                          <span
                            className="font-data text-xs text-muted dark:text-slate-400 flex items-center gap-1"
                            title={`${m.currentStreak} day streak`}
                          >
                            <Flame size={13} className="text-amber-500 shrink-0" />
                            <span>{m.currentStreak}d</span>
                          </span>

                          {/* Desktop Stat Badges: LC & GH (screens >= 640px) */}
                          <span
                            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-surface/90 dark:bg-[#0c0f18] border border-border/60 dark:border-white/10 px-2 py-0.5 text-xs text-muted dark:text-slate-300 font-medium"
                            title={`${m.lcSolvesThisWeek} LeetCode solves in the last 7 days`}
                          >
                            <span className="text-amber-500 dark:text-amber-400 font-bold">LC:</span> {m.lcSolvesThisWeek} solved this week
                          </span>
                          <span
                            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-surface/90 dark:bg-[#0c0f18] border border-border/60 dark:border-white/10 px-2 py-0.5 text-xs text-muted dark:text-slate-300 font-medium"
                            title={`${m.ghCommitsThisWeek} GitHub commits in the last 7 days`}
                          >
                            <span className="text-indigo-400 font-bold">GH:</span> {m.ghCommitsThisWeek} commits
                          </span>

                          {/* Mobile Compact Format: N LC · N GH (screens < 640px) */}
                          <span
                            className="inline-flex sm:hidden items-center rounded-md bg-surface/90 dark:bg-[#0c0f18] border border-border/60 dark:border-white/10 px-2 py-0.5 font-data text-[11px] text-muted dark:text-slate-300 font-medium"
                            title={`${m.lcSolvesThisWeek} LC solves, ${m.ghCommitsThisWeek} GH commits this week`}
                          >
                            {m.lcSolvesThisWeek} LC · {m.ghCommitsThisWeek} GH
                          </span>

                          {/* Score Badge + Weekly Delta */}
                          <div className="flex items-center gap-1.5">
                            <span className="font-data rounded-md bg-accent/15 px-2 py-0.5 text-xs font-bold text-accent border border-accent/20">
                              {m.readinessScore}/100
                            </span>
                            {m.scoreDelta !== 0 && (
                              <span
                                className={cn(
                                  "font-data text-[11px] font-semibold",
                                  m.scoreDelta > 0
                                    ? "text-emerald-500 dark:text-emerald-400"
                                    : "text-rose-500 dark:text-rose-400"
                                )}
                                title={`Score ${m.scoreDelta > 0 ? "increased" : "decreased"} by ${Math.abs(m.scoreDelta)} this week`}
                              >
                                {m.scoreDelta > 0 ? `↑+${m.scoreDelta}` : `↓${m.scoreDelta}`}
                              </span>
                            )}
                          </div>

                          {/* Activity Dot */}
                          <span
                            className={cn("h-2 w-2 rounded-full shrink-0", dot.color)}
                            title={dot.label}
                          />

                          {/* Expand/Collapse Chevron Indicator */}
                          <ChevronDown
                            size={14}
                            className={cn(
                              "text-muted dark:text-slate-400 transition-transform duration-200 shrink-0",
                              isExpanded && "rotate-180"
                            )}
                          />
                        </div>
                      </div>

                      {/* Expandable Inline Mini Heatmap (Smooth Tailwind transition) */}
                      <div
                        className={cn(
                          "transition-all duration-200 overflow-hidden",
                          isExpanded ? "max-h-56 opacity-100 border-t border-border/40 dark:border-white/5" : "max-h-0 opacity-0"
                        )}
                      >
                        <div className="bg-surface/60 dark:bg-[#0d101a] px-4 py-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            {/* 7-square mini heatmap */}
                            <div>
                              <p className="text-[11px] font-semibold text-muted dark:text-slate-400 uppercase tracking-wider mb-2">
                                Last 7 Days Activity
                              </p>
                              <div className="flex items-center gap-1.5 sm:gap-2">
                                {dayLabels.map((day, idx) => {
                                  const isActive = m.activityLast7Days?.[idx] ?? false;
                                  return (
                                    <div key={idx} className="flex flex-col items-center gap-1">
                                      <span className="font-data text-[10px] text-muted dark:text-slate-400 font-medium">
                                        {day.short}
                                      </span>
                                      <div
                                        className={cn(
                                          "h-6 w-6 sm:h-7 sm:w-7 rounded-md transition-all duration-200 flex items-center justify-center text-[11px]",
                                          isActive
                                            ? "bg-emerald-500 text-white font-bold shadow-xs shadow-emerald-500/30"
                                            : "bg-surface-2 dark:bg-white/5 border border-border/50 dark:border-white/10 text-muted/30"
                                        )}
                                        title={`${day.dateStr} (${day.name}): ${isActive ? "Active (LC solve or GH commit)" : "No activity"}`}
                                      >
                                        {isActive ? "✓" : "·"}
                                      </div>
                                      <span className="text-[9px] text-muted/70 hidden sm:inline">
                                        {day.isToday ? "Today" : day.dateStr.split(" ")[1]}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Additional Activity Summary & Last Active Date */}
                            <div className="text-right text-xs text-muted dark:text-slate-400 flex flex-col gap-1 justify-center">
                              <div>
                                <span className="text-foreground dark:text-white font-semibold font-data">
                                  {m.lcSolvesThisWeek}
                                </span>{" "}
                                LC solves ·{" "}
                                <span className="text-foreground dark:text-white font-semibold font-data">
                                  {m.ghCommitsThisWeek}
                                </span>{" "}
                                GH commits
                              </div>
                              {m.lastActiveDate ? (
                                <div className="text-[11px]">
                                  Last active:{" "}
                                  <span className="text-foreground dark:text-slate-300 font-medium">
                                    {formatDate(m.lastActiveDate)}
                                  </span>
                                </div>
                              ) : (
                                <div className="text-[11px] text-muted/70">
                                  No activity recorded yet
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function CreateCircleForm({ onClose, onCreated }: { onClose: () => void; onCreated: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<{ inviteCode: string } | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/circles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fd.get("name") }),
    });
    const json = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(json.error ?? "Something went wrong.");
      return;
    }
    setCreated(json.data);
  }

  if (created) {
    return (
      <Card className="mb-5 p-4 border-border/60 bg-surface/95 dark:bg-[#0f1117]">
        <p className="text-sm text-foreground dark:text-white">Circle created. Share this code:</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(created.inviteCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-data text-sm text-foreground dark:text-white hover:border-accent cursor-pointer"
        >
          {copied ? <Check size={13} className="text-accent-2" /> : <Copy size={13} />}
          {created.inviteCode}
        </button>
        <Button size="sm" className="mt-3" onClick={onCreated}>
          Done
        </Button>
      </Card>
    );
  }

  return (
    <Card className="mb-5 p-4 border-border/60 bg-surface/95 dark:bg-[#0f1117]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground dark:text-white">New circle</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground cursor-pointer" aria-label="Close">
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input name="name" placeholder="e.g. CSE 2026 batch" required />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Creating…" : "Create"}
        </Button>
      </form>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </Card>
  );
}

function JoinCircleForm({ onClose, onJoined }: { onClose: () => void; onJoined: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/circles/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inviteCode: fd.get("inviteCode") }),
    });
    const json = await res.json();
    setSubmitting(false);
    if (!res.ok) {
      setError(json.error ?? "Something went wrong.");
      return;
    }
    onJoined();
  }

  return (
    <Card className="mb-5 p-4 border-border/60 bg-surface/95 dark:bg-[#0f1117]">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-foreground dark:text-white">Join a circle</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground cursor-pointer" aria-label="Close">
          ✕
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <Input name="inviteCode" placeholder="Invite code" required className="font-data uppercase" />
        <Button type="submit" disabled={submitting}>
          {submitting ? "Joining…" : "Join"}
        </Button>
      </form>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </Card>
  );
}