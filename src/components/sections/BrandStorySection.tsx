'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
} from 'framer-motion'
import { easing, duration } from '@/lib/tokens'
import { assetPath } from '@/lib/utils'

// ─── Shared animation config ─────────────────────────────────────────────────

const LUXURY = { ease: easing.luxury, duration: duration.cinematic }
const GENTLE = { ease: easing.gentle, duration: duration.slow }

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  return { ref, inView }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Thin full-width gold rule with fade-in animation */
function GoldRule({ delay = 0, width = '100%' }: { delay?: number; width?: string }) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0, opacity: 0 }}
      animate={inView ? { scaleX: 1, opacity: 1 } : {}}
      transition={{ duration: 1.4, ease: easing.silk, delay }}
      style={{
        height: '1px',
        width,
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.7) 50%, rgba(201,168,76,0.5) 70%, transparent)',
        transformOrigin: 'center',
      }}
    />
  )
}

/** Animated section index label e.g. "02" */
function SectionIndex({ number }: { number: string }) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ ...GENTLE, delay: 0.1 }}
      style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.6rem',
        fontWeight: 500,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.55)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <span>{number}</span>
      <span style={{ display: 'block', width: '28px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
      <span>Our Story</span>
    </motion.div>
  )
}

/** Clipped reveal for large headline words */
function RevealLine({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const { ref, inView } = useReveal(0.1)
  return (
    <div ref={ref} style={{ overflow: 'hidden', ...style }}>
      <motion.div
        initial={{ y: '110%', filter: 'blur(10px)' }}
        animate={inView ? { y: '0%', filter: 'blur(0px)' } : {}}
        transition={{ duration: duration.cinematic, ease: easing.silk, delay }}
      >
        {children}
      </motion.div>
    </div>
  )
}

/** Body paragraph fade-up */
function BodyReveal({
  children,
  delay = 0,
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  style?: React.CSSProperties
}) {
  const { ref, inView } = useReveal()
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 38, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ ...GENTLE, delay }}
      style={style}
    >
      {children}
    </motion.div>
  )
}

// ─── Smoke / incense video panel — right of OpeningStatement ─────────────────

// ─── Section A — Opening statement (full-width smoke video background) ───────

