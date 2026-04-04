import React from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

type SceneFrameProps = {
  durationInFrames: number;
  children: React.ReactNode;
};

export const SceneFrame: React.FC<SceneFrameProps> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enterDur = Math.round(0.45 * fps);
  const exitDur = Math.round(0.45 * fps);

  const enterSpring = spring({
    frame: Math.min(frame, enterDur),
    fps,
    config: { damping: 16, stiffness: 130 },
  });
  const scaleIn = interpolate(enterSpring, [0, 1], [0.96, 1]);
  const opacityIn = interpolate(enterSpring, [0, 1], [0, 1]);

  const exitT = interpolate(
    frame,
    [durationInFrames - exitDur, durationInFrames],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scaleOut = interpolate(exitT, [0, 1], [1, 0.96], {
    easing: Easing.in(Easing.cubic),
  });
  const opacityOut = interpolate(exitT, [0, 1], [1, 0], {
    easing: Easing.in(Easing.cubic),
  });

  const inExit = frame > durationInFrames - exitDur;
  const inEnter = frame < enterDur;

  const scale = inExit ? scaleOut : inEnter ? scaleIn : 1;
  const opacity = inExit ? opacityOut : inEnter ? opacityIn : 1;

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${scale})`,
        opacity,
        transformOrigin: "50% 50%",
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
