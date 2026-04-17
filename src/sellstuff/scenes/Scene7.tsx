import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { MicroLabel, Wordmark } from "../ui";
import { inter } from "../font";

const beats = [
  { label: "Verified", title: ".edu students only." },
  { label: "Money", title: "No fees on sales." },
  { label: "Local", title: "Pick up on campus." },
  { label: "Speed", title: "List in minutes." },
  { label: "Seasonal", title: "Built for move-in / move-out." },
] as const;

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();
  const durationInFrames = 150;

  const per = 28;
  const hold = 14;

  const getAnim = (idx: number) => {
    const start = idx * per;
    const local = frame - start;
    const tIn = interpolate(local, [0, 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const tOut = interpolate(local, [hold, hold + 10], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const inX = interpolate(tIn, [0, 1], [140, 0], {
      easing: Easing.out(Easing.cubic),
    });
    const outX = interpolate(tOut, [0, 1], [0, -140], {
      easing: Easing.in(Easing.cubic),
    });
    const x = local < hold ? inX : outX;
    const opacity = interpolate(local, [0, 8, hold + 6, hold + 10], [0, 1, 1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return { x, opacity };
  };

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.7} />

        <div style={{ position: "absolute", top: 34, left: 44 }}>
          <Wordmark size={22} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
          }}
        >
          {beats.map((b, i) => {
            const { x, opacity } = getAnim(i);
            return (
              <div
                key={b.title}
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: 900,
                  opacity,
                  transform: `translateX(${x}px)`,
                }}
              >
                <MicroLabel>{b.label}</MicroLabel>
                <div
                  style={{
                    fontSize: 56,
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    color: COLORS.text,
                    lineHeight: 1.05,
                  }}
                >
                  {b.title}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
