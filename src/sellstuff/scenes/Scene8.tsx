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
import { Cursor, LogoImage } from "../ui";
import { inter } from "../font";

const durationInFrames = 300;

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline comes in first
  const headS = spring({
    frame,
    fps,
    config: { damping: 13, stiffness: 140, mass: 0.9 },
  });
  const headOpacity = interpolate(headS, [0, 1], [0, 1]);
  const headY = interpolate(headS, [0, 1], [20, 0]);
  const headScale = interpolate(headS, [0, 1], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
  });

  // Sub
  const subS = spring({
    frame: Math.max(0, frame - 18),
    fps,
    config: { damping: 16, stiffness: 150 },
  });
  const subOpacity = interpolate(subS, [0, 1], [0, 1]);
  const subY = interpolate(subS, [0, 1], [10, 0]);

  // Button (pill) reveal
  const btnS = spring({
    frame: Math.max(0, frame - 36),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const btnOpacity = interpolate(btnS, [0, 1], [0, 1]);
  const btnY = interpolate(btnS, [0, 1], [12, 0]);

  // Cursor choreography: enters from bottom-right, moves to button, clicks, ripples
  const cursorAppear = interpolate(frame, [60, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor travels from (720, 560) to the button at ~(540, 430)
  const cursorX = interpolate(frame, [74, 120], [720, 540], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });
  const cursorY = interpolate(frame, [74, 120], [560, 430], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  // Click at frame ~124
  const clickT = interpolate(frame, [122, 128], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorScale = interpolate(frame, [118, 124, 130], [1, 0.82, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Button press scale
  const btnPress = interpolate(frame, [120, 126, 138], [1, 0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Ripple
  const rippleScale = interpolate(frame, [124, 160], [0.5, 2.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const rippleOpacity = interpolate(frame, [124, 160], [0.45, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor fades away after click
  const cursorOpacity =
    cursorAppear * interpolate(frame, [155, 175], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  // Finale swap — headline/sub fade out, big logo fades in
  const finaleStart = 180;
  const finaleT = interpolate(frame, [finaleStart, finaleStart + 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoS = spring({
    frame: Math.max(0, frame - finaleStart),
    fps,
    config: { damping: 14, stiffness: 120 },
  });
  const logoY = interpolate(logoS, [0, 1], [20, 0]);
  const logoScale = interpolate(logoS, [0, 1], [0.9, 1], {
    easing: Easing.out(Easing.cubic),
  });

  // Final domain reveal
  const domainT = interpolate(frame, [finaleStart + 30, finaleStart + 60], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Subtle pulse to keep motion
  const drift = Math.sin(frame / 55) * 2;

  // Pulse urgency on button before click
  const btnPulse =
    1 + Math.sin(frame / 8) * 0.012 * interpolate(frame, [36, 120], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.9} />

        {/* Phase 1: CTA with button + cursor click */}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            gap: 18,
            opacity: 1 - finaleT,
          }}
        >
          <div
            style={{
              fontSize: 88,
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: COLORS.text,
              textAlign: "center",
              lineHeight: 0.98,
              opacity: headOpacity,
              transform: `translateY(${headY + drift}px) scale(${headScale})`,
            }}
          >
            Start selling today.
          </div>

          <div
            style={{
              fontSize: 22,
              color: COLORS.muted,
              textAlign: "center",
              opacity: subOpacity,
              transform: `translateY(${subY}px)`,
            }}
          >
            Sign up with your .edu — post your first item in 60 seconds.
          </div>

          {/* Pseudo-button for cursor click */}
          <div
            style={{
              position: "relative",
              marginTop: 24,
              opacity: btnOpacity,
              transform: `translateY(${btnY}px) scale(${btnPress * btnPulse})`,
            }}
          >
            <div
              style={{
                background: COLORS.primary,
                color: COLORS.primaryLabel,
                padding: "20px 36px",
                borderRadius: 16,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                display: "inline-flex",
                alignItems: "center",
                gap: 14,
                boxShadow: "0 20px 50px rgba(20,20,20,0.22)",
                position: "relative",
              }}
            >
              List your first item
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {/* Ripple */}
              {clickT > 0 && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: 16,
                    border: `2px solid ${COLORS.primary}`,
                    transform: `scale(${rippleScale})`,
                    opacity: rippleOpacity,
                    pointerEvents: "none",
                  }}
                />
              )}
            </div>
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 14,
              color: COLORS.muted,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: btnOpacity,
            }}
          >
            Only $9 · no commission · .edu only
          </div>
        </AbsoluteFill>

        {/* Cursor overlay */}
        <AbsoluteFill style={{ pointerEvents: "none", opacity: 1 - finaleT }}>
          {cursorOpacity > 0 && (
            <Cursor
              x={cursorX}
              y={cursorY}
              scale={cursorScale}
              opacity={cursorOpacity}
            />
          )}
        </AbsoluteFill>

        {/* Phase 2: Finale logo + domain */}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 26,
            opacity: finaleT,
            padding: 48,
          }}
        >
          <div
            style={{
              transform: `translateY(${logoY + drift}px) scale(${logoScale})`,
            }}
          >
            <LogoImage height={128} />
          </div>
          <div
            style={{
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 24,
              color: COLORS.text,
              letterSpacing: "-0.01em",
              fontWeight: 600,
              opacity: domainT,
              transform: `translateY(${interpolate(domainT, [0, 1], [8, 0])}px)`,
            }}
          >
            sellstuff.xyz
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.muted,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 700,
              opacity: domainT,
            }}
          >
            US College Students Only
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneFrame>
  );
};
