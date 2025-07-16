import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";

import { Two } from "./Two.jsx";
import HeroLights from "./HeroLights";
import Particles from "./Particles";
import { Suspense } from "react";

const HeroExperience = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <Canvas camera={{ position: [0, 4, 10], fov: 45 }}>
      {/* deep blue ambient */}
      <ambientLight intensity={0.2} color="#1a1a40" />
      {/* Configure OrbitControls to disable panning and control zoom based on device type */}
      <OrbitControls
        enablePan={false} // Prevents panning of the scene
        enableZoom={!isTablet} // Disables zoom on tablets
        maxDistance={40} // Maximum distance for zooming out
        minDistance={20} // Minimum distance for zooming in
        minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
        maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
      />

      <Suspense fallback={null}>
        <HeroLights />
        <Particles count={100} />
        <group
          scale={isMobile ? 0.2 : 0.8}
          position={[10, -4, 0]}
          rotation={[0, -Math.PI / 7, 0]}
        ></group>
      </Suspense>
      <Two />
    </Canvas>
  );
};

export default HeroExperience;
