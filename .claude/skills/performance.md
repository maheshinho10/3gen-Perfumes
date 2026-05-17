# Performance Skill — Scalable, Production-Ready Code

## Goal

Every component and page built for 3GEN must be production-ready from day one. No placeholder logic, no "optimize later" shortcuts. Lighthouse score target: **90+ across all metrics**.

---

## Next.js Optimization

### Image Optimization
```typescript
// Always use next/image — never <img>
import Image from 'next/image'

<Image
  src="/products/obsidian-100ml.jpg"
  alt="3GEN Obsidian — 100ml Eau de Parfum"
  width={800}
  height={1000}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority={isAboveFold}    // true for hero images only
  quality={85}
  className="object-cover"
/>
```

### Font Optimization
```typescript
// app/layout.tsx — use next/font, never @import in CSS
import { Cormorant_Garamond, DM_Sans, Inter } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})
```

### Metadata API
```typescript
// Every page.tsx must export metadata
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '3GEN — Luxury Niche Perfumery',
  description: 'Ultra-premium artisanal fragrances for those who require no introduction.',
  openGraph: {
    title: '3GEN Perfumery',
    description: 'Crafted for the few. Remembered by all.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3GEN Perfumery',
    images: ['/og-image.jpg'],
  },
}
```

---

## Component Architecture

### Folder Structure
```
src/
├── app/
│   ├── layout.tsx          # Root layout with providers, fonts
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Global styles, CSS variables
│   └── (routes)/
│       ├── collections/
│       ├── product/[slug]/
│       └── about/
├── components/
│   ├── ui/                 # Primitive UI components (Button, Badge, etc.)
│   ├── sections/           # Page sections (Hero, Features, etc.)
│   ├── layout/             # Navbar, Footer, PageWrapper
│   └── shared/             # Reusable across sections
├── hooks/                  # Custom React hooks
├── lib/
│   ├── motion.ts           # Framer Motion variants & easing
│   ├── utils.ts            # cn(), formatPrice(), etc.
│   └── constants.ts        # Brand tokens, navigation links
├── types/                  # TypeScript interfaces
└── public/
    ├── images/
    ├── textures/
    └── videos/
```

### Component Template
```typescript
// components/sections/ExampleSection.tsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

interface ExampleSectionProps {
  title: string
  subtitle?: string
  className?: string
}

export function ExampleSection({ title, subtitle, className }: ExampleSectionProps) {
  return (
    <section className={cn('relative py-40', className)}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="container mx-auto px-6"
      >
        <motion.h2 variants={fadeUp} className="text-brand-ivory font-cormorant">
          {title}
        </motion.h2>
        {subtitle && (
          <motion.p variants={fadeUp} className="text-brand-ivory-dim">
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  )
}
```

---

## Lazy Loading

### Section-Level Lazy Loading
```typescript
// Use dynamic imports for below-fold sections
import dynamic from 'next/dynamic'

const TestimonialsSection = dynamic(
  () => import('@/components/sections/TestimonialsSection'),
  { loading: () => <SectionSkeleton /> }
)

const NewsletterSection = dynamic(
  () => import('@/components/sections/NewsletterSection')
)
```

### Component-Level Suspense
```typescript
// app/page.tsx
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <main>
      <HeroSection />  {/* Always eager-loaded */}
      <Suspense fallback={<ProductsSkeleton />}>
        <FeaturedProducts />
      </Suspense>
    </main>
  )
}
```

---

## React Performance

### Memoization
```typescript
// Memoize expensive components
export const ProductCard = React.memo(function ProductCard({ product }: ProductCardProps) {
  // ...
})

// Memoize derived data
const sortedProducts = useMemo(
  () => products.sort((a, b) => a.price - b.price),
  [products]
)

// Memoize callbacks passed to children
const handleAddToCart = useCallback((id: string) => {
  // ...
}, [])
```

### Avoid Re-renders
```typescript
// Keep animation state local — don't lift motion state to parent
// Use useRef for values that change but don't need re-render
const mousePosition = useRef({ x: 0, y: 0 })

// Split context into read + write to avoid over-subscription
const CartStateContext = createContext(state)
const CartDispatchContext = createContext(dispatch)
```

---

## Accessibility

### Semantic HTML
```typescript
// Always use semantic elements
<header>         // Site header/navbar
<nav>            // Navigation
<main>           // Main content (one per page)
<section>        // Page sections (with aria-label)
<article>        // Self-contained content (products, blog)
<aside>          // Secondary content
<footer>         // Site footer

// Example section with accessibility
<section aria-labelledby="collections-heading">
  <h2 id="collections-heading" className="sr-only">Our Collections</h2>
  {/* content */}
</section>
```

### Keyboard Navigation
```typescript
// All interactive elements: focusable, visible focus ring
// Custom focus styles matching brand
.focus-visible:focus-visible {
  outline: 1px solid #C9A84C;
  outline-offset: 4px;
}

// Skip to main content link (hidden until focused)
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50"
>
  Skip to main content
</a>
```

### Reduced Motion
```typescript
// Every animation component must respect this
import { useReducedMotion } from 'framer-motion'

function AnimatedSection() {
  const prefersReducedMotion = useReducedMotion()
  
  return (
    <motion.div
      variants={prefersReducedMotion ? {} : fadeUp}
      initial={prefersReducedMotion ? {} : 'hidden'}
      animate={prefersReducedMotion ? {} : 'visible'}
    />
  )
}
```

### ARIA Labels
```typescript
// Icon-only buttons always need aria-label
<button aria-label="Open navigation menu">
  <MenuIcon className="w-5 h-5" />
</button>

// Image alt text — descriptive, not filename
<Image alt="3GEN Obsidian fragrance bottle — matte black glass with gold cap" />
```

---

## SEO

### Structured Data
```typescript
// Product schema (add to product pages)
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  description: product.description,
  brand: { '@type': 'Brand', name: '3GEN' },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'USD',
    availability: 'https://schema.org/InStock',
  },
}

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
/>
```

### Sitemap & Robots
```typescript
// app/sitemap.ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://3gen.com', lastModified: new Date(), priority: 1 },
    { url: 'https://3gen.com/collections', priority: 0.9 },
    // dynamic product URLs...
  ]
}
```

---

## Code Quality

### Utility Functions
```typescript
// lib/utils.ts — always have these
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
  }).format(price)
}
```

### Error Boundaries
```typescript
// Every dynamic section should have an error boundary
// app/error.tsx handles route-level errors
// Use react-error-boundary for component-level protection
```

---

## Pre-Launch Checklist

- [ ] All images use `next/image` with proper `alt`, `sizes`, `priority`
- [ ] All fonts loaded via `next/font`
- [ ] Metadata defined on all pages
- [ ] Structured data on product pages
- [ ] All animations respect `prefers-reduced-motion`
- [ ] All interactive elements keyboard navigable
- [ ] No `any` TypeScript types
- [ ] No unused imports or dead code
- [ ] Lighthouse score 90+ in production build
- [ ] Mobile tested on real device (not just DevTools)
