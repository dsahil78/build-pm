import type { Metadata } from "next";

// The partners page is a client component, so its per-route metadata lives here.
export const metadata: Metadata = {
  title: "Partner with BuildPM",
  description:
    "Put your tools in the hands of product builders who ship weekly. Get real adoption, structured feedback, and a talent pipeline, not vanity metrics.",
  alternates: { canonical: "/partners" },
};

export default function PartnersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
