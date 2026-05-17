'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { easing, duration } from '@/lib/tokens'

interface NavLink {
  label: string
  href: string
  sub?: string
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  links: NavLink[]
}

// ─── Variants ────────────────────────────────────────────────────────────────

const overlayVariants = {
  closed: {
    clipPath: 'circle(0% at calc(100% - 1.75rem) 1.75rem)',
    transition: { duration: 0.6, ease: easing.cinematic },
  },
  open: {
    clipPath: 'circle(170% at calc(100% - 1.75rem) 1.75rem)',
    transition: { duration: 0.9, ease: easing.luxury },
  },
}

const linkVariants = {
  closed: { opacity: 0, y: 36, filter: 'blur(8px)' },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: duration.slow,
      ease: easing.silk,
      delay: 0.26 + i * 0.08,
    },
  }),
}

const footerVariants = {
  closed: { opacity: 0, y: 20, filter: 'blur(6px)' },
  open: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.base, ease: easing.luxury, delay: 0.62 },
  },
}

const goldLineVariants = {
  closed: { scaleX: 0, opacity: 0 },
  open: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: easing.silk, delay: 0.2 },
  },
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MobileMenu({ isOpen, onClose, links }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="mobile-menu"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-[45] flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #07100A 0%, #0D1C10 50%, #0B1710 100%)',
          }}
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Grain overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              opacity: 0.03,
            }}
          />

          {/* Atmospheric glow */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)',
            }}
          />

          {/* Content */}
          <div className="relative flex h-full flex-col px-8 pb-12 pt-28">

            {/* Gold divider line */}
            <motion.div
              variants={goldLineVariants}
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              className="mb-12 h-px origin-left"
              style={{
                background: 'linear-gradient(90deg, rgba(201,168,76,0.65), rgba(201,168,76,0.1), transparent)',
              }}
            />

            {/* Navigation links */}
            <nav className="flex flex-col gap-1">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate={isOpen ? 'open' : 'closed'}
                  whileHover={{
                    x: 10,
                    transition: { type: 'spring', stiffness: 350, damping: 26 },
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-end gap-5 py-3"
                  >
                    {/* Index number */}
                    <span
                      className="mb-1 font-mono text-xs tabular-nums"
                      style={{ color: 'rgba(201,168,76,0.4)', letterSpacing: '0.1em' }}
                    >
                      0{i + 1}
                    </span>

                    {/* Link text */}
                    <span
                      className="relative font-cormorant text-[3rem] font-light leading-none tracking-tight"
                      style={{
                        color: '#C4BEB8',
                        transition: `color 300ms cubic-bezier(0.19,1,0.22,1)`,
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(201,168,76,0.85)' }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#C4BEB8' }}
                    >
                      {link.label}
                      {/* Gold underline reveal */}
                      <motion.span
                        className="absolute bottom-0 left-0 h-px origin-left"
                        style={{ background: 'rgba(201,168,76,0.55)', right: 0 }}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.6, ease: easing.silk }}
                      />
                    </span>

                    {/* Sub label */}
                    {link.sub && (
                      <motion.span
                        className="mb-1.5 font-sans text-[0.6rem] font-medium uppercase tracking-[0.25em]"
                        style={{ color: '#C9A84C' }}
                        initial={{ opacity: 0, x: -6 }}
                        whileHover={{ opacity: 1, x: 0 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                      >
                        {link.sub}
                      </motion.span>
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex-1" />

            {/* Footer row */}
            <motion.div
              variants={footerVariants}
              initial="closed"
              animate={isOpen ? 'open' : 'closed'}
              className="flex items-end justify-between"
            >
              <div className="flex flex-col gap-1">
                <p
                  className="font-sans text-xs font-medium uppercase tracking-[0.2em]"
                  style={{ color: 'rgba(196,190,184,0.28)' }}
                >
                  3GEN Perfumery
                </p>
                <p
                  className="font-sans text-[0.65rem] uppercase tracking-widest"
                  style={{ color: 'rgba(196,190,184,0.15)' }}
                >
                  Est. MMXXIV
                </p>
              </div>

              <div className="flex gap-6">
                {['Instagram', 'Pinterest'].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="font-sans text-[0.65rem] font-medium uppercase tracking-[0.18em]"
                    style={{
                      color: 'rgba(196,190,184,0.28)',
                      transition: `color 280ms cubic-bezier(0.19,1,0.22,1)`,
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#C9A84C' }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'rgba(196,190,184,0.28)' }}
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
