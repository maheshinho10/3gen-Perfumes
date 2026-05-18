'use client'

import { useRef, useEffect, useState } from 'react'
import { assetPath } from '@/lib/utils'

export function VideoHeroSection() {
  const videoRef    = useRef<HTMLVideoElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (v.readyState >= 3) { setLoaded(true); return }
    const onCanPlay = () => setLoaded(true)
    v.addEventListener('canplaythrough', onCanPlay, { once: true })
    return () => v.removeEventListener('canplaythrough', onCanPlay)
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        background: '#000',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Video ──────────────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        onCanPlayThrough={() => setLoaded(true)}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <source src={assetPath('/videos/Perfume flow.mp4')} type="video/mp4" />
      </video>

      {/* ── Cinematic vignette ─────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 25%, rgba(0,0,0,0.60) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Top fade ───────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 18%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Bottom fade — bleeds into HeroSection (#07100A) seamlessly ─────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '38%',
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(7,16,10,0.55) 40%, rgba(7,16,10,0.88) 68%, #07100A 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Scroll cue ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          opacity: loaded ? 0.7 : 0,
          transition: 'opacity 1.4s ease 1.2s',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
            fontSize: '0.52rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(201, 168, 76, 0.5)',
          }}
        >
          Discover
        </span>
        <div
          style={{
            width: '1px',
            height: '32px',
            background: 'linear-gradient(to bottom, rgba(201,168,76,0.45), transparent)',
          }}
        />
      </div>

      {/* ── Bottom product label ─────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.2rem',
          right: 'clamp(1.5rem, 4vw, 3.5rem)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.4s ease 0.8s',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
            fontSize: 'clamp(0.8rem, 1.2vw, 1rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.06em',
            color: 'rgba(201,168,76,0.65)',
          }}
        >
          Oud Form
        </span>
        <span style={{ width: '1px', height: '11px', background: 'rgba(201,168,76,0.2)' }} />
        <span
          style={{
            fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
            fontSize: '0.58rem',
            fontWeight: 300,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'rgba(196,190,184,0.32)',
          }}
        >
          60ml EDP
        </span>
      </div>

      {/* ── Brand estate mark ───────────────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.2rem',
          left: 'clamp(1.5rem, 4vw, 3.5rem)',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.4s ease 1s',
          pointerEvents: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'DM Sans, var(--font-dm-sans-var), sans-serif',
            fontSize: '0.48rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(196,190,184,0.18)',
          }}
        >
          3GEN Parfumerie — Est. MMXXIV
        </span>
      </div>
    </section>
  )
}
