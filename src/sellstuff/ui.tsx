import React from "react";
import { COLORS, MICRO } from "./constants";
import { inter } from "./font";

export const Wordmark: React.FC<{ size?: number }> = ({ size = 26 }) => (
  <span
    style={{
      fontFamily: inter,
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "0.04em",
      color: COLORS.text,
    }}
  >
    sellstuff
  </span>
);

export const MicroLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily: inter,
      ...MICRO,
      color: COLORS.muted,
      marginBottom: 10,
    }}
  >
    {children}
  </div>
);

const Arrow: React.FC = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    aria-hidden
    style={{ marginLeft: 6, flexShrink: 0 }}
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PrimaryButton: React.FC<{
  children: React.ReactNode;
  pulse?: number;
}> = ({ children, pulse = 1 }) => (
  <div
    style={{
      fontFamily: inter,
      fontWeight: 600,
      fontSize: 14,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 22px",
      borderRadius: 10,
      backgroundColor: COLORS.primary,
      color: COLORS.primaryLabel,
      transform: `scale(${pulse})`,
      boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    }}
  >
    {children}
    <Arrow />
  </div>
);

export const SecondaryButton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    style={{
      fontFamily: inter,
      fontWeight: 600,
      fontSize: 14,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "12px 22px",
      borderRadius: 10,
      backgroundColor: COLORS.surface,
      color: COLORS.text,
      border: `1px solid ${COLORS.border}`,
    }}
  >
    {children}
  </div>
);

export const BrowserChrome: React.FC<{ url?: string }> = ({
  url = "sellstuff.xyz",
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 10,
      padding: "10px 14px",
      borderBottom: `1px solid rgba(232, 232, 232, 0.85)`,
      background: COLORS.surface,
      borderRadius: "12px 12px 0 0",
    }}
  >
    <div style={{ display: "flex", gap: 6 }}>
      {["#e8e8e8", "#e8e8e8", "#e8e8e8"].map((c, i) => (
        <div
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: i === 0 ? "#e4e4e4" : "#ededed",
            border: `1px solid ${COLORS.border}`,
          }}
        />
      ))}
    </div>
    <div
      style={{
        flex: 1,
        textAlign: "center",
        fontFamily: inter,
        fontSize: 12,
        color: COLORS.muted,
      }}
    >
      {url}
    </div>
    <div style={{ width: 52 }} />
  </div>
);

export const hairlineBorder = (opacity = 0.5) =>
  `1px solid rgba(232, 232, 232, ${opacity})`;
