/**
 * 3GEN Design System — TypeScript Tokens
 *
 * Single source of truth for all design values used in JavaScript/TypeScript.
 * Use these in Framer Motion variants, GSAP configs, inline styles, and logic.
 * Mirror of tailwind.config.ts & tokens.css — keep in sync.
 */

// ─── COLOR PALETTE ───────────────────────────────────────────────────────────

export const colors = {
  // Blacks & Darks
  void:      '#000000',
  black:     '#0A0A0A',
  obsidian:  '#111111',
  charcoal:  '#1A1A1A',
  smoke:     '#242424',
  graphite:  '#2E2E2E',
  ash:       '#3A3A3A',

  // Golds
  goldDim:    '#5C4A1E',
  goldMuted:  '#8B6914',
  goldWarm:   '#B8922A',
  gold:       '#C9A84C',
  goldLight:  '#DFC070',
  goldBright: '#F0D590',
  goldPale:   '#F7ECC4',

  // Ivories
  ivoryDim:  '#9A9185',
  ivorySoft: '#B8AFA3',
  ivory:     '#F0EAE0',
  ivoryWarm: '#F7F2EB',
  white:     '#FFFFFF',
} as const

// RGB channels for rgba() in JavaScript
export const rgb = {
  gold:   '201, 168, 76',
  ivory:  '240, 234, 224',
  black:  '10, 10, 10',
} as const

// Helpers for dynamic rgba
export const rgba = {
  gold:  (alpha: number) => `rgba(201, 168, 76, ${alpha})`,
  ivory: (alpha: number) => `rgba(240, 234, 224, ${alpha})`,
  black: (alpha: number) => `rgba(10, 10, 10, ${alpha})`,
  white: (alpha: number) => `rgba(255, 255, 255, ${alpha})`,
} as const

// ─── EASING CURVES ────────────────────────────────────────────────────────────

/**
 * Framer Motion easing arrays [x1, y1, x2, y2]
 * Also works as CSS cubic-bezier values.
 */
export const easing = {
  /** Primary luxury ease — slow in, smooth out. Use for reveals. */
  luxury:     [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Cinematic — fast exit, weighted settle. Use for dramatic transitions. */
  cinematic:  [0.76, 0, 0.24, 1] as [number, number, number, number],
  /** Gentle — balanced, natural. Use for subtle state changes. */
  gentle:     [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  /** Magnetic — for hover interactions and cursor effects. */
  magnetic:   [0.23, 1, 0.32, 1] as [number, number, number, number],
  /** Power — for layout transitions with authority. */
  power:      [0.4, 0, 0.2, 1] as [number, number, number, number],
  /** Sharp — for exits and dismissals. */
  sharp:      [0.4, 0, 1, 1] as [number, number, number, number],
  /** Standard entrance — decelerate into position. */
  standard:   [0.0, 0, 0.2, 1] as [number, number, number, number],
} as const

// CSS string versions (for style props)
export const easingCSS = {
  luxury:    'cubic-bezier(0.16, 1, 0.3, 1)',
  cinematic: 'cubic-bezier(0.76, 0, 0.24, 1)',
  gentle:    'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  magnetic:  'cubic-bezier(0.23, 1, 0.32, 1)',
  power:     'cubic-bezier(0.4, 0, 0.2, 1)',
  sharp:     'cubic-bezier(0.4, 0, 1, 1)',
  standard:  'cubic-bezier(0.0, 0, 0.2, 1)',
} as const

// ─── DURATION ─────────────────────────────────────────────────────────────────

/** Animation durations in seconds (for Framer Motion) */
export const duration = {
  instant:   0.15,   // Micro feedback
  fast:      0.3,    // Quick state changes
  base:      0.6,    // Standard transitions
  slow:      0.9,    // Reveal animations
  cinematic: 1.4,    // Hero, page-level
  epic:      2.0,    // Preloader, splash
} as const

/** Animation durations in milliseconds (for CSS / GSAP) */
export const durationMs = {
  instant:   150,
  fast:      300,
  base:      600,
  slow:      900,
  cinematic: 1400,
  epic:      2000,
} as const

// ─── STAGGER ──────────────────────────────────────────────────────────────────

export const stagger = {
  fast:   0.06,
  base:   0.10,
  slow:   0.15,
  slower: 0.20,
  char:   0.04,   // Per character in text split animations
} as const

// ─── FRAMER MOTION VARIANTS ───────────────────────────────────────────────────

import type { Variants } from 'framer-motion'

/** Fade up — primary scroll reveal pattern */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.luxury,
    },
  },
}

