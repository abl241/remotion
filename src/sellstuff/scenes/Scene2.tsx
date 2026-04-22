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

const durationInFrames = 150;

type Msg = { text: string; side: "l" | "r"; tag: string };

const STRANGER = "stranger_412";

const messages: Msg[] = [
  { text: "yo u still got the fridge??", side: "l", tag: STRANGER },
  { text: "can u ship it to LA 👀", side: "r", tag: STRANGER },
  { text: "send me $20 first to hold it", side: "l", tag: STRANGER },
];

const Bubble: React.FC<{
  msg: Msg;
  startFrame: number;
  frame: number;
  fps: number;
}> = ({ msg, startFrame, frame, fps }) => {
  const local = frame - startFrame;
  const s = spring({
    frame: Math.max(0, local),
    fps,
    config: { damping: 11, stiffness: 140, mass: 0.9 },
  });
  const opacity = interpolate(s, [0, 1], [0, 1]);
  const y = interpolate(s, [0, 1], [24, 0]);
  const scale = interpolate(s, [0, 1], [0.9, 1], {
    easing: Easing.out(Easing.cubic),
  });

  // Jitter after landing
  const jitter = local > 6 ? Math.sin((frame + startFrame) / 4) * 1.2 : 0;

  const isRight = msg.side === "r";
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: isRight ? "flex-end" : "flex-start",
        marginBottom: 18,
        opacity,
        transform: `translateY(${y + jitter}px) scale(${scale})`,
      }}
    >
      <div
        style={{
          fontSize: 11,
          color: COLORS.muted,
          letterSpacing: "0.02em",
          marginBottom: 6,
          paddingLeft: isRight ? 0 : 4,
          paddingRight: isRight ? 4 : 0,
        }}
      >
        {msg.tag}
      </div>
      <div
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          color: isRight ? "#fff" : COLORS.text,
          background: isRight ? "#141414" : "#efefef",
          padding: "16px 22px",
          borderRadius: 22,
          borderTopRightRadius: isRight ? 6 : 22,
          borderTopLeftRadius: isRight ? 22 : 6,
          maxWidth: 620,
          boxShadow: "0 10px 30px rgba(20,20,20,0.08)",
        }}
      >
        {msg.text}
      </div>
    </div>
  );
};

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const label = spring({ frame, fps, config: { damping: 18, stiffness: 170 } });
  const labelOpacity = interpolate(label, [0, 1], [0, 1]);
  const labelY = interpolate(label, [0, 1], [-6, 0]);

  // Final "not anymore." slam
  const slamStart = 88;
  const slam = spring({
    frame: Math.max(0, frame - slamStart),
    fps,
    config: { damping: 8, stiffness: 180, mass: 1.1 },
  });
  const slamOpacity = interpolate(slam, [0, 1], [0, 1]);
  const slamScale = interpolate(slam, [0, 1], [1.3, 1], {
    easing: Easing.out(Easing.cubic),
  });

  // Fade out the chats as slam comes in
  const chatsOpacity = interpolate(frame, [slamStart, slamStart + 14], [1, 0.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const drift = Math.sin(frame / 40) * 3;

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{ backgroundColor: COLORS.bg, fontFamily: inter, overflow: "hidden" }}
      >
        <AbsoluteFill
          style={{
            padding: "46px 72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            opacity: chatsOpacity,
            transform: `translateY(${drift}px)`,
          }}
        >
          <div
            style={{
              opacity: labelOpacity,
              transform: `translateY(${labelY}px)`,
              marginBottom: 18,
            }}
          >
            <MicroLabel>The current reality</MicroLabel>
          </div>

          {messages.map((m, i) => (
            <Bubble key={i} msg={m} startFrame={4 + i * 26} frame={frame} fps={fps} />
          ))}
        </AbsoluteFill>

        {frame >= slamStart - 4 && (
          <AbsoluteFill
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 132,
                fontWeight: 900,
                letterSpacing: "-0.06em",
                color: COLORS.text,
                opacity: slamOpacity,
                transform: `scale(${slamScale})`,
                textAlign: "center",
                lineHeight: 0.95,
              }}
            >
              Not anymore.
            </div>
          </AbsoluteFill>
        )}
      </AbsoluteFill>
    </SceneFrame>
  );
};
