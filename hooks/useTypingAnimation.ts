"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface TerminalLine {
  text: string;
  type: "command" | "response" | "checkmark" | "progress" | "cta";
  highlight?: boolean; // coral highlight for key phrases
}

export interface TerminalBlock {
  command: string;
  lines: TerminalLine[];
}

interface UseTypingAnimationOptions {
  blocks: TerminalBlock[];
  baseSpeed?: number; // ms per character
  speedVariation?: number; // ±ms random variation
  commandPause?: number; // pause after ">" before response
  blockPause?: number; // pause between command blocks
  linePause?: number; // pause between response lines
}

interface TypingState {
  displayedBlocks: DisplayedBlock[];
  isComplete: boolean;
  currentBlockIndex: number;
  showCursor: boolean;
}

export interface DisplayedBlock {
  command: string;
  commandText: string; // partially typed command
  commandComplete: boolean;
  lines: DisplayedLine[];
}

export interface DisplayedLine {
  text: string;
  type: TerminalLine["type"];
  highlight?: boolean;
  visible: boolean;
  typedText?: string; // for progress bar animation
}

export function useTypingAnimation({
  blocks,
  baseSpeed = 35,
  speedVariation = 12,
  commandPause = 400,
  blockPause = 800,
  linePause = 100,
}: UseTypingAnimationOptions) {
  const [state, setState] = useState<TypingState>({
    displayedBlocks: [],
    isComplete: false,
    currentBlockIndex: 0,
    showCursor: true,
  });

  const skipRef = useRef(false);
  const animatingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getTypingDelay = useCallback(() => {
    const variation = (Math.random() * 2 - 1) * speedVariation;
    return Math.max(10, baseSpeed + variation);
  }, [baseSpeed, speedVariation]);

  const sleep = useCallback(
    (ms: number) =>
      new Promise<void>((resolve) => {
        if (skipRef.current) {
          resolve();
          return;
        }
        timeoutRef.current = setTimeout(resolve, ms);
      }),
    []
  );

  const skipAnimation = useCallback(() => {
    if (state.isComplete) return;
    skipRef.current = true;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Jump to completed state
    const completedBlocks: DisplayedBlock[] = blocks.map((block) => ({
      command: block.command,
      commandText: block.command,
      commandComplete: true,
      lines: block.lines.map((line) => ({
        text: line.text,
        type: line.type,
        highlight: line.highlight,
        visible: true,
        typedText: line.text,
      })),
    }));

    setState({
      displayedBlocks: completedBlocks,
      isComplete: true,
      currentBlockIndex: blocks.length,
      showCursor: true,
    });
  }, [blocks, state.isComplete]);

  useEffect(() => {
    if (animatingRef.current) return;
    animatingRef.current = true;

    const animate = async () => {
      for (let blockIdx = 0; blockIdx < blocks.length; blockIdx++) {
        if (skipRef.current) break;

        const block = blocks[blockIdx];

        // Add new block with empty command
        setState((prev) => ({
          ...prev,
          currentBlockIndex: blockIdx,
          displayedBlocks: [
            ...prev.displayedBlocks,
            {
              command: block.command,
              commandText: "",
              commandComplete: false,
              lines: block.lines.map((line) => ({
                text: line.text,
                type: line.type,
                highlight: line.highlight,
                visible: false,
              })),
            },
          ],
        }));

        // Type command character by character
        for (let charIdx = 0; charIdx <= block.command.length; charIdx++) {
          if (skipRef.current) break;
          const partial = block.command.slice(0, charIdx);
          setState((prev) => {
            const newBlocks = [...prev.displayedBlocks];
            newBlocks[blockIdx] = {
              ...newBlocks[blockIdx],
              commandText: partial,
            };
            return { ...prev, displayedBlocks: newBlocks };
          });
          if (charIdx < block.command.length) {
            await sleep(getTypingDelay());
          }
        }

        if (skipRef.current) break;

        // Mark command complete
        setState((prev) => {
          const newBlocks = [...prev.displayedBlocks];
          newBlocks[blockIdx] = {
            ...newBlocks[blockIdx],
            commandComplete: true,
          };
          return { ...prev, displayedBlocks: newBlocks };
        });

        // Pause after command
        await sleep(commandPause);

        // Reveal lines one by one
        for (let lineIdx = 0; lineIdx < block.lines.length; lineIdx++) {
          if (skipRef.current) break;

          const line = block.lines[lineIdx];

          if (line.type === "progress") {
            // Animate progress bar
            const progressSteps = 10;
            for (let step = 0; step <= progressSteps; step++) {
              if (skipRef.current) break;
              const filled = "█".repeat(step);
              const empty = "░".repeat(progressSteps - step);
              const pct = step * 10;
              const progressText = `Applying... ${filled}${empty} ${pct}%`;
              setState((prev) => {
                const newBlocks = [...prev.displayedBlocks];
                const newLines = [...newBlocks[blockIdx].lines];
                newLines[lineIdx] = {
                  ...newLines[lineIdx],
                  visible: true,
                  typedText: progressText,
                };
                newBlocks[blockIdx] = {
                  ...newBlocks[blockIdx],
                  lines: newLines,
                };
                return { ...prev, displayedBlocks: newBlocks };
              });
              await sleep(80);
            }
          } else {
            // Regular line — reveal
            setState((prev) => {
              const newBlocks = [...prev.displayedBlocks];
              const newLines = [...newBlocks[blockIdx].lines];
              newLines[lineIdx] = { ...newLines[lineIdx], visible: true };
              newBlocks[blockIdx] = {
                ...newBlocks[blockIdx],
                lines: newLines,
              };
              return { ...prev, displayedBlocks: newBlocks };
            });
          }

          await sleep(linePause);
        }

        // Pause between blocks
        if (blockIdx < blocks.length - 1) {
          await sleep(blockPause);
        }
      }

      // Animation complete
      setState((prev) => ({ ...prev, isComplete: true }));
    };

    animate();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    displayedBlocks: state.displayedBlocks,
    isComplete: state.isComplete,
    showCursor: state.showCursor,
    skipAnimation,
  };
}
