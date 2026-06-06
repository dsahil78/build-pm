"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { LIVE_STATS } from "@/lib/mock-data";

function AnimatedNumber({ target, inView }: { target: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 1600, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <>{count}</>;
}

const ICONS: Record<string, React.ReactNode> = {
  fire: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-5-5-11-5-11z" fill="#FF5733" opacity="0.9" />
      <path d="M12 10c0 0-2.5 3-2.5 5.5a2.5 2.5 0 005 0c0-2.5-2.5-5.5-2.5-5.5z" fill="#FFBD2E" />
    </svg>
  ),
  rocket: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5733" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
    </svg>
  ),
  bolt: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF5733" aria-hidden="true">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
};

export function LiveStats() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
      className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
    >
      {LIVE_STATS.map((stat, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6">
            {ICONS[stat.icon]}
          </span>
          <span className="text-white font-bold tabular-nums">
            <AnimatedNumber target={stat.value} inView={isInView} />
          </span>
          <span className="text-grey-400 text-sm">{stat.label}</span>
        </div>
      ))}

      {/* Pulse dot — "live" indicator */}
      <div className="flex items-center gap-1.5 ml-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27C93F] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#27C93F]" />
        </span>
        <span className="text-[#27C93F] text-xs font-medium">Live</span>
      </div>
    </motion.div>
  );
}
