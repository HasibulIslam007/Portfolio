/**
 * Design V2 — faint decorative geometric "arcane" layer.
 *
 * Purely original geometry (concentric arcs, radial ticks, diamond nodes
 * and crossing chords) drawn as a single low-opacity SVG. It borrows the
 * *atmosphere* of a ritual diagram — not any specific symbol, franchise or
 * character's design.
 *
 * Decorative only: aria-hidden, never interactive, and rendered at a very
 * low opacity by the caller so it never competes with the content.
 */
const RuneDecoration = ({ className = "", opacity = 0.05 }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 400 400"
    className={`pointer-events-none select-none ${className}`}
    style={{ opacity }}
    fill="none"
    stroke="currentColor"
    strokeWidth="0.75"
  >
    {/* Concentric rings */}
    <circle cx="200" cy="200" r="186" />
    <circle cx="200" cy="200" r="164" strokeDasharray="2 7" />
    <circle cx="200" cy="200" r="118" />
    <circle cx="200" cy="200" r="62" strokeDasharray="1 5" />

    {/* Radial ticks — an instrument-dial rhythm */}
    {Array.from({ length: 24 }, (_, i) => {
      const angle = (i / 24) * Math.PI * 2;
      const long = i % 6 === 0;
      const r1 = long ? 164 : 174;
      const r2 = 186;
      return (
        <line
          key={`tick-${i}`}
          x1={200 + Math.cos(angle) * r1}
          y1={200 + Math.sin(angle) * r1}
          x2={200 + Math.cos(angle) * r2}
          y2={200 + Math.sin(angle) * r2}
        />
      );
    })}

    {/* Diamond nodes on the inner ring */}
    {Array.from({ length: 6 }, (_, i) => {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const x = 200 + Math.cos(angle) * 118;
      const y = 200 + Math.sin(angle) * 118;
      const s = 7;
      return (
        <path
          key={`node-${i}`}
          d={`M ${x} ${y - s} L ${x + s} ${y} L ${x} ${y + s} L ${x - s} ${y} Z`}
        />
      );
    })}

    {/* Crossing chords — the inscribed geometry */}
    <path d="M 200 82 A 118 118 0 0 1 302 259 L 98 259 A 118 118 0 0 1 200 82 Z" />
    <line x1="200" y1="38" x2="200" y2="362" />
    <line x1="38" y1="200" x2="362" y2="200" />
  </svg>
);

export default RuneDecoration;