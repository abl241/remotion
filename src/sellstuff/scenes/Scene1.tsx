import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { MicroLabel, Wordmark } from "../ui";
import { inter } from "../font";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 45;

  const enter = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const y = interpolate(enter, [0, 1], [10, 0]);
  const q1 = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });
  const q2 = interpolate(frame, [8, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.8} />
        <div style={{ position: "absolute", top: 34, left: 44 }}>
          <Wordmark size={22} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
          }}
        >
          <div style={{ transform: `translateY(${y}px)` }}>
            <div
              style={{
                fontSize: 56,
                fontWeight: 750,
                letterSpacing: "-0.04em",
                color: COLORS.text,
                lineHeight: 1.05,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  opacity: q1,
                  transform: `translateX(${interpolate(q1, [0, 1], [18, 0])}px)`,
                }}
              >
                Need to sell stuff?
              </div>
              <div
                style={{
                  marginTop: 12,
                  opacity: q2,
                  transform: `translateX(${interpolate(q2, [0, 1], [18, 0])}px)`,
                }}
              >
                Want to buy stuff?
              </div>
            </div>
            <div style={{ marginTop: 26, textAlign: "center" }}>
              <MicroLabel>US college students only</MicroLabel>
              <div style={{ fontSize: 18, color: COLORS.muted }}>
                Buy and sell locally on campus.
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
