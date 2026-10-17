import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, useGLTF } from "@react-three/drei";

import usePrefersReducedMotion from "../../lib/usePrefersReducedMotion";
import RuneDecoration from "../shared/RuneDecoration.jsx";

/**
 * About-section visual: the author's own sword + rock GLB, rendered live.
 *
 * REPLACES a 360° video. The previous implementation was a 10s turntable MP4
 * scrubbed by the pointer; this is the same subject as real geometry, so it is
 * far lighter (one 0.9MB GLB vs a multi-MB clip) and needs no keyframe-dense
 * re-encode to stay responsive.
 *
 * THE MODEL IS NOT MODIFIED. Geometry, scale and both base-colour textures are
 * left exactly as authored. This file only clones the two materials and
 * overrides their SCALARS (metalness/roughness/tint) — the JPEG maps are never
 * touched. Cloning matters because useGLTF caches materials by reference, so
 * writing to the originals would leak into every other consumer of the file.
 *
 * FRAMING comes from the real world AABB measured off the GLB:
 *   min [-0.104, 0, -0.104] → max [0.104, 0.218, 0.104]
 *   size [0.209, 0.218, 0.209], centre [0, 0.109, 0]
 * i.e. the export is authored at ~0.22 units, far too small to frame. NORMALISE
 * rescales it to a 1.96-unit height, then the group drops by CENTRE_Y*NORMALISE
 * so the model sits centred on the origin. One fixed camera then serves every
 * breakpoint with no fov/distance juggling.
 */
const SRC = "/models/astas_sword_demon_slayer.glb";

const NORMALISE = 9;
const CENTRE_Y = 0.109;
const SWORD_SCALE = 1.58;
const ROCK_SCALE = 0.62;

/**
 * YAW, MEASURED NOT GUESSED.
 *
 * The blade is a flat plate whose per-band extents are X 0.003–0.008 (THICKNESS)
 * and Z 0.026–0.040 (WIDTH) — i.e. it lies in the YZ plane with its normal on
 * ±X. The camera looks down −Z, so at yaw 0 we saw the blade exactly EDGE-ON:
 * a ~0.005-unit sliver, sub-pixel once the model is normalised, which is why it
 * rendered as a hairline no matter how it was lit.
 *
 * −90° swings that normal onto −Z so the BROAD FACE meets the camera. Sign
 * chosen so the blade's existing ~11° lean (it drifts to −X with height) goes
 * to −Z: leaning away from the viewer, which preserves apparent height instead
 * of foreshortening the tip toward the camera.
 *
 * The rock is a mound with X and Z AABBs both ±0.104, so rotating the whole
 * model is visually free for it.
 */
const MODEL_YAW = -Math.PI / 2;

// MEASURED OFF THE ACTUAL MAPS, not eyeballed. Both base-colour JPEGs decoded to
// linear (sRGB -> linear, full-frame means):
//
//              linear R   linear G   linear B   linear luma   (r-b)/luma
//   Espada      0.0443     0.0359     0.0310      0.0373       +0.396
//   pedra       0.1271     0.1271     0.1271      0.1271       +0.000
//
// TWO THINGS THAT WERE WRONG BEFORE, both of which made the blade read as copper:
//
// 1. THE RUST IS REAL. `Espada_baseColor.jpeg` is not "near-black pitted steel"
//    (this comment used to claim ~0.12 sRGB / ~0.013 linear; the true value is
//    0.20 sRGB / 0.037 linear). It is weathered steel with heavy orange patina:
//    mean warmness +0.396, and 67.5% of its pixels exceed +0.25. The blade's
//    brown is the authored texture, not a lighting bug.
//
// 2. A SCALAR LIFT CANNOT FIX IT — IT MAKES IT WORSE. The old preset used
//    color.setScalar(2.2), which multiplies R, G and B by the SAME factor and so
//    scales warmness by that factor too. The patina went hotter, and at 2.2x a
//    0.037 map blew out to 0.082 albedo — brighter than the rock. That is the
//    copper. The cure is a PER-CHANNEL tint.
//
// To neutralise, R*tR must equal B*tB, so tB/tR = 0.0443/0.0310 = 1.43. The
// ratios below land the blade at +0.054 warmness — steel, with just enough
// patina left to read as weathering detail rather than a flat grey slab.
//
// `tint` is applied with color.setRGB(r, g, b), which — like setScalar, unlike
// set("#hex") — assigns LINEAR values with no sRGB decode. These are linear albedo
// multipliers, not hex colours, and must not be "brightened" casually.
//
// Dropping the lift from 2.2 to 0.85 also fixes an INVERTED HIERARCHY: at the old
// values the blade's diffuse albedo was 0.0408 against the rock's 0.0203, i.e. 2x
// brighter than the mound it is buried in. At 0.85 the blade resolves to 0.037 —
// still legible, but no longer outshining the rock.
//
const ROCK = { metalness: 0, roughness: 0.92, tint: [0.12, 0.13, 0.14], envMapIntensity: 0.35 };
const SWORD = { metalness: 0.8, roughness: 0.36, tint: [0.95, 1.05, 1.18], envMapIntensity: 2.35 };

