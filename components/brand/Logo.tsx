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

export function Logo({ className, variant = "dark", size = "md" }: LogoProps) {
  const s = sizes[size];
  const coral = "#FF5733";
  const primary = variant === "dark" ? coral : "#1A1A1A";
  const secondary = variant === "dark" ? "#FFFFFF" : coral;
  const ghost = variant === "dark" ? "rgba(255,255,255,0.15)" : "rgba(255,87,51,0.15)";
  const wordmark = variant === "dark" ? "#FFFFFF" : "#1A1A1A";

  return (
    <div className={cn("flex items-center", s.gap, className)}>
      {/* Block monogram — L-shape abstract "b" */}
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        {/* Left column: 3 stacked blocks */}
        <rect x="2" y="2" width="12" height="7" rx="2" fill={primary} />
        <rect x="2" y="12.5" width="12" height="7" rx="2" fill={primary} />
        <rect x="2" y="23" width="12" height="7" rx="2" fill={primary} />
        {/* Right column: ghost top-right, 2 offset blocks */}
        <rect x="18" y="2" width="12" height="7" rx="2" fill={ghost} />
        <rect x="18" y="12.5" width="12" height="7" rx="2" fill={secondary} />
        <rect x="18" y="23" width="12" height="7" rx="2" fill={secondary} />
      </svg>

      {/* Wordmark */}
      <span className={cn("font-semibold tracking-tight", s.text)} style={{ color: wordmark }}>
        build<span style={{ color: coral }}>.pm</span>
      </span>
    </div>
  );
}
