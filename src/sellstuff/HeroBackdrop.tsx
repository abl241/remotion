import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "./constants";

type HeroBackdropProps = {
  intensity?: number;
};

export const HeroBackdrop: React.FC<HeroBackdropProps> = ({ intensity = 1 }) => {
  const o = intensity;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: "-20%",
          filter: "blur(72px)",
          opacity: 0.55 * o,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "8%",
            left: "12%",
            width: "42%",
            height: "48%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(125, 211, 252, 0.55) 0%, transparent 68%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "22%",
            right: "8%",
            width: "38%",
            height: "44%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(196, 181, 253, 0.45) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            left: "35%",
            width: "36%",
            height: "40%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(167, 243, 208, 0.5) 0%, transparent 68%)",
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.35 * o,
          backgroundImage: `
            linear-gradient(rgba(20, 20, 20, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20, 20, 20, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 25%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 65% at 50% 45%, black 25%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(180deg, ${COLORS.bg}00 0%, ${COLORS.bg}55 45%, ${COLORS.bg}cc 100%)`,
        }}
      />
    </AbsoluteFill>
  );
};
