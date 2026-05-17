# Mobile Skill — Luxury Mobile Experience

## Guiding Principle

The 3GEN mobile experience should feel as premium as the desktop — not a "mobile version" but a thoughtfully adapted presentation of the same luxury world. Many users will arrive on mobile first.

Target: a fragrance brand mobile experience that rivals Byredo, Aesop, and Dior on iOS/Android.

---

## Responsive Architecture

### Breakpoint Strategy
```typescript
// tailwind.config.ts
screens: {
  'xs':   '375px',   // Small phones (iPhone SE)
  'sm':   '640px',   // Large phones
  'md':   '768px',   // Tablets (portrait)
  'lg':   '1024px',  // Tablets (landscape), small desktop
  'xl':   '1280px',  // Desktop
  '2xl':  '1536px',  // Large desktop
  '3xl':  '1920px',  // Wide / cinematic
}
```

### Mobile-First Approach
Always write mobile styles first, then layer up:
```typescript
// Correct — mobile first
className="text-4xl md:text-6xl lg:text-8xl xl:text-[10rem]"
className="px-6 md:px-12 lg:px-20 xl:px-32"
className="py-20 md:py-28 lg:py-40"
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

---

## Responsive Typography

### Fluid Type Scale
```css
/* Use clamp() for smooth fluid scaling */
.display-hero   { font-size: clamp(2.5rem,  10vw,  14rem); }
.display-large  { font-size: clamp(2rem,    7vw,   10rem); }
.display-medium { font-size: clamp(1.75rem, 5vw,   6rem);  }
.heading-large  { font-size: clamp(1.5rem,  3.5vw, 4rem);  }
.body-large     { font-size: clamp(1rem,    1.5vw, 1.375rem); }
.body-base      { font-size: clamp(0.9375rem, 1.2vw, 1.0625rem); }
.label          { font-size: clamp(0.6875rem, 0.9vw, 0.8125rem); }
```

### Line Height on Mobile
```typescript
// Tighter line heights for large mobile type
className="leading-none md:leading-[0.9]"  // Display
className="leading-tight md:leading-snug"   // Headings
className="leading-relaxed"                 // Body text
```

### Letter Spacing Adjustment
```typescript
// Reduce tracking on small screens for large text
className="tracking-tight md:tracking-[-0.02em] lg:tracking-[-0.04em]"
```

---

## Layout Adaptation

### Mobile Grid Patterns
```typescript
// Hero section
<section className="relative min-h-[100svh] flex flex-col justify-end pb-12 px-6 md:pb-20 md:px-12">

// Product grid
<div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// Split content (stacks on mobile)
<div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-24">
  <div className="w-full lg:w-1/2">...</div>
  <div className="w-full lg:w-1/2">...</div>
</div>

// Asymmetric layout collapses gracefully
<div className="grid grid-cols-1 md:grid-cols-[2fr,3fr] lg:grid-cols-[1fr,2fr] gap-8">
```

### Container & Spacing
```typescript
// Container
className="container mx-auto px-5 xs:px-6 md:px-10 lg:px-16 xl:px-20"

// Section vertical rhythm
className="py-16 md:py-24 lg:py-32 xl:py-40"

// Gap between elements
className="gap-4 md:gap-6 lg:gap-8 xl:gap-12"
```

### Touch Targets
- Minimum touch target: `min-h-[44px] min-w-[44px]` (Apple HIG standard)
- Add padding to small elements to meet touch target requirements:
```typescript
<button className="flex items-center gap-2 py-3 px-4 min-h-[44px]">
  Close
