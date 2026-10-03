"use client";

import { useState, useRef } from "react";
import {
  Target,
  Sparkles,
  RotateCcw,
  FileText,
  Building,
  AlertCircle,
  ArrowRight,
  Zap,
} from "lucide-react";
import type { MatchScopeResponse } from "@/app/api/matchscope/route";
import { SAMPLE_RESUME, SAMPLE_JD } from "./sample-data";
import { ScoreRing } from "./ScoreRing";
import { CategoryBreakdown } from "./CategoryBreakdown";
import { KeywordChips } from "./KeywordChips";
import { SuggestedEdits } from "./SuggestedEdits";

export function MatchScopeClient({
  initialResumeText = "",
  embeddedMode = false,
}: {
  initialResumeText?: string;
  embeddedMode?: boolean;
}) {
  const [resume, setResume] = useState(initialResumeText);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MatchScopeResponse | null>(null);

  const resultsRef = useRef<HTMLDivElement | null>(null);

  const [prevInitial, setPrevInitial] = useState(initialResumeText);
  if (initialResumeText !== prevInitial) {
    setPrevInitial(initialResumeText);
    if (!resume) {
      setResume(initialResumeText);
    }
  }

  async function handleAnalyze() {
    if (!resume.trim()) {
      setError("Please enter or paste your resume text.");
      return;
    }
    if (!jobDescription.trim()) {
      setError("Please paste a target job description to match against.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/matchscope", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume, jobDescription }),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to analyze match.");
      }

      setResult(json.data);

      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    } catch (err: unknown) {
      const errorObj = err as Error;
      console.error(errorObj);
      setError(errorObj?.message || "An error occurred during analysis.");
    } finally {
      setLoading(false);
    }
  }

  function handleLoadSample() {
    setResume(SAMPLE_RESUME);
    setJobDescription(SAMPLE_JD);
    setError(null);
  }

  function handleClear() {
    setResume("");
    setJobDescription("");
    setResult(null);
    setError(null);
  }

  return (
    <div
      className={`w-full font-sans antialiased text-slate-100 ${
        embeddedMode ? "" : "min-h-screen py-2"
      }`}
      style={{
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Header Banner */}
      {!embeddedMode && (
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-[#1e2338] bg-gradient-to-b from-[#13131f] to-[#0d0d14] p-6 shadow-2xl">
          <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-[#7c3aed]/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3 py-1 text-xs font-semibold text-[#a78bfa]">
                <Target size={14} className="text-[#a78bfa]" />
                <span>MatchScope ATS Engine</span>
                <span className="h-1 w-1 rounded-full bg-[#a78bfa]" />
                <span className="text-slate-400">Powered by Groq API</span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl flex items-center gap-2.5">
                MatchScope <span className="text-xl">🎯</span>
              </h1>
              <p className="text-sm text-slate-400 max-w-2xl leading-relaxed">
                Precision Resume ↔ Job Description matcher powered by Groq Llama 3.3. Detect ATS keyword gaps, calculate role fit, and get tailored resume fixes.
              </p>
            </div>

            <div className="flex items-center gap-2.5 self-stretch md:self-auto">
              <button
                type="button"
                onClick={handleLoadSample}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-[#2d334d] bg-[#161726] px-3.5 py-2 text-xs font-medium text-slate-300 transition-all hover:border-[#7c3aed]/50 hover:bg-[#1b1c30] hover:text-white cursor-pointer active:scale-95 shadow-sm"
              >
                <Sparkles size={13} className="text-[#a78bfa]" />
                Load Sample Pair
              </button>
              {(resume || jobDescription || result) && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="flex items-center justify-center gap-1.5 rounded-xl border border-[#23273c] bg-[#13131f] px-3 py-2 text-xs font-medium text-slate-400 transition-all hover:border-red-500/40 hover:text-red-400 cursor-pointer active:scale-95"
                  title="Clear inputs"
                >
                  <RotateCcw size={13} />
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Two-Column Input Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Left Panel: Resume Input */}
        <div className="flex flex-col rounded-2xl border border-[#1e2338] bg-[#13131f] p-5 shadow-xl transition-all duration-200 hover:border-[#2d334d]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f243b]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/30">
                <FileText size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">Candidate Resume</h2>
                <p className="text-xs text-slate-400">Paste your raw resume text or Markdown</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500 bg-[#0d0d14] px-2 py-0.5 rounded border border-[#1e2338]">
                {resume.trim() ? `${resume.trim().split(/\s+/).length} words` : "0 words"}
              </span>
              {resume && (
                <button
                  type="button"
                  onClick={() => setResume("")}
                  className="text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 cursor-pointer"
                  title="Clear resume"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-3.5 flex-1 min-h-[300px] flex flex-col">
            <textarea
              id="matchscope-resume-input"
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              placeholder="Paste candidate resume here (work history, technical skills, projects, achievements, education)..."
              className="w-full flex-1 min-h-[300px] resize-y rounded-xl border border-[#1e2338] bg-[#0d0d14] p-4 text-xs font-mono leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-[#7c3aed] focus:outline-none focus:ring-1 focus:ring-[#7c3aed] transition-colors"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Supports standard text, bullet points & Markdown</span>
            <button
              type="button"
              onClick={() => setResume(SAMPLE_RESUME)}
              className="text-[#a78bfa] hover:text-[#c4b5fd] hover:underline transition-colors cursor-pointer"
            >
              Fill sample resume
            </button>
          </div>
        </div>

        {/* Right Panel: Job Description Input */}
        <div className="flex flex-col rounded-2xl border border-[#1e2338] bg-[#13131f] p-5 shadow-xl transition-all duration-200 hover:border-[#2d334d]">
          <div className="flex items-center justify-between pb-3 border-b border-[#1f243b]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                <Building size={16} />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-white tracking-wide">Job Description</h2>
                <p className="text-xs text-slate-400">Target role description, duties & stack</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-slate-500 bg-[#0d0d14] px-2 py-0.5 rounded border border-[#1e2338]">
                {jobDescription.trim() ? `${jobDescription.trim().split(/\s+/).length} words` : "0 words"}
              </span>
              {jobDescription && (
                <button
                  type="button"
                  onClick={() => setJobDescription("")}
                  className="text-slate-500 hover:text-slate-300 text-xs px-1.5 py-0.5 cursor-pointer"
                  title="Clear job description"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="mt-3.5 flex-1 min-h-[300px] flex flex-col">
            <textarea
              id="matchscope-jd-input"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste full job posting here (required qualifications, preferred skills, responsibilities, role level)..."
              className="w-full flex-1 min-h-[300px] resize-y rounded-xl border border-[#1e2338] bg-[#0d0d14] p-4 text-xs font-mono leading-relaxed text-slate-200 placeholder:text-slate-600 focus:border-[#7c3aed] focus:outline-none focus:ring-1 focus:ring-[#7c3aed] transition-colors"
            />
          </div>

          <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
            <span>Extracts required keywords & seniority level</span>
            <button
              type="button"
              onClick={() => setJobDescription(SAMPLE_JD)}
              className="text-indigo-400 hover:text-indigo-300 hover:underline transition-colors cursor-pointer"
            >
              Fill sample JD
            </button>
          </div>
        </div>
      </div>

      {/* Centered Analyse Match Button */}
      <div className="flex flex-col items-center justify-center my-6 space-y-3">
        {error && (
          <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-950/40 px-4 py-2.5 text-xs text-red-300 max-w-lg animate-fade-in shadow-lg">
            <AlertCircle size={15} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <button
          id="matchscope-analyse-button"
          type="button"
          onClick={handleAnalyze}
          disabled={loading || !resume.trim() || !jobDescription.trim()}
          className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-[#7c3aed] via-[#8b5cf6] to-[#6d28d9] px-9 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#7c3aed]/25 transition-all duration-300 hover:shadow-2xl hover:shadow-[#7c3aed]/40 hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
        >
          {/* Glowing sheen */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              <span>Analyzing Match via Groq...</span>
            </>
          ) : (
            <>
              <Target size={18} className="transition-transform group-hover:rotate-12 text-white" />
              <span>Analyse Match</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </button>

        <p className="text-[11px] text-slate-500 flex items-center gap-1.5">
          <Zap size={12} className="text-[#a78bfa]" />
          Instant ATS scoring & actionable suggestions powered by Groq Llama 3.3
        </p>
      </div>

      {/* Results Section */}
      {result && (
        <div ref={resultsRef} className="mt-10 space-y-8 animate-fade-in">
          {/* Part 1: Score Ring */}
          <ScoreRing
            score={result.score}
            label={result.label}
            summary={result.summary}
          />

          {/* Part 2: Category Breakdown */}
          <CategoryBreakdown categories={result.categories} />

          {/* Part 3: Keyword Chips */}
          <KeywordChips keywords={result.keywords} />

          {/* Part 4: Suggested Edits */}
          <SuggestedEdits suggestions={result.suggestions} />
        </div>
      )}
    </div>
  );
}