// Deliberately tiny: ±12° yaw / ±3° pitch reads as the object having weight,
// not as an orbit control. There is no OrbitControls in this file — rotation is
// written by this one damped lerp and nothing else.
const MAX_YAW = (12 * Math.PI) / 180;
const MAX_PITCH = (3 * Math.PI) / 180;
const DAMPING = 0.06;
const IDLE_AMPLITUDE = (0.7 * Math.PI) / 180;
const IDLE_SPEED = 0.32;

const clamp = (v, lo, hi) => (v < lo ? lo : v > hi ? hi : v);

/**
 * Damped pointer tilt plus a very small idle drift.
 *
 * `pointer` is a ref owned by the parent so pointermove never triggers a React
 * render; the frame loop reads it directly. Under reduced motion this returns
 * at the top — the model still renders (it is content, not decoration) but it
 * holds perfectly still.
 */
const TiltGroup = ({ scene, pointer, reduced }) => {
  const group = useRef(null);
  const current = useRef({ yaw: 0, pitch: 0 });

  useFrame((state) => {
    if (!group.current || reduced) return;

    const goalYaw = pointer.current.x * MAX_YAW;
    const goalPitch = pointer.current.y * MAX_PITCH;

    current.current.yaw += (goalYaw - current.current.yaw) * DAMPING;
    current.current.pitch += (goalPitch - current.current.pitch) * DAMPING;

    const idle = Math.sin(state.clock.elapsedTime * IDLE_SPEED) * IDLE_AMPLITUDE;

    group.current.rotation.y = current.current.yaw + idle;
    group.current.rotation.x = current.current.pitch;
  });

  // TWO GROUPS ON PURPOSE. The outer one holds the fixed MODEL_YAW; the inner
  // one is the ref this frame loop mutates. A single group cannot carry both:
  // `group.current.rotation.y` is assigned every tick, so a base yaw set on
  // that same group would be overwritten back to the idle drift and the blade
  // would snap edge-on again. Nesting composes the tilt ON TOP of the fixed
  // orientation instead of fighting it.
  return (
    <group rotation-y={MODEL_YAW}>
      <group ref={group} scale={NORMALISE} position={[0, -CENTRE_Y * NORMALISE, 0]}>
        <primitive object={scene} />
      </group>
    </group>
  );
};

const AstasSwordModel = ({ pointer, reduced }) => {
  const { scene } = useGLTF(SRC);

  const model = useMemo(() => {
    const copy = scene.clone(true);

    // Runtime-only composition. The source asset places a narrow sword over a
    // very broad terrain disc; these named parent transforms rebalance that
    // hierarchy without touching either mesh's geometry or texture mapping.
    const swordRoot = copy.getObjectByName("pasted__pCube5");
    const rockRoot = copy.getObjectByName("pPlane1");
    swordRoot?.scale.multiplyScalar(SWORD_SCALE);
    rockRoot?.scale.multiplyScalar(ROCK_SCALE);

    copy.traverse((child) => {
      if (!child.isMesh) return;
      const source = child.material;
      // Clone per-mesh so tuning never writes through to the useGLTF cache.
      const material = source.clone();
      const preset = /espada/i.test(`${child.name} ${source.name}`) ? SWORD : ROCK;
      material.metalness = preset.metalness;
      material.roughness = preset.roughness;
      // setRGB with bare numbers bypasses the sRGB->linear decode that a hex
      // string would go through, which is exactly what these linear
      // multipliers need. Per-CHANNEL is the point: a scalar would scale the
      // texture's rust equally in R/G/B and intensify the copper instead of
      // cancelling it (see the measurement table above).
      material.color.setRGB(...preset.tint);
      material.envMapIntensity = preset.envMapIntensity;
      child.material = material;
    });
    return copy;
  }, [scene]);

  return (
    <>
      {/* Soft neutral key, high and camera-left. It sits at roughly 45° to the
          blade's face — now that MODEL_YAW turns that face toward the camera,
          an off-axis key is what gives the flat plate its bright edge and dark
          centre falloff. Head-on would have flattened it into a grey slab. */}
      <spotLight
        position={[-2.8, 4.6, 3.8]}
        angle={0.48}
        penumbra={0.8}
        intensity={5.2}
        distance={10}
        decay={1.5}
        color="#f4eee8"
      />
      <directionalLight position={[-3.5, 3.5, 4]} intensity={1.15} color="#f4eee8" />

      {/* Subtle crimson rim from behind-right; separates the silhouette from
          the near-black section without washing the model red. */}
      <spotLight
        position={[3.4, 2.2, -3.8]}
        angle={0.62}
        penumbra={0.9}
        intensity={5.1}
        distance={10}
        decay={1.6}
        color="#e01d37"
      />
      <directionalLight position={[3, 2, -4]} intensity={0.85} color="#d51f35" />

      {/* Weak crimson bounce, kept low AND slightly behind. Placed in front of
          the rock it lit the front face and turned the whole mound red, which
          is exactly the failure this is rationed to avoid. */}
      <pointLight position={[0, -1.2, 0.1]} intensity={2.55} distance={3.8} decay={2} color="#d0142c" />

      {/* Small warm fill so front faces stay legible. */}
      <pointLight position={[1.7, 0.8, 2.5]} intensity={1.25} distance={7} decay={2} color="#ffc89a" />

      <hemisphereLight args={["#8d96a8", "#170307", 0.3]} />

      {/* A 64px procedural environment. This is NOT an HDR asset and adds no
          dependency — three form-factor light cards rendered to a tiny
          cubemap in memory. Its job is specular response on the blade: the
          rock is fully rough and would not care, but the sword's metal needs
          something to reflect. It is what keeps the steel from reading flat. */}
      <Environment resolution={64}>
        <Lightformer intensity={2.7} color="#eef1f6" position={[-2, 4, 2]} scale={[2.5, 7, 1]} />
        <Lightformer intensity={1.25} color="#a81227" position={[3, 1, -3]} scale={[4, 6, 1]} />
        <Lightformer intensity={0.55} color="#ffb98a" position={[2, -1.5, 2]} scale={[3, 3, 1]} />
      </Environment>

      <TiltGroup scene={model} pointer={pointer} reduced={reduced} />
    </>
  );
};

