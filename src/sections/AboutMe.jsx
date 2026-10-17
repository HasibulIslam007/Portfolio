import Reveal from "../components/shared/Reveal.jsx";
import Divider from "../components/shared/Divider.jsx";
import SectionLabel from "../components/shared/SectionLabel.jsx";
import CapabilityList from "../components/About/CapabilityList.jsx";
import AstasSword from "../components/About/AstasSword.jsx";

/**
 * About section — two-column editorial split, 55/45 on desktop.
 *
 * LEFT: section marker, headline, the argument, capabilities.
 * RIGHT: the sword/rock GLB (AstasSword).
 *
 * WHY THE MODEL IS A COLUMN AND NOT A BANNER. The earlier version put the
 * visual *below* all the copy, which on a 1440 screen meant a long scroll of
 * text before anything visual happened, and a dead band after it. Side by side
 * the section is one screen tall and the sword is visible while the first line
 * is being read. Below `lg` the grid collapses to one column and DOM order
 * becomes the mobile stack: label → headline → text → capabilities → model.
 *
 * The section-level rune decoration was REMOVED here on purpose: the model
 * stage now carries the section's single rune circle, and two of them compete.
 *
 * `#about` is untouched, so the navbar anchor still resolves. Anchor clearance
 * comes from the shared `section { scroll-margin-top }` rule in index.css.
 *
 */
const AboutMe = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="relative overflow-hidden bg-ink text-fg"
  >
    {/* Static, lightweight atmosphere shared by both columns. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="smoke-wash absolute inset-0 opacity-45" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_55%_at_78%_50%,rgba(122,16,24,0.11),transparent_70%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.03]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_48%,rgba(3,3,4,0.5)_100%)]" />
    </div>

    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />

      <div className="grid items-center gap-y-11 lg:grid-cols-[55fr_45fr] lg:gap-x-8 xl:gap-x-12">
        {/* ── LEFT — 55% ── */}
        <div className="min-w-0">
          <Reveal delay={0.04}>
            <SectionLabel index="01">About</SectionLabel>
          </Reveal>

          <Reveal delay={0.05}>
            <h2
              id="about-heading"
              className="font-display mt-6 text-[2.75rem] leading-[0.98] text-parchment sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]"
            >
              More than
              <br />
              just{" "}
              <span className="italic text-blood">code</span>
              <span className="text-blood">.</span>
            </h2>

            <div className="mt-7 max-w-[42rem] space-y-4 text-[15px] leading-relaxed text-fg-muted md:text-base">
              <p>
                I&rsquo;m{" "}
                <span className="text-fg">Md Hasibul Islam</span>, a full-stack
                developer. I build complete web applications — the interface
                people use, the APIs behind it, the authentication and data
                layers underneath, and the architecture that keeps it
                maintainable after launch.
              </p>
              <p>
                Most of my work is product-shaped: a real problem, a real user,
                a system that has to hold together. I care about clean,
                legible code over clever code, and about shipping something
                that actually works.
              </p>
              <p>
                I&rsquo;m also drawn to applied AI/ML — not as research, but as
                useful features inside real products, like resume matching in
                JobFlow AI and image workflows in AImage.
              </p>
            </div>
          </Reveal>

          {/* Capabilities */}
          <Reveal delay={0.1} className="mt-8 max-w-[42rem]">
            <CapabilityList />
          </Reveal>
        </div>

        {/* ── RIGHT — 45% ── */}
        <div className="min-w-0">
          <Reveal delay={0.08}>
            <AstasSword />
          </Reveal>
        </div>
      </div>
    </div>
  </section>
);

export default AboutMe;
