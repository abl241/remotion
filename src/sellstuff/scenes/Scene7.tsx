import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { Wordmark } from "../ui";
import { inter } from "../font";

const IconCard: React.FC<{ children: React.ReactNode; label: string }> = ({
  children,
  label,
}) => (
  <div
    style={{
      width: 160,
      textAlign: "center",
    }}
  >
    <div
      style={{
        width: 48,
        height: 48,
        margin: "0 auto 10px",
        borderRadius: 12,
        border: `1px solid rgba(232, 232, 232, 0.9)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: COLORS.surface,
      }}
    >
      {children}
    </div>
    <div
      style={{
        fontSize: 11,
        color: COLORS.muted,
        lineHeight: 1.35,
      }}
    >
      {label}
    </div>
  </div>
);

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = 180;

  const layerA = interpolate(frame, [40, 72], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const layerB =
    interpolate(frame, [38, 68], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }) *
    interpolate(frame, [88, 118], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
  const layerC = interpolate(frame, [102, 138], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: layerA,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 18,
              maxWidth: 960,
            }}
          >
            <IconCard label="No commission on sales">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                  stroke={COLORS.text}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconCard>
            <IconCard label=".edu only">
              <svg width="22" height="22" viewBox="0 0 24 24">
                <text
                  x="12"
                  y="16"
                  textAnchor="middle"
                  fill={COLORS.text}
                  fontSize="15"
                  fontWeight={600}
                  fontFamily="system-ui, sans-serif"
                >
                  @
                </text>
              </svg>
            </IconCard>
            <IconCard label="Built for move-in/out">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                  stroke={COLORS.text}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="9" cy="7" r="4" stroke={COLORS.text} strokeWidth="1.4" />
                <path
                  d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                  stroke={COLORS.text}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </IconCard>
            <IconCard label="Fast listings">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke={COLORS.text}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </IconCard>
            <IconCard label="Secure checkout">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="11"
                  width="18"
                  height="11"
                  rx="2"
                  stroke={COLORS.text}
                  strokeWidth="1.4"
                />
                <path
                  d="M7 11V7a5 5 0 0110 0v4"
                  stroke={COLORS.text}
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
            </IconCard>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: layerB,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 48,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: "-0.045em",
              color: COLORS.text,
              textAlign: "center",
              marginBottom: 12,
            }}
          >
            No fees on sales.
          </div>
          <div
            style={{
              fontSize: 15,
              color: COLORS.muted,
              textAlign: "center",
              maxWidth: 520,
              lineHeight: 1.5,
            }}
          >
            One activation. Then you keep every dollar.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: layerC,
          }}
        >
          <HeroBackdrop intensity={1.15} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Wordmark size={38} />
              <div
                style={{
                  marginTop: 14,
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  color: COLORS.muted,
                }}
              >
                Local campus marketplace
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
