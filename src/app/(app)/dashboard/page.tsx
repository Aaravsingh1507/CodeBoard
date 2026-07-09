import { StreakWidget } from "@/components/widgets/streak-widget";
import { GithubSummaryWidget } from "@/components/widgets/github-summary-widget";
import { LeetcodeSummaryWidget } from "@/components/widgets/leetcode-summary-widget";
import { GoalsSummaryWidget } from "@/components/widgets/goals-summary-widget";
import { LatestReviewWidget } from "@/components/widgets/latest-review-widget";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Overview</h1>
        <p className="mt-1 text-sm text-muted">Everything you&apos;re working toward, in one place.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="lg:col-span-2">
          <StreakWidget />
        </div>
        <GithubSummaryWidget />
        <LeetcodeSummaryWidget />
        <GoalsSummaryWidget />
        <LatestReviewWidget />
      </div>
    </div>
  );
}
