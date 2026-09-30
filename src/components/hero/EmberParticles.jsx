import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Faint red embers drifting slowly upward around the scene.
 * Single draw call (one Points), low count on mobile, and frozen
 * entirely when the user prefers reduced motion.
 */
const EmberParticles = ({ count = 70, reduced = false }) => {
  const pointsRef = useRef(null);

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20; // x
      positions[i * 3 + 1] = Math.random() * 11 - 2; // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 14 - 1; // z
      speeds[i] = 0.12 + Math.random() * 0.3;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count]);

  useFrame((state, delta) => {
    if (reduced || !pointsRef.current) return;

    const time = state.clock.elapsedTime;
    const array = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      const yIndex = i * 3 + 1;
      array[yIndex] += speeds[i] * delta;

      // gentle horizontal sway
      array[i * 3] += Math.sin(time * 0.5 + phases[i]) * delta * 0.06;

      if (array[yIndex] > 9) {
        array[yIndex] = -2;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions.slice(), 3)
    );
    return geometry;
  }, [positions]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#ff3b48"),
        size: 0.06,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        fog: false,
      }),
    []
  );

  return (
    <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />
  );
};

export default EmberParticles;
