import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../constants";
import { HeroBackdrop } from "../HeroBackdrop";
import { SceneFrame } from "../SceneFrame";
import { LogoImage, MicroLabel } from "../ui";
import { inter } from "../font";

const beats = [
  { label: "Verified", title: ".edu students only." },
  { label: "Money", title: "No fees on sales." },
  { label: "Local", title: "Pick up on campus." },
] as const;

export const Scene7: React.FC = () => {
  const frame = useCurrentFrame();

  const per = 38;
  const hold = 26;
  const durationInFrames = beats.length * per + 12;

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
    const inX = interpolate(tIn, [0, 1], [220, 0], {
      easing: Easing.out(Easing.cubic),
    });
    const outX = interpolate(tOut, [0, 1], [0, -220], {
      easing: Easing.in(Easing.cubic),
    });
    const x = local < hold ? inX : outX;
    const scale = interpolate(tIn, [0, 1], [0.94, 1], {
      easing: Easing.out(Easing.cubic),
    });
    const opacity = interpolate(
      local,
      [0, 8, hold + 6, hold + 10],
      [0, 1, 1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
    return { x, opacity, scale };
  };

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <HeroBackdrop intensity={0.7} />

        <div style={{ position: "absolute", top: 34, left: 44 }}>
          <LogoImage height={28} />
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
            const { x, opacity, scale } = getAnim(i);
            return (
              <div
                key={b.title}
                style={{
                  position: "absolute",
                  width: "100%",
                  maxWidth: 900,
                  opacity,
                  transform: `translateX(${x}px) scale(${scale})`,
                }}
              >
                <MicroLabel>{b.label}</MicroLabel>
                <div
                  style={{
                    fontSize: 64,
                    fontWeight: 800,
                    letterSpacing: "-0.05em",
                    color: COLORS.text,
                    lineHeight: 1.02,
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
