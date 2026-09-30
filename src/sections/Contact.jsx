import SectionHeader from "../components/shared/SectionHeader.jsx";
import Reveal from "../components/shared/Reveal.jsx";
import Divider from "../components/shared/Divider.jsx";
import { email, resumeUrl, socialLinks } from "../constants/index.js";

/**
 * Direct channels only — there is no backend to receive a form post, so
 * no contact form is rendered (a form that silently does nothing would be
 * a lie). Email is a real mailto: link; profiles are real public URLs.
 */
const channels = [
  {
    label: "Email",
    value: email,
    href: `mailto:${email}`,
    external: false,
  },
  ...socialLinks
    .filter(({ icon }) => icon === "github" || icon === "linkedin")
    .map(({ name, href }) => ({
      label: name,
      value: href.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""),
      href,
      external: true,
    })),
  {
    label: "Resume",
    value: "resume.pdf",
    href: resumeUrl,
    external: true,
  },
];

const Contact = () => (
  <section id="contact" aria-labelledby="contact-heading" className="relative bg-ink text-fg">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(70%_45%_at_50%_0%,rgba(255,38,56,0.05),transparent_60%)]" />
      <div className="hero-noise absolute inset-0 opacity-[0.03]" />
    </div>
    <div className="section-shell">
      <Divider className="mb-9 md:mb-12" />
      <Reveal delay={0.05}>
        <SectionHeader index="07" label="Contact" headingId="contact-heading" className="max-w-2xl"
          title={<>Let&rsquo;s build something useful<span className="text-blood">.</span></>}
          description={<p>Questions, ideas or opportunities — the fastest way to reach me is email. I read everything and reply as soon as I can.</p>} />
      </Reveal>
      <ul className="mt-12 border-b border-hairline md:mt-16">
        {channels.map((c) => (
          <li key={c.label} className="group border-t border-hairline transition-colors duration-300 hover:border-blood-line focus-within:border-blood-line">
            <a href={c.href} target={c.external ? "_blank" : undefined} rel={c.external ? "noreferrer noopener" : undefined}
              aria-label={`${c.label} — ${c.value}${c.external ? " (opens in a new tab)" : ""}`}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 md:py-6">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg-muted md:text-[11px]">{c.label}</span>
              <span className="min-w-0 break-all text-base text-fg transition-colors duration-300 group-hover:text-blood md:text-lg">{c.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Contact;
