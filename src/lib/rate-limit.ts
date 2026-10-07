/**
 * In-memory sliding window rate limiter for Next.js API routes and serverless functions.
 * Protects expensive endpoints (AI generation, PDF parsing, sync) from abuse and DDoS.
 */

interface RateLimitRecord {
  timestamps: number[];
}

const store = new Map<string, RateLimitRecord>();

// Clean up stale IP records every 5 minutes to avoid memory leaks
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000;
let lastCleanup = Date.now();

function purgeExpired(windowMs: number) {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return;
  lastCleanup = now;

  for (const [key, record] of store.entries()) {
    const valid = record.timestamps.filter((ts) => now - ts < windowMs);
    if (valid.length === 0) {
      store.delete(key);
    } else {
      record.timestamps = valid;
    }
  }
}

export interface RateLimitOptions {
  /** Maximum number of requests allowed within the window */
  limit: number;
  /** Window size in milliseconds (e.g. 60_000 for 1 minute) */
  windowMs: number;
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

export function checkRateLimit(
  identifier: string,
  options: RateLimitOptions = { limit: 20, windowMs: 60_000 }
): RateLimitResult {
  purgeExpired(options.windowMs);

  const now = Date.now();
  let record = store.get(identifier);

  if (!record) {
    record = { timestamps: [] };
    store.set(identifier, record);
  }

  // Filter timestamps within the current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < options.windowMs);

  if (record.timestamps.length >= options.limit) {
    const oldest = record.timestamps[0];
    const reset = Math.ceil((oldest + options.windowMs - now) / 1000);
    return {
      success: false,
      limit: options.limit,
      remaining: 0,
      reset: Math.max(reset, 1),
    };
  }

  record.timestamps.push(now);

  return {
    success: true,
    limit: options.limit,
    remaining: options.limit - record.timestamps.length,
    reset: Math.ceil(options.windowMs / 1000),
  };
}

/**
 * Helper to safely extract client IP from incoming request headers.
 */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0].trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip") || "127.0.0.1";
}
