"use client";

import { useState } from "react";
import { Plus, Users, LogOut, Copy, Check } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Member {
  id: string;
  name: string;
  image: string | null;
  currentStreak: number;
  readinessScore: number;
}

interface CircleData {
  id: string;
  name: string;
  inviteCode: string;
  isOwner: boolean;
  members: Member[];
}

export default function CirclesPage() {
  const { data, loading, error, refetch } = useFetch<CircleData[]>("/api/circles");
  const [showCreate, setShowCreate] = useState(false);
  const [showJoin, setShowJoin] = useState(false);

  async function leaveCircle(id: string) {
    await fetch(`/api/circles/${id}`, { method: "DELETE" });
    refetch();
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Circles</h1>
          <p className="mt-1 text-sm text-muted">
            Small accountability groups — see each other&apos;s streak and readiness, nothing more.
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

      <div className="space-y-4">
        {(data ?? []).map((circle) => (
          <Card key={circle.id} className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{circle.name}</p>
                <p className="text-xs text-muted">
                  Invite code: <span className="font-data text-foreground">{circle.inviteCode}</span> ·{" "}
                  {circle.members.length} member{circle.members.length !== 1 ? "s" : ""}
                </p>
              </div>
              <button
                onClick={() => leaveCircle(circle.id)}
                className="flex items-center gap-1 text-xs text-muted hover:text-danger"
              >
                <LogOut size={13} /> Leave
              </button>
            </div>
            <div className="space-y-2">
              {circle.members.map((m, i) => (
                <div key={m.id} className="flex items-center gap-3 rounded-lg bg-surface-2 px-3 py-2">
                  <span className="font-data w-4 text-xs text-muted">#{i + 1}</span>
                  {m.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.image} alt="" className="h-6 w-6 rounded-full" />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-surface" />
                  )}
                  <span className="flex-1 truncate text-sm text-foreground">{m.name}</span>
                  <span className="font-data text-xs text-muted">{m.currentStreak}d streak</span>
                  <span className="font-data text-xs font-semibold text-accent">{m.readinessScore}/100</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
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
      <Card className="mb-5 p-4">
        <p className="text-sm text-foreground">Circle created. Share this code:</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(created.inviteCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          }}
          className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-1.5 font-data text-sm text-foreground hover:border-accent"
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
    <Card className="mb-5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">New circle</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
          ×
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
    <Card className="mb-5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Join a circle</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
          ×
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
