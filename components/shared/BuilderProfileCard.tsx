"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { MOCK_BUILDER } from "@/lib/mock-data";

const HEATMAP_CELLS = 28;
const INTENSITY_LEVELS = [0, 0.15, 0.3, 0.5, 0.8];
// Deterministic placeholder used for SSR and hydration.
const SERVER_HEATMAP: number[] = Array(HEATMAP_CELLS).fill(0);

const noopSubscribe = () => () => {};

function randomHeatmap(): number[] {
  return Array.from(
    { length: HEATMAP_CELLS },
    () => INTENSITY_LEVELS[Math.floor(Math.random() * INTENSITY_LEVELS.length)],
  );
}

export function BuilderProfileCard() {
  // Generate the decorative heatmap once on the client (stable across renders),
  // avoiding an impure Math.random() call during render / hydration mismatch.
  const cache = useRef<number[] | null>(null);
  const heatmap = useSyncExternalStore(
    noopSubscribe,
    () => (cache.current ??= randomHeatmap()),
    () => SERVER_HEATMAP,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 4 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: EASE_OUT }}
      className="w-full max-w-[340px] mx-auto"
    >
      <div
        className="rounded-3xl bg-gradient-to-b from-[#252525] to-[#1E1E1E] p-6 relative overflow-hidden"
        style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 24px 48px -12px rgba(0,0,0,0.5)" }}
      >
        {/* Top bar glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,87,51,0.4), transparent)" }}
          aria-hidden="true"
        />

        {/* Profile header */}
        <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: MOCK_BUILDER.avatarBg }}
          >
            {MOCK_BUILDER.avatar}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-semibold">{MOCK_BUILDER.name}</h3>
              <span className="text-[10px] font-mono bg-brand-coral/15 text-brand-coral px-1.5 py-0.5 rounded">
                {MOCK_BUILDER.role}
              </span>
            </div>
            <p className="text-grey-500 text-sm font-mono">
              buildpm.co/{MOCK_BUILDER.handle}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#333]">
          <div className="text-center">
            <p className="text-h3 text-white">{MOCK_BUILDER.score}</p>
            <p className="text-[11px] text-grey-500 mt-0.5">Builder Score</p>
          </div>
          <div className="text-center">
            <p className="text-h3 text-white">{MOCK_BUILDER.projects}</p>
            <p className="text-[11px] text-grey-500 mt-0.5">Shipped</p>
          </div>
          <div className="text-center">
            <p className="text-h3 text-white">{MOCK_BUILDER.streak}w</p>
            <p className="text-[11px] text-grey-500 mt-0.5">Streak</p>
          </div>
        </div>

        {/* Skills */}
        <div className="flex gap-2 mt-5 flex-wrap">
          {MOCK_BUILDER.skills.map((skill) => (
            <span
              key={skill}
              className="text-[11px] font-mono text-grey-400 bg-[#2A2A2A] border border-[#333] rounded-lg px-2.5 py-1"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Activity bar */}
        <div className="mt-5 pt-4 border-t border-[#333]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] text-grey-500">Recent activity</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27C93F] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#27C93F]" />
            </span>
          </div>
          {/* Mini activity heatmap */}
          <div className="flex gap-[3px]">
            {heatmap.map((intensity, i) => (
              <div
                key={i}
                className="w-2.5 h-2.5 rounded-[3px]"
                style={{
                  backgroundColor: intensity > 0 ? `rgba(255,87,51,${intensity})` : "#2A2A2A",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
