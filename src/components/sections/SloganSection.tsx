'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { easing, duration } from '@/lib/tokens'

const NOTES = [
  { label: 'Top Note',   value: 'Oud & Saffron',       delay: 0.1 },
  { label: 'Heart Note', value: 'Rose & Amber',          delay: 0.22 },
  { label: 'Base Note',  value: 'Sandalwood & Musk',     delay: 0.34 },
] as const

function FadeUp({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: duration.cinematic, ease: easing.luxury, delay }}
    >
      {children}
    </motion.div>
  )
}

export function SloganSection() {
  const ruleRef = useRef<HTMLDivElement>(null)
  const ruleInView = useInView(ruleRef, { once: true, amount: 0.8 })

  return (
    <section
      style={{
        position: 'relative',
        background: '#07100A',
        overflow: 'hidden',
        padding: 'clamp(5rem, 12vh, 9rem) clamp(1.5rem, 8vw, 8rem)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0',
      }}
    >
      {/* Radial ambient glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Top rule ──────────────────────────────────────────────────── */}
      <motion.div
        ref={ruleRef}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={ruleInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: easing.luxury }}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.45) 30%, rgba(201,168,76,0.65) 50%, rgba(201,168,76,0.45) 70%, transparent)',
          transformOrigin: 'center',
          marginBottom: 'clamp(2.5rem, 5vh, 4rem)',
        }}
      />

      {/* ── Label ─────────────────────────────────────────────────────── */}
      <FadeUp delay={0.05}>
        <p
          style={{
            fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
            fontSize: '0.6rem',
            fontWeight: 400,
            letterSpacing: '0.36em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.5)',
            textAlign: 'center',
            marginBottom: 'clamp(1.2rem, 3vh, 2rem)',
          }}
        >
          Oud Form · 60ml Eau de Parfum
        </p>
      </FadeUp>

      {/* ── Main slogan ───────────────────────────────────────────────── */}
      <FadeUp delay={0.14}>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
            fontWeight: 200,
            lineHeight: 1.08,
            letterSpacing: '-0.01em',
            color: '#F0EAE0',
            textAlign: 'center',
            margin: 0,
          }}
        >
          Wear The Crown
        </h2>
      </FadeUp>

      <FadeUp delay={0.24}>
        <h2
          style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            fontSize: 'clamp(2.8rem, 7.5vw, 7rem)',
            fontWeight: 200,
            fontStyle: 'italic',
            lineHeight: 1.08,
            letterSpacing: '0.01em',
            color: 'rgba(201,168,76,0.82)',
            textAlign: 'center',
            margin: '0 0 clamp(2rem, 4vh, 3.5rem)',
          }}
        >
          And Feel.
        </h2>
      </FadeUp>

      {/* ── Centre diamond ────────────────────────────────────────────── */}
      <FadeUp delay={0.32}>
        <div
          style={{
            width: '5px', height: '5px',
            background: 'rgba(201,168,76,0.55)',
            transform: 'rotate(45deg)',
            margin: '0 auto clamp(2rem, 4vh, 3.5rem)',
          }}
        />
      </FadeUp>

      {/* ── Fragrance notes ───────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(2rem, 5vw, 5rem)',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {NOTES.map((note, i) => (
          <FadeUp key={note.label} delay={note.delay}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                minWidth: '120px',
              }}
            >
              <span
                style={{
                  fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
                  fontSize: '0.52rem',
                  fontWeight: 400,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.42)',
                }}
              >
                {note.label}
              </span>
              <div
                style={{
                  width: '20px', height: '1px',
                  background: 'rgba(201,168,76,0.25)',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                  fontSize: 'clamp(0.85rem, 1.3vw, 1.05rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  letterSpacing: '0.04em',
                  color: 'rgba(240,234,224,0.72)',
                  textAlign: 'center',
                }}
              >
                {note.value}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* ── Bottom rule ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={ruleInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: easing.luxury, delay: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '560px',
          height: '1px',
          background:
            'linear-gradient(90deg, transparent, rgba(201,168,76,0.35) 30%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.35) 70%, transparent)',
          transformOrigin: 'center',
          marginTop: 'clamp(2.5rem, 5vh, 4rem)',
        }}
      />

      {/* ── Estate mark ───────────────────────────────────────────────── */}
      <FadeUp delay={0.55}>
        <p
          style={{
            fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
            fontSize: '0.48rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(196,190,184,0.18)',
            textAlign: 'center',
            marginTop: 'clamp(1rem, 2vh, 1.5rem)',
          }}
        >
          3GEN Parfumerie — Est. MMXXIV
        </p>
      </FadeUp>
    </section>
  )
}
