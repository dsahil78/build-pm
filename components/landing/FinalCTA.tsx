"use client";

import { useRef, useState, type FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { IS_PRELAUNCH } from "@/lib/constants";
import { EASE_OUT } from "@/lib/motion";
import { analytics } from "@/lib/analytics";

export function FinalCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_cta" }),
      });
      if (res.ok) {
        analytics.trackWaitlistSignup("landing_cta");
        analytics.identify(email);
      }
    } catch {
      // Silently fail — form still shows success for UX
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <section
      id="apply"
      ref={sectionRef}
      className="bg-brand-dark py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Display heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
        >
          <p className="text-grey-300 text-4xl md:text-5xl font-bold tracking-tight" style={{ letterSpacing: "-0.02em" }}>
            Stop talking about building.
          </p>
          <p className="text-brand-coral text-4xl md:text-5xl font-bold tracking-tight mt-2" style={{ letterSpacing: "-0.02em" }}>
            Start building.
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, delay: 0.15, ease: EASE_OUT }}
          className="flex flex-wrap gap-4 justify-center mt-10"
        >
          <a
            href="/apply"
            className="bg-brand-coral text-white rounded-xl px-8 py-4 font-medium hover:brightness-110 hover:scale-[1.02] transition-all"
            onClick={() => analytics.trackCtaClicked("final_cta", IS_PRELAUNCH ? "Apply for early access" : "Start building", "/apply")}
          >
            {IS_PRELAUNCH ? "Apply for early access" : "Start building"}
          </a>
          {!IS_PRELAUNCH && (
            <a
              href="/partners"
              className="bg-transparent border-2 border-brand-coral text-brand-coral rounded-xl px-8 py-4 font-medium hover:bg-brand-coral hover:text-white transition-all"
            >
              Partner with us
            </a>
          )}
        </motion.div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
          className="mt-12"
        >
          <p className="text-grey-400 text-sm mb-3">
            {IS_PRELAUNCH ? "Get notified when we launch" : "Get weekly build updates"}
          </p>
          <div aria-live="polite">
            {submitted && (
              <p className="text-brand-coral text-sm font-medium">
                Thanks! You&apos;re subscribed.
              </p>
            )}
          </div>
          {!submitted && (
            <form
              onSubmit={handleSubscribe}
              action="/api/waitlist"
              method="POST"
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="bg-[#333] border border-[#444] text-white rounded-lg px-4 py-3 text-sm flex-1 outline-none focus:border-brand-coral transition-colors placeholder:text-grey-500"
              />
              <button
                type="submit"
                className="bg-brand-coral text-white rounded-lg px-6 py-3 text-sm font-medium hover:brightness-110 transition-all"
              >
                {IS_PRELAUNCH ? "Join waitlist" : "Subscribe"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
