"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "@/components/shared/AnimatedCounter";
import { EASE_OUT } from "@/lib/motion";

export function OpenSource() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="open-source"
      ref={sectionRef}
      className="bg-background py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-h2 text-foreground"
        >
          Built by the community. Open to all.
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.1, ease: EASE_OUT }}
          className="text-muted-foreground mt-4 leading-relaxed"
        >
          The platform itself is the first community project. Members contribute
          to the codebase, vote on the roadmap, and ship features. Open metrics.
          Open source. No black boxes.
        </motion.p>

        {/* Counters */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          className="flex justify-center gap-12 mt-12"
        >
          <AnimatedCounter target={0} label="Contributors" />
          <AnimatedCounter target={0} label="Commits" />
          <AnimatedCounter target={0} label="Open issues" />
        </motion.div>

        {/* GitHub link */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: 0.5, delay: 0.35, ease: EASE_OUT }}
          className="mt-8"
        >
          <a
            href="https://github.com/build-pm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-text text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Star us on GitHub &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}
