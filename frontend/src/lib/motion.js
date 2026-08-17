/**
 * Shared Framer Motion variants and transitions.
 *
 * Keeping every animation in one place means the whole app moves with the
 * same rhythm — one easing curve, one set of durations, one stagger step.
 */

// Easing -----------------------------------------------------------------
export const easeOutSoft = [0.22, 1, 0.36, 1];

// Base transitions -------------------------------------------------------
const transition = { duration: 0.5, ease: easeOutSoft };
const softSpring = { type: "spring", stiffness: 220, damping: 26 };

/** Snappy spring for badges and small pop-ins. */
export const springy = { type: "spring", stiffness: 380, damping: 30 };

// Entrances --------------------------------------------------------------
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition },
};

// Lists ------------------------------------------------------------------
/**
 * Pure orchestrator — it deliberately does NOT animate its own opacity.
 * Children fade themselves via `listItem`, so if a container's animation
 * ever fails to run, the content is still on screen rather than blanked out.
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Grid/list item — pairs with staggerContainer on the parent. */
export const listItem = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: easeOutSoft },
  },
};

// Overlays ---------------------------------------------------------------
export const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modal = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: softSpring },
  exit: {
    opacity: 0,
    scale: 0.97,
    y: 8,
    transition: { duration: 0.18, ease: easeOutSoft },
  },
};

/** Slide-in panel. `drawer("right")` / `drawer("left")`. */
export const drawer = (side = "right") => ({
  hidden: { x: side === "right" ? "100%" : "-100%" },
  visible: { x: 0, transition: { duration: 0.38, ease: easeOutSoft } },
  exit: {
    x: side === "right" ? "100%" : "-100%",
    transition: { duration: 0.28, ease: easeOutSoft },
  },
});

export const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: easeOutSoft },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.98,
    transition: { duration: 0.15, ease: easeOutSoft },
  },
};

/** Scroll-reveal default for normal-height elements (headings, cards). */
export const viewportOnce = { once: true, amount: 0.18 };

/**
 * Scroll-reveal for TALL containers — product grids especially.
 *
 * `amount` is a fraction of the *element*, so a percentage threshold on a
 * grid several thousand pixels tall can never be met on a short screen and
 * the whole grid stays stuck at opacity 0. "some" fires as soon as any part
 * of it enters the viewport, which is always reachable.
 */
export const viewportAny = { once: true, amount: "some" };
