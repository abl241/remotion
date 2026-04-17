export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 700;

/** Scene durations in frames @ 30fps */
export const SCENE_FRAMES = [
  // ~20.5s total @ 30fps (feedback: speed up + readability)
  45, 120, 105, 105, 150, 90,
] as const;

export const TOTAL_FRAMES = SCENE_FRAMES.reduce((a, b) => a + b, 0);

export const COLORS = {
  bg: "#fafafa",
  surface: "#ffffff",
  text: "#141414",
  muted: "#737373",
  border: "#e8e8e8",
  primary: "#141414",
  primaryLabel: "#ffffff",
} as const;

/** Replace with your royalty-free indie/electronic bed (e.g. Pixabay / Artlist). */
export const AUDIO_SRC =
  "https://remotion.media/audio.mp3";

export const MICRO = {
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
};
