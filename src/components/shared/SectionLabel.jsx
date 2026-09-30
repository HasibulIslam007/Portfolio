/**
 * Phase 2 section marker — a mono "01 / ABOUT" eyebrow shared by every
 * editorial section (About now; Projects / Tech Stack in later phases).
 *
 * The index carries the crimson accent while the word stays muted, so the
 * label never depends on colour alone to be legible.
 */
const SectionLabel = ({ index, children, className = "" }) => (
  <p
    className={`font-mono text-[11px] font-medium tracking-[0.3em] uppercase md:text-xs ${className}`}
  >
    <span className="text-blood">{index}</span>
    <span aria-hidden="true" className="mx-2 text-fg-dim">
      /
    </span>
    <span className="text-fg-muted">{children}</span>
  </p>
);

export default SectionLabel;
