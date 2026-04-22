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
import { Cursor, MicroLabel } from "../ui";
import { inter } from "../font";

const durationInFrames = 300;

// Step windows (enter, hold, exit in frames)
const STEPS = [
  { start: 0, end: 95, label: "Step 1", title: "Snap & post." },
  { start: 95, end: 195, label: "Step 2", title: "Students see it." },
  { start: 195, end: 300, label: "Step 3", title: "Meet on campus." },
] as const;

const StepText: React.FC<{
  idx: number;
  frame: number;
  fps: number;
}> = ({ idx, frame, fps }) => {
  const { start, end, label, title } = STEPS[idx];
  const local = frame - start;
  const inS = spring({
    frame: Math.max(0, local),
    fps,
    config: { damping: 14, stiffness: 140 },
  });
  const outBegin = end - start - 18;
  const outT = interpolate(local, [outBegin, end - start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const opacity = interpolate(inS, [0, 1], [0, 1]) * (1 - outT);
  const x = interpolate(inS, [0, 1], [-40, 0]) + outT * -40;

  if (frame < start || frame > end) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 96,
        left: 72,
        width: 520,
        opacity,
        transform: `translateX(${x}px)`,
      }}
    >
      <div
        style={{
          fontSize: 12,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: COLORS.muted,
          fontWeight: 700,
          marginBottom: 16,
        }}
      >
        {label} · of 3
      </div>
      <div
        style={{
          fontSize: 68,
          fontWeight: 900,
          letterSpacing: "-0.05em",
          color: COLORS.text,
          lineHeight: 0.98,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// STEP 1 VISUAL — photo upload + auto-fill
const Step1Visual: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const start = STEPS[0].start;
  const local = frame - start;
  const panelS = spring({
    frame: Math.max(0, local - 4),
    fps,
    config: { damping: 14, stiffness: 130 },
  });
  const panelOpacity = interpolate(panelS, [0, 1], [0, 1]);
  const panelY = interpolate(panelS, [0, 1], [18, 0]);

  // Photo uploads at t=18f
  const photoS = spring({
    frame: Math.max(0, local - 18),
    fps,
    config: { damping: 12, stiffness: 140 },
  });
  const photoScale = interpolate(photoS, [0, 1], [0.6, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const photoOpacity = interpolate(photoS, [0, 1], [0, 1]);

  // Title/price typed after
  const titleChars = Math.floor(
    interpolate(local, [40, 56], [0, "Mini fridge".length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const priceChars = Math.floor(
    interpolate(local, [58, 70], [0, 3], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  // Cursor movement
  const cursorX = interpolate(local, [0, 20, 40, 60, 80], [780, 460, 300, 380, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorY = interpolate(local, [0, 20, 40, 60, 80], [430, 300, 440, 510, 560], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursorOpacity = interpolate(local, [0, 8, 80, 95], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const outT = interpolate(local, [STEPS[0].end - 18, STEPS[0].end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 64,
        top: 48,
        width: 440,
        height: 560,
        opacity: panelOpacity * (1 - outT),
        transform: `translateY(${panelY + outT * -20}px)`,
      }}
    >
      <div
        style={{
          background: COLORS.surface,
          borderRadius: 18,
          border: `1px solid ${COLORS.border}`,
          padding: 20,
          boxShadow: "0 30px 70px rgba(20,20,20,0.10)",
          height: "100%",
        }}
      >
        <div style={{ fontSize: 12, color: COLORS.muted, marginBottom: 10 }}>
          New listing
        </div>
        <div
          style={{
            height: 240,
            borderRadius: 12,
            background: "#f5f5f5",
            border: `1px dashed ${COLORS.border}`,
            overflow: "hidden",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {photoOpacity > 0 && (
            <Img
              src={staticFile(LISTING_IMAGES.minifridge)}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 40%",
                opacity: photoOpacity,
                transform: `scale(${photoScale})`,
              }}
            />
          )}
          {photoOpacity < 0.2 && (
            <div style={{ color: COLORS.muted, fontSize: 13 }}>
              Drop a photo
            </div>
          )}
        </div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>
          Title
        </div>
        <div
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.text,
            background: "#fafafa",
            marginBottom: 12,
            minHeight: 44,
          }}
        >
          {"Mini fridge".slice(0, titleChars)}
          {titleChars < "Mini fridge".length && titleChars > 0 ? (
            <span style={{ opacity: (frame % 16) < 8 ? 1 : 0 }}>▍</span>
          ) : null}
        </div>
        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 6 }}>
          Price
        </div>
        <div
          style={{
            border: `1px solid ${COLORS.border}`,
            borderRadius: 10,
            padding: "12px 14px",
            fontSize: 16,
            fontWeight: 700,
            color: COLORS.text,
            background: "#fafafa",
            minHeight: 44,
          }}
        >
          {"$80".slice(0, priceChars)}
          {priceChars > 0 && priceChars < 3 ? (
            <span style={{ opacity: (frame % 16) < 8 ? 1 : 0 }}>▍</span>
          ) : null}
        </div>
      </div>

      {cursorOpacity > 0 && (
        <Cursor
          x={cursorX - 60}
          y={cursorY - 48}
          opacity={cursorOpacity}
        />
      )}
    </div>
  );
};

// STEP 2 VISUAL — listings popping into a grid
const Step2Visual: React.FC<{ frame: number; fps: number }> = ({ frame }) => {
  const start = STEPS[1].start;
  const local = frame - start;

  const items = [
    { src: LISTING_IMAGES.desk, title: "Dorm desk", price: "$45" },
    { src: LISTING_IMAGES.minifridge, title: "Mini fridge", price: "$80" },
    { src: LISTING_IMAGES.microwave, title: "Microwave", price: "$25" },
    { src: LISTING_IMAGES.bookshelf, title: "Bookshelf", price: "$35" },
  ];

  const outT = interpolate(local, [STEPS[1].end - STEPS[1].start - 18, STEPS[1].end - STEPS[1].start], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        position: "absolute",
        right: 64,
        top: 48,
        width: 440,
        height: 560,
        opacity: interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" }) * (1 - outT),
        transform: `translateY(${outT * -20}px)`,
      }}
    >
      <div
        style={{
          background: COLORS.surface,
          borderRadius: 18,
          border: `1px solid ${COLORS.border}`,
          padding: 14,
          boxShadow: "0 30px 70px rgba(20,20,20,0.10)",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          alignContent: "start",
        }}
      >
        {items.map((it, i) => {
          const pop = interpolate(local, [10 + i * 14, 24 + i * 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={it.title}
              style={{
                borderRadius: 12,
                border: `1px solid ${COLORS.border}`,
                background: COLORS.surface,
                overflow: "hidden",
                opacity: pop,
                transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])}) translateY(${interpolate(
                  pop,
                  [0, 1],
                  [16, 0],
                )}px)`,
              }}
            >
              <div style={{ aspectRatio: "4 / 3", background: "#f5f5f5" }}>
                <Img
                  src={staticFile(it.src)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
              <div style={{ padding: "10px 12px 12px" }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: COLORS.text,
                    letterSpacing: "-0.01em",
                    marginBottom: 3,
                  }}
                >
                  {it.title}
                </div>
                <div style={{ fontSize: 12, color: COLORS.muted }}>
                  <span style={{ color: COLORS.text, fontWeight: 700 }}>{it.price}</span>{" "}
                  · Nearby
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* "new" ping */}
      {local > 40 && local < 80 && (
        <div
          style={{
            position: "absolute",
            top: -8,
            right: -8,
            background: "#141414",
            color: "#fff",
            fontSize: 11,
            padding: "6px 10px",
            borderRadius: 999,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            transform: `scale(${interpolate(local, [40, 50, 74, 80], [0, 1, 1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
          }}
        >
          + 4 new
        </div>
      )}
    </div>
  );
};

// STEP 3 VISUAL — chat + pickup confirm
const Step3Visual: React.FC<{ frame: number }> = ({ frame }) => {
  const start = STEPS[2].start;
  const local = frame - start;

  const chats = [
    { t: "Is this still available?", side: "l", at: 10 },
    { t: "Yes! Library at 3?", side: "r", at: 30 },
    { t: "Perfect — see you there 🤝", side: "l", at: 52 },
  ] as const;

  return (
    <div
      style={{
        position: "absolute",
        right: 64,
        top: 48,
        width: 440,
        height: 560,
        opacity: interpolate(local, [0, 12], [0, 1], { extrapolateRight: "clamp" }),
      }}
    >
      <div
        style={{
          background: COLORS.surface,
          borderRadius: 18,
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 30px 70px rgba(20,20,20,0.10)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "14px 18px",
            borderBottom: `1px solid ${COLORS.border}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 999,
              background: "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            JS
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: COLORS.text }}>
              Jamie S.
            </div>
            <div style={{ fontSize: 11, color: COLORS.muted }}>
              Verified · CU Boulder
            </div>
          </div>
        </div>
        <div
          style={{
            flex: 1,
            padding: 18,
            display: "flex",
            flexDirection: "column",
            gap: 10,
            justifyContent: "flex-end",
          }}
        >
          {chats.map((c, i) => {
            const s = interpolate(local, [c.at, c.at + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const isR = c.side === "r";
            return (
              <div
                key={i}
                style={{
                  alignSelf: isR ? "flex-end" : "flex-start",
                  background: isR ? "#141414" : "#efefef",
                  color: isR ? "#fff" : COLORS.text,
                  fontSize: 15,
                  padding: "10px 14px",
                  borderRadius: 16,
                  borderTopLeftRadius: isR ? 16 : 4,
                  borderTopRightRadius: isR ? 4 : 16,
                  maxWidth: "82%",
                  opacity: s,
                  transform: `translateY(${interpolate(s, [0, 1], [8, 0])}px)`,
                  fontWeight: 500,
                }}
              >
                {c.t}
              </div>
            );
          })}
        </div>

        {/* "sold" stamp */}
        {local > 74 && (
          <div
            style={{
              margin: 18,
              padding: "14px 16px",
              borderRadius: 12,
              background: "#ecfdf5",
              border: "1px solid #a7f3d0",
              color: "#065f46",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
              opacity: interpolate(local, [74, 88], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              transform: `scale(${interpolate(local, [74, 88], [0.94, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })})`,
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                background: "#065f46",
                color: "#fff",
                fontSize: 13,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✓
            </span>
            Sold · picked up on campus
          </div>
        )}
      </div>
    </div>
  );
};

// Step dots indicator
const StepDots: React.FC<{ frame: number }> = ({ frame }) => {
  const active = STEPS.findIndex((s) => frame >= s.start && frame < s.end);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        left: 72,
        display: "flex",
        gap: 10,
        alignItems: "center",
      }}
    >
      {STEPS.map((_, i) => (
        <div
          key={i}
          style={{
            width: i === active ? 36 : 10,
            height: 10,
            borderRadius: 999,
            background: i <= active ? COLORS.text : COLORS.border,
          }}
        />
      ))}
    </div>
  );
};

export const Scene4: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const activeIdx = STEPS.findIndex((s) => frame >= s.start && frame < s.end);

  const headIn = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 160 },
  });

  return (
    <SceneFrame durationInFrames={durationInFrames}>
      <AbsoluteFill style={{ backgroundColor: COLORS.bg, fontFamily: inter }}>
        <div
          style={{
            position: "absolute",
            top: 40,
            left: 72,
            opacity: interpolate(headIn, [0, 1], [0, 1]),
            transform: `translateY(${interpolate(headIn, [0, 1], [-6, 0])}px)`,
          }}
        >
          <MicroLabel>How it works</MicroLabel>
        </div>

        {STEPS.map((_, i) => (
          <StepText key={i} idx={i} frame={frame} fps={fps} />
        ))}

        {activeIdx === 0 && <Step1Visual frame={frame} fps={fps} />}
        {activeIdx === 1 && <Step2Visual frame={frame} fps={fps} />}
        {activeIdx === 2 && <Step3Visual frame={frame} />}

        <StepDots frame={frame} />
      </AbsoluteFill>
    </SceneFrame>
  );
};
