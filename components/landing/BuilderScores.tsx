"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { EASE_OUT } from "@/lib/motion";

interface BarItem {
  label: string;
  width: string;
}

const BARS: BarItem[] = [
  { label: "Ship", width: "85%" },
  { label: "Lead", width: "60%" },
  { label: "Teach", width: "45%" },
  { label: "Review", width: "70%" },
];

function MockProfileCard() {
  return (
    <div className="animate-float bg-brand-grey rounded-2xl border border-[#333] p-8 max-w-sm mx-auto">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-grey-700 flex items-center justify-center">
        <span className="text-grey-400 font-medium">JC</span>
      </div>

      {/* Name */}
      <h4 className="text-xl font-bold text-white mt-3">Jamie C.</h4>

      {/* Headline */}
      <p className="text-grey-400 text-sm mt-1">
        AI PM &middot; shipped 12 products
      </p>

      {/* Builder score + badge */}
      <div className="flex items-center gap-3 mt-4">
        <span className="text-4xl font-bold text-brand-coral">847</span>
        <Badge variant="coral">Builder</Badge>
      </div>

      {/* Stats row */}
      <div className="flex items-center gap-2 mt-4 text-grey-400 text-sm">
        <span>12 shipped</span>
        <span className="text-grey-600">&middot;</span>
        <span>3 sprints led</span>
        <span className="text-grey-600">&middot;</span>
        <span>24 reviews</span>
      </div>

      {/* Mini bar chart */}
      <div className="mt-6 space-y-2">
        {BARS.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="text-xs text-grey-400 w-12 text-right">
              {bar.label}
            </span>
            <div className="flex-1 h-2 rounded-full bg-grey-700">
              <div
                className="h-2 rounded-full bg-brand-coral"
                style={{ width: bar.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function BuilderScores() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-brand-dark py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Right column first on mobile (order) — card */}
          <motion.div
            className="order-1 md:order-2"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <MockProfileCard />
          </motion.div>

          {/* Left column — text */}
          <motion.div
            className="order-2 md:order-1"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          >
            {/* Overline */}
            <p className="text-brand-coral text-xs tracking-[0.08em] uppercase font-medium">
              Credibility System
            </p>

            {/* Heading */}
            <h2 className="text-3xl font-bold text-white mt-3">
              Builder scores, not job titles
            </h2>

            {/* Body */}
            <p className="text-grey-300 mt-4 leading-relaxed">
              What you&apos;ve shipped matters more than where you work. An
              aspiring PM who leads a build sprint outranks a FAANG PM who lurks.
              Your score grows every time you build, teach, review, or mentor.
            </p>

            {/* Link */}
            <a
              href="#"
              className="text-brand-coral text-sm mt-4 inline-block hover:opacity-80 transition-opacity"
            >
              Learn more &rarr;
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
