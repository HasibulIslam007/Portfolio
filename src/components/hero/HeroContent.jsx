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
      {/* Availability status */}
      <div className="hero-status inline-flex w-fit items-center gap-2 rounded-full border border-hairline bg-ink-2/80 px-3.5 py-1.5 backdrop-blur-sm">
        <span className="relative flex size-2" aria-hidden="true">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-blood opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-blood" />
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] text-fg-muted uppercase">
          Available for opportunities
        </span>
      </div>

      {/* Eyebrow */}
      <p className="hero-eyebrow font-mono text-[11px] font-medium tracking-[0.3em] text-blood uppercase md:text-xs">
        Full-Stack Developer{" "}
        <span className="text-fg-dim" aria-hidden="true">
          •
        </span>{" "}
        Software Engineer
      </p>

      {/* Headline */}
      <h1 className="hero-headline text-[2.35rem] leading-[1.04] font-bold tracking-[-0.02em] text-fg sm:text-5xl lg:text-6xl xl:text-[4rem]">
        <span className="line block">Building software</span>
        <span className="line block">that solves</span>
        <span className="line block text-blood [text-shadow:0_0_45px_rgba(255,38,56,0.35)]">
          real problems.
        </span>
      </h1>

      {/* Supporting copy */}
      <p className="hero-description max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
        I&rsquo;m <span className="text-fg">Md Hasibul Islam</span> — a
        Full-Stack Developer and Software Engineer building web applications,
        backend APIs and connected product experiences.
      </p>

      {/* CTAs */}
      <div className="flex flex-wrap items-center gap-3 md:gap-4">
        <a
          href="#projects"
          className="hero-cta group inline-flex items-center gap-2 rounded-full bg-blood px-6 py-3 text-sm font-semibold text-[#0a0002] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#ff4050] hover:shadow-[0_10px_30px_-10px_rgba(255,38,56,0.7)] md:px-7 md:py-3.5"
        >
          View My Work
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="hero-cta group inline-flex items-center gap-2 rounded-full border border-hairline bg-ink-2/60 px-6 py-3 text-sm font-medium text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-blood-line hover:bg-surface hover:text-blood md:px-7 md:py-3.5"
        >
          Download Resume
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
