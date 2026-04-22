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

const rows = [
  {
    objection: "Hard to set up?",
    answer: "Post in 60 seconds.",
  },
  {
    objection: "Hidden fees?",
    answer: "$9 once. 0% commission.",
  },
  {
    objection: "Sketchy strangers?",
    answer: ".edu verified only.",
  },
] as const;

// Each row: enter(16), holdObjection(18), strike+answer(20), hold(30), exit(~16)
const PER_ROW = 90;

const Row: React.FC<{
  idx: number;
  frame: number;
  fps: number;
}> = ({ idx, frame, fps }) => {
  const start = idx * PER_ROW;
  const local = frame - start;
  if (local < 0 || local > PER_ROW + 16) return null;

  const enterS = spring({
    frame: Math.max(0, local),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const opacity = interpolate(enterS, [0, 1], [0, 1]);
  const x = interpolate(enterS, [0, 1], [80, 0]);

  // Strike-through sweep (obj gets crossed out)
  const strikeT = interpolate(local, [24, 42], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Answer slide in
  const ansS = spring({
    frame: Math.max(0, local - 34),
    fps,
    config: { damping: 12, stiffness: 150 },
  });
  const ansOpacity = interpolate(ansS, [0, 1], [0, 1]);
  const ansY = interpolate(ansS, [0, 1], [18, 0]);

  // Exit slide left
  const exitT = interpolate(local, [PER_ROW - 16, PER_ROW + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const checkS = spring({
    frame: Math.max(0, local - 38),
    fps,
    config: { damping: 9, stiffness: 180, mass: 0.9 },
  });
  const checkScale = interpolate(checkS, [0, 1], [0, 1], {
    easing: Easing.out(Easing.cubic),
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        padding: "0 80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 26,
        opacity: opacity * (1 - exitT),
        transform: `translateX(${x - exitT * 80}px)`,
      }}
    >
      {/* Objection line */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          alignSelf: "flex-start",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: COLORS.muted,
            lineHeight: 1,
          }}
        >
          &ldquo;{rows[idx].objection}&rdquo;
        </div>
        {/* strike */}
        <div
          style={{
            position: "absolute",
            top: "54%",
            left: -6,
            right: -6,
            height: 5,
            background: "#ef4444",
            borderRadius: 3,
            transform: `scaleX(${strikeT})`,
            transformOrigin: "0 50%",
          }}
        />
      </div>

      {/* Answer line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          opacity: ansOpacity,
          transform: `translateY(${ansY}px)`,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 999,
            background: "#ecfdf5",
            border: "1px solid #a7f3d0",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            transform: `scale(${checkScale})`,
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path
              d="M4 12l5 5 11-11"
              stroke="#065f46"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          style={{
            fontSize: 92,
            fontWeight: 900,
            letterSpacing: "-0.055em",
            color: COLORS.text,
            lineHeight: 1,
          }}
        >
          {rows[idx].answer}
        </div>
      </div>
    </div>
  );
};

// Progress dots
const Dots: React.FC<{ frame: number }> = ({ frame }) => {
  const active = Math.min(rows.length - 1, Math.floor(frame / PER_ROW));
  return (
    <div
      style={{
        position: "absolute",
        bottom: 44,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: 10,
      }}
    >
      {rows.map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 36 : 10,
            height: 10,
            borderRadius: 999,
            background: i <= active ? COLORS.text : COLORS.border,
          }}
        />
      ))}
    </div>
  );
};

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const label = spring({ frame, fps, config: { damping: 18, stiffness: 160 } });

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
            opacity: interpolate(label, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(label, [0, 1], [-6, 0])}px)`,
          }}
        >
          <MicroLabel>What about…</MicroLabel>
        </div>

        {rows.map((_, i) => (
          <Row key={i} idx={i} frame={frame} fps={fps} />
        ))}

        <Dots frame={frame} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
