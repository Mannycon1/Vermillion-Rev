import {AbsoluteFill, Sequence, staticFile, useCurrentFrame, interpolate, Easing} from 'remotion';
import {Intro} from './Intro';
import {VideoSection} from './VideoSection';
import {Outro} from './Outro';

const INTRO_DURATION = 90; // 3 seconds
const VIDEO_DURATION = 210; // 7 seconds (matches source)
const OUTRO_DURATION = 90; // 3 seconds

export const FocacciaVideo = () => {
  return (
    <AbsoluteFill style={{backgroundColor: '#0a0a0a'}}>
      <Sequence from={0} durationInFrames={INTRO_DURATION}>
        <Intro />
      </Sequence>

      <Sequence from={INTRO_DURATION} durationInFrames={VIDEO_DURATION}>
        <VideoSection src={staticFile('focaccia.mp4')} />
      </Sequence>

      <Sequence from={INTRO_DURATION + VIDEO_DURATION} durationInFrames={OUTRO_DURATION}>
        <Outro />
      </Sequence>
    </AbsoluteFill>
  );
};
