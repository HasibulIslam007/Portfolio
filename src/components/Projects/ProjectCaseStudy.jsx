import Reveal from "../shared/Reveal.jsx";
import TechTags from "./TechTags.jsx";
import ProjectLinks from "./ProjectLinks.jsx";
import ProjectMedia from "./ProjectMedia.jsx";

/**
 * A single non-flagship case study with an alternating composition.
 *
 * Desktop (lg+): a two-column grid where the media spans both rows —
 * text + CTAs on one side, screenshot on the other. `mediaSide`
 * flips the image between rows while the DOM order stays stable, so
 * the mobile reading sequence is always deliberate:
 * number → meta → title → description → highlights → tags → image → CTAs.
 */
const ProjectCaseStudy = ({ project, mediaSide = "right" }) => {
  const mediaLeft = mediaSide === "left";

  const contentPos = mediaLeft ? "lg:col-start-2" : "lg:col-start-1";
  const mediaPos = mediaLeft ? "lg:col-start-1" : "lg:col-start-2";
  const linksPos = contentPos;

  const meta = [
    { label: "Category", value: project.category },
    ...(project.status ? [{ label: "Status", value: project.status }] : []),
  ];

  return (
    <article
      aria-labelledby={`${project.id}-title`}
      className="group grid gap-8 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-5"
    >
      {/* Text column */}
      <Reveal className={`${contentPos} lg:row-start-1`}>
        <span
          aria-hidden="true"
          className="block font-mono text-4xl leading-none font-medium text-fg-dim transition-colors duration-300 group-hover:text-blood group-focus-within:text-blood md:text-5xl"
        >
          {project.number}
        </span>

        <dl className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
          {meta.map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-2">
              <dt className="sr-only">{label}</dt>
              <dd
                className={
                  label === "Status"
                    ? "border border-hairline px-2 py-0.5 font-mono text-[10px] font-medium tracking-[0.2em] text-fg-dim uppercase"
                    : "font-mono text-[11px] font-medium tracking-[0.25em] text-fg-muted uppercase"
                }
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <h3
          id={`${project.id}-title`}
          className="mt-2.5 text-2xl font-semibold tracking-tight text-fg md:text-3xl lg:text-[2rem]"
        >
          {project.title}
        </h3>

        <p className="mt-4 max-w-xl text-base leading-relaxed text-fg-muted">
          {project.summary}
        </p>

        <p className="mt-6 font-mono text-[10px] font-medium tracking-[0.3em] text-fg-dim uppercase">
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

        <TechTags tags={project.stack} className="mt-7" />
      </Reveal>

      {/* Media — spans both rows so the CTAs can sit under the text */}
      <Reveal
        delay={0.06}
        className={`${mediaPos} lg:row-span-2 lg:row-start-1 lg:self-start`}
      >
        <ProjectMedia project={project} />
      </Reveal>

      {/* CTAs — after the media on mobile, bottom-aligned beside it on desktop */}
      <Reveal
        delay={0.1}
        className={`${linksPos} lg:row-start-2 lg:self-end lg:pt-4`}
      >
        <ProjectLinks project={project} />
      </Reveal>
    </article>
  );
};

export default ProjectCaseStudy;
