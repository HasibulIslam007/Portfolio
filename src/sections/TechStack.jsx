import SectionHeader from "../components/shared/SectionHeader.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import Divider from "../components/shared/Divider.jsx";
import TechTags from "../components/Projects/TechTags.jsx";
import { techGroups } from "../constants/techStack.js";

/**
 * Phase 2C — "03 / STACK" section.
 *
 * Editorial category rows answering "what can this engineer actually
 * build": each technology below is verified against the portfolio —
 * project data (constants/projects.js), package files and hero copy —
 * and named in the group `evidence` line so the claim is traceable.
 * Compact mono labels (shared TechTags) rather than a logo wall; no
 * icons, no marquee, no animation library beyond the shared Reveal.
 *
 * Anchor clearance comes from the shared `section { scroll-margin-top }`
 * rule in index.css (same strategy as Phase 1 / 2A / 2B).
 */
const TechStack = () => (
  <section
    id="stack"
    aria-labelledby="stack-heading"
    className="relative bg-ink text-fg"
  >
    {/* Atmosphere: faint rim glow + film grain (static, cheap) */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_85%_0%,rgba(255,38,56,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_5%_100%,rgba(122,16,24,0.10),transparent_65%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.03]" />
    </div>

    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />

      <Reveal delay={0.05}>
        <SectionHeader
          index="03"
          label="Stack"
          headingId="stack-heading"
          className="max-w-2xl"
          title={
            <>
              What I build with<span className="text-blood">.</span>
            </>
          }
          description={
            <p>
              The technologies behind my project work, grouped by the part of
              the system they help build.
            </p>
          }
        />
      </Reveal>

      <ul className="mt-12 border-b border-hairline md:mt-16">
        {techGroups.map((group, index) => (
          <li
            key={group.id}
            className="group border-t border-hairline transition-colors duration-300 hover:border-blood-line focus-within:border-blood-line"
          >
            <Reveal delay={Math.min(index * 0.06, 0.24)}>
              <div className="grid gap-x-12 gap-y-5 py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:py-8">
                {/* Category */}
                <div className="min-w-0">
                  <p
                    aria-hidden="true"
                    className="font-mono text-[11px] font-medium tracking-[0.18em] text-fg-dim transition-colors duration-300 group-hover:text-blood"
                  >
                    {group.index}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-fg transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 md:text-xl">
                    {group.title}
                  </h3>
                  <p className="mt-1.5 max-w-md text-sm leading-relaxed text-fg-muted">
                    {group.description}
                  </p>
                  <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.14em] text-fg-dim uppercase">
                    Evidence — {group.evidence}
                  </p>
                </div>

                {/* Technologies */}
                <div className="min-w-0 md:pt-1">
                  <TechTags tags={group.items} />
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TechStack;
