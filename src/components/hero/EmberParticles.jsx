import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Faint embers drifting slowly upward around the scene.
 *
 * Two tones are baked into a vertex-colour attribute — a deep crimson for
 * most, a pale gold for roughly one in seven — so the field has depth
 * instead of reading as uniform confetti. Still a single draw call.
 *
 * ANTI-STARFIELD. Two things keep these from reading as a sky:
 *  1. spawns are biased toward the OUTER shell of the scene volume, so the
 *     middle of the room stays clear and the motes hug the silhouette;
 *  2. each mote gets its own scale and sway period, and the points are small
 *     and dim enough that individual "dots" never resolve.
 *
 * Horizontal motion is a *bounded* sway around each particle's spawn column.
 * (It used to be `x += sin(...) * delta`, an unbounded random walk that
 * slowly carried every ember out of frame over a long session.)
 *
 * Low count on mobile, and frozen entirely under prefers-reduced-motion.
 */
const EMBER = new THREE.Color("#ff3346");
const ASH = new THREE.Color("#ffb98a");
const ASH_CHANCE = 0.14;
const SWAY_AMPLITUDE = 0.55;
const CEILING = 9;
const FLOOR = -2;

const EmberParticles = ({ count = 40, reduced = false }) => {
  const pointsRef = useRef(null);

  const { positions, baseX, speeds, phases, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const baseX = new Float32Array(count);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    const colors = new Float32Array(count * 3);
    const mixed = new THREE.Color();

    for (let i = 0; i < count; i++) {
      // sqrt() pushes samples toward the edges, so the room's own volume is
      // left clear and the motes gather around its silhouette
      const spreadX = (Math.sqrt(Math.random()) - 0.42) * 22;
      const spreadZ = (Math.sqrt(Math.random()) - 0.5) * 16;
      positions[i * 3] = spreadX;
      positions[i * 3 + 1] = Math.random() * 11 - 2; // y
      positions[i * 3 + 2] = spreadZ - 1;

      baseX[i] = spreadX;
      speeds[i] = 0.1 + Math.random() * 0.28;
      phases[i] = Math.random() * Math.PI * 2;

      mixed.copy(Math.random() < ASH_CHANCE ? ASH : EMBER);
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }

    return { positions, baseX, speeds, phases, colors };
  }, [count]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.slice(), 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(colors.slice(), 3));
    return geometry;
  }, [positions, colors]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        // small + dim on purpose: the motes should be felt, not resolved
        size: 0.045,
        sizeAttenuation: true,
        vertexColors: true,
        transparent: true,
        opacity: 0.45,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      }),
    []
  );

  useFrame((state, delta) => {
    if (reduced || !pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const attribute = pointsRef.current.geometry.attributes.position;
    const array = attribute.array;

    for (let i = 0; i < count; i++) {
      const yIndex = i * 3 + 1;
      array[yIndex] += speeds[i] * delta;

      // bounded sway around the spawn column, each mote on its own period so
      // the field never pulses in unison
      array[i * 3] =
        baseX[i] +
        Math.sin(time * (0.22 + speeds[i]) + phases[i]) * SWAY_AMPLITUDE;

      if (array[yIndex] > CEILING) {
        array[yIndex] = FLOOR;
      }
    }

    attribute.needsUpdate = true;
  });

  return (
    <points
      ref={pointsRef}
      geometry={geometry}
      material={material}
      frustumCulled={false}
    />
  );
};

export default EmberParticles;
