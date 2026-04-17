import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { inter } from "../font";

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 95;

  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 130 } });
  const headY = interpolate(enter, [0, 1], [12, 0]);
  const headOpacity = interpolate(enter, [0, 1], [0, 1]);

  const cardSpring = spring({
    frame: Math.max(0, frame - 14),
    fps,
    config: { damping: 13, stiffness: 120 },
  });
  const cardY = interpolate(cardSpring, [0, 1], [24, 0]);
  const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: 54,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              opacity: headOpacity,
              transform: `translateY(${headY}px)`,
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: COLORS.muted,
                marginBottom: 14,
              }}
            >
              Pricing
            </div>
            <div
              style={{
                fontSize: 52,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                color: COLORS.text,
                lineHeight: 1.02,
              }}
            >
              One activation.
              <br />
              Keep every dollar.
            </div>
          </div>

          <div
            style={{
              marginTop: 30,
              display: "flex",
              alignItems: "baseline",
              gap: 14,
              opacity: cardOpacity,
              transform: `translateY(${cardY}px)`,
            }}
          >
            <div
              style={{
                fontSize: 76,
                fontWeight: 800,
                letterSpacing: "-0.06em",
                color: COLORS.text,
                lineHeight: 1,
              }}
            >
              $9
            </div>
            <div
              style={{
                fontSize: 16,
                color: COLORS.muted,
                letterSpacing: "0.01em",
              }}
            >
              one-time · 0% commission
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
