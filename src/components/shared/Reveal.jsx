// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered fade/rise used across Phase 2 sections.
 *
 * With prefers-reduced-motion enabled the children render immediately as
 * a plain wrapper — no entrance movement and no content hidden waiting
 * for an animation that will never run.
 */
const Reveal = ({ children, delay = 0, y = 18, className = "" }) => {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
