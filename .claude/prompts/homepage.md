# Homepage Generation Prompt — 3GEN Luxury Perfume

## Pre-Generation Instructions

Before generating any code, load and internalize:
- `.claude/system-prompt.md` — core identity and standards
- `.claude/skills/ui.md` — layout and visual rules
- `.claude/skills/motion.md` — animation standards
- `.claude/skills/luxury-brand.md` — brand identity and voice
- `.claude/skills/performance.md` — code quality standards
- `.claude/skills/mobile.md` — mobile responsiveness
- `.claude/references/inspirations.md` — visual direction

---

## Homepage Generation Prompt

Generate the complete `app/page.tsx` and all required section components for the 3GEN luxury perfume homepage. This is an award-winning, Awwwards-quality homepage for an ultra-premium niche fragrance brand.

---

## Page Architecture

Build the homepage with these sections in this order:

```
1. <HeroSection />           — Cinematic full-viewport opening
2. <BrandStorySection />     — Who 3GEN is
3. <FeaturedSection />       — Hero product spotlight
4. <CollectionSection />     — Full range grid
5. <IngredientsSection />    — Craftsmanship / ingredients
6. <AtmosphereSection />     — Immersive brand world banner
7. <TestimonialsSection />   — Social proof, luxury style
8. <BannerSection />         — Full-bleed editorial image strip
9. <NewsletterSection />     — Minimal, high-end subscription
10. <FooterSection />        — Premium, complete footer
```

---

## Section-by-Section Requirements

### 1. HeroSection

**File:** `components/sections/HeroSection.tsx`

**Visual:**
- Full viewport height (`min-h-[100svh]`)
- Background: dark cinematic video loop OR atmospheric static image with subtle grain overlay
- Text positioned bottom-left or asymmetrically — not centered
- Brand name: `3GEN` in large Cormorant Garamond, ultra-thin weight, letter-spaced
- Tagline beneath: one short, evocative line (e.g., "The art of the invisible.")
- Subtle animated gold divider line or decorative element
- Scroll indicator: thin animated line or small text, bottom center

**Animation:**
- Brand name: character-by-character fade up stagger (stagger: 0.05s per char)
- Tagline: fade in after brand name completes (delay: 0.8s)
- Background image/video: scale 1.05 → 1.0 over 2s on load (cinematic settle)
- Scroll indicator: gentle infinite vertical motion loop

**Code Requirements:**
- Use `next/image` with `priority={true}` for hero image
- Use `useScroll` + `useTransform` for parallax on image
- Navbar must be transparent here (communicate via context or props)
- Use `100svh` not `100vh` for full-screen height

---

### 2. BrandStorySection

**File:** `components/sections/BrandStorySection.tsx`

**Visual:**
- Split layout: large typographic element left, editorial text right (on desktop)
- On mobile: stacked vertically
- Left: large decorative numeral "3GEN" or Roman numeral, very light opacity (0.05), extreme scale
- Right: three short paragraphs about brand origin, craft, and philosophy
- Thin gold horizontal rule separating intro and body text
- Section anchored by a `01` label in small gold caps

**Copy Direction:**
```
"Born from the belief that scent is the most intimate form of self-expression."

"Each 3GEN fragrance begins not with a brief, but with a question: what does this moment smell like?"

"We do not make perfumes for occasions. We make them for identities."
```

**Animation:**
- Left element: fade in slow (1.4s), parallax scroll offset
- Right text: line-by-line fade up stagger (stagger: 0.15s per paragraph)

---

### 3. FeaturedSection

**File:** `components/sections/FeaturedSection.tsx`

**Visual:**
- Asymmetric layout: large product image (2/3 viewport width) + text panel
- Image: tall portrait format, product on atmospheric background
- Text panel: product name in large Cormorant italic, description in evocative prose style
- Gold accent: thin vertical rule beside text panel
- CTA: minimal text link "Discover" with gold underline animation
- Section background: `brand.charcoal` to differentiate from hero

**Copy Direction:**
```
Product Name: "Obsidian"
Description: "Oud resin and cold mineral stone. A fragrance that exists at the edge of restraint."
```

**Animation:**
- Image: scale reveal on scroll (`clipPath` or `scale` from 0.95 → 1)
- Text: stagger fade up from right panel
- Gold rule: height grows 0 → 100% on scroll entry

---

### 4. CollectionSection

**File:** `components/sections/CollectionSection.tsx`

**Visual:**
- Section headline: large display type, left-aligned
- Grid: 2 columns on tablet, 3 on desktop, 1 on mobile
- Each card: tall portrait image, no border-radius, hover scale with gold border flash
- Under image: brand label (small caps), product name (Cormorant italic), volume options, price
- Cards have no box shadow — use spacing and image quality for elevation
- Consider horizontal scroll on mobile for editorial feel

**Product Data (use placeholder/mock):**
```typescript
const products = [
  { name: 'Obsidian', subtitle: 'Oud & Mineral', price: 285, sizes: ['50ml', '100ml'] },
  { name: 'Volta', subtitle: 'Electric Citrus & Vetiver', price: 265, sizes: ['50ml', '100ml'] },
  { name: 'Éther', subtitle: 'White Musk & Iris', price: 250, sizes: ['50ml', '100ml'] },
  { name: 'Nox', subtitle: 'Tobacco & Amber', price: 290, sizes: ['50ml', '100ml'] },
  { name: 'Cendres', subtitle: 'Smoke & Warm Wood', price: 275, sizes: ['50ml', '100ml'] },
  { name: 'Still Air', subtitle: 'Sea Salt & Cedar', price: 260, sizes: ['50ml', '100ml'] },
]
```

**Animation:**
- Grid items: stagger fade up (stagger: 0.08s per card)
- Hover: image slow scale (0.8s) + gold border fade in

