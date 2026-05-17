'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { easing, duration } from '@/lib/tokens'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_COLUMNS = [
  {
    heading: 'Shop',
    links: [
      { label: 'All Fragrances', href: '/collections' },
      { label: 'Obsidian',      href: '/products/obsidian' },
      { label: 'Volta',         href: '/products/volta' },
      { label: 'Éther',         href: '/products/ether' },
      { label: 'Nox',           href: '/products/nox' },
      { label: 'Gift Sets',     href: '/gifts' },
    ],
  },
  {
    heading: 'Explore',
    links: [
      { label: 'Our Story',       href: '/about' },
      { label: 'The Craft',       href: '/craft' },
      { label: 'Ingredients',     href: '/ingredients' },
      { label: 'Journal',         href: '/journal' },
      { label: 'Bespoke Service', href: '/bespoke' },
    ],
  },
  {
    heading: 'Support',
    links: [
      { label: 'Contact',         href: '/contact' },
      { label: 'Shipping',        href: '/shipping' },
      { label: 'Returns',         href: '/returns' },
      { label: 'FAQ',             href: '/faq' },
      { label: 'Stockists',       href: '/stockists' },
    ],
  },
] as const

const SOCIALS = [
  { label: 'Instagram', href: '#', handle: '@3genperfumerie' },
  { label: 'Pinterest', href: '#', handle: 'pinterest.com/3gen' },
] as const

// ─── Newsletter input ─────────────────────────────────────────────────────────

function NewsletterInput() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) setSubmitted(true)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: easing.luxury }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(201,168,76,0.2)' }}
      >
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C9A84C' }} />
        <span style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.7rem', fontWeight: 300,
          letterSpacing: '0.06em', color: 'rgba(201,168,76,0.65)',
        }}>
          You are now part of the circle.
        </span>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <div style={{
        display: 'flex', alignItems: 'stretch',
        borderBottom: `1px solid ${focused ? 'rgba(201,168,76,0.45)' : 'rgba(201,168,76,0.18)'}`,
        transition: `border-color 400ms ${easing.gentle}`,
      }}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Your email address"
          required
          aria-label="Email address for newsletter"
          style={{
            flex: 1, background: 'transparent', border: 'none', outline: 'none',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', fontWeight: 300,
            letterSpacing: '0.04em', color: '#C4BEB8', paddingBottom: '0.75rem',
            '::placeholder': { color: 'rgba(196,190,184,0.25)' },
          } as React.CSSProperties}
        />
        <button
          type="submit"
          style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            paddingBottom: '0.75rem', paddingLeft: '1rem',
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: focused ? '#C9A84C' : 'rgba(201,168,76,0.45)',
            transition: `color 300ms ${easing.gentle}`,
          }}
        >
          Enter
        </button>
      </div>
    </form>
  )
}

// ─── Footer link ──────────────────────────────────────────────────────────────

function FooterLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.li
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ x: 6, transition: { type: 'spring', stiffness: 380, damping: 26 } }}
    >
      <Link
        href={href}
        style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: '0.8rem', fontWeight: 300,
          letterSpacing: '0.03em', lineHeight: 1,
          color: hovered ? 'rgba(196,190,184,0.65)' : 'rgba(196,190,184,0.28)',
          textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem',
          transition: `color 280ms cubic-bezier(0.19,1,0.22,1)`,
        }}
      >
        <AnimatePresence>
          {hovered && (
            <motion.span
              key="dot"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
              style={{ display: 'inline-block', width: '3px', height: '3px', borderRadius: '50%', background: '#C9A84C', flexShrink: 0 }}
            />
          )}
        </AnimatePresence>
        {label}
      </Link>
    </motion.li>
  )
}

// ─── Main Footer ──────────────────────────────────────────────────────────────

