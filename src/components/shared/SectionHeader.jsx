import SectionLabel from "./SectionLabel.jsx";

/**
 * Editorial section header — mono section label, heading and optional
 * supporting copy. Used in the left column of the asymmetric Phase 2
 * layout and reusable by every later section.
 *
 * `headingId` lets the parent <section> reference the heading via
 * aria-labelledby without duplicating the id.
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
      className="mt-5 text-[2rem] leading-[1.08] font-semibold tracking-[-0.02em] text-fg text-balance sm:text-4xl lg:text-[2.75rem] xl:text-5xl"
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
