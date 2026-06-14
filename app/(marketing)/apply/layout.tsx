import type { Metadata } from "next";

// The apply page is a client component, so its per-route metadata lives here.
export const metadata: Metadata = {
  title: "Apply to the founding cohort",
  description:
    "Apply to BuildPM. We’re hand-picking the first 100 builders. If it's a fit you get free enterprise tools, a build squad, and early access at launch.",
  alternates: { canonical: "/apply" },
};

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
