import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { Wordmark } from "../ui";
import { inter } from "../font";

const listings = [
  { title: "IKEA desk", price: "$45", cond: "Good", hue: "#e8f4fc" },
  { title: "Mini fridge", price: "$80", cond: "Like New", hue: "#f3eefc" },
  { title: "Calc textbook", price: "$32", cond: "Good", hue: "#ecfdf5" },
  { title: "Desk lamp", price: "$12", cond: "Good", hue: "#fff7ed" },
  { title: "Monitor 24\"", price: "$95", cond: "Like New", hue: "#eff6ff" },
  { title: "Office chair", price: "$55", cond: "Good", hue: "#f5f5f5" },
];

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = 160;

  const hoverCard = 1;
  const pulse = interpolate(
    Math.sin((frame - 45) / 8),
    [-1, 1],
    [1, 1.03],
  );
  const shadow = interpolate(
    Math.sin((frame - 45) / 8),
    [-1, 1],
    [0.04, 0.12],
  );

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div style={{ padding: "36px 48px 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <Wordmark size={22} />
            <div
              style={{
                display: "flex",
                gap: 8,
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {["Furniture", "Electronics", "Textbooks", "All"].map((c) => (
                <span
                  key={c}
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "6px 12px",
                    borderRadius: 999,
                    border: `1px solid rgba(232, 232, 232, 0.9)`,
                    background: c === "All" ? COLORS.text : COLORS.surface,
                    color: c === "All" ? COLORS.surface : COLORS.muted,
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.muted,
              marginBottom: 16,
            }}
          >
            Near: State University — main campus
          </div>
        </div>

        <div
          style={{
            padding: "0 48px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {listings.map((item, i) => {
            const isHover = i === hoverCard;
            const scale = isHover ? pulse : 1;
            return (
              <div
                key={item.title}
                style={{
                  borderRadius: 12,
                  border: `1px solid rgba(232, 232, 232, 0.85)`,
                  background: COLORS.surface,
                  overflow: "hidden",
                  transform: `scale(${scale})`,
                  boxShadow: isHover
                    ? `0 14px 36px rgba(20,20,20,${shadow})`
                    : "0 2px 8px rgba(20,20,20,0.04)",
                }}
              >
                <div
                  style={{
                    aspectRatio: "1",
                    background: item.hue,
                    borderBottom: `1px solid rgba(232, 232, 232, 0.7)`,
                  }}
                />
                <div style={{ padding: "12px 14px 14px" }}>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: COLORS.text,
                      marginBottom: 6,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: COLORS.muted,
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ fontWeight: 600, color: COLORS.text }}>
                      {item.price}
                    </span>
                    <span>{item.cond}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: COLORS.muted,
            paddingBottom: 28,
          }}
        >
          Browse what students are selling near you.
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
