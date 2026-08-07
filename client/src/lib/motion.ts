/**
 * Single-point Motion Library Helper Utility
 * 
 * Imports the "motion" library ONCE here, and exports clean, reusable functions 
 * so you can animate any element on any page without needing to import the motion library everywhere.
 */

import { animate, inView, motion, AnimatePresence, useInView, useScroll, useReducedMotion } from "motion/react";

// Slower, smooth low-speed settings
export const LOW_SPEED_DURATION = 0.85;
export const EASE_CURVE = [0.16, 1, 0.3, 1] as const;

export type MotionTarget = string | HTMLElement | Element | null | React.RefObject<HTMLElement | null>;

function resolveElement(target: MotionTarget): HTMLElement | null {
  if (!target) return null;
  if (typeof target === "string") {
    return document.querySelector(target) as HTMLElement;
  }
  if ("current" in target) {
    return target.current as HTMLElement;
  }
  return target as HTMLElement;
}

/**
 * 1. slideLeft: Animates element to slide in from right towards left
 * Usage: slideLeft("#my-heading") or slideLeft(elementRef)
 */
export function slideLeft(
  target: MotionTarget,
  options: { delay?: number; duration?: number; distance?: number; once?: boolean } = {}
) {
  const el = resolveElement(target);
  if (!el) return;

  const { delay = 0, duration = LOW_SPEED_DURATION, distance = 40, once = true } = options;

  el.style.opacity = "0";
  el.style.transform = `translateX(${distance}px)`;
  el.style.willChange = "opacity, transform";

  const triggerAnimation = () => {
    animate(
      el,
      { opacity: 1, x: 0 },
      { duration, delay, ease: EASE_CURVE }
    );
  };

  if (once) {
    inView(el, () => {
      triggerAnimation();
    }, { amount: 0.15 });
  } else {
    triggerAnimation();
  }
}

/**
 * 2. slideRight: Animates element to slide in from left towards right
 * Usage: slideRight("#my-card") or slideRight(elementRef)
 */
export function slideRight(
  target: MotionTarget,
  options: { delay?: number; duration?: number; distance?: number; once?: boolean } = {}
) {
  const el = resolveElement(target);
  if (!el) return;

  const { delay = 0, duration = LOW_SPEED_DURATION, distance = 40, once = true } = options;

  el.style.opacity = "0";
  el.style.transform = `translateX(-${distance}px)`;
  el.style.willChange = "opacity, transform";

  const triggerAnimation = () => {
    animate(
      el,
      { opacity: 1, x: 0 },
      { duration, delay, ease: EASE_CURVE }
    );
  };

  if (once) {
    inView(el, () => {
      triggerAnimation();
    }, { amount: 0.15 });
  } else {
    triggerAnimation();
  }
}

/**
 * 3. fadeIn: Animates element to smoothly fade in
 * Usage: fadeIn("#my-section") or fadeIn(elementRef)
 */
export function fadeIn(
  target: MotionTarget,
  options: { delay?: number; duration?: number; once?: boolean } = {}
) {
  const el = resolveElement(target);
  if (!el) return;

  const { delay = 0, duration = LOW_SPEED_DURATION, once = true } = options;

  el.style.opacity = "0";
  el.style.willChange = "opacity";

  const triggerAnimation = () => {
    animate(
      el,
      { opacity: 1 },
      { duration, delay, ease: EASE_CURVE }
    );
  };

  if (once) {
    inView(el, () => {
      triggerAnimation();
    }, { amount: 0.1 });
  } else {
    triggerAnimation();
  }
}

/**
 * 4. animateGroup: Animates a group of elements with staggered slide-left, slide-right, or fade-in
 * Usage: animateGroup(".card-item", "slide-left", 0.12)
 */
export function animateGroup(
  selector: string | Element[],
  type: "slide-left" | "slide-right" | "fade" = "fade",
  stagger: number = 0.12
) {
  const elements = typeof selector === "string" 
    ? Array.from(document.querySelectorAll(selector))
    : selector;

  elements.forEach((el, index) => {
    const delay = index * stagger;
    if (type === "slide-left") slideLeft(el as HTMLElement, { delay });
    else if (type === "slide-right") slideRight(el as HTMLElement, { delay });
    else fadeIn(el as HTMLElement, { delay });
  });
}

// Global window registration so functions are available everywhere out-of-the-box
if (typeof window !== "undefined") {
  (window as any).pfsMotion = {
    slideLeft,
    slideRight,
    fadeIn,
    animateGroup,
    animate,
    inView,
  };
}

// Re-export motion primitives if JSX components are needed
export { motion, AnimatePresence, useInView, useScroll, useReducedMotion, animate, inView };
