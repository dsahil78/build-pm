/**
 * Transactional email via the Resend REST API (no SDK dependency).
 *
 * Dormant until BOTH env vars are set, so it's safe to ship before the email
 * service exists:
 *   RESEND_API_KEY  — from resend.com
 *   EMAIL_FROM      — a verified sender, e.g. "BuildPM <hello@buildpm.co>"
 *
 * All sends are best-effort and never throw — a confirmation-email failure must
 * never fail or block the form submission it follows.
 */
const RESEND_ENDPOINT = "https://api.resend.com/emails";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

async function send(payload: { to: string; subject: string; text: string }): Promise<void> {
  if (!isEmailConfigured()) return;
  try {
    await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM,
        to: payload.to,
        subject: payload.subject,
        text: payload.text,
      }),
      // Don't let a slow email provider hold the request open indefinitely.
      signal: AbortSignal.timeout(4000),
    });
  } catch {
    // Swallow — never affect the submission.
  }
}

/** Instant auto-reply to a builder who just applied. */
export async function sendApplicationConfirmation(to: string, name: string): Promise<void> {
  const first = (name || "").trim().split(/\s+/)[0] || "there";
  await send({
    to,
    subject: "We got your BuildPM application",
    text: `Hi ${first},

Thanks for applying to BuildPM. Your application landed. We read every single one, and you'll hear back within 7 days.

In the meantime: keep shipping.

The BuildPM team`,
  });
}
