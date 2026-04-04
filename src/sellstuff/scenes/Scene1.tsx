import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { BrowserChrome, MicroLabel, Wordmark } from "../ui";
import { inter } from "../font";

const TITLE = "Buy and sell on campus.";

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 120;

  const slide = spring({
    frame: Math.min(frame, Math.round(0.9 * fps)),
    fps,
    config: { damping: 14, stiffness: 100 },
  });
  const y = interpolate(slide, [0, 1], [48, 0]);

  const tiltX = interpolate(
    frame,
    [0, Math.round(1.2 * fps)],
    [18, 13],
    { extrapolateRight: "clamp" },
  );
  const wobbleY = Math.sin(frame / 22) * 2.8;

  const typeStart = Math.round(0.55 * fps);
  const chars = Math.floor(
    interpolate(
      frame,
      [typeStart, typeStart + 55],
      [0, TITLE.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );
  const typed = TITLE.slice(0, chars);

  const wash = interpolate(
    frame,
    [Math.round(0.35 * fps), Math.round(1.1 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.85} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
            perspective: 1400,
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 880,
              transform: `translateY(${y}px) perspective(1200px) rotateX(${tiltX}deg) rotateY(${wobbleY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              style={{
                borderRadius: 14,
                border: `1px solid rgba(232, 232, 232, 0.85)`,
                background: COLORS.surface,
                boxShadow: "0 24px 60px rgba(20, 20, 20, 0.06)",
                overflow: "hidden",
              }}
            >
              <BrowserChrome />
              <div
                style={{
                  position: "relative",
                  padding: "22px 28px 36px",
                  background: COLORS.surface,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: wash * 0.45,
                    background:
                      "linear-gradient(135deg, rgba(125, 211, 252, 0.2) 0%, rgba(196, 181, 253, 0.12) 50%, rgba(167, 243, 208, 0.15) 100%)",
                    pointerEvents: "none",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 36,
                  }}
                >
                  <Wordmark size={24} />
                  <div
                    style={{
                      display: "flex",
                      gap: 22,
                      fontSize: 13,
                      fontWeight: 500,
                      color: COLORS.muted,
                    }}
                  >
                    <span>Browse</span>
                    <span>Sell</span>
                    <span>Sign in</span>
                  </div>
                </div>
                <MicroLabel>US college students only</MicroLabel>
                <div
                  style={{
                    fontSize: 34,
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: COLORS.text,
                    lineHeight: 1.2,
                    minHeight: 44,
                  }}
                >
                  {typed}
                  {chars < TITLE.length ? (
                    <span
                      style={{
                        opacity: interpolate(
                          frame % 20,
                          [0, 10],
                          [1, 0],
                          { extrapolateRight: "clamp" },
                        ),
                      }}
                    >
                      |
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