/** Fade up — subtle version for smaller elements */
export const fadeUpSm: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: duration.base, ease: easing.luxury },
  },
}

/** Fade in — opacity only */
export const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.base, ease: easing.gentle },
  },
}

/** Cinematic fade — scale + blur + opacity */
export const cinematicFade: Variants = {
  hidden: {
    opacity: 0,
    scale: 1.05,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: duration.cinematic,
      ease: easing.luxury,
    },
  },
}

/** Slide from left */
export const slideLeft: Variants = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.luxury },
  },
}

/** Slide from right */
export const slideRight: Variants = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: duration.slow, ease: easing.luxury },
  },
}

/** Scale reveal — clip from center */
export const scaleReveal: Variants = {
  hidden:  { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: duration.slow, ease: easing.luxury },
  },
}

/** Individual character reveal — use inside text split */
export const charReveal: Variants = {
  hidden:  { opacity: 0, y: '110%' },
  visible: {
    opacity: 1,
    y: '0%',
    transition: { duration: duration.base, ease: easing.cinematic },
  },
}

/** Word reveal — use inside word split */
export const wordReveal: Variants = {
  hidden:  { opacity: 0, y: '60%', rotateX: -20 },
  visible: {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    transition: { duration: duration.slow, ease: easing.luxury },
  },
}

/** Stagger container — wraps staggered children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.base,
      delayChildren: 0.15,
    },
  },
}

/** Stagger container — faster */
export const staggerContainerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.fast,
      delayChildren: 0.1,
    },
  },
}

/** Stagger container — slower, dramatic */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.slow,
      delayChildren: 0.2,
    },
  },
}

// ─── VIEWPORT CONFIG ──────────────────────────────────────────────────────────

/** Standard viewport trigger for whileInView animations */
export const viewport = {
  once: true,
  amount: 0.2,
  margin: '0px 0px -80px 0px',
} as const

/** Trigger earlier — for larger sections */
export const viewportEarly = {
  once: true,
  amount: 0.1,
  margin: '0px 0px -40px 0px',
} as const

/** Trigger later — for precise reveals */
export const viewportLate = {
  once: true,
  amount: 0.35,
  margin: '0px 0px -100px 0px',
} as const

// ─── SHADOW VALUES ────────────────────────────────────────────────────────────

export const shadows = {
  // Depth
  sm:   '0 1px 3px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.5)',
  md:   '0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.4)',
  lg:   '0 8px 32px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4)',
  xl:   '0 20px 60px rgba(0,0,0,0.7), 0 8px 16px rgba(0,0,0,0.5)',
  '2xl':'0 40px 80px rgba(0,0,0,0.8), 0 16px 32px rgba(0,0,0,0.5)',

  // Gold glow
  glowXs:   '0 0 8px rgba(201,168,76,0.12)',
  glowSm:   '0 0 16px rgba(201,168,76,0.18), 0 0 4px rgba(201,168,76,0.08)',
  glowMd:   '0 0 32px rgba(201,168,76,0.20), 0 0 8px rgba(201,168,76,0.12)',
  glowLg:   '0 0 48px rgba(201,168,76,0.22), 0 0 16px rgba(201,168,76,0.15)',
  glowXl:   '0 0 80px rgba(201,168,76,0.25), 0 0 30px rgba(201,168,76,0.18), 0 0 8px rgba(201,168,76,0.10)',
  glowHalo: '0 0 120px rgba(201,168,76,0.30), 0 0 60px rgba(201,168,76,0.20), 0 0 20px rgba(201,168,76,0.12)',

  // Inset
  inset:     'inset 0 1px 0 rgba(201,168,76,0.15), inset 0 -1px 0 rgba(0,0,0,0.4)',
  insetGold: 'inset 0 0 30px rgba(201,168,76,0.08)',

  // Ivory
  glowIvorySm: '0 0 20px rgba(240,234,224,0.12)',
  glowIvoryMd: '0 0 40px rgba(240,234,224,0.18)',

  none: 'none',
} as const

