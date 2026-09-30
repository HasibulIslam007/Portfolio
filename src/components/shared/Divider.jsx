// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { motion, useReducedMotion } from "framer-motion";

/**
 * Thin hairline rule with a short crimson lead segment that expands into
 * place when scrolled into view — the Phase 2 divider between editorial
 * blocks. Static (no motion) under prefers-reduced-motion.
 */
const Divider = ({ className = "", accent = true }) => {
  const reduced = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={`relative h-px w-full bg-hairline ${className}`}
    >
      {accent &&
        (reduced ? (
          <span className="absolute inset-y-0 left-0 w-16 bg-blood" />
        ) : (
          <motion.span
            className="absolute inset-y-0 left-0 w-16 origin-left bg-blood"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
        ))}
    </div>
  );
};

export default Divider;
