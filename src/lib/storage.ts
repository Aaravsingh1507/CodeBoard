import { writeFile, unlink } from "fs/promises";
import path from "path";

// Local-disk implementation. Works out of the box for local dev.
//
// IMPORTANT for production on Vercel: the filesystem is read-only except
// /tmp, and nothing written to disk persists between deployments/instances.
// Swap this module's two functions for Supabase Storage or S3 before
// deploying resume upload to production — the API routes that call this
// (see /api/resume) don't need to change, only these two functions.

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function saveFile(buffer: Buffer, originalName: string): Promise<string> {
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
