import { writeFile, unlink, mkdir } from "fs/promises";
import path from "path";

// On Vercel, the project filesystem is read-only — only /tmp is writable.
// We detect the VERCEL env var and fall back to /tmp for uploads.
//
// IMPORTANT: /tmp is ephemeral and cleared between deployments and cold
// starts. This is a stopgap so the app doesn't crash. For durable file
// storage, swap these functions for Supabase Storage, S3, or Cloudflare R2.

const IS_VERCEL = !!process.env.VERCEL;
const UPLOAD_DIR = IS_VERCEL
  ? "/tmp/uploads"
  : path.join(process.cwd(), "public", "uploads");

export async function saveFile(buffer: Buffer, originalName: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const safeName = `${Date.now()}-${originalName.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
  await writeFile(path.join(UPLOAD_DIR, safeName), buffer);
  return `/uploads/${safeName}`;
}

export async function deleteFile(fileUrl: string): Promise<void> {
  const fileName = fileUrl.replace("/uploads/", "");
  try {
    await unlink(path.join(UPLOAD_DIR, fileName));
  } catch {
    // Already gone — not fatal.
  }
}

export const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_RESUME_TYPE = "application/pdf";
