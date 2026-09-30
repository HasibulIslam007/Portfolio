/**
 * Understated technology tags — mono text, thin border, muted fill.
 * Deliberately not colourful pills: the tags support the case study,
 * they are not the visual event.
 */
const TechTags = ({ tags, className = "" }) => {
  if (!tags?.length) return null;

  return (
    <ul
      aria-label="Technologies used"
      className={`flex flex-wrap gap-2 ${className}`}
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="border border-hairline bg-white/[0.03] px-2.5 py-1 font-mono text-[11px] leading-5 tracking-wide text-fg-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TechTags;
