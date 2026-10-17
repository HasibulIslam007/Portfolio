import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

import HeroExperience from "../HeroModels/HeroExperience.jsx";
import usePrefersReducedMotion from "../../lib/usePrefersReducedMotion";

/**
 * The hero's WebGL canvas.
 *
 * THE RECTANGLE PROBLEM.
 * An opaque canvas always reads as a pasted-on "3D viewer" rectangle: the eye
 * finds its four straight edges long before it reads the room. The fix is to
 * stop fighting that with darker overlay gradients (which only ever produced a
 * visible seam) and instead remove the edges entirely —
 *   1. `alpha: true` + a transparent clear colour, so the canvas never paints
 *      a background of its own; the page's atmosphere shows through.
 *   2. An elliptical `mask-image` on `.hero-stage` (see index.css), which
 *      feathers all four sides at once. There is no straight edge left to see.
 * The room itself is unchanged — only what surrounds and frames it.
 *
 * FRAMING.
 * Computed from the real bounding box of /models/two.glb
 * (min -4.72,-0.86,-4.68 → max 5.23,6.86,4.96). The lens is a 36° at a 20°
 * elevation, raised to look at y=2.90 instead of 2.50 and pulled from 19.5 to
 * 18.6. Against the taller stage that takes frame fill from 127%×88% to
 * 135%×94% at 1440 (87%×82% → 92%×86% when stacked at 768) while the frame
 * centre drops from -0.09 to -0.17 — i.e. the room is larger AND sits lower,
 * which is what closes the dead band under the stage.
 *
 * `(AABB)` fill runs above 100% on the narrow desktop column by design: the
 * room is an isometric cutaway whose axis-aligned box overshoots the actual
 * silhouette, so the small edge bleed reads as deliberate cinematic cropping.
 * The bed, desk, monitor and window all stay readable in that range.
 *
 * POST.
 * Bloom/vignette were removed. With a transparent canvas the composer's final
 * pass has to re-blit an opaque quad, which reinstates exactly the rectangle
 * this file exists to delete. The same atmosphere is now painted in CSS
 * (`.hero-spill`, `.hero-vignette`) at zero GPU cost, which also buys back the
 * frame time the composer was spending.
 */
const TARGET = [0.25, 2.9, 0.14];
const ELEVATION = (20 * Math.PI) / 180;
const AZIMUTH = (6 * Math.PI) / 180;
const FOV = 36;
const DISTANCE_DESKTOP = 18.6;
const DISTANCE_MOBILE = 21;

const cameraPositionFor = (distance) => [
  TARGET[0] + distance * Math.sin(AZIMUTH) * Math.cos(ELEVATION),
  TARGET[1] + distance * Math.sin(ELEVATION),
  TARGET[2] + distance * Math.cos(AZIMUTH) * Math.cos(ELEVATION),
];

const HeroScene = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const reduced = usePrefersReducedMotion();

  const distance = isMobile ? DISTANCE_MOBILE : DISTANCE_DESKTOP;

  return (
    <Canvas
      camera={{
        position: cameraPositionFor(distance),
        fov: FOV,
        near: 0.5,
        far: 90,
      }}
      // lower DPR + no MSAA on phones; sharper rendering on desktop
      dpr={[1, isMobile ? 1.3 : 1.75]}
      // Transparent, so the page's atmosphere is what sits behind the room.
      gl={{
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      role="img"
      aria-label="Interactive 3D view of my workspace"
    >
      {/* Fog tinted to the page background (#050406) rather than to a canvas
          colour. Distant geometry therefore dissolves into exactly the tone the
          CSS backdrop paints behind it, so the two never disagree. */}
      <fog attach="fog" args={["#050406", 15, 38]} />

      <Suspense fallback={null}>
        <HeroExperience
          base={cameraPositionFor(distance)}
          target={TARGET}
          isMobile={isMobile}
          reduced={reduced}
        />
      </Suspense>
    </Canvas>
  );
};

export default HeroScene;
