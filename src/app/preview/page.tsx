"use client";

import { useState, useEffect } from "react";
import { AppShell } from "@/components/app-shell";
import { ReadinessWidget } from "@/components/widgets/readiness-widget";
import { StreakWidget } from "@/components/widgets/streak-widget";
import { GithubSummaryWidget } from "@/components/widgets/github-summary-widget";
import { LeetcodeSummaryWidget } from "@/components/widgets/leetcode-summary-widget";
import { GoalsSummaryWidget } from "@/components/widgets/goals-summary-widget";
import { LatestReviewWidget } from "@/components/widgets/latest-review-widget";
import { CompanyPrepWidget } from "@/components/widgets/company-prep-widget";
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
  Trash2,
} from "lucide-react";
import { MatchScopeClient } from "@/components/matchscope/MatchScopeClient";
import { TopLanguagesCard } from "@/components/github/top-languages-card";
import { ProfileOverviewCard } from "@/components/github/profile-overview-card";
import { StreakHeatmap } from "@/components/streak-heatmap";
import type { GithubStats } from "@/lib/github";
import type { LeetcodeStats } from "@/lib/leetcode";

export default function PreviewPage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "github" | "matchscope" | "settings" | "resume" | "goals" | "circles" | "reviews" | "applications"
  >("overview");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab") as any;
      if (tab && ["overview", "github", "matchscope", "settings", "resume", "goals", "circles", "reviews", "applications"].includes(tab)) {
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
    currentStreak: 1,
    longestStreak: 2,
    heatmap: Array.from({ length: 365 }, (_, i) => {
      const d = new Date(Date.now() - (364 - i) * 86400000);
      const count =
        i === 364 ? 2 :
        i === 363 ? 1 :
        i === 345 ? 3 :
        i === 340 ? 2 :
        i === 310 ? 4 :
        i === 280 ? 1 :
        i === 240 ? 3 :
        i === 200 ? 2 :
        i === 150 ? 4 :
        i === 110 ? 1 :
        i === 60 ? 3 : 0;
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
    followers: 7,
    following: 10,
    totalStars: 4,
    totalForks: 0,
    totalWatchers: 0,
    totalPRs: 0,
    totalIssues: 0,
    totalContributionsLastYear: 34,
    contributionCalendar: [
      { date: "2026-07-06", count: 3 },
      { date: "2026-07-20", count: 1 },
      { date: "2026-08-03", count: 1 },
      { date: "2026-08-17", count: 2 },
      { date: "2026-08-31", count: 3 },
      { date: "2026-09-14", count: 3 },
    ],
    topLanguages: [
      { name: "TypeScript", bytes: 498000 },
      { name: "CSS", bytes: 136000 },
      { name: "JavaScript", bytes: 10000 },
      { name: "HTML", bytes: 4000 },
    ],
    recentActivity: [],
    totalClones: 0,
    totalViews: 0,
    topReferrers: [],
  };

  const previewLeetcode: LeetcodeStats | undefined = undefined;

  const previewGoals = [
    {
      id: "goal-1",
      label: "Automate my full work by using agentic AI, learning How to build agents",
      current: 0,
      target: 1,
      deadline: "2026-10-20",
      status: "in_progress",
      type: "custom",
    },
    {
      id: "goal-2",
      label: "Setup a automatic income source using ai agents for youtube",
      current: 0,
      target: 2,
      deadline: "2026-10-30",
      status: "in_progress",
      type: "custom",
    },
  ];

  const [previewReviews, setPreviewReviews] = useState([
    {
      id: "rev-today",
      weekStart: "2026-09-28",
      weekEnd: "2026-10-04",
      generatedAt: "2026-10-04T20:00:00.000Z",
      summaryText: "Great start to the new week. You maintained your momentum with consistent daily commits and advanced your prep goals.",
      observations: [
        "Logged 8 commits across 2 key repositories.",
        "Maintained active streak with zero reset days.",
        "Advanced Microsoft full-stack engineer application to technical interview.",
      ],
      suggestions: [
        "Tackle 2 medium graph/tree problems on LeetCode before the technical round.",
        "Open a pull request on your primary portfolio project to document architectural decisions.",
      ],
    },
    {
      id: "rev-prev-monday",
      weekStart: "2026-09-21",
      weekEnd: "2026-09-27",
      generatedAt: "2026-09-28T09:30:00.000Z",
      summaryText: "You made a modest start this week with a handful of GitHub contributions. Sunday review was erased to retain only this Monday review and today's active review.",
      observations: [
        "Completed foundational data structures review.",
        "Strengthened commit cadence compared to earlier weeks.",
      ],
      suggestions: [
        "Schedule a dedicated 30-minute coding block each day to protect your streak.",
        "Apply to at least 2 target companies on your wishlist.",
      ],
    },
  ]);

  function generatePreviewReview() {
    const newReview = {
      id: `rev-${Date.now()}`,
      weekStart: new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10),
      weekEnd: new Date().toISOString().slice(0, 10),
      generatedAt: new Date().toISOString(),
      summaryText: "Newly generated review: Coding momentum is strong this week with balanced problem solving and GitHub activity.",
      observations: [
        "Active consistency across all tracked platforms.",
        "Prepared mock interview answers for upcoming technical round.",
      ],
      suggestions: [
        "Keep up the daily cadence and schedule your next mock round.",
      ],
    };
    // Enforce retention: keep only the latest 2 reviews (new review + previous review)
    setPreviewReviews((prev) => [newReview, ...prev].slice(0, 2));
  }

  function deletePreviewReview(id: string) {
    setPreviewReviews((prev) => prev.filter((r) => r.id !== id));
  }

  const previewCompanyPrep = [
    {
      name: "Google",
      focusAreas: ["Graphs", "Dynamic Programming", "System Design (senior roles)"],
      note: "Fewer but harder problems, strong focus on clean code and edge-case handling over speed.",
    },
    {
      name: "Microsoft",
      focusAreas: ["Arrays & Strings", "Trees", "Object-Oriented Design"],
      note: "Broad DSA coverage; on-campus rounds often include a design/OOP round.",
    },
    {
      name: "Amazon",
      focusAreas: ["Trees & Graphs", "OOP Design", "Leadership Principles (behavioral)"],
      note: "Heavy emphasis on behavioral answers tied to their Leadership Principles alongside DSA — prep STAR-format stories, not just code.",
    },
  ];

  const [copiedBullet, setCopiedBullet] = useState<number | null>(null);

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "github", label: "GitHub" },
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
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-4xl">
                Over<span className="gradient-title-view">view</span>
              </h1>
              <p className="mt-1.5 text-sm text-muted dark:text-slate-400">
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

            {/* Preparation & Goals */}
            <div className="pt-2">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-600 dark:text-slate-300">
                  Preparation & Goals
                </h2>
                <div className="h-[2px] w-28 bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent rounded-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
              </div>
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 items-stretch">
                <GoalsSummaryWidget previewData={previewGoals} />
                <LatestReviewWidget previewData={previewReviews[0]} />
                <CompanyPrepWidget previewData={previewCompanyPrep} />
              </div>
            </div>
          </div>
        )}

        {/* GITHUB TAB */}
        {activeTab === "github" && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-4xl">
                Git<span className="gradient-title-view">Hub</span>
              </h1>
              <p className="mt-1.5 text-sm text-muted dark:text-slate-400">
                Track your contributions, languages, and repo statistics.
              </p>
            </div>

            <Card className="overflow-hidden min-w-0 max-w-full">
              <div className="p-5 flex items-center justify-between border-b border-border/60">
                <h3 className="font-semibold text-foreground dark:text-white text-base">Contribution activity</h3>
                <span className="font-data text-xs text-muted">
                  {previewGithub.totalContributionsLastYear} in the last year
                </span>
              </div>
              <div className="p-5 min-w-0 overflow-hidden">
                <StreakHeatmap days={previewGithub.contributionCalendar} />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 min-w-0 w-full items-stretch">
              <TopLanguagesCard data={previewGithub.topLanguages} repoCount={previewGithub.publicRepos} />
              <ProfileOverviewCard
                stats={{
                  publicRepos: previewGithub.publicRepos,
                  totalStars: previewGithub.totalStars,
                  followers: previewGithub.followers,
                  following: previewGithub.following,
                  totalForks: previewGithub.totalForks,
                  totalWatchers: previewGithub.totalWatchers,
                  totalPRs: previewGithub.totalPRs,
                  totalIssues: previewGithub.totalIssues,
                }}
              />
            </div>
          </div>
        )}

        {/* 2. SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-xl space-y-5 animate-fade-in">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-foreground dark:text-white">Settings</h1>
              <p className="mt-1 text-sm text-muted dark:text-slate-400">Your profile and connections.</p>
            </div>

            {/* GitHub Card */}
            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold text-foreground dark:text-white">GitHub</h2>
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
              <h2 className="mb-1 text-sm font-semibold text-foreground dark:text-white">Public profile</h2>
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
              <h2 className="mb-4 text-sm font-semibold text-foreground dark:text-white">Profile</h2>
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

                {/* MATCHSCOPE TAB */}
        {activeTab === "matchscope" && (
          <div className="space-y-6 animate-fade-in">
            <MatchScopeClient />
          </div>
        )}

        {/* 4. GOALS */}
        {activeTab === "goals" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground dark:text-white">Goals</h1>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">Set targets and watch your progress fill in.</p>
              </div>
              <Button>
                <Plus size={15} /> New goal
              </Button>
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-accent/30 bg-accent/10 px-4 py-3 text-sm backdrop-blur-sm">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent">
                <CalendarClock size={16} />
              </div>
              <span className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
                Your placement date has passed — update it in Settings if you have a new one.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">LeetCode</span>
                    <h3 className="text-base font-bold text-foreground dark:text-white mt-1">Solve 100 Medium Problems</h3>
                  </div>
                  <Badge tone="warn">In progress</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Progress</span>
                    <span className="font-semibold text-foreground dark:text-white">48 / 100</span>
                  </div>
                  <Progress value={48} />
                </div>
              </Card>

              <Card className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-semibold text-teal-600 dark:text-accent-2 uppercase tracking-wider">GitHub</span>
                    <h3 className="text-base font-bold text-foreground dark:text-white mt-1">30-Day Contribution Streak</h3>
                  </div>
                  <Badge tone="neutral">0d streak</Badge>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted">Progress</span>
                    <span className="font-semibold text-foreground dark:text-white">1 / 30</span>
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
                <h1 className="text-xl font-bold tracking-tight text-foreground dark:text-white">Circles</h1>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">
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
                  <p className="text-base font-bold text-foreground dark:text-white">ai a</p>
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
                <h1 className="text-xl font-bold tracking-tight text-foreground dark:text-white">AI weekly reviews</h1>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">
                  A short, honest look back — CodeBoard retains your current review and previous review. Older reviews are automatically erased.
                </p>
              </div>
              <Button onClick={generatePreviewReview}>
                <Sparkles size={15} /> Generate this week&apos;s review
              </Button>
            </div>

            {previewReviews.length === 0 && (
              <div className="rounded-2xl border border-border bg-surface p-8 text-center">
                <Sparkles className="mx-auto h-8 w-8 text-muted" />
                <p className="mt-2 text-sm font-semibold text-foreground">No reviews yet</p>
                <p className="text-xs text-muted mt-1">Click &ldquo;Generate this week&apos;s review&rdquo; above.</p>
              </div>
            )}

            <div className="space-y-4">
              {previewReviews.map((r, idx) => (
                <Card key={r.id} className="p-5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${
                          idx === 0
                            ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                            : "bg-slate-700/30 text-slate-300 border border-slate-700/50"
                        }`}
                      >
                        {idx === 0 ? "Current review" : "Previous review"}
                      </span>
                      <span className="text-xs text-muted">
                        Week of {r.weekStart} – {r.weekEnd}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-muted">Generated {new Date(r.generatedAt).toLocaleDateString()}</span>
                      <button
                        type="button"
                        onClick={() => deletePreviewReview(r.id)}
                        className="rounded p-1 text-muted hover:bg-danger/10 hover:text-danger transition-colors"
                        title="Erase review"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <p className="text-sm text-foreground leading-relaxed">{r.summaryText}</p>

                  {r.observations.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/60">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200">
                        <TrendingUp size={13} className="text-teal-600 dark:text-accent-2" /> Observations
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                        {r.observations.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-muted shrink-0 mt-0.5">•</span>
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {r.suggestions.length > 0 && (
                    <div className="mt-4 pt-3 border-t border-border/60">
                      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-900 dark:text-slate-200">
                        <Lightbulb size={13} className="text-amber-600 dark:text-warn" /> For next week
                      </p>
                      <ul className="space-y-1.5 text-sm text-slate-700 dark:text-slate-300">
                        {r.suggestions.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 leading-relaxed">
                            <span className="text-muted shrink-0 mt-0.5">•</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 7. APPLICATIONS */}
        {activeTab === "applications" && (
          <div className="space-y-5 animate-fade-in">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold tracking-tight text-foreground dark:text-white">Applications</h1>
                <p className="mt-1 text-sm text-muted dark:text-slate-400">
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
                  <p className="text-sm font-semibold text-foreground dark:text-white">Google</p>
                  <p className="text-xs text-muted">Software Engineer (Frontend)</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted uppercase">Applied (1)</span>
                  <span className="h-2 w-2 rounded-full bg-blue-500" />
                </div>
                <div className="rounded-xl border border-border/60 bg-surface-2/70 p-3">
                  <p className="text-sm font-semibold text-foreground dark:text-white">Microsoft</p>
                  <p className="text-xs text-muted">Full Stack Engineer · Applied Sep 2</p>
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-muted uppercase">Interview (1)</span>
                  <span className="h-2 w-2 rounded-full bg-teal-500" />
                </div>
                <div className="rounded-xl border border-border/60 bg-surface-2/70 p-3">
                  <p className="text-sm font-semibold text-foreground dark:text-white">Amazon</p>
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
