export const fadeIn = {
  hidden: {
    opacity: 0,
    transform: "translateX(0px)",
  },
  visible: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const slideLeft = {
  hidden: {
    opacity: 0,
    transform: "translateX(-100px)",
  },
  visible: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export const slideRight = {
  hidden: {
    opacity: 0,
    transform: "translateX(100px)",
  },
  visible: {
    opacity: 1,
    transform: "translateX(0px)",
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};