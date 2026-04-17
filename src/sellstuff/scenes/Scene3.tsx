import React from "react";
import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, LISTING_IMAGES } from "../constants";
import { SceneFrame } from "../SceneFrame";
import { BrowserChrome, MicroLabel } from "../ui";
import { inter } from "../font";

const listings = [
  { title: "Dorm desk", price: "$45", cond: "Good", src: LISTING_IMAGES.desk },
  { title: "Mini fridge", price: "$80", cond: "Like New", src: LISTING_IMAGES.minifridge },
  { title: "Microwave", price: "$25", cond: "Good", src: LISTING_IMAGES.microwave },
  { title: "Bookshelf", price: "$35", cond: "Good", src: LISTING_IMAGES.bookshelf },
] as const;

export const Scene3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 95;

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 120 } });
  const windowY = interpolate(enter, [0, 1], [18, 0]);
  const focus = 1;
  const pulse = interpolate(Math.sin(frame / 10), [-1, 1], [1, 1.02]);

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            padding: "28px 56px 32px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <div>
            <MicroLabel>Browse</MicroLabel>
            <div
              style={{
                fontSize: 36,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                color: COLORS.text,
                lineHeight: 1.1,
              }}
            >
              See what&rsquo;s for sale near you.
            </div>
          </div>

          <div
            style={{
              borderRadius: 14,
              border: `1px solid rgba(232, 232, 232, 0.9)`,
              background: COLORS.surface,
              boxShadow: "0 24px 60px rgba(20,20,20,0.07)",
              overflow: "hidden",
              transform: `translateY(${windowY}px)`,
            }}
          >
            <BrowserChrome />
            <div
              style={{
                padding: 16,
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 14,
              }}
            >
              {listings.map((item, i) => {
                const isFocus = i === focus;
                return (
                  <div
                    key={item.title}
                    style={{
                      borderRadius: 12,
                      border: `1px solid rgba(232, 232, 232, 0.85)`,
                      background: COLORS.surface,
                      overflow: "hidden",
                      transform: isFocus ? `scale(${pulse})` : "scale(1)",
                      boxShadow: isFocus
                        ? "0 18px 40px rgba(20,20,20,0.10)"
                        : "0 2px 10px rgba(20,20,20,0.04)",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "4 / 3",
                        background: "#f5f5f5",
                        borderBottom: `1px solid rgba(232, 232, 232, 0.75)`,
                        overflow: "hidden",
                      }}
                    >
                      <Img
                        src={staticFile(item.src)}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                    </div>
                    <div style={{ padding: "12px 14px 14px" }}>
                      <div
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          color: COLORS.text,
                          marginBottom: 6,
                          letterSpacing: "-0.02em",
                          lineHeight: 1.25,
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: 13,
                          color: COLORS.muted,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                        }}
                      >
                        <span style={{ fontWeight: 700, color: COLORS.text }}>
                          {item.price}
                        </span>
                        <span>{item.cond}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </SceneFrame>
  );
};
