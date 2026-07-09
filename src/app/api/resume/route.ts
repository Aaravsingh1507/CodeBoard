import { NextResponse } from "next/server";
import { requireUser } from "@/lib/api-auth";
import { prisma } from "@/lib/prisma";
import { saveFile, MAX_RESUME_SIZE_BYTES, ALLOWED_RESUME_TYPE } from "@/lib/storage";

export async function GET() {
  const { user, error } = await requireUser();
  if (error) return error;

  const versions = await prisma.resumeVersion.findMany({
    where: { userId: user.id },
    orderBy: { uploadedAt: "desc" },
  });
  return NextResponse.json({ data: versions });
}

export async function POST(req: Request) {
  const { user, error } = await requireUser();
  if (error) return error;

  const formData = await req.formData();
  const file = formData.get("file");
  const label = String(formData.get("label") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!label) {
    return NextResponse.json({ error: "A version label is required." }, { status: 400 });
  }
  if (file.type !== ALLOWED_RESUME_TYPE) {
    return NextResponse.json({ error: "Only PDF files are supported." }, { status: 400 });
  }
  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return NextResponse.json({ error: "File is larger than 5MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileUrl = await saveFile(buffer, file.name);

  const isFirst = (await prisma.resumeVersion.count({ where: { userId: user.id } })) === 0;

  const version = await prisma.resumeVersion.create({
    data: {
      userId: user.id,
      fileUrl,
      fileName: file.name,
      label,
      notes: notes || null,
      isActive: isFirst,
    },
  });

  return NextResponse.json({ data: version }, { status: 201 });
}
