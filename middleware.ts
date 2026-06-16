import { NextResponse, type NextRequest } from "next/server";

const ALLOWED_PATHS = new Set(["/", "/apply", "/partners", "/preview", "/privacy", "/terms"]);
const ALLOWED_API_PREFIXES = ["/api/apply", "/api/waitlist", "/api/track"];
// Generated metadata files (favicon, manifest, sitemap, robots) must be reachable
// even in pre-launch — otherwise the icon/manifest/sitemap get redirected to "/".
const ALLOWED_METADATA = ["/icon", "/apple-icon", "/opengraph-image", "/twitter-image", "/manifest.webmanifest", "/sitemap.xml", "/robots.txt"];
const STATIC_ASSET_RE = /\.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot|map|webmanifest|xml|txt)$/;

export function middleware(request: NextRequest) {
  const isPrelaunch = process.env.NEXT_PUBLIC_PRELAUNCH === "true";
  if (!isPrelaunch) return NextResponse.next();

  // Privileged users with the bypass cookie see the full site
  if (request.cookies.get("__prelaunch_bypass")?.value === "1") {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Allow: whitelisted pages
  if (ALLOWED_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  // Allow: generated metadata routes (favicon/manifest/sitemap/robots)
  if (ALLOWED_METADATA.some((p) => pathname === p || pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // Allow: specific API routes (exact match)
  if (ALLOWED_API_PREFIXES.some((p) => pathname === p)) {
    return NextResponse.next();
  }

  // Allow: Next.js internals
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }

  // Allow: PostHog reverse proxy
  if (pathname.startsWith("/ingest")) {
    return NextResponse.next();
  }

  // Allow: static assets by extension
  if (STATIC_ASSET_RE.test(pathname)) {
    return NextResponse.next();
  }

  // Redirect everything else to home
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
