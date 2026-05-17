# Motion Skill — Cinematic Animation & Interaction Design

## Guiding Principle

Motion should feel **inevitable, not decorative**. Every animation exists to guide attention, communicate luxury, and make the experience feel alive. Nothing jumps, nothing bounces, nothing feels cheap.

Reference: Apple.com scroll animations, Byredo.com hover effects, Awwwards SOTD interactions.

---

## Animation Philosophy

### The Three Laws of Luxury Motion
1. **Slow is expensive** — fast animations feel cheap. Default minimum: 600ms
2. **Ease is everything** — cubic-bezier curves define the personality of the brand
3. **Less is more** — animate one thing at a time, let it breathe

### Emotional Target
Every animation should feel:
- **Subtle** — the user notices the result, not the motion
- **Expensive** — smooth, weighted, deliberate
- **Immersive** — pulls the viewer deeper into the brand world
- **Cinematic** — inspired by film, not UI conventions
- **Refined** — precise, intentional, never accidental

---

## Framer Motion Setup

### Standard Easing Curves
```typescript
// lib/motion.ts
export const easing = {
  luxury:     [0.16, 1, 0.3, 1],      // Primary — slow start, smooth finish
  cinematic:  [0.76, 0, 0.24, 1],     // Dramatic — fast exit, slow settle
  gentle:     [0.25, 0.46, 0.45, 0.94], // Subtle reveals
  magnetic:   [0.23, 1, 0.32, 1],     // Hover interactions
} as const

export const duration = {
  instant:  0.15,  // Micro feedback (opacity flickers)
  fast:     0.35,  // Quick state changes
  base:     0.6,   // Standard transitions
  slow:     0.9,   // Section reveals
  cinematic: 1.4,  // Hero animations, page transitions
} as const
```

### Base Variants
```typescript
// Fade up — primary reveal pattern
export const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easing.luxury } }
}

// Stagger container
export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

// Cinematic fade
export const cinematicFade = {
  hidden:  { opacity: 0, scale: 1.05, filter: 'blur(8px)' },
  visible: { opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 1.4, ease: easing.luxury } }
}

// Slide from left
export const slideLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: easing.luxury } }
}

// Text character reveal
export const charReveal = {
  hidden:  { opacity: 0, y: '110%' },
  visible: { opacity: 1, y: '0%', transition: { duration: 0.7, ease: easing.cinematic } }
}
```

---

## Scroll Animations

### Viewport Trigger Setup
```typescript
// Always use these viewport settings for scroll reveals
const viewportConfig = {
  once: true,      // Animate only once per session
  amount: 0.2,     // Trigger when 20% visible
  margin: '0px 0px -80px 0px'  // Offset for earlier trigger
}

// Usage
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={viewportConfig}
>
```

### Scroll Progress (GSAP)
```typescript
// For parallax and scroll-driven effects, use GSAP ScrollTrigger
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Parallax image
gsap.to('.hero-image', {
  yPercent: -20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1.5,  // Higher = smoother
  }
})
```

### Scroll Reveal Patterns
```typescript
// Stagger section items on scroll
<motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}>
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeUp}>
      {item}
    </motion.div>
  ))}
</motion.div>
```

---

## Hover Interactions

### Magnetic Hover Effect
```typescript
// hooks/useMagnetic.ts
export function useMagnetic(strength = 0.3) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * strength
    const y = (e.clientY - rect.top - rect.height / 2) * strength
    el.style.transform = `translate(${x}px, ${y}px)`
  }

  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
    // Use spring for return
  }

  return { ref, handleMouseMove, handleMouseLeave }
}
```

### Gold Glow Hover
```typescript
<motion.div
  whileHover={{
    boxShadow: '0 0 40px rgba(201, 168, 76, 0.2), 0 0 80px rgba(201, 168, 76, 0.08)',
    borderColor: 'rgba(201, 168, 76, 0.6)',
    transition: { duration: 0.4, ease: easing.gentle }
  }}
>
```

### Image Scale Hover
```typescript
// Wrap image in overflow-hidden container
<div className="overflow-hidden">
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.8, ease: easing.luxury }}
  >
    <Image ... />
  </motion.div>
</div>
```

### Text Underline Slide
```typescript
// CSS approach (more performant for many items)
.nav-link {
  position: relative;
}
.nav-link::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: #C9A84C;
  transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.nav-link:hover::after { width: 100%; }
```

---

## Page Transitions

### Layout Transition (Framer Motion)
```typescript
// app/layout.tsx — wrap page content
<AnimatePresence mode="wait">
  <motion.main
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.6, ease: easing.luxury }}
  >
    {children}
  </motion.main>
</AnimatePresence>
```

### Curtain Transition (Cinematic)
```typescript
// Full-screen overlay that wipes in then out
const curtainVariants = {
  initial: { scaleY: 0, originY: 0 },
  animate: { scaleY: 1, transition: { duration: 0.5, ease: easing.cinematic } },
  exit:    { scaleY: 0, originY: 1, transition: { duration: 0.5, ease: easing.luxury, delay: 0.1 } }
}
```

---

## Navbar Scroll Behavior

```typescript
// Smooth transition from transparent to dark
const { scrollY } = useScroll()
const navOpacity = useTransform(scrollY, [0, 100], [0, 1])
const navBlur = useTransform(scrollY, [0, 100], [0, 20])

<motion.nav
  style={{
    backgroundColor: useMotionTemplate`rgba(10, 10, 10, ${navOpacity})`,
    backdropFilter: useMotionTemplate`blur(${navBlur}px)`,
  }}
>
```

---

## Loading & Intro Animations

### Number Counter (Preloader)
```typescript
// Animated count up 0 → 100% with eased timing
// Use MotionValue + useSpring for smooth counting
const count = useSpring(0, { stiffness: 40, damping: 20 })
```

### Text Split Animation
```typescript
// Split headline into characters for staggered reveal
// Use a text splitting utility or manual approach
const chars = text.split('')

<motion.span variants={staggerContainer} initial="hidden" animate="visible">
  {chars.map((char, i) => (
    <motion.span key={i} variants={charReveal} style={{ display: 'inline-block' }}>
      {char === ' ' ? ' ' : char}
    </motion.span>
  ))}
</motion.span>
```

---

## Performance Rules

- Always use `transform` and `opacity` — never animate `width`, `height`, `top`, `left`
- Use `will-change: transform` only on actively animating elements, remove after
- Use `layout` prop sparingly — only for layout-shift animations
- For lists > 10 items, use `useReducedMotion()` fallback
- Respect reduced motion:
```typescript
const prefersReducedMotion = useReducedMotion()
const animation = prefersReducedMotion ? {} : fadeUp
```

---

## Anti-Patterns

- No `bounce` easing — ever
- No spring animations on scroll reveals (use tween with luxury easing)
- No simultaneous animation of more than 3 properties
- No animation duration under 300ms for reveals
- No looping animations unless extremely subtle (e.g., slow pulse)
- No `animate={{ rotate: 360 }}` spinning loaders — use elegant alternatives
