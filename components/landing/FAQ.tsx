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
    question: "Is it free?",
    answer:
      "Yes — free for builders. That includes the $200K+ in enterprise tools committed by our launch partners. We make money from partners, not from you.",
  },
  {
    question: "What's the time commitment?",
    answer:
      "As much as you want to put in. Most builders work in 2-week sprints with a squad — show up, build, document what you decided. No mandatory standups, no busywork.",
  },
  {
    // TODO(founder): swap in your real, NAMED 2–3 sentence note before launch
    // (see LAUNCH_CHECKLIST.md item 6). This holding copy is launch-safe but
    // anonymous — a named note is far more credible.
    question: "Who's behind BuildPM?",
    answer:
      "Builders, not bystanders. BuildPM is built by product people who got tired of great PM work being invisible — so we're building the home where what you ship is the proof, not your résumé.",
  },
  {
    question: "What do I get with early access?",
    answer:
      "First access to build squads, the full tool shelf, and your builder profile at buildpm.co/you — before everyone else. Founding members help shape what we build next.",
  },
  {
    question: "How many spots are there?",
    answer:
      "We're hand-picking the first 100 builders for the founding cohort. We read every application and reply within 7 days.",
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
    <section className="bg-background py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
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
          <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">
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
