'use client'

/**
 * Apple-style scroll-driven frame animation.
 *
 * WHY position:fixed instead of position:sticky:
 * The <main> ancestor has overflow-x:hidden, which makes it the scroll
 * container. That breaks sticky positioning for any descendant — the sticky
 * element pins to <main> (which doesn't scroll) rather than the viewport.
 * A fixed overlay + a passive scroll-spacer div is the reliable alternative.
 */

import { useRef, useEffect } from 'react'
import { assetPath } from '@/lib/utils'

// ─── Config ──────────────────────────────────────────────────────────────────

const TOTAL_FRAMES = 64
const CHUNK_SIZE   = 10

function frameSrc(n: number) {
  return assetPath(
    `/images/Perfume flow animation/ezgif-frame-${String(n).padStart(3, '0')}.jpg`
  )
}

function scheduleIdle(cb: () => void, timeout: number) {
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(cb, { timeout })
  } else {
    setTimeout(cb, timeout)
  }
}

// ─── Text panels ─────────────────────────────────────────────────────────────

interface Panel {
  heading: string
  body: string
  fadeIn: number   // scroll progress 0-1 → opacity starts rising
  hold: number     // → fully opaque
  fadeOut: number  // → opacity starts falling
  hAlign: 'left' | 'right' | 'center'
  vAlign: 'top' | 'middle' | 'bottom'
}

const PANELS: Panel[] = [
  {
    heading: 'Crafted to Captivate',
    body: 'A fragrance engineered with elegance and timeless sophistication.',
    fadeIn: 0.02, hold: 0.09, fadeOut: 0.19,
    hAlign: 'left', vAlign: 'bottom',
  },
  {
    heading: 'Liquid Luxury',
    body: 'Watch glowing amber perfume flow into perfection.',
    fadeIn: 0.27, hold: 0.34, fadeOut: 0.44,
    hAlign: 'right', vAlign: 'middle',
  },
  {
    heading: 'Precision in Motion',
    body: 'Every component assembles with cinematic mechanical precision.',
    fadeIn: 0.52, hold: 0.59, fadeOut: 0.69,
    hAlign: 'left', vAlign: 'middle',
  },
  {
    heading: 'The Essence of 3GEN',
    body: 'Luxury craftsmanship transformed into a cinematic fragrance experience.',
    fadeIn: 0.77, hold: 0.84, fadeOut: 0.94,
    hAlign: 'center', vAlign: 'bottom',
  },
]

function calcOpacity(progress: number, p: Panel): number {
  const fadeOutEnd = p.fadeOut + 0.055
  if (progress < p.fadeIn)   return 0
  if (progress < p.hold)     return (progress - p.fadeIn) / (p.hold - p.fadeIn)
  if (progress < p.fadeOut)  return 1
  if (progress < fadeOutEnd) return 1 - (progress - p.fadeOut) / (fadeOutEnd - p.fadeOut)
  return 0
}

// ─── Canvas cover-draw ────────────────────────────────────────────────────────

function drawCover(ctx: CanvasRenderingContext2D, img: HTMLImageElement) {
  const cw = ctx.canvas.width
  const ch = ctx.canvas.height
  const ir = img.naturalWidth / img.naturalHeight
  const cr = cw / ch
  let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
  if (ir > cr) {
    sw = sh * cr
    sx = (img.naturalWidth - sw) / 2
  } else {
    sh = sw / cr
    sy = (img.naturalHeight - sh) / 2
  }
  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch)
}

// ─── Panel position helper (called once on render, not in hot path) ───────────

