import { Two } from "./Two.jsx";
import HeroLights from "./HeroLights.jsx";
import CameraRig from "../hero/CameraRig.jsx";
import RuneCircle from "../hero/RuneCircle.jsx";
import EmberParticles from "../hero/EmberParticles.jsx";

/**
 * Everything that lives inside the hero Canvas.
 * The model itself (Two.jsx — low-poly isometric room) is untouched;
 * this component only decides how it is lit, framed and decorated.
 */
const HeroExperience = ({
  base,
  target,
  isMobile = false,
  reduced = false,
}) => {
  return (
    <>
      <HeroLights intro={!reduced} />

      {/* subtle parallax + cinematic fly-in; never lets the user spin away */}
      <CameraRig
        base={base}
        target={target}
        enabled={!isMobile && !reduced}
        reduced={reduced}
      />

      {/* the existing 3D workspace — preserved as-is */}
      <Two />

      {/* atmosphere */}
      <RuneCircle reduced={reduced} />
      <EmberParticles count={isMobile ? 28 : 70} reduced={reduced} />
    </>
  );
};

export default HeroExperience;
