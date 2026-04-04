import React from "react";
import { AbsoluteFill, interpolate, Series, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { AUDIO_SRC, COLORS } from "./constants";
import { inter } from "./font";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
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
          return fadeIn * fadeOut * 0.37;
        }}
      />
      <Series>
        <Series.Sequence durationInFrames={120}>
          <Scene1 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={150}>
          <Scene2 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={160}>
          <Scene3 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={130}>
          <Scene4 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={140}>
          <Scene5 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene6 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={180}>
          <Scene7 />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <Scene8 />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
