/**
 * Project imagery frame.
 *
 * Real screenshots render lazily at their intrinsic aspect ratio
 * (explicit width/height prevents layout shift) inside a hairline
 * frame that emphasises on hover while the image scales a restrained
 * 1.015. Projects without verified imagery get an honest editorial
 * placeholder — a grid shell with a ghost number, never a fabricated
 * application screen. Both states honour prefers-reduced-motion.
 */
const ProjectMedia = ({ project, featured = false, className = "" }) => {
  const { image, mediaNote, number } = project;

  if (image) {
    return (
      <figure
        className={`group/media relative overflow-hidden border border-hairline bg-ink-2 transition-colors duration-300 group-hover/media:border-blood-line ${className}`}
      >
        <img
          src={image.src}
          width={image.width}
          height={image.height}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className={`block w-full object-cover transition-transform duration-500 ease-out group-hover/media:scale-[1.015] motion-reduce:group-hover/media:scale-100 motion-reduce:transition-none ${
            featured ? "aspect-[16/9]" : ""
          }`}
        />
      </figure>
    );
  }

  return (
    <div
      className={`group/media relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden border border-hairline bg-ink-2 transition-colors duration-300 group-hover/media:border-blood-line ${
        featured ? "aspect-[16/9]" : ""
      } ${className}`}
    >
      {/* Faint blueprint grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      {/* Restrained crimson wash */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,38,56,0.05),transparent_70%)]"
      />
      {/* Ghost project number */}
      <span
        aria-hidden="true"
        className="absolute right-4 bottom-0 font-mono text-[7rem] leading-none font-medium text-white/[0.035] select-none md:text-[10rem]"
      >
        {number}
      </span>

      <div className="relative z-10 max-w-md px-6 text-center">
        <p className="font-mono text-[10px] font-medium tracking-[0.3em] text-fg-dim uppercase">
          Media
        </p>
        <p className="mt-3 text-base font-medium text-fg">{mediaNote.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-fg-muted">
          {mediaNote.detail}
        </p>
      </div>
    </div>
  );
};

export default ProjectMedia;
