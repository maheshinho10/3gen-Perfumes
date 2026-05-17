'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { easing, duration } from '@/lib/tokens'

// ─── Data ─────────────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    id: 0,
    quote: 'I have worn niche fragrances for fifteen years. 3GEN Obsidian is the first that made me feel I had finally stopped searching.',
    author: 'A. Marchetti',
    location: 'Milan',
    fragrance: 'Obsidian',
    tenure: 'Client since 2024',
  },
  {
    id: 1,
    quote: 'Éther stopped a room. Not loudly — the opposite of loudly. Three people asked what I was wearing before I had said a word.',
    author: 'J. Laurent',
    location: 'Paris',
    fragrance: 'Éther',
    tenure: 'Client since 2024',
  },
  {
    id: 2,
    quote: 'There is nothing like Cendres on the market. It smells the way I want to be remembered — not present, but unmistakably there.',
    author: 'S. Nakamura',
    location: 'Tokyo',
    fragrance: 'Cendres',
    tenure: 'Client since 2024',
  },
  {
    id: 3,
    quote: 'I ordered Nox on instinct. It arrived, I opened the bottle, and I understood immediately. Some things do not need explanation.',
    author: 'C. de Vries',
    location: 'Amsterdam',
    fragrance: 'Nox',
    tenure: 'Client since 2024',
  },
] as const

// ─── Quote mark SVG ───────────────────────────────────────────────────────────

function QuoteMark({ opacity = 0.15 }: { opacity?: number }) {
  return (
    <svg
      width="48" height="36" viewBox="0 0 48 36" fill="none"
      style={{ flexShrink: 0 }}
      aria-hidden
    >
      <path
        d="M0 36V22.5C0 14.5 4 7.5 12 2L15.5 6C11.167 9 9 13 9 18H16V36H0ZM26 36V22.5C26 14.5 30 7.5 38 2L41.5 6C37.167 9 35 13 35 18H42V36H26Z"
        fill={`rgba(201,168,76,${opacity})`}
      />
    </svg>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────

function ProgressBar({ active, dur }: { active: boolean; dur: number }) {
  return (
    <div style={{ position: 'relative', height: '1px', background: 'rgba(201,168,76,0.1)', overflow: 'hidden', flex: 1 }}>
      <AnimatePresence>
        {active && (
          <motion.div
            key="bar"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: dur / 1000, ease: 'linear' }}
            style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, rgba(201,168,76,0.5), rgba(201,168,76,0.9))',
              transformOrigin: 'left center',
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Testimonial card ─────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial,
  direction,
}: {
  testimonial: typeof TESTIMONIALS[number]
  direction: number
}) {
  return (
    <motion.article
      key={testimonial.id}
      initial={{ opacity: 0, x: direction * 70, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: direction * -50, filter: 'blur(6px)' }}
      transition={{ duration: 0.85, ease: easing.silk }}
      style={{
        position: 'relative',
        padding: 'clamp(2.5rem, 4vw, 4rem)',
        background: 'linear-gradient(135deg, rgba(15,31,20,0.95) 0%, rgba(11,23,16,0.98) 100%)',
        border: '1px solid rgba(201,168,76,0.14)',
        boxShadow: [
          'inset 0 1px 0 rgba(201,168,76,0.12)',
          'inset 0 -1px 0 rgba(0,0,0,0.3)',
          '0 8px 40px rgba(0,0,0,0.5)',
          '0 0 80px rgba(201,168,76,0.04)',
        ].join(', '),
        overflow: 'hidden',
      }}
    >
      {/* Corner accent — top left */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '40px', height: '40px',
        borderTop: '1px solid rgba(201,168,76,0.4)', borderLeft: '1px solid rgba(201,168,76,0.4)',
        pointerEvents: 'none',
      }} />
      {/* Corner accent — bottom right */}
      <div style={{
        position: 'absolute', bottom: 0, right: 0, width: '40px', height: '40px',
        borderBottom: '1px solid rgba(201,168,76,0.4)', borderRight: '1px solid rgba(201,168,76,0.4)',
        pointerEvents: 'none',
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '-40%', left: '-10%', width: '60%', height: '80%',
        background: 'radial-gradient(ellipse, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Quote mark */}
      <div style={{ marginBottom: '2rem' }}>
        <QuoteMark opacity={0.18} />
      </div>

      {/* Quote text */}
      <blockquote style={{ margin: '0 0 2.5rem 0' }}>
        <p style={{
          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
          fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
          fontWeight: 300,
          fontStyle: 'italic',
          lineHeight: 1.45,
          letterSpacing: '-0.015em',
          color: 'rgba(196,190,184,0.88)',
          margin: 0,
        }}>
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Divider */}
      <div style={{
        height: '1px', marginBottom: '1.75rem',
        background: 'linear-gradient(90deg, rgba(201,168,76,0.3), rgba(201,168,76,0.08) 60%, transparent)',
      }} />

      {/* Attribution */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 500,
            letterSpacing: '0.08em', color: 'rgba(196,190,184,0.75)',
          }}>
            {testimonial.author}
          </span>
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 400,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(196,190,184,0.3)',
          }}>
            {testimonial.location} — {testimonial.tenure}
          </span>
        </div>

        {/* Fragrance tag */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          padding: '0.4rem 0.875rem',
          border: '1px solid rgba(201,168,76,0.2)',
          background: 'rgba(201,168,76,0.04)',
        }}>
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#C9A84C' }} />
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500,
            letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.65)',
          }}>
            {testimonial.fragrance}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

