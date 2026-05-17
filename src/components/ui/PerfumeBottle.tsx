'use client'

// 3GEN Oud Form — variant-aware CSS perfume bottle
// Variants: 'green' (dark forest), 'white' (frosted ivory), 'tan' (cognac amber)

export type BottleVariant = 'green' | 'white' | 'tan'

interface VariantConfig {
  capBg: string
  bodyBg: string
  bodyBoxShadow: string
  internalGlow: string
  ribbing: string
  specular: string
  rimLight: string
  topShadow: string
  labelText: string
  labelDivider: string
  svgStroke: string
  svgFlameFill: string
  svgFlameInner: string
  subtleText: string
  engraveText: string
}

const VARIANTS: Record<BottleVariant, VariantConfig> = {
  green: {
    capBg: 'linear-gradient(145deg, #F5D865 0%, #D4A828 28%, #C49018 62%, #8C6510 100%)',
    bodyBg: [
      'linear-gradient(90deg,',
      '  rgba(255,255,255,0.30) 0%,',
      '  rgba(255,255,255,0.14) 6%,',
      '  rgba(14,38,24,0.98) 16%,',
      '  rgba(8,22,14,1.00) 44%,',
      '  rgba(12,32,20,0.97) 72%,',
      '  rgba(255,255,255,0.04) 88%,',
      '  rgba(255,255,255,0.16) 100%',
      ')',
    ].join(''),
    bodyBoxShadow: [
      'inset 10px 0 22px rgba(255,255,255,0.07)',
      'inset -5px 0 12px rgba(0,0,0,0.32)',
      'inset 0 -10px 28px rgba(0,0,0,0.45)',
      '10px 0 44px rgba(0,0,0,0.65)',
      '-5px 0 18px rgba(0,0,0,0.32)',
      '0 16px 56px rgba(0,0,0,0.55)',
    ].join(', '),
    internalGlow: 'radial-gradient(ellipse 65% 55% at 50% 72%, rgba(201,168,76,0.26) 0%, rgba(160,118,28,0.14) 42%, transparent 68%)',
    ribbing: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.04) 2px, transparent 4px, transparent 7px, rgba(255,255,255,0.08) 9px)',
    specular: 'linear-gradient(90deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.16) 35%, transparent 100%)',
    rimLight: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.10))',
    topShadow: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent)',
    labelText: 'rgba(201,168,76,0.90)',
    labelDivider: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.58), transparent)',
    svgStroke: 'rgba(201,168,76,0.68)',
    svgFlameFill: 'rgba(201,168,76,0.78)',
    svgFlameInner: 'rgba(255,255,255,0.42)',
    subtleText: 'rgba(201,168,76,0.44)',
    engraveText: 'rgba(201,168,76,0.28)',
  },
  white: {
    capBg: 'linear-gradient(145deg, #F5D865 0%, #D4A828 28%, #C49018 62%, #8C6510 100%)',
    bodyBg: [
      'linear-gradient(90deg,',
      '  rgba(255,255,255,0.98) 0%,',
      '  rgba(255,255,255,0.86) 6%,',
      '  rgba(236,232,224,0.97) 16%,',
      '  rgba(220,214,204,1.00) 44%,',
      '  rgba(230,224,214,0.97) 72%,',
      '  rgba(252,250,246,0.65) 88%,',
      '  rgba(255,255,255,0.96) 100%',
      ')',
    ].join(''),
    bodyBoxShadow: [
      'inset 10px 0 22px rgba(255,255,255,0.55)',
      'inset -5px 0 12px rgba(180,170,155,0.25)',
      'inset 0 -10px 28px rgba(160,150,135,0.18)',
      '10px 0 44px rgba(0,0,0,0.28)',
      '-5px 0 18px rgba(0,0,0,0.14)',
      '0 16px 56px rgba(0,0,0,0.30)',
    ].join(', '),
    internalGlow: 'radial-gradient(ellipse 65% 55% at 50% 72%, rgba(255,230,190,0.12) 0%, rgba(220,195,150,0.07) 42%, transparent 68%)',
    ribbing: 'repeating-linear-gradient(90deg, rgba(180,170,155,0.12) 0px, rgba(180,170,155,0.06) 2px, transparent 4px, transparent 7px, rgba(180,170,155,0.12) 9px)',
    specular: 'linear-gradient(90deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.40) 35%, transparent 100%)',
    rimLight: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.38))',
    topShadow: 'linear-gradient(180deg, rgba(140,130,115,0.22), transparent)',
    labelText: 'rgba(130,95,38,0.88)',
    labelDivider: 'linear-gradient(90deg, transparent, rgba(150,110,45,0.50), transparent)',
    svgStroke: 'rgba(150,110,45,0.62)',
    svgFlameFill: 'rgba(160,118,48,0.75)',
    svgFlameInner: 'rgba(255,255,255,0.55)',
    subtleText: 'rgba(130,95,38,0.48)',
    engraveText: 'rgba(130,95,38,0.26)',
  },
  tan: {
    capBg: 'linear-gradient(145deg, #F5D865 0%, #D4A828 28%, #C49018 62%, #8C6510 100%)',
    bodyBg: [
      'linear-gradient(90deg,',
      '  rgba(215,170,88,0.44) 0%,',
      '  rgba(172,118,44,0.30) 6%,',
      '  rgba(112,65,16,0.98) 16%,',
      '  rgba(86,48,10,1.00) 44%,',
      '  rgba(102,60,14,0.97) 72%,',
      '  rgba(165,110,38,0.20) 88%,',
      '  rgba(198,148,62,0.38) 100%',
      ')',
    ].join(''),
    bodyBoxShadow: [
      'inset 10px 0 22px rgba(220,170,80,0.14)',
      'inset -5px 0 12px rgba(0,0,0,0.38)',
      'inset 0 -10px 28px rgba(0,0,0,0.50)',
      '10px 0 44px rgba(0,0,0,0.60)',
      '-5px 0 18px rgba(60,30,5,0.38)',
      '0 16px 56px rgba(80,40,5,0.50)',
    ].join(', '),
    internalGlow: 'radial-gradient(ellipse 65% 55% at 50% 72%, rgba(230,162,42,0.40) 0%, rgba(188,125,28,0.24) 42%, transparent 68%)',
    ribbing: 'repeating-linear-gradient(90deg, rgba(240,190,90,0.12) 0px, rgba(240,190,90,0.06) 2px, transparent 4px, transparent 7px, rgba(240,190,90,0.12) 9px)',
    specular: 'linear-gradient(90deg, rgba(255,210,120,0.38) 0%, rgba(220,175,85,0.20) 35%, transparent 100%)',
    rimLight: 'linear-gradient(90deg, transparent, rgba(220,175,85,0.18))',
    topShadow: 'linear-gradient(180deg, rgba(0,0,0,0.48), transparent)',
    labelText: 'rgba(248,222,148,0.90)',
    labelDivider: 'linear-gradient(90deg, transparent, rgba(245,215,130,0.55), transparent)',
    svgStroke: 'rgba(242,212,125,0.65)',
    svgFlameFill: 'rgba(248,218,132,0.78)',
    svgFlameInner: 'rgba(255,255,255,0.38)',
    subtleText: 'rgba(245,215,130,0.48)',
    engraveText: 'rgba(245,215,130,0.28)',
  },
}

