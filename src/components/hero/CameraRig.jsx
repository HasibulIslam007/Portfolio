import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Subtle cinematic camera:
 *  - short, smooth fly-in on load (skipped for prefers-reduced-motion)
 *  - soft mouse parallax within a very small range
 *  - always keeps the model framed via a fixed look-at target
 *
 * No OrbitControls — the user can never spin or zoom the scene away.
 */
const PARALLAX_X = 1.3; // world units of lateral drift at full pointer deflection
const PARALLAX_Y = 0.8; // vertical drift
const EASE = 0.09; // per-frame damping factor at 60fps

const CameraRig = ({ base, target, enabled = true, reduced = false }) => {
  const { camera, pointer } = useThree();
  const initialized = useRef(false);

  const baseVector = useMemo(() => new THREE.Vector3(...base), [base]);
  const targetVector = useMemo(() => new THREE.Vector3(...target), [target]);
  const desired = useMemo(() => new THREE.Vector3(), []);

  useFrame((_, delta) => {
    // First frame: place camera (reduced motion gets the final framing
    // immediately, everyone else starts slightly pulled back for a fly-in).
    if (!initialized.current) {
      initialized.current = true;
      if (reduced) {
        camera.position.copy(baseVector);
      } else {
        camera.position.set(
          baseVector.x,
          baseVector.y + 1.6,
          baseVector.z + 7
        );
      }
    }

    const px = enabled && !reduced ? pointer.x : 0;
    const py = enabled && !reduced ? pointer.y : 0;

    desired.set(
      baseVector.x + px * PARALLAX_X,
      baseVector.y + py * PARALLAX_Y,
      baseVector.z
    );

    // delta-clamped damping keeps the motion smooth across frame rates
    const damping = 1 - Math.pow(1 - EASE, Math.min(delta, 0.1) * 60);
    camera.position.lerp(desired, damping);
    camera.lookAt(targetVector);
  });

  return null;
};

export default CameraRig;
