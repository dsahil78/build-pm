/**
 * Transactional email via the Resend REST API (no SDK dependency).
 *
 * Dormant until BOTH env vars are set, so it's safe to ship before the email
 * service exists:
 *   RESEND_API_KEY  - from resend.com
 *   EMAIL_FROM      - a verified sender, e.g. "BuildPM <no-reply@buildpm.co>"
 *
 * All sends are best-effort and never throw - a confirmation-email failure must
 * never fail or block the form submission it follows.
 */
const RESEND_ENDPOINT = "https://api.resend.com/emails";

// Web-safe stack: Geist isn't available in mail clients, so fall back cleanly.
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY && process.env.EMAIL_FROM);
}

/** Escape user-supplied text before interpolating it into HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function send(payload: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<void> {
  if (!isEmailConfigured()) {
    // Most common "no email" cause: env vars missing in this runtime.
    console.warn(
      "[email] Skipped: RESEND_API_KEY and/or EMAIL_FROM not set in this environment.",
    );
    return;
  }
  try {
    const res = await fetch(RESEND_ENDPOINT, {
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
        ...(payload.html ? { html: payload.html } : {}),
      }),
      // Don't let a slow email provider hold the request open indefinitely.
      signal: AbortSignal.timeout(4000),
    });
    // Surface Resend rejections (e.g. unverified domain) instead of swallowing
    // them. Still never throws - a failed email must not affect the submission.
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      console.error(`[email] Resend rejected send (HTTP ${res.status}):`, body.slice(0, 600));
    }
  } catch (err) {
    console.error("[email] send failed:", err);
  }
}

/**
 * The BuildPM mark, rebuilt for email: a block monogram drawn with bgcolor
 * table cells (no image, so it can't be blocked) + the wordmark as styled text.
 * Mirrors components/brand/Logo.tsx: left column coral, right column ghost-top
 * then two dark blocks.
 */
