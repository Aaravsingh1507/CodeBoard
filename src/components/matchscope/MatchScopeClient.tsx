"use client";

import { useState, useRef, useEffect } from "react";
import {
  Target,
  Sparkles,
  UploadCloud,
  FileCheck,
  CheckCircle2,
  AlertCircle,
  XCircle,
  MinusCircle,
  ArrowRight,
  Copy,
  Check,
  Zap,
  RotateCcw,
  Building,
  ChevronDown,
  ChevronUp,
  X,
  FileUp,
} from "lucide-react";
import type { MatchScopeResponse, MatchKeyword, MatchSuggestion, MatchCategory } from "@/app/api/matchscope/route";

const SAMPLE_JD = `Role: Full Stack Software Engineer (Frontend / Product)
Company: TechCorp Innovations
Location: San Francisco, CA (or Remote)

About the Role:
We are looking for a high-velocity Full Stack Software Engineer with deep frontend craftsmanship and solid backend fundamentals to build our next-generation developer platform. You will work on real-time dashboards, performance optimization, and AI-assisted workflows.

Responsibilities:
- Build responsive, accessible, high-performance web applications using TypeScript, React, and Next.js (App Router).
- Design and integrate low-latency REST and GraphQL APIs with Node.js and PostgreSQL.
- Architect real-time analytics dashboards handling thousands of concurrent users.
- Collaborate with product designers and engineers to deliver polished UI/UX with modern TailwindCSS design systems.
- Write unit, integration, and end-to-end tests; participate in peer code reviews and architectural discussions.

Qualifications & Requirements:
- 2+ years of hands-on software engineering experience building production web applications.
- Strong proficiency in TypeScript, React, Next.js, and modern CSS/TailwindCSS.
- Hands-on experience with SQL databases (PostgreSQL preferred) and backend runtime environments (Node.js).
- Familiarity with CI/CD pipelines (GitHub Actions), Docker, and cloud deployments (AWS or Vercel).
- Demonstrated passion for developer tools, clean code, and AI model integrations.`;

