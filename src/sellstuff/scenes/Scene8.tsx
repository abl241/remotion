import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { LogoImage } from "../ui";
import { inter } from "../font";

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 140;

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 100, mass: 1 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.92, 1]);
  const logoY = interpolate(logoSpring, [0, 1], [10, 0]);

  const headIn = interpolate(frame, [22, 44], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subIn = interpolate(frame, [38, 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const footIn = interpolate(frame, [58, 82], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drift = Math.sin(frame / 50) * 2;

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.7} />

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoY + drift}px) scale(${logoScale})`,
            }}
          >
            <LogoImage height={120} />
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: COLORS.text,
              textAlign: "center",
              opacity: headIn,
              transform: `translateY(${interpolate(headIn, [0, 1], [8, 0])}px)`,
            }}
          >
            Start on sellstuff.
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 17,
              color: COLORS.muted,
              textAlign: "center",
              opacity: subIn,
              transform: `translateY(${interpolate(subIn, [0, 1], [6, 0])}px)`,
            }}
          >
            Sign up with your .edu email.
          </div>

          <div
            style={{
              marginTop: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              opacity: footIn,
              transform: `translateY(${interpolate(footIn, [0, 1], [6, 0])}px)`,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              US College Students Only
            </div>
            <div
              style={{
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                fontSize: 14,
                color: COLORS.muted,
                letterSpacing: "-0.01em",
              }}
            >
              sellstuff.xyz
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
