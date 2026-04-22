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
import { SceneFrame } from "../SceneFrame";
import { MicroLabel } from "../ui";
import { inter } from "../font";

const durationInFrames = 300;

const Stars: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <div style={{ display: "inline-flex", gap: 2, color: "#f59e0b" }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3 7 7 .6-5.3 4.8 1.7 7.1L12 17.8 5.6 21.5l1.7-7.1L2 9.6 9 9z" />
      </svg>
    ))}
  </div>
);

const testimonials = [
  {
    quote: "Sold my whole dorm in 48 hours.",
    name: "Jamie",
    meta: "Junior · CU Boulder",
    initials: "JM",
    tint: "#fde68a",
  },
  {
    quote: "Finally, no randos in my DMs.",
    name: "Priya",
    meta: "Sophomore · UT Austin",
    initials: "PR",
    tint: "#bae6fd",
  },
  {
    quote: "Made $320 before move-out.",
    name: "Alex",
    meta: "Senior · Stanford",
    initials: "AL",
    tint: "#c7d2fe",
  },
] as const;

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const label = spring({ frame, fps, config: { damping: 18, stiffness: 160 } });
  const labelOpacity = interpolate(label, [0, 1], [0, 1]);

  // Big stat phase (0–130)
  const statIn = spring({
    frame: Math.max(0, frame - 8),
    fps,
    config: { damping: 13, stiffness: 140, mass: 0.9 },
  });
  const statY = interpolate(statIn, [0, 1], [22, 0]);
  const statOpacity = interpolate(statIn, [0, 1], [0, 1]);
  const counter = Math.floor(
    interpolate(frame, [20, 90], [0, 12450], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  // Stat exits while testimonials begin entering (overlapping handoff — no dead frame)
  const phaseOut = interpolate(frame, [110, 140], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const testimonialBase = 118;
  const testimonialPhase = frame >= testimonialBase;

  // Slow drift for liveness
  const drift = Math.sin(frame / 48) * 2;

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: labelOpacity,
          }}
        >
          <MicroLabel>Real students · real sales</MicroLabel>
        </div>

        {/* Big stat */}
        <AbsoluteFill
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 18,
            opacity: statOpacity * (1 - phaseOut),
            transform: `translateY(${statY + phaseOut * -20 + drift}px)`,
          }}
        >
          <div
            style={{
              fontSize: 188,
              fontWeight: 900,
              letterSpacing: "-0.07em",
              color: COLORS.text,
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {counter.toLocaleString()}+
          </div>
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: COLORS.text,
            }}
          >
            items sold on campus
          </div>
          <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 12 }}>
            <Stars size={22} />
            <span style={{ fontSize: 18, color: COLORS.muted }}>
              <span style={{ color: COLORS.text, fontWeight: 700 }}>4.9</span> from 2,400+ students
            </span>
          </div>
        </AbsoluteFill>

        {/* Testimonials */}
        {testimonialPhase && (
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "110px 60px 60px",
              gap: 20,
            }}
          >
            {testimonials.map((t, i) => {
              const local = frame - testimonialBase;
              const at = i * 22;
              const s = spring({
                frame: Math.max(0, local - at),
                fps,
                config: { damping: 14, stiffness: 130 },
              });
              const opacity = interpolate(s, [0, 1], [0, 1]);
              const y = interpolate(s, [0, 1], [30, 0]);
              const tilt = (i - 1) * 1.8;
              const bob = Math.sin((frame + i * 20) / 32) * 3;

              return (
                <div
                  key={t.name}
                  style={{
                    flex: 1,
                    maxWidth: 320,
                    background: COLORS.surface,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 18,
                    padding: 26,
                    boxShadow: "0 26px 60px rgba(20,20,20,0.08)",
                    opacity,
                    transform: `translateY(${y + bob}px) rotate(${tilt}deg)`,
                  }}
                >
                  <Stars size={16} />
                  <div
                    style={{
                      marginTop: 14,
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: "-0.02em",
                      color: COLORS.text,
                      lineHeight: 1.2,
                      marginBottom: 20,
                    }}
                  >
                    &ldquo;{t.quote}&rdquo;
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 999,
                        background: t.tint,
                        color: COLORS.text,
                        fontSize: 13,
                        fontWeight: 800,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: COLORS.text,
                        }}
                      >
                        {t.name}
                      </div>
                      <div style={{ fontSize: 11, color: COLORS.muted }}>
                        {t.meta}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </SceneFrame>
  );
};
