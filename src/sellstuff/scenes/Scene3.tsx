import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { BrowserChrome, MicroLabel, Wordmark } from "../ui";
import { inter } from "../font";

const listings = [
  { title: "IKEA desk", price: "$45", cond: "Good", hue: "#e8f4fc" },
  { title: "Mini fridge", price: "$80", cond: "Like New", hue: "#f3eefc" },
  { title: "Graphing calculator", price: "$55", cond: "Good", hue: "#eff6ff" },
  { title: "Textbook bundle", price: "$60", cond: "Good", hue: "#ecfdf5" },
] as const;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 120;

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 120 } });
  const windowY = interpolate(enter, [0, 1], [18, 0]);
  const scroll = interpolate(frame, [10, durationInFrames - 10], [0, -56], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const focus = 1;
  const pulse = interpolate(Math.sin(frame / 9), [-1, 1], [1, 1.02]);

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 52,
          }}
        >
          <div style={{ width: "100%", maxWidth: 900 }}>
            <MicroLabel>Browse</MicroLabel>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: COLORS.text,
                marginBottom: 18,
              }}
            >
              See what’s for sale near you.
            </div>

            <div
              style={{
                borderRadius: 16,
                border: `1px solid rgba(232, 232, 232, 0.9)`,
                background: COLORS.surface,
                boxShadow: "0 30px 70px rgba(20,20,20,0.07)",
                overflow: "hidden",
                transform: `translateY(${windowY}px)`,
              }}
            >
              <BrowserChrome />
              <div style={{ padding: 18 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "2px 4px 14px",
                  }}
                >
                  <Wordmark size={20} />
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>
                    State University · main campus
                  </div>
                </div>

                <div
                  style={{
                    transform: `translateY(${scroll}px)`,
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 14,
                  }}
                >
                  {listings.map((item, i) => {
                    const isFocus = i === focus;
                    return (
                      <div
                        key={item.title}
                        style={{
                          borderRadius: 14,
                          border: `1px solid rgba(232, 232, 232, 0.85)`,
                          background: COLORS.surface,
                          overflow: "hidden",
                          transform: isFocus ? `scale(${pulse})` : "scale(1)",
                          boxShadow: isFocus
                            ? "0 18px 46px rgba(20,20,20,0.10)"
                            : "0 4px 14px rgba(20,20,20,0.05)",
                        }}
                      >
                        <div
                          style={{
                            height: 154,
                            background: item.hue,
                            borderBottom: `1px solid rgba(232, 232, 232, 0.75)`,
                          }}
                        />
                        <div style={{ padding: "14px 16px 16px" }}>
                          <div
                            style={{
                              fontSize: 18,
                              fontWeight: 700,
                              color: COLORS.text,
                              marginBottom: 8,
                              letterSpacing: "-0.02em",
                            }}
                          >
                            {item.title}
                          </div>
                          <div
                            style={{
                              fontSize: 14,
                              color: COLORS.muted,
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "baseline",
                            }}
                          >
                            <span style={{ fontWeight: 700, color: COLORS.text }}>
                              {item.price}
                            </span>
                            <span>{item.cond}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
