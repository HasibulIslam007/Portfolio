import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";

import { socialLinks } from "../../constants";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  email: FaEnvelope,
};

/**
 * Compact social links shown under the hero CTAs.
 * Icon-only links with aria-labels for screen readers.
 */
const SocialLinks = () => {
  return (
    <div className="flex items-center gap-3">
      {socialLinks.map(({ name, href, icon, external }) => {
        const Icon = ICONS[icon];

        return (
          <a
            key={name}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer noopener" : undefined}
            aria-label={name}
            title={name}
            className="flex size-10 items-center justify-center rounded-full border border-hairline bg-ink-2/70 text-fg-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-blood-line hover:text-blood hover:shadow-[0_0_18px_-6px_rgba(255,38,56,0.6)]"
          >
            <Icon className="text-base" aria-hidden="true" />
          </a>
        );
      })}
    </div>
  );
};

export default SocialLinks;
