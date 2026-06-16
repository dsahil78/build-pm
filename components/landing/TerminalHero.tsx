"use client";

import { useEffect, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useTypingAnimation,
  type TerminalBlock,
  type DisplayedLine,
} from "@/hooks/useTypingAnimation";
import { IS_PRELAUNCH } from "@/lib/constants";
import { LiveStats } from "@/components/shared/LiveStats";
import { analytics } from "@/lib/analytics";

const TERMINAL_BLOCKS: TerminalBlock[] = [
  {
    command: "build --why",
    lines: [
      {
        text: "Your résumé lists what you managed.",
        type: "response",
        highlight: false,
      },
      {
        text: "Your builds prove what you shipped.",
        type: "response",
        highlight: true,
      },
    ],
  },
  {
    command: "build --portfolio",
    lines: [
      {
        text: "Ship experiments \u2192 Document decisions \u2192 Publish publicly.",
        type: "response",
        highlight: false,
      },
      {
        text: "Your builds become a living portfolio of shipped work.",
        type: "response",
        highlight: true,
      },
    ],
  },
  {
    command: "build --who",
    lines: [
      {
        text: "Aspiring PMs. Builder PMs. Founder PMs. Leader PMs.",
        type: "response",
        highlight: true,
      },
      {
        text: "Anyone who believes shipping > talking.",
        type: "response",
        highlight: false,
      },
    ],
  },
  {
    command: "build --status",
    lines: IS_PRELAUNCH
      ? [
          { text: "\u2713 Founding cohort forming, first 100 builders", type: "checkmark" },
          { text: "\u2713 $200K+ in free enterprise tools for builders", type: "checkmark" },
          { text: "> build --start", type: "cta" },
        ]
      : [
          // TODO(post-launch): Replace with REAL, verified metrics before setting
          // IS_PRELAUNCH=false. Never ship fabricated traction numbers.
          { text: "\u2713 [TODO: verified builder count]", type: "checkmark" },
          { text: "\u2713 [TODO: verified tools value]", type: "checkmark" },
          { text: "> build --start", type: "cta" },
        ],
  },
];

/**
 * Renders a terminal line with special formatting for specific text content.
 */
function renderLine(line: DisplayedLine): ReactNode {
  const { text, type, highlight } = line;

  // "Aspiring PMs. Builder PMs. Founder PMs. Leader PMs."
  if (
    type === "response" &&
    text === "Aspiring PMs. Builder PMs. Founder PMs. Leader PMs."
  ) {
    return (
      <>
        <span className="text-brand-coral">Aspiring PMs</span>
        <span className="text-grey-400">. </span>
        <span className="text-brand-coral">Builder PMs</span>
        <span className="text-grey-400">. </span>
        <span className="text-brand-coral">Founder PMs</span>
        <span className="text-grey-400">. </span>
        <span className="text-brand-coral">Leader PMs</span>
        <span className="text-grey-400">.</span>
      </>
    );
  }

  // "Anyone who believes shipping > talking."
  if (
    type === "response" &&
    text === "Anyone who believes shipping > talking."
  ) {
    return (
      <span className="text-grey-300">
        Anyone who believes{" "}
        <span className="text-brand-coral">shipping &gt; talking</span>.
      </span>
    );
  }

  // "Ship experiments → Document decisions → Publish publicly."
  if (type === "response" && text.startsWith("Ship experiments")) {
    return (
      <span className="text-grey-300">
        <span className="text-brand-coral">Ship experiments</span>
        {" \u2192 "}
        <span className="text-brand-coral">Document decisions</span>
        {" \u2192 "}
        <span className="text-brand-coral">Publish publicly</span>.
      </span>
    );
  }

  // Default response styling
  if (type === "response") {
    return (
      <span className={highlight ? "text-brand-coral" : "text-grey-300"}>
        {text}
      </span>
    );
  }

  return <>{text}</>;
}

