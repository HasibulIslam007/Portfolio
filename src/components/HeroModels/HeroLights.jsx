import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

/**
 * Cinematic dark-fantasy lighting for the workspace.
 *
 * The room model and all of its materials are untouched — this rig only
 * decides how they are lit. The goal is a VALUE LADDER, not overall
 * brightness: pure black corners → charcoal walls → one narrow warm-neutral
 * midtone → crimson only where a real source would put it (window, lamp,
 * floor bounce). Simply raising red everywhere is what flattened the wall
 * into grey mush, so crimson is rationed to the rim and the practicals while
 * the neutral key is narrowed until it grazes rather than floods.
 *
 *  - crimson window key, behind and above the window — the one saturated
 *    source, and the reason the silhouette separates from the fog
 *  - crimson rims on both rear sides — a thin red edge down the corners
 *  - a NARROW warm neutral key over the middle of the room; the big wall is
 *    meant to stay in charcoal, not turn grey
 *  - dim neutral fill from camera-right so front faces don't crush
 *  - warm practicals: monitor (cool) and desk lamp (warm)
 *  - crimson floor bounce from below-front, lifting the near corner
 *
 * `intro` ramps the rig alive between 0.0s and 1.1s after the scene starts.
 * Once settled, useFrame stops touching the lights.
 */

const KEY_INTENSITY = 120;
const RIM_LEFT_INTENSITY = 260;
const RIM_RIGHT_INTENSITY = 175;
const WINDOW_INTENSITY = 215;
const UNDERGLOW_INTENSITY = 44;
const BOUNCE_INTENSITY = 48;
const SCREEN_INTENSITY = 30;
const LAMP_INTENSITY = 34;
const SILVER_INTENSITY = 0.16;
const FILL_INTENSITY = 0.2;
const AMBIENT_INTENSITY = 0.1;

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);
const clamp01 = (value) => Math.min(Math.max(value, 0), 1);

const HeroLights = ({ intro = true }) => {
  const keyRef = useRef(null);
  const rimLeftRef = useRef(null);
  const rimRightRef = useRef(null);
  const windowRef = useRef(null);
  const underglowRef = useRef(null);
  const bounceRef = useRef(null);
  const screenRef = useRef(null);
  const lampRef = useRef(null);
  const silverRef = useRef(null);
  const fillRef = useRef(null);
  const settled = useRef(false);

  useFrame((state) => {
    if (!intro || settled.current) return;

    const time = state.clock.elapsedTime;
    // neutral key fades in 0.0s → 0.8s, red rig comes alive 0.2s → 1.1s
    const keyProgress = easeOutCubic(clamp01(time / 0.8));
    const redProgress = easeOutCubic(clamp01((time - 0.2) / 0.9));

    if (keyRef.current) keyRef.current.intensity = KEY_INTENSITY * keyProgress;
    if (rimLeftRef.current)
      rimLeftRef.current.intensity = RIM_LEFT_INTENSITY * redProgress;
    if (rimRightRef.current)
      rimRightRef.current.intensity = RIM_RIGHT_INTENSITY * redProgress;
    if (windowRef.current)
      windowRef.current.intensity = WINDOW_INTENSITY * redProgress;
    if (underglowRef.current)
      underglowRef.current.intensity = UNDERGLOW_INTENSITY * redProgress;
    if (bounceRef.current)
      bounceRef.current.intensity = BOUNCE_INTENSITY * redProgress;
    if (screenRef.current)
      screenRef.current.intensity = SCREEN_INTENSITY * redProgress;
    if (lampRef.current) lampRef.current.intensity = LAMP_INTENSITY * redProgress;
    if (silverRef.current)
      silverRef.current.intensity = SILVER_INTENSITY * redProgress;
    if (fillRef.current)
      fillRef.current.intensity = FILL_INTENSITY * keyProgress;

    if (time > 1.4) settled.current = true;
  });

  const initial = intro ? 0 : 1;

  return (
    <>
      {/* near-black ambient with the faintest red cast — enough that the
          darkest corners read as charcoal rather than as a flat silhouette */}
      <ambientLight intensity={AMBIENT_INTENSITY * initial} color="#1c060a" />

      {/* THE window light. Deep crimson, high and behind the room, aimed down
          into it. Every red edge in frame is a consequence of this one
          source, which is what keeps the room cinematic instead of pink. */}
      <spotLight
        ref={windowRef}
        position={[3.6, 9.5, -8]}
        angle={0.7}
        penumbra={0.95}
        decay={2}
        distance={34}
        intensity={WINDOW_INTENSITY * initial}
        color="#d8122a"
      />

      {/* crimson rim, behind-left — a thin red edge down the door corner */}
      <spotLight
        ref={rimLeftRef}
        position={[-9, 7, -7]}
        angle={0.72}
        penumbra={1}
        decay={2}
        intensity={RIM_LEFT_INTENSITY * initial}
        color="#ff1f33"
      />

      {/* crimson rim, behind-right — deeper and wider than the left so the
          room is sculpted from both sides and never reads as flat-lit */}
      <spotLight
        ref={rimRightRef}
        position={[10, 4.5, -6]}
        angle={0.9}
        penumbra={1}
        decay={2}
        intensity={RIM_RIGHT_INTENSITY * initial}
        color="#c21228"
      />

      {/* Narrow warm-neutral key, hung high and slightly camera-right. The cone
          is tight and the penumbra firm, so it lands as a band across the bed,
          desk and floor and leaves the big left wall in charcoal. The old wide
          flood at 250 straight over the room was exactly what turned that wall
          into flat grey. */}
      <spotLight
        ref={keyRef}
        position={[4.5, 13, 6]}
        angle={0.36}
        penumbra={0.6}
        decay={2}
        intensity={KEY_INTENSITY * initial}
        color="#ffdcce"
      />

      {/* dim neutral fill from camera-right — pure shadow-lift, no colour, so
          front faces stay readable without inventing a second key light */}
      <directionalLight
        ref={fillRef}
        position={[9, 5, 9]}
        intensity={FILL_INTENSITY * initial}
        color="#b9c2d2"
      />

      {/* crimson floor bounce from below-front — the room's own light
          returning off the boards; lifts the near corner out of pure black */}
      <pointLight
        ref={bounceRef}
        position={[5.5, 0.4, 4.5]}
        decay={2}
        distance={11}
        intensity={BOUNCE_INTENSITY * initial}
        color="#ff2d3f"
      />

      {/* soft red ambient glow near the front floor */}
      <pointLight
        ref={underglowRef}
        position={[0, 0.6, 5]}
        decay={2}
        distance={11}
        intensity={UNDERGLOW_INTENSITY * initial}
        color="#8c0f1a"
      />

      {/* monitor practical (cool white) */}
      <pointLight
        ref={screenRef}
        position={[-3.3, 2.7, -0.4]}
        decay={2}
        distance={7}
        intensity={SCREEN_INTENSITY * initial}
        color="#cfe0f5"
      />

      {/* desk lamp practical (warm) — the room's only warm-neutral accent */}
      <pointLight
        ref={lampRef}
        position={[0.3, 1.4, -3]}
        decay={2}
        distance={5}
        intensity={LAMP_INTENSITY * initial}
        color="#ff7a4a"
      />

      {/* a single cool silver directional from behind-right. Gives the
          architecture a faint metallic edge so the silhouette separates from
          the near-black fog. Deliberately dim — a highlight, not a second
          key light. */}
      <directionalLight
        ref={silverRef}
        position={[8, 6, -6]}
        intensity={SILVER_INTENSITY * initial}
        color="#c9d2e0"
      />
    </>
  );
};

export default HeroLights;
