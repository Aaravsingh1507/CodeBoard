import { Resend } from "resend";
import { computeReadiness } from "@/lib/readiness";

/**
 * Sends a weekly digest email if RESEND_API_KEY is configured. Silently
 * no-ops (logs, doesn't throw) if it isn't — the rest of the app works
 * fine without email configured, this is opt-in polish, not a hard
 * dependency.
 */
export async function sendWeeklyDigest(user: {
  id: string;
  email: string | null;
  name: string | null;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.DIGEST_FROM_EMAIL;
  if (!apiKey || !fromEmail || !user.email) return { sent: false, reason: "not configured" };

  const readiness = await computeReadiness(user.id);
  const resend = new Resend(apiKey);

  const nudgesHtml = readiness.nudges.length
    ? `<ul>${readiness.nudges.map((n) => `<li>${escapeHtml(n)}</li>`).join("")}</ul>`
    : `<p>No red flags this week — keep it up.</p>`;

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
      <h2>Your CodeBoard readiness score: ${readiness.score}/100</h2>
      <p>Hi ${escapeHtml(user.name ?? "there")}, here's where things stand this week.</p>
      <p><strong>Focus area:</strong> ${escapeHtml(readiness.focusArea)}</p>
      ${nudgesHtml}
      <p><a href="${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/dashboard">Open your dashboard →</a></p>
      <hr />
      <p style="font-size: 12px; color: #888;">
        You're getting this because weekly digests are enabled in your CodeBoard settings.
        Turn them off anytime in Settings.
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: fromEmail,
      to: user.email,
      subject: `Your readiness score this week: ${readiness.score}/100`,
      html,
    });
    return { sent: true };
  } catch (err) {
    return { sent: false, reason: err instanceof Error ? err.message : "send failed" };
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] ?? c));
}
