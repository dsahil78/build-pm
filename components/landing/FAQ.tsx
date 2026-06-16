"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

interface QA {
  question: string;
  answer: string;
}

// NOTE: Draft answers in brand voice. Confirm the numbers ($200K+, first 100,
// 7-day reply) stay consistent with the rest of the site before launch.
// TODO(post-launch): Revisit this copy — answers are written for the pre-launch
// founding-cohort phase ("early access", "first 100", "spots").
const FAQS: QA[] = [
  {
    question: "Is BuildPM free?",
    answer:
      "Yes, free for builders. That includes $200K+ in enterprise tools we make free for members. We make money from partners, not from you.",
  },
  {
    question: "What's the time commitment?",
    answer:
      "As much as you want to put in. Most builders work in 2-week sprints with a squad. Show up, build, document what you decided. No mandatory standups, no busywork.",
  },
  {
    question: "Do I need to know how to code?",
    answer:
      "No. “Building” here means shipping real product work: prototypes, no-code and AI-assisted builds, specs that ship, or actual code. If you can take something from idea to shipped, you belong. Your squad and the tools cover the rest.",
  },
  {
    question: "How is this different from a PM Slack group?",
    answer:
      "Slack is chatter that scrolls away. BuildPM is institutional memory. Every decision and post-mortem is documented and searchable through the Wisdom Graph, so the community's lessons compound instead of disappearing. It runs under the Chatham House Rule, so you share what you learned without exposing confidential work.",
  },
  {
    // Founder note (provided by Sahil). Anonymous by choice — add a name/signature
    // later for extra credibility if desired.
    question: "Who's behind BuildPM?",
    answer:
      "Builders, not bystanders. BuildPM is built by a PM who got tired of great product work being invisible, so I'm building the home where what you ship is the proof, not your résumé. (More builders joining soon.)",
  },
  {
    question: "What do I get with early access?",
    answer:
      "First access to build squads, the full tool shelf, and your builder profile at buildpm.co/you, before everyone else. Founding members help shape what we build next.",
  },
  {
    question: "How many spots are there?",
    answer:
      "We're hand-picking the first 100 builders for the founding cohort. We read every application and reply within 7 days.",
  },
  {
    question: "When does it start?",
    answer:
      "The founding cohort kicks off Fall 2026. Apply now, hear back within 7 days, and accepted builders get onboarded into that first group of 100.",
  },
];

// FAQPage structured data — eligible for rich results in search.
const faqJsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
});

export function FAQ() {
  const [open, setOpen] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <section data-section="faq" className="bg-background py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: faqJsonLd }}
      />
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center mb-14"
        >
          <p className="text-accent-text eyebrow">
            Questions
          </p>
          <h2 className="text-h2 text-foreground mt-2 tracking-tight">
            Before you apply
          </h2>
        </motion.div>

        <dl>
          {FAQS.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_OUT }}
                className="border-b border-border-base"
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${i}`}
                    className="group flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-foreground font-semibold text-lg group-hover:text-accent-text transition-colors">
                      {faq.question}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={`shrink-0 text-subtle-foreground transition-transform duration-300 group-hover:text-foreground ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </dt>
                <motion.dd
                  id={`faq-answer-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: EASE_OUT }}
                  className="overflow-hidden"
                >
                  <p className="text-muted-foreground pb-5 leading-relaxed measure">
                    {faq.answer}
                  </p>
                </motion.dd>
              </motion.div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