function logoHeader(): string {
  const block = (color: string) =>
    `<td width="13" height="7" bgcolor="${color}" style="border-radius:2px;font-size:0;line-height:0;mso-line-height-rule:exactly;">&nbsp;</td>`;
  const gap = `<td width="3" style="font-size:0;line-height:0;">&nbsp;</td>`;
  const row = (right: string) =>
    `<tr>${block("#FF5733")}${gap}${block(right)}</tr><tr><td height="3" colspan="3" style="font-size:0;line-height:0;">&nbsp;</td></tr>`;

  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
    <tr>
      <td style="vertical-align:middle;padding-right:11px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;">
          ${row("#E4E4E7")}${row("#18181B")}
          <tr>${block("#FF5733")}${gap}${block("#18181B")}</tr>
        </table>
      </td>
      <td style="vertical-align:middle;">
        <span style="font-family:${FONT};font-size:20px;font-weight:600;letter-spacing:-0.02em;color:#18181b;">Build<span style="color:#FF5733;">PM</span></span>
      </td>
    </tr>
  </table>`;
}

export type EmailContent = { subject: string; text: string; html: string };

/**
 * Branded HTML shell shared by every transactional email: logo header, the
 * message body, a consistent "Team BuildPM" sign-off, footer, and a per-email
 * "why you got this" note. Keeps all emails visually identical.
 */
function shell(opts: { title: string; bodyHtml: string; footerNote: string }): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<title>${opts.title}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4f4f5;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background-color:#ffffff;border:1px solid #e4e4e7;border-radius:14px;">
          <tr>
            <td style="padding:30px 32px 0 32px;">
              ${logoHeader()}
            </td>
          </tr>
          <tr>
            <td style="padding:22px 32px 0 32px;font-family:${FONT};font-size:15px;line-height:1.62;color:#27272a;">
              ${opts.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:20px 32px 28px 32px;font-family:${FONT};font-size:15px;line-height:1.62;color:#27272a;">
              <p style="margin:0;font-weight:600;">Team BuildPM</p>
            </td>
          </tr>
          <tr>
            <td style="padding:18px 32px;border-top:1px solid #f1f1f4;font-family:${FONT};font-size:12px;line-height:1.55;color:#a1a1aa;">
              BuildPM. For product people who ship.<br>
              <a href="https://buildpm.co" style="color:#71717a;text-decoration:none;">buildpm.co</a>
            </td>
          </tr>
        </table>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;">
          <tr>
            <td style="padding:16px 32px;text-align:center;font-family:${FONT};font-size:11px;line-height:1.5;color:#a1a1aa;">
              ${opts.footerNote}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/** Pure builder for the builder-application confirmation. */
export function buildConfirmationEmail(name: string): EmailContent {
  const first = (name || "").trim().split(/\s+/)[0] || "there";
  const safeFirst = escapeHtml(first);

  const text = `Hi ${first},

Thanks for applying to BuildPM. Your application landed. We read every single one, and you'll hear back within 7 days.

In the meantime: keep building.

Team BuildPM
buildpm.co

You're receiving this because you applied at buildpm.co. This inbox isn't monitored.`;

  const bodyHtml = `<p style="margin:0 0 16px 0;">Hi ${safeFirst},</p>
              <p style="margin:0 0 16px 0;">Thanks for applying to BuildPM. Your application landed. We read every single one, and you&apos;ll hear back within 7 days.</p>
              <p style="margin:0 0 4px 0;">In the meantime: keep building.</p>`;

  return {
    subject: "We got your BuildPM application",
    text,
    html: shell({
      title: "We got your BuildPM application",
      bodyHtml,
      footerNote:
        "You're receiving this because you applied at buildpm.co. This inbox isn't monitored.",
    }),
  };
}

/** Pure builder for the waitlist confirmation (waitlist captures email only). */
export function buildWaitlistEmail(): EmailContent {
  const text = `You're on the list.

Thanks for joining the BuildPM waitlist. You'll be among the first in when we open the doors, with early access to build squads and the full tool shelf before everyone else.

We'll only email you about launch. No spam. In the meantime, keep building.

Team BuildPM
buildpm.co

You're receiving this because you joined the BuildPM waitlist at buildpm.co. This inbox isn't monitored.`;

  const bodyHtml = `<p style="margin:0 0 16px 0;font-weight:600;">You&apos;re on the list.</p>
              <p style="margin:0 0 16px 0;">Thanks for joining the BuildPM waitlist. You&apos;ll be among the first in when we open the doors, with early access to build squads and the full tool shelf before everyone else.</p>
              <p style="margin:0 0 4px 0;">We&apos;ll only email you about launch. No spam. In the meantime, keep building.</p>`;

  return {
    subject: "You're on the BuildPM waitlist",
    text,
    html: shell({
      title: "You're on the BuildPM waitlist",
      bodyHtml,
      footerNote:
        "You're receiving this because you joined the BuildPM waitlist at buildpm.co. This inbox isn't monitored.",
    }),
  };
}

/** Pure builder for the partner-enquiry confirmation. Warm, confident, not needy. */
export function buildPartnerEmail(name: string): EmailContent {
  const first = (name || "").trim().split(/\s+/)[0] || "there";
  const safeFirst = escapeHtml(first);

  const text = `Hi ${first},

Thanks for reaching out about partnering with BuildPM. Partners like you are a big part of why a community like this thrives. Builders do their best work when the teams behind great products show up alongside them.

We read every note personally. We'll look yours over and come back to you with next steps.

Talk soon,
Team BuildPM
buildpm.co

You're receiving this because you reached out about partnering with BuildPM. This inbox isn't monitored.`;

  const bodyHtml = `<p style="margin:0 0 16px 0;">Hi ${safeFirst},</p>
              <p style="margin:0 0 16px 0;">Thanks for reaching out about partnering with BuildPM. Partners like you are a big part of why a community like this thrives. Builders do their best work when the teams behind great products show up alongside them.</p>
              <p style="margin:0 0 16px 0;">We read every note personally. We&apos;ll look yours over and come back to you with next steps.</p>
              <p style="margin:0 0 4px 0;">Talk soon,</p>`;

  return {
    subject: "Thanks for reaching out to BuildPM",
    text,
    html: shell({
      title: "Thanks for reaching out to BuildPM",
      bodyHtml,
      footerNote:
        "You're receiving this because you reached out about partnering with BuildPM. This inbox isn't monitored.",
    }),
  };
}

/** Instant auto-reply to a builder who just applied. */
export async function sendApplicationConfirmation(to: string, name: string): Promise<void> {
  const { subject, text, html } = buildConfirmationEmail(name);
  await send({ to, subject, text, html });
}

/** Instant auto-reply to someone who joined the waitlist. */
export async function sendWaitlistConfirmation(to: string): Promise<void> {
  const { subject, text, html } = buildWaitlistEmail();
  await send({ to, subject, text, html });
}

/** Instant auto-reply to a partner enquiry. */
export async function sendPartnerConfirmation(to: string, name: string): Promise<void> {
  const { subject, text, html } = buildPartnerEmail(name);
  await send({ to, subject, text, html });
}
