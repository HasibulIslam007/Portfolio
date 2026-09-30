import SectionHeader from "../components/shared/SectionHeader.jsx";
import Divider from "../components/shared/Divider.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import { resumeUrl, socialLinks } from "../constants/index.js";

const profiles = socialLinks.filter(({ icon }) => icon === "github" || icon === "linkedin");

const Credentials = () => (
  <section id="credentials" aria-labelledby="credentials-heading" className="relative bg-ink text-fg">
    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />
      <Reveal>
        <div className="grid gap-9 lg:grid-cols-2 lg:gap-16">
          <SectionHeader
            index="06"
            label="Credentials"
            headingId="credentials-heading"
            title={<>Resume & profiles<span className="text-blood">.</span></>}
            description={<p>Source code, professional profile and a downloadable resume in one place.</p>}
          />
          <div className="min-w-0 border-t border-hairline">
            <a href={resumeUrl} target="_blank" rel="noreferrer noopener" className="flex min-h-16 items-center justify-between gap-5 border-b border-hairline py-5 text-fg transition-colors hover:text-blood">
              <span><span className="block font-medium">Download Resume</span><span className="mt-1 block text-xs text-fg-muted">PDF · Full-stack role, projects and technical skills</span></span>
              <span aria-hidden="true">↗</span>
            </a>
            {profiles.map(({ name, href }) => (
              <a key={name} href={href} target="_blank" rel="noreferrer noopener" className="flex min-h-16 items-center justify-between gap-5 border-b border-hairline py-5 text-fg-muted transition-colors hover:text-fg">
                <span>{name}</span><span aria-hidden="true">↗</span>
              </a>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default Credentials;
