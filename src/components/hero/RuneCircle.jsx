import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TICK_COUNT = 24;
const GLYPH_COUNT = 6;

/**
 * Lightweight "rune circle" — a thin red magic/geometry ring that rotates
 * extremely slowly behind the workspace. Low opacity + additive blending so
 * it reads as atmosphere, never as a UI element. ~4 draw calls total.
 */
const RuneCircle = ({
  position = [0.25, 3.2, -6.4],
  radius = 6.2,
  reduced = false,
}) => {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const ticksRef = useRef(null);
  const glyphsRef = useRef(null);

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#ff2638"),
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      }),
    []
  );

  const innerMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.16;
    return material;
  }, [ringMaterial]);

  const tickMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.4;
    return material;
  }, [ringMaterial]);

  const glyphMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.28;
    return material;
  }, [ringMaterial]);

  // Static transforms for instanced ticks + glyphs (set once)
  useLayoutEffect(() => {
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const quaternion = new THREE.Quaternion();
    const scale = new THREE.Vector3(1, 1, 1);
    const zAxis = new THREE.Vector3(0, 0, 1);

    if (ticksRef.current) {
      for (let i = 0; i < TICK_COUNT; i++) {
        const angle = (i / TICK_COUNT) * Math.PI * 2;
        position.set(
          Math.cos(angle) * radius * 0.9,
          Math.sin(angle) * radius * 0.9,
          0
        );
        quaternion.setFromAxisAngle(zAxis, angle);
        // every 4th tick is longer — a quiet clock/rune rhythm
        scale.set(1, i % 4 === 0 ? 2.6 : 1.3, 1);
        matrix.compose(position, quaternion, scale);
        ticksRef.current.setMatrixAt(i, matrix);
      }
      ticksRef.current.instanceMatrix.needsUpdate = true;
    }

    if (glyphsRef.current) {
      for (let i = 0; i < GLYPH_COUNT; i++) {
        const angle = (i / GLYPH_COUNT) * Math.PI * 2 + Math.PI / GLYPH_COUNT;
        position.set(
          Math.cos(angle) * radius * 0.78,
          Math.sin(angle) * radius * 0.78,
          0
        );
        quaternion.setFromAxisAngle(zAxis, angle + Math.PI / 4);
        scale.set(1, 1, 1);
        matrix.compose(position, quaternion, scale);
        glyphsRef.current.setMatrixAt(i, matrix);
      }
      glyphsRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [radius]);

  // Extremely slow rotation
  useFrame((_, delta) => {
    if (reduced) return;
    if (outerRef.current) outerRef.current.rotation.z += delta * 0.035;
    if (innerRef.current) innerRef.current.rotation.z -= delta * 0.05;
    if (ticksRef.current) ticksRef.current.rotation.z -= delta * 0.02;
    if (glyphsRef.current) glyphsRef.current.rotation.z += delta * 0.028;
  });

  return (
    <group position={position}>
      {/* outer ring */}
      <mesh ref={outerRef} material={ringMaterial}>
        <torusGeometry args={[radius, 0.02, 3, 128]} />
      </mesh>

      {/* inner ring */}
      <mesh ref={innerRef} material={innerMaterial}>
        <torusGeometry args={[radius * 0.82, 0.012, 3, 112]} />
      </mesh>

      {/* tick marks */}
      <instancedMesh
        ref={ticksRef}
        args={[undefined, undefined, TICK_COUNT]}
        material={tickMaterial}
        frustumCulled={false}
      >
        <boxGeometry args={[0.03, 0.28, 0.01]} />
      </instancedMesh>

      {/* rune glyphs (diamonds) */}
      <instancedMesh
        ref={glyphsRef}
        args={[undefined, undefined, GLYPH_COUNT]}
        material={glyphMaterial}
        frustumCulled={false}
      >
        <boxGeometry args={[0.22, 0.22, 0.01]} />
      </instancedMesh>
    </group>
  );
};

export default RuneCircle;
