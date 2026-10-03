import type { Metadata } from "next";
import { MatchScopeClient } from "@/components/matchscope/MatchScopeClient";

export const metadata: Metadata = {
  title: "MatchScope — CodeBoard",
  description: "AI-powered Resume ↔ Job Description ATS Matcher with score ring, category breakdown, keyword extraction, and actionable edits.",
};

export default function MatchScopePage() {
  return (
    <div className="space-y-6">
      <MatchScopeClient />
    </div>
  );
}