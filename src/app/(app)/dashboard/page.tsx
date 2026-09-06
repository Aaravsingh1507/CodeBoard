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
        <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Over<span className="gradient-title-view">view</span>
        </h1>
        <p className="mt-1.5 text-sm text-slate-400">
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
        <h2 className="mb-4 text-xs font-bold tracking-wider uppercase text-slate-400">
          Preparation & Goals
        </h2>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <GoalsSummaryWidget />
          <LatestReviewWidget />
          <CompanyPrepWidget />
        </div>
      </div>
    </div>
  );
}
