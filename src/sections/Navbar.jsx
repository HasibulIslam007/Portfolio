import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars -- motion is used in JSX (<motion.*>)
import { AnimatePresence, motion } from "framer-motion";
import { HiMenu, HiX } from "react-icons/hi";

import { navLinks, resumeUrl } from "../constants";

/**
 * Phase 1 navbar — fixed, transparent over the hero, dark + blurred with a
 * hairline border after scrolling. "HSBL." brand mark, section links with a
 * red hover/active underline, a Resume shortcut and an animated mobile menu.
 */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  // sticky background after the first few pixels of scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);

      // lightweight scroll-spy: last section whose top passed the header
      let current = null;
      let closestTop = -Infinity;
      navLinks.forEach(({ link }) => {
        const element = document.querySelector(link);
        const top = element?.getBoundingClientRect().top;
        if (top <= 140 && top > closestTop) {
          current = link;
          closestTop = top;
        }
      });
      setActiveLink(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // close the mobile menu on Escape
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Mobile menu links: closing the menu animates the panel away, which
  // cancels the browser's smooth hash scroll — the URL updates but the
  // page stays put (pre-existing Phase 1 quirk, fixed here so anchor
  // navigation works at mobile widths). The scroll re-runs once the
  // 0.28s exit has settled. `behavior: "auto"` follows the CSS
  // scroll-behavior rule, so prefers-reduced-motion users get an instant
  // jump while everyone else keeps the smooth glide.
  const handleMobileLinkClick = (event) => {
    const href = event.currentTarget.getAttribute("href");
    setOpen(false);

    if (!href?.startsWith("#")) return;

    const target = document.querySelector(href);
    if (!target) return;

    window.setTimeout(() => {
      target.scrollIntoView({ behavior: "auto", block: "start" });
    }, 300);
  };

  return (
    <header
      className={`nav-shell ${scrolled || open ? "is-scrolled" : ""}`}
    >
      <div className="nav-inner">
        {/* Brand */}
        <a
          href="#hero"
          aria-label="HSBL — back to top"
          className="font-mono text-lg font-bold tracking-tight text-fg transition-colors duration-300 hover:text-blood"
        >
          HSBL<span className="text-blood">.</span>
        </a>

        {/* Desktop navigation — breakpoint at lg so all six links plus the
            Resume CTA fit without wrapping at the 768px tablet width. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navLinks.map(({ name, link }) => (
              <li key={name}>
                <a
                  href={link}
                  aria-current={activeLink === link ? "location" : undefined}
                  className={`nav-link ${activeLink === link ? "is-active" : ""}`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hidden items-center gap-1.5 rounded-full border border-hairline bg-ink-2/60 px-4 py-2 text-sm text-fg transition-all duration-300 hover:-translate-y-0.5 hover:border-blood-line hover:text-blood sm:inline-flex"
          >
            Resume
            <span aria-hidden="true">↗</span>
          </a>

          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg border border-hairline bg-ink-2/60 text-fg transition-colors duration-300 hover:border-blood-line hover:text-blood lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? (
              <HiX className="text-xl" aria-hidden="true" />
            ) : (
              <HiMenu className="text-xl" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="overflow-hidden border-t border-hairline bg-ink/95 backdrop-blur-md lg:hidden"
          >
            <nav aria-label="Mobile" className="px-5 py-3">
              <ul>
                {navLinks.map(({ name, link }) => (
                  <li key={name}>
                    <a
                      href={link}
                      onClick={handleMobileLinkClick}
                  aria-current={activeLink === link ? "location" : undefined}
                      className={`flex items-center justify-between border-b border-hairline py-3.5 text-[15px] transition-colors duration-200 ${
                        activeLink === link
                          ? "text-blood"
                          : "text-fg-muted hover:text-fg"
                      }`}
                    >
                      {name}
                      <span aria-hidden="true" className="text-xs text-fg-dim">
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => setOpen(false)}
                className="mt-4 mb-2 flex items-center justify-center gap-2 rounded-lg border border-blood-line bg-blood/10 px-4 py-3 text-sm text-fg transition-colors duration-300 hover:bg-blood/20"
              >
                Download Resume <span aria-hidden="true">↗</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default NavBar;
