/* ── Pre-launch feature flag ── */
export const IS_PRELAUNCH =
  process.env.NEXT_PUBLIC_PRELAUNCH === "true";

export const PRELAUNCH_NAV_LINKS: readonly { label: string; href: string }[] =
  [];

export const PRELAUNCH_FOOTER_COLUMNS = [
  {
    title: "build.pm",
    links: [
      { label: "Apply for early access", href: "/apply" },
      { label: "Contact", href: "mailto:hello@build.pm" },
    ],
  },
] as const;

export const SITE_CONFIG = {
  name: "build.pm",
  url: "https://build.pm",
  description:
    "A community for PMs who build and ship. Free enterprise tools, build squads, career growth. Not another Slack group.",
  tagline: "For product people who ship.",
  email: {
    partners: "partners@build.pm",
    support: "hello@build.pm",
  },
} as const;

export const NAV_LINKS = [
  { label: "For builders", href: "#builders" },
  { label: "For enterprises", href: "#enterprises" },
] as const;

export const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Sprints", href: "/sprints" },
      { label: "Tool shelf", href: "/tools" },
      { label: "Jobs", href: "/jobs" },
      { label: "Learning", href: "/learn" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Feed", href: "/feed" },
      { label: "Chapters", href: "/chapters" },
      { label: "Governance", href: "/governance" },
      { label: "Open source", href: "#open-source" },
    ],
  },
  {
    title: "Enterprise",
    links: [
      { label: "Partner with us", href: "/partners" },
      { label: "Feedback program", href: "/partners#feedback" },
      { label: "Case studies", href: "/partners#case-studies" },
      { label: "Talent pipeline", href: "/partners#talent" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
] as const;

export const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/buildpm" },
  { label: "LinkedIn", href: "https://linkedin.com/company/buildpm" },
  { label: "Twitter", href: "https://x.com/buildpm" },
] as const;

export const ARCHETYPES = [
  { value: "aspiring", label: "Aspiring PM" },
  { value: "builder", label: "Builder PM" },
  { value: "founder", label: "Founder PM" },
  { value: "leader", label: "Leader PM" },
] as const;

export const REFERRAL_SOURCES = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter / X" },
  { value: "friend", label: "Friend referral" },
  { value: "other", label: "Other" },
] as const;

export const TOOL_COMPANIES = [
  "Anthropic",
  "Cursor",
  "AWS",
  "Vercel",
  "Supabase",
  "Figma",
  "Datadog",
  "Notion",
  "Linear",
  "PostHog",
  "Stripe",
  "GitHub",
  "MongoDB",
  "Pinecone",
  "LangChain",
  "Cloudflare",
  "Railway",
  "Resend",
  "Sentry",
  "Amplitude",
] as const;
