"use client";

import Link from "next/link";
import { ArrowUpRight, Target } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/ui/error-state";
import { EmptyState } from "@/components/ui/empty-state";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";

interface Goal {
  id: string;
  label: string;
  current: number;
  target: number;
  deadline: string;
  status: string;
}

export function GoalsSummaryWidget() {
  const { data, loading, error, refetch } = useFetch<Goal[]>("/api/goals");
  const active = (data ?? []).filter((g) => g.status === "in_progress").slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active goals</CardTitle>
        <Link href="/goals" className="flex items-center gap-1 text-xs text-muted hover:text-accent">
          All goals <ArrowUpRight size={12} />
        </Link>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-20 w-full" />}
        {error && <ErrorState message={error} onRetry={() => refetch()} />}
        {data && active.length === 0 && (
          <EmptyState
            icon={<Target size={20} />}
            title="No active goals"
            description="Set a target to track your progress automatically."
          />
        )}
        {active.length > 0 && (
          <div className="space-y-4">
            {active.map((g) => (
              <div key={g.id}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-foreground">{g.label}</span>
                  <span className="font-data text-xs text-muted">
                    {g.current}/{g.target}
                  </span>
                </div>
                <Progress value={(g.current / g.target) * 100} />
                <p className="mt-1 text-xs text-muted">Due {formatDate(g.deadline)}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