function OpeningStatement() {
  return (
    <div
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(600px, 90vh, 1000px)',
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      {/* ── Full-width background video ─────────────────────────── */}
      <video
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.65,
          mixBlendMode: 'screen',
        }}
      >
        <source src={assetPath('/videos/Spray.mp4')} type="video/mp4" />
      </video>

      {/* Dark gradient — top + bottom fade for readability */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(180deg,
              rgba(7,16,10,0.72) 0%,
              rgba(7,16,10,0.28) 30%,
              rgba(7,16,10,0.28) 70%,
              rgba(7,16,10,0.78) 100%
            )
          `,
          pointerEvents: 'none',
        }}
      />

      {/* Side vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(7,16,10,0.55) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content overlaid on video ───────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          padding: 'clamp(5rem, 10vw, 12rem) clamp(1.5rem, 7vw, 7rem)',
        }}
      >
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>

          {/* Section index */}
          <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 5rem)' }}>
            <SectionIndex number="02" />
          </div>

          {/* Headline */}
          <div
            style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              fontSize: 'clamp(2.4rem, 9vw, 13rem)',
              marginBottom: 'clamp(3rem, 6vw, 6rem)',
            }}
          >
            <RevealLine delay={0.15}>
              <span style={{ color: '#C4BEB8' }}>Wear</span>
            </RevealLine>

            <RevealLine delay={0.28} style={{ paddingLeft: 'clamp(0.5rem, 4vw, 4rem)', marginTop: 'clamp(-0.2rem, -0.5vw, -0.5rem)' }}>
              <span
                style={{
                  color: 'transparent',
                  WebkitTextStroke: '1px rgba(201,168,76,0.65)',
                  fontStyle: 'italic',
                }}
              >
                The Crown
              </span>
            </RevealLine>

            <RevealLine delay={0.56} style={{ paddingLeft: 'clamp(1rem, 8vw, 11rem)', marginTop: 'clamp(-0.2rem, -0.5vw, -0.5rem)' }}>
              <span style={{ color: 'rgba(196,190,184,0.45)', fontStyle: 'italic' }}>
                And Feel.
              </span>
            </RevealLine>
          </div>

          {/* Descriptor — bottom left */}
          <BodyReveal delay={0.6}>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
                fontWeight: 300,
                lineHeight: 1.85,
                color: 'rgba(196,190,184,0.52)',
                letterSpacing: '0.01em',
                maxWidth: '42ch',
              }}
            >
              3GEN was not created to compete. It was created to exist apart —
              as a private language between a fragrance and the person who wears it.
            </p>
          </BodyReveal>
        </div>
      </div>
    </div>
  )
}

// ─── Section B — The founding / split editorial ───────────────────────────────

function FoundingStory() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Parallax for the decorative large number
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  return (
    <div
      ref={sectionRef}
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vw, 12rem) clamp(1.5rem, 7vw, 7rem)',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #07100A 0%, #0B1710 50%, #07100A 100%)',
      }}
    >
      {/* Large watermark numeral */}
      <motion.div
        style={{
          position: 'absolute',
          right: '-2%',
          top: '50%',
          transform: 'translateY(-50%)',
          y: watermarkY,
          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
          fontSize: 'clamp(14rem, 30vw, 38rem)',
          fontWeight: 200,
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.045)',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        III
      </motion.div>

      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Two-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
            gap: 'clamp(3rem, 6vw, 8rem)',
            alignItems: 'start',
          }}
        >
          {/* Left column */}
          <div style={{ position: 'relative' }}>
            {/* Overline */}
            <BodyReveal delay={0.05}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2.5rem',
                }}
              >
                <div style={{ width: '20px', height: '1px', background: '#C9A84C' }} />
                <span
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.6rem',
                    fontWeight: 500,
                    letterSpacing: '0.28em',
                    textTransform: 'uppercase',
                    color: '#C9A84C',
                  }}
                >
                  The Beginning
                </span>
              </div>
            </BodyReveal>

            {/* Chapter headline */}
            <div
              style={{
                fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                marginBottom: '2.5rem',
              }}
            >
              <RevealLine delay={0.1}>
                <span style={{ color: '#C4BEB8' }}>Three generations</span>
              </RevealLine>
              <RevealLine delay={0.22}>
                <span style={{ color: 'rgba(196,190,184,0.5)', fontStyle: 'italic' }}>
                  of craft.
                </span>
              </RevealLine>
              <RevealLine delay={0.34}>
                <span style={{ color: '#C4BEB8' }}>One singular</span>
              </RevealLine>
              <RevealLine delay={0.46}>
                <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>vision.</span>
              </RevealLine>
            </div>

            {/* Body copy — first paragraph */}
            <BodyReveal delay={0.3}>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.0625rem)',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: 'rgba(196,190,184,0.45)',
                  marginBottom: '1.75rem',
                  maxWidth: '52ch',
                }}
              >
                3GEN began not in a laboratory, but in a memory — the specific weight
                of incense in cold stone corridors. The founder&apos;s grandmother
                wore a single fragrance her entire life. It had no name. It was simply
                the smell of her presence.
              </p>
            </BodyReveal>

            <BodyReveal delay={0.42}>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.0625rem)',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: 'rgba(196,190,184,0.35)',
                  maxWidth: '52ch',
                }}
              >
                Three decades later, that memory became a question: what if a fragrance
                could carry the full weight of a person&apos;s identity? Not their mood,
                not their occasion — their essence.
              </p>
            </BodyReveal>
          </div>

          {/* Right column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3.5rem',
              paddingTop: 'clamp(0rem, 4vw, 5rem)',
            }}
          >
            {/* Stats row */}
            <BodyReveal delay={0.2}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0',
                  borderTop: '1px solid rgba(201,168,76,0.12)',
                  borderBottom: '1px solid rgba(201,168,76,0.12)',
                  padding: '2rem 0',
                }}
              >
                {[
                  { value: '3', label: 'Generations\nof craft' },
                  { value: '14', label: 'Rare\ningredients' },
                  { value: '∞', label: 'Years in the\nmaking' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.5rem',
                      borderRight: i < 2 ? '1px solid rgba(201,168,76,0.1)' : 'none',
                      padding: '0 1rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        fontWeight: 300,
                        lineHeight: 1,
                        color: '#C9A84C',
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {stat.value}
                    </span>
                    <span
                      style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.6rem',
                        fontWeight: 400,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'rgba(196,190,184,0.3)',
                        textAlign: 'center',
                        whiteSpace: 'pre-line',
                        lineHeight: 1.6,
                      }}
                    >
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </BodyReveal>

            {/* Pull quote */}
            <BodyReveal delay={0.35}>
              <blockquote style={{ margin: 0, padding: '0 0 0 1.5rem', borderLeft: '1px solid rgba(201,168,76,0.35)' }}>
                <p
                  style={{
                    fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                    fontSize: 'clamp(1.25rem, 2.5vw, 2rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    lineHeight: 1.45,
                    color: 'rgba(196,190,184,0.65)',
                    letterSpacing: '-0.01em',
                    marginBottom: '1rem',
                  }}
                >
                  &ldquo;We do not make perfumes for occasions.
                  We make them for identities.&rdquo;
                </p>
                <cite
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,168,76,0.5)',
                    fontStyle: 'normal',
                  }}
                >
                  — The Founder, 3GEN
                </cite>
              </blockquote>
            </BodyReveal>

            {/* Continuation body */}
            <BodyReveal delay={0.5}>
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.0625rem)',
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: 'rgba(196,190,184,0.35)',
                  maxWidth: '48ch',
                }}
              >
                Every 3GEN fragrance begins not with a brief, but with a question.
                The answer is found slowly — sometimes over months — in quiet rooms,
                in the space between one note and the next.
              </p>
            </BodyReveal>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section C — Manifesto / Full-bleed statement ────────────────────────────

function ManifestoStatement() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.06, 0.98])
  const textY = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const goldLineW = useTransform(scrollYProgress, [0.2, 0.8], ['0%', '60%'])

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(400px, 65vh, 800px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Parallax background texture */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          scale: bgScale,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(201,168,76,0.06) 0%, transparent 55%),
            radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 55%),
            linear-gradient(180deg, #0B1710 0%, #0F1A12 50%, #0B1710 100%)
          `,
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          opacity: 0.025,
          pointerEvents: 'none',
        }}
      />

      {/* Center content */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 7vw, 7rem)',
          y: textY,
        }}
      >
        {/* Pre-label */}
        <BodyReveal delay={0.05}>
          <p
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.45)',
              marginBottom: '2.5rem',
            }}
          >
            The 3GEN Manifesto
          </p>
        </BodyReveal>

        {/* Main statement */}
        <div
          style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            fontWeight: 300,
            fontSize: 'clamp(2.25rem, 6vw, 8rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            maxWidth: '14em',
            margin: '0 auto',
          }}
        >
          <RevealLine delay={0.1}>
            <span style={{ color: 'rgba(196,190,184,0.9)' }}>Scent is the only sense</span>
          </RevealLine>
          <RevealLine delay={0.24}>
            <span style={{ color: 'rgba(196,190,184,0.9)' }}>that cannot be unseen.</span>
          </RevealLine>
          <RevealLine delay={0.38} style={{ marginTop: '0.1em' }}>
            <span
              style={{
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201,168,76,0.5)',
                fontStyle: 'italic',
              }}
            >
              It only disappears
            </span>
          </RevealLine>
          <RevealLine delay={0.52}>
            <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>after you do.</span>
          </RevealLine>
        </div>

        {/* Animated gold rule beneath quote */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3.5rem' }}>
          <div style={{ position: 'relative', width: '60%', maxWidth: '480px', height: '1px' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(201,168,76,0.1)',
              }}
            />
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                height: '100%',
                width: goldLineW,
                transform: 'translateX(-50%)',
                background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)',
              }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ─── Section D — The Philosophy pillars ──────────────────────────────────────

