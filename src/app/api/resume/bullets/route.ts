import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { buildResumeBulletInput, generateResumeBullets } from "@/lib/resume-bullets";

export async function POST() {
  const { user, error } = await requireUser();
  if (error) return error;

  try {
    const input = await buildResumeBulletInput(user.id);
    const bullets = await generateResumeBullets(input);
    return NextResponse.json({ data: bullets });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to generate bullets." },
      { status: 502 }
    );
  }
}