// ─── GRADIENTS ────────────────────────────────────────────────────────────────

export const gradients = {
  gold:       'linear-gradient(135deg, #5C4A1E 0%, #C9A84C 50%, #F0D590 100%)',
  goldSoft:   'linear-gradient(135deg, #8B6914 0%, #C9A84C 100%)',
  goldH:      'linear-gradient(90deg, #8B6914 0%, #C9A84C 50%, #8B6914 100%)',
  dark:       'linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 60%, #0A0A0A 100%)',
  vignette:   'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.75) 100%)',
  vignetteB:  'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.95) 100%)',
  shimmerGold:'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.3) 50%, transparent 100%)',
  glass:      'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
} as const

// ─── SPACING ──────────────────────────────────────────────────────────────────

export const spacing = {
  sectionXs:  '4rem',
  sectionSm:  '6rem',
  sectionMd:  '8rem',
  sectionLg:  '10rem',
  sectionXl:  '12rem',
  section2xl: '16rem',
  gutterMobile:  '1.5rem',
  gutterTablet:  '2.5rem',
  gutterDesktop: '5rem',
  gutterWide:    '6rem',
} as const

// ─── Z-INDEX ──────────────────────────────────────────────────────────────────

export const zIndex = {
  below:   -1,
  base:    0,
  raised:  10,
  float:   20,
  overlay: 30,
  modal:   40,
  nav:     50,
  toast:   60,
  cursor:  70,
  top:     100,
} as const

// ─── BREAKPOINTS ──────────────────────────────────────────────────────────────

export const breakpoints = {
  xs:    375,
  sm:    640,
  md:    768,
  lg:   1024,
  xl:   1280,
  '2xl':1536,
  '3xl':1920,
} as const

// ─── GLASS ────────────────────────────────────────────────────────────────────

export const glass = {
  bg:         'rgba(255, 255, 255, 0.03)',
  bgRaised:   'rgba(255, 255, 255, 0.05)',
  border:     'rgba(201, 168, 76, 0.12)',
  borderHover:'rgba(201, 168, 76, 0.28)',
  blur:       'blur(20px) saturate(180%)',
  blurHeavy:  'blur(40px) saturate(200%)',
} as const

// ─── BORDER RADIUS ────────────────────────────────────────────────────────────

export const radius = {
  none: '0',
  xs:   '2px',
  sm:   '4px',
  md:   '6px',
  lg:   '8px',
  xl:   '12px',
  '2xl':'16px',
  '3xl':'24px',
  pill: '9999px',
  full: '50%',
} as const

// ─── ASPECT RATIOS ────────────────────────────────────────────────────────────

export const aspect = {
  portrait:  '4/5',
  tall:      '3/4',
  editorial: '2/3',
  square:    '1/1',
  landscape: '4/3',
  wide:      '16/9',
  cinema:    '21/9',
  ultra:     '32/9',
} as const

// ─── TYPE ─────────────────────────────────────────────────────────────────────

export const fonts = {
  cormorant: 'var(--font-cormorant)',
  dmSans:    'var(--font-dm-sans)',
  inter:     'var(--font-inter)',
  mono:      'var(--font-mono)',
} as const

export const fontWeight = {
  thin:       100,
  extralight: 200,
  light:      300,
  regular:    400,
  medium:     500,
  semibold:   600,
} as const

export const letterSpacing = {
  tightest: '-0.06em',
  tighter:  '-0.04em',
  tight:    '-0.02em',
  normal:    '0em',
  wide:      '0.05em',
  wider:     '0.1em',
  widest:    '0.2em',
  label:     '0.25em',
  caps:      '0.3em',
} as const

// ─── CONVENIENCE EXPORTS ──────────────────────────────────────────────────────

/** All tokens in one object — useful for Storybook or design tooling */
export const tokens = {
  colors,
  rgb,
  rgba,
  easing,
  easingCSS,
  duration,
  durationMs,
  stagger,
  shadows,
  gradients,
  spacing,
  zIndex,
  breakpoints,
  glass,
  radius,
  aspect,
  fonts,
  fontWeight,
  letterSpacing,
} as const

export default tokens
