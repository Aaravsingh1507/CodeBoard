"use client";

import { useState } from "react";
import { Upload, Download, Trash2, Star, FileText, X } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface ResumeVersion {
  id: string;
  fileUrl: string;
  fileName: string;
  label: string;
  notes: string | null;
  isActive: boolean;
  uploadedAt: string;
}

export default function ResumePage() {
  const { data, loading, error, refetch } = useFetch<ResumeVersion[]>("/api/resume");
  const [showForm, setShowForm] = useState(false);

  async function setActive(id: string) {
    await fetch(`/api/resume/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: true }),
    });
    refetch();
  }

  async function removeVersion(id: string) {
    await fetch(`/api/resume/${id}`, { method: "DELETE" });
    refetch();
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold">Resume</h1>
          <p className="mt-1 text-sm text-muted">Keep every version, mark the one you&apos;re using.</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Upload size={15} /> Upload version
        </Button>
      </div>

      {showForm && (
        <UploadForm
          onClose={() => setShowForm(false)}
          onUploaded={() => {
            setShowForm(false);
            refetch();
          }}
        />
      )}

      {loading && <Skeleton className="h-40 w-full" />}
      {error && <ErrorState message={error} onRetry={() => refetch()} />}
      {data && data.length === 0 && (
        <EmptyState
          icon={<FileText size={20} />}
          title="No resume versions yet"
          description="Upload a PDF to start tracking versions."
          action={
            <Button size="sm" onClick={() => setShowForm(true)}>
              <Upload size={14} /> Upload your first version
            </Button>
          }
        />
      )}

      <div className="space-y-3">
        {(data ?? []).map((v) => (
          <Card key={v.id} className="flex items-center justify-between gap-3 p-4">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="shrink-0 text-muted" size={20} />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">{v.label}</p>
                  {v.isActive && <Badge tone="success">Active</Badge>}
                </div>
                <p className="truncate text-xs text-muted">
                  {v.fileName} · {formatDate(v.uploadedAt)}
                </p>
                {v.notes && <p className="mt-1 text-xs text-muted">{v.notes}</p>}
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1">
              {!v.isActive && (
                <Button variant="ghost" size="sm" onClick={() => setActive(v.id)} title="Mark active">
                  <Star size={14} />
                </Button>
              )}
              <a href={v.fileUrl} download>
                <Button variant="ghost" size="sm" title="Download">
                  <Download size={14} />
                </Button>
              </a>
              <Button variant="ghost" size="sm" onClick={() => removeVersion(v.id)} title="Delete">
                <Trash2 size={14} />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function UploadForm({ onClose, onUploaded }: { onClose: () => void; onUploaded: () => void }) {
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    const fd = new FormData(e.currentTarget);
    const file = fd.get("file") as File | null;
    if (!file || file.size === 0) {
      setFormError("Choose a PDF file.");
      setSubmitting(false);
      return;
    }
    if (file.type !== "application/pdf") {
      setFormError("Only PDF files are supported.");
      setSubmitting(false);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFormError("File is larger than 5MB.");
      setSubmitting(false);
      return;
    }
    const res = await fetch("/api/resume", { method: "POST", body: fd });
    setSubmitting(false);
    if (!res.ok) {
      const json = await res.json();
      setFormError(json.error ?? "Upload failed.");
      return;
    }
    onUploaded();
  }

  return (
    <Card className="mb-5 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">Upload a resume version</h2>
        <button onClick={onClose} className="text-muted hover:text-foreground" aria-label="Close">
          <X size={16} />
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input name="label" placeholder="Version label, e.g. 'v3 — SDE intern focus' *" required />
        <Textarea name="notes" placeholder="What changed in this version? (optional)" rows={2} />
        <input
          name="file"
          type="file"
          accept="application/pdf"
          required
          className="block w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-surface-2 file:px-3 file:py-2 file:text-sm file:text-foreground"
        />
        {formError && <p className="text-xs text-danger">{formError}</p>}
        <Button type="submit" disabled={submitting}>
          {submitting ? "Uploading…" : "Upload"}
        </Button>
      </form>
    </Card>
  );
}
