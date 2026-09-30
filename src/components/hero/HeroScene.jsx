import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { useMediaQuery } from "react-responsive";

import HeroExperience from "../HeroModels/HeroExperience.jsx";
import usePrefersReducedMotion from "../../lib/usePrefersReducedMotion";

/**
 * The hero's WebGL canvas.
 *
 * Framing was computed from the real bounding box of /models/two.glb
 * (min -4.72,-0.86,-4.68 → max 5.23,6.86,4.96, center 0.25,3.00,0.14):
 * a 20° elevated 3/4-ish view at ~17 units keeps the room dominant but
 * fully inside the frame, with a little room for the floating cards.
 */
const TARGET = [0.25, 2.5, 0.14];
const ELEVATION = (20 * Math.PI) / 180;
const AZIMUTH = (6 * Math.PI) / 180;
const DISTANCE_DESKTOP = 17;
const DISTANCE_MOBILE = 19;

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
        fov: 40,
        near: 0.5,
        far: 90,
      }}
      // lower DPR + no MSAA on phones; sharper rendering on desktop
      dpr={[1, isMobile ? 1.3 : 1.75]}
      gl={{
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
      }}
      role="img"
      aria-label="Interactive 3D view of my workspace"
    >
      <color attach="background" args={["#030303"]} />
      <fog attach="fog" args={["#040404", 20, 44]} />

      <Suspense fallback={null}>
        <HeroExperience
          base={cameraPositionFor(distance)}
          target={TARGET}
          isMobile={isMobile}
          reduced={reduced}
        />
      </Suspense>

      {/* Subtle bloom (monitor glow, red rim) + restrained vignette.
          Disabled on mobile for performance. */}
      {!isMobile && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.45}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.2}
            mipmapBlur
            radius={0.75}
          />
          <Vignette offset={0.26} darkness={0.72} />
        </EffectComposer>
      )}
    </Canvas>
  );
};

export default HeroScene;
