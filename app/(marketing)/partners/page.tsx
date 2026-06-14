"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { track } from "@vercel/analytics";
import { motion, useInView } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Honeypot } from "@/components/shared/Honeypot";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { IS_PRELAUNCH } from "@/lib/constants";
import { TOOL_LOGOS } from "@/lib/tool-logos";
import { LiveStats } from "@/components/shared/LiveStats";
import { PARTNER_STATS, PARTNER_USE_CASES } from "@/lib/mock-data";
import { EASE_OUT } from "@/lib/motion";
import { analytics } from "@/lib/analytics";
import { Footer } from "@/components/landing/Footer";

/* ── Tier options ── */
const TIER_OPTIONS = IS_PRELAUNCH
  ? [
      { value: "tools", label: "We want to offer our tools" },
      { value: "feedback", label: "We want product feedback" },
      { value: "hiring", label: "We want to hire builders" },
      { value: "all", label: "All of the above" },
      { value: "other", label: "Something else" },
    ]
  : [
      { value: "ecosystem", label: "Ecosystem (Free)" },
      { value: "build", label: "Build ($2\u20135K/mo)" },
      { value: "founding", label: "Founding ($8\u201315K/mo)" },
      { value: "unsure", label: "Not sure yet" },
    ];

/* ── Value props grouped by outcomes ── */
const VALUE_GROUPS = [
  {
    label: "Distribution",
    items: [
      {
        title: "Your tool used by builders weekly",
        description: "Not a listing — real usage in real build sprints. Builders choose your tools because they're the best for the job.",
      },
      {
        title: "Embedded in real workflows",
        description: "Your product becomes part of the building process, not an afterthought.",
      },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: "Feedback",
    items: [
      {
        title: "Structured reports from real usage",
        description: "Not surveys, not NPS — detailed friction analysis from product-minded builders using your tool in production.",
      },
      {
        title: "48-hour feedback loops",
        description: "Launch a feature and get structured feedback within 48 hours. No recruiting, no scheduling.",
      },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
    ),
  },
  {
    label: "Talent",
    items: [
      {
        title: "Access to high-signal builders",
        description: "Every builder has a public portfolio of shipped work. Their build history is the ultimate screening signal.",
      },
      {
        title: "Hiring pipeline that sells itself",
        description: "Builders already know your tools. They've shipped with them. That's the best interview prep there is.",
      },
    ],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="7" r="4" /><path d="M2 21v-2a4 4 0 014-4h6a4 4 0 014 4v2" /><path d="M19 8v6M16 11h6" />
      </svg>
    ),
  },
];

