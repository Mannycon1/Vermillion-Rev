import {Composition} from 'remotion';
import {FocacciaVideo} from './FocacciaVideo';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FocacciaVideo"
        component={FocacciaVideo}
        durationInFrames={390}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
