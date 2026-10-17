import Reveal from "../shared/Reveal.jsx";
import TechTags from "./TechTags.jsx";
import ProjectLinks from "./ProjectLinks.jsx";
import ProjectMedia from "./ProjectMedia.jsx";

/**
 * Design V2 flagship presentation.
 *
 * Rendered for whatever project carries the `featured` flag in
 * constants/projects.js, labelled "CHAPTER <n> · FLAGSHIP" where <n> is
 * derived from the project's position in the data array. A chapter marker
 * and oversized serif title sit against near-black on the left; the
 * product media gets the dominant area on the right. Deliberately NOT a
 * rounded SaaS card — the composition is open, framed only by 1px
 * architectural rules and corner ticks, with a crimson spine on the left.
 *
 * Copy, tags and links all come from constants/projects.js, so nothing
 * here is invented and every URL stays verifiable. A project without
 * `problem`/`contribution` simply omits that copy; one without an image
 * falls back to the honest mediaNote placeholder in ProjectMedia.
 */
const FeaturedProject = ({ project, chapter = project.number }) => {
  const meta = [
    { label: "Category", value: project.category },
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
  ];

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="group relative"
    >
      {/* Crimson spine + faint geometric fragments */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-blood/70 via-blood/25 to-transparent lg:block"
      />

      {/* Asymmetric cinematic composition: text column left, the project
          itself given the dominant media area on the right. The CTAs live
          in the second grid row so mobile reads text → media → links. */}
      <div className="lg:pl-10">
        <div className="grid gap-y-9 lg:grid-cols-12 lg:gap-x-14">
          {/* Headline block */}
          <Reveal className="lg:col-span-5 lg:row-start-1">
            <p className="inline-flex items-center gap-2.5 border-l-2 border-blood bg-blood/[0.06] py-1.5 pr-4 pl-3.5 font-mono text-[10px] font-medium tracking-[0.3em] text-fg-muted uppercase">
              Chapter {chapter}
              <span className="text-blood-deep" aria-hidden="true">
                •
              </span>
              Flagship
            </p>

            <h3
              id={`${project.id}-title`}
              className="font-display mt-7 text-[3rem] leading-[0.95] text-parchment sm:text-[4.25rem] lg:text-[4.5rem]"
            >
              {project.title}
            </h3>

            <p className="mt-6 text-base leading-relaxed text-fg-muted md:text-lg">
              {project.summary}
            </p>

            {/* Meta rail */}
            <dl className="mt-8 flex flex-col gap-3.5 border-t border-hairline pt-5">
              {meta.map(({ label, value }) => (
                <div key={label} className="flex items-baseline gap-3">
                  <dt className="font-mono text-[10px] font-medium tracking-[0.25em] text-fg-muted uppercase md:text-[11px]">
                    {label}
                  </dt>
                  <dd className="text-sm text-fg">{value}</dd>
                </div>
              ))}
            </dl>

            <TechTags tags={project.stack} className="mt-7" />
          </Reveal>

          {/* Media — the dominant visual proof, framed by crimson atmosphere */}
          <Reveal
            delay={0.08}
            className="lg:col-span-7 lg:row-span-2 lg:row-start-1 lg:self-start"
          >
            <div className="relative">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-5 bg-[radial-gradient(58%_58%_at_55%_42%,rgba(255,38,56,0.07),transparent_72%)]"
              />
              <ProjectMedia
                project={project}
                chapter={chapter}
                featured
                className="relative"
              />
            </div>
          </Reveal>

          {/* CTAs — after the media on mobile, under the text on desktop */}
          <Reveal
            delay={0.14}
            className="lg:col-span-5 lg:row-start-2 lg:self-start"
          >
            <ProjectLinks project={project} featured />
          </Reveal>
        </div>
      </div>

      {/* Problem / Contribution / Highlights breakdown */}
      <Reveal delay={0.08}>
        <div className="mt-12 grid gap-x-12 gap-y-9 border-t border-hairline pt-9 lg:pl-10 md:mt-14 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-silver-dim uppercase">
              Problem
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {project.problem}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-silver-dim uppercase">
              Contribution
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {project.contribution}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-silver-dim uppercase">
              Highlights
            </p>
            <ul className="mt-3 space-y-2.5">
              {project.highlights.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-fg-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-px w-3 shrink-0 bg-blood/70"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

    </article>
  );
};

export default FeaturedProject;
