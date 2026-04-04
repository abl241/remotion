import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { PrimaryButton, SecondaryButton, Wordmark } from "../ui";
import { inter } from "../font";

export const Scene8: React.FC = () => {
  const frame = useCurrentFrame();

  const pulse = interpolate(
    Math.sin(frame / 9),
    [-1, 1],
    [1, 1.02],
  );

  const particles = [0.12, 0.18, 0.09, 0.15, 0.11, 0.14, 0.1, 0.13];
  return (
    <SceneFrame durationInFrames={120}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.55} />
        {particles.map((op, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${12 + (i * 109) % 76}%`,
              top: `${18 + (i * 73) % 64}%`,
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: COLORS.border,
              opacity: op * interpolate(frame, [0, 25], [0, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          />
        ))}
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
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: COLORS.text,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            Start on sellstuff.
          </div>
          <div
            style={{
              fontSize: 15,
              color: COLORS.muted,
              marginBottom: 36,
              textAlign: "center",
            }}
          >
            Sign up with your .edu email.
          </div>
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "center",
              marginBottom: 48,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <PrimaryButton pulse={pulse}>Create account</PrimaryButton>
            <SecondaryButton>Browse listings</SecondaryButton>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: COLORS.muted,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              US College Students Only
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted, opacity: 0.85 }}>
              Terms · Privacy
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginTop: 8,
              }}
            >
              <Wordmark size={20} />
              <span
                style={{
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                  fontSize: 13,
                  color: COLORS.muted,
                  letterSpacing: "-0.02em",
                }}
              >
                sellstuff.xyz
              </span>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
