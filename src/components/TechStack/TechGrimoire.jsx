import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import usePrefersReducedMotion from "../../lib/usePrefersReducedMotion";
import RuneDecoration from "../shared/RuneDecoration.jsx";

const embers = [[13, 25, 2], [85, 19, 1], [22, 73, 1.5], [77, 79, 2], [91, 51, 1], [65, 12, 1]];
const spring = { stiffness: 115, damping: 20, mass: 0.7 };

const TechGrimoire = () => {
  const reduced = usePrefersReducedMotion();
  const stage = useRef(null);
  const [active, setActive] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, spring);
  const y = useSpring(pointerY, spring);

  const rotateY = useTransform(x, [-1, 1], [-8, 8]);
  const rotateX = useTransform(y, [-1, 1], [4, -4]);
  const bookX = useTransform(x, [-1, 1], [-8, 8]);
  const bookY = useTransform(y, [-1, 1], [-5, 5]);
  const scale = useTransform(x, [-1, 0, 1], [1.02, 1, 1.02]);
  const backX = useTransform(x, [-1, 1], [3, -3]);
  const backY = useTransform(y, [-1, 1], [2, -2]);
  const frontX = useTransform(x, [-1, 1], [-10, 10]);
  const frontY = useTransform(y, [-1, 1], [-6, 6]);
  const glareX = useTransform(x, [-1, 1], [37, 63]);
  const glareY = useTransform(y, [-1, 1], [42, 58]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 49, 64, 0.14), transparent 34%)`;

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== "mouse" || !stage.current) return;
    const rect = stage.current.getBoundingClientRect();
    const strength = window.innerWidth < 1024 ? 0.6 : 1;
    pointerX.set(Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1)) * strength);
    pointerY.set(Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1)) * strength);
    setActive(true);
  };

  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
    setActive(false);
  };

  return (
    <div ref={stage} aria-hidden="true" data-active={active || undefined} onPointerMove={handlePointerMove} onPointerLeave={resetPointer} className="grimoire-stage">
      <motion.div className="grimoire-back" style={reduced ? undefined : { x: backX, y: backY }}>
        <div className="grimoire-glow" />
        <div className="grimoire-rune"><RuneDecoration className="h-full w-full" opacity={0.085} /></div>
        <div className="grimoire-haze" />
      </motion.div>
      <motion.div className="grimoire-artifact" style={reduced ? undefined : { x: bookX, y: bookY, rotateX, rotateY, scale }}>
        <div className="grimoire-float">
          <img src="/images/tech-stack/grimoire.webp" alt="" draggable="false" decoding="async" />
          <motion.div className="grimoire-glare" style={reduced ? undefined : { background: glare }} />
        </div>
      </motion.div>
      <motion.div className="grimoire-embers" style={reduced ? undefined : { x: frontX, y: frontY }}>
        {embers.map(([emberX, emberY, size], index) => <i key={index} style={{ left: `${emberX}%`, top: `${emberY}%`, width: size, height: size, animationDelay: `${index * -1.35}s` }} />)}
      </motion.div>
      <div className="grimoire-vignette" />
    </div>
  );
};

export default TechGrimoire;
