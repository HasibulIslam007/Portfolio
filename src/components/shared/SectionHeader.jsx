import SectionLabel from "./SectionLabel.jsx";

/**
 * Editorial section header — mono section label, heading and optional
 * supporting copy. Used in the left column of the asymmetric Phase 2
 * layout and reusable by every later section.
 *
 * `headingId` lets the parent <section> reference the heading via
 * aria-labelledby without duplicating the id.
 *
 * Final QA pass: the heading now uses the shared display serif + warm
 * parchment so sections 04–07 read as the SAME editorial system as the
 * serif-led About / Selected Work / Tech Stack headings. Sizes stay one
 * step below those primary sections so the hierarchy still holds.
 */
const SectionHeader = ({
  index,
  label,
  title,
  description,
  headingId,
  className = "",
}) => (
  <header className={className}>
    <SectionLabel index={index}>{label}</SectionLabel>

    <h2
      id={headingId}
      className="font-display mt-5 text-[2.1rem] leading-[1.02] text-parchment text-balance sm:text-4xl lg:text-[2.75rem] xl:text-[3.5rem]"
    >
      {title}
    </h2>

    {description ? (
      <div className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-fg-muted md:text-[1.0625rem]">
        {description}
      </div>
    ) : null}
  </header>
);

export default SectionHeader;
