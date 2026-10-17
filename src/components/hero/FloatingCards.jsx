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

      {/* PRIMARY — Currently building.
          Sized and toned to BRIDGE the page and the 3D environment rather
          than sit on top of it: 13.5rem (down from 16.5rem), near-black with
          a single thin crimson edge, no backdrop-blur (the glass effect was
          what made it read as a UI panel floating over a render) and a much
          tighter shadow. On desktop it overhangs the stage by 1.5rem into the
          column gutter, so it visibly belongs to both halves of the layout. */}
      <motion.a
        href="https://github.com/HasibulIslam007/IELTSHUB"
        target="_blank"
        rel="noreferrer noopener"
        aria-label="IELTSHUB — currently building, view repository"
        {...entrance(1.4)}
        className="group relative z-20 mt-4 block w-full border border-[rgba(255,38,56,0.22)] bg-[#07070a]/92 p-3.5 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-[rgba(255,38,56,0.5)] lg:absolute lg:bottom-4 lg:-left-6 lg:mt-0 lg:w-[13.5rem]"
      >
        {/* faint crimson light bleeding in from the top edge — the card is lit
            by the room it sits against, not by a glow of its own */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[rgba(255,38,56,0.09)] to-transparent"
        />
        {/* crimson edge along the top of the card */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blood/60 to-transparent"
        />
        <motion.span
          className="relative block"
          {...float(6.5)}
        >
          <span className="mb-1.5 flex items-center justify-between">
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

          <span className="block text-[0.95rem] leading-tight font-semibold tracking-tight text-fg">
            IELTSHUB
          </span>
          <span className="mt-0.5 block text-[0.7rem] text-fg-muted">
            Modern IELTS learning platform
          </span>

          <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-hairline bg-surface/70 px-2 py-0.5">
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

      {/* SECONDARY — capability chip. Same glass removal: near-black, thin
          hairline, and pulled to the very top-right of the stage so it sits
          in the dark corner instead of competing with the room. */}
      <motion.div
        {...entrance(1.6)}
        className="relative z-20 mt-3 hidden w-fit border border-hairline bg-[#07070a]/80 px-3 py-2 lg:absolute lg:top-3 lg:right-0 lg:mt-0 lg:block"
      >
        <motion.div {...float(8, 1)} className="flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="h-6 w-px bg-gradient-to-b from-transparent via-blood/60 to-transparent"
          />
          <span>
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
          </span>
        </motion.div>
      </motion.div>
    </>
  );
};

export default FloatingCards;