export function Footer() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #07100A 0%, #070707 100%)',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        overflow: 'hidden',
      }}
    >
      {/* ── Large 3GEN watermark ─────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-8%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
          fontSize: 'clamp(8rem, 24vw, 28rem)',
          fontWeight: 200,
          lineHeight: 1,
          letterSpacing: '0.1em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(201,168,76,0.04)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
        }}
      >
        3GEN
      </div>

      {/* Top gold shimmer line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 2.0, ease: easing.silk }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent 5%, rgba(201,168,76,0.5) 30%, rgba(201,168,76,0.7) 50%, rgba(201,168,76,0.5) 70%, transparent 95%)',
          transformOrigin: 'left center',
        }}
      />

      <div style={{ maxWidth: '1600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Upper section ────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: 'clamp(2.5rem, 4vw, 4rem)',
          padding: 'clamp(4rem, 7vw, 7rem) clamp(1.5rem, 7vw, 7rem) clamp(3rem, 5vw, 5rem)',
        }}>

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 36, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: duration.slow, ease: easing.silk, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            {/* Logo */}
            <div>
              <div style={{
                fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 300, letterSpacing: '0.25em',
                color: '#C4BEB8', marginBottom: '0.35rem',
              }}>
                3GEN
              </div>
              <div style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.55rem', fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(201,168,76,0.4)',
              }}>
                Parfumerie — Est. MMXXIV
              </div>
            </div>

            {/* Brand statement */}
            <p style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontSize: '1rem', fontWeight: 300, fontStyle: 'italic',
              lineHeight: 1.65, color: 'rgba(196,190,184,0.28)',
              maxWidth: '28ch',
            }}>
              &ldquo;Crafted for the few. Remembered by all.&rdquo;
            </p>

            {/* Social links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.querySelectorAll('[data-label]').forEach((n) => (n as HTMLElement).style.color = 'rgba(196,190,184,0.65)')
                    el.querySelectorAll('[data-handle]').forEach((n) => (n as HTMLElement).style.color = '#C9A84C')
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.querySelectorAll('[data-label]').forEach((n) => (n as HTMLElement).style.color = 'rgba(196,190,184,0.28)')
                    el.querySelectorAll('[data-handle]').forEach((n) => (n as HTMLElement).style.color = 'rgba(201,168,76,0.3)')
                  }}
                >
                  <span data-label style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.65rem', fontWeight: 500,
                    letterSpacing: '0.15em', textTransform: 'uppercase',
                    color: 'rgba(196,190,184,0.28)',
                    transition: `color 300ms ${easing.gentle}`,
                  }}>
                    {s.label}
                  </span>
                  <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.08)' }} />
                  <span data-handle style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 300,
                    letterSpacing: '0.06em', color: 'rgba(201,168,76,0.3)',
                    transition: `color 300ms ${easing.gentle}`,
                  }}>
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Nav columns */}
          {NAV_COLUMNS.map((col, colIndex) => (
            <motion.div
              key={col.heading}
              initial={{ opacity: 0, y: 36, filter: 'blur(5px)' }}
              animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={{ duration: duration.slow, ease: easing.silk, delay: 0.18 + colIndex * 0.11 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                  letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)',
                }}>
                  {col.heading}
                </span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
              </div>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {col.links.map((link) => (
                  <FooterLink key={link.href} href={link.href} label={link.label} />
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter column */}
          <motion.div
            initial={{ opacity: 0, y: 36, filter: 'blur(5px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: duration.slow, ease: easing.silk, delay: 0.5 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{
                fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 500,
                letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,168,76,0.45)',
              }}>
                The Circle
              </span>
              <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
            </div>

            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', fontWeight: 300,
              lineHeight: 1.75, color: 'rgba(196,190,184,0.3)', maxWidth: '28ch',
            }}>
              Private announcements. Early access to new editions. Nothing more.
            </p>

            <NewsletterInput />

            <p style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 300,
              letterSpacing: '0.04em', color: 'rgba(196,190,184,0.15)', lineHeight: 1.6,
            }}>
              By subscribing, you agree to our privacy policy. We do not share your data.
              Unsubscribe at any time.
            </p>
          </motion.div>
        </div>

        {/* ── Gold divider ─────────────────────────────────────────── */}
        <div style={{
          height: '1px', margin: '0 clamp(1.5rem, 7vw, 7rem)',
          background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.12) 20%, rgba(201,168,76,0.12) 80%, transparent)',
        }} />

        {/* ── Bottom bar ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: duration.base, ease: easing.gentle, delay: 0.6 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: '1rem',
            padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 7vw, 7rem)',
          }}
        >
          {/* Copyright */}
          <span style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 300,
            letterSpacing: '0.1em', color: 'rgba(196,190,184,0.18)',
          }}>
            © {new Date().getFullYear()} 3GEN Parfumerie. All rights reserved.
          </span>

          {/* Legal links */}
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms of Use',   href: '/terms' },
              { label: 'Cookie Policy',  href: '/cookies' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 300,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: 'rgba(196,190,184,0.18)', textDecoration: 'none',
                  transition: `color 300ms ${easing.gentle}`,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(196,190,184,0.45)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(196,190,184,0.18)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Country/currency */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif', fontSize: '0.6rem', fontWeight: 400,
              letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(196,190,184,0.18)',
            }}>
              United States — USD
            </span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
