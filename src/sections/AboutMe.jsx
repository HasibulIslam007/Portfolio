import SectionHeader from "../components/shared/SectionHeader.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import Divider from "../components/shared/Divider.jsx";
import CapabilityList from "../components/About/CapabilityList.jsx";

/**
 * Phase 2A about section — asymmetric editorial layout.
 *
 * Desktop: left column carries the "01 / ABOUT" label, headline and
 * supporting copy; right column holds the numbered capability rows;
 * a metadata rail closes the section. Mobile stacks everything in a
 * single column with tighter rhythm.
 *
 * Anchor clearance comes from the shared `section { scroll-margin-top }`
 * rule in index.css (same strategy as Phase 1).
 */
// Counts are counted from the verified project data, never asserted as
// a duration — no employment history or dates are verifiable here.
const metadata = [
  { label: "Status", value: "Available for opportunities" },
  { label: "Currently", value: "IELTSHUB — in development" },
  { label: "Work", value: "5 projects · 3 live deployments" },
];

const AboutMe = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="relative bg-ink text-fg"
  >
    {/* Atmosphere: faint red rim glow + film grain (static, cheap) */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(90%_55%_at_80%_0%,rgba(255,38,56,0.05),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(70%_50%_at_10%_100%,rgba(122,16,24,0.10),transparent_65%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.03]" />
    </div>

    <div className="section-shell">
      {/* Top rule with expanding crimson lead segment */}
      <Divider className="mb-9 md:mb-12" />

      <div className="grid gap-y-12 lg:grid-cols-[minmax(0,57fr)_minmax(0,43fr)] lg:gap-x-14 xl:gap-x-20">
        {/* Left — editorial headline + supporting copy */}
        <Reveal delay={0.05}>
          <SectionHeader
            index="01"
            label="About"
            headingId="about-heading"
            className="lg:pr-6"
            title={
              <>
                I build software at the intersection of engineering and
                intelligent systems
                <span className="text-blood">.</span>
              </>
            }
            description={
              <>
                <p>
                  I&rsquo;m <span className="text-fg">Md Hasibul Islam</span>, a
                  full-stack developer working end to end across the stack —
                  responsive frontends, backend APIs, authentication, databases
                  and the application architecture that ties them together —
                  with a preference for clean, maintainable systems over clever
                  ones.
                </p>
                <p>
                  I&rsquo;m also interested in applied AI/ML, including the
                  resume analysis in JobFlow AI and image-editing workflows in
                  AImage. My focus is on integrating useful features into
                  complete applications.
                </p>
              </>
            }
          />
        </Reveal>

        {/* Right — numbered capability rows */}
        <CapabilityList />
      </div>

      {/* Metadata rail */}
      <Reveal delay={0.15} className="mt-14 md:mt-20">
        <dl className="flex flex-col gap-3.5 border-t border-hairline pt-5 md:flex-row md:items-baseline md:justify-between md:gap-6">
          {metadata.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1"
            >
              <dt className="font-mono text-[10px] font-medium tracking-[0.25em] text-fg-muted uppercase md:text-[11px]">
                {label}
              </dt>
              <dd className="text-sm text-fg">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </section>
);

export default AboutMe;
