'use client'

import { useEffect, useState, useRef } from 'react'

interface ScrollState {
  scrollY: number
  isScrolled: boolean       // past threshold
  isAtTop: boolean          // within 10px of top
  direction: 'up' | 'down' | null
  isHidden: boolean         // hide on scroll down, show on scroll up
}

/**
 * Tracks scroll position, direction, and derived navbar visibility state.
 * Hides navbar when scrolling down past threshold, reveals on scroll up.
 */
export function useScrollState(threshold = 60): ScrollState {
  const [state, setState] = useState<ScrollState>({
    scrollY: 0,
    isScrolled: false,
    isAtTop: true,
    direction: null,
    isHidden: false,
  })

  const lastScrollY = useRef(0)
  const ticking = useRef(false)

  useEffect(() => {
    const update = () => {
      const current = window.scrollY
      const previous = lastScrollY.current
      const direction = current > previous ? 'down' : 'up'
      const isScrolled = current > threshold
      const isAtTop = current < 10
      // Hide when scrolling down past threshold, always show at top or scrolling up
      const isHidden = direction === 'down' && current > threshold + 100

      setState({ scrollY: current, isScrolled, isAtTop, direction, isHidden })
      lastScrollY.current = current
      ticking.current = false
    }

    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(update)
        ticking.current = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return state
}
