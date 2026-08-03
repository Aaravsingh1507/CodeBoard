import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { daysUntil } from "@/lib/placement";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  if (!user.placementDate) {
    return NextResponse.json({ data: null });
  }
  return NextResponse.json({
    data: { placementDate: user.placementDate, daysLeft: daysUntil(user.placementDate) },
  });
}
