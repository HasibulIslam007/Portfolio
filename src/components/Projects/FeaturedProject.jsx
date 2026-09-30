import Reveal from "../shared/Reveal.jsx";
import TechTags from "./TechTags.jsx";
import ProjectLinks from "./ProjectLinks.jsx";
import ProjectMedia from "./ProjectMedia.jsx";

/**
 * The flagship case study (IELTSHUB). Clear step up in hierarchy from
 * the regular rows: flagship badge, oversized number beside a much
 * larger title, meta rail, three-column Problem / Contribution /
 * Highlights breakdown, prominent CTAs — then a large, full-width
 * media frame that dominates the block.
 */
const FeaturedProject = ({ project }) => {
  const meta = [
    { label: "Category", value: project.category },
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
  ];

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="group scroll-mt-24"
    >
      <Reveal>
        <div className="grid gap-y-9 lg:grid-cols-12 lg:gap-x-14">
          {/* Headline block */}
          <div className="lg:col-span-8">
            <p className="inline-flex items-center gap-2.5 border border-blood-line bg-blood/[0.07] px-3 py-1.5 font-mono text-[10px] font-medium tracking-[0.28em] text-fg uppercase">
              <span aria-hidden="true" className="size-1.5 bg-blood" />
              Current / Flagship Project
            </p>

            <div className="mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2">
              <span
                aria-hidden="true"
                className="font-mono text-5xl leading-none font-medium text-fg-dim transition-colors duration-300 group-hover:text-blood group-focus-within:text-blood md:text-7xl"
              >
                {project.number}
              </span>
              <h3
                id={`${project.id}-title`}
                className="text-[2.25rem] leading-[1.05] font-semibold tracking-[-0.02em] text-fg sm:text-5xl xl:text-6xl"
              >
                {project.title}
              </h3>
            </div>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-fg-muted md:text-lg">
              {project.summary}
            </p>
          </div>

          {/* Meta rail */}
          <dl className="flex flex-col gap-3.5 border-t border-hairline pt-5 lg:col-span-4 lg:self-start lg:border-t-0 lg:pt-2">
            {meta.map(({ label, value }) => (
              <div key={label} className="flex items-baseline gap-3">
                <dt className="font-mono text-[10px] font-medium tracking-[0.25em] text-fg-muted uppercase md:text-[11px]">
                  {label}
                </dt>
                <dd className="text-sm text-fg">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>

      {/* Problem / Contribution / Highlights breakdown */}
      <Reveal delay={0.08}>
        <div className="mt-10 grid gap-x-12 gap-y-9 border-t border-hairline pt-8 md:mt-12 md:grid-cols-3">
          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-fg-dim uppercase">
              Problem
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {project.problem}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-fg-dim uppercase">
              Contribution
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {project.contribution}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-fg-dim uppercase">
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
                    className="mt-[0.55em] h-1 w-1 shrink-0 bg-blood/80"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* Tags + prominent CTAs, then the large media frame */}
      <Reveal delay={0.12}>
        <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
          <TechTags tags={project.stack} />
          <ProjectLinks project={project} featured className="lg:ml-auto" />
        </div>

        <ProjectMedia project={project} featured className="mt-10 md:mt-12" />
      </Reveal>
    </article>
  );
};

export default FeaturedProject;
