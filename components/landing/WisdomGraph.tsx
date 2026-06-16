"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const STEPS = [
  {
    num: "01",
    title: "Find your precedent",
    body: "Search what you're building. Surface the PMs who already shipped something like it.",
  },
  {
    num: "02",
    title: "Read the real story",
    body: "Decisions, tradeoffs, and public post-mortems. Not hot takes. What actually happened.",
  },
  {
    num: "03",
    title: "Ship with hindsight",
    body: "Catch the blind spots others hit before they cost you. Then add your build back to the graph.",
  },
];

export function WisdomGraph() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section data-section="wisdom_graph" className="bg-background py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto" ref={ref}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-accent-text eyebrow">The Wisdom Graph</p>
          <h2 className="text-h2 text-foreground mt-3 tracking-tight">
            Learn from every build but your own.
          </h2>
          <p className="text-muted-foreground text-lg mt-4 leading-relaxed">
            Working on something new? Someone here shipped something close. Ask in plain
            English and see their decisions, the tradeoffs, what broke, and what they&apos;d
            redo. The community&apos;s hindsight, before you ship.
          </p>
        </motion.div>

        {/* Live demo — a dark terminal "screenshot" (stays dark in both themes,
            like the hero terminal). This is "ask the graph" made concrete. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <div className="rounded-2xl border border-[#333] overflow-hidden bg-brand-grey">
            <div className="flex items-center px-3 py-3 border-b border-[#333]">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <span className="mx-auto text-xs font-mono text-grey-500 select-none">
                wisdom graph
              </span>
              <div className="w-[52px]" />
            </div>
            <div className="px-5 py-4 font-mono text-[12px] sm:text-[13px] leading-relaxed space-y-1">
              <div>
                <span className="text-grey-500 select-none">&gt;&nbsp;</span>
                <span className="text-white">build --learn &quot;ai onboarding flow&quot;</span>
              </div>
              <div className="text-grey-300 pt-1">3 builders shipped something close.</div>
              <div className="text-grey-300">
                Common pitfall: <span className="text-brand-coral">skipping the empty state</span> (2 of 3 hit it).
              </div>
              <div className="text-grey-300">Most-regretted tradeoff: personalizing too early.</div>
              <div className="text-brand-coral pt-1">&gt; read their post-mortems</div>
            </div>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.45, delay: 0.2 + i * 0.08, ease: EASE_OUT }}
              className="rounded-2xl bg-card border border-border-base p-6"
            >
              <span className="text-accent-text font-mono text-sm font-bold">{step.num}</span>
              <h3 className="text-foreground font-semibold text-base mt-3">{step.title}</h3>
              <p className="text-muted-foreground text-body-sm mt-2 leading-relaxed">{step.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Reciprocity + trust signal */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          className="text-center text-subtle-foreground text-sm mt-10 max-w-4xl mx-auto leading-relaxed"
        >
          The more you share, the sharper we all get. But candor is never an obligation to
          disclose. Your confidentiality agreements come first, always. Share what is yours to
          share, and hold the rest. In turn, we ask every member to honor the{" "}
          <a
            href="https://en.wikipedia.org/wiki/Chatham_House_Rule"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text font-medium hover:underline"
          >
            Chatham House Rule
          </a>
          , in conversation and in writing: take the insight, leave the attribution.
        </motion.p>
      </div>
    </section>
  );
}
