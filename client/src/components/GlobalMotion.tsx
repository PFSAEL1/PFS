import React, { useEffect } from "react";
import { useLocation } from "wouter";
import { animate, inView } from "framer-motion";

const EASE_LOW_SPEED = [0.16, 1, 0.3, 1] as const;
const DURATION_LOW_SPEED = 0.85;

/**
 * GlobalMotion Provider Component
 * Automatically attaches low-speed Slide Left, Slide Right, and Fade In animations
 * to all headings (h1-h6) and sections site-wide without needing manual imports in page files.
 */
export function initAutoMotion() {
  if (typeof window === "undefined") return;

  // 1. Observe headings: odd/primary headings slide-right, subheadings slide-left
  const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6, .section-heading");
  headings.forEach((el, index) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.dataset.motionInitialized) return;
    htmlEl.dataset.motionInitialized = "true";

    // Determine direction: h1/h2 or even index = slide-right; h3-h6 or odd index = slide-left
    const tagName = htmlEl.tagName.toLowerCase();
    const isSlideRight = tagName === "h1" || tagName === "h2" || index % 2 === 0;
    const initialX = isSlideRight ? -40 : 40;

    // Apply initial hidden styles
    htmlEl.style.opacity = "0";
    htmlEl.style.transform = `translateX(${initialX}px)`;
    htmlEl.style.willChange = "opacity, transform";

    inView(htmlEl, () => {
      animate(
        htmlEl,
        { opacity: 1, x: 0 },
        { duration: DURATION_LOW_SPEED, ease: EASE_LOW_SPEED }
      );
    }, { amount: 0.15 });
  });

  // 2. Observe sections: smooth low-speed fade in
  const sections = document.querySelectorAll("section, [data-section]");
  sections.forEach((el) => {
    const htmlEl = el as HTMLElement;
    if (htmlEl.dataset.motionInitialized) return;
    htmlEl.dataset.motionInitialized = "true";

    // Skip hero video container if needed
    if (htmlEl.id === "hero") {
      htmlEl.style.opacity = "1";
      return;
    }

    htmlEl.style.opacity = "0";
    htmlEl.style.willChange = "opacity";

    inView(htmlEl, () => {
      animate(
        htmlEl,
        { opacity: 1 },
        { duration: DURATION_LOW_SPEED, ease: EASE_LOW_SPEED }
      );
    }, { amount: 0.1 });
  });
}

/**
 * Reusable animation helper functions that can be called anywhere if needed
 */
export function animateSlideLeft(element: HTMLElement | string, delay: number = 0) {
  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return;
  const htmlEl = target as HTMLElement;
  htmlEl.style.opacity = "0";
  htmlEl.style.transform = "translateX(40px)";

  return animate(
    htmlEl,
    { opacity: 1, x: 0 },
    { duration: DURATION_LOW_SPEED, delay, ease: EASE_LOW_SPEED }
  );
}

export function animateSlideRight(element: HTMLElement | string, delay: number = 0) {
  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return;
  const htmlEl = target as HTMLElement;
  htmlEl.style.opacity = "0";
  htmlEl.style.transform = "translateX(-40px)";

  return animate(
    htmlEl,
    { opacity: 1, x: 0 },
    { duration: DURATION_LOW_SPEED, delay, ease: EASE_LOW_SPEED }
  );
}

export function animateFadeIn(element: HTMLElement | string, delay: number = 0) {
  const target = typeof element === "string" ? document.querySelector(element) : element;
  if (!target) return;
  const htmlEl = target as HTMLElement;
  htmlEl.style.opacity = "0";

  return animate(
    htmlEl,
    { opacity: 1 },
    { duration: DURATION_LOW_SPEED, delay, ease: EASE_LOW_SPEED }
  );
}

/**
 * Top-level React component placed in App.tsx layout to run site-wide motion automatically
 */
export function GlobalMotion() {
  const [location] = useLocation();

  useEffect(() => {
    // Run immediately and on DOM mutations
    const timer = setTimeout(() => {
      initAutoMotion();
    }, 50);

    const observer = new MutationObserver(() => {
      initAutoMotion();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location]);

  return null;
}
