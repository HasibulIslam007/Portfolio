import HeroContent from "../components/hero/HeroContent.jsx";
import HeroScene from "../components/hero/HeroScene.jsx";
import FloatingCards from "../components/hero/FloatingCards.jsx";
import TechStrip from "../components/hero/TechStrip.jsx";
import AnimatedCounter from "../components/HeroModels/AnimatedCounter.jsx";

/**
 * Phase 1 hero — cinematic dark/red foundation.
 *
 * Layout: left column ≈54% (copy), right column ≈46% (3D workspace).
 * On mobile everything stacks in spec order:
 * badge → headline → description → CTAs → socials → 3D model →
 * IELTSHUB card → tech strip.
 *
 * Entrance sequencing lives in HeroContent (GSAP), floating UI in
 * FloatingCards/TechStrip (Framer Motion) and continuous motion in the
 * R3F components (useFrame).
 */
const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden bg-ink">
      {/* Atmosphere: red rim glow, deep charcoal wash, film grain */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_75%_35%,rgba(255,38,56,0.07),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_60%_at_20%_85%,rgba(122,16,24,0.16),transparent_65%)]" />
        <div className="hero-noise absolute inset-0 opacity-[0.045]" />
        {/* bottom fade into the next section */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-svh w-full max-w-[1440px] flex-col px-5 md:px-10 xl:px-16">
        <div className="grid flex-1 items-center gap-y-12 pb-10 pt-28 md:pt-32 lg:grid-cols-[54fr_46fr] lg:gap-x-8 lg:pt-36">
          {/* LEFT — copy */}
          <HeroContent />

          {/* RIGHT — 3D workspace + floating cards */}
          <figure className="relative m-0 flex flex-col">
            <div className="hero-stage">
              <HeroScene />
            </div>
            <FloatingCards />
          </figure>
        </div>

        {/* BOTTOM — tech strip */}
        <TechStrip />
      </div>

      {/* existing counter block below the hero (kept as-is) */}
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
