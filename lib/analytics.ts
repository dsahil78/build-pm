import posthog from "posthog-js";

/** Typed analytics event helpers. Centralized to prevent typos and keep the event catalog auditable. */
export const analytics = {
  /** Waitlist email signup from the landing page. */
  trackWaitlistSignup(source: string) {
    posthog.capture("waitlist_signup", { source });
  },

  /** Builder application submitted successfully. */
  trackApplicationSubmitted(archetype: string, referralSource: string) {
    posthog.capture("application_submitted", {
      archetype,
      referral_source: referralSource,
    });
  },

  /** Partner application submitted successfully. */
  trackPartnerApplicationSubmitted(tier: string, company: string) {
    posthog.capture("partner_application_submitted", { tier, company });
  },

  /** Any CTA button clicked. */
  trackCtaClicked(location: string, label: string, href: string) {
    posthog.capture("cta_clicked", { location, label, href });
  },

  /** Partner link clicked on ToolShelf. */
  trackPartnerLinkClicked() {
    posthog.capture("partner_link_clicked");
  },

  /** Social icon clicked in footer. */
  trackSocialLinkClicked(platform: string) {
    posthog.capture("social_link_clicked", { platform });
  },

  /** First interaction with a form (field focus). */
  trackFormStarted(form: string) {
    posthog.capture("form_started", { form });
  },

  /** Form submission failed. */
  trackFormError(form: string, error: string) {
    posthog.capture("form_error", { form, error });
  },

  /** Scroll depth milestone reached. */
  trackScrollDepth(depth: number) {
    posthog.capture("scroll_depth", { depth });
  },

  /** Link anonymous session to a known user on signup/apply. */
  identify(email: string) {
    posthog.identify(email);
  },
};
