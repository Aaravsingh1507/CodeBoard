import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { generateAndStoreWeeklyReview } from "@/lib/weekly-review";

// "Generate this week's review now" button on the dashboard/reviews page.
export async function POST() {
  const { user, error } = await requireUser();
  if (error) return error;

  const rateCheck = checkRateLimit(`review:${user.id}`, { limit: 10, windowMs: 60_000 });
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: `Too many generation requests. Please wait ${rateCheck.reset}s.` },
      { status: 429 }
    );
  }

  try {
    const review = await generateAndStoreWeeklyReview(user.id);
    return NextResponse.json({
      data: {
        ...review,
        observations: JSON.parse(review.observations),
        suggestions: JSON.parse(review.suggestions),
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate review." },
      { status: 502 }
    );
  }
}