const ADVANCE_DURATION = 6000

export function TestimonialsSection() {
  const [active, setActive]       = useState(0)
  const [direction, setDirection] = useState(1)
  const [paused, setPaused]       = useState(false)
  const sectionRef                = useRef<HTMLDivElement>(null)
  const inView                    = useInView(sectionRef, { once: false, amount: 0.3 })

  const next = useCallback(() => {
    setDirection(1)
    setActive((v) => (v + 1) % TESTIMONIALS.length)
  }, [])

  const prev = useCallback(() => {
    setDirection(-1)
    setActive((v) => (v - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }, [])

  const goTo = useCallback((i: number) => {
    setDirection(i > active ? 1 : -1)
    setActive(i)
  }, [active])

  useEffect(() => {
    if (!inView || paused) return
    const t = setTimeout(next, ADVANCE_DURATION)
    return () => clearTimeout(t)
  }, [active, inView, paused, next])

  return (
    <section
      ref={sectionRef}
      aria-label="Client testimonials"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 12rem) clamp(1.5rem, 7vw, 7rem)',
        background: 'linear-gradient(180deg, #0B1710 0%, #07100A 100%)',
        borderTop: '1px solid rgba(42,96,64,0.2)',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Large atmospheric quote mark */}
      <div style={{
        position: 'absolute', right: '-5%', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
        fontSize: 'clamp(10rem, 22vw, 28rem)', fontWeight: 200, lineHeight: 1,
        color: 'transparent', WebkitTextStroke: '1px rgba(201,168,76,0.04)',
        letterSpacing: '-0.06em', pointerEvents: 'none', userSelect: 'none', zIndex: 0,
      }}>
        &ldquo;
      </div>

      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          marginBottom: 'clamp(3rem, 6vw, 5.5rem)', flexWrap: 'wrap', gap: '1.5rem',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: duration.slow, ease: easing.silk }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ width: '20px', height: '1px', background: '#C9A84C' }} />
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C9A84C',
              }}>
                04 — Voices
              </span>
            </div>
            <h2 style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontWeight: 300, fontSize: 'clamp(2.5rem, 5vw, 6.5rem)',
              lineHeight: 0.92, letterSpacing: '-0.035em', margin: 0, color: '#C4BEB8',
            }}>
              Worn once.{' '}
              <span style={{ display: 'block', fontStyle: 'italic', color: 'rgba(196,190,184,0.4)' }}>
                Remembered always.
              </span>
            </h2>
          </motion.div>

          {/* Navigation controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'flex-end' }}>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {/* Prev */}
              <motion.button
                onClick={prev}
                whileHover={{
                  scale: 1.08,
                  transition: { type: 'spring', stiffness: 400, damping: 24 },
                }}
                whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
                aria-label="Previous testimonial"
                style={{
                  width: '44px', height: '44px', border: '1px solid rgba(201,168,76,0.2)',
                  background: 'transparent', cursor: 'pointer', color: 'rgba(201,168,76,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: `border-color 300ms, color 300ms, background 300ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(201,168,76,0.5)'
                  el.style.color = '#C9A84C'
                  el.style.background = 'rgba(201,168,76,0.06)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(201,168,76,0.2)'
                  el.style.color = 'rgba(201,168,76,0.6)'
                  el.style.background = 'transparent'
                }}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M14 5H2M5.5 1L2 5L5.5 9" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </motion.button>

              {/* Next */}
              <motion.button
                onClick={next}
                whileHover={{
                  scale: 1.08,
                  transition: { type: 'spring', stiffness: 400, damping: 24 },
                }}
                whileTap={{ scale: 0.92, transition: { duration: 0.08 } }}
                aria-label="Next testimonial"
                style={{
                  width: '44px', height: '44px', border: '1px solid rgba(201,168,76,0.2)',
                  background: 'transparent', cursor: 'pointer', color: 'rgba(201,168,76,0.6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: `border-color 300ms, color 300ms, background 300ms`,
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(201,168,76,0.5)'
                  el.style.color = '#C9A84C'
                  el.style.background = 'rgba(201,168,76,0.06)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget
                  el.style.borderColor = 'rgba(201,168,76,0.2)'
                  el.style.color = 'rgba(201,168,76,0.6)'
                  el.style.background = 'transparent'
                }}
              >
                <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                  <path d="M0 5H12M8.5 1L12 5L8.5 9" stroke="currentColor" strokeWidth="0.75" />
                </svg>
              </motion.button>
            </div>

            {/* Progress bars */}
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', width: '160px' }}>
              {TESTIMONIALS.map((_, i) => (
                <ProgressBar
                  key={i}
                  active={i === active}
                  dur={ADVANCE_DURATION}
                />
              ))}
            </div>

            {/* Animated counter */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.25rem', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ y: 16, opacity: 0, filter: 'blur(4px)' }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                  exit={{ y: -16, opacity: 0, filter: 'blur(4px)' }}
                  transition={{ duration: 0.35, ease: easing.luxury }}
                  style={{
                    fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                    fontSize: '1.5rem', fontWeight: 300, color: '#C9A84C',
                    display: 'inline-block',
                  }}
                >
                  0{active + 1}
                </motion.span>
              </AnimatePresence>
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 400,
                color: 'rgba(201,168,76,0.3)', letterSpacing: '0.1em',
              }}>
                / 0{TESTIMONIALS.length}
              </span>
            </div>
          </div>
        </div>

        {/* Card + side panel layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) auto',
          gap: 'clamp(2rem, 4vw, 4rem)',
          alignItems: 'start',
        }}>

          {/* Main card — directional transitions */}
          <AnimatePresence mode="wait">
            <TestimonialCard
              key={active}
              testimonial={TESTIMONIALS[active]}
              direction={direction}
            />
          </AnimatePresence>

          {/* Side — other testimonials peek (desktop only) */}
          <div
            style={{
              flexDirection: 'column', gap: '1px',
              width: 'clamp(180px, 18vw, 240px)',
              alignSelf: 'stretch',
            }}
            className="hidden md:flex"
          >
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === active
              return (
                <motion.button
                  key={t.id}
                  onClick={() => goTo(i)}
                  whileHover={{
                    x: isActive ? 0 : 3,
                    transition: { type: 'spring', stiffness: 380, damping: 26 },
                  }}
                  aria-label={`View testimonial by ${t.author}`}
                  style={{
                    flex: isActive ? 2 : 1,
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(201,168,76,0.07) 0%, rgba(201,168,76,0.03) 100%)'
                      : 'rgba(255,255,255,0.015)',
                    border: `1px solid ${isActive ? 'rgba(201,168,76,0.22)' : 'rgba(201,168,76,0.06)'}`,
                    padding: '1.25rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: `all 550ms ${easing.luxury}`,
                    overflow: 'hidden',
                    minHeight: '60px',
                  }}
                >
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: isActive ? 'rgba(201,168,76,0.8)' : 'rgba(201,168,76,0.3)',
                    marginBottom: '0.4rem',
                    transition: `color 400ms ${easing.gentle}`,
                  }}>
                    {t.author}
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, height: 'auto', filter: 'blur(0px)' }}
                        exit={{ opacity: 0, height: 0, filter: 'blur(4px)' }}
                        transition={{ duration: 0.45, ease: easing.luxury }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                          fontSize: '0.8rem', fontWeight: 300, fontStyle: 'italic',
                          color: 'rgba(196,190,184,0.4)', lineHeight: 1.5,
                          marginTop: '0.35rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}>
                          &ldquo;{t.quote}&rdquo;
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Mobile dot navigation */}
        <div
          style={{ justifyContent: 'center', gap: '0.5rem', marginTop: '2.5rem' }}
          className="flex md:hidden"
        >
          {TESTIMONIALS.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => goTo(i)}
              whileHover={{ scale: 1.2, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              whileTap={{ scale: 0.85 }}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? '24px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i === active ? '#C9A84C' : 'rgba(201,168,76,0.2)',
                border: 'none', cursor: 'pointer', padding: 0,
                transition: `all 450ms ${easing.silk}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
