import { useRef } from "react";

import { gsap, useGSAP } from "../../lib/gsap.js";

import SocialLinks from "./SocialLinks.jsx";
import { resumeUrl } from "../../constants";
import { prefersReducedMotion } from "../../lib/usePrefersReducedMotion";

/**
 * Left column of the hero: availability badge, eyebrow, headline,
 * description, CTAs and social links.
 *
 * Entrance sequencing is driven by GSAP (see spec timings):
 *   0.35s badge → 0.5s eyebrow → 0.6s headline → 0.95s description
 *   → 1.1s CTAs → 1.35s socials.
 */
const HeroContent = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      // Respect prefers-reduced-motion: keep everything visible, no tweening.
      if (prefersReducedMotion()) return;

      const timeline = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      timeline
        .fromTo(
          ".hero-status",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          0.35
        )
        .fromTo(
          ".hero-eyebrow",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.5
        )
        .fromTo(
          ".hero-headline span.line",
          { autoAlpha: 0, y: 34 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.09 },
          0.6
        )
        .fromTo(
          ".hero-description",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.95
        )
        .fromTo(
          ".hero-cta",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
          1.1
        )
        .fromTo(
          ".hero-socials",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.45 },
          1.35
        );
    },
    { scope: rootRef }
  );

  return (
    <header
      ref={rootRef}
      className="relative z-10 flex flex-col gap-6 md:gap-7"
    >
      {/* Decorative rail: a single crimson hairline with tick marks, echoing
          the rune dial. Absolutely positioned, so it never affects layout. */}
      <span
        aria-hidden="true"
        className="absolute top-1 bottom-1 -left-8 hidden w-px bg-gradient-to-b from-transparent via-blood-line to-transparent lg:block"
      />
      <span
        aria-hidden="true"
        className="absolute top-1/4 -left-[3.5px] hidden h-px w-2 bg-blood/50 lg:block"
      />
      <span
        aria-hidden="true"
        className="absolute top-3/4 -left-[3.5px] hidden h-px w-2 bg-blood/50 lg:block"
      />

      {/* Availability status */}
      <div className="hero-status inline-flex w-fit items-center gap-2.5 border border-hairline bg-ink-2/60 px-3.5 py-1.5">
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-blood opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-blood" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.22em] text-fg-muted uppercase">
          Available for opportunities
        </span>
      </div>

      {/* Eyebrow */}
      <p className="hero-eyebrow flex items-center gap-3 font-mono text-[10px] font-medium tracking-[0.34em] text-silver-dim uppercase sm:text-[11px]">
        <span className="h-px w-6 bg-blood" aria-hidden="true" />
        Full-Stack Developer
        <span className="text-blood-deep" aria-hidden="true">
          •
        </span>
        Software Engineer
      </p>

      {/* Headline — cinematic display serif. The crimson word is the only
          saturated element in the composition, so it also carries the only
          glow. */}
      <h1 className="hero-headline font-display text-[3.1rem] text-parchment sm:text-[4.25rem] lg:text-[5.25rem] xl:text-[6rem]">
        <span className="line block">I build</span>
        <span className="line block italic text-silver-edge">
          digital worlds
        </span>
        <span className="line block">
          that <span className="text-blood text-glow-blood">work</span>
          <span className="text-blood">.</span>
        </span>
      </h1>

      {/* Supporting copy */}
      <p className="hero-description max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
        I&rsquo;m <span className="text-fg">Md Hasibul Islam</span> — a
        full-stack developer and software engineer. I design and build web
        applications end to end: responsive frontends, backend APIs,
        authentication, databases, and the architecture that holds it
        together.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <a
          href="#projects"
          className="hero-cta group relative inline-flex items-center gap-2.5 overflow-hidden border border-blood-line bg-blood/[0.09] px-7 py-3.5 text-sm font-medium tracking-wide text-parchment transition-all duration-300 hover:border-[rgba(255,38,56,0.55)] hover:bg-blood/[0.16] md:px-8 md:py-4"
        >
          <span
            aria-hidden="true"
            className="absolute inset-y-0 -left-full w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-[left] duration-700 ease-out group-hover:left-full motion-reduce:hidden"
          />
          Explore My Work
          <span
            aria-hidden="true"
            className="text-blood transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="hero-cta group inline-flex items-center gap-2.5 border border-hairline bg-ink-2/40 px-7 py-3.5 text-sm font-medium tracking-wide text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-silver-dim/50 hover:text-fg md:px-8 md:py-4"
        >
          Résumé
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          >
            ↗
          </span>
        </a>
      </div>

      {/* Social links */}
      <div className="hero-socials pt-1">
        <SocialLinks />
      </div>
    </header>
  );
};

export default HeroContent;
