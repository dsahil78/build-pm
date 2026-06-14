import Link from "next/link";
import { IS_PRELAUNCH } from "@/lib/constants";
import { TOOL_LOGOS, type LogoDef } from "@/lib/tool-logos";

const row1 = TOOL_LOGOS.slice(0, 10);
const row2 = TOOL_LOGOS.slice(10, 20);

function LogoIcon({ logo }: { logo: LogoDef }) {
  return (
    <div className="flex-shrink-0 px-8 text-foreground opacity-30 hover:opacity-100 transition-opacity duration-300">
      <svg
        viewBox={logo.viewBox}
        width="36"
        height="36"
        fill="currentColor"
        role="img"
        aria-label={logo.name}
      >
        <title>{logo.name}</title>
        <path d={logo.path} />
      </svg>
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
}: {
  logos: LogoDef[];
  direction: "left" | "right";
}) {
  const cls =
    direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const doubled = [...logos, ...logos];

  return (
    <div className="overflow-hidden">
      <div className={`flex items-center w-max ${cls}`}>
        {doubled.map((logo, i) => (
          <LogoIcon key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
}

export function ToolShelf() {
  return (
    <section className="bg-background py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl text-muted-foreground text-center">
          40+ enterprise tools. Free for members.
        </h2>

        <div className="marquee-container marquee-mask mt-14">
          <MarqueeRow logos={row1} direction="left" />
          <div className="mt-10">
            <MarqueeRow logos={row2} direction="right" />
          </div>
        </div>

        <p className="text-sm text-center mt-10">
          {IS_PRELAUNCH ? (
            <Link
              href="/partners"
              className="text-accent-text hover:opacity-80 transition-opacity duration-200"
            >
              Interested in partnering? Apply here &rarr;
            </Link>
          ) : (
            <Link
              href="/partners"
              className="text-accent-text hover:opacity-80 transition-opacity duration-200"
            >
              Become a partner &rarr;
            </Link>
          )}
        </p>
      </div>
    </section>
  );
}
