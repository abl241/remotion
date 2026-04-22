import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { LogoImage } from "../ui";
import { inter } from "../font";

const durationInFrames = 150;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 130, mass: 0.9 },
  });
  const logoOpacity = interpolate(logoSpring, [0, 1], [0, 1]);
  const logoScale = interpolate(logoSpring, [0, 1], [0.82, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const logoY = interpolate(logoSpring, [0, 1], [14, 0]);

  // Statement slides in after logo settles
  const stmtStart = 30;
  const stmtSpring = spring({
    frame: Math.max(0, frame - stmtStart),
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const stmtOpacity = interpolate(stmtSpring, [0, 1], [0, 1]);
  const stmtY = interpolate(stmtSpring, [0, 1], [14, 0]);

  // Highlight sweep on key phrase
  const hi = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drift = Math.sin(frame / 55) * 2;

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.95} />

        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
            gap: 28,
          }}
        >
          <div
            style={{
              opacity: logoOpacity,
              transform: `translateY(${logoY + drift}px) scale(${logoScale})`,
            }}
          >
            <LogoImage height={110} />
          </div>

          <div
            style={{
              maxWidth: 920,
              textAlign: "center",
              opacity: stmtOpacity,
              transform: `translateY(${stmtY}px)`,
            }}
          >
            <div
              style={{
                fontSize: 48,
                fontWeight: 800,
                letterSpacing: "-0.04em",
                color: COLORS.text,
                lineHeight: 1.08,
              }}
            >
              The campus marketplace that{" "}
              <span
                style={{
                  position: "relative",
                  display: "inline-block",
                  padding: "0 6px",
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 4,
                    height: 16,
                    background: "#ffe879",
                    borderRadius: 4,
                    transform: `scaleX(${hi})`,
                    transformOrigin: "0 50%",
                    zIndex: 0,
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>
                  sells it in minutes.
                </span>
              </span>
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneFrame>
  );
};
