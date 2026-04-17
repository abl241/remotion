import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, LISTING_IMAGES } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { MicroLabel } from "../ui";
import { inter } from "../font";

const AI_TEXT =
  "Great for dorms. Sturdy, easy to carry. Minor wear on one corner. Pickup near campus.";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 130;

  const panelIn = spring({ frame, fps, config: { damping: 14, stiffness: 130 } });
  const x = interpolate(panelIn, [0, 1], [30, 0]);

  const streamStart = Math.round(0.45 * fps);
  const n = Math.floor(
    interpolate(
      frame,
      [streamStart, streamStart + 85],
      [0, AI_TEXT.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div style={{ padding: 54 }}>
          <MicroLabel>List fast</MicroLabel>
          <div
            style={{
              fontSize: 34,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: COLORS.text,
              marginBottom: 18,
            }}
          >
            Post a listing in minutes.
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 380px",
              gap: 18,
              alignItems: "start",
            }}
          >
            <div
              style={{
                borderRadius: 16,
                border: `1px solid rgba(232, 232, 232, 0.92)`,
                background: COLORS.surface,
                padding: 22,
                transform: `translateX(${x}px)`,
                boxShadow: "0 22px 58px rgba(20,20,20,0.07)",
              }}
            >
              <div
                style={{
                  height: 200,
                  borderRadius: 12,
                  overflow: "hidden",
                  border: `1px solid rgba(232, 232, 232, 0.7)`,
                  marginBottom: 16,
                  background: "#f5f5f5",
                }}
              >
                <Img
                  src={staticFile(LISTING_IMAGES.minifridge)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center 40%",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>
                    Title
                  </div>
                  <div
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 15,
                      fontWeight: 600,
                      color: COLORS.text,
                      background: "#fafafa",
                    }}
                  >
                    Mini fridge
                  </div>
                </div>
                <div style={{ width: 150 }}>
                  <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>
                    Price
                  </div>
                  <div
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: 10,
                      padding: "12px 14px",
                      fontSize: 15,
                      fontWeight: 700,
                      color: COLORS.text,
                      background: "#fafafa",
                    }}
                  >
                    $80
                  </div>
                </div>
              </div>

              <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 6 }}>
                Description (AI assisted)
              </div>
              <div
                style={{
                  minHeight: 86,
                  borderRadius: 12,
                  border: `1px solid ${COLORS.border}`,
                  padding: 14,
                  fontSize: 14,
                  lineHeight: 1.45,
                  color: COLORS.text,
                  background: "#fafafa",
                }}
              >
                {AI_TEXT.slice(0, n)}
                <span
                  style={{
                    opacity: interpolate(frame % 18, [0, 9], [1, 0], {
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  ▍
                </span>
              </div>
            </div>

            <div
              style={{
                borderRadius: 16,
                border: `1px solid rgba(232, 232, 232, 0.92)`,
                background: COLORS.surface,
                padding: 22,
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: COLORS.text,
                  marginBottom: 8,
                  letterSpacing: "-0.02em",
                }}
              >
                Write less. Sell faster.
              </div>
              <div style={{ fontSize: 14, color: COLORS.muted, lineHeight: 1.55 }}>
                Add a photo and price — we help draft a clear description students
                actually read.
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
