import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          backgroundColor: "#1A1A1A",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: "3px 4px",
          padding: "5px",
        }}
      >
        {/* 6 blocks: left column coral, right column white */}
        {[0, 1, 2].map((row) => (
          <>
            <div
              key={`l${row}`}
              style={{
                width: 9,
                height: 5,
                borderRadius: 1.5,
                backgroundColor: "#FF5733",
              }}
            />
            <div
              key={`r${row}`}
              style={{
                width: 9,
                height: 5,
                borderRadius: 1.5,
                backgroundColor: "rgba(255,255,255,0.6)",
              }}
            />
          </>
        ))}
      </div>
    ),
    { ...size }
  );
}
