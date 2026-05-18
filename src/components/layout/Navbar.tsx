'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion'
import { useScrollState } from '@/src/hooks/useScrollState'
import { MobileMenu } from './MobileMenu'
import { easing, duration } from '@/lib/tokens'
import { assetPath } from '@/lib/utils'

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'Collections', href: '/collections', sub: 'All scents' },
  { label: 'Discover', href: '/discover', sub: 'Our world' },
  { label: 'Ingredients', href: '/ingredients', sub: 'The craft' },
  { label: 'About', href: '/about', sub: '3GEN' },
] as const

const BRAND_ENTER = {
  hidden: { opacity: 0, y: -14, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.slow, ease: easing.silk, delay: 0.1 },
  },
}

const NAV_ENTER = {
  hidden: { opacity: 0, y: -8, filter: 'blur(4px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: duration.base, ease: easing.luxury, delay: 0.22 + i * 0.065 },
  }),
}

// ─── Hamburger Icon ───────────────────────────────────────────────────────────

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative flex h-5 w-6 flex-col items-end justify-center gap-[5px]">
      <motion.span
        className="block h-px origin-right rounded-full"
        style={{ backgroundColor: '#C4BEB8' }}
        animate={isOpen
          ? { rotate: -45, y: 5, width: '100%', originX: 1 }
          : { rotate: 0, y: 0, width: '100%' }
        }
        transition={{ duration: 0.35, ease: easing.luxury }}
      />
      <motion.span
        className="block h-px rounded-full"
        style={{ backgroundColor: '#C9A84C' }}
        animate={isOpen
          ? { opacity: 0, scaleX: 0 }
          : { opacity: 1, scaleX: 1, width: '66%' }
        }
        transition={{ duration: 0.25, ease: easing.sharp }}
      />
      <motion.span
        className="block h-px origin-right rounded-full"
        style={{ backgroundColor: '#C4BEB8' }}
        animate={isOpen
          ? { rotate: 45, y: -5, width: '100%', originX: 1 }
          : { rotate: 0, y: 0, width: '83%' }
        }
        transition={{ duration: 0.35, ease: easing.luxury }}
      />
    </div>
  )
}

// ─── Nav Link with hover underline ───────────────────────────────────────────

