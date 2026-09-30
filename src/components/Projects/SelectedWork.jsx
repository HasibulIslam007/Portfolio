import SectionHeader from "../shared/SectionHeader.jsx";
import Reveal from "../shared/Reveal.jsx";
import Divider from "../shared/Divider.jsx";
import FeaturedProject from "./FeaturedProject.jsx";
import ProjectCaseStudy from "./ProjectCaseStudy.jsx";
import { projects } from "../../constants/projects.js";

/**
 * Phase 2B — "02 / SELECTED WORK" section.
 *
 * Editorial, curated composition rather than a card grid: an
 * asymmetric section header, the flagship case study (IELTSHUB) at
 * clearly stronger hierarchy, then the remaining projects as
 * alternating case-study rows separated by hairlines.
 *
 * Anchor clearance comes from the shared `section { scroll-margin-top }`
 * rule in index.css (same strategy as Phase 1 / 2A).
 */
const SelectedWork = () => {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative bg-ink text-fg"
    >
      {/* Atmosphere: faint rim glow + film grain (static, cheap) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[radial-gradient(75%_45%_at_15%_0%,rgba(255,38,56,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_95%_100%,rgba(122,16,24,0.10),transparent_65%)]" />
        <div className="hero-noise absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="section-shell">
        {/* Top rule with expanding crimson lead segment */}
        <Divider className="mb-9 md:mb-12" />

        <Reveal delay={0.05}>
          <SectionHeader
            index="02"
            label="Selected Work"
            headingId="projects-heading"
            className="max-w-2xl"
            title={
              <>
                Five projects, presented as case studies
                <span className="text-blood">.</span>
              </>
            }
            description={
              <p>
                The problem each one had to solve, what I built, and the
                technology behind it — starting with IELTSHUB, the flagship
                I&rsquo;m building now.
              </p>
            }
          />
        </Reveal>

        {/* Flagship */}
        <div className="mt-12 md:mt-16">
          <Divider />
          <div className="mt-9 md:mt-12">
            <FeaturedProject project={featured} />
          </div>
        </div>

        {/* Remaining case studies — alternating composition */}
        {rest.map((project, index) => (
          <div key={project.id} className="mt-14 md:mt-20">
            <Divider />
            <div className="mt-9 md:mt-12">
              <ProjectCaseStudy
                project={project}
                mediaSide={index % 2 === 0 ? "right" : "left"}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SelectedWork;
