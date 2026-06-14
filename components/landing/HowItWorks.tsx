"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface Step {
  number: number;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Join the community",
    description:
      "Create your profile. Tell us what you’re into: building, learning, mentoring, or all three.",
  },
  {
    number: 2,
    title: "Find your path",
    description:
      "Grab free enterprise tools, join a build squad, follow along with sprints, or help others learn.",
  },
  {
    number: 3,
    title: "Contribute your way",
    description:
      "Ship a product, review someone's work, teach a session, or simply share what you know.",
  },
  {
    number: 4,
    title: "Grow together",
    description:
      "Earn your builder score. Get referrals from people who've seen your contributions firsthand.",
  },
];

const stepVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: EASE_OUT,
    },
  }),
};

function StepItem({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stepVariants}
      className="flex flex-col items-center text-center relative"
    >
      {/* Coral numbered circle */}
      <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
        <span className="text-foreground font-bold text-lg">{step.number}</span>
      </div>

      {/* Title */}
      <h3 className="text-h4 text-foreground mt-4">{step.title}</h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground mt-2 max-w-xs">{step.description}</p>
    </motion.div>
  );
}

export function HowItWorks() {
  return (
    <section className="bg-muted py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-h2 text-center text-foreground">
          How it works
        </h2>

        {/* Steps with connecting lines */}
        <div className="relative mt-16">
          {/* Desktop: horizontal connecting line */}
          <div
            className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-px bg-muted"
            aria-hidden="true"
          />

          {/* Mobile: vertical connecting line */}
          <div
            className="md:hidden absolute top-6 bottom-6 left-1/2 -translate-x-px w-px bg-muted"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative">
            {STEPS.map((step, i) => (
              <StepItem key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