interface PerfumeBottleProps {
  variant?: BottleVariant
}

export function PerfumeBottle({ variant = 'green' }: PerfumeBottleProps) {
  const v = VARIANTS[variant]

  return (
    <div
      className="relative flex flex-col items-center select-none"
      aria-label="3GEN Oud Form — 60ml Eau de Parfum"
      style={{ willChange: 'transform' }}
    >
      {/* Atmospheric halo behind bottle */}
      <div
        style={{
          position: 'absolute',
          inset: '-30%',
          background: variant === 'white'
            ? 'radial-gradient(ellipse 55% 60% at 50% 55%, rgba(255,240,210,0.10) 0%, rgba(220,210,190,0.05) 50%, transparent 70%)'
            : variant === 'tan'
            ? 'radial-gradient(ellipse 55% 60% at 50% 55%, rgba(230,165,45,0.14) 0%, rgba(160,100,20,0.07) 50%, transparent 70%)'
            : 'radial-gradient(ellipse 55% 60% at 50% 55%, rgba(201,168,76,0.12) 0%, rgba(42,96,64,0.06) 50%, transparent 70%)',
          filter: 'blur(32px)',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />

      {/* ── FROSTED CAP ─────────────────────────────────────────────── */}
      <div
        style={{
          width: '100px',
          height: '78px',
          background: v.capBg,
          borderRadius: '50% 50% 16px 16px / 46% 46% 16px 16px',
          position: 'relative',
          boxShadow: [
            '0 -4px 24px rgba(0,0,0,0.20)',
            'inset 0 4px 16px rgba(255,255,255,0.92)',
            'inset -3px -4px 10px rgba(0,0,0,0.05)',
            '0 6px 14px rgba(0,0,0,0.22)',
          ].join(', '),
        }}
      >
        <div
          style={{
            position: 'absolute', top: '15px', left: '22px', right: '22px', height: '20px',
            background: 'rgba(255,255,255,0.68)',
            borderRadius: '50%',
            filter: 'blur(4px)',
          }}
        />
        <div
          style={{
            position: 'absolute', bottom: '15px', left: '16px', right: '16px', height: '1px',
            background: 'rgba(0,0,0,0.06)',
          }}
        />
      </div>

      {/* ── NECK ────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '64px',
          height: '8px',
          background: 'linear-gradient(90deg, #7A5C18, #C9A84C 25%, #F0D590 50%, #C9A84C 75%, #7A5C18)',
          boxShadow: '0 2px 10px rgba(201,168,76,0.38)',
        }}
      />

      {/* ── COLLAR ──────────────────────────────────────────────────── */}
      <div
        style={{
          width: '116px',
          height: '16px',
          background: 'linear-gradient(180deg, #DFC060 0%, #F5E08A 30%, #C9A84C 60%, #8B6518 100%)',
          boxShadow: '0 5px 20px rgba(201,168,76,0.42), 0 2px 8px rgba(0,0,0,0.35)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute', top: '4px', left: '18%', right: '18%', height: '4px',
            background: 'rgba(255,255,255,0.5)',
            borderRadius: '50%',
            filter: 'blur(2px)',
          }}
        />
      </div>

      {/* ── BODY ────────────────────────────────────────────────────── */}
      <div
        style={{
          width: '152px',
          height: '290px',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '5px 5px 20px 20px',
          background: v.bodyBg,
          boxShadow: v.bodyBoxShadow,
        }}
      >
        {/* Internal glow */}
        <div
          style={{
            position: 'absolute',
            left: '12%', right: '12%',
            bottom: '5%', top: '28%',
            background: v.internalGlow,
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }}
        />

        {/* Vertical glass ribbing */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: v.ribbing,
            pointerEvents: 'none',
          }}
        />

        {/* Left specular highlight */}
        <div
          style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '26px',
            background: v.specular,
            pointerEvents: 'none',
          }}
        />

        {/* Right rim light */}
        <div
          style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '16px',
            background: v.rimLight,
            pointerEvents: 'none',
          }}
        />

        {/* Top inner shadow */}
        <div
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '48px',
            background: v.topShadow,
            pointerEvents: 'none',
          }}
        />

        {/* ── LABEL ───────────────────────────────────────────────── */}
        <div
          style={{
            position: 'absolute', left: '50%', top: '52px',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
            width: '106px',
          }}
        >
          {/* Flame-in-circle logo */}
          <svg width="60" height="60" viewBox="0 0 54 54" fill="none" aria-hidden>
            <circle cx="27" cy="27" r="24" stroke={v.svgStroke} strokeWidth="1" />
            <path
              d="M27 11 C27 11 18 21 18 29 C18 34.5 22 40 27 40 C32 40 36 34.5 36 29 C36 21 27 11 27 11 Z"
              fill={v.svgFlameFill}
            />
            <path
              d="M27 21 C27 21 22 26.5 22 30.5 C22 33 24 36 27 36 C30 36 32 33 32 30.5 C32 26.5 27 21 27 21 Z"
              fill={v.svgFlameInner}
            />
          </svg>

          <div
            style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontSize: '16px', letterSpacing: '0.44em',
              color: v.labelText, fontWeight: 300,
            }}
          >
            3GEN
          </div>

          <div
            style={{
              width: '52px', height: '0.5px',
              background: v.labelDivider,
            }}
          />

          <div
            style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontSize: '10px', letterSpacing: '0.20em', fontStyle: 'italic',
              color: v.labelText,
              opacity: 0.72,
            }}
          >
            Oud Form
          </div>

          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '6px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: v.subtleText,
            }}
          >
            Eau de Parfum
          </div>

          <div
            style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '5.5px', letterSpacing: '0.14em',
              color: v.engraveText,
            }}
          >
            60 ml · 2.02 fl. oz.
          </div>

          <div
            style={{
              width: '52px', height: '0.5px', marginTop: '4px',
              background: v.labelDivider,
              opacity: 0.5,
            }}
          />

          <div
            style={{
              fontFamily: 'var(--font-cormorant-garamond), Georgia, serif',
              fontSize: '5px', letterSpacing: '0.22em', fontStyle: 'italic',
              color: v.engraveText,
              textAlign: 'center',
              lineHeight: 1.5,
            }}
          >
            Wear The Crown<br />And Feel.
          </div>
        </div>
      </div>

      {/* ── BASE RING ────────────────────────────────────────────────── */}
      <div
        style={{
          width: '152px',
          height: '11px',
          background: 'linear-gradient(180deg, #DFC060 0%, #F5E08A 28%, #C9A84C 58%, #6B5015 100%)',
          boxShadow: '0 5px 22px rgba(201,168,76,0.35), 0 3px 10px rgba(0,0,0,0.45)',
        }}
      />

      {/* Ground shadow */}
      <div
        style={{
          width: '110px', height: '20px', marginTop: '10px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.38) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }}
      />
    </div>
  )
}
