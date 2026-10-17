import Divider from "../components/shared/Divider.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import SectionLabel from "../components/shared/SectionLabel.jsx";
import TechGrimoire from "../components/TechStack/TechGrimoire.jsx";
import TechToken from "../components/TechStack/TechToken.jsx";
import { techGroups } from "../constants/techStack.js";

const TechStack = () => (
  <section id="stack" aria-labelledby="stack-heading" className="tech-stack-section relative overflow-hidden bg-ink text-fg">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(62%_46%_at_84%_16%,rgba(122,16,24,0.11),transparent_70%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.025]" />
    </div>
    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />
      <div className="grid items-center gap-y-8 lg:grid-cols-[55fr_45fr] lg:gap-x-8 xl:gap-x-12">
        <Reveal delay={0.04} className="min-w-0">
          <SectionLabel index="03">Tech Stack</SectionLabel>
          <h2 id="stack-heading" className="font-display mt-6 max-w-[12ch] text-[2.75rem] leading-[0.96] text-parchment sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.5rem]">
            Tools I use to<br />turn ideas into<br />real <span className="italic text-blood">products</span><span className="text-blood">.</span>
          </h2>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-fg-muted md:text-base">
            A focused set of technologies I use to design, build, ship and maintain modern applications.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="min-w-0"><TechGrimoire /></Reveal>
      </div>
      <ul className="mt-10 border-b border-hairline md:mt-12">
        {techGroups.map((group, index) => (
          <li key={group.id} className="tech-capability-row border-t border-hairline">
            <Reveal delay={Math.min(index * 0.05, 0.2)}>
              <div className="grid gap-6 py-7 md:py-9 lg:grid-cols-[minmax(260px,4fr)_minmax(0,8fr)] lg:gap-12">
                <div className="grid grid-cols-[2.3rem_minmax(0,1fr)] gap-3">
                  <span aria-hidden="true" className="pt-1 font-mono text-[11px] tracking-[0.18em] text-blood">{group.index}</span>
                  <div>
                    <h3 className="font-display text-2xl leading-none text-parchment md:text-[1.7rem]">{group.title}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-fg-muted">{group.description}</p>
                    <p className="mt-2 font-mono text-[9px] leading-relaxed tracking-[0.13em] text-fg-dim uppercase">Evidence — {group.evidence}</p>
                  </div>
                </div>
                <ul aria-label={`${group.title} technologies`} className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5">
                  {group.items.map((item) => <TechToken key={item} name={item} />)}
                </ul>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default TechStack;
