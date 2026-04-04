import React from "react";
import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { MicroLabel } from "../ui";
import { inter } from "../font";

export const Scene2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 150;

  const stagger = (offset: number) =>
    spring({
      frame: Math.max(0, frame - offset),
      fps,
      config: { damping: 14, stiffness: 140 },
    });

  const a = stagger(0);
  const tTrusted = stagger(Math.round(0.12 * fps));
  const b = stagger(Math.round(0.22 * fps));
  const c = stagger(Math.round(0.4 * fps));
  const d0 = stagger(Math.round(0.54 * fps));
  const d1 = stagger(Math.round(0.64 * fps));
  const d2 = stagger(Math.round(0.74 * fps));

  const fs = (t: number) => ({
    opacity: interpolate(t, [0, 1], [0, 1]),
    transform: `scale(${interpolate(t, [0, 1], [0.94, 1])})`,
  });

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 56,
            gap: 36,
          }}
        >
          <div
            style={{
              flex: 1,
              maxWidth: 420,
              borderRadius: 14,
              border: `1px solid rgba(232, 232, 232, 0.85)`,
              background: COLORS.surface,
              padding: 28,
              ...fs(a),
            }}
          >
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 16,
                color: COLORS.text,
              }}
            >
              Create account
            </div>
            <div
              style={{
                fontSize: 12,
                color: COLORS.muted,
                marginBottom: 8,
              }}
            >
              School email
            </div>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                border: `1px solid ${COLORS.border}`,
                fontSize: 14,
                color: COLORS.text,
              }}
            >
              alex.university.edu
            </div>
          </div>

          <div
            style={{
              flex: 1,
              maxWidth: 420,
              borderRadius: 14,
              border: `1px solid rgba(232, 232, 232, 0.85)`,
              background: COLORS.surface,
              padding: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              ...fs(b),
            }}
          >
            <div
              style={{
                alignSelf: "stretch",
                textAlign: "center",
                marginBottom: 14,
                opacity: interpolate(tTrusted, [0, 1], [0, 1]),
                transform: `scale(${interpolate(tTrusted, [0, 1], [0.94, 1])})`,
              }}
            >
              <MicroLabel>Trusted</MicroLabel>
            </div>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                border: `1px solid rgba(232, 232, 232, 0.9)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 20,
                background: "#fafafa",
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3l7 4v5c0 5-3.5 9-7 10-3.5-1-7-5-7-10V7l7-4z"
                  stroke={COLORS.text}
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M9 12l2 2 4-4"
                  stroke={COLORS.text}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                color: COLORS.text,
                marginBottom: 18,
                lineHeight: 1.25,
                opacity: interpolate(c, [0, 1], [0, 1]),
                transform: `scale(${interpolate(c, [0, 1], [0.96, 1])})`,
              }}
            >
              Real students. Real campus deals.
            </div>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                textAlign: "left",
                width: "100%",
                fontSize: 13,
                color: COLORS.muted,
                lineHeight: 2,
              }}
            >
              {[
                { line: ".edu verification", t: d0 },
                { line: "peer-to-peer", t: d1 },
                { line: "no corporate middleman", t: d2 },
              ].map(({ line, t }) => (
                <li
                  key={line}
                  style={{
                    paddingLeft: 18,
                    position: "relative",
                    opacity: interpolate(t, [0, 1], [0, 1]),
                    transform: `translateY(${interpolate(t, [0, 1], [8, 0])}px)`,
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: "0.55em",
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: COLORS.border,
                    }}
                  />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
