import { cn } from "@/lib/utils";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

const variantStyles = {
  primary:
    "bg-accent text-accent-foreground hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]",
  secondary:
    "bg-transparent border-2 border-accent text-accent-text hover:bg-accent hover:text-accent-foreground",
  ghost: "bg-transparent text-muted-foreground hover:text-foreground hover:bg-muted",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-2.5 text-sm font-medium rounded-lg",
  lg: "px-8 py-4 text-base font-medium rounded-xl",
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
        "inline-flex items-center justify-center transition-all",
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
