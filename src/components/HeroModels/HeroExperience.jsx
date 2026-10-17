import { Two } from "./Two.jsx";
import HeroLights from "./HeroLights.jsx";
import CameraRig from "../hero/CameraRig.jsx";
import RuneCircle from "../hero/RuneCircle.jsx";
import EmberParticles from "../hero/EmberParticles.jsx";

/**
 * Everything that lives inside the hero Canvas.
 * The model itself (Two.jsx — low-poly isometric room) is untouched;
 * this component only decides how it is lit, framed and decorated.
 *
 * Atmosphere budget, tightened:
 *  - the rune dial is desktop-only. It is a frame for the room, and on a
 *    375px screen there is no room left to frame — there it was pure noise.
 *  - embers drop from 40 to 12 on mobile, and they are biased toward the
 *    edges of the scene volume so they surround the room instead of floating
 *    across it like a starfield.
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

      {/* the rune dial sits behind and around the room so the silhouette
          reads against it. Size/position defaults live in RuneCircle. */}
      {!isMobile && <RuneCircle reduced={reduced} />}

      <EmberParticles count={isMobile ? 12 : 40} reduced={reduced} />
    </>
  );
};

export default HeroExperience;
