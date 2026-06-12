"use client";

import { useState, useRef, type FormEvent } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ARCHETYPES, REFERRAL_SOURCES, IS_PRELAUNCH } from "@/lib/constants";
import { analytics } from "@/lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ApplyPage() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const formStartedRef = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = {
      full_name: (form.elements.namedItem("full_name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      linkedin_url: (form.elements.namedItem("linkedin_url") as HTMLInputElement).value,
      archetype: (form.elements.namedItem("archetype") as HTMLSelectElement).value,
      shipped_recently: (form.elements.namedItem("shipped_recently") as HTMLTextAreaElement).value,
      why_build_pm: (form.elements.namedItem("why_build_pm") as HTMLTextAreaElement).value,
      referral_source: (form.elements.namedItem("referral_source") as HTMLSelectElement).value,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({ error: "Something went wrong" }));
        throw new Error(body.error ?? "Something went wrong");
      }

      setStatus("success");
      analytics.trackApplicationSubmitted(data.archetype, data.referral_source);
      analytics.identify(data.email);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setStatus("error");
      setErrorMessage(msg);
      analytics.trackFormError("apply", msg);
    }
  }

  if (status === "success") {
    return (
      <div className="min-h-svh flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <div className="text-4xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-white">Application received</h1>
          <p className="text-grey-400 mt-3 leading-relaxed">
            We review applications weekly. You&apos;ll hear from us within 7 days.
            In the meantime, join the newsletter for weekly build updates.
          </p>
          <div className="mt-6">
            <Link
              href="/"
              className="text-brand-coral text-sm hover:underline"
            >
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-svh flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-[640px]">
        {/* Logo */}
        <div className="mb-10">
          <Link href="/">
            <Logo variant="dark" size="md" />
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-white">
          {IS_PRELAUNCH ? "Apply to the founding cohort" : "Apply to BuildPM"}
        </h1>
        <p className="text-grey-400 mt-2 leading-relaxed">
          {IS_PRELAUNCH
            ? "We\u2019re hand-picking the first 100 builders. Takes 2 minutes. If it\u2019s a fit, you get free enterprise tools, a build squad, and early access at launch \u2014 we reply within 7 days."
            : "We review every application. We\u2019re looking for people who build, not just talk."}
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          onFocus={() => {
            if (!formStartedRef.current) {
              formStartedRef.current = true;
              analytics.trackFormStarted("apply");
            }
          }}
          className="mt-10 space-y-6"
        >
          <Input
            name="full_name"
            label="Full name"
            placeholder="Jane Smith"
            required
          />

          <Input
            name="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <Input
            name="linkedin_url"
            label="LinkedIn URL (optional)"
            type="url"
            placeholder="https://linkedin.com/in/you"
            hint="Optional — so we can see what you've shipped"
          />

          <Select
            name="archetype"
            label="What's your PM archetype?"
            options={ARCHETYPES}
            placeholder="Select your archetype"
            defaultValue=""
            required
          />

          <Textarea
            name="shipped_recently"
            label="What have you shipped recently?"
            placeholder="Link to a live product, feature, or project you built. GitHub repos count."
            hint="Link to a live product, feature, or project you built. GitHub repos count."
            required
          />

          <Textarea
            name="why_build_pm"
            label="Why BuildPM?"
            placeholder="What do you want to build or learn? 2-3 sentences is perfect."
            required
          />

          <Select
            name="referral_source"
            label="How did you hear about us?"
            options={REFERRAL_SOURCES}
            placeholder="Select one"
            defaultValue=""
            required
          />

          {status === "error" && (
            <p className="text-error text-sm">{errorMessage}</p>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "Submitting..." : "Submit application"}
          </Button>
        </form>
      </div>
    </div>
  );
}
