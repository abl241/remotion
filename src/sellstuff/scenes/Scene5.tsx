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

// Three beats, each ~100f
const BEATS = [
  { start: 0, end: 100, title: "Sell faster." },
  { start: 100, end: 200, title: "Keep every dollar." },
  { start: 200, end: 300, title: "Zero sketchy strangers." },
] as const;

const BeatTitle: React.FC<{ idx: number; frame: number; fps: number }> = ({
  idx,
  frame,
  fps,
}) => {
  const { start, end, title } = BEATS[idx];
  if (frame < start || frame >= end) return null;
  const local = frame - start;
  const s = spring({
    frame: Math.max(0, local - 4),
    fps,
    config: { damping: 14, stiffness: 150 },
  });
  const outT = interpolate(local, [end - start - 18, end - start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = interpolate(s, [0, 1], [0, 1]) * (1 - outT);
  const y = interpolate(s, [0, 1], [16, 0]) + outT * -12;

  return (
    <div
      style={{
        position: "absolute",
        top: 120,
        left: 0,
        right: 0,
        textAlign: "center",
        opacity,
        transform: `translateY(${y}px)`,
      }}
    >
      <div
        style={{
          fontSize: 92,
          fontWeight: 900,
          letterSpacing: "-0.055em",
          color: COLORS.text,
          lineHeight: 1,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// Beat 1 — Notifications cascade
const Beat1: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const start = BEATS[0].start;
  const local = frame - start;

  const toasts = [
    { at: 22, label: "SOLD", item: "Dorm desk", price: "$45" },
    { at: 42, label: "SOLD", item: "Microwave", price: "$25" },
    { at: 62, label: "SOLD", item: "Mini fridge", price: "$80" },
  ];

  const outT = interpolate(local, [BEATS[0].end - BEATS[0].start - 18, BEATS[0].end - BEATS[0].start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 56,
        top: 300,
        display: "flex",
        flexDirection: "column",
        gap: 14,
        alignItems: "flex-end",
        opacity: 1 - outT,
        transform: `translateX(${outT * 40}px)`,
      }}
    >
      {toasts.map((t, i) => {
        const s = interpolate(local, [t.at, t.at + 14], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const drift = Math.sin((frame + i * 12) / 22) * 2;
        return (
          <div
            key={i}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: "14px 18px",
              boxShadow: "0 18px 48px rgba(20,20,20,0.10)",
              display: "flex",
              alignItems: "center",
              gap: 14,
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [60, 0])}px) translateY(${drift}px) scale(${interpolate(
                s,
                [0, 1],
                [0.9, 1],
                { easing: Easing.out(Easing.cubic) },
              )})`,
              minWidth: 320,
            }}
          >
            <div
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.12em",
                color: "#065f46",
                background: "#ecfdf5",
                border: "1px solid #a7f3d0",
                padding: "4px 8px",
                borderRadius: 6,
              }}
            >
              {t.label}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  color: COLORS.text,
                  letterSpacing: "-0.01em",
                }}
              >
                {t.item}
              </div>
              <div style={{ fontSize: 11, color: COLORS.muted }}>
                Picked up · 2 hours ago
              </div>
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: COLORS.text,
                letterSpacing: "-0.02em",
              }}
            >
              {t.price}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Beat 2 — $ counter
const Beat2: React.FC<{ frame: number }> = ({ frame }) => {
  const start = BEATS[1].start;
  const local = frame - start;

  const counter = Math.floor(
    interpolate(local, [12, 70], [0, 245], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }),
  );

  const outT = interpolate(local, [BEATS[1].end - BEATS[1].start - 18, BEATS[1].end - BEATS[1].start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const pulse = 1 + Math.sin(frame / 10) * 0.01;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: 280,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 24,
        opacity: 1 - outT,
      }}
    >
      <div
        style={{
          fontSize: 170,
          fontWeight: 900,
          letterSpacing: "-0.07em",
          color: COLORS.text,
          lineHeight: 1,
          transform: `scale(${pulse})`,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        ${counter}
      </div>
      <div
        style={{
          display: "flex",
          gap: 26,
          fontSize: 18,
          color: COLORS.muted,
        }}
      >
        <span>
          <span style={{ color: COLORS.text, fontWeight: 700 }}>0%</span> commission
        </span>
        <span>·</span>
        <span>
          <span style={{ color: COLORS.text, fontWeight: 700 }}>0</span> listing fees
        </span>
      </div>
    </div>
  );
};

// Beat 3 — .edu verification row
const Beat3: React.FC<{ frame: number }> = ({ frame }) => {
  const start = BEATS[2].start;
  const local = frame - start;

  const badges = [
    { name: "alex", domain: "stanford.edu" },
    { name: "priya", domain: "cu.edu" },
    { name: "jamie", domain: "mit.edu" },
    { name: "sam", domain: "gatech.edu" },
  ];

  const outT = interpolate(local, [BEATS[2].end - BEATS[2].start - 18, BEATS[2].end - BEATS[2].start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        top: 290,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: 16,
        flexWrap: "wrap",
        padding: "0 60px",
        opacity: 1 - outT,
      }}
    >
      {badges.map((b, i) => {
        const s = interpolate(local, [18 + i * 10, 32 + i * 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={b.domain}
            style={{
              background: COLORS.surface,
              border: `1px solid ${COLORS.border}`,
              borderRadius: 14,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              boxShadow: "0 14px 40px rgba(20,20,20,0.08)",
              opacity: s,
              transform: `translateY(${interpolate(s, [0, 1], [16, 0])}px) scale(${interpolate(
                s,
                [0, 1],
                [0.92, 1],
                { easing: Easing.out(Easing.cubic) },
              )})`,
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 999,
                background: "#dbeafe",
                color: "#1d4ed8",
                fontWeight: 800,
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✓
            </span>
            <div
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: COLORS.text,
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                letterSpacing: "-0.01em",
              }}
            >
              {b.name}@{b.domain}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export const Scene5: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeIdx = BEATS.findIndex((b) => frame >= b.start && frame < b.end);

  const labelIn = spring({ frame, fps, config: { damping: 18, stiffness: 160 } });

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
            opacity: interpolate(labelIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(labelIn, [0, 1], [-6, 0])}px)`,
          }}
        >
          <MicroLabel>The payoff</MicroLabel>
        </div>

        {BEATS.map((_, i) => (
          <BeatTitle key={i} idx={i} frame={frame} fps={fps} />
        ))}

        {activeIdx === 0 && <Beat1 frame={frame} fps={fps} />}
        {activeIdx === 1 && <Beat2 frame={frame} />}
        {activeIdx === 2 && <Beat3 frame={frame} />}
      </AbsoluteFill>
    </SceneFrame>
  );
};
