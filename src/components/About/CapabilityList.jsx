import Reveal from "../shared/Reveal.jsx";

/**
 * Compact editorial rows matching the About reference. Details already live
 * in the verified paragraphs above, so these remain labels rather than a
 * second block of marketing copy.
 */
const capabilities = [
  {
    index: "01",
    title: "Full-Stack Engineering",
  },
  {
    index: "02",
    title: "Backend Systems",
  },
  {
    index: "03",
    title: "Product Development",
  },
  {
    index: "04",
    title: "AI/ML Interest",
  },
];

const CapabilityList = ({ className = "" }) => (
  <ul className={`border-b border-hairline ${className}`}>
    {capabilities.map((capability, index) => (
      <li
        key={capability.index}
        className="group border-t border-hairline transition-colors duration-300 hover:border-blood-line focus-within:border-blood-line"
      >
        <Reveal delay={index * 0.08}>
          <div className="flex items-center gap-4 py-3.5 md:gap-6">
            <span
              aria-hidden="true"
              className="font-mono text-[11px] font-medium tracking-[0.18em] text-blood"
            >
              {capability.index}
            </span>

            <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
              <h3 className="font-display text-lg font-medium tracking-normal text-fg transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                {capability.title}
              </h3>
              <span aria-hidden="true" className="text-lg font-light text-blood">+</span>
            </div>
          </div>
        </Reveal>
      </li>
    ))}
  </ul>
);

export default CapabilityList;