export function TerminalHero() {
  const { displayedBlocks, isComplete, skipAnimation } = useTypingAnimation({
    blocks: TERMINAL_BLOCKS,
    baseSpeed: 35,
    speedVariation: 12,
    commandPause: 400,
    blockPause: 800,
    linePause: 100,
  });

  const handleSkip = useCallback(() => {
    skipAnimation();
  }, [skipAnimation]);

  useEffect(() => {
    const onKeyDown = () => handleSkip();
    window.addEventListener("keydown", onKeyDown, { once: true });
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleSkip]);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) handleSkip();
    };
    window.addEventListener("scroll", onScroll, { once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [handleSkip]);

  return (
    <section data-section="hero" className="relative min-h-svh flex flex-col items-center justify-center bg-background px-4 sm:px-6 pt-20 pb-10">
      {/* Headline + Narrative */}
      <div className="w-full max-w-[768px] mb-2 text-center">
        {/* Problem bridge */}
        <p className="text-muted-foreground text-sm sm:text-base font-mono tracking-wide mb-2">
          Developers have GitHub. Designers have Dribbble.{" "}
          <span className="text-foreground">PMs have... resumes?</span>
        </p>

        {/* Main headline */}
        <h1 className="text-display tracking-tight leading-[1.1] text-foreground">
          No GitHub for PMs.
          <br />
          <span className="text-accent-text">Until now.</span>
        </h1>

      </div>

      {/* Terminal */}
      <div className="w-full max-w-[768px]">
        <div className="rounded-2xl border border-[#333] overflow-hidden bg-brand-grey">
          {/* Title bar */}
          <div className="flex items-center px-3 py-3 border-b border-[#333]">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
            </div>
            <span className="mx-auto text-xs font-mono text-grey-500 select-none">
              BuildPM v1.0.0
            </span>
            <div className="w-[52px]" />
          </div>

          {/* Terminal content */}
          <div className="px-5 py-2.5 font-mono text-[12px] sm:text-[14px] leading-relaxed">
            {displayedBlocks.map((block, blockIdx) => (
              <div key={blockIdx} className={blockIdx > 0 ? "mt-4" : ""}>
                {/* Command line */}
                <div className="flex">
                  <span className="text-grey-500 select-none">&gt;&nbsp;</span>
                  <span className="text-white">{block.commandText}</span>
                  {!block.commandComplete && (
                    <span className="text-white animate-cursor-blink ml-[1px]">
                      &#9612;
                    </span>
                  )}
                </div>

                {/* Response lines */}
                {block.lines.map((line, lineIdx) => {
                  if (!line.visible) return null;

                  if (line.type === "checkmark") {
                    return (
                      <div key={lineIdx} className="mt-1">
                        <span className="text-[#27C93F]">{"\u2713"}</span>
                        <span className="text-grey-300">{line.text.slice(1)}</span>
                      </div>
                    );
                  }

                  if (line.type === "cta") {
                    return (
                      <div key={lineIdx} className="mt-1 text-brand-coral animate-pulse-glow">
                        {line.text}
                      </div>
                    );
                  }

                  // Response lines with special formatting
                  return (
                    <div key={lineIdx} className="mt-1">
                      {renderLine(line)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* CTA below terminal — always visible */}
        <div id="hero-cta" className="flex flex-wrap gap-4 justify-center mt-8">
          {IS_PRELAUNCH ? (
            <a
              href="/apply"
              className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground text-base font-medium rounded-xl hover:bg-accent-hover active:translate-y-px transition-all"
              onClick={() => analytics.trackCtaClicked("hero", "Apply for early access", "/apply")}
            >
              Apply for early access
            </a>
          ) : (
            <>
              <a
                href="/apply"
                className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground text-base font-medium rounded-xl hover:bg-accent-hover active:translate-y-px transition-all"
                onClick={() => analytics.trackCtaClicked("hero", "Start building", "/apply")}
              >
                Start building
              </a>
              <a
                href="#apply"
                className="inline-flex items-center px-8 py-4 border-2 border-accent text-accent-text text-base font-medium rounded-xl hover:bg-accent hover:text-accent-foreground transition-all"
              >
                Learn more
              </a>
            </>
          )}
        </div>

        {/* Live stats — only post-launch, fade in after animation */}
        {!IS_PRELAUNCH && (
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8"
              >
                <LiveStats />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Down-arrow */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-subtle-foreground animate-bounce-down" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
