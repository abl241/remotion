import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { inter } from "../font";

export const Scene6: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 105;

  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 125 } });
  const x = interpolate(enter, [0, 1], [24, 0]);
  const y = interpolate(enter, [0, 1], [12, 0]);

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div style={{ padding: 54 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontWeight: 600,
              color: COLORS.muted,
              marginBottom: 12,
            }}
          >
            Pricing
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 750,
              letterSpacing: "-0.05em",
              color: COLORS.text,
              lineHeight: 1.05,
              marginBottom: 16,
            }}
          >
            One activation.
            <br />
            Keep every dollar.
          </div>
          <div style={{ fontSize: 16, color: COLORS.muted, maxWidth: 620, lineHeight: 1.5 }}>
            No commission on sales. Activate once, then sell as much as you want.
          </div>

          <div
            style={{
              marginTop: 26,
              display: "flex",
              gap: 18,
              alignItems: "stretch",
              transform: `translateX(${x}px) translateY(${y}px)`,
            }}
          >
            <div
              style={{
                flex: 1,
                borderRadius: 18,
                border: `1px solid rgba(232, 232, 232, 0.92)`,
                background: COLORS.surface,
                padding: 24,
                boxShadow: "0 26px 62px rgba(20,20,20,0.07)",
              }}
            >
              <div style={{ fontSize: 14, color: COLORS.muted, marginBottom: 10 }}>
                One-time activation
              </div>
              <div style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.05em", color: COLORS.text }}>
                $9
              </div>
              <div style={{ marginTop: 10, fontSize: 14, color: COLORS.muted }}>
                Secure checkout (Stripe)
              </div>
            </div>

            <div
              style={{
                width: 340,
                borderRadius: 18,
                border: `1px solid rgba(232, 232, 232, 0.92)`,
                background: "#fafafa",
                padding: 22,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>
                What you don’t pay
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14, color: COLORS.muted }}>
                <div>0% commission</div>
                <div>No “seller fee” per listing</div>
                <div>No cut of your payout</div>
              </div>
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
