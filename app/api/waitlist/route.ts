import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { logEvent } from "@/lib/events";
import type { AttributionPayload } from "@/lib/attribution";
import { isValidEmail, isJsonContentType, cleanField } from "@/lib/validation";

/* ── Rate limit: 10 requests per IP per hour ── */
const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

export async function POST(request: NextRequest) {
  const ip = getClientIp(request.headers);
  if (!checkRateLimit(ip, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  if (!isJsonContentType(request.headers)) {
    return NextResponse.json(
      { error: "Content-Type must be application/json" },
      { status: 400 },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill the hidden field; return success, persist nothing.
  if (typeof body.company_url === "string" && body.company_url.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const source = cleanField(body.source as string, 100) ?? "landing_page";

  const supabase = getSupabaseAdmin();

  // Never fake success with no store — fail loudly in production.
  if (!supabase) {
    console.error("[waitlist] No data store configured — signup NOT persisted.");
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Couldn't sign you up right now. Please try again in a moment." },
        { status: 503 },
      );
    }
    return NextResponse.json({ success: true }); // dev convenience only
  }

  const { error } = await supabase.from("waitlist").insert({ email, source });

  if (error) {
    if (error.code === "23505") {
      // Already on the waitlist — treat as success (don't leak membership).
      return NextResponse.json({ success: true });
    }
    console.error("[waitlist] Supabase insert failed:", error.code, error.message);
    return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
  }

  // Fire-and-forget attribution/telemetry (never blocks or fails the response).
  void logEvent({
    eventType: "waitlist_submitted",
    email,
    attribution: body.attribution as Partial<AttributionPayload> | null,
    headers: request.headers,
  });

  return NextResponse.json({ success: true });
}
