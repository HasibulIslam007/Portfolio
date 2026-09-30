// components/Footer.jsx
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from "react-icons/fa";

import { email, socialLinks } from "../constants";

/**
 * Phase 2C — footer restyled into the Phase 1 + 2A design system:
 * near-black, hairline top border, muted text, restrained crimson
 * hover/focus accent. Accessible icon labels + reduced-motion-aware
 * scroll-to-top.
 *
 * Icons are derived from the verified `socialLinks` data (GitHub,
 * LinkedIn, Email) so a profile can never drift out of sync with the
 * links used elsewhere on the page.
 */
const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  email: FaEnvelope,
};

const Footer = () => {
  const scrollToTop = () => {
    const behavior =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  return (
    <footer className="relative z-10 border-t border-hairline bg-ink text-fg-muted">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center justify-between gap-6 px-5 py-10 text-sm md:flex-row md:px-10 xl:px-16">
        {/* Left Side */}
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} MD Hasibul Islam. All rights
          reserved.
        </p>

        {/* Social Icons */}
        <div className="flex gap-2">
          {socialLinks.map(({ name, href, icon, external }) => {
            const Icon = ICONS[icon];
            if (!Icon) return null;

            return (
              <a
                key={name}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer noopener" : undefined}
                aria-label={`MD Hasibul Islam — ${name}${external ? " (opens in a new tab)" : ""}`}
                className="flex size-10 items-center justify-center rounded-lg border border-hairline text-lg text-fg-muted transition-colors duration-300 hover:border-blood-line hover:text-blood"
              >
                <Icon aria-hidden="true" />
              </a>
            );
          })}
        </div>

        {/* Scroll to Top */}
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll back to top"
          className="flex size-10 items-center justify-center rounded-lg border border-hairline text-lg text-fg-muted transition-colors duration-300 hover:border-blood-line hover:text-blood"
        >
          <FaArrowUp aria-hidden="true" />
        </button>
      </div>

      {/* Real email, always available as text (not an icon-only affordance) */}
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 md:px-10 xl:px-16">
        <a
          href={`mailto:${email}`}
          className="inline-flex min-h-11 items-center text-sm break-all text-fg-muted transition-colors hover:text-blood"
        >
          {email}
        </a>
      </div>
    </footer>
  );
};

export default Footer;
