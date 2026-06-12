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
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("submitting");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "landing_cta" }),
      });
      if (!res.ok) throw new Error("Request failed");
      analytics.trackWaitlistSignup("landing_cta");
      analytics.identify(email);
      setStatus("success");
      setEmail("");
    } catch {
      // Surface a real error so the user can retry — never fake success.
      setStatus("error");
    }
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
          <p className="text-grey-500 text-sm mb-3">
            {IS_PRELAUNCH ? "Not ready to apply? Get notified at launch." : "Get weekly build updates"}
          </p>
          <div aria-live="polite">
            {status === "success" ? (
              <p className="text-brand-coral text-sm font-medium">
                Thanks! You&apos;re subscribed.
              </p>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  required
                  disabled={status === "submitting"}
                  className="bg-[#1F1F1F] border border-[#3A3A3A] text-white rounded-lg px-4 py-3 text-sm flex-1 outline-none focus:border-grey-500 transition-colors placeholder:text-grey-600 disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="bg-[#2A2A2A] border border-[#3A3A3A] text-grey-200 rounded-lg px-6 py-3 text-sm font-medium hover:bg-[#333] hover:text-white transition-all disabled:opacity-60"
                >
                  {status === "submitting" ? "Joining…" : IS_PRELAUNCH ? "Notify me" : "Subscribe"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-error text-sm mt-3">
                Couldn&apos;t sign you up just now — please try again.
              </p>
            )}
          </div>
        </motion.div>

        {/* Partners path — one low-key line for tool companies */}
        {IS_PRELAUNCH && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: EASE_OUT }}
            className="mt-10 text-grey-500 text-sm"
          >
            Run a tool PMs love?{" "}
            <a href="/partners" className="text-brand-coral hover:underline">
              Partner with us &rarr;
            </a>
          </motion.p>
        )}
      </div>
    </section>
  );
}
