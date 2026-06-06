"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionWrapperProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
}

export function SectionWrapper({
  children,
  className = "",
  id,
  delay = 0,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
