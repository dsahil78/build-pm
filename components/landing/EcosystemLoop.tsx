"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const LOOP_STEPS = [
  {
    label: "Builders",
    action: "build products",
    description: "Ship real products using enterprise tools. Get visible.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="8" width="18" height="14" rx="2" /><path d="M12 16V3" /><path d="M8 7L12 3L16 7" />
      </svg>
    ),
  },
  {
    label: "Enterprises",
    action: "use + give feedback",
    description: "Get structured feedback from real product builders. Not surveys.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="14" width="4" height="8" rx="1" /><rect x="10" y="8" width="4" height="14" rx="1" /><rect x="17" y="2" width="4" height="20" rx="1" />
      </svg>
    ),
  },
  {
    label: "Platform",
    action: "distributes + curates",
    description: "Orchestrates the exchange. Matches builders with tools and teams.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="3" r="2" /><circle cx="4" cy="19" r="2" /><circle cx="20" cy="19" r="2" />
        <line x1="12" y1="9" x2="12" y2="5" /><line x1="9.5" y1="14" x2="5.5" y2="17.5" /><line x1="14.5" y1="14" x2="18.5" y2="17.5" />
      </svg>
    ),
  },
  {
    label: "Builders",
    action: "get hired",
    description: "Portfolio becomes proof. Enterprises hire from the community.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 14 15 20 7" /><polyline points="15 7 20 7 20 12" />
      </svg>
    ),
  },
];

export function EcosystemLoop() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-background py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={headingRef}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-accent-text eyebrow">
            The ecosystem
          </p>
          <h2 className="text-h2 tracking-tight text-foreground mt-2">
            A flywheel, not a funnel.
          </h2>
          <p className="text-muted-foreground mt-4 text-lg">
            Every participant makes the ecosystem stronger.
          </p>
        </motion.div>

        {/* Loop: vertical on mobile, horizontal on desktop */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-3 md:gap-0">
          {LOOP_STEPS.map((step, i) => (
            <div key={i} className="flex flex-col md:flex-row items-stretch">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: EASE_OUT }}
                className="group relative w-full md:w-[220px] h-full"
              >
                <div
                  className="rounded-2xl bg-card border border-border-base p-5 text-center h-full transition-all duration-300 hover:-translate-y-1 hover:bg-elevated"
                >
                  <div className="w-11 h-11 rounded-xl bg-accent/[0.08] flex items-center justify-center text-accent-text mx-auto transition-colors duration-300 group-hover:bg-accent/[0.15]">
                    {step.icon}
                  </div>
                  <h3 className="text-foreground font-semibold text-base mt-3">
                    {step.label}
                  </h3>
                  <p className="text-accent-text text-caption font-medium mt-1">
                    {step.action}
                  </p>
                  <p className="text-muted-foreground text-body-sm mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {/* Arrow between steps */}
              {i < LOOP_STEPS.length - 1 && (
                <div className="flex items-center justify-center self-center text-subtle-foreground shrink-0 py-1 md:py-0 md:px-4">
                  {/* Vertical arrow for mobile */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="md:hidden" aria-hidden="true">
                    <line x1="12" y1="5" x2="12" y2="19" /><polyline points="19 12 12 19 5 12" />
                  </svg>
                  {/* Horizontal arrow for desktop */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="hidden md:block" aria-hidden="true">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Loop label — replaces the awkward loop-back arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <div className="h-px w-8 bg-border-strong" />
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-accent-text" aria-hidden="true">
            <polyline points="23 4 23 10 17 10" />
            <polyline points="1 20 1 14 7 14" />
            <path d="M3.51 9a9 9 0 0114.85-3.36L23 10" />
            <path d="M20.49 15a9 9 0 01-14.85 3.36L1 14" />
          </svg>
          <p className="text-subtle-foreground text-xs font-mono tracking-wider uppercase">
            The cycle repeats
          </p>
          <div className="h-px w-8 bg-border-strong" />
        </motion.div>
      </div>
    </section>
  );
}
