import { ReadinessWidget } from "@/components/widgets/readiness-widget";
import { StreakWidget } from "@/components/widgets/streak-widget";
import { GithubSummaryWidget } from "@/components/widgets/github-summary-widget";
import { LeetcodeSummaryWidget } from "@/components/widgets/leetcode-summary-widget";
import { GoalsSummaryWidget } from "@/components/widgets/goals-summary-widget";
import { LatestReviewWidget } from "@/components/widgets/latest-review-widget";
import { CompanyPrepWidget } from "@/components/widgets/company-prep-widget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Overview Hero Title */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground dark:text-white sm:text-4xl">
          Over<span className="gradient-title-view">view</span>
        </h1>
        <p className="mt-1.5 text-sm text-muted dark:text-slate-400">
          Everything you&apos;re working toward, in one place.
        </p>
      </div>

      {/* Readiness Score Card */}
      <ReadinessWidget />

      {/* Coding Streak Card with Heatmap + 3D Desk Illustration */}
      <StreakWidget />

      {/* Bottom Row: GitHub and LeetCode Side-by-Side */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <GithubSummaryWidget />
        <LeetcodeSummaryWidget />
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
          <GoalsSummaryWidget />
          <LatestReviewWidget />
          <CompanyPrepWidget />
        </div>
      </div>
    </div>
  );
}
