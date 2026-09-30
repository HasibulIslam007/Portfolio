import SectionHeader from "../components/shared/SectionHeader.jsx";
import Divider from "../components/shared/Divider.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import { engineeringProof } from "../constants/engineering.js";
import { projects } from "../constants/projects.js";
import { socialLinks } from "../constants/index.js";

const github = socialLinks.find(({ icon }) => icon === "github");

const EngineeringProof = () => (
  <section id="engineering-proof" aria-labelledby="engineering-proof-heading" className="relative bg-ink text-fg">
    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />
      <Reveal>
        <SectionHeader
          index="05"
          label="Engineering Proof"
          headingId="engineering-proof-heading"
          className="max-w-2xl"
          title={<>Beyond the interface<span className="text-blood">.</span></>}
          description={<p>A closer look at the contracts, checks and application layers behind the work. Explore the implementation in each repository.</p>}
        />
      </Reveal>

      <ul className="mt-12 border-b border-hairline md:mt-16">
        {engineeringProof.map((entry) => {
          const project = projects.find(({ id }) => id === entry.projectId);
          return (
            <li key={entry.projectId} className="border-t border-hairline py-7 md:py-9">
              <Reveal>
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
                  <div className="min-w-0">
                    <p className="font-mono text-xs leading-6 tracking-wide text-fg-muted">{entry.focus}</p>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight md:text-2xl">{project.title}</h3>
                    <a href={project.githubUrl} target="_blank" rel="noreferrer noopener" aria-label={`Explore ${project.title} source on GitHub (opens in a new tab)`} className="mt-3 inline-flex min-h-11 items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg">
                      Explore source <span aria-hidden="true" className="text-blood">↗</span>
                    </a>
                  </div>
                  <dl className="grid gap-6 sm:grid-cols-2">
                    {entry.evidence.map(({ label, detail }) => (
                      <div key={label} className="min-w-0 border-l border-hairline pl-5">
                        <dt className="font-mono text-xs leading-6 tracking-wide text-fg">{label}</dt>
                        <dd className="mt-2 text-sm leading-relaxed text-fg-muted">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <div className="mt-7 flex flex-wrap gap-x-8 gap-y-3">
        <a href={github.href} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg">View GitHub profile <span aria-hidden="true">↗</span></a>
        <a href="#credentials" className="inline-flex min-h-11 items-center gap-3 text-sm text-fg-muted transition-colors hover:text-fg">Resume & profiles <span aria-hidden="true">↓</span></a>
      </div>
    </div>
  </section>
);

export default EngineeringProof;
