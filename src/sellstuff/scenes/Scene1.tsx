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

const durationInFrames = 150;
const CUT = 68;

export const Scene1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cutIndex = frame < CUT ? 0 : 1;
  const local = cutIndex === 0 ? frame : frame - CUT;

  const bg = cutIndex === 0 ? LISTING_IMAGES.bookshelf : LISTING_IMAGES.desk;

  // Punch-in zoom per cut
  const zoom = interpolate(local, [0, 75], [1.12, 1.22], {
    extrapolateRight: "clamp",
  });

  // Handheld shake (tiny, frequent)
  const shakeX = Math.sin(frame / 2.3) * 1.8 + Math.sin(frame / 5) * 1.1;
  const shakeY = Math.cos(frame / 2.7) * 1.6 + Math.sin(frame / 4) * 0.8;

  // Flash on cut change
  const flash =
    cutIndex === 1 && local < 10 ? interpolate(local, [0, 10], [1, 0]) : 0;

  // Text spring per cut
  const tSpring = spring({
    frame: local,
    fps,
    config: { damping: 10, stiffness: 160, mass: 0.8 },
  });
  const tOpacity = interpolate(tSpring, [0, 1], [0, 1]);
  const tScale = interpolate(tSpring, [0, 1], [0.92, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const tY = interpolate(tSpring, [0, 1], [18, 0]);

  const textByCut = [
    { line1: "Got stuff you", line2: "can't sell?" },
    { line1: "Selling online", line2: "shouldn't be sketchy." },
  ];
  const t = textByCut[cutIndex];

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill
        style={{
          backgroundColor: COLORS.bg,
          fontFamily: inter,
          overflow: "hidden",
        }}
      >
        <AbsoluteFill
          style={{
            transform: `scale(${zoom}) translate(${shakeX}px, ${shakeY}px)`,
            opacity: 0.42,
          }}
        >
          <Img
            src={staticFile(bg)}
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
            style={{ background: "#ffffff", opacity: flash * 0.85 }}
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
          <div
            style={{
              textAlign: "center",
              fontWeight: 900,
              letterSpacing: "-0.055em",
              color: COLORS.text,
              lineHeight: 0.98,
              fontSize: 108,
              opacity: tOpacity,
              transform: `translateY(${tY}px) scale(${tScale})`,
            }}
          >
            <div>{t.line1}</div>
            <div>{t.line2}</div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </SceneFrame>
  );
};
