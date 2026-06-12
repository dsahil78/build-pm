import type { Metadata } from "next";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";
import { PostHogPageView } from "@/components/providers/PostHogPageView";
import { CookieConsent } from "@/components/shared/CookieConsent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://buildpm.co"),
  title: {
    default: "BuildPM — For product people who ship",
    template: "%s | BuildPM",
  },
  description:
    "A community for PMs who build and ship. Free enterprise tools, build squads, career growth. Not another Slack group.",
  keywords: [
    "product management",
    "PM community",
    "build in public",
    "AI product management",
    "product manager tools",
    "ship products",
    "PM career",
    "builder community",
  ],
  authors: [{ name: "BuildPM" }],
  creator: "BuildPM",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://buildpm.co",
    siteName: "BuildPM",
    title: "BuildPM — For product people who ship",
    description:
      "Free enterprise tools. Build squads. Career growth. A community for PMs who build, not just talk.",
    images: [
      {
        url: "/og/default.png",
        width: 1200,
        height: 630,
        alt: "BuildPM — For product people who ship",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BuildPM — For product people who ship",
    description:
      "Free enterprise tools. Build squads. Career growth. A community for PMs who build, not just talk.",
    images: ["/og/default.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "BuildPM",
  url: "https://buildpm.co",
  description:
    "A three-sided marketplace for product builders. Free enterprise tools, build squads, and career growth.",
  foundingDate: "2026",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />
      </head>
      <body className="bg-brand-dark text-white font-body antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-brand-coral focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
        >
          Skip to content
        </a>
        {children}
        <Suspense>
          <PostHogPageView />
        </Suspense>
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
