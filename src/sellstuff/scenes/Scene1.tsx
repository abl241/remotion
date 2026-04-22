import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS, LISTING_IMAGES } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { inter } from "../font";

const durationInFrames = 100;
const CUT = 50;

// Per-text envelope: fade in, hold, fade out
const textEnvelope = (frame: number, inRange: [number, number], outRange: [number, number]) => {
  const fadeIn = interpolate(frame, inRange, [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, outRange, [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
};

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background crossfade between the two cuts
  const bgSwap = interpolate(frame, [CUT - 6, CUT + 6], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Gentle punch-in zoom per cut (reset subtly at cut)
  const cutIndex = frame < CUT ? 0 : 1;
  const localForZoom = cutIndex === 0 ? frame : frame - CUT;
  const zoom = interpolate(localForZoom, [0, 50], [1.08, 1.14], {
    extrapolateRight: "clamp",
  });

  // Very slow drift
  const shakeX = Math.sin(frame / 26) * 0.6;
  const shakeY = Math.cos(frame / 30) * 0.5;

  // Softer flash, wider window, centred on the cut
  const flash = interpolate(frame, [CUT - 3, CUT + 2, CUT + 16], [0, 0.28, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Both texts render simultaneously; crossfade around CUT
  const t1Opacity = textEnvelope(frame, [2, 16], [CUT - 4, CUT + 6]);
  const t2Opacity = textEnvelope(frame, [CUT + 2, CUT + 16], [durationInFrames - 8, durationInFrames]);

  // Subtle entrance spring for each text (scale + rise)
  const t1S = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 150, mass: 0.9 },
  });
  const t1Scale = interpolate(t1S, [0, 1], [0.94, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const t1Y = interpolate(t1S, [0, 1], [14, 0]);

  const t2S = spring({
    frame: Math.max(0, frame - (CUT - 4)),
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.9 },
  });
  const t2Scale = interpolate(t2S, [0, 1], [0.96, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const t2Y = interpolate(t2S, [0, 1], [10, 0]);

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.bg,
          fontFamily: inter,
          overflow: "hidden",
        }}
      >
        {/* Bookshelf (cut 0) */}
        <AbsoluteFill
          style={{
            transform: `scale(${zoom}) translate(${shakeX}px, ${shakeY}px)`,
            opacity: 0.42 * (1 - bgSwap),
          }}
        >
          <Img
            src={staticFile(LISTING_IMAGES.bookshelf)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.8) contrast(1.02)",
            }}
          />
        </AbsoluteFill>

        {/* Desk (cut 1) */}
        <AbsoluteFill
          style={{
            transform: `scale(${zoom}) translate(${shakeX}px, ${shakeY}px)`,
            opacity: 0.42 * bgSwap,
          }}
        >
          <Img
            src={staticFile(LISTING_IMAGES.desk)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.8) contrast(1.02)",
            }}
          />
        </AbsoluteFill>

        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(250,250,250,0.55) 0%, rgba(250,250,250,0.85) 100%)",
          }}
        />

        {flash > 0 && (
          <AbsoluteFill
            style={{ background: "#ffffff", opacity: flash }}
          />
        )}

        <AbsoluteFill
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
          }}
        >
          {/* Text 1 */}
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: COLORS.text,
              lineHeight: 0.98,
              fontSize: 108,
              opacity: t1Opacity,
              transform: `translateY(${t1Y}px) scale(${t1Scale})`,
            }}
          >
            <div>Got stuff you</div>
            <div>can&apos;t sell?</div>
          </div>

          {/* Text 2 */}
          <div
            style={{
              position: "absolute",
              textAlign: "center",
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: COLORS.text,
              lineHeight: 0.98,
              fontSize: 108,
              opacity: t2Opacity,
              transform: `translateY(${t2Y}px) scale(${t2Scale})`,
            }}
          >
            <div>Selling online</div>
            <div>shouldn&apos;t be sketchy.</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneFrame>
  );
};
