"use client";

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

        <dl className="space-y-8">
          {FAQS.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: EASE_OUT }}
              className="border-b border-border-base pb-8"
            >
              <dt className="text-foreground font-semibold text-lg">{faq.question}</dt>
              <dd className="text-muted-foreground mt-2 leading-relaxed">{faq.answer}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
