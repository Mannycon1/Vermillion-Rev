import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';

export const Intro = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const titleY = interpolate(frame, [0, 30], [20, 0], {
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const lineWidth = interpolate(frame, [15, 45], [0, 120], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  const subtitleOpacity = interpolate(frame, [25, 45, 60, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 20,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
        }}
      >
        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 14,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#8a7f72',
            opacity: subtitleOpacity,
          }}
        >
          Aboitiz
        </span>

        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 72,
            fontWeight: 400,
            letterSpacing: '0.08em',
            color: '#e8e0d4',
            margin: 0,
          }}
        >
          Focaccia
        </h1>

        <div
          style={{
            width: lineWidth,
            height: 1,
            backgroundColor: '#8a7f72',
          }}
        />

        <span
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 13,
            letterSpacing: '0.2em',
            color: '#4a4540',
            textTransform: 'uppercase',
            opacity: subtitleOpacity,
          }}
        >
          A Culinary Film
        </span>
      </div>
    </AbsoluteFill>
  );
};
