import React from "react";
import { AbsoluteFill, interpolate, Series, useVideoConfig } from "remotion";
import { Audio } from "@remotion/media";
import { AUDIO_SRC, COLORS, SCENE_FRAMES } from "./constants";
import { inter } from "./font";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";
import { Scene4 } from "./scenes/Scene4";
import { Scene5 } from "./scenes/Scene5";
import { Scene7 } from "./scenes/Scene7";
import { Scene8 } from "./scenes/Scene8";

// Scene6 (reviews) intentionally omitted — testimonials aren't real.
const SCENES = [Scene1, Scene2, Scene3, Scene4, Scene5, Scene7, Scene8];

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
          return fadeIn * fadeOut * 0.32;
        }}
      />
      <Series>
        {SCENES.map((Scene, i) => (
          <Series.Sequence key={i} durationInFrames={SCENE_FRAMES[i]}>
            <Scene />
          </Series.Sequence>
        ))}
      </Series>
    </AbsoluteFill>
  );
};
