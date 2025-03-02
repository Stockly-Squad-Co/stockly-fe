import { Variants } from "framer-motion";

export const parentVariant: Variants = {
  animate: { transition: { staggerChildren: 0.08 } },
  exit: { opacity: 0 },
};

export const opacityVariant: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.06 } },
  exit: { opacity: 0 },
};

export const stiffTransition = { type: "spring", stiffness: 200, damping: 30 };

export const fadeToTopVariant: Variants = {
  initial: { opacity: 0, y: "10%" },
  animate: { opacity: 1, y: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, y: "10%" },
};

export const fadeToBottomVariant: Variants = {
  initial: { opacity: 0, y: "-10%" },
  animate: { opacity: 1, y: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, y: "-10%" },
};

export const fadeToRightVariant: Variants = {
  initial: { opacity: 0, x: "-5%" },
  animate: { opacity: 1, x: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, x: "-5%" },
};

export const fadeToLeftVariant: Variants = {
  initial: { opacity: 0, x: "100%" },
  animate: { opacity: 1, x: 0, transition: { ...stiffTransition } },
  exit: { opacity: 0, x: "-100%" },
};

export const heightVariant: Variants = {
  initial: { height: "0%", opacity: 0 },
  animate: { height: "100%", opacity: 1 },
  exit: { height: "0%", opacity: 0 },
};

export const fadeToTopSlowVariant: Variants = {
  initial: { opacity: 0, y: "100%" },
  animate: {
    opacity: 1,
    y: 0,
    transition: { ...stiffTransition, duration: 0.8 },
  },
  exit: { opacity: 0, y: "100%" },
};

export const heightOpenVariant: Variants = {
  initial: { opacity: 0, height: "0px" },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: "0px" },
};
