import { useEffect, useRef } from "react";

/**
 * useReveal — Intersection Observer hook for Archer-style fade-in animations
 * Adds 'revealed' class to elements with 'reveal', 'reveal-left', or 'reveal-right' classes
 * when they enter the viewport.
 */
export function useReveal(rootMargin = "0px 0px -60px 0px") {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-pop");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold: 0.06 }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [rootMargin]);

  return ref;
}
