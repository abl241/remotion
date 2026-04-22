export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 700;

/** Scene durations in frames @ 30fps */
export const SCENE_FRAMES = [
  // ~40s total @ 30fps — paced for readability
  // 1:hook 2:problem 3:solution 4:how 5:payoff 6:objections 7:cta
  100, 150, 85, 300, 200, 210, 160,
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

export const LISTING_IMAGES = {
  desk: "dorm-desk-QmXSjdgXxouD3qCqfCJSBx.webp",
  minifridge: "dorm-minifridge-7VAJxQNyskD3aSH9D6bUGM.webp",
  microwave: "dorm-microwave-C7XMuYRCHAJiRhyH8B9bj5.webp",
  bookshelf: "dorm-bookshelf-MM4hEtXwFGx78darB6GaBS.webp",
} as const;

export const MICRO = {
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase" as const,
  fontWeight: 600,
};
