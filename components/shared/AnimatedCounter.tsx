"use client";

import { useRef, useEffect, useState } from "react";
import { useInView } from "framer-motion";

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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, duration]);

  const display =
    count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count.toString();

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-white">
        {display}
        {suffix}
      </div>
      <div className="text-sm text-grey-500 mt-1">{label}</div>
    </div>
  );
}