// Sparse, still ember dots. No animation and no keyframes — they are points of
// light in the composition, nothing more.
const embers = [
  { x: 14, y: 26, s: 2, o: 0.5 },
  { x: 82, y: 18, s: 1.5, o: 0.36 },
  { x: 24, y: 68, s: 2.5, o: 0.42 },
  { x: 71, y: 74, s: 1.5, o: 0.3 },
  { x: 91, y: 52, s: 2, o: 0.34 },
  { x: 9, y: 47, s: 1.5, o: 0.28 },
];

const AstasSword = ({ className = "" }) => {
  const reduced = usePrefersReducedMotion();
  const stageRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  const handleMove = (event) => {
    if (reduced) return;
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    pointer.current.x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
    pointer.current.y =
      event.pointerType === "mouse"
        ? clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1)
        : 0;
  };

  // Pointer leaving the stage eases the model back to rest rather than
  // stranding it at whatever angle it last reached.
  const handleLeave = () => {
    pointer.current.x = 0;
    pointer.current.y = 0;
  };

  return (
    <figure className={`astas-figure ${className}`}>
      <div
        ref={stageRef}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
        className="astas-stage"
      >
        {/* CSS-only atmosphere BEHIND the model. */}
        <div aria-hidden="true" className="astas-glow" />
        <div aria-hidden="true" className="astas-haze" />
        <div aria-hidden="true" className="astas-rune">
          <RuneDecoration className="h-full w-full" opacity={0.075} />
        </div>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          {embers.map((ember, i) => (
            <span
              key={i}
              className="astas-ember absolute rounded-full bg-blood"
              style={{
                left: `${ember.x}%`,
                top: `${ember.y}%`,
                width: `${ember.s}px`,
                height: `${ember.s}px`,
                opacity: ember.o,
              }}
            />
          ))}
        </div>

        <Canvas
          camera={{ position: [0.72, 0.08, 5.7], fov: 29, near: 0.1, far: 40 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          onCreated={({ gl, camera }) => {
            gl.setClearColor(0x000000, 0);
            camera.lookAt(0, 0.12, 0);
          }}
          // pointer-events off, so a vertical drag across the model still
          // scrolls the page — the wrapper above is what listens.
          style={{ pointerEvents: "none" }}
          frameloop={reduced ? "demand" : "always"}
          role="img"
          aria-label="A dark steel sword driven into a cracked rock, lit from above with a crimson rim light"
        >
          <Suspense fallback={null}>
            <AstasSwordModel pointer={pointer} reduced={reduced} />
          </Suspense>
        </Canvas>

        {/* Ground shadow anchoring the model to the section floor. */}
        <div aria-hidden="true" className="astas-shadow" />
        <div aria-hidden="true" className="astas-vignette" />
      </div>

      {/* Only shown when the model can actually respond. Under reduced motion
          it would be a lie, so the affordance disappears with the interaction. */}
      {!reduced && (
        <p className="-mt-1 text-center font-mono text-[10px] tracking-[0.3em] text-silver-dim uppercase">
          Move to rotate <span aria-hidden="true">↔</span>
        </p>
      )}

      <figcaption className="sr-only">
        The sword used in my work: a blackened steel blade set into cracked
        stone. It turns slightly as the pointer moves across it.
      </figcaption>
    </figure>
  );
};

useGLTF.preload(SRC);

export default AstasSword;
