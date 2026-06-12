"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { MOCK_PROJECTS, MOCK_BUILDER } from "@/lib/mock-data";

function ProjectCard({ project }: { project: typeof MOCK_PROJECTS[number] }) {
  return (
    <div
      className="rounded-xl bg-[#1A1A1A]/80 p-4 border border-[#2A2A2A] hover:border-[#333] transition-colors duration-300"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[9px] font-bold"
            style={{ backgroundColor: project.builderBg }}
          >
            {project.builderAvatar}
          </div>
          <span className="text-[11px] text-grey-400">{project.builder}</span>
        </div>
        <span
          className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full ${
            project.status === "shipped"
              ? "bg-[#27C93F]/10 text-[#27C93F]"
              : project.status === "in-progress"
              ? "bg-[#FFBD2E]/10 text-[#FFBD2E]"
              : "bg-grey-600/20 text-grey-400"
          }`}
        >
          {project.status}
        </span>
      </div>

      <h4 className="text-white font-semibold text-[13px]">{project.name}</h4>
      <p className="text-[11px] text-grey-500 mt-1 leading-relaxed">{project.description}</p>

      <div className="flex items-center gap-3 mt-3 pt-2.5 border-t border-[#222]">
        <span className="text-[10px] text-grey-500">{project.daysToShip}d</span>
        <span className="text-[10px] text-grey-500">{project.decisions} decisions</span>
        {project.users > 0 && (
          <span className="text-[10px] text-grey-500">{project.users} users</span>
        )}
        <span className="text-[10px] text-grey-500">{project.collaborators} collab</span>
      </div>
    </div>
  );
}

function ProfileSidebar() {
  const heatmapData = [0, 0.15, 0.5, 0.3, 0, 0.8, 0.5, 0.15, 0.3, 0.8, 0, 0.5, 0.8, 0.3, 0.15, 0, 0.5, 0.8, 0.3, 0, 0.15, 0.8, 0.5, 0.3, 0.8, 0, 0.5, 0.15];

  return (
    <div className="p-5 space-y-5">
      {/* Profile header */}
      <div className="flex items-center gap-3">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm"
          style={{ backgroundColor: MOCK_BUILDER.avatarBg }}
        >
          {MOCK_BUILDER.avatar}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-white font-semibold text-sm">{MOCK_BUILDER.name}</h3>
            <span className="text-[8px] font-mono bg-brand-coral/15 text-brand-coral px-1 py-0.5 rounded">
              {MOCK_BUILDER.role}
            </span>
          </div>
          <p className="text-grey-500 text-[11px] font-mono">buildpm.co/{MOCK_BUILDER.handle}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-[#2A2A2A]">
        <div className="text-center">
          <p className="text-xl font-bold text-white">{MOCK_BUILDER.score}</p>
          <p className="text-[9px] text-grey-500 mt-0.5">Builder Score</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-white">{MOCK_BUILDER.projects}</p>
          <p className="text-[9px] text-grey-500 mt-0.5">Shipped</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold text-white">{MOCK_BUILDER.streak}w</p>
          <p className="text-[9px] text-grey-500 mt-0.5">Streak</p>
        </div>
      </div>

      {/* Skills */}
      <div className="flex gap-1.5 flex-wrap">
        {MOCK_BUILDER.skills.map((skill) => (
          <span key={skill} className="text-[10px] font-mono text-grey-400 bg-[#222] border border-[#2A2A2A] rounded-md px-2 py-0.5">
            {skill}
          </span>
        ))}
      </div>

      {/* Activity heatmap */}
      <div className="pt-4 border-t border-[#2A2A2A]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-grey-500">Recent activity</span>
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27C93F] opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#27C93F]" />
          </span>
        </div>
        <div className="flex gap-[2px]">
          {heatmapData.map((intensity, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-[2px]"
              style={{ backgroundColor: intensity > 0 ? `rgba(255,87,51,${intensity})` : "#222" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function ProductPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headingRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-background py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255,87,51,0.15) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative">
        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <p className="text-brand-coral text-sm font-semibold tracking-wider uppercase">
            The platform
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mt-4 tracking-tight leading-[1.1]">
            Your builds. Your proof.
            <br />
            <span className="text-muted-foreground">Your career.</span>
          </h2>
          <p className="text-muted-foreground mt-6 text-lg sm:text-xl">
            Every project you ship becomes a permanent part of your builder portfolio.
          </p>
        </motion.div>

        {/* App mockup with perspective */}
        <div style={{ perspective: "1200px" }}>
          <motion.div
            style={{ scale, opacity, rotateX }}
            className="relative"
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-px rounded-2xl"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
              }}
              aria-hidden="true"
            />

            {/* Browser frame */}
            <div
              className="relative rounded-2xl overflow-hidden border border-[#2A2A2A]"
              style={{
                boxShadow: "0 40px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)",
                background: "linear-gradient(180deg, #222 0%, #1A1A1A 100%)",
              }}
            >
              {/* Title bar */}
              <div className="flex items-center px-4 py-3 border-b border-[#2A2A2A] bg-[#1E1E1E]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-[#161616] rounded-md px-4 py-1 flex items-center gap-2">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
                    </svg>
                    <span className="text-[11px] text-grey-500 font-mono">buildpm.co/amara</span>
                  </div>
                </div>
                <div className="w-[44px]" />
              </div>

              {/* App content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[480px]">
                {/* Sidebar — profile */}
                <div className="lg:col-span-4 border-r border-[#2A2A2A] bg-[#1C1C1C]">
                  <ProfileSidebar />
                </div>

                {/* Main — project feed */}
                <div className="lg:col-span-8 relative">
                  <div className="p-5 space-y-3 lg:max-h-[480px] lg:overflow-y-auto scrollbar-thin">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-semibold text-sm">Projects</h3>
                      <span className="text-[10px] text-grey-500 font-mono">{MOCK_PROJECTS.length} shipped</span>
                    </div>
                    {MOCK_PROJECTS.map((project) => (
                      <ProjectCard key={project.name} project={project} />
                    ))}
                  </div>
                  {/* Bottom fade */}
                  <div className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Preview caption — honest framing for a pre-launch product */}
        <p className="text-center text-subtle-foreground text-xs sm:text-sm mt-8 font-mono tracking-wide">
          Preview — this is what your builder profile will look like at launch.
        </p>
      </div>
    </section>
  );
}
