/**
 * 3GEN Design System — TypeScript Tokens
 * Use in Framer Motion variants, GSAP, inline styles, and logic.
 */

import type { Variants } from 'framer-motion'

// ─── Colors ──────────────────────────────────────────────────────────────────

export const colors = {
  // Forest Green — backgrounds & surfaces
  void:        '#030805',
  black:       '#07100A',   // deep forest (main bg)
  obsidian:    '#0B1710',   // section surface
  charcoal:    '#0F1F14',   // elevated surface
  smoke:       '#162B1C',   // dividers
  graphite:    '#1E3D28',   // forest green accent
  forestMid:   '#2A5C3D',   // bright forest accent
  // Arabian Gold — unchanged
  goldDim:     '#5C4A1E',
  goldMuted:   '#8B6914',
  gold:        '#C9A84C',
  goldLight:   '#DFC070',
  goldBright:  '#F0D590',
  // Oyster Grey — primary text
  ivoryDim:    '#8A8680',
  ivorySoft:   '#A8A49E',
  ivory:       '#C4BEB8',   // oyster grey (main text)
  ivoryWarm:   '#D8D2CB',
  white:       '#FFFFFF',
} as const

export const rgba = {
  gold:   (a: number) => `rgba(201,168,76,${a})`,
  oyster: (a: number) => `rgba(196,190,184,${a})`,
  forest: (a: number) => `rgba(42,96,64,${a})`,
  black:  (a: number) => `rgba(7,16,10,${a})`,
  white:  (a: number) => `rgba(255,255,255,${a})`,
  // Keep legacy alias
  ivory:  (a: number) => `rgba(196,190,184,${a})`,
} as const

// ─── Easing ──────────────────────────────────────────────────────────────────
// Bezier curves for CSS transitions and Framer Motion tween animations

export const easing = {
  /** Expo-style ease-out — primary entrance curve */
  luxury:    [0.16, 1, 0.3, 1]          as [number,number,number,number],
  /** Symmetric S-curve — dramatic reveals and exits */
  cinematic: [0.76, 0, 0.24, 1]         as [number,number,number,number],
  /** Smooth ease-in-out — body text, secondary elements */
  gentle:    [0.25, 0.46, 0.45, 0.94]   as [number,number,number,number],
  /** Fast ease-out — snap-to interactions */
  magnetic:  [0.23, 1, 0.32, 1]         as [number,number,number,number],
  /** Ease-in — exits and departures */
  sharp:     [0.4, 0, 1, 1]             as [number,number,number,number],
  /** Extreme ease-out — prestige hero entrances, focus-pull reveals */
  silk:      [0.19, 1, 0.22, 1]         as [number,number,number,number],
  /** Graceful deceleration — scroll-driven elements */
  velvet:    [0.6, 0, 0.4, 1]           as [number,number,number,number],
} as const

// ─── Spring configs ───────────────────────────────────────────────────────────
// Use for interactive elements — feels physical, not mechanical

export const springs = {
  /** Crisp, responsive — button taps, small UI toggles */
  snappy: { type: 'spring' as const, stiffness: 420, damping: 30, mass: 0.6 },
  /** Premium hover — scale, lift, position nudges */
  hover:  { type: 'spring' as const, stiffness: 280, damping: 22, mass: 0.7 },
  /** Flowing — nav underlines, expanding lines */
  gentle: { type: 'spring' as const, stiffness: 110, damping: 18, mass: 1.0 },
  /** Heavy, considered — large element transitions */
  slow:   { type: 'spring' as const, stiffness: 50,  damping: 16, mass: 1.4 },
} as const

// ─── Duration (seconds) ───────────────────────────────────────────────────────

export const duration = {
  instant:   0.15,
  fast:      0.28,
  base:      0.55,
  slow:      0.85,
  cinematic: 1.35,
  epic:      2.2,
} as const

// ─── Stagger ─────────────────────────────────────────────────────────────────

export const stagger = {
  fast:      0.05,
  base:      0.09,
  slow:      0.14,
  cinematic: 0.20,
  char:      0.035,
} as const

// ─── Variants ─────────────────────────────────────────────────────────────────

export const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 48, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: easing.luxury },
  },
}

export const fadeUpSm: Variants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(2px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: duration.base, ease: easing.luxury },
  },
}

export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: duration.base, ease: easing.gentle } },
}

export const cinematicFade: Variants = {
  hidden:  { opacity: 0, scale: 1.06, filter: 'blur(16px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: duration.cinematic, ease: easing.silk },
  },
}

export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -60, filter: 'blur(4px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: easing.luxury },
  },
}

export const charReveal: Variants = {
  hidden:  { y: '112%', filter: 'blur(8px)' },
  visible: {
    y: '0%', filter: 'blur(0px)',
    transition: { duration: duration.base, ease: easing.silk },
  },
}

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: stagger.base, delayChildren: 0.15 } },
}

// ─── Shadows ─────────────────────────────────────────────────────────────────

export const shadows = {
  glowSm:   '0 0 16px rgba(201,168,76,0.18), 0 0 4px rgba(201,168,76,0.08)',
  glowMd:   '0 0 32px rgba(201,168,76,0.22), 0 0 8px rgba(201,168,76,0.12)',
  glowLg:   '0 0 60px rgba(201,168,76,0.25), 0 0 20px rgba(201,168,76,0.15)',
  glowXl:   '0 0 100px rgba(201,168,76,0.28), 0 0 40px rgba(201,168,76,0.18), 0 0 10px rgba(201,168,76,0.10)',
  glowHalo: '0 0 160px rgba(201,168,76,0.30), 0 0 80px rgba(201,168,76,0.20), 0 0 30px rgba(201,168,76,0.12)',
} as const

// ─── Viewport defaults ────────────────────────────────────────────────────────

export const viewport = { once: true, amount: 0.2, margin: '0px 0px -80px 0px' } as const

export default {
  colors, rgba, easing, springs, duration, stagger,
  fadeUp, fadeUpSm, fadeIn, cinematicFade, slideLeft, charReveal, staggerContainer,
  shadows, viewport,
}
