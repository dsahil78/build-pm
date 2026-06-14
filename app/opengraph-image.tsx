import { ImageResponse } from "next/og";

// Generates a sharp 1200x630 social card at build/request time — replaces the
// previously-referenced (and missing) /og/default.png.
export const alt = "BuildPM — For product people who ship";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CORAL = "#FF5733";
const BG = "#1A1A1A";
const FG = "#FFFFFF";
const MUTED = "#A3A29E";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 96,
          background: BG,
          color: FG,
        }}
      >
        {/* Monogram — 2 columns × 3 rows, coral + white */}
        <div style={{ display: "flex", marginBottom: 48 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[0, 1, 2].map((r) => (
              <div key={r} style={{ display: "flex", gap: 10 }}>
                <div style={{ width: 56, height: 30, borderRadius: 8, background: CORAL }} />
                <div style={{ width: 56, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.55)" }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 82, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          No GitHub for PMs.&nbsp;<span style={{ color: CORAL }}>Until now.</span>
        </div>

        <div style={{ display: "flex", fontSize: 34, color: MUTED, marginTop: 28 }}>
          Build real products with free enterprise tools and a squad.
        </div>

        <div style={{ display: "flex", alignItems: "center", marginTop: "auto", fontSize: 30, color: MUTED }}>
          <span style={{ color: FG, fontWeight: 600 }}>BuildPM</span>
          <span style={{ margin: "0 14px" }}>·</span>
          buildpm.co
        </div>
      </div>
    ),
    { ...size },
  );
}
