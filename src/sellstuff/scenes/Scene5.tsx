import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { Wordmark } from "../ui";
import { inter } from "../font";

export const Scene5: React.FC = () => {
  const durationInFrames = 140;

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            padding: "36px 48px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Wordmark size={22} />
          <div
            style={{
              display: "flex",
              gap: 4,
              padding: 4,
              borderRadius: 10,
              background: "#f0f0f0",
            }}
          >
            <span
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                background: COLORS.surface,
                color: COLORS.text,
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
              }}
            >
              Dashboard
            </span>
            <span
              style={{
                padding: "8px 16px",
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 600,
                color: COLORS.muted,
              }}
            >
              My listings
            </span>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            padding: "0 48px 40px",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: COLORS.muted,
                marginBottom: 14,
              }}
            >
              Listings
            </div>
            {[
              {
                title: "Mini fridge",
                badge: "Draft",
                badgeBg: "#f5f5f5",
              },
              {
                title: "Desk lamp",
                badge: "Published",
                badgeBg: "#ecfdf5",
              },
            ].map((row) => (
              <div
                key={row.title}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid rgba(232, 232, 232, 0.9)`,
                  background: COLORS.surface,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: "#f0f7ff",
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: COLORS.text,
                    }}
                  >
                    {row.title}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>
                    Updated recently
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "5px 10px",
                    borderRadius: 6,
                    background: row.badgeBg,
                    color: COLORS.text,
                  }}
                >
                  {row.badge}
                </span>
              </div>
            ))}
          </div>

          <div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: COLORS.muted,
                marginBottom: 14,
              }}
            >
              Watchlist
            </div>
            {[1, 2].map((i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `1px solid rgba(232, 232, 232, 0.9)`,
                  background: COLORS.surface,
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 8,
                    background: i === 1 ? "#fdf2f8" : "#eef2ff",
                    border: `1px solid ${COLORS.border}`,
                  }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: COLORS.text,
                    }}
                  >
                    {i === 1 ? "Office chair" : "Graphing calculator"}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.muted }}>
                    Saved for later
                  </div>
                </div>
                <span style={{ fontSize: 16, color: "#e11d48" }}>♥</span>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            textAlign: "center",
            fontSize: 13,
            color: COLORS.muted,
            padding: "0 80px",
            lineHeight: 1.5,
          }}
        >
          Save what you want. Finish listings when you&apos;re ready.
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
