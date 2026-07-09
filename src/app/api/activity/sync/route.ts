import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { syncActivityForUser } from "@/lib/activity";

// Manual "refresh my streak now" trigger, callable from the dashboard.
export async function POST() {
  const { user, error } = await requireUser();
  if (error) return error;

  try {
    const result = await syncActivityForUser(user.id);
    return NextResponse.json({ data: result });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to sync activity." },
      { status: 502 }
    );
  }
}
