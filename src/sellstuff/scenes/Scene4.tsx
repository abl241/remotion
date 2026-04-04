import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { MicroLabel } from "../ui";
import { inter } from "../font";

const AI_TEXT =
  "Solid desk, easy move-in. Minor wear on one corner — perfect for dorms or apartments.";

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 130;

  const streamStart = Math.round(0.45 * fps);
  const n = Math.floor(
    interpolate(
      frame,
      [streamStart, streamStart + 75],
      [0, AI_TEXT.length],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    ),
  );

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            display: "flex",
            gap: 28,
            padding: 44,
            alignItems: "flex-start",
          }}
        >
          <div style={{ flex: 1.15 }}>
            <MicroLabel>How it works</MicroLabel>
            <div
              style={{
                fontSize: 26,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 8,
                letterSpacing: "-0.02em",
              }}
            >
              Post it. Share it. Sell it.
            </div>
            <div
              style={{
                fontSize: 13,
                color: COLORS.muted,
                marginBottom: 28,
                maxWidth: 380,
                lineHeight: 1.5,
              }}
            >
              List in minutes with photos, price, and condition.
            </div>

            <div
              style={{
                borderRadius: 14,
                border: `1px solid rgba(232, 232, 232, 0.9)`,
                background: COLORS.surface,
                padding: 22,
              }}
            >
              <div
                style={{
                  height: 120,
                  borderRadius: 10,
                  border: `1px dashed ${COLORS.border}`,
                  background: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 16,
                }}
              >
                Upload photos
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 6,
                }}
              >
                Title
              </div>
              <div
                style={{
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: `1px solid ${COLORS.border}`,
                  fontSize: 13,
                  marginBottom: 14,
                  color: COLORS.text,
                }}
              >
                Desk — great for small rooms
              </div>
              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      marginBottom: 6,
                    }}
                  >
                    Price
                  </div>
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.border}`,
                      fontSize: 13,
                    }}
                  >
                    $45
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.muted,
                      marginBottom: 6,
                    }}
                  >
                    Category
                  </div>
                  <div
                    style={{
                      padding: "10px 12px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.border}`,
                      fontSize: 13,
                    }}
                  >
                    Furniture
                  </div>
                </div>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 8,
                }}
              >
                Condition
              </div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["New", "Like New", "Good", "Fair"].map((x, i) => (
                  <span
                    key={x}
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      padding: "6px 10px",
                      borderRadius: 8,
                      border: `1px solid ${COLORS.border}`,
                      background: i === 2 ? "#f4f4f4" : COLORS.surface,
                      color: COLORS.text,
                    }}
                  >
                    {x}
                  </span>
                ))}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.muted,
                  marginBottom: 8,
                }}
              >
                Description
              </div>
              <div
                style={{
                  minHeight: 72,
                  padding: 12,
                  borderRadius: 10,
                  border: `1px solid ${COLORS.border}`,
                  fontSize: 12,
                  lineHeight: 1.55,
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
          </div>

          <div
            style={{
              width: 260,
              marginTop: 52,
              padding: 20,
              borderRadius: 12,
              border: `1px solid rgba(232, 232, 232, 0.9)`,
              background: COLORS.surface,
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: COLORS.muted,
                marginBottom: 8,
              }}
            >
              AI-powered descriptions
            </div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.45 }}>
              AI-powered descriptions help you post faster — clear, friendly,
              and tuned for local buyers.
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
