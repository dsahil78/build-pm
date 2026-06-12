import { cn } from "@/lib/utils";

interface LogoTextProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeStyles = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-2xl",
};

export function LogoText({ size = "md", className }: LogoTextProps) {
  return (
    <span
      className={cn(
        "font-semibold tracking-tight",
        sizeStyles[size],
        className
      )}
    >
      <span className="text-foreground">Build</span>
      <span className="text-accent-text">PM</span>
    </span>
  );
}
