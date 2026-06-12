import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variantStyles = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover active:translate-y-px",
  secondary:
    "border border-accent text-accent-text hover:bg-accent hover:text-accent-foreground active:translate-y-px",
  ghost: "text-muted-foreground hover:text-foreground hover:bg-muted",
};

/* Fixed heights: 40 / 44 / 48 — share these with inputs and inline CTAs. */
const sizeStyles = {
  sm: "h-10 px-4 text-body-sm rounded-lg gap-2",
  md: "h-11 px-5 text-body-sm rounded-lg gap-2",
  lg: "h-12 px-7 text-body rounded-xl gap-2",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium whitespace-nowrap select-none",
        "transition-[background-color,border-color,color,transform] disabled:opacity-50 disabled:pointer-events-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      style={{
        transitionDuration: "var(--duration-fast)",
        transitionTimingFunction: "var(--ease-out)",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