function NavLink({ label, href, index }: { label: string; href: string; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      custom={index}
      variants={NAV_ENTER}
      initial="hidden"
      animate="visible"
    >
      <Link
        href={href}
        className="group relative flex flex-col items-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <span
          className="font-sans text-[0.7rem] font-medium uppercase"
          style={{
            letterSpacing: '0.18em',
            color: hovered ? '#C4BEB8' : 'rgba(196,190,184,0.6)',
            transition: `color 260ms cubic-bezier(0.19,1,0.22,1)`,
          }}
        >
          {label}
        </span>

        {/* Animated underline — spring physics */}
        <motion.span
          className="mt-0.5 block h-px"
          style={{ background: '#C9A84C', transformOrigin: '0% 50%' }}
          animate={{
            scaleX: hovered ? 1 : 0,
            opacity: hovered ? 1 : 0,
          }}
          transition={{ type: 'spring', stiffness: 340, damping: 28, mass: 0.8 }}
        />
      </Link>
    </motion.div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { isScrolled, isHidden } = useScrollState(50)

  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // Scroll-driven values
  const { scrollY } = useScroll()

  // Background opacity: 0 at top → 0.85 after 80px
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85])
  // Border opacity: 0 at top → 0.12 after 80px
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.12])
  // Blur amount: 0 → 24px
  const blurAmount = useTransform(scrollY, [0, 80], [0, 24])
  // Padding: 1.75rem at top → 1rem after 100px
  const paddingY = useTransform(scrollY, [0, 100], [28, 16])

  const backdropFilter = useMotionTemplate`blur(${blurAmount}px) saturate(180%)`
  const backgroundColor = useMotionTemplate`rgba(7, 16, 10, ${bgOpacity})`
  const borderColor = useMotionTemplate`rgba(201, 168, 76, ${borderOpacity})`

  return (
    <>
      {/* ── Floating Navbar ──────────────────────────────────────────── */}
      <motion.header
        className="fixed inset-x-0 top-0 z-[50]"
        animate={{ y: isHidden && !menuOpen ? '-100%' : '0%' }}
        transition={{ duration: duration.base, ease: easing.luxury }}
      >
        {/* Glass panel */}
        <motion.div
          className="relative mx-0"
          style={{
            backgroundColor,
            backdropFilter,
            WebkitBackdropFilter: backdropFilter,
            borderBottom: '1px solid',
            borderColor,
          }}
        >
          {/* Inner layout */}
          <motion.div
            className="flex items-center justify-between px-6 md:px-10 lg:px-14"
            style={{ paddingTop: paddingY, paddingBottom: paddingY }}
          >

            {/* ── Brand Mark ─────────────────────────────────────────── */}
            <motion.div
              variants={BRAND_ENTER}
              initial="hidden"
              animate="visible"
            >
              <Link href="/" className="group relative flex items-center gap-3" aria-label="3GEN — Home">
                {/* SVG logo — natively transparent, works on any background */}
                <motion.img
                  src={assetPath('/images/Logo/3_gen_logo-removebg-preview-removebg-preview.png')}
                  alt="3GEN Parfumerie"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.4, ease: easing.luxury }}
                  style={{
                    height: '72px',
                    width: 'auto',
                    display: 'block',
                    flexShrink: 0,
                  }}
                />

                {/* Wordmark beside logo — desktop only */}

              </Link>
            </motion.div>

            {/* ── Desktop Nav Links ───────────────────────────────────── */}
            <nav
              className="hidden items-center gap-8 md:flex lg:gap-10"
              aria-label="Primary navigation"
            >
              {NAV_LINKS.map((link, i) => (
                <NavLink key={link.href} {...link} index={i} />
              ))}
            </nav>

            {/* ── Right Controls ──────────────────────────────────────── */}
            <div className="flex items-center gap-4 md:gap-6">

              {/* Cart — desktop only */}
              <motion.div
                custom={NAV_LINKS.length}
                variants={NAV_ENTER}
                initial="hidden"
                animate="visible"
                className="hidden md:block"
              >
                <Link
                  href="/cart"
                  className="group relative flex items-center gap-2"
                  aria-label="Shopping bag"
                >
                  <span
                    className="font-sans text-[0.7rem] font-medium uppercase transition-colors duration-300 group-hover:text-[#C4BEB8]"
                    style={{ letterSpacing: '0.18em', color: 'rgba(196,190,184,0.6)' }}
                  >
                    Bag
                  </span>
                  {/* Bag count dot */}
                  <span
                    className="flex h-4 w-4 items-center justify-center rounded-full font-sans text-[0.55rem] font-medium"
                    style={{ background: '#C9A84C', color: '#07100A' }}
                  >
                    0
                  </span>
                </Link>
              </motion.div>

              {/* Thin gold separator — desktop */}
              <motion.div
                custom={NAV_LINKS.length + 1}
                variants={NAV_ENTER}
                initial="hidden"
                animate="visible"
                className="hidden h-4 w-px md:block"
                style={{ background: 'rgba(201,168,76,0.3)' }}
              />

              {/* Hamburger — mobile + tablet */}
              <motion.button
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="relative z-[51] flex h-11 w-11 items-center justify-center focus-visible:outline-none md:hidden"
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.15 }}
              >
                <HamburgerIcon isOpen={menuOpen} />
              </motion.button>

              {/* Desktop menu trigger — thin label */}
              <motion.button
                custom={NAV_LINKS.length + 2}
                variants={NAV_ENTER}
                initial="hidden"
                animate="visible"
                onClick={toggleMenu}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                className="relative z-[51] hidden md:flex"
              >
                <AnimatePresence mode="wait">
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="font-sans text-[0.7rem] font-medium uppercase"
                      style={{ letterSpacing: '0.18em', color: '#C9A84C' }}
                    >
                      Close
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="font-sans text-[0.7rem] font-medium uppercase transition-colors duration-300 hover:text-[#C4BEB8]"
                      style={{ letterSpacing: '0.18em', color: 'rgba(196,190,184,0.6)' }}
                    >
                      Menu
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </motion.div>

          {/* Bottom gold shimmer line — visible on scroll */}
          <AnimatePresence>
            {isScrolled && (
              <motion.div
                key="shimmer-line"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.6, ease: easing.luxury }}
                className="absolute bottom-0 left-0 h-px w-full origin-left"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.4) 30%, rgba(201,168,76,0.6) 50%, rgba(201,168,76,0.4) 70%, transparent 100%)',
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.header>

      {/* ── Mobile Full-Screen Menu ───────────────────────────────────── */}
      <MobileMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        links={[...NAV_LINKS]}
      />
    </>
  )
}
