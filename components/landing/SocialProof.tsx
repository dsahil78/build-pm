"use client";

// ⚠️ PLACEHOLDER TESTIMONIALS — DO NOT ENABLE IN PRODUCTION.
// These are fabricated and must NOT be shown until replaced with real, verified,
// consenting members' testimonials. Same trust risk as fabricated metrics.
// Identities must stay consistent with Testimonials.tsx.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { TOOL_LOGOS } from "@/lib/tool-logos";

// TODO(pre-launch): These testimonials are placeholders. Verify each is a real,
// consenting member and that names/titles match across the site before launch.
// Identities are kept consistent with components/landing/Testimonials.tsx.
const TESTIMONIALS = [
  {
    quote: "I shipped more in my first two weeks here than in six months at my previous company. The build squads are addictive.",
    name: "Riya P.",
    title: "PM at a Series B startup",
    initials: "RP",
    bg: "#378ADD",
  },
  {
    quote: "My BuildPM portfolio got me three interviews in a week. Recruiters actually looked at what I shipped instead of my resume.",
    name: "Dan M.",
    title: "Senior PM, fintech",
    initials: "DM",
    bg: "#7F77DD",
  },
  {
    quote: "Finally, a community that values doing over talking. The feedback from other builders made my product 10x better.",
    name: "Kim T.",
    title: "Founder, prev. Google PM",
    initials: "KT",
    bg: "#1D9E75",
  },
];

export function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-background py-16 sm:py-24 md:py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* "Builders from" logos */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center mb-20"
        >
          <p className="text-subtle-foreground text-sm mb-8">
            Builders use tools from
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {TOOL_LOGOS.slice(0, 10).map((logo) => (
              <div
                key={logo.name}
                className="opacity-20 hover:opacity-80 transition-opacity duration-300"
                title={logo.name}
              >
                <svg
                  viewBox={logo.viewBox}
                  width="28"
                  height="28"
                  fill="white"
                  role="img"
                  aria-label={logo.name}
                >
                  <title>{logo.name}</title>
                  <path d={logo.path} />
                </svg>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE_OUT }}
              className="rounded-2xl bg-card border border-border-base p-6 relative"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
            >
              {/* Quote mark */}
              <span className="text-accent-text/20 text-5xl font-serif leading-none absolute top-4 right-6 select-none" aria-hidden="true">
                &ldquo;
              </span>

              <p className="text-[15px] text-muted-foreground leading-relaxed relative z-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 mt-6 pt-5 border-t border-border-base">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-foreground text-xs font-bold"
                  style={{ backgroundColor: t.bg }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{t.name}</p>
                  <p className="text-xs text-subtle-foreground">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
