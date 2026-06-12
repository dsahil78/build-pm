"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  label: string;
}

export function AnimatedCounter({
  target,
  suffix = "",
  duration = 2000,
  label,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useCountUp(target, { active: isInView, duration });

  const display =
    count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-foreground">
        {display}
        {suffix}
      </div>
      <div className="text-sm text-subtle-foreground mt-1">{label}</div>
    </div>
  );
}
