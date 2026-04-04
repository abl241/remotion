import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { inter } from "../font";

const Check: React.FC = () => (
  <span style={{ color: "#16a34a", marginRight: 8, fontSize: 14 }}>✓</span>
);

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 120;

  const phase = interpolate(
    frame,
    [Math.round(0.55 * fps), Math.round(0.95 * fps)],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const statusText = phase < 0.5 ? "Pending" : "Accepted";

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            display: "flex",
            gap: 28,
            padding: 48,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: `1px solid rgba(232, 232, 232, 0.9)`,
              background: COLORS.surface,
              padding: 26,
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: COLORS.muted,
                marginBottom: 10,
              }}
            >
              Activation
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 6,
              }}
            >
              One-time activation
            </div>
            <div
              style={{
                fontSize: 13,
                color: COLORS.muted,
                marginBottom: 22,
                lineHeight: 1.45,
              }}
            >
              Unlock selling with a single $9 activation — no commission on
              your sales.
            </div>
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  marginBottom: 12,
                  opacity: 0.7,
                }}
              >
                {["VISA", "MC", "AMEX"].map((b) => (
                  <span
                    key={b}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      padding: "4px 8px",
                      borderRadius: 4,
                      border: `1px solid ${COLORS.border}`,
                      background: COLORS.surface,
                      color: COLORS.muted,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
              <div style={{ fontSize: 12, color: COLORS.muted }}>
                <Check />
                Secure checkout (Stripe)
              </div>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              borderRadius: 14,
              border: `1px solid rgba(232, 232, 232, 0.9)`,
              background: COLORS.surface,
              padding: 26,
            }}
          >
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: COLORS.muted,
                marginBottom: 10,
              }}
            >
              Referrals
            </div>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 16,
              }}
            >
              Invite friends
            </div>
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: `1px solid ${COLORS.border}`,
                fontSize: 13,
                marginBottom: 14,
                color: COLORS.muted,
              }}
            >
              friend@school.edu
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 12, color: COLORS.muted }}>Status</span>
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 600,
                  color: COLORS.text,
                }}
              >
                {statusText}
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.muted,
                lineHeight: 1.6,
              }}
            >
              <div>
                <Check />
                3 accepted referrals
              </div>
              <div style={{ paddingLeft: 22, marginTop: 6 }}>
                Unlocks extended access on your account — invite real classmates
                to grow the marketplace.
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
