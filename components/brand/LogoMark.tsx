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
      className={className}
      aria-label="BuildPM"
    >
      <rect width="32" height="32" rx="8" fill="#1A1A1A" />
      {/* 6 blocks */}
      <rect x="5" y="5" width="9" height="5" rx="1.5" fill="#FF5733" />
      <rect x="18" y="5" width="9" height="5" rx="1.5" fill="#FFFFFF" opacity="0.6" />
      <rect x="5" y="13.5" width="9" height="5" rx="1.5" fill="#FF5733" />
      <rect x="18" y="13.5" width="9" height="5" rx="1.5" fill="#FFFFFF" opacity="0.6" />
      <rect x="5" y="22" width="9" height="5" rx="1.5" fill="#FF5733" />
      <rect x="18" y="22" width="9" height="5" rx="1.5" fill="#FFFFFF" opacity="0.6" />
    </svg>
  );
}
