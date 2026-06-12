"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { NAV_LINKS, PRELAUNCH_NAV_LINKS, IS_PRELAUNCH } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { analytics } from "@/lib/analytics";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = IS_PRELAUNCH ? PRELAUNCH_NAV_LINKS : NAV_LINKS;
  const ctaLabel = IS_PRELAUNCH ? "Apply for early access" : "Start building";

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all",
        scrolled
          ? "bg-background/90 backdrop-blur-lg border-b border-border-base"
          : "bg-transparent"
      )}
      style={{
        transitionDuration: "200ms",
        transitionTimingFunction: "var(--ease-out)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                style={{ transitionDuration: "var(--duration-fast)" }}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <a
              href="/apply"
              className="inline-flex items-center px-5 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-lg transition-all hover:bg-accent-hover"
              style={{ transitionDuration: "var(--duration-fast)" }}
              onClick={() => analytics.trackCtaClicked("navbar", ctaLabel, "/apply")}
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              style={{ transitionDuration: "var(--duration-fast)" }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              {mobileOpen ? (
                <>
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="6" y1="18" x2="18" y2="6" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
            </button>
          </div>
        </div>

        {/* Mobile slide-down panel */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all",
            mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
          style={{
            transitionDuration: "200ms",
            transitionTimingFunction: "var(--ease-out)",
          }}
        >
          <div className="pb-4 pt-4 border-t border-border-base">
            <div className="flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground px-2 py-1.5 transition-colors"
                  style={{ transitionDuration: "var(--duration-fast)" }}
                  onClick={closeMobile}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/apply"
                className="inline-flex items-center justify-center px-5 py-2.5 bg-accent text-accent-foreground text-sm font-medium rounded-lg mt-2 transition-colors"
                style={{ transitionDuration: "var(--duration-fast)" }}
                onClick={() => { closeMobile(); analytics.trackCtaClicked("navbar_mobile", ctaLabel, "/apply"); }}
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
