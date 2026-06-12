import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "coral" | "success";
  className?: string;
}

const variantStyles = {
  default: "bg-muted text-muted-foreground",
  coral: "bg-accent/20 text-accent-text",
  success: "bg-success/20 text-success",
};

export function Badge({ children, variant = "default", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
