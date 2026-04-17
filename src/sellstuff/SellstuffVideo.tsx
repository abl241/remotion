import React from "react";
import { AbsoluteFill, interpolate, Series, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { AUDIO_SRC, COLORS } from "./constants";
import { inter } from "./font";
import { Scene1 } from "./scenes/Scene1";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene6 } from "./scenes/Scene6";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";

export const SellstuffVideo: React.FC = () => {
  const { durationInFrames, fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.bg,
        fontFamily: inter,
      }}
    >
      <Audio
        src={AUDIO_SRC}
        loop
        volume={(f) => {
          const fadeIn = interpolate(f, [0, 1 * fps], [0, 1], {
            extrapolateRight: "clamp",
          });
          const fadeOut = interpolate(
            f,
            [durationInFrames - 2 * fps, durationInFrames],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );
          // Slightly lower by default (feedback: music)
          return fadeIn * fadeOut * 0.32;
        }}
      />
      <Series>
        <Series.Sequence durationInFrames={90}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={130}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={95}>
          <Scene6 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={126}>
          <Scene7 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <Scene8 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
