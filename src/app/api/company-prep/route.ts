import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { matchCompanyPrep } from "@/lib/company-prep";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const matches = matchCompanyPrep(user.targetCompanies);
  return NextResponse.json({ data: matches });
}
