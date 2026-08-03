import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { computeReadiness } from "@/lib/readiness";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const result = await computeReadiness(user.id);
  return NextResponse.json({ data: result });
}
