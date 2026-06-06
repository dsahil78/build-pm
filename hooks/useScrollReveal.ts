"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface UseScrollRevealOptions {
  once?: boolean;
  margin?: `${number}px ${number}px ${number}px ${number}px`;
}

export function useScrollReveal(options: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: options.once ?? true,
    margin: options.margin ?? "0px 0px -80px 0px",
  });

  return { ref, isInView };
}
