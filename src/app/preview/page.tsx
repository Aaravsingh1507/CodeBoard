"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { ReadinessWidget } from "@/components/widgets/readiness-widget";
import { StreakWidget } from "@/components/widgets/streak-widget";
import { GithubSummaryWidget } from "@/components/widgets/github-summary-widget";
import { LeetcodeSummaryWidget } from "@/components/widgets/leetcode-summary-widget";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Sparkles,
  Upload,
  Plus,
  CalendarClock,
  LogOut,
  TrendingUp,
  Lightbulb,
  FileText,
  Copy,
  Check,
} from "lucide-react";
import type { GithubStats } from "@/lib/github";
import type { LeetcodeStats } from "@/lib/leetcode";

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "settings" | "resume" | "goals" | "circles" | "reviews" | "applications"
  >("overview");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") as any;
      if (tab && ["overview", "settings", "resume", "goals", "circles", "reviews", "applications"].includes(tab)) {
        setActiveTab(tab);
      }
    }
  }, []);

  const previewUser = {
    name: "Aarav Singh",
    githubUsername: "Aaravsingh1507",
    image: null,
  };

  const previewReadiness = {
    score: 12,
    breakdown: [
      { label: "Consistency", score: 0, max: 25, detail: "0-day streak" },
      { label: "Problem-solving", score: 0, max: 25, detail: "No LeetCode account linked" },
      { label: "Job-search momentum", score: 0, max: 25, detail: "0 applications" },
      { label: "Goal follow-through", score: 12, max: 25, detail: "Goals active" },
    ],
    focusArea: "Consistency",
    nudges: ["Your streak reset — your best was 1 days. Today's a good day to restart it."],
  };

  const previewStreak = {
    currentStreak: 0,
    longestStreak: 1,
    heatmap: Array.from({ length: 182 }, (_, i) => {
      const d = new Date(Date.now() - (181 - i) * 86400000);
      const count = i === 155 ? 3 : 0;
      return {
        date: d.toISOString().split("T")[0],
        count,
      };
    }),
  };

  const previewGithub: GithubStats = {
    login: "Aaravsingh1507",
    avatarUrl: "",
    publicRepos: 4,
    followers: 6,
    following: 10,
    totalStars: 0,
    totalForks: 0,
    totalWatchers: 0,
    totalPRs: 0,
    totalIssues: 0,
    totalContributionsLastYear: 13,
    contributionCalendar: [
      { date: "2026-07-06", count: 3 },
      { date: "2026-07-20", count: 1 },
      { date: "2026-08-03", count: 1 },
      { date: "2026-08-17", count: 2 },
      { date: "2026-08-31", count: 3 },
      { date: "2026-09-14", count: 3 },
    ],
    topLanguages: [{ name: "Python", bytes: 45000 }, { name: "TypeScript", bytes: 32000 }],
    recentActivity: [],
    totalClones: 0,
    totalViews: 0,
    topReferrers: [],
  };

  const previewLeetcode: LeetcodeStats | undefined = undefined;

  const [copiedBullet, setCopiedBullet] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "settings", label: "Settings" },
    { id: "resume", label: "Resume" },
    { id: "goals", label: "Goals" },
    { id: "circles", label: "Circles" },
    { id: "reviews", label: "AI Reviews" },
    { id: "applications", label: "Applications" },
  ] as const;

  return (
    <AppShell user={previewUser}>
      <div className="space-y-6">
        {/* Quick Page Preview Switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-border/60 scrollbar-none">
          <span className="text-xs text-muted pr-2 font-medium shrink-0">Live Preview:</span>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                activeTab === tab.id
                  ? "bg-accent text-white shadow-sm shadow-purple-900/30"
                  : "bg-surface-2/60 text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 1. OVERVIEW / DASHBOARD MATCHING SCREENSHOT */}
        {activeTab === "overview" && (
          <div className="space-y-6 animate-fade-in">
            {/* Title Header */}
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Over<span className="gradient-title-view">view</span>
              </h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Everything you&apos;re working toward, in one place.
              </p>
            </div>

            {/* Readiness Score Card */}
            <ReadinessWidget previewData={previewReadiness} />

            {/* Coding Streak Card with Heatmap + 3D Desk Scene */}
            <StreakWidget previewData={previewStreak} />

            {/* Bottom Row: GitHub and LeetCode Side-by-Side */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <GithubSummaryWidget previewData={previewGithub} />
              <LeetcodeSummaryWidget previewData={previewLeetcode} />
            </div>
          </div>
        )}

        {/* 2. SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-xl space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">Settings</h1>
              <p className="mt-1 text-sm text-slate-400">Your profile and connections.</p>
            </div>

            {/* GitHub Card */}
            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-white">GitHub</h2>
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white shadow-inner">
                  AS
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">@Aaravsingh1507</p>
                  <p className="text-xs text-muted">Connected via OAuth</p>
                </div>
              </div>
              <Button variant="secondary" size="sm">
                Reconnect GitHub
              </Button>
            </Card>

            {/* Public Profile Card */}
            <Card className="p-5">
              <h2 className="mb-1 text-sm font-semibold text-white">Public profile</h2>
              <p className="mb-4 text-xs text-muted leading-relaxed">
                A shareable, read-only link with your readiness score and stats — safe to put in a resume
                or LinkedIn. Applications, resume files, and target companies are never shown publicly.
              </p>
              <Button variant="secondary" size="sm">
                Enable public profile
              </Button>
            </Card>

            {/* Profile Form Card */}
            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-white">Profile</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">LeetCode username</label>
                  <Input defaultValue="Aaravsingh1507" placeholder="e.g. aarav_codes" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Target role</label>
                  <Input defaultValue="Full Stack Engineer" placeholder="e.g. Software Engineer" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Target companies</label>
                  <Input defaultValue="Google, Microsoft, Amazon" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">Job search status</label>
                  <Select defaultValue="passive">
                    <option value="not_looking">Not looking</option>
                    <option value="passive">Open to opportunities</option>
                    <option value="active">Actively applying</option>
                  </Select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted">
                    Placement date <span className="text-muted/70">(used to pace your goals)</span>
                  </label>
                  <Input type="date" defaultValue="2026-02-17" />
                </div>
                <label className="flex items-center gap-2.5 text-xs text-muted cursor-pointer select-none">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-4 w-4 rounded-md border-border/80 bg-surface-2/80 accent-purple-600 focus:ring-1 focus:ring-accent/30"
                  />
                  Send me a weekly email digest of my readiness score and nudges
                </label>
                <Button type="button" className="w-full sm:w-auto">
                  Save changes
                </Button>
              </form>
            </Card>

            <div className="pt-2">
              <button className="text-xs text-muted hover:text-danger transition-colors">
                Sign out
              </button>
            </div>
          </div>
        )}

        {/* 3. RESUME */}
        {activeTab === "resume" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Resume</h1>
                <p className="mt-1 text-sm text-slate-400">Keep every version, mark the one you&apos;re using.</p>
              </div>
              <Button>
                <Upload size={15} /> Upload version
              </Button>
            </div>

            <Card className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Sparkles size={15} className="text-accent" />
                    Resume bullets from your real work
                  </h2>
                  <p className="mt-1 text-xs text-muted leading-relaxed max-w-xl">
                    Pulls your last 30 days of GitHub and LeetCode activity and drafts resume-ready lines —
                    nothing invented, only what actually happened.
                  </p>
                </div>
                <Button size="sm" variant="secondary" className="whitespace-nowrap shrink-0">
                  Generate
                </Button>
              </div>

              <div className="mt-4 space-y-2">
                {[
                  "Architected full-stack developer platform featuring real-time readiness scoring across GitHub and LeetCode activity with Next.js and TailwindCSS.",
                  "Engineered automated progress tracking pipelines processing contribution graphs and weekly algorithmic streaks.",
                ].map((b, i) => (
                  <div
                    key={i}
                    className="flex items-start justify-between gap-3 rounded-xl border border-border/60 bg-surface-2/70 px-3.5 py-2.5 text-sm text-foreground transition-colors hover:bg-surface-2"
                  >
                    <span className="leading-relaxed text-slate-200">{b}</span>
                    <button
                      onClick={() => {
                        setCopiedBullet(i);
                        setTimeout(() => setCopiedBullet(null), 1500);
                      }}
                      className="shrink-0 text-muted hover:text-accent pt-0.5"
                    >
                      {copiedBullet === i ? (
                        <Check size={14} className="text-accent-2" />
                      ) : (
                        <Copy size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-2 text-muted border border-border/60">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">v2.1 - SWE Frontend Focus</span>
                      <Badge tone="success">Active</Badge>
                    </div>
                    <p className="text-xs text-muted">resume_aarav_2026.pdf · Sep 5, 2026</p>
                  </div>
                </div>
                <Button variant="secondary" size="sm">
                  Download
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* 4. GOALS */}
        {activeTab === "goals" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Goals</h1>
                <p className="mt-1 text-sm text-slate-400">Set targets and watch your progress fill in.</p>
              </div>
              <Button>
                <Plus size={15} /> New goal
              </Button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm backdrop-blur-sm">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <CalendarClock size={16} />
              </div>
              <span className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                Your placement date has passed — update it in Settings if you have a new one.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">LeetCode</span>
                    <h3 className="text-base font-bold text-white mt-1">Solve 100 Medium Problems</h3>
                  </div>
                  <Badge tone="warn">In progress</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Progress</span>
                    <span className="font-semibold text-white">48 / 100</span>
                  </div>
                  <Progress value={48} />
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-accent-2 uppercase tracking-wider">GitHub</span>
                    <h3 className="text-base font-bold text-white mt-1">30-Day Contribution Streak</h3>
                  </div>
                  <Badge tone="neutral">0d streak</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Progress</span>
                    <span className="font-semibold text-white">1 / 30</span>
                  </div>
                  <Progress value={3.3} />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 5. CIRCLES */}
        {activeTab === "circles" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Circles</h1>
                <p className="mt-1 text-sm text-slate-400">
                  Small accountability groups — see each other&apos;s streak and readiness, nothing more.
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary">Join with code</Button>
                <Button>
                  <Plus size={15} /> Create circle
                </Button>
              </div>
            </div>

            <Card className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-base font-bold text-white">ai a</p>
                  <p className="text-xs text-muted">
                    Invite code: <span className="font-data font-semibold text-accent">GPC2JH</span> · 3 members
                  </p>
                </div>
                <button className="flex items-center gap-1 text-xs text-muted hover:text-danger transition-colors">
                  <LogOut size={13} /> Leave
                </button>
              </div>

              <div className="space-y-2">
                {[
                  { rank: 1, name: "Ajay Mishra", streak: 0, score: 13, color: "bg-purple-600" },
                  { rank: 2, name: "Aarav Singh", streak: 0, score: 12, color: "bg-indigo-600" },
                  { rank: 3, name: "Anubhav_Saxena", streak: 0, score: 12, color: "bg-violet-600" },
                ].map((m) => (
                  <div
                    key={m.rank}
                    className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface-2/70 px-3.5 py-2.5 transition-colors hover:bg-surface-2"
                  >
                    <span className="font-data w-4 text-xs font-medium text-muted">#{m.rank}</span>
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full ${m.color} text-xs font-bold text-white shadow-sm`}
                    >
                      {m.name.charAt(0)}
                    </div>
                    <span className="flex-1 truncate text-sm font-medium text-foreground">{m.name}</span>
                    <span className="font-data text-xs text-muted">{m.streak}d streak</span>
                    <span className="font-data text-xs font-semibold text-accent">{m.score}/100</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 6. AI REVIEWS */}
        {activeTab === "reviews" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">AI weekly reviews</h1>
                <p className="mt-1 text-sm text-slate-400">
                  A short, honest look back — generated automatically every Sunday night, or on demand.
                </p>
              </div>
              <Button>
                <Sparkles size={15} /> Generate this week&apos;s review
              </Button>
            </div>

            <Card className="p-5">
              <p className="mb-2 text-xs font-medium text-muted">
                Week of Aug 27, 2026 – Sep 2, 2026 · generated Sep 2, 2026
              </p>
              <p className="text-sm text-slate-200 leading-relaxed">
                It looks like this week was a quiet period for coding activities, which can happen to anyone.
                Use this as a fresh start to build momentum next week!
              </p>

              <div className="mt-4 pt-3 border-t border-border/40">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <TrendingUp size={13} className="text-accent-2" /> Observations
                </p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted shrink-0 mt-0.5">•</span>
                    <span>No GitHub contributions, pull requests, or LeetCode submissions were recorded.</span>
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted shrink-0 mt-0.5">•</span>
                    <span>Both the current streak and longest streak reflect minimal activity.</span>
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted shrink-0 mt-0.5">•</span>
                    <span>No job applications were added or advanced, and no progress was logged toward any goals.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                  <Lightbulb size={13} className="text-warn" /> For next week
                </p>
                <ul className="space-y-1.5 text-sm text-slate-300">
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted shrink-0 mt-0.5">•</span>
                    <span>Set a small, achievable goal for the next week, such as making one GitHub commit or solving one easy LeetCode problem.</span>
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted shrink-0 mt-0.5">•</span>
                    <span>Schedule a dedicated 30-minute coding block each day to create consistency and rebuild your streak.</span>
                  </li>
                  <li className="flex items-start gap-2 leading-relaxed">
                    <span className="text-muted shrink-0 mt-0.5">•</span>
                    <span>Update your goals list with specific, time-bound items and track progress daily.</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        )}

        {/* 7. APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-white">Applications</h1>
                <p className="mt-1 text-sm text-slate-400">
                  3 total · 2 applied · 50% response rate
                </p>
              </div>
              <Button>
                <Plus size={15} /> Add application
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted uppercase">Wishlist (1)</span>
                  <span className="h-2 w-2 rounded-full bg-purple-500" />
                </div>
                <div className="rounded-xl border border-border/60 bg-surface-2/70 p-3">
                  <p className="text-sm font-semibold text-white">Google</p>
                  <p className="text-xs text-muted">Software Engineer (Frontend)</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted uppercase">Applied (1)</span>
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <div className="rounded-xl border border-border/60 bg-surface-2/70 p-3">
                  <p className="text-sm font-semibold text-white">Microsoft</p>
                  <p className="text-xs text-muted">Full Stack Engineer · Applied Sep 2</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted uppercase">Interview (1)</span>
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                </div>
                <div className="rounded-xl border border-border/60 bg-surface-2/70 p-3">
                  <p className="text-sm font-semibold text-white">Amazon</p>
                  <p className="text-xs text-muted">SDE-1 · Round 2 Technical</p>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
