// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { motion, useReducedMotion } from "framer-motion";

import { heroTech } from "../../constants";

/**
 * Restrained technology strip pinned to the bottom of the hero.
 * No logos — just quiet, letter-spaced mono labels.
 * Static (no entrance glide) under prefers-reduced-motion.
 */
const TechStrip = ({ delay = 1.5 }) => {
  const reduced = useReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className="relative z-10 border-t border-hairline py-5"
    >
      <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-between md:gap-x-8">
        {heroTech.map((tech, index) => (
          <li key={tech} className="flex items-center gap-5 md:gap-8">
            <span className="font-mono text-[10px] tracking-[0.28em] text-fg-dim transition-colors duration-300 hover:text-fg-muted md:text-[11px]">
              {tech}
            </span>
            {index < heroTech.length - 1 && (
              <span
                aria-hidden="true"
                className="hidden size-1 rounded-full bg-blood-deep md:block"
              />
            )}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TechStrip;
