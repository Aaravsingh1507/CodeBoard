import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { buildResumeBulletInput, generateResumeBullets } from "@/lib/resume-bullets";

export async function POST() {
  const { user, error } = await requireUser();
  if (error) return error;

  const rateCheck = checkRateLimit(`bullets:${user.id}`, { limit: 10, windowMs: 60_000 });
  if (!rateCheck.success) {
    return NextResponse.json(
      { error: `Too many generation requests. Please wait ${rateCheck.reset}s.` },
      { status: 429 }
    );
  }

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
