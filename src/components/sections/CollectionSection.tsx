'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { easing, duration } from '@/lib/tokens'
import { PerfumeBottle } from '@/src/components/ui/PerfumeBottle'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const BG = '#07100A'
const GOLD = '#C9A84C'
const OYSTER = '#C4BEB8'

// ─── Single Product ───────────────────────────────────────────────────────────
const PRODUCT = {
  id: 'oud-form',
  name: 'Oud Form',
  subtitle: 'Rare Oud · Cold Mineral · Amber Resin',
  price: 285,
  size: '60ml',
  description: 'A slow burn. The weight of ancient wood, cold stone corridors, and amber dried in silence. Oud Form does not announce itself — it lingers.',
  notes: {
    top: 'Bergamot · Black Pepper · Cardamom',
    heart: 'Oud Resin · Incense · Rose Absolute',
    base: 'Amber · Sandalwood · Musk · Vetiver',
  },
  longevity: '10–14 hours',
  sillage: 'Moderate to strong',
  tag: 'Debut Edition',
  gradient: 'linear-gradient(145deg, #0D1A10 0%, #08100A 40%, #0F1C12 70%, #060E08 100%)',
  accent: '#2A5C3D',
} as const

// ─── Note Pyramid ─────────────────────────────────────────────────────────────

