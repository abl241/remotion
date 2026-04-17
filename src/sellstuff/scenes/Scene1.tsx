import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { LogoImage } from "../ui";
import { inter } from "../font";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 120;

  const logoIn = spring({ frame, fps, config: { damping: 18, stiffness: 150 } });

  const q1Spring = spring({
    frame: Math.max(0, frame - 12),
    fps,
    config: { damping: 11, stiffness: 120, mass: 0.9 },
  });
  const q2Spring = spring({
    frame: Math.max(0, frame - 38),
    fps,
    config: { damping: 11, stiffness: 120, mass: 0.9 },
  });

  const q1Opacity = interpolate(q1Spring, [0, 1], [0, 1]);
  const q1Y = interpolate(q1Spring, [0, 1], [26, 0]);
  const q1Scale = interpolate(q1Spring, [0, 1], [0.96, 1]);

  const q2Opacity = interpolate(q2Spring, [0, 1], [0, 1]);
  const q2Y = interpolate(q2Spring, [0, 1], [26, 0]);
  const q2Scale = interpolate(q2Spring, [0, 1], [0.96, 1]);

  const subIn = interpolate(frame, [66, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.9} />

        <div
          style={{
            position: "absolute",
            top: 34,
            left: 44,
            opacity: interpolate(logoIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(logoIn, [0, 1], [-6, 0])}px)`,
          }}
        >
          <LogoImage height={32} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
          }}
        >
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              letterSpacing: "-0.05em",
              color: COLORS.text,
              lineHeight: 1.02,
              textAlign: "center",
            }}
          >
            <div
              style={{
                opacity: q1Opacity,
                transform: `translateY(${q1Y}px) scale(${q1Scale})`,
              }}
            >
              Need to sell stuff?
            </div>
            <div
              style={{
                marginTop: 14,
                opacity: q2Opacity,
                transform: `translateY(${q2Y}px) scale(${q2Scale})`,
              }}
            >
              Want to buy stuff?
            </div>
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 22,
              color: COLORS.muted,
              textAlign: "center",
              opacity: subIn,
              transform: `translateY(${interpolate(subIn, [0, 1], [8, 0])}px)`,
            }}
          >
            The campus marketplace for US college students.
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
