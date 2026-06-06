import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        "bg-brand-grey border border-[#333] rounded-xl p-6",
        hover &&
          "transition-all hover:border-brand-coral hover:-translate-y-0.5",
        className
      )}
      style={
        hover
          ? {
              transitionDuration: "var(--duration-normal)",
              transitionTimingFunction: "var(--ease-out)",
            }
          : undefined
      }
    >
      {children}
    </div>
  );
}
