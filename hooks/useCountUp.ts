"use client";

import { useEffect, useState } from "react";

interface UseCountUpOptions {
  /** Start the animation only when true (e.g. element is in view). */
  active: boolean;
  /** Total animation duration in ms. */
  duration?: number;
}

/**
 * Animates an integer from 0 to `target` with an ease-out-cubic curve,
 * driven by requestAnimationFrame. Returns the current value to render.
 */
export function useCountUp(
  target: number,
  { active, duration = 2000 }: UseCountUpOptions,
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.floor(eased * target));
      if (progress < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [active, target, duration]);

  return count;
}
