import {AbsoluteFill, Video, useCurrentFrame, interpolate, Easing} from 'remotion';

export const VideoSection: React.FC<{src: string}> = ({src}) => {
  const frame = useCurrentFrame();
  const totalFrames = 270;

  // Fade in from black
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Fade out to black
  const fadeOut = interpolate(frame, [totalFrames - 30, totalFrames], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(fadeIn, fadeOut);

  // Subtle slow zoom (Ken Burns)
  const scale = interpolate(frame, [0, totalFrames], [1.0, 1.05], {
    easing: Easing.linear,
  });

  return (
    <AbsoluteFill style={{backgroundColor: '#0a0a0a'}}>
      <AbsoluteFill
        style={{
          opacity,
          transform: `scale(${scale})`,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Video
          src={src}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
