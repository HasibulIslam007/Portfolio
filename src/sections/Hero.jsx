import HeroContent from "../components/hero/HeroContent.jsx";
import HeroScene from "../components/hero/HeroScene.jsx";
import FloatingCards from "../components/hero/FloatingCards.jsx";
import TechStrip from "../components/hero/TechStrip.jsx";
import AnimatedCounter from "../components/HeroModels/AnimatedCounter.jsx";
import RuneDecoration from "../components/shared/RuneDecoration.jsx";
import ScrollHint from "../components/hero/ScrollHint.jsx";

/**
 * Hero — cinematic dark-fantasy direction.
 *
 * Layout is unchanged (left ≈54% copy, right ≈46% 3D workspace) so the
 * existing mobile stack order and the 3D framing stay intact. Content is
 * unchanged: same headline, CTAs, IELTSHUB card and tech strip.
 *
 * The atmosphere behind the content is built as an explicit stack of cheap
 * layers, painted back to front inside one pointer-events-none wrapper:
 *   1. hero-backdrop  — warm-to-black ground, never a flat #030303 rectangle
 *   2. crimson horizon glows anchored under the 3D stage
 *   3. hero-grid      — architectural hairlines, masked off the text column
 *   4. smoke-wash     — slow-drifting crimson/charcoal fog
 *   5. top scrim      — keeps the fixed navbar legible over the hero
 *   6. vignette + film grain
 *   7. bottom fade    — dissolves into the next section
 *
 * Everything here sits BEHIND the canvas, which is transparent (see
 * HeroScene). That ordering is the whole trick: the page paints the room's
 * environment, the canvas only paints the room, and `.hero-stage`'s elliptical
 * mask feathers the join so neither rectangle is visible on its own.
 *
 * Only ONE rune is used in the DOM, and it lives on the right, behind the 3D
 * stage, at 4% — a frame you discover rather than a diagram you read. The two
 * oversized discs that used to sit under the text column are gone; that is
 * what made this read as a technical HUD instead of dark fantasy.
 *
 * Entrance sequencing lives in HeroContent (GSAP), floating UI in
 * FloatingCards/TechStrip (Framer Motion) and continuous motion in the
 * R3F components (useFrame).
 */

/**
 * Ember field — CSS-only motes drifting around the 3D stage.
 *
 * Deliberately NOT in the canvas: these cost no draw calls, no WebGL state
 * and no per-frame JS, and they survive even if the 3D context fails. The
 * positions are deterministic (a fixed seed, not Math.random) so the
 * composition is identical on every render. `.hero-ember` is hidden outright
 * under prefers-reduced-motion.
 */
const EMBER_FIELD = Array.from({ length: 14 }, (_, i) => {
  // mulberry32 — tiny deterministic PRNG
  let seed = (i + 1) * 0x9e3779b1;
  const rand = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), 1 | t);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return {
    // clustered toward the right-hand stage, kept low and around the room
    // rather than scattered overhead, where they would read as stars
    left: 10 + rand() * 90,
    bottom: -4 + rand() * 72,
    size: 7 + rand() * 11,
    duration: 15 + rand() * 16,
    delay: -rand() * 28,
    drift: (rand() - 0.5) * 58,
    opacity: 0.22 + rand() * 0.3,
  };
});
const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-ink">
      {/* Atmosphere stack — see the layer map above. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        {/* 1 — ground */}
        <div className="hero-backdrop absolute inset-0" />

        {/* 2 — crimson horizon, anchored under the 3D stage on the right */}
        <div className="absolute inset-0 bg-[radial-gradient(58%_48%_at_73%_58%,rgba(140,18,28,0.22),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(120%_78%_at_78%_28%,rgba(255,38,56,0.05),transparent_62%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(85%_58%_at_14%_86%,rgba(122,16,24,0.13),transparent_66%)]" />

        {/* 3 — architectural hairlines (masked away from the text column) */}
        <div className="hero-grid absolute inset-0" />

        {/* 4 — drifting smoke (paused under prefers-reduced-motion) */}
        <div className="smoke-wash smoke-drift absolute -inset-[12%] opacity-80" />

        {/* 5 — scrim under the fixed navbar */}
        <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ink via-ink/75 to-transparent" />

        {/* 6 — vignette + grain */}
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-noise absolute inset-0 opacity-[0.05]" />

        {/* 7 — fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-ink" />
      </div>

      {/* THE rune. One only, centred on the 3D stage, at 4%.
          It is larger than the room, so its arcs run off the edges and are
          eaten by the vignette — a frame discovered rather than a diagram
          noticed. `.hero-rune` masks it to a soft ellipse, so the left arc
          fades out well before the headline column; nothing structural is
          ever placed behind the text. Original concentric arcs/ticks/nodes
          only; no franchise symbols. aria-hidden, non-interactive. */}
      <RuneDecoration
        className="hero-rune pointer-events-none absolute top-1/2 left-[75%] hidden h-[56rem] w-[56rem] -translate-x-1/2 -translate-y-1/2 text-blood lg:block"
        opacity={0.045}
      />

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1440px] flex-col px-5 md:px-10 xl:px-16">
        <div className="grid flex-1 items-center gap-y-10 pb-4 pt-28 md:pt-32 lg:grid-cols-[54fr_46fr] lg:gap-x-8 lg:pt-32">
          {/* LEFT — copy */}
          <HeroContent />

          {/* RIGHT — 3D workspace + floating cards */}
          <figure className="relative m-0 flex flex-col">
            <div className="hero-stage">
              <HeroScene />
            </div>

            {/* CSS-only atmosphere over the canvas. `screen` blending on the
                spill layer replaces the bloom pass that had to go away with the
                opaque canvas — same glow, no extra render pass. */}
            <div
              aria-hidden="true"
              className="hero-spill pointer-events-none absolute inset-0 z-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
            >
              {EMBER_FIELD.map((ember, index) => (
                <span
                  key={index}
                  className="hero-ember absolute"
                  style={{
                    left: `${ember.left}%`,
                    bottom: `${ember.bottom}%`,
                    width: `${ember.size}px`,
                    height: `${ember.size}px`,
                    opacity: ember.opacity,
                    animationDuration: `${ember.duration}s`,
                    animationDelay: `${ember.delay}s`,
                    "--ember-drift": `${ember.drift}px`,
                  }}
                />
              ))}
            </div>

            <FloatingCards />
          </figure>
        </div>

        {/* BOTTOM — scroll hint + tech strip */}
        <TechStrip />
      </div>

      <ScrollHint />

      {/* existing counter block below the hero (kept as-is) */}
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
