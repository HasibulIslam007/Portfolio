import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "../../lib/gsap.js";

import { counterItems } from "../../constants";
import { prefersReducedMotion } from "../../lib/usePrefersReducedMotion";

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];
      if (!numberElement || !item) return;

      // Reduced motion: no count-up tween — show the final value at once.
      if (prefersReducedMotion()) {
        numberElement.textContent = `${item.value}${item.suffix}`;
        return;
      }

      // Set initial value to 0
      gsap.set(numberElement, { innerText: "0" });

      // Create the counting animation
      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 }, // Ensures whole numbers
        scrollTrigger: {
          trigger: "#counter",
          start: "top center",
        },
        // Add the suffix after counting is complete
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });
    }, counterRef);
  }, []);

  return (
    <div
      id="counter"
      ref={counterRef}
      className="w-full scroll-mt-[5.5rem] border-y border-hairline bg-ink"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-px bg-hairline sm:grid-cols-2 md:px-10 xl:px-16">
        {counterItems.map((item, index) => (
          <article
            key={item.label}
            ref={(el) => {
              if (el) countersRef.current[index] = el;
            }}
            className="flex flex-col items-center justify-center gap-1 bg-ink px-6 py-10 text-center"
          >
            <div className="counter-number text-4xl font-semibold tracking-tight text-fg md:text-5xl">
              0{item.suffix}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg-muted">
              {item.label}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
