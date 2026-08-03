"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { formatDate } from "@/lib/utils";

interface Review {
  weekStart: string;
  weekEnd: string;
  summaryText: string;
}

export function LatestReviewWidget() {
  const { data, loading } = useFetch<Review[]>("/api/reviews");
  const latest = data?.[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest AI review</CardTitle>
        <Link href="/reviews" className="flex items-center gap-1 text-xs text-muted hover:text-accent">
          History <ArrowUpRight size={12} />
        </Link>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-16 w-full" />}
        {!loading && !latest && (
          <EmptyState
            icon={<Sparkles size={20} />}
            title="No reviews yet"
            description="Generate your first weekly review from the Reviews page."
          />
        )}
        {latest && (
          <>
            <p className="mb-1 text-xs text-muted">
              Week of {formatDate(latest.weekStart)}–{formatDate(latest.weekEnd)}
            </p>
            <p className="text-sm text-foreground">{latest.summaryText}</p>
          </>
        )}
      </CardContent>
    </Card>
  );
}
