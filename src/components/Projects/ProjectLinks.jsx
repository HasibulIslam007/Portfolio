/**
 * Case-study CTAs. Every anchor is a real external link with a
 * descriptive accessible name, new-tab semantics and a keyboard
 * focus state (global :focus-visible). A CTA whose URL does not
 * exist is simply not rendered — never href="#".
 */
const ProjectLinks = ({ project, featured = false, className = "" }) => {
  const { title, liveUrl, githubUrl } = project;

  if (!liveUrl && !githubUrl) return null;

  const sizing = featured ? "px-5 py-3 md:px-6 md:py-3.5" : "px-5 py-3";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`View Project — ${title} live site (opens in a new tab)`}
          className={`group inline-flex min-h-11 items-center gap-2 border border-blood-line bg-blood/[0.08] text-sm font-medium text-fg transition-colors duration-300 hover:border-[rgba(255,38,56,0.6)] hover:bg-blood/[0.14] ${sizing}`}
        >
          View Project
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          >
            ↗
          </span>
        </a>
      ) : null}

      {githubUrl ? (
        <a
          href={githubUrl}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Source / GitHub — ${title} repository (opens in a new tab)`}
          className={`group inline-flex min-h-11 items-center gap-2 border border-hairline bg-white/[0.03] text-sm font-medium text-fg-muted transition-colors duration-300 hover:border-white/25 hover:text-fg ${sizing}`}
        >
          Source / GitHub
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0 motion-reduce:group-hover:translate-y-0"
          >
            ↗
          </span>
        </a>
      ) : null}
    </div>
  );
};

export default ProjectLinks;
