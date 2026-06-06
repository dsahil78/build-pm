"use client";

import { useState, useEffect } from "react";
import { Logo } from "@/components/brand/Logo";

const EXCUSES = [
  "The PM reprioritized. The engineer is on PTO. Check back next sprint.",
  "Blocked by a dependency. The standup was inconclusive.",
  "Moved to icebox. Stakeholder alignment pending.",
  "Scope creep ate this page. We're descoping to an MVP.",
  "This was in the PRD. Nobody read the PRD.",
];

/* ─────────────────────────────────────────────
 * Build Bot — Premium robot mascot illustration
 *
 * A single, polished robot character that floats
 * with blinking eyes, pulsing core, and thrusters.
 * Surrounded by drifting builder blocks.
 * ───────────────────────────────────────────── */
function BuildBot() {
  return (
    <svg
      className="w-52 h-auto sm:w-60 md:w-64"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      {/* ── Ambient floating blocks ── */}
      <rect x="18" y="38" width="16" height="8" rx="2.5" fill="#FF5733" opacity="0.12" transform="rotate(15 26 42)">
        <animateTransform attributeName="transform" type="translate" values="0,0;3,-5;0,0" dur="7s" repeatCount="indefinite" additive="sum" />
      </rect>
      <rect x="166" y="50" width="14" height="7" rx="2" fill="#FF5733" opacity="0.10" transform="rotate(-18 173 53)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-4,-3;0,0" dur="9s" repeatCount="indefinite" additive="sum" />
      </rect>
      <rect x="10" y="118" width="12" height="6" rx="2" fill="#72716E" opacity="0.09" transform="rotate(30 16 121)">
        <animateTransform attributeName="transform" type="translate" values="0,0;4,3;0,0" dur="8s" repeatCount="indefinite" additive="sum" />
      </rect>
      <rect x="176" y="125" width="18" height="8" rx="2.5" fill="#FF5733" opacity="0.13" transform="rotate(-12 185 129)">
        <animateTransform attributeName="transform" type="translate" values="0,0;-3,4;0,0" dur="10s" repeatCount="indefinite" additive="sum" />
      </rect>
      <rect x="32" y="162" width="10" height="5" rx="1.5" fill="#72716E" opacity="0.07" transform="rotate(40 37 164)">
        <animateTransform attributeName="transform" type="translate" values="0,0;2,-3;0,0" dur="11s" repeatCount="indefinite" additive="sum" />
      </rect>

      {/* ── Ground shadow ── */}
      <ellipse cx="100" cy="182" rx="36" ry="6" fill="#FF5733" opacity="0.06">
        <animate attributeName="rx" values="36;30;36" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
        <animate attributeName="opacity" values="0.06;0.03;0.06" dur="4s" repeatCount="indefinite" calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1" />
      </ellipse>

      {/* ── Robot (floating) ── */}
      <g>
        <animateTransform
          attributeName="transform" type="translate"
          values="0,0;0,-7;0,0" dur="4s" repeatCount="indefinite"
          calcMode="spline" keySplines="0.45 0 0.55 1;0.45 0 0.55 1"
        />

        {/* ─ Antenna ─ */}
        <line x1="100" y1="42" x2="100" y2="30" stroke="#72716E" strokeWidth="2" strokeLinecap="round" />
        <circle cx="100" cy="26" r="4.5" fill="#FF5733">
          <animate attributeName="opacity" values="1;0.25;1" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="26" r="9" fill="#FF5733" opacity="0">
          <animate attributeName="opacity" values="0.12;0;0.12" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* ─ Head ─ */}
        <rect x="62" y="42" width="76" height="54" rx="16" fill="#52514E" />
        {/* Top bevel */}
        <rect x="68" y="44" width="64" height="5" rx="2.5" fill="#72716E" opacity="0.25" />
        {/* Ear panels */}
        <rect x="56" y="56" width="8" height="18" rx="3" fill="#52514E" />
        <rect x="136" y="56" width="8" height="18" rx="3" fill="#52514E" />

        {/* Visor */}
        <rect x="72" y="52" width="56" height="34" rx="10" fill="#1A1A1A" />
        {/* Glass reflection */}
        <rect x="78" y="55" width="30" height="3" rx="1.5" fill="#FFFFFF" opacity="0.04" />

        {/* Left eye */}
        <rect x="82" y="60" width="12" height="18" rx="4" fill="#27C93F">
          <animate attributeName="height" values="18;2;18" keyTimes="0;0.02;0.04" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="y" values="60;68;60" keyTimes="0;0.02;0.04" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="rx" values="4;2;4" keyTimes="0;0.02;0.04" dur="5s" repeatCount="indefinite" begin="2.5s" />
        </rect>
        {/* Right eye */}
        <rect x="106" y="60" width="12" height="18" rx="4" fill="#27C93F">
          <animate attributeName="height" values="18;2;18" keyTimes="0;0.02;0.04" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="y" values="60;68;60" keyTimes="0;0.02;0.04" dur="5s" repeatCount="indefinite" begin="2.5s" />
          <animate attributeName="rx" values="4;2;4" keyTimes="0;0.02;0.04" dur="5s" repeatCount="indefinite" begin="2.5s" />
        </rect>

        {/* ─ Neck ─ */}
        <rect x="90" y="96" width="20" height="7" rx="4" fill="#72716E" />

        {/* ─ Body ─ */}
        <rect x="70" y="103" width="60" height="42" rx="12" fill="#3D3D3A" />
        {/* Top bevel */}
        <rect x="76" y="105" width="48" height="4" rx="2" fill="#52514E" opacity="0.4" />
        {/* Chest plate recess */}
        <rect x="82" y="112" width="36" height="18" rx="6" fill="#2A2A2A" opacity="0.5" />
        {/* Core light */}
        <circle cx="100" cy="121" r="5" fill="#FF5733" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.35;0.8" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="100" cy="121" r="10" fill="#FF5733" opacity="0">
          <animate attributeName="opacity" values="0.06;0.01;0.06" dur="3s" repeatCount="indefinite" />
        </circle>
        {/* Side vents — left */}
        <line x1="74" y1="130" x2="80" y2="130" stroke="#52514E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="74" y1="134" x2="80" y2="134" stroke="#52514E" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <line x1="74" y1="138" x2="80" y2="138" stroke="#52514E" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />
        {/* Side vents — right */}
        <line x1="120" y1="130" x2="126" y2="130" stroke="#52514E" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
        <line x1="120" y1="134" x2="126" y2="134" stroke="#52514E" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
        <line x1="120" y1="138" x2="126" y2="138" stroke="#52514E" strokeWidth="1.2" strokeLinecap="round" opacity="0.3" />

        {/* ─ Left arm ─ */}
        <circle cx="66" cy="109" r="5" fill="#72716E" />
        <rect x="54" y="109" width="12" height="28" rx="5" fill="#52514E" />
        <circle cx="60" cy="124" r="2.5" fill="#72716E" opacity="0.6" />
        <rect x="56" y="137" width="8" height="6" rx="2.5" fill="#72716E" />

        {/* ─ Right arm ─ */}
        <circle cx="134" cy="109" r="5" fill="#72716E" />
        <rect x="134" y="109" width="12" height="28" rx="5" fill="#52514E" />
        <circle cx="140" cy="124" r="2.5" fill="#72716E" opacity="0.6" />
        <rect x="136" y="137" width="8" height="6" rx="2.5" fill="#72716E" />

        {/* ─ Hover base ─ */}
        <rect x="76" y="147" width="48" height="12" rx="6" fill="#52514E" />
        <rect x="80" y="149" width="40" height="8" rx="4" fill="#3D3D3A" />
        {/* Thruster glow */}
        <rect x="84" y="159" width="32" height="3" rx="1.5" fill="#378ADD" opacity="0.15">
          <animate attributeName="opacity" values="0.2;0.06;0.2" dur="1.5s" repeatCount="indefinite" />
        </rect>
        <rect x="90" y="162" width="20" height="2" rx="1" fill="#378ADD" opacity="0.06">
          <animate attributeName="opacity" values="0.1;0.02;0.1" dur="1.5s" repeatCount="indefinite" />
        </rect>
      </g>
    </svg>
  );
}

