import {AbsoluteFill, useCurrentFrame, interpolate, Easing} from 'remotion';

export const Outro = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 30, 60, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [10, 40], [0, 80], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.ease),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0a0a0a',
        justifyContent: 'center',
        alignItems: 'center',
        opacity,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
        }}
      >
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
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#4a4540',
          }}
        >
          Aboitiz
        </span>
      </div>
    </AbsoluteFill>
  );
};
