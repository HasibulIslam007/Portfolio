import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TICK_COUNT = 24;
const GLYPH_COUNT = 6;

/**
 * Lightweight "rune circle" — thin crimson geometry rings that rotate
 * extremely slowly *behind* the workspace, so the room's silhouette reads
 * against them.
 *
 * It is a FRAME, not decoration: it sits behind the room, larger than the
 * room, and is allowed to run off the edge of the stage and dissolve into
 * the darkness. Nothing strong is ever placed behind the headline.
 *
 * Opacities are deliberately in the 2–5% band. Additive blending means these
 * read as faint as air rather than as a HUD, and the assembly rotates slowly
 * enough (one revolution ≈ 3 minutes for the outer ring) that the motion is
 * only noticed if you go looking for it.
 *
 * The earlier version also breathed by ~1.2% on scale. That read as a "living
 * UI element", so the pulse is gone — rotation only, which is the one motion
 * that genuinely reads as atmosphere. Entirely static under reduced motion.
 * Total cost is 5 draw calls.
 */
const RuneCircle = ({
  position = [0.25, 3.4, -9.6],
  radius = 8.6,
  reduced = false,
}) => {
  const haloRef = useRef(null);
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const ticksRef = useRef(null);
  const glyphsRef = useRef(null);

  const ringMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#c8303f"),
        transparent: true,
        opacity: 0.05,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      }),
    []
  );

  const innerMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.028;
    return material;
  }, [ringMaterial]);

  const tickMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.042;
    return material;
  }, [ringMaterial]);

  const glyphMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.032;
    return material;
  }, [ringMaterial]);

  // The halo is the faintest layer — a wide arc that only just registers.
  const haloMaterial = useMemo(() => {
    const material = ringMaterial.clone();
    material.opacity = 0.02;
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
        // every 6th tick is a long mark, every 3rd is medium — a quiet
        // instrument-dial rhythm rather than a uniform picket fence
        scale.set(1, i % 6 === 0 ? 3.2 : i % 3 === 0 ? 1.9 : 1.3, 1);
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

  // Extremely slow counter-rotation, nothing else. No breathing scale: a
  // pulsing element reads as UI, a slowly turning one reads as atmosphere.
  useFrame((state, delta) => {
    if (reduced) return;
    if (outerRef.current) outerRef.current.rotation.z += delta * 0.035;
    if (innerRef.current) innerRef.current.rotation.z -= delta * 0.05;
    if (ticksRef.current) ticksRef.current.rotation.z -= delta * 0.02;
    if (glyphsRef.current) glyphsRef.current.rotation.z += delta * 0.028;
    if (haloRef.current) haloRef.current.rotation.z -= delta * 0.012;
  });

  return (
    <group position={position}>
      <group>
        {/* wide halo arc — barely there, gives the dial a horizon */}
        <mesh ref={haloRef} material={haloMaterial}>
          <torusGeometry args={[radius * 1.34, 0.016, 3, 96]} />
        </mesh>

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
    </group>
  );
};

export default RuneCircle;