</button>
```

---

## Mobile Navigation

### Full-Screen Mobile Menu
```typescript
// Overlay that covers the full screen — editorial layout
const mobileMenuVariants = {
  closed: { opacity: 0, clipPath: 'circle(0% at calc(100% - 2rem) 2rem)' },
  open:   {
    opacity: 1,
    clipPath: 'circle(150% at calc(100% - 2rem) 2rem)',
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

// Menu layout — vertical stack, large type, generous spacing
<nav className="flex flex-col justify-center items-start px-8 h-full gap-8">
  {links.map((link, i) => (
    <motion.a
      key={link.href}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
      className="text-4xl font-cormorant text-brand-ivory"
    >
      {link.label}
    </motion.a>
  ))}
</nav>
```

### Hamburger Animation
```typescript
// SVG morphing hamburger → X — not emoji or text
// Use Framer Motion pathLength and d animations
```

---

## Touch Interactions

### Swipe Gestures
```typescript
// Product carousel with drag
<motion.div
  drag="x"
  dragConstraints={{ left: -maxScroll, right: 0 }}
  dragElastic={0.1}
  dragTransition={{ bounceStiffness: 200, bounceDamping: 30 }}
  className="flex gap-6 cursor-grab active:cursor-grabbing"
>
```

### Touch Feedback
```typescript
// Subtle scale on press for interactive elements
<motion.button
  whileTap={{ scale: 0.97, opacity: 0.85 }}
  transition={{ duration: 0.1 }}
>
```

### Disable Hover on Touch
```typescript
// Use @media (hover: hover) in CSS
// Or check in JS
const isTouchDevice = () => window.matchMedia('(hover: none)').matches

// In Tailwind — prefix with group-hover and only apply on non-touch
// Use CSS: @media (hover: hover) { .hover-effect { ... } }
```

---

## Mobile Animation Optimization

### Reduce Complexity on Small Screens
```typescript
// Lighter animations on mobile (fewer transforms, simpler effects)
const isMobile = useMediaQuery('(max-width: 768px)')

const heroVariants = {
  hidden: { opacity: 0, y: isMobile ? 20 : 40 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: isMobile ? 0.6 : 0.9 }
  }
}
```

### Disable Parallax on Mobile
```typescript
// Parallax effects cause performance issues on mobile
const { scrollY } = useScroll()
const shouldParallax = useMediaQuery('(min-width: 1024px)')
const y = useTransform(scrollY, [0, 500], shouldParallax ? [0, -100] : [0, 0])
```

### Mobile-Specific Viewport Units
```typescript
// Use svh/svw (small viewport) for mobile — avoids address bar issues
className="min-h-[100svh]"   // NOT min-h-screen on mobile hero
className="h-[100svh]"

// In CSS:
.hero { min-height: 100svh; }  /* svh = small viewport height */
```

---

## Mobile-Specific Visual Adjustments

### Background Treatments
```typescript
// Reduce gradient complexity on mobile
className="bg-gradient-to-b from-brand-black to-brand-charcoal md:bg-[radial-gradient(...)]"

// Disable expensive backdrop-filter on mobile if performance is poor
className="backdrop-blur-none md:backdrop-blur-xl"
```

### Font Weight Adjustment
```typescript
// Thin fonts (100, 200) can render poorly on some Android screens
// Use 300 as the minimum on mobile
className="font-thin md:font-thin"  // OK on high-DPI — test on real device
className="font-light"              // Safer fallback
```

### Image Aspect Ratios
```typescript
// Portrait ratios work better on mobile
className="aspect-[3/4] md:aspect-[4/5] lg:aspect-[3/4]"

// Don't force landscape on mobile
className="aspect-video md:aspect-[16/9]"  // Consider mobile alternative
```

---

## Testing Checklist

### Devices to Test
- iPhone SE (375px) — smallest common viewport
- iPhone 14 Pro (393px) — common iOS
- Samsung Galaxy S23 (360px) — common Android
- iPad Mini (768px) — tablet portrait
- iPad Pro 12.9 (1024px) — tablet landscape

### What to Verify
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets are at least 44×44px
- [ ] Text remains readable (min 16px on mobile body)
- [ ] Navigation opens and closes smoothly
- [ ] Images load within 2.5s on 4G (LCP)
- [ ] No layout shift (CLS < 0.1)
- [ ] Animations don't cause jank (60fps)
- [ ] `100svh` used for full-screen hero
- [ ] Forms are usable with on-screen keyboard
- [ ] Pinch-to-zoom not disabled (accessibility requirement)

---

## Anti-Patterns

- Never use `vh` for hero sections on mobile — use `svh`
- Never disable pinch-to-zoom (`user-scalable=no`)
- Never rely on `hover` states for core functionality
- Never use desktop-only complex animations directly on mobile
- Never show desktop layout on tablet portrait — always adapt
- Never create horizontal scroll accidentally with `overflow` issues
