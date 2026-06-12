import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { icon: 24, text: "text-sm", gap: "gap-2" },
  md: { icon: 32, text: "text-lg", gap: "gap-2.5" },
  lg: { icon: 40, text: "text-xl", gap: "gap-3" },
};

export function Logo({ className, size = "md" }: LogoProps) {
  const s = sizes[size];

  // Theme-aware: coral accent stays fixed; the foreground-dependent parts use
  // currentColor (= --foreground) so the mark adapts to light/dark automatically.
  return (
    <div
      className={cn("flex items-center text-foreground", s.gap, className)}
    >
      {/* Block monogram — L-shape abstract "b" */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        {/* Left column: 3 stacked coral blocks */}
        <rect x="2" y="2" width="12" height="7" rx="2" fill="var(--accent)" />
        <rect x="2" y="12.5" width="12" height="7" rx="2" fill="var(--accent)" />
        <rect x="2" y="23" width="12" height="7" rx="2" fill="var(--accent)" />
        {/* Right column: ghost top-right, 2 foreground blocks */}
        <rect x="18" y="2" width="12" height="7" rx="2" fill="currentColor" opacity="0.15" />
        <rect x="18" y="12.5" width="12" height="7" rx="2" fill="currentColor" />
        <rect x="18" y="23" width="12" height="7" rx="2" fill="currentColor" />
      </svg>

      {/* Wordmark */}
      <span className={cn("font-semibold tracking-tight", s.text)}>
        Build<span style={{ color: "var(--accent)" }}>PM</span>
      </span>
    </div>
  );
}