/* ── How it works steps ── */
const HOW_STEPS = [
  {
    num: "01",
    title: "Integrate your tool",
    description: "We onboard your product to the ecosystem. Builders get free access.",
  },
  {
    num: "02",
    title: "Builders use it in sprints",
    description: "Real products. Real decisions. Real usage data from people who ship.",
  },
  {
    num: "03",
    title: "You get adoption + feedback",
    description: "Monthly reports with friction analysis, feature requests, and organic adoption metrics.",
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function PartnersPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const formStartedRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = {
      full_name: (form.elements.namedItem("contact_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("contact_email") as HTMLInputElement).value,
      company: (form.elements.namedItem("company") as HTMLInputElement).value,
      role: (form.elements.namedItem("role") as HTMLInputElement).value,
      tier: (form.elements.namedItem("tier") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      company_url: (form.elements.namedItem("company_url") as HTMLInputElement)?.value ?? "",
      type: "partner",
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      track("partner_submitted", { tier: data.tier });
      analytics.trackPartnerApplicationSubmitted(data.tier, data.company);
      analytics.identify(data.email);
    } catch {
      setStatus("error");
      analytics.trackFormError("partner", "submission_failed");
    }
  }

  return (
    <div className="bg-background min-h-svh">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <Link href="/">
          <Logo size="md" />
        </Link>
        <ThemeToggle />
      </nav>

      <main id="main-content">

      {/* ═══════════════════════════════════════
          HERO
         ═══════════════════════════════════════ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-center">
        {IS_PRELAUNCH && (
          <Badge variant="coral" className="text-xs tracking-wide px-3 py-1 mb-6">
            Limited founding partner slots
          </Badge>
        )}

        <h1 className="text-h1 text-foreground tracking-tight leading-[1.1]">
          {IS_PRELAUNCH ? (
            <>
              Get distribution{" "}
              <span className="text-accent-text">before everyone else</span>.
            </>
          ) : (
            <>
              Partner with{" "}
              <span className="text-accent-text">BuildPM</span>
            </>
          )}
        </h1>

        <p className="text-muted-foreground text-lg mt-6 max-w-2xl mx-auto leading-relaxed">
          Your tools in the hands of product builders who ship weekly.
          Get adoption, structured feedback, and a talent pipeline — not vanity metrics.
        </p>

        <div className="mt-8">
          <a
            href="#apply"
            className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-xl transition-all hover:bg-accent-hover active:translate-y-px"
            style={{ transitionDuration: "var(--duration-fast)" }}
            onClick={() => analytics.trackCtaClicked("partner_hero", "Apply as founding partner", "#apply")}
          >
            {IS_PRELAUNCH ? "Apply as founding partner" : "Become a partner"}
          </a>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROOF LAYER — stats bar (post-launch only)
         ═══════════════════════════════════════ */}
      {!IS_PRELAUNCH && (
        <section className="py-12 border-y border-border-base">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {PARTNER_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-h2 text-foreground">{stat.value}</p>
                  <p className="text-xs text-subtle-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <LiveStats />
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          VALUE PROPS — outcomes, not features
         ═══════════════════════════════════════ */}
      <section className="py-20 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="What you get"
            title="Outcomes, not features."
            subtitle="Every partner gets distribution, feedback, and talent access."
          />

          <div className="space-y-12 mt-14">
            {VALUE_GROUPS.map((group, gi) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: gi * 0.1, ease: EASE_OUT }}
              >
                {/* Group header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-accent/[0.08] flex items-center justify-center text-accent-text">
                    {group.icon}
                  </div>
                  <h3 className="text-h4 text-foreground">{group.label}</h3>
                </div>

                {/* Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-[52px]">
                  {group.items.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl bg-card border border-border-base p-5 transition-all duration-300 hover:-translate-y-0.5"
                      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                    >
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <p className="text-[13px] text-muted-foreground mt-2 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          HOW IT WORKS — 3 steps
         ═══════════════════════════════════════ */}
      <section className="bg-muted py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            eyebrow="How it works"
            title="Three steps. Real results."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {HOW_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: EASE_OUT }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-accent/[0.08] flex items-center justify-center mx-auto">
                  <span className="text-accent-text font-mono text-sm font-bold">{step.num}</span>
                </div>
                <h3 className="text-base font-semibold text-foreground mt-4">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          USE CASES — proof metrics
         ═══════════════════════════════════════ */}
      {!IS_PRELAUNCH && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PARTNER_USE_CASES.map((uc, i) => (
                <motion.div
                  key={uc.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE_OUT }}
                  className="rounded-2xl bg-card border border-border-base p-6 text-center"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
                >
                  <p className="text-h2 text-accent-text">{uc.metric}</p>
                  <p className="text-sm text-muted-foreground mt-2">{uc.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          TOOL LOGOS
         ═══════════════════════════════════════ */}
      <section className="py-12 border-y border-border-base">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-subtle-foreground text-sm mb-8">
            Tools we&apos;re actively building with
          </p>
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-6">
            {TOOL_LOGOS.slice(0, 12).map((logo) => (
              <div key={logo.name} className="opacity-20 hover:opacity-80 transition-opacity duration-300" title={logo.name}>
                <svg viewBox={logo.viewBox} width="30" height="30" fill="currentColor" className="text-foreground" role="img" aria-label={logo.name}>
                  <title>{logo.name}</title>
                  <path d={logo.path} />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          APPLICATION FORM
         ═══════════════════════════════════════ */}
      <section id="apply" className="py-20 md:py-24">
        <div className="max-w-lg mx-auto px-4 sm:px-6">
          <h2 className="text-h3 text-foreground text-center">
            {IS_PRELAUNCH ? "Apply as founding partner" : "Become a partner"}
          </h2>
          <p className="text-muted-foreground text-center mt-3 text-sm leading-relaxed">
            {IS_PRELAUNCH
              ? "We\u2019re selecting a small group of founding partners. Tell us about your tools and we\u2019ll be in touch within 48 hours."
              : "Tell us about your tools and goals."}
          </p>

          {status === "success" ? (
            <div className="mt-12 text-center" aria-live="polite">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-success text-2xl">&#10003;</span>
              </div>
              <p className="text-h4 text-foreground">Application received</p>
              <p className="text-muted-foreground mt-3 leading-relaxed">
                We&apos;re reviewing partner applications personally.
                Expect to hear from us within 48 hours.
              </p>
              <Link href="/" className="text-accent-text text-sm mt-6 inline-block hover:underline">
                &larr; Back to home
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              onFocus={() => {
                if (!formStartedRef.current) {
                  formStartedRef.current = true;
                  analytics.trackFormStarted("partner");
                }
              }}
              className="mt-10 space-y-5"
            >
              <Honeypot />
              <Input name="company" label="Company name" placeholder="Acme Inc." autoComplete="organization" autoCapitalize="words" required />
              <Input name="contact_name" label="Your name" placeholder="Jane Smith" autoComplete="name" autoCapitalize="words" required />
              <Input name="contact_email" label="Work email" type="email" placeholder="jane@acme.com" autoComplete="email" required />
              <Input name="role" label="Your role" placeholder="Head of Developer Relations" autoComplete="organization-title" autoCapitalize="words" required />
              <Select
                name="tier"
                label={IS_PRELAUNCH ? "What interests you most?" : "Which tier interests you?"}
                options={TIER_OPTIONS}
                placeholder="Select one"
                defaultValue=""
                required
              />
              <Textarea
                name="message"
                label="Tell us about your tools"
                placeholder="What does your product do? Why would it be valuable to product builders?"
              />

              <div aria-live="polite">
                {status === "error" && (
                  <p className="text-error text-sm">Something went wrong. Please try again or email partners@buildpm.co directly.</p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending..." : IS_PRELAUNCH ? "Submit founding partner application" : "Send partnership inquiry"}
              </Button>

              <p className="text-subtle-foreground text-xs text-center">
                Or reach us directly at{" "}
                <a href="mailto:partners@buildpm.co" className="text-muted-foreground hover:text-foreground transition-colors">
                  partners@buildpm.co
                </a>
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          URGENCY FOOTER
         ═══════════════════════════════════════ */}
      {IS_PRELAUNCH && (
        <section className="py-12 border-t border-border-base text-center">
          <p className="text-subtle-foreground text-sm">
            We&apos;re selecting a small group of founding partners.{" "}
            <span className="text-muted-foreground">Spots are limited.</span>
          </p>
        </section>
      )}

      </main>

      <Footer />
    </div>
  );
}

/* ── Shared section heading ── */
function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="text-center max-w-2xl mx-auto"
    >
      <p className="text-accent-text text-sm font-semibold tracking-wider uppercase">
        {eyebrow}
      </p>
      <h2 className="text-h2 tracking-tight text-foreground mt-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground mt-3 text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
