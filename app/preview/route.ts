import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { timingSafeEqual } from "crypto";

const COOKIE_NAME = "__prelaunch_bypass";
const SEVEN_DAYS = 60 * 60 * 24 * 7;

/** Timing-safe string comparison to prevent timing attacks on token. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  return timingSafeEqual(Buffer.from(a), Buffer.from(b));
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  // Exit preview mode
  if (searchParams.get("exit") === "1") {
    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set(COOKIE_NAME, "", { maxAge: 0, path: "/" });
    return response;
  }

  // Rate limit: 10 attempts per IP per hour
  const ip = getClientIp(request.headers);
  if (!checkRateLimit(ip, 10, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  // Validate token
  const token = searchParams.get("token");
  const expected = process.env.PRELAUNCH_BYPASS_TOKEN;

  if (!expected || !token || !safeEqual(token, expected)) {
    return NextResponse.json(
      { error: "Invalid or missing token" },
      { status: 403 },
    );
  }

  // Set bypass cookie and redirect to home
  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: SEVEN_DAYS,
    path: "/",
  });

  return response;
}