const PILLARS = [
  {
    index: '01',
    title: 'Restraint',
    body: 'We do not add. We subtract until only the essential remains. A 3GEN fragrance contains nothing that should not be there, and everything that must.',
  },
  {
    index: '02',
    title: 'Provenance',
    body: 'Every ingredient is traceable to its origin. Agarwood from Laos. Rose de Mai from Grasse. Vetiver from Haiti. The geography of rarity is the foundation of authenticity.',
  },
  {
    index: '03',
    title: 'Longevity',
    body: 'We do not design for the first impression. We design for the memory — the trace you leave in a room you have already left. What remains is what matters.',
  },
] as const

function PhilosophyPillars() {
  return (
    <div
      style={{
        padding: 'clamp(5rem, 10vw, 12rem) clamp(1.5rem, 7vw, 7rem)',
        background: '#07100A',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        {/* Section header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: 'clamp(3rem, 6vw, 6rem)',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <BodyReveal>
            <div
              style={{
                fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                fontWeight: 300,
                fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: '#C4BEB8',
              }}
            >
              The principles<br />
              <span style={{ color: 'rgba(196,190,184,0.35)', fontStyle: 'italic' }}>
                that define us.
              </span>
            </div>
          </BodyReveal>

          <BodyReveal delay={0.2}>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.8rem, 1vw, 0.9375rem)',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'rgba(196,190,184,0.32)',
                maxWidth: '38ch',
                textAlign: 'right',
              }}
            >
              Three commitments that govern every decision — from sourcing to the
              final accord. Non-negotiable. Permanent.
            </p>
          </BodyReveal>
        </div>

        {/* Pillar cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '0',
          }}
        >
          {PILLARS.map((pillar, i) => (
            <PillarCard key={pillar.index} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof PILLARS)[number]
  index: number
}) {
  const { ref, inView } = useReveal(0.2)

  return (
    <motion.div
      ref={ref}
      className={index < 2 ? 'border-b md:border-b-0 md:border-r' : ''}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ ...LUXURY, delay: index * 0.14 }}
      whileHover={{
        backgroundColor: 'rgba(201,168,76,0.025)',
        y: -5,
        transition: { type: 'spring', stiffness: 240, damping: 22, mass: 1.0 },
      }}
      style={{
        padding: 'clamp(2rem, 4vw, 3.5rem)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
        borderColor: 'rgba(201,168,76,0.08)',
        cursor: 'default',
        transition: `background-color 600ms ${easing.gentle}`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hover gold top-border reveal — grows from center */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileHover={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: easing.silk }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)',
          transformOrigin: 'center',
        }}
      />

      {/* Index */}
      <div
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 500,
          letterSpacing: '0.28em',
          color: 'rgba(201,168,76,0.4)',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
        }}
      >
        <span>{pillar.index}</span>
        <span style={{ display: 'block', width: '18px', height: '1px', background: 'rgba(201,168,76,0.3)' }} />
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
          fontWeight: 300,
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: '#C4BEB8',
          marginBottom: '1.5rem',
        }}
      >
        {pillar.title}
      </h3>

      {/* Gold divider — short */}
      <div
        style={{
          height: '1px',
          width: '32px',
          background: 'rgba(201,168,76,0.35)',
          marginBottom: '1.5rem',
        }}
      />

      {/* Body */}
      <p
        style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.875rem, 1.05vw, 0.9375rem)',
          fontWeight: 300,
          lineHeight: 1.85,
          color: 'rgba(196,190,184,0.38)',
        }}
      >
        {pillar.body}
      </p>
    </motion.div>
  )
}

