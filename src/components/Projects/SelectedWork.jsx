import SectionLabel from "../shared/SectionLabel.jsx";
import Reveal from "../shared/Reveal.jsx";
import Divider from "../shared/Divider.jsx";
import FeaturedProject from "./FeaturedProject.jsx";
import ProjectCaseStudy from "./ProjectCaseStudy.jsx";
import { projects } from "../../constants/projects.js";

/**
 * "02 / SELECTED WORK" — cinematic editorial showcase.
 *
 * Header: asymmetric label/statement split with a self-link down to the
 * flagship. Flagship: strong text column left, dominant media area right
 * (asymmetric, per Design V2). Remaining projects: alternating case-study
 * chapters — never a card grid.
 *
 * All content comes from constants/projects.js. Chapter numbers are
 * DERIVED from each project's position in that array, so adding a project
 * to the source of truth is enough — no JSX edits, no hardcoded names.
 *
 * Anchor clearance: `section { scroll-margin-top }` in index.css plus
 * `scroll-mt-24` on each chapter block.
 */

/** Chapter number from position in projects.js (01, 02, 03 …). */
const chapterOf = (project) =>
  String(projects.indexOf(project) + 1).padStart(2, "0");

const SelectedWork = () => {
  const featured = projects.find((project) => project.featured);
  const rest = projects.filter((project) => !project.featured);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="relative bg-ink text-fg"
    >
      {/* Atmosphere: smoke, crimson radials + eclipse glow, film grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <div className="smoke-wash absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(75%_45%_at_15%_0%,rgba(255,38,56,0.05),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_95%_100%,rgba(122,16,24,0.10),transparent_65%)]" />
        {/* Soft eclipse-red atmosphere behind the flagship media area */}
        <div className="absolute inset-0 bg-[radial-gradient(45%_38%_at_74%_16%,rgba(255,38,56,0.07),transparent_70%)]" />
        <div className="hero-noise absolute inset-0 opacity-[0.03]" />
      </div>

      <div className="section-shell">
        {/* Top rule with expanding crimson lead segment */}
        <Divider className="mb-9 md:mb-12" />

        {/* Header — mono label left, oversized serif statement right */}
        <Reveal delay={0.05}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,14fr)_minmax(0,58fr)] lg:gap-x-14 xl:gap-x-20">
            <div className="hidden lg:block">
              <SectionLabel index="02">Selected Work</SectionLabel>
            </div>
            <div className="min-w-0">
              <div className="lg:hidden">
                <SectionLabel index="02">Selected Work</SectionLabel>
              </div>
              <h2
                id="projects-heading"
                className="font-display mt-6 text-[2.5rem] leading-[0.95] text-parchment sm:text-[3.25rem] lg:text-[4rem] xl:text-[4.5rem]"
              >
                Projects that turn ideas
                <br />
                into real{" "}
                <span className="text-blood italic">products</span>
                <span className="text-blood">.</span>
              </h2>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted md:text-[1.0625rem]">
                The problem each one had to solve, what I built, and the
                technology behind it — starting with IELTSHUB, the flagship
                I&rsquo;m building now.
              </p>
              <a
                href={featured ? `#project-${chapterOf(featured)}` : "#projects"}
                className="group mt-8 inline-flex min-h-11 items-center gap-2.5 border border-blood-line bg-blood/[0.06] px-5 py-3 font-mono text-[11px] font-medium tracking-[0.25em] text-fg uppercase transition-colors duration-300 hover:border-[rgba(255,38,56,0.6)] hover:bg-blood/[0.12] motion-reduce:transition-none"
              >
                Explore my work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5 motion-reduce:group-hover:translate-y-0"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </Reveal>

        {/* Flagship chapter — IELTSHUB via the `featured` flag in projects.js */}
        {featured ? (
          <div
            id={`project-${chapterOf(featured)}`}
            className="mt-12 scroll-mt-24 md:mt-16"
          >
            <Divider />
            <div className="mt-9 md:mt-12">
              <FeaturedProject
                project={featured}
                chapter={chapterOf(featured)}
              />
            </div>
          </div>
        ) : null}

        {/* Remaining chapters — alternating composition, order from projects.js */}
        {rest.map((project, index) => (
          <div
            key={project.id}
            id={`project-${chapterOf(project)}`}
            className="mt-14 scroll-mt-24 md:mt-20"
          >
            <Divider />
            <div className="mt-9 md:mt-12">
              <ProjectCaseStudy
                project={project}
                chapter={chapterOf(project)}
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
