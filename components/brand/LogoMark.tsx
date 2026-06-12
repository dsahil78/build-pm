interface LogoMarkProps {
  size?: number;
  className?: string;
}

export function LogoMark({ size = 32, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`text-foreground ${className}`}
      aria-hidden="true"
    >
      {/* Left column: coral. Right column: currentColor (theme-aware). */}
      <rect x="5" y="5" width="9" height="5" rx="1.5" fill="var(--accent)" />
      <rect x="18" y="5" width="9" height="5" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="5" y="13.5" width="9" height="5" rx="1.5" fill="var(--accent)" />
      <rect x="18" y="13.5" width="9" height="5" rx="1.5" fill="currentColor" opacity="0.55" />
      <rect x="5" y="22" width="9" height="5" rx="1.5" fill="var(--accent)" />
      <rect x="18" y="22" width="9" height="5" rx="1.5" fill="currentColor" opacity="0.55" />
    </svg>
  );
}