function NoteRow({ tier, label }: { tier: string; label: string }) {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'baseline' }}>
      <span style={{
        fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.45)', flexShrink: 0, width: '36px',
      }}>
        {tier}
      </span>
      <span style={{
        fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
        fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)', fontWeight: 300, fontStyle: 'italic',
        color: 'rgba(196,190,184,0.55)', lineHeight: 1.5,
      }}>
        {label}
      </span>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function CollectionSection() {
  const [hovered, setHovered] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, amount: 0.3 })
  const cardInView = useInView(cardRef, { once: true, amount: 0.15 })

  return (
    <section
      aria-label="Oud Form — the collection"
      style={{
        background: BG,
        padding: 'clamp(5rem, 10vw, 12rem) clamp(1.5rem, 7vw, 7rem)',
        borderTop: '1px solid rgba(42,96,64,0.2)',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

        {/* ── Header ──────────────────────────────────────────────── */}
        <div
          ref={headerRef}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            marginBottom: 'clamp(3.5rem, 6vw, 6rem)',
            flexWrap: 'wrap', gap: '1.5rem',
          }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: duration.base, ease: easing.luxury }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}
            >
              <div style={{ width: '20px', height: '1px', background: GOLD }} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                letterSpacing: '0.3em', textTransform: 'uppercase', color: GOLD,
              }}>
                03 — The Collection
              </span>
            </motion.div>

            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '100%', filter: 'blur(10px)' }}
                animate={headerInView ? { y: '0%', filter: 'blur(0px)' } : {}}
                transition={{ duration: duration.cinematic, ease: easing.silk, delay: 0.1 }}
                style={{
                  fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                  fontWeight: 300, fontSize: 'clamp(2.5rem, 5.5vw, 7rem)',
                  lineHeight: 0.9, letterSpacing: '-0.035em', margin: 0, color: OYSTER,
                }}
              >
                One accord.{' '}
                <span style={{ fontStyle: 'italic', color: 'rgba(196,190,184,0.38)' }}>
                  One house.
                </span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ duration: duration.base, ease: easing.gentle, delay: 0.4 }}
          >
            <Link
              href="/collections"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', fontWeight: 500,
                letterSpacing: '0.22em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.55)', textDecoration: 'none',
                padding: '0.75rem 0', borderBottom: '1px solid rgba(201,168,76,0.2)',
                transition: `color 400ms ${easing.gentle}, border-color 400ms ${easing.gentle}`,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = GOLD
                el.style.borderBottomColor = 'rgba(201,168,76,0.5)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.color = 'rgba(201,168,76,0.55)'
                el.style.borderBottomColor = 'rgba(201,168,76,0.2)'
              }}
            >
              View full details
              <svg width="14" height="7" viewBox="0 0 14 7" fill="none">
                <path d="M0 3.5H12M9.5 1L12 3.5L9.5 6" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* ── Product — full editorial layout ────────────────────── */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50, filter: 'blur(8px)' }}
          animate={cardInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: duration.cinematic, ease: easing.silk }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(3rem, 6vw, 7rem)',
            alignItems: 'center',
          }}
        >
          {/* Left — Bottle visual */}
          <motion.div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            whileTap={{ scale: 0.98 }}
            style={{ cursor: 'pointer' }}
          >
            <Link href={`/products/${PRODUCT.id}`} style={{ display: 'block', textDecoration: 'none' }}>
              <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '3/4', maxWidth: '480px', margin: '0 auto' }}>
                {/* Background */}
                <motion.div
                  animate={{ scale: hovered ? 1.04 : 1 }}
                  transition={{ duration: 1.4, ease: easing.silk }}
                  style={{ position: 'absolute', inset: 0, background: PRODUCT.gradient }}
                />

                {/* Grain */}
                <div style={{
                  position: 'absolute', inset: 0, zIndex: 1, opacity: 0.04, pointerEvents: 'none',
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }} />

                {/* Forest green glow on hover */}
                <motion.div
                  animate={{ opacity: hovered ? 1 : 0 }}
                  transition={{ duration: 0.9, ease: easing.luxury }}
                  style={{
                    position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                    background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(42,96,64,0.18) 0%, transparent 70%)',
                  }}
                />

                {/* Tag */}
                <div style={{
                  position: 'absolute', top: '1.25rem', left: '1.25rem', zIndex: 10,
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: '#07100A', background: GOLD, padding: '0.3rem 0.75rem',
                }}>
                  {PRODUCT.tag}
                </div>

                {/* Bottle centered */}
                <div style={{ position: 'absolute', inset: 0, zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <motion.div
                    animate={{ y: hovered ? -14 : 0, rotate: hovered ? 1.5 : 0 }}
                    transition={{ type: 'spring', stiffness: 160, damping: 18, mass: 1.2 }}
                    style={{ scale: 1.10, transformOrigin: 'center center' }}
                  >
                    <PerfumeBottle />
                  </motion.div>
                </div>

                {/* Bottom vignette */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', zIndex: 6, pointerEvents: 'none',
                  background: 'linear-gradient(to top, rgba(7,16,10,0.65) 0%, transparent 100%)',
                }} />

                {/* "Discover" CTA */}
                <div style={{
                  position: 'absolute', bottom: '1.75rem', left: 0, right: 0, zIndex: 10,
                  display: 'flex', justifyContent: 'center',
                  opacity: hovered ? 1 : 0.4,
                  transform: hovered ? 'translateY(0)' : 'translateY(5px)',
                  transition: `opacity 400ms ${easing.luxury}, transform 400ms ${easing.luxury}`,
                }}>
                  <span style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                    letterSpacing: '0.25em', textTransform: 'uppercase',
                    color: OYSTER, display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}>
                    <span style={{ display: 'block', width: '18px', height: '1px', background: GOLD }} />
                    Discover
                    <span style={{ display: 'block', width: '18px', height: '1px', background: GOLD }} />
                  </span>
                </div>

                {/* Gold border on hover */}
                <motion.div
                  animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.97 }}
                  transition={{ duration: 0.55, ease: easing.luxury }}
                  style={{ position: 'absolute', inset: 0, zIndex: 8, border: '1px solid rgba(201,168,76,0.4)', pointerEvents: 'none' }}
                />
              </div>
            </Link>
          </motion.div>

          {/* Right — Product details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2.5rem)' }}>

            {/* Brand + product */}
            <div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.45)', marginBottom: '0.75rem',
              }}>
                3GEN — Parfumerie
              </div>

              <h3 style={{
                fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 5.5rem)',
                lineHeight: 0.92, letterSpacing: '-0.02em', margin: '0 0 0.5rem',
                color: OYSTER,
              }}>
                <span style={{ fontStyle: 'italic' }}>Oud</span> Form
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 400,
                  color: GOLD, letterSpacing: '0.02em',
                }}>
                  $285
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.18em', textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.38)',
                }}>
                  60ml · Eau de Parfum
                </span>
              </div>
            </div>

            {/* Gold divider */}
            <div style={{ height: '1px', width: '48px', background: 'rgba(201,168,76,0.3)' }} />

            {/* Description */}
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(0.875rem, 1.1vw, 0.9375rem)',
              fontWeight: 300, lineHeight: 1.9,
              color: 'rgba(196,190,184,0.5)',
              maxWidth: '48ch',
            }}>
              {PRODUCT.description}
            </p>

            {/* Note pyramid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem 0', borderTop: '1px solid rgba(42,96,64,0.25)', borderBottom: '1px solid rgba(42,96,64,0.25)' }}>
              <NoteRow tier="Top" label={PRODUCT.notes.top} />
              <NoteRow tier="Heart" label={PRODUCT.notes.heart} />
              <NoteRow tier="Base" label={PRODUCT.notes.base} />
            </div>

            {/* Longevity + sillage */}
            <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '0.3rem' }}>Longevity</div>
                <div style={{ fontFamily: 'var(--font-cormorant-garamond), Georgia, serif', fontSize: '1rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(196,190,184,0.55)' }}>{PRODUCT.longevity}</div>
              </div>
              <div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.4)', marginBottom: '0.3rem' }}>Sillage</div>
                <div style={{ fontFamily: 'var(--font-cormorant-garamond), Georgia, serif', fontSize: '1rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(196,190,184,0.55)' }}>{PRODUCT.sillage}</div>
              </div>
            </div>

            {/* CTA */}
            <motion.div
              whileHover={{ scale: 1.02, transition: { type: 'spring', stiffness: 280, damping: 22 } }}
              whileTap={{ scale: 0.97 }}
              style={{ alignSelf: 'flex-start' }}
            >
              <Link
                href={`/products/${PRODUCT.id}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.875rem',
                  padding: '1rem 2.5rem',
                  background: 'transparent', border: '1px solid rgba(201,168,76,0.35)',
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 500,
                  letterSpacing: '0.22em', textTransform: 'uppercase',
                  color: 'rgba(196,190,184,0.72)', cursor: 'pointer',
                  transition: `all 500ms ${easing.luxury}`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'rgba(201,168,76,0.75)'
                  el.style.background = 'rgba(201,168,76,0.07)'
                  el.style.color = OYSTER
                  el.style.boxShadow = '0 0 32px rgba(201,168,76,0.1)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement
                  el.style.borderColor = 'rgba(201,168,76,0.35)'
                  el.style.background = 'transparent'
                  el.style.color = 'rgba(196,190,184,0.72)'
                  el.style.boxShadow = 'none'
                }}
              >
                <span>Add to Bag</span>
                <span style={{ color: GOLD, fontSize: '0.85rem' }}>→</span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
