'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from 'framer-motion'
import { easing, duration } from '@/lib/tokens'
import { PerfumeBottle } from '@/src/components/ui/PerfumeBottle'
import { assetPath } from '@/lib/utils'

// ─── Brand Colors ─────────────────────────────────────────────────────────────
const BG = '#07100A'

// ─── Floating Particles (reduced to 6 for performance) ────────────────────────
const PARTICLES = [
  { id: 1, x: '6%', y: '18%', size: 1.5, delay: 0.0, dur: 5.2, opacity: 0.38 },
  { id: 2, x: '15%', y: '72%', size: 2.0, delay: 1.3, dur: 4.8, opacity: 0.26 },
  { id: 3, x: '86%', y: '20%', size: 1.5, delay: 0.7, dur: 6.0, opacity: 0.32 },
  { id: 4, x: '80%', y: '68%', size: 2.5, delay: 2.1, dur: 4.5, opacity: 0.30 },
  { id: 5, x: '52%', y: '90%', size: 1.0, delay: 0.4, dur: 5.5, opacity: 0.20 },
  { id: 6, x: '93%', y: '50%', size: 1.5, delay: 1.6, dur: 5.8, opacity: 0.28 },
] as const

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null)
  const vid1Ref = useRef<HTMLVideoElement>(null)
  const vid2Ref = useRef<HTMLVideoElement>(null)
  const [active, setActive] = useState<1 | 2>(1)
  const [mobileBottle, setMobileBottle] = useState(0)
  const BOTTLES = ['white', 'green', 'tan'] as const
  // white → from top, green → from left, tan → from right
  const BOTTLE_ENTRY = [
    { x: 0, y: -80 },
    { x: -80, y: 0 },
    { x: 80, y: 0 },
  ] as const

  useEffect(() => {
    const t = setInterval(() => setMobileBottle(p => (p + 1) % 3), 5500)
    return () => clearInterval(t)
  }, [])

  // Switch to mirrored video 2 when video 1 ends, and back when video 2 ends
  useEffect(() => {
    const v1 = vid1Ref.current
    const v2 = vid2Ref.current
    if (!v1 || !v2) return

    const onV1End = () => {
      v2.currentTime = 0
      v2.play().catch(() => {})
      setActive(2)
    }
    const onV2End = () => {
      v1.currentTime = 0
      v1.play().catch(() => {})
      setActive(1)
    }

    v1.addEventListener('ended', onV1End)
    v2.addEventListener('ended', onV2End)
    return () => {
      v1.removeEventListener('ended', onV1End)
      v2.removeEventListener('ended', onV2End)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const contentOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  return (
    <motion.section
      ref={containerRef}
      className="relative flex min-h-svh w-full flex-col items-center justify-center overflow-hidden"
      style={{ background: BG }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >

      {/* ── BACKGROUND ─────────────────────────────────────────────── */}

      {/* Video 1 — normal, plays first */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: active === 1 ? 0.55 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <video
          ref={vid1Ref}
          autoPlay muted playsInline aria-hidden
          className="h-full w-full object-cover"
          style={{ mixBlendMode: 'screen' }}
        >
          <source src={assetPath('/videos/Hero%20Section.mp4')} type="video/mp4" />
        </video>
      </motion.div>

      {/* Video 2 — horizontally mirrored, plays after video 1 ends */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: active === 2 ? 0.55 : 0 }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
      >
        <video
          ref={vid2Ref}
          muted playsInline aria-hidden
          className="h-full w-full object-cover"
          style={{ mixBlendMode: 'screen', transform: 'scaleX(-1)' }}
        >
          <source src={assetPath('/videos/Hero%20Section.mp4')} type="video/mp4" />
        </video>
      </motion.div>

      {/* Forest green tint overlay — unifies video with brand color */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, rgba(7,16,10,0.55) 0%, rgba(7,16,10,0.35) 40%, rgba(7,16,10,0.6) 100%),
            radial-gradient(ellipse 70% 55% at 50% 30%, rgba(42,96,64,0.25) 0%, transparent 60%)
          `,
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.028,
        }}
      />

      {/* Center vignette — focuses attention on the bottle */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse 75% 75% at 50% 50%, transparent 20%, rgba(3,7,4,0.72) 100%)' }}
      />

      {/* ── PARTICLES ──────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {PARTICLES.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.x, top: p.y,
              width: p.size, height: p.size,
              background: `rgba(201,168,76,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 3}px rgba(201,168,76,${p.opacity * 0.6})`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, p.opacity, p.opacity * 0.4, p.opacity],
              scale: [0, 1, 0.6, 1],
              y: [0, -10, 2, 0],
            }}
            transition={{ delay: p.delay + 1.5, duration: p.dur, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Left accent line */}
      <motion.div
        className="absolute left-6 top-0 hidden lg:block"
        style={{ width: '1px', height: '100%', background: 'linear-gradient(180deg, transparent 0%, rgba(201,168,76,0.18) 20%, rgba(42,96,64,0.15) 60%, transparent 100%)' }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: easing.silk, delay: 0.3 }}
      />

      {/* ── LAYER 2: BOTTLES ────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 10, marginTop: '8vh', opacity: contentOpacity }}
        initial={{ opacity: 0, scale: 0.9, filter: 'blur(24px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.2, ease: easing.silk, delay: 0.2 }}
      >
        {/* ── Mobile: single bottle, auto-cycles with slide transition ── */}
        <div className="flex lg:hidden flex-col items-center" style={{ position: 'relative' }}>
          <div style={{ transform: 'scale(1.10)', transformOrigin: 'center bottom' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileBottle}
                initial={{ opacity: 0, ...BOTTLE_ENTRY[mobileBottle] }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.88 }}
                transition={{ duration: 1.1, ease: easing.silk }}
              >
                <motion.div
                  animate={{ y: [0, -12, 2, -8, 0] }}
                  transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
                >
                  <PerfumeBottle variant={BOTTLES[mobileBottle]} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div style={{ display: 'flex', gap: '8px', marginTop: '220px', position: 'absolute', bottom: '-60px' }}>
            {BOTTLES.map((_, i) => (
              <motion.div
                key={i}
                animate={{ width: i === mobileBottle ? 20 : 6, opacity: i === mobileBottle ? 1 : 0.3 }}
                transition={{ duration: 0.3 }}
                style={{ height: '4px', borderRadius: '2px', background: 'rgba(201,168,76,0.8)' }}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: three bottles side by side ─────────────────────── */}
        <div
          className="hidden lg:flex md:flex md:scale-[0.85] lg:scale-100"
          style={{ alignItems: 'flex-end', gap: 'clamp(0.75rem, 2.5vw, 2.5rem)', transformOrigin: 'center bottom' }}
        >
          <motion.div
            style={{ transform: 'scale(1.06)', transformOrigin: 'bottom center', opacity: 0.90 }}
            animate={{ y: [0, -10, 3, -8, 0] }}
            transition={{ duration: 7.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 0.8 }}
          >
            <PerfumeBottle variant="white" />
          </motion.div>
          <motion.div
            style={{ transform: 'scale(1.48)', transformOrigin: 'bottom center' }}
            animate={{ y: [0, -14, 2, -10, 0] }}
            transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop' }}
          >
            <PerfumeBottle variant="green" />
          </motion.div>
          <motion.div
            style={{ transform: 'scale(1.06)', transformOrigin: 'bottom center', opacity: 0.90 }}
            animate={{ y: [0, -12, 3, -9, 0] }}
            transition={{ duration: 6.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'loop', delay: 1.4 }}
          >
            <PerfumeBottle variant="tan" />
          </motion.div>
        </div>
      </motion.div>

      {/* ── LAYER 3: PRODUCT INFO — bottom center (z-index 10) ──────── */}
      <motion.div
        className="absolute bottom-14 left-0 right-0 flex justify-center"
        style={{ zIndex: 10 }}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.slow, ease: easing.luxury, delay: 1.5 }}
      >
        <div className="flex items-center gap-3">
          <span style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            fontSize: 'clamp(1rem, 1.6vw, 1.35rem)', fontWeight: 300, fontStyle: 'italic',
            letterSpacing: '0.08em', color: 'rgba(201,168,76,0.72)',
          }}>Oud Form</span>
          <span style={{ width: '1px', height: '13px', background: 'rgba(201,168,76,0.22)' }} />
          <span style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', fontWeight: 300,
            letterSpacing: '0.04em', color: 'rgba(201,168,76,0.48)',
          }}>$285</span>
          <span style={{ width: '1px', height: '13px', background: 'rgba(201,168,76,0.22)' }} />
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.56rem', fontWeight: 400,
            letterSpacing: '0.18em', textTransform: 'uppercase',
            color: 'rgba(196,190,184,0.28)',
          }}>60ml EDP</span>
        </div>
      </motion.div>

      {/* Estate mark — bottom right */}
      <motion.div
        className="absolute bottom-8 right-8 z-20 hidden flex-col items-end gap-1 md:flex"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: duration.base, ease: easing.gentle, delay: 2.7 }}
      >
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,190,184,0.16)' }}>
          3GEN Parfumerie — Est. MMXXIV
        </span>
        <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.16)', alignSelf: 'flex-end' }} />
      </motion.div>

      {/* Large watermark numeral */}
      <motion.div
        className="pointer-events-none absolute bottom-0 right-4 select-none overflow-hidden lg:right-12"
        style={{
          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
          fontSize: 'clamp(10rem, 22vw, 28rem)',
          fontWeight: 200, lineHeight: 0.8,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(42,96,64,0.1)',
          letterSpacing: '-0.06em',
          userSelect: 'none',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: easing.silk, delay: 0.8 }}
      >
        01
      </motion.div>
    </motion.section>
  )
}
