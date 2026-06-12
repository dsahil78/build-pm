"use client";

// ⚠️ PLACEHOLDER TESTIMONIALS — DO NOT ENABLE IN PRODUCTION.
// These are fabricated and must NOT be shown until replaced with real, verified,
// consenting members' testimonials. Same trust risk as fabricated metrics.
// Identities must stay consistent with SocialProof.tsx.

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface Testimonial {
  name: string;
  title: string;
  initials: string;
  avatarBg: string;
  quote: string;
}

// TODO(pre-launch): These testimonials are placeholders. Verify each is a real,
// consenting member before launch. Identities must match SocialProof.tsx.
const TESTIMONIALS: Testimonial[] = [
  {
    initials: "RP",
    avatarBg: "#378ADD",
    name: "Riya P.",
    title: "PM at a Series B startup",
    quote:
      "I joined to learn, ended up shipping an internal tool with my squad. My manager noticed and gave me the AI initiative. Didn\u2019t expect that from a community.",
  },
  {
    initials: "DM",
    avatarBg: "#FF5733",
    name: "Dan M.",
    title: "Senior PM, fintech",
    quote:
      "Free Cursor and Claude alone saved me hundreds. But honestly, the build sprints are what keep me coming back. Shipping with a team hits different.",
  },
  {
    initials: "KT",
    avatarBg: "#7F77DD",
    name: "Kim T.",
    title: "Founder, prev. Google PM",
    quote:
      "Most PM communities are just people sharing hot takes. This one is quiet until Friday demos. Then you see what everyone actually built. That\u2019s rare.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),
};

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
    >
      <div className="bg-card border border-border-base rounded-xl p-6 h-full flex flex-col">
        {/* Quote mark */}
        <span className="text-4xl text-accent-text opacity-30 font-serif leading-none">
          &ldquo;
        </span>

        {/* Quote text */}
        <p className="text-foreground text-sm italic leading-relaxed mt-2 flex-1">
          {testimonial.quote}
        </p>

        {/* Divider — always pinned above author */}
        <div className="h-px bg-muted mt-6 mb-4" />

        {/* Author */}
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-foreground text-xs font-medium flex-shrink-0"
            style={{ backgroundColor: testimonial.avatarBg }}
          >
            {testimonial.initials}
          </div>
          <div>
            <p className="text-foreground text-sm font-medium">
              {testimonial.name}
            </p>
            <p className="text-muted-foreground text-xs">{testimonial.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="bg-muted py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground">From the builders</h2>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {TESTIMONIALS.map((testimonial, i) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
