import { NextResponse, type NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
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

  const email = (typeof body.email === "string" ? body.email : "").trim().toLowerCase();
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  const source = cleanField(body.source as string, 100) ?? "landing_page";

  const supabase = getSupabaseAdmin();

  if (supabase) {
    const { error } = await supabase.from("waitlist").insert({
      email,
      source,
    });

    if (error) {
      if (error.code === "23505") {
        // Already on waitlist — still return success (don't leak info)
        return NextResponse.json({ success: true });
      }
      console.error("[waitlist] Supabase insert failed:", error.code, error.message);
      return NextResponse.json({ error: "Failed to join waitlist" }, { status: 500 });
    }
  } else {
    console.log("[waitlist] Signup received (no Supabase configured)");
  }

  return NextResponse.json({ success: true });
}