// ─── Section E — Closing editorial strip ─────────────────────────────────────

function ClosingStrip() {
  const { ref, inView } = useReveal(0.2)

  return (
    <div
      ref={ref}
      style={{
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1.5rem, 7vw, 7rem)',
        background: 'linear-gradient(180deg, #07100A, #0B1710)',
        borderTop: '1px solid rgba(201,168,76,0.08)',
      }}
    >
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '2.5rem',
          }}
        >
          {/* Top rule */}
          <GoldRule width="180px" />

          {/* Closing line */}
          <div
            style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontWeight: 300,
              fontSize: 'clamp(1.5rem, 3.5vw, 3.25rem)',
              lineHeight: 1.25,
              letterSpacing: '-0.01em',
              maxWidth: '20em',
            }}
          >
            <RevealLine delay={0.1}>
              <span style={{ color: 'rgba(196,190,184,0.8)' }}>
                This is not a luxury brand.
              </span>
            </RevealLine>
            <RevealLine delay={0.25}>
              <span style={{ color: 'rgba(196,190,184,0.8)' }}>
                This is the last fragrance
              </span>
            </RevealLine>
            <RevealLine delay={0.4}>
              <span style={{ color: '#C9A84C', fontStyle: 'italic' }}>
                you will ever need to find.
              </span>
            </RevealLine>
          </div>

          {/* Bottom rule */}
          <GoldRule width="180px" delay={0.4} />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ ...GENTLE, delay: 0.6 }}
          >
            <a
              href="/collections"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.875rem',
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.65)',
                transition: `color 400ms ${easing.gentle}`,
                cursor: 'pointer',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = '#C9A84C' }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(201,168,76,0.65)' }}
            >
              <span>Explore the Collection</span>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                <path d="M0 4H14M11 1L14 4L11 7" stroke="currentColor" strokeWidth="0.75" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ─── Root export ──────────────────────────────────────────────────────────────

export function BrandStorySection() {
  return (
    <section
      aria-label="Brand story"
      style={{ background: '#07100A', position: 'relative' }}
    >
      <OpeningStatement />
      <FoundingStory />
      <PhilosophyPillars />
    </section>
  )
}
