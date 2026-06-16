import { NextResponse, type NextRequest } from "next/server";
import { logEventsBatch } from "@/lib/events";

/**
 * Cookieless journey beacon sink. Receives batched, anonymous funnel events
 * from the client (sendBeacon / keepalive fetch) and bulk-inserts them.
 * Always returns 200 quickly so it never blocks navigation. No consent gate:
 * the data is anonymous and aggregate (legitimate interest).
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let body: unknown;
  try {
    // sendBeacon may arrive as a Blob/text rather than parsed JSON.
    const raw = await request.text();
    body = raw ? JSON.parse(raw) : null;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  await logEventsBatch(body, request.headers);
  return NextResponse.json({ ok: true });
}