export default function NotFound() {
  const [excuse, setExcuse] = useState("");

  useEffect(() => {
    setExcuse(EXCUSES[Math.floor(Math.random() * EXCUSES.length)]);
  }, []);

  return (
    <div className="relative min-h-svh flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden bg-brand-dark">
      {/* Radial glow */}
      <div
        className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255,87,51,0.06) 0%, transparent 60%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Robot */}
        <div className="nf-entrance" style={{ animationDelay: "0ms" }}>
          <BuildBot />
        </div>

        {/* 404 */}
        <p
          className="text-[4.5rem] sm:text-[5.5rem] md:text-[6rem] font-bold text-brand-coral leading-none select-none mt-6 nf-entrance"
          style={{ animationDelay: "200ms" }}
        >
          404
        </p>

        {/* Headline */}
        <p
          className="text-grey-300 text-base sm:text-lg mt-3 text-center nf-entrance"
          style={{ animationDelay: "350ms" }}
        >
          This feature is still in the backlog.
        </p>

        {/* Excuse */}
        <p
          className="text-grey-500 text-sm mt-1.5 max-w-sm text-center nf-entrance"
          style={{ animationDelay: "500ms" }}
        >
          {excuse || "\u00A0"}
        </p>

        {/* CTA */}
        <a
          href="/"
          className="mt-8 inline-flex items-center px-6 py-2.5 bg-brand-coral text-white text-sm font-semibold rounded-lg transition-all hover:brightness-110 hover:scale-[1.02] active:scale-[0.98] nf-entrance"
          style={{ animationDelay: "650ms", transitionDuration: "var(--duration-fast)" }}
        >
          Back to home
        </a>

        {/* Logo */}
        <div className="mt-10 nf-entrance-fade" style={{ animationDelay: "800ms" }}>
          <Logo variant="dark" size="sm" />
        </div>
      </div>
    </div>
  );
}
