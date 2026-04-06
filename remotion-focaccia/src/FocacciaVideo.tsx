import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

const FocacciaBread: React.FC<{ scale: number; opacity: number }> = ({
  scale,
  opacity,
}) => {
  return (
    <div
      style={{
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <svg
        width="400"
        height="280"
        viewBox="0 0 400 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Bread base */}
        <ellipse cx="200" cy="150" rx="180" ry="110" fill="#C8943E" />
        <ellipse cx="200" cy="145" rx="175" ry="105" fill="#D4A54A" />
        {/* Top crust highlight */}
        <ellipse cx="200" cy="135" rx="165" ry="95" fill="#DCBA6A" />
        {/* Olive oil dimples */}
        <ellipse cx="130" cy="120" rx="18" ry="14" fill="#C8943E" opacity="0.6" />
        <ellipse cx="200" cy="100" rx="15" ry="12" fill="#C8943E" opacity="0.5" />
        <ellipse cx="270" cy="125" rx="20" ry="13" fill="#C8943E" opacity="0.6" />
        <ellipse cx="160" cy="160" rx="16" ry="11" fill="#C8943E" opacity="0.5" />
        <ellipse cx="240" cy="155" rx="17" ry="12" fill="#C8943E" opacity="0.55" />
        <ellipse cx="185" cy="130" rx="12" ry="10" fill="#C8943E" opacity="0.45" />
        <ellipse cx="295" cy="160" rx="13" ry="10" fill="#C8943E" opacity="0.5" />
        <ellipse cx="110" cy="155" rx="14" ry="11" fill="#C8943E" opacity="0.5" />
        {/* Rosemary sprigs */}
        <g opacity="0.85">
          <line x1="140" y1="108" x2="175" y2="95" stroke="#5A7A3A" strokeWidth="2" />
          <ellipse cx="150" cy="104" rx="5" ry="2.5" fill="#6B8C4A" transform="rotate(-20 150 104)" />
          <ellipse cx="158" cy="101" rx="5" ry="2.5" fill="#6B8C4A" transform="rotate(-15 158 101)" />
          <ellipse cx="166" cy="97" rx="5" ry="2.5" fill="#6B8C4A" transform="rotate(-20 166 97)" />
        </g>
        <g opacity="0.85">
          <line x1="230" y1="140" x2="265" y2="128" stroke="#5A7A3A" strokeWidth="2" />
          <ellipse cx="240" cy="137" rx="5" ry="2.5" fill="#6B8C4A" transform="rotate(-15 240 137)" />
          <ellipse cx="248" cy="134" rx="5" ry="2.5" fill="#6B8C4A" transform="rotate(-10 248 134)" />
          <ellipse cx="256" cy="131" rx="5" ry="2.5" fill="#6B8C4A" transform="rotate(-15 256 131)" />
        </g>
        {/* Sea salt flakes */}
        <circle cx="155" cy="140" r="2" fill="#F0EDE8" opacity="0.7" />
        <circle cx="210" cy="115" r="1.5" fill="#F0EDE8" opacity="0.6" />
        <circle cx="250" cy="145" r="2" fill="#F0EDE8" opacity="0.7" />
        <circle cx="175" cy="105" r="1.5" fill="#F0EDE8" opacity="0.65" />
        <circle cx="280" cy="140" r="1.8" fill="#F0EDE8" opacity="0.6" />
        <circle cx="125" cy="140" r="1.5" fill="#F0EDE8" opacity="0.65" />
        <circle cx="220" cy="165" r="2" fill="#F0EDE8" opacity="0.6" />
        {/* Shadow */}
        <ellipse cx="200" cy="245" rx="160" ry="20" fill="#000" opacity="0.2" />
      </svg>
    </div>
  );
};

export const FocacciaVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // === PHASE 1: Bread appears BIG then shrinks (frames 0-90) ===
  const breadEntryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  const breadScale = interpolate(frame, [0, 15, 90], [3.5, 3.2, 1.0], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  const breadY = interpolate(frame, [0, 90, 120], [0, -80, -80], {
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // === PHASE 2: Title appears (frames 60-85) ===
  const titleOpacity = interpolate(frame, [60, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [60, 85], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // === PHASE 3: Label and footer fade in ===
  const labelOpacity = interpolate(frame, [80, 105], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footerOpacity = interpolate(frame, [100, 125], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === PHASE 4: Glow pulse after settled ===
  const glowOpacity =
    frame > 120
      ? interpolate(Math.sin((frame - 120) * 0.05), [-1, 1], [0.0, 0.15], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  // === PHASE 5: Decorative line expands ===
  const lineWidth = interpolate(frame, [90, 130], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // === PHASE 6: End fade out ===
  const endFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const grainSeed = Math.floor(frame / 2);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        opacity: endFade,
      }}
    >
      {/* Radial gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(60, 45, 25, 0.3) 0%, rgba(10, 10, 10, 1) 70%)",
        }}
      />

      {/* Film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' seed='${grainSeed}' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          mixBlendMode: "overlay",
          zIndex: 10,
          pointerEvents: "none" as const,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        <span
          style={{
            fontSize: 14,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: "#8a7f72",
            opacity: labelOpacity,
          }}
        >
          Video
        </span>

        {/* Bread with scale animation */}
        <div style={{ transform: `translateY(${breadY}px)`, position: "relative" }}>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 500 * breadScale,
              height: 350 * breadScale,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(200, 148, 62, 0.15) 0%, transparent 70%)",
              opacity: glowOpacity + breadEntryOpacity * 0.3,
              filter: "blur(30px)",
            }}
          />
          <FocacciaBread scale={breadScale} opacity={breadEntryOpacity} />
        </div>

        <div
          style={{
            width: lineWidth,
            height: 1,
            background: "linear-gradient(90deg, transparent, #8a7f72, transparent)",
            opacity: 0.5,
          }}
        />

        <h1
          style={{
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "#e8e0d4",
            textAlign: "center" as const,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            margin: 0,
          }}
        >
          Aboitiz &mdash; Focaccia
        </h1>

        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.2em",
            color: "#4a4540",
            textTransform: "uppercase" as const,
            opacity: footerOpacity,
          }}
        >
          Artisan Bread &bull; Crafted with Care
        </span>
      </div>
    </AbsoluteFill>
  );
};
