import { useEffect } from "react";
import { animate } from "framer-motion";
import {
  fadeIn,
  slideLeft,
  slideRight
} from "./animations/variants";

const animations = {
  fadeIn,
  slideLeft,
  slideRight
};

export default function GlobalAnimations() {

  // working code

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;

          const animationName = element.dataset.animation;

          if (!animationName) return;

          const animation =
            animations[animationName as keyof typeof animations];

          if (!animation) return;

          animate(element, animation.visible, {
            duration: 2,
            ease: "easeOut",
          });

          observer.unobserve(element);

        });
      },
      {
        threshold: 0.8,
      }
    );

    const initAnimations = () => {
      const elements =
        document.querySelectorAll<HTMLElement>("[data-animation]");

      elements.forEach((element) => {

        if (element.dataset.animated) return;

        const animationName = element.dataset.animation;

        if (!animationName) return;

        const animation =
          animations[animationName as keyof typeof animations];

        if (!animation) return;

        Object.assign(element.style, animation.hidden);

        observer.observe(element);

        element.dataset.animated = "true";
      });
    };

    initAnimations();

    return () => observer.disconnect();

  }, []);
  return null;
}