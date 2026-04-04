import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { TOTAL_FRAMES, HEIGHT, WIDTH } from "./sellstuff/constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Sellstuff"
        component={MyComposition}
        durationInFrames={TOTAL_FRAMES}
        fps={30}
        width={WIDTH}
        height={HEIGHT}
      />
    </>
  );
};
