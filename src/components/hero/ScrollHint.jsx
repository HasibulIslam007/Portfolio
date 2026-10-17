// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { motion, useReducedMotion } from "framer-motion";

/**
 * Quiet scroll affordance pinned to the hero's lower edge.
 *
 * A slow, small vertical drift plus a fading hairline — enough to signal
 * "there is more" without pulling attention from the 3D room. Renders
 * completely static under prefers-reduced-motion, and is hidden from
 * assistive tech because it duplicates information the page order already
 * conveys.
 */
const ScrollHint = () => {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href="#about"
      aria-hidden="true"
      tabIndex={-1}
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden justify-center pb-3 md:flex"
    >
      <motion.span
        className="flex flex-col items-center gap-2"
        animate={reduced ? undefined : { y: [0, 6, 0] }}
        transition={
          reduced
            ? undefined
            : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        <span className="font-mono text-[9px] tracking-[0.3em] text-fg-dim uppercase">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-blood/70 to-transparent" />
      </motion.span>
    </motion.a>
  );
};

export default ScrollHint;