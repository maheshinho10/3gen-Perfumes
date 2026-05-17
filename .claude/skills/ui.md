# UI Skill — Premium Layout & Visual Design

## Guiding Principle

Every layout decision must feel **deliberate, editorial, and expensive**. This is not a template — it is a digital art direction system for a luxury fragrance brand.

Inspiration: Apple, Aesop, Dior, Byredo, Tom Ford, 21st.dev, Awwwards SOTD.

---

## Layout Philosophy

### Asymmetrical Composition
- Break the grid intentionally — offset images, staggered text columns, diagonal overlaps
- Use negative space as a design element, not empty space
- Mix full-bleed and contained elements on the same screen
- Avoid symmetry unless it serves a dramatic cinematic purpose

### Editorial Rhythm
- Alternate between text-dominant and image-dominant sections
- Create visual breathing between sections — minimum `py-32` to `py-48`
- Use large typographic anchors (`text-[clamp(4rem,12vw,14rem)]`) as section headers
- Let typography scale dramatically between breakpoints

### Cinematic Proportions
- Hero sections: `min-h-screen` or taller
- Feature images: `aspect-[4/5]` portrait or `aspect-[16/9]` cinematic wide
- Product showcase panels: `min-h-[80vh]`
- Never shrink content to fit — let sections demand their space

---

## Typography System

### Scale
```css
/* Cinematic display */
.display-hero  { font-size: clamp(4rem, 14vw, 16rem); }
.display-large { font-size: clamp(3rem, 8vw, 10rem); }
.display-medium{ font-size: clamp(2rem, 5vw, 6rem); }

/* Body */
.body-large    { font-size: clamp(1.125rem, 1.5vw, 1.375rem); }
.body-base     { font-size: clamp(0.9375rem, 1.2vw, 1.0625rem); }
.caption       { font-size: clamp(0.75rem, 0.9vw, 0.875rem); }
```

### Fonts
- **Headings:** Cormorant Garamond (400, 300 italic) or Playfair Display
- **Subheadings:** DM Sans (300, 400)
- **Body:** Inter (300, 400)
- **Labels/Caps:** DM Sans (500, letter-spacing: 0.2em, uppercase)

### Typography Rules
- Use thin weights (300) for elegance — avoid bold except for dramatic effect
- Letter-spacing on uppercase labels: `tracking-[0.25em]` minimum
- Line height for large display text: `leading-none` or `leading-[0.9]`
- Never use default browser font sizes for hero sections

---

## Color System

### Brand Palette
```typescript
// tailwind.config.ts
colors: {
  brand: {
    black:    '#0A0A0A',   // Matte black — primary background
    charcoal: '#1A1A1A',   // Elevated surfaces
    smoke:    '#2A2A2A',   // Subtle borders, dividers
    gold:     '#C9A84C',   // Primary accent — use sparingly
    'gold-light': '#E2C97E', // Hover states, glows
    'gold-muted': '#8B7340', // Subdued gold for text
    ivory:    '#F5F0E8',   // Primary text on dark
    'ivory-dim': '#C8BFA8', // Secondary text
    white:    '#FFFFFF',   // Rare — only for dramatic contrast
  }
}
```

### Usage Rules
- **Background:** Always start with `brand.black` or `brand.charcoal`
- **Gold:** Reserve for key CTAs, section accents, decorative lines — max 20% of surface
- **Ivory:** Primary text color on dark backgrounds
- **White:** Use only for maximum contrast moments
- Never use blue, red, or green — they break the luxury palette

---

## Surface Treatments

### Glassmorphism (Premium)
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(201, 168, 76, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
}
```

### Gold Glow Effect
```css
.gold-glow {
  box-shadow: 0 0 40px rgba(201, 168, 76, 0.15),
              0 0 80px rgba(201, 168, 76, 0.05);
}
```

### Matte Texture Overlay
```css
.texture-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: url('/textures/grain.png') repeat;
  opacity: 0.03;
  pointer-events: none;
}
```

### Premium Gradients
```css
/* Dark atmospheric */
.gradient-dark: linear-gradient(180deg, #0A0A0A 0%, #1A1A1A 50%, #0A0A0A 100%)

/* Gold shimmer */
.gradient-gold: linear-gradient(135deg, #8B7340 0%, #C9A84C 50%, #E2C97E 100%)

/* Cinematic vignette */
.gradient-vignette: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.8) 100%)
```

---

## Component Patterns

### Product Card (Luxury)
```
- Full-height image, no border radius or drop shadow on product
- Brand name in small caps, letter-spaced
- Product name in Cormorant Garamond italic, large
- Price in DM Sans light, gold tint
- Hover: slow image scale + soft gold border reveal
- No conventional "Add to Cart" button — use minimal text link
```

### Section Divider
```
- Thin gold horizontal rule, 40% width, centered
- OR large decorative numeral (01, 02, 03) in ultra-light serif, opacity 0.1
- Never use standard `<hr>` styling
```

### Navigation
```
- Transparent on hero, dark on scroll (smooth transition)
- Brand name centered or left — never in a conventional logo lockup
- Menu items: DM Sans 400, letter-spaced caps, ivory
- Hover: thin gold underline slides in from left
- Mobile: full-screen overlay with editorial layout
```

### CTA Button
```
- Prefer text links over buttons for luxury feel
- When buttons needed: no border-radius, 1px gold border, transparent fill
- Hover: fills with gold, text turns black
- Avoid conventional rounded, filled buttons
```

---

## What Never to Do

- No `rounded-lg` or `rounded-xl` on primary elements — use `rounded-none` or `rounded-sm`
- No `shadow-md` or `shadow-lg` — use custom `box-shadow` with proper spread
- No `bg-white` sections — everything lives in the dark palette
- No centered hero with an H1 + subtitle + two buttons
- No Bootstrap-style 3-column card grid for products
- No generic Tailwind `prose` for content sections
- No emoji in UI — ever
- No stock photo aesthetic — every image should feel editorial and moody
