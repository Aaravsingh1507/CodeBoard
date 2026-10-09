import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Preview & Interactive Dashboard",
  description:
    "Explore CodeBoard's live interactive developer dashboard demo. Test placement readiness scoring, LeetCode & GitHub widgets, and resume MatchScope.",
  alternates: {
    canonical: "/preview",
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
