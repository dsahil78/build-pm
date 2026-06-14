import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { sendApplicationConfirmation } from "@/lib/email";
import {
  isValidEmail,
  isValidUrl,
  isJsonContentType,
  cleanField,
  isAllowedValue,
} from "@/lib/validation";

/* ── Allowed enum values ── */
const VALID_ARCHETYPES = ["aspiring", "builder", "founder", "leader"] as const;
const VALID_REFERRAL_SOURCES = ["linkedin", "twitter", "friend", "other"] as const;
const VALID_PARTNER_TIERS = [
  "ecosystem", "build", "founding", "unsure",
  "tools", "feedback", "hiring", "all", "other",
] as const;

/* ── Field length limits ── */
const MAX_NAME = 120;
const MAX_URL = 500;
const MAX_SHORT = 100;
const MAX_TEXT = 2000;

/* ── Rate limit: 5 requests per IP per hour ── */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  // Rate limit
  const ip = getClientIp(request.headers);
  if (!checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  // Content-Type check
  if (!isJsonContentType(request.headers)) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 400 },
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — real users never fill the hidden `company_url` field. If a bot
  // does, return success but persist nothing (don't tip it off).
  if (typeof body.company_url === "string" && body.company_url.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  // Validate required fields
  const fullName = cleanField(body.full_name as string, MAX_NAME);
  if (!fullName) {
    return NextResponse.json({ error: "Full name is required" }, { status: 400 });
  }

  const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  // Validate optional fields
  const linkedinUrl = cleanField(body.linkedin_url as string, MAX_URL);
  if (linkedinUrl && !isValidUrl(linkedinUrl)) {
    return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
  }

  const archetype = (body.archetype as string) || null;
  if (!isAllowedValue(archetype, VALID_ARCHETYPES)) {
    return NextResponse.json({ error: "Invalid archetype" }, { status: 400 });
  }

  const referralSource = (body.referral_source as string) || null;
  if (!isAllowedValue(referralSource, VALID_REFERRAL_SOURCES)) {
    return NextResponse.json({ error: "Invalid referral source" }, { status: 400 });
  }

  const isPartner = body.type === "partner";
  const tier = isPartner ? ((body.tier as string) || null) : null;
  if (tier && !isAllowedValue(tier, VALID_PARTNER_TIERS)) {
    return NextResponse.json({ error: "Invalid tier" }, { status: 400 });
  }

  // Builder applications require archetype + referral source (selected in the form).
  if (!isPartner) {
    if (!archetype) {
      return NextResponse.json({ error: "Please select your PM archetype" }, { status: 400 });
    }
    if (!referralSource) {
      return NextResponse.json({ error: "Please tell us how you heard about us" }, { status: 400 });
    }
  }

  // Sanitize free-text fields
  const shippedRecently = cleanField(body.shipped_recently as string, MAX_TEXT);
  const whyBuildPm = cleanField(body.why_build_pm as string, MAX_TEXT);
  const company = isPartner ? cleanField(body.company as string, MAX_SHORT) : null;
  const role = isPartner ? cleanField(body.role as string, MAX_SHORT) : null;
  const message = isPartner ? cleanField(body.message as string, MAX_TEXT) : null;

  // Persist
  const supabase = getSupabaseAdmin();

  // CRITICAL: if there's no store, NEVER report success — that silently drops
  // the applicant. Fail loudly in production so the user sees an error + retry.
  if (!supabase) {
    console.error("[apply] No data store configured — submission NOT persisted.");
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "We couldn't save your application right now. Please try again in a moment." },
        { status: 503 },
      );
    }
    return NextResponse.json({ success: true }); // dev convenience only
  }

  const record = isPartner
    ? {
        full_name: fullName,
        email,
        company,
        role,
        tier,
        message,
        type: "partner" as const,
        status: "pending" as const,
      }
    : {
        full_name: fullName,
        email,
        linkedin_url: linkedinUrl,
        archetype,
        shipped_recently: shippedRecently,
        why_build_pm: whyBuildPm,
        referral_source: referralSource,
        status: "pending" as const,
      };

  const { error } = await supabase.from("applications").insert(record);

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email has already applied." },
        { status: 409 },
      );
    }
    console.error("[apply] Supabase insert failed:", error.code, error.message);
    return NextResponse.json(
      { error: "Failed to save application" },
      { status: 500 },
    );
  }

  // Fire-and-forget auto-confirmation for builder applications (never blocks the
  // response; no-ops until RESEND_API_KEY + EMAIL_FROM are configured).
  if (!isPartner) {
    void sendApplicationConfirmation(email, fullName);
  }

  return NextResponse.json({ success: true });
}
