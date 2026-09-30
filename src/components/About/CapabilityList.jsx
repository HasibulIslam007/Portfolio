import Reveal from "../shared/Reveal.jsx";

/**
 * Four capabilities as an editorial numbered-row system (not cards):
 * thin rules, mono index, title + one-line description. The index and
 * border shift to crimson on hover — decorative only, so no information
 * is carried by colour.
 */
const capabilities = [
  {
    index: "01",
    title: "Full-Stack Engineering",
    description:
      "Modern frontend applications, backend APIs, authentication, databases and application architecture.",
  },
  {
    index: "02",
    title: "Applied AI Interest",
    description:
      "Exploring AI-assisted product features through JobFlow AI and AImage.",
  },
  {
    index: "03",
    title: "Testing & API Contracts",
    description:
      "Browser tests, backend test suites and shared API contracts in IELTSHUB.",
  },
  {
    index: "04",
    title: "Product Development",
    description:
      "Turning requirements and technical ideas into complete, usable applications.",
  },
];

const CapabilityList = () => (
  <ul className="border-b border-hairline lg:mt-10">
    {capabilities.map((capability, index) => (
      <li
        key={capability.index}
        className="group border-t border-hairline transition-colors duration-300 hover:border-blood-line focus-within:border-blood-line"
      >
        <Reveal delay={index * 0.08}>
          <div className="flex gap-4 py-5 md:gap-6 md:py-6">
            <span
              aria-hidden="true"
              className="mt-1.5 font-mono text-[11px] font-medium tracking-[0.18em] text-fg-muted transition-colors duration-300 group-hover:text-blood"
            >
              {capability.index}
            </span>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight text-fg transition-transform duration-300 group-hover:translate-x-1 group-focus-within:translate-x-1 md:text-xl">
                {capability.title}
              </h3>
              <p className="mt-1.5 max-w-md text-sm leading-relaxed text-fg-muted">
                {capability.description}
              </p>
            </div>
          </div>
        </Reveal>
      </li>
    ))}
  </ul>
);

export default CapabilityList;