---

### 5. IngredientsSection

**File:** `components/sections/IngredientsSection.tsx`

**Visual:**
- Full-width atmospheric background (dark texture or atmospheric image)
- Horizontal strip of ingredient close-up images (5–7 items, horizontally scrollable)
- Each ingredient: square image + name in small caps + origin text
- Section headline: "The Raw. The Rare." or "Ingredients of Consequence."
- Elegant typography treatment — not a typical features grid

**Ingredient Data:**
```typescript
const ingredients = [
  { name: 'Agarwood', origin: 'Laos', note: 'Base' },
  { name: 'Iris Pallida', origin: 'Tuscany', note: 'Heart' },
  { name: 'Vetiver', origin: 'Haiti', note: 'Base' },
  { name: 'Rose de Mai', origin: 'Grasse', note: 'Heart' },
  { name: 'Ambergris', origin: 'Atlantic', note: 'Base' },
  { name: 'Bergamot', origin: 'Calabria', note: 'Top' },
]
```

**Animation:**
- Ingredients strip: drag-to-scroll on mobile, auto-scroll hint animation
- Each item: stagger fade in as strip is visible

---

### 6. AtmosphereSection

**File:** `components/sections/AtmosphereSection.tsx`

**Visual:**
- Full-bleed atmospheric image (dark, moody — empty corridor, smoke, stone interior)
- Overlaid text: one large quote or brand statement
- Very subtle vignette gradient overlay
- Minimal text — this section is about the image, not the copy

**Copy:**
```
"Worn once.
Remembered forever."
```

**Animation:**
- Parallax scroll on background image (GSAP ScrollTrigger)
- Text: cinematic fade in as section enters viewport (1.2s, blur + opacity)

---

### 7. TestimonialsSection

**File:** `components/sections/TestimonialsSection.tsx`

**Visual:**
- Not a card grid — use editorial horizontal scroll or single large quote treatment
- One testimonial visible at a time, large format
- Attribution: name in small caps, gold tint, thin weight
- Minimal pagination — thin dots or numbered indicator (01/04)
- Section background: `brand.charcoal`

**Copy Direction:**
```
"I've worn niche fragrances for fifteen years. 
 3GEN is the first that made me feel I'd finally found the right one."
— A. Marchetti, Milan

"Obsidian stopped a room. Three people asked what I was wearing."
— J. Laurent, Paris
```

**Animation:**
- Testimonial text: fade and slide transition between quotes (Framer AnimatePresence)
- Auto-advance every 6 seconds, pause on hover

---

### 8. BannerSection

**File:** `components/sections/BannerSection.tsx`

**Visual:**
- Full-bleed wide editorial image (landscape, atmospheric product shot)
- Minimal text overlay if any — let the image speak
- `aspect-[21/9]` on desktop, `aspect-[4/3]` on mobile
- Optional: thin gold border inset from edges

**Animation:**
- Image: slow scale 1.05 → 1.0 as section enters viewport (1.5s)
- If text present: fade up after image settles

---

### 9. NewsletterSection

**File:** `components/sections/NewsletterSection.tsx`

**Visual:**
- Minimal, elegant — not a typical "Subscribe" box
- Headline: "Join the circle." or "Receive what matters."
- One line description: "Private announcements. New editions. Nothing more."
- Single email input field — no border-radius, gold bottom border only
- Submit: text button "Enter" right of field, or separate minimal text link
- Dark background, generous vertical padding (`py-40`)

**Animation:**
- Input field: border animates from 0 to full width on section entry
- Submit: subtle gold fade in

---

### 10. FooterSection

**File:** `components/sections/FooterSection.tsx`

**Visual:**
- Brand name in large display type (very light opacity — 0.06) as background watermark
- Navigation columns: Shop, About, Support
- Social links: Instagram, Pinterest (icon + text, no icon-only)
- Legal: thin text, bottom row — Privacy, Terms, © 3GEN
- Currency/language selector minimal
- Overall: dark, clean, architecturally structured

---

## Global Code Requirements

### File: `app/page.tsx`
```typescript
import { HeroSection } from '@/components/sections/HeroSection'
import { BrandStorySection } from '@/components/sections/BrandStorySection'
// ... all sections

export default function HomePage() {
  return (
    <main id="main-content" className="bg-brand-black overflow-x-hidden">
      <HeroSection />
      <BrandStorySection />
      <FeaturedSection />
      <CollectionSection />
      <IngredientsSection />
      <AtmosphereSection />
      <TestimonialsSection />
      <BannerSection />
      <NewsletterSection />
      <FooterSection />
    </main>
  )
}
```

### Motion Library Import Pattern
```typescript
// Always use named imports from framer-motion
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue } from 'framer-motion'

// Always import shared variants from lib/motion
import { fadeUp, staggerContainer, cinematicFade, easing, duration } from '@/lib/motion'
```

### Image Placeholder Pattern
```typescript
// Use placeholder colors matching the brand palette for missing images
// Never use placehold.co or lorempixel
// Use CSS gradients as temporary stand-ins
background: linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)
```

---

## Quality Gate

Before considering the homepage complete, verify:

- [ ] All 10 sections render without errors
- [ ] Animations trigger correctly on scroll
- [ ] Mobile layout looks editorial (not just "stacked")
- [ ] Typography scales beautifully from 375px to 1920px
- [ ] No horizontal overflow at any breakpoint
- [ ] Hero image/video loads with priority
- [ ] Page feels like Byredo or Dior — not a Tailwind template
- [ ] Gold accent used sparingly (not on every element)
- [ ] Copy feels evocative and intentional (not placeholder-style)
- [ ] Lighthouse performance score 85+ in dev (target 90+ in prod)
