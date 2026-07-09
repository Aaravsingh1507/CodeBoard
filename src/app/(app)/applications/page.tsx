"use client";

import { useMemo, useState } from "react";
import { Plus, ExternalLink, Trash2, X } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input, Textarea, Select } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";

interface Application {
  id: string;
  company: string;
  role: string;
  link: string | null;
  status: string;
  appliedAt: string | null;
  notes: string | null;
  createdAt: string;
}

const COLUMNS = [
  { key: "wishlist", label: "Wishlist" },
  { key: "applied", label: "Applied" },
  { key: "oa_screen", label: "OA / Screen" },
  { key: "interview", label: "Interview" },
  { key: "offer", label: "Offer" },
  { key: "rejected", label: "Rejected" },
];

export default function ApplicationsPage() {
  const { data, loading, error, refetch } = useFetch<Application[]>("/api/applications");
  const [showForm, setShowForm] = useState(false);
  const [dragId, setDragId] = useState<string | null>(null);

  const byColumn = useMemo(() => {
    const map: Record<string, Application[]> = {};
    for (const col of COLUMNS) map[col.key] = [];
    for (const app of data ?? []) {
      (map[app.status] ??= []).push(app);
    }
    return map;
  }, [data]);

  async function updateStatus(id: string, status: string) {
    await fetch(`/api/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    refetch();
  }

  async function removeApplication(id: string) {
    await fetch(`/api/applications/${id}`, { method: "DELETE" });
    refetch();
  }

  const total = data?.length ?? 0;
  const appliedOrLater = (data ?? []).filter((a) => a.status !== "wishlist").length;
  const responded = (data ?? []).filter((a) =>
    ["oa_screen", "interview", "offer"].includes(a.status)
  ).length;
  const responseRate = appliedOrLater > 0 ? Math.round((responded / appliedOrLater) * 100) : 0;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold">Applications</h1>
          <p className="mt-1 text-sm text-muted">
            {total} total · {appliedOrLater} applied · {responseRate}% response rate
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus size={15} /> Add application
        </Button>
      </div>

      {showForm && (
        <NewApplicationForm
          onClose={() => setShowForm(false)}
          onCreated={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}

      {loading && <Skeleton className="h-64 w-full" />}
      {error && <ErrorState message={error} onRetry={() => refetch()} />}

      {data && total === 0 && (
        <EmptyState
          title="No applications yet"
          description="Add your first one to start tracking your pipeline."
          action={
            <Button size="sm" onClick={() => setShowForm(true)}>
              <Plus size={14} /> Add your first application
            </Button>
          }
        />
      )}

      {data && total > 0 && (
        <div className="grid grid-cols-1 gap-4 overflow-x-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {COLUMNS.map((col) => (
            <div
              key={col.key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => {
                if (dragId) updateStatus(dragId, col.key);
                setDragId(null);
              }}
              className="flex min-w-[220px] flex-col gap-2 rounded-xl bg-surface-2/50 p-2"
            >
              <div className="flex items-center justify-between px-1.5 py-1">
                <span className="text-xs font-semibold text-muted">{col.label}</span>
                <span className="font-data text-xs text-muted">{byColumn[col.key].length}</span>
              </div>
              {byColumn[col.key].map((app) => (
                <Card
                  key={app.id}
                  draggable
                  onDragStart={() => setDragId(app.id)}
                  className="cursor-grab space-y-2 p-3 active:cursor-grabbing"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{app.company}</p>
                      <p className="truncate text-xs text-muted">{app.role}</p>
                    </div>
                    <button
                      onClick={() => removeApplication(app.id)}
                      className="shrink-0 text-muted hover:text-danger"
                      aria-label="Delete application"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                  {app.link && (
                    <a
                      href={app.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1 text-xs text-accent hover:underline"
                    >
                      Posting <ExternalLink size={10} />
                    </a>
                  )}
                  {app.appliedAt && (
                    <p className="text-[11px] text-muted">Applied {formatDate(app.appliedAt)}</p>
                  )}
                  <Select
                    value={app.status}
                    onChange={(e) => updateStatus(app.id, e.target.value)}
                    className="h-7 text-xs"
                  >
                    {COLUMNS.map((c) => (
                      <option key={c.key} value={c.key}>
                        {c.label}
                      </option>
                    ))}
                  </Select>
                </Card>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NewApplicationForm({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const company = String(fd.get("company") ?? "").trim();
    const role = String(fd.get("role") ?? "").trim();
    if (!company || !role) {
      setFormError("Company and role are required.");
      setSubmitting(false);
      return;
    }
    const res = await fetch("/api/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        role,
        link: fd.get("link") || undefined,
        notes: fd.get("notes") || undefined,
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
        <h2 className="text-sm font-semibold">New application</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Input name="company" placeholder="Company *" required />
        <Input name="role" placeholder="Role *" required />
        <Input name="link" placeholder="Posting link" className="sm:col-span-2" />
        <Textarea name="notes" placeholder="Notes" rows={2} className="sm:col-span-2" />
        {formError && <p className="text-xs text-danger sm:col-span-2">{formError}</p>}
        <div className="sm:col-span-2">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding…" : "Add application"}
          </Button>
        </div>
      </form>
    </Card>
  );
}
