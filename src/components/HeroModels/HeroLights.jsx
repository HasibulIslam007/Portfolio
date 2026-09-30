import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Cinematic black/red lighting for the workspace:
 *  - dim neutral key from the front-top
 *  - deep red rim from behind-left + red floor wash ("soft red ambient glow")
 *  - monitor + desk-lamp practicals so the screens read as light sources
 *
 * `intro` ramps the rig alive between 0.2s and 1.1s after the scene starts
 * (spec §14). Once settled, useFrame stops touching the lights.
 */

const KEY_INTENSITY = 320;
const RIM_INTENSITY = 300;
const WASH_INTENSITY = 70;
const UNDERGLOW_INTENSITY = 55;
const SCREEN_INTENSITY = 24;
const LAMP_INTENSITY = 14;

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

const HeroLights = ({ intro = true }) => {
  const keyRef = useRef(null);
  const rimRef = useRef(null);
  const washRef = useRef(null);
  const underglowRef = useRef(null);
  const screenRef = useRef(null);
  const lampRef = useRef(null);
  const settled = useRef(false);

  useFrame((state) => {
    if (!intro || settled.current) return;

    const time = state.clock.elapsedTime;
    // neutral key fades in 0.0s → 0.8s, red rig comes alive 0.2s → 1.1s
    const keyProgress = easeOutCubic(clamp01(time / 0.8));
    const redProgress = easeOutCubic(clamp01((time - 0.2) / 0.9));

    if (keyRef.current) keyRef.current.intensity = KEY_INTENSITY * keyProgress;
    if (rimRef.current) rimRef.current.intensity = RIM_INTENSITY * redProgress;
    if (washRef.current) washRef.current.intensity = WASH_INTENSITY * redProgress;
    if (underglowRef.current)
      underglowRef.current.intensity = UNDERGLOW_INTENSITY * redProgress;
    if (screenRef.current)
      screenRef.current.intensity = SCREEN_INTENSITY * redProgress;
    if (lampRef.current) lampRef.current.intensity = LAMP_INTENSITY * redProgress;

    if (time > 1.4) settled.current = true;
  });

  const initial = intro ? 0 : 1;

  return (
    <>
      {/* near-black ambient with the faintest red cast */}
      <ambientLight intensity={0.22} color="#1c070b" />

      {/* neutral key — keeps materials readable */}
      <spotLight
        ref={keyRef}
        position={[7, 11, 8]}
        angle={0.6}
        penumbra={0.85}
        decay={2}
        intensity={KEY_INTENSITY * initial}
        color="#ffeceb"
      />

      {/* deep red rim from behind-left */}
      <spotLight
        ref={rimRef}
        position={[-9, 7, -7]}
        angle={0.8}
        penumbra={1}
        decay={2}
        intensity={RIM_INTENSITY * initial}
        color="#ff2638"
      />

      {/* red wash on the back wall */}
      <pointLight
        ref={washRef}
        position={[1.5, 4.5, -3.4]}
        decay={2}
        distance={14}
        intensity={WASH_INTENSITY * initial}
        color="#7a1018"
      />

      {/* soft red ambient glow near the front floor */}
      <pointLight
        ref={underglowRef}
        position={[0, 0.6, 5]}
        decay={2}
        distance={11}
        intensity={UNDERGLOW_INTENSITY * initial}
        color="#7a1018"
      />

      {/* monitor practical (cool white) */}
      <pointLight
        ref={screenRef}
        position={[-3.3, 2.7, -0.4]}
        decay={2}
        distance={7}
        intensity={SCREEN_INTENSITY * initial}
        color="#dbe4f2"
      />

      {/* desk lamp practical (warm red) */}
      <pointLight
        ref={lampRef}
        position={[0.3, 1.4, -3]}
        decay={2}
        distance={5}
        intensity={LAMP_INTENSITY * initial}
        color="#ff5a3c"
      />
    </>
  );
};

export default HeroLights;
