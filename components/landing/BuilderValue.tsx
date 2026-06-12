"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface ValueItem {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const CORE: ValueItem[] = [
  {
    title: "Build squads",
    description:
      "Team up with 3\u20135 builders. Ship a real product in 2 weeks. Public build logs document every decision.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="3" /><path d="M3 19C3 15.686 5.686 13 9 13" /><circle cx="17" cy="7" r="3" /><path d="M21 19C21 15.686 18.314 13 17 13" /><path d="M9 13C10.5 14.5 13.5 14.5 15 13" />
      </svg>
    ),
  },
  {
    title: "Builder portfolio",
    description:
      "build.pm/you. A living portfolio backed by shipped projects, documented decisions, and peer endorsements.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="2" y="4" width="20" height="16" rx="2" /><line x1="2" y1="9" x2="22" y2="9" /><circle cx="5" cy="6.5" r="0.75" fill="currentColor" /><circle cx="7.5" cy="6.5" r="0.75" fill="currentColor" /><circle cx="10" cy="6.5" r="0.75" fill="currentColor" /><circle cx="8" cy="14" r="2" /><line x1="13" y1="13" x2="19" y2="13" strokeLinecap="round" /><line x1="13" y1="16" x2="17" y2="16" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Career flywheel",
    description:
      "Build \u2192 get visible \u2192 get referred \u2192 land role. Your portfolio replaces your resume.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="4 17 10 11 14 15 20 7" /><polyline points="15 7 20 7 20 12" />
      </svg>
    ),
  },
];

const SUPPORTING: ValueItem[] = [
  {
    title: "Free enterprise tools",
    description: "$200K+ in tools committed from 40+ launch partners. Cursor, Claude, AWS, Datadog. Free for members.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" /><rect x="2" y="7" width="20" height="4" rx="1" /><line x1="12" y1="7" x2="12" y2="22" /><path d="M12 7C12 7 9 7 7 5C5 3 7 1 9 2C11 3 12 7 12 7Z" strokeLinejoin="round" /><path d="M12 7C12 7 15 7 17 5C19 3 17 1 15 2C13 3 12 7 12 7Z" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Learning cohorts",
    description: "Peer-led, not lecture-led. Members teach what they know. Always applied, never theoretical.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 4V20C2 20 5 18 12 18C19 18 22 20 22 20V4C22 4 19 6 12 6C5 6 2 4 2 4Z" /><line x1="12" y1="6" x2="12" y2="18" />
      </svg>
    ),
  },
  {
    title: "Co-ownership",
    description: "Vote on the roadmap. Elect chapter leads. Shape what gets built. The builders run this.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" /><line x1="9" y1="11" x2="15" y2="11" strokeWidth="2" /><rect x="9" y="3" width="6" height="9" rx="1" /><path d="M10.5 8L11.5 9.5L13.5 6.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function CoreCard({ item, index }: { item: ValueItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE_OUT }}
      className="group"
    >
      <div
        className="rounded-3xl bg-gradient-to-b from-[#252525] to-[#1F1F1F] p-8 h-full transition-all duration-500 ease-out hover:from-[#282828] hover:to-[#222] hover:-translate-y-1"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0 rgba(0,0,0,0)" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px -12px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.05), 0 0 0 0 rgba(0,0,0,0)";
        }}
      >
        <div className="w-12 h-12 rounded-2xl bg-brand-coral/[0.08] flex items-center justify-center text-brand-coral transition-colors duration-300 group-hover:bg-brand-coral/[0.15]">
          {item.icon}
        </div>
        <h3 className="text-xl font-semibold text-white mt-5 tracking-tight">
          {item.title}
        </h3>
        <p className="text-[15px] text-grey-400 mt-3 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

function SupportingCard({ item, index }: { item: ValueItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
      className="group rounded-2xl bg-gradient-to-b from-[#2A2A2A] to-[#252525] px-5 py-5 transition-all duration-300 hover:from-[#2E2E2E] hover:to-[#292929] hover:-translate-y-0.5 h-full"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)" }}
    >
      <div className="w-10 h-10 rounded-xl bg-brand-coral/[0.06] flex items-center justify-center text-brand-coral shrink-0 mb-3 transition-colors duration-300 group-hover:bg-brand-coral/[0.12]">
        {item.icon}
      </div>
      <h3 className="text-sm font-semibold text-white">{item.title}</h3>
      <p className="text-[13px] text-grey-400 mt-1.5 leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

export function BuilderValue() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="relative bg-[#222] py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-6xl mx-auto" ref={headingRef}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center"
        >
          <p className="text-brand-coral text-sm font-semibold tracking-wider uppercase">
            The builder stack
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2 tracking-tight">
            Everything you need to{" "}
            <span className="text-grey-500">ship and get hired</span>
          </h2>
        </motion.div>

        {/* Core — large cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-14">
          {CORE.map((item, i) => (
            <CoreCard key={item.title} item={item} index={i} />
          ))}
        </div>

        {/* Supporting label */}
        <div className="flex items-center gap-4 mt-14 mb-6">
          <div className="h-px flex-1 bg-[#333]" />
          <span className="text-grey-500 text-xs font-mono tracking-wider uppercase">
            Plus
          </span>
          <div className="h-px flex-1 bg-[#333]" />
        </div>

        {/* Supporting — compact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SUPPORTING.map((item, i) => (
            <SupportingCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
