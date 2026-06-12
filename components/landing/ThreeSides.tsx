"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface MarketplaceSide {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const SIDES: MarketplaceSide[] = [
  {
    title: "Builders",
    description:
      "Free enterprise tools. Build squads. Ship publicly. Get hired for what you've built, not what's on your resume.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="8"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M12 16V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8 7L12 3L16 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Enterprises",
    description:
      "Structured product feedback. Beta testing cohorts. Authentic case studies. A talent pipeline trained on your stack.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="3"
          y="14"
          width="4"
          height="8"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="10"
          y="8"
          width="4"
          height="14"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="17"
          y="2"
          width="4"
          height="20"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    title: "Platform",
    description:
      "Orchestrates the exchange. Curates quality. Open source. Community-owned. The builders run the show.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="3" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="4" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="19" r="2" stroke="currentColor" strokeWidth="1.5" />
        <line
          x1="12"
          y1="9"
          x2="12"
          y2="5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="9.5"
          y1="14"
          x2="5.5"
          y2="17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="14.5"
          y1="14"
          x2="18.5"
          y2="17.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: EASE_OUT,
    },
  }),
};

function SideCard({ side, index }: { side: MarketplaceSide; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      custom={index}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={cardVariants}
      className="group"
    >
      <div
        className="rounded-3xl bg-card border border-border-base p-8 sm:p-10 h-full
                    transition-all duration-500 ease-out
                    hover:from-[#282828] hover:to-[#222]
                    hover:-translate-y-1"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 0 rgba(255,87,51,0)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 0 1px 0 rgba(255,255,255,0.06), 0 20px 40px -12px rgba(0,0,0,0.4)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow =
            "inset 0 1px 0 rgba(255,255,255,0.04), 0 0 0 0 rgba(255,87,51,0)";
        }}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-accent/[0.08] flex items-center justify-center text-accent-text transition-colors duration-300 group-hover:bg-accent/[0.12]">
          {side.icon}
        </div>

        {/* Title */}
        <h3 className="text-h4 text-foreground mt-6 tracking-tight">
          {side.title}
        </h3>

        {/* Description */}
        <p className="text-[15px] text-muted-foreground mt-3 leading-relaxed">
          {side.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ThreeSides() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section
      id="builders"
      className="bg-background py-24 md:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto" ref={headingRef}>
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="text-display tracking-tight text-foreground">
            Three sides.
            <br />
            <span className="text-subtle-foreground">One ecosystem.</span>
          </h2>
          <p className="text-muted-foreground mt-5 text-lg">
            Builders get tools. Enterprises get feedback. Everyone wins.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-16">
          {SIDES.map((side, i) => (
            <SideCard key={side.title} side={side} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