export function MatchScopeClient({ embeddedMode = false }: { embeddedMode?: boolean }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [showJdPanel, setShowJdPanel] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchScopeResponse | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Rotating loading steps
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % 3);
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [loading]);

  function handleFileSelect(file: File) {
    setError(null);
    setUploadedFile(file);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }

  function handleClearFile() {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleAnalyze() {
    if (!uploadedFile) {
      setError("Please select or upload your resume file to begin analysis.");
      return;
    }

    setLoadingStep(0);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", uploadedFile);
      if (jobDescription.trim()) {
        formData.append("jobDescription", jobDescription.trim());
      }

      const res = await fetch("/api/matchscope", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || `Server error (${res.status})`);
      }

      setResult(json.data);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err: unknown) {
      const errorObj = err as Error;
      setError(errorObj.message || "Failed to analyze resume. Please verify your Groq API key.");
    } finally {
      setLoading(false);
    }
  }

  const hasResume = Boolean(uploadedFile);

  return (
    <div className={`mx-auto max-w-5xl ${embeddedMode ? "p-0" : "px-4 py-8"}`}>
      {/* Top Banner / Hero Header */}
      <div className="mb-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3.5 py-1 text-xs font-semibold text-[#a78bfa] mb-2.5 shadow-sm">
            <Sparkles size={13} className="text-[#a78bfa]" />
            <span>MatchScope • Instant ATS Engine</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-4xl">
            Upload Resume, Get Instant Answers
          </h1>
          <p className="mt-1.5 text-sm text-muted dark:text-slate-400 max-w-2xl leading-relaxed">
            Drop your resume file to evaluate ATS readiness, detect technical strengths & missing keywords, and get high-impact bullet improvements.
          </p>
        </div>

        {/* Quick Reset / Action */}
        {(hasResume || result) && (
          <button
            type="button"
            onClick={() => {
              handleClearFile();
              setJobDescription("");
              setResult(null);
              setError(null);
            }}
            className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-surface-2 px-3.5 py-2 text-xs font-medium text-muted hover:text-foreground transition-colors shrink-0 cursor-pointer"
          >
            <RotateCcw size={13} />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,.txt,.md,text/plain,application/pdf"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileSelect(e.target.files[0]);
          }
        }}
      />

      {/* Main Flow: Upload-Only Resume Box */}
      <div className="space-y-4">
        {!uploadedFile ? (
          // Idle Dropzone
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-300 ${
              isDragging
                ? "border-[#7c3aed] bg-[#7c3aed]/10 scale-[1.01] shadow-2xl shadow-[#7c3aed]/20"
                : "border-[#2a304e] hover:border-[#7c3aed]/80 bg-[#101424] hover:bg-[#13182b] shadow-xl"
            }`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/30 shadow-lg group-hover:scale-110 transition-transform duration-200">
              <UploadCloud size={32} />
            </div>

            <h3 className="mt-4 text-base font-bold text-white tracking-wide">
              {isDragging ? "Drop your resume here" : "Upload your resume file"}
            </h3>
            <p className="mt-1 text-xs text-slate-400 max-w-md">
              Drag and drop your resume file here, or click to browse.
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Supports PDF, DOCX, TXT, or Markdown (Max 10MB)
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] px-6 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#7c3aed]/25 hover:from-[#8b5cf6] hover:to-[#7c3aed] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
              >
                <FileUp size={15} />
                <span>Choose Resume File</span>
              </button>
            </div>
          </div>
        ) : (
          // File Loaded State Card
          <div className="rounded-2xl border border-[#7c3aed]/40 bg-[#121629] p-5 shadow-xl transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#7c3aed]/25 to-indigo-600/25 border border-[#7c3aed]/40 text-[#a78bfa]">
                  <FileCheck size={24} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="truncate text-sm font-bold text-white">
                      {uploadedFile.name}
                    </h3>
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      <CheckCircle2 size={11} /> Ready for analysis
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {(uploadedFile.size / 1024).toFixed(1)} KB • Uploaded file
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="rounded-xl border border-[#2a304e] bg-[#171c33] px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileUp size={13} />
                  <span>Change File</span>
                </button>

                <button
                  type="button"
                  onClick={handleClearFile}
                  className="rounded-xl p-1.5 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
                  title="Remove resume"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Optional Target Job Description Accordion */}
        <div className="rounded-2xl border border-[#1e2338] bg-[#111424] overflow-hidden transition-all duration-200">
          <button
            type="button"
            onClick={() => setShowJdPanel(!showJdPanel)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-[#15192c] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                <Building size={14} />
              </div>
              <div>
                <span className="text-xs font-semibold text-white tracking-wide">
                  Target Job Description (Optional)
                </span>
                <span className="ml-2 text-[11px] text-slate-500">
                  {jobDescription.trim() ? "• 1 Job Description added" : "• Leave empty for general tech ATS readiness"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{showJdPanel ? "Collapse" : "Expand"}</span>
              {showJdPanel ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </div>
          </button>

          {showJdPanel && (
            <div className="p-4 pt-1 border-t border-[#1a1f33] space-y-3 animate-fade-in">
              <p className="text-xs text-slate-400">
                Paste a specific job posting to compute a targeted role match score, or leave blank to evaluate all-round Software Engineering readiness.
              </p>
              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste target job posting here (required qualifications, responsibilities, tech stack)..."
                rows={5}
                className="w-full resize-y rounded-xl border border-[#1e2338] bg-[#0a0d17] p-3 text-xs font-mono leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-[#7c3aed] focus:outline-none"
              />
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>{jobDescription.trim() ? `${jobDescription.trim().split(/\s+/).length} words` : "0 words"}</span>
                <button
                  type="button"
                  onClick={() => setJobDescription(SAMPLE_JD)}
                  className="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer"
                >
                  Fill sample JD
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Central Analyze CTA Button */}
      <div className="flex flex-col items-center justify-center my-8 space-y-3">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-2.5 text-xs text-red-300 max-w-lg animate-fade-in shadow-lg">
            <AlertCircle size={15} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !hasResume}
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#6d28d9] px-10 py-4 text-sm font-semibold text-white shadow-xl shadow-[#7c3aed]/25 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7c3aed]/40 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {/* Subtle sheen animation */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>
                {loadingStep === 0 && "Parsing resume structure..."}
                {loadingStep === 1 && "Benchmarking with Groq AI..."}
                {loadingStep === 2 && "Synthesizing prioritized improvements..."}
              </span>
            </>
          ) : (
            <>
              <Target size={18} className="transition-transform group-hover:rotate-12 text-white" />
              <span>
                {jobDescription.trim() ? "Analyze Resume & Role Match" : "Analyze Resume with AI"}
              </span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Zap size={12} className="text-[#a78bfa]" />
          Instant ATS scoring & actionable suggestions powered by Groq
        </p>
      </div>

      {/* Results Section */}
      {result && (
        <div ref={resultsRef} className="mt-10 space-y-8 animate-fade-in">
          {/* Part 1: Score Ring & Summary */}
          <ScoreRing
            score={result.score}
            label={result.label}
            summary={result.summary}
          />

          {/* Part 2: Category Breakdown */}
          <CategoryBreakdown categories={result.categories} />

          {/* Part 3: Keyword Chips */}
          <KeywordChips keywords={result.keywords} />

          {/* Part 4: Suggested Edits & Rewritten Bullets */}
          <SuggestedEdits suggestions={result.suggestions} />
        </div>
      )}
    </div>
  );
}

// -------------------------------------------------------------
// SUB-COMPONENTS
// -------------------------------------------------------------

function ScoreRing({
  score,
  label,
  summary,
}: {
  score: number;
  label: MatchScopeResponse["label"];
  summary: string;
}) {
  const radius = 64;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  function getColor(s: number) {
    if (s >= 80) return { stroke: "#10b981", badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30" };
    if (s >= 65) return { stroke: "#06b6d4", badge: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30" };
    if (s >= 50) return { stroke: "#f59e0b", badge: "bg-amber-500/15 text-amber-400 border-amber-500/30" };
    return { stroke: "#ef4444", badge: "bg-red-500/15 text-red-400 border-red-500/30" };
  }

  const { stroke: strokeColor, badge: badgeClass } = getColor(score);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#1e2338] bg-gradient-to-br from-[#121629] via-[#0d101e] to-[#080b14] p-6 sm:p-8 shadow-2xl">
      <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7c3aed]/10 blur-3xl" />

      <div className="flex flex-col md:flex-row items-center gap-8">
        {/* SVG Circular Progress */}
        <div className="relative flex shrink-0 items-center justify-center">
          <svg height={radius * 2} width={radius * 2} className="-rotate-90">
            <circle
              stroke="#1a1f33"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <circle
              stroke={strokeColor}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={`${circumference} ${circumference}`}
              style={{ strokeDashoffset, transition: "stroke-dashoffset 1s ease-in-out" }}
              strokeLinecap="round"
              r={normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-3xl font-extrabold tracking-tight text-white">{score}</span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">ATS Score</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-2.5">
            <span className={`rounded-full border px-3 py-0.5 text-xs font-bold tracking-wide ${badgeClass}`}>
              {label}
            </span>
            <span className="text-xs text-slate-500">
              Evaluated via Groq AI
            </span>
          </div>

          <h2 className="text-lg font-bold text-white tracking-tight mb-2">
            Executive ATS Assessment
          </h2>
          <p className="text-sm leading-relaxed text-slate-300">
            {summary}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoryBreakdown({ categories }: { categories: MatchCategory[] }) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
        <Target size={15} className="text-[#a78bfa]" />
        Detailed Category Breakdown
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((cat, idx) => {
          const barColor =
            cat.score >= 80 ? "bg-emerald-500" :
            cat.score >= 65 ? "bg-cyan-500" :
            cat.score >= 50 ? "bg-amber-500" : "bg-red-500";

          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#1e2338] bg-[#101424] p-5 shadow-lg transition-all hover:border-[#2a304e]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-white">{cat.name}</span>
                <span className="font-mono text-sm font-bold text-slate-200">{cat.score}%</span>
              </div>

              <div className="h-2 w-full overflow-hidden rounded-full bg-[#1b2038] mb-3">
                <div
                  className={`h-full rounded-full ${barColor} transition-all duration-700`}
                  style={{ width: `${cat.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                {cat.comment}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function KeywordChips({ keywords }: { keywords: MatchKeyword[] }) {
  const [filter, setFilter] = useState<"all" | "match" | "partial" | "miss">("all");

  const counts = {
    all: keywords.length,
    match: keywords.filter((k) => k.status === "match").length,
    partial: keywords.filter((k) => k.status === "partial").length,
    miss: keywords.filter((k) => k.status === "miss").length,
  };

  const filtered = filter === "all" ? keywords : keywords.filter((k) => k.status === filter);

  return (
    <div className="rounded-2xl border border-[#1e2338] bg-[#101424] p-6 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Zap size={15} className="text-[#a78bfa]" />
            ATS Keyword Intelligence
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Key technical requirements extracted and matched against candidate background
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-[#0a0d17] p-1 border border-[#1e2338]">
          {(["all", "match", "partial", "miss"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize transition-all cursor-pointer ${
                filter === tab
                  ? "bg-[#7c3aed] text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab} ({counts[tab]})
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filtered.map((k, idx) => {
          if (k.status === "match") {
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-300"
              >
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>{k.word}</span>
              </span>
            );
          }
          if (k.status === "partial") {
            return (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs font-medium text-amber-300"
              >
                <MinusCircle size={13} className="text-amber-400" />
                <span>{k.word}</span>
              </span>
            );
          }
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300"
            >
              <XCircle size={13} className="text-red-400" />
              <span>{k.word}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

function SuggestedEdits({ suggestions }: { suggestions: MatchSuggestion[] }) {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  function handleCopy(text: string, idx: number) {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1800);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
          <Sparkles size={15} className="text-[#a78bfa]" />
          Actionable Resume Improvements ({suggestions.length})
        </h3>
        <span className="text-xs text-slate-500">Ranked by priority</span>
      </div>

      <div className="space-y-3.5">
        {suggestions.map((s, idx) => {
          const priorityBadge =
            s.priority === "high"
              ? "bg-red-500/15 text-red-400 border-red-500/30"
              : s.priority === "medium"
              ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
              : "bg-blue-500/15 text-blue-400 border-blue-500/30";

          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#1e2338] bg-[#101424] p-5 shadow-lg transition-all hover:border-[#2a304e]"
            >
              <div className="flex items-center justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide shrink-0 ${priorityBadge}`}>
                    {s.priority} priority
                  </span>
                  <h4 className="text-sm font-bold text-white truncate">{s.title}</h4>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(s.description, idx)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a304e] bg-[#171c33] px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white transition-colors shrink-0 cursor-pointer"
                >
                  {copiedIdx === idx ? (
                    <>
                      <Check size={12} className="text-emerald-400" />
                      <span className="text-emerald-400 font-semibold">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy Bullet</span>
                    </>
                  )}
                </button>
              </div>

              {s.context && (
                <div className="mb-2.5 rounded-xl border border-[#1b2038] bg-[#090c17] p-2.5 text-xs text-slate-400">
                  <span className="font-semibold text-slate-300">Current Context: </span>
                  <span className="italic">{s.context}</span>
                </div>
              )}

              <p className="text-xs text-slate-300 leading-relaxed font-mono bg-[#0e1222] border border-[#1d233a] p-3 rounded-xl">
                {s.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
