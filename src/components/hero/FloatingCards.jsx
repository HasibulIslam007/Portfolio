// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { motion, useReducedMotion } from "framer-motion";

/**
 * Floating UI cards layered around the 3D scene.
 *  1. "Currently building — IELTSHUB" (primary, bottom-left on desktop)
 *  2. "Full-stack" chip (secondary, top-right on desktop)
 * Plus a few tiny decorative code glyphs (aria-hidden, desktop only).
 *
 * On small screens the cards flow below the canvas in normal document order.
 */
const FloatingCards = () => {
  const reduced = useReducedMotion();

  const entrance = (delay) =>
    reduced
      ? { initial: false }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { delay, duration: 0.6, ease: "easeOut" },
        };

  const float = (duration, delay = 0) =>
    reduced
      ? {}
      : {
          animate: { y: [0, -6, 0] },
          transition: {
            duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay,
          },
        };

  return (
    <>
      {/* Decorative drifting code glyphs */}
      {!reduced && (
        <>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute top-3 left-1 hidden font-mono text-xs text-blood/25 select-none lg:block"
            animate={{ opacity: [0.1, 0.3, 0.1], y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            {"</>"}
          </motion.span>
          <motion.span
            aria-hidden="true"
            className="pointer-events-none absolute right-3 bottom-16 hidden font-mono text-xs text-fg-dim/25 select-none lg:block"
            animate={{ opacity: [0.08, 0.22, 0.08], y: [0, 8, 0] }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          >
            {"{ }"}
          </motion.span>
        </>
      )}

      {/* PRIMARY — Currently building */}
      <motion.a
        href="https://github.com/HasibulIslam007/IELTSHUB"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="IELTSHUB — currently building, view repository"
        {...entrance(1.4)}
        className="group relative z-20 mt-4 block w-full rounded-xl border border-blood-line bg-ink-2/75 p-4 shadow-[0_0_50px_-18px_rgba(255,38,56,0.45)] backdrop-blur-md transition-colors duration-300 hover:border-[rgba(255,38,56,0.55)] lg:absolute lg:bottom-6 lg:left-0 lg:mt-0 lg:w-[16.5rem]"
      >
        <motion.span
          className="block"
          {...float(6.5)}
        >
          <span className="mb-2 flex items-center justify-between">
            <span className="font-mono text-[9px] tracking-[0.28em] text-fg-dim uppercase">
              Currently Building
            </span>
            <span
              aria-hidden="true"
              className="text-fg-dim transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-blood"
            >
              ↗
            </span>
          </span>

          <span className="block text-base font-semibold tracking-tight text-fg">
            IELTSHUB
          </span>
          <span className="mt-0.5 block text-xs text-fg-muted">
            Modern IELTS learning platform
          </span>

          <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/80 px-2.5 py-1">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-blood shadow-[0_0_8px_rgba(255,38,56,0.9)]"
            />
            <span className="font-mono text-[9px] tracking-[0.2em] text-fg-muted uppercase">
              In Development
            </span>
          </span>
        </motion.span>
      </motion.a>

      {/* SECONDARY — capability chip */}
      <motion.div
        {...entrance(1.6)}
        className="relative z-20 mt-3 hidden w-fit rounded-lg border border-hairline bg-ink-2/70 px-3.5 py-2.5 backdrop-blur-md lg:absolute lg:top-6 lg:right-0 lg:mt-0 lg:block"
      >
        <motion.div {...float(8, 1)}>
          <p className="font-mono text-[9px] tracking-[0.28em] text-fg-dim uppercase">
            Full-Stack
          </p>
          <p className="mt-0.5 text-xs text-fg-muted">
            Web{" "}
            <span className="text-blood" aria-hidden="true">
              •
            </span>{" "}
            Mobile{" "}
            <span className="text-blood" aria-hidden="true">
              •
            </span>{" "}
            AI
          </p>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingCards;
