import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Video,
  staticFile,
  Sequence,
} from "remotion";

export const FocacciaVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // === PHASE 1: Video/Bread appears BIG then shrinks (frames 0-90) ===
  const videoEntryOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Video starts huge (3.5x) filling the screen, then shrinks to fit in the wrapper
  const videoScale = interpolate(
    frame,
    [0, 15, 90],
    [3.5, 3.2, 1.0],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Video moves from center to slightly above center as it shrinks
  const videoY = interpolate(
    frame,
    [0, 90, 120],
    [0, -40, -40],
    {
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    }
  );

  // Border radius animates in as video settles
  const videoBorderRadius = interpolate(
    frame,
    [0, 90],
    [0, 4],
    {
      extrapolateRight: "clamp",
    }
  );

  // === PHASE 2: Title appears (frames 70-100) ===
  const titleOpacity = interpolate(frame, [70, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [70, 95], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // === PHASE 3: Label and footer fade in (frames 85-130) ===
  const labelOpacity = interpolate(frame, [85, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const footerOpacity = interpolate(frame, [105, 130], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === PHASE 4: Decorative line expands (frames 95-135) ===
  const lineWidth = interpolate(frame, [95, 135], [0, 200], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // === PHASE 5: Box shadow fades in as video settles ===
  const shadowOpacity = interpolate(frame, [60, 100], [0, 0.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // === PHASE 6: End fade out (last 30 frames) ===
  const endFade = interpolate(
    frame,
    [durationInFrames - 30, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  // Subtle background grain animation
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
      {/* Subtle radial gradient background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, rgba(60, 45, 25, 0.3) 0%, rgba(10, 10, 10, 1) 70%)",
        }}
      />

      {/* Film grain overlay */}
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

      {/* Content container */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
          width: "100%",
          maxWidth: 960,
          padding: "40px 24px",
        }}
      >
        {/* Top label */}
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

        {/* Video wrapper with scale animation - bread appears BIG then shrinks */}
        <div
          style={{
            transform: `translateY(${videoY}px) scale(${videoScale})`,
            opacity: videoEntryOpacity,
            width: "100%",
            borderRadius: videoBorderRadius,
            overflow: "hidden",
            boxShadow: `0 20px 60px rgba(0, 0, 0, ${shadowOpacity})`,
            background: "#111",
          }}
        >
          <Video
            src={staticFile("C0036_-_VIDEO_ABOITIZ_FOCCACIA.MP4")}
            style={{
              width: "100%",
              display: "block",
              objectFit: "contain",
              background: "#000",
            }}
            muted
          />
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: lineWidth,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, #8a7f72, transparent)",
            opacity: 0.5,
          }}
        />

        {/* Title */}
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

        {/* Footer */}
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
