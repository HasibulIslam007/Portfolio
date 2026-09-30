import SectionHeader from "../components/shared/SectionHeader.jsx";
import Divider from "../components/shared/Divider.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import { experience } from "../constants/engineering.js";
import { projects } from "../constants/projects.js";

const Experience = () => (
  <section id="experience" aria-labelledby="experience-heading" className="relative bg-ink text-fg">
    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />
      <Reveal>
        <SectionHeader
          index="04"
          label="Experience"
          headingId="experience-heading"
          className="max-w-2xl"
          title={<>Hands-on, across the stack<span className="text-blood">.</span></>}
          description={<p>Project-based development, from learner workspaces to connected storefronts.</p>}
        />
      </Reveal>

      <ol className="mt-12 ml-1 border-l border-hairline md:mt-16">
        {experience.map((entry) => {
          const project = projects.find(({ id }) => id === entry.projectId);
          return (
            <li key={entry.projectId} className="relative pl-6 pb-10 last:pb-0 md:pl-10 md:pb-14">
              <span aria-hidden="true" className="absolute top-2 -left-[4.5px] size-2 rounded-full bg-blood" />
              <Reveal>
                <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] md:gap-10">
                  <p className="pt-0.5 font-mono text-xs leading-6 tracking-wide text-fg-muted">{entry.period}</p>
                  <div className="min-w-0">
                    <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{entry.role}</h3>
                    <p className="mt-2 text-sm text-fg-muted">{project.title} <span aria-hidden="true">/</span> Project work</p>
                    <ul className="mt-5 max-w-2xl list-disc space-y-3 pl-4 text-sm leading-relaxed text-fg-muted marker:text-blood md:text-base">
                      {entry.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}
                    </ul>
                  </div>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ol>
      <a href="#engineering-proof" className="mt-9 inline-flex min-h-11 items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg">
        Explore the engineering evidence <span aria-hidden="true">↓</span>
      </a>
    </div>
  </section>
);

export default Experience;
