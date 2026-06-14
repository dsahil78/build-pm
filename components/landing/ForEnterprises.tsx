"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface EnterpriseCard {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const ENTERPRISE_CARDS: EnterpriseCard[] = [
  {
    title: "Structured feedback",
    description:
      "Monthly reports: NPS trends, friction points, feature requests, from real builders, not surveys.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="9" y="1" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="14" width="2" height="4" rx="0.5" fill="currentColor" />
        <rect x="11" y="11" width="2" height="7" rx="0.5" fill="currentColor" />
        <rect x="14" y="9" width="2" height="9" rx="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Beta testing cohort",
    description:
      "500+ PMs who'll test your new features within 48 hours and give thoughtful feedback.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M9 3V9L4 20C3.6 21 4.2 22 5.3 22H18.7C19.8 22 20.4 21 20 20L15 9V3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <line x1="7" y1="3" x2="17" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 15H17" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
        <circle cx="11" cy="18" r="1" fill="currentColor" opacity="0.6" />
        <circle cx="14" cy="17" r="0.7" fill="currentColor" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Authentic case studies",
    description:
      "Real build logs featuring your tools. More credible than any marketing-authored content.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="8" y1="15" x2="16" y2="15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <line x1="8" y1="18" x2="13" y2="18" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Talent pipeline",
    description:
      "Hire builders already trained on your stack. Shipping history is the ultimate screening signal.",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 16C4 13.5 5.8 11.5 8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="16" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M20 16C20 13.5 18.2 11.5 16 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="10" y1="10" x2="14" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 2" />
        <path d="M13 8.5L14.5 10L13 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
      delay: i * 0.06,
      duration: 0.45,
      ease: EASE_OUT,
    },
  }),
};

function EnterpriseCardItem({
  card,
  index,
}: {
  card: EnterpriseCard;
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
      <div className="bg-card border border-border-base border-l-3 border-l-white rounded-xl p-6 h-full">
        {/* Icon */}
        <div className="text-accent-text">{card.icon}</div>

        {/* Title */}
        <h3 className="text-h4 text-foreground mt-3">{card.title}</h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

export function ForEnterprises() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="enterprises"
      ref={sectionRef}
      className="bg-muted py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center"
        >
          <h2 className="text-h2 text-foreground">
            Your next 500 power users are already here.
          </h2>
          <p className="text-muted-foreground mt-3">
            They&apos;re building with your tools daily. Make it official.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {ENTERPRISE_CARDS.map((card, i) => (
            <EnterpriseCardItem key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
          >
            <a
              href="/partners"
              className="inline-block bg-accent text-accent-foreground rounded-xl px-8 py-4 text-base font-medium hover:bg-accent-hover active:translate-y-px transition-all"
            >
              Become a founding partner
            </a>
            <p className="text-subtle-foreground text-sm mt-3">
              Or email partners@buildpm.co
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
