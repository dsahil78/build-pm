"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { SHIPPED_THIS_WEEK, type ShippedProject } from "@/lib/mock-data";

function FeedItem({ item, index }: { item: ShippedProject; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: EASE_OUT }}
      className="group flex items-start gap-4 rounded-2xl bg-card border border-border-base p-5 transition-all duration-300 hover:from-[#282828] hover:to-[#222] hover:-translate-y-0.5"
      style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}
    >
      {/* Avatar */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-foreground text-xs font-bold shrink-0"
        style={{ backgroundColor: item.avatarBg }}
      >
        {item.avatar}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-semibold text-foreground truncate">
            {item.project}
          </h4>
          <span className="text-[11px] text-subtle-foreground font-mono shrink-0">
            {item.timeToShip}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{item.builder}</p>
        <p className="text-xs text-accent-text mt-1.5 font-medium">
          {item.outcome}
        </p>
      </div>

      {/* Ship indicator */}
      <div className="shrink-0 mt-1">
        <span className="text-success text-xs">&#10003;</span>
      </div>
    </motion.div>
  );
}

export function BuildFeed() {
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-60px" });

  return (
    <section className="bg-background py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-accent-text eyebrow">
            Shipped this week
          </p>
          <h2 className="text-h2 text-foreground mt-2 tracking-tight">
            Builders are shipping.{" "}
            <span className="text-subtle-foreground">Right now.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SHIPPED_THIS_WEEK.map((item, i) => (
            <FeedItem key={item.project} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
