"use client";

import Link from "next/link";
import { Building2 } from "lucide-react";
import { useFetch } from "@/lib/use-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { EmptyState } from "@/components/ui/empty-state";
import { Badge } from "@/components/ui/badge";

interface Profile {
  name: string;
  focusAreas: string[];
  note: string;
}

export function CompanyPrepWidget() {
  const { data, loading } = useFetch<Profile[]>("/api/company-prep");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company prep focus</CardTitle>
      </CardHeader>
      <CardContent>
        {loading && <Skeleton className="h-20 w-full" />}
        {!loading && (!data || data.length === 0) && (
          <EmptyState
            icon={<Building2 size={18} />}
            title="No target companies matched"
            description={
              <>
                Add target companies in{" "}
                <Link href="/settings" className="text-accent hover:underline">
                  Settings
                </Link>{" "}
                to see focus areas here.
              </>
            }
          />
        )}
        {data && data.length > 0 && (
          <div className="space-y-4">
            {data.map((p) => (
              <div key={p.name}>
                <p className="text-sm font-medium text-foreground">{p.name}</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {p.focusAreas.map((f) => (
                    <Badge key={f} tone="accent">{f}</Badge>
                  ))}
                </div>
                <p className="mt-1.5 text-xs text-muted">{p.note}</p>
              </div>
            ))}
            <p className="text-[11px] text-muted">
              General guidance from public prep community knowledge, not official or guaranteed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