function panelPositionStyle(panel: Panel): React.CSSProperties {
  const s: React.CSSProperties = {}
  if (panel.hAlign === 'left')   { s.left  = 'clamp(1.5rem, 5vw, 5rem)' }
  if (panel.hAlign === 'right')  { s.right = 'clamp(1.5rem, 5vw, 5rem)' }
  if (panel.hAlign === 'center') { s.left  = '50%'; s.marginLeft = '-210px' }
  if (panel.vAlign === 'bottom') { s.bottom = 'clamp(3rem, 9vh, 7rem)' }
  if (panel.vAlign === 'top')    { s.top    = 'clamp(3rem, 9vh, 7rem)' }
  if (panel.vAlign === 'middle') { s.top    = '50%'; s.marginTop = '-80px' }
  return s
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ScrollAnimationSection() {
  const spacerRef    = useRef<HTMLDivElement>(null)
  const overlayRef   = useRef<HTMLDivElement>(null)
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const scrollCueRef = useRef<HTMLDivElement>(null)
  const panelRefs    = useRef<(HTMLDivElement | null)[]>([null, null, null, null])
  const framesRef    = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: TOTAL_FRAMES }, () => null)
  )
  const rafRef         = useRef<number>(0)
  const drawnRef       = useRef<number>(-1)
  const hasScrolledRef = useRef(false)

  // ── Resize canvas to match viewport ───────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    function resize() {
      if (!canvas) return
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const frame = drawnRef.current >= 0 ? framesRef.current[drawnRef.current] : null
      if (frame) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawCover(ctx, frame)
      }
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    return () => window.removeEventListener('resize', resize)
  }, [])

  // ── Frame loading ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current

    // Frame 1 — load immediately, draw to canvas right away
    const first = new Image()
    first.onload = () => {
      framesRef.current[0] = first
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) drawCover(ctx, first)
        drawnRef.current = 0
      }
    }
    first.src = frameSrc(1)

    // Frames 2–64 — lazy chunks, never blocking the main thread
    let next = 1
    function loadChunk() {
      const end = Math.min(next + CHUNK_SIZE, TOTAL_FRAMES)
      for (let i = next; i < end; i++) {
        const idx = i
        const img = new Image()
        img.onload = () => { framesRef.current[idx] = img }
        img.src = frameSrc(idx + 1)
      }
      next = end
      if (next < TOTAL_FRAMES) scheduleIdle(loadChunk, 2000)
    }
    scheduleIdle(loadChunk, 200)
  }, [])

  // ── Scroll → frame + text updates (direct DOM, no React state) ────────────
  useEffect(() => {
    function onScroll() {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const spacer   = spacerRef.current
        const canvas   = canvasRef.current
        const overlay  = overlayRef.current
        if (!spacer || !canvas || !overlay) return

        const rect = spacer.getBoundingClientRect()

        // Active while the spacer's "sticky zone" is in play:
        // section top at/past viewport top AND section bottom not yet gone
        const active = rect.top <= 2 && rect.bottom > window.innerHeight * 0.08
        overlay.style.opacity = active ? '1' : '0'

        if (!active) return

        // Dismiss scroll cue on first meaningful scroll
        if (!hasScrolledRef.current && -rect.top > window.innerHeight * 0.015) {
          hasScrolledRef.current = true
          if (scrollCueRef.current) scrollCueRef.current.style.opacity = '0'
        }

        const scrolled   = -rect.top
        const scrollable = rect.height - window.innerHeight
        const progress   = Math.max(0, Math.min(1, scrolled / scrollable))

        // Draw correct frame
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES))
        const frame    = framesRef.current[frameIdx]
        if (frame && frameIdx !== drawnRef.current) {
          const ctx = canvas.getContext('2d')
          if (ctx) {
            drawCover(ctx, frame)
            drawnRef.current = frameIdx
          }
        }

        // Update each text panel directly
        PANELS.forEach((panel, i) => {
          const el = panelRefs.current[i]
          if (!el) return
          const op = calcOpacity(progress, panel)
          el.style.opacity   = String(op)
          el.style.transform = `translateY(${(1 - Math.min(op * 2, 1)) * 22}px)`
        })
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll() // compute initial state immediately (handles page-refresh mid-scroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ─── Fixed overlay (z:5 — below navbar z:50, above page content z:0) ── */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: '#000',
          zIndex: 5,
          opacity: 1,
          transition: 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        {/* ── Canvas ─────────────────────────────────────────────── */}
        <canvas
          ref={canvasRef}
          style={{ display: 'block', width: '100%', height: '100%' }}
        />

        {/* ── Radial vignette ────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background:
              'radial-gradient(ellipse 85% 85% at 50% 50%, transparent 28%, rgba(0,0,0,0.52) 100%)',
          }}
        />

        {/* ── Cinematic top/bottom bars ───────────────────────────── */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 16%, transparent 76%, rgba(0,0,0,0.65) 100%)',
          }}
        />

        {/* ── Text panels ─────────────────────────────────────────── */}
        {PANELS.map((panel, i) => (
          <div
            key={i}
            ref={el => { panelRefs.current[i] = el }}
            style={{
              position: 'absolute',
              maxWidth: '420px',
              width: 'calc(100% - 3rem)',
              padding: 'clamp(20px, 3vw, 28px) clamp(22px, 3.5vw, 32px)',
              background: 'rgba(4, 4, 4, 0.52)',
              backdropFilter: 'blur(28px) saturate(160%)',
              WebkitBackdropFilter: 'blur(28px) saturate(160%)',
              border: '1px solid rgba(201, 168, 76, 0.13)',
              borderRadius: '2px',
              boxShadow:
                '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(201,168,76,0.08)',
              opacity: 0,
              transform: 'translateY(22px)',
              willChange: 'opacity, transform',
              pointerEvents: 'none',
              ...panelPositionStyle(panel),
            }}
          >
            {/* Gold accent rule */}
            <div
              style={{
                width: '30px', height: '1px', marginBottom: '14px',
                background:
                  'linear-gradient(90deg, rgba(201,168,76,0.85) 0%, rgba(201,168,76,0.18) 100%)',
              }}
            />
            <h2
              style={{
                fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
                fontSize: 'clamp(1.35rem, 2.4vw, 1.9rem)',
                fontWeight: 300,
                letterSpacing: '0.045em',
                color: '#F0EAE0',
                margin: '0 0 10px',
                lineHeight: 1.22,
              }}
            >
              {panel.heading}
            </h2>
            <p
              style={{
                fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
                fontSize: 'clamp(0.78rem, 1.15vw, 0.92rem)',
                fontWeight: 300,
                letterSpacing: '0.03em',
                color: 'rgba(196, 190, 184, 0.70)',
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {panel.body}
            </p>
          </div>
        ))}

        {/* ── Scroll cue ──────────────────────────────────────────── */}
        <div
          ref={scrollCueRef}
          style={{
            position: 'absolute',
            bottom: '2.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 1,
            transition: 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
              fontSize: '0.55rem',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'rgba(201, 168, 76, 0.45)',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '28px',
              background:
                'linear-gradient(to bottom, rgba(201,168,76,0.4) 0%, transparent 100%)',
            }}
          />
        </div>

        {/* ── Brand mark — top right ───────────────────────────────── */}
        <div
          style={{
            position: 'absolute',
            top: '1.8rem',
            right: 'clamp(1.5rem, 4vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            gap: '4px',
            pointerEvents: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
              fontSize: '0.5rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(201, 168, 76, 0.22)',
            }}
          >
            3GEN Parfumerie
          </span>
          <div
            style={{
              width: '22px',
              height: '1px',
              background: 'rgba(201, 168, 76, 0.14)',
              alignSelf: 'flex-end',
            }}
          />
        </div>
      </div>

      {/* ─── Scroll spacer — provides 800vh of scroll travel ──────────────── */}
      <div
        ref={spacerRef}
        style={{ height: '800vh', width: '100%', pointerEvents: 'none' }}
        role="presentation"
      />
    </>
  )
}
