'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/components/store'
import { playHover } from '@/lib/sound'

/**
 * Custom cursor: a small rose dot with a trailing ring that expands over
 * interactive elements. Hidden on touch / coarse pointers, and for anyone
 * with reduced motion enabled.
 */
export function CustomCursor() {
  const { reducedMotion } = useStore()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const wasActive = useRef(false)
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || reducedMotion) return
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine) return
    setEnabled(true)

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ring = { x: target.x, y: target.y }
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      setVisible(true)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
      }
      const el = e.target as HTMLElement | null
      const nextActive = !!el?.closest(
        'button, a, [role="button"], [data-cursor="hover"]',
      )
      if (nextActive && !wasActive.current) playHover()
      wasActive.current = nextActive
      setActive(nextActive)
    }

    const onLeave = () => setVisible(false)

    const tick = () => {
      ring.x += (target.x - ring.x) * 0.18
      ring.y += (target.y - ring.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px)`
      }
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [reducedMotion])

  if (!enabled) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 300ms ease' }}
    >
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-rose"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-silver/50"
        style={{
          willChange: 'transform',
          width: active ? 44 : 26,
          height: active ? 44 : 26,
          marginLeft: active ? -22 : -13,
          marginTop: active ? -22 : -13,
          borderColor: active ? 'rgba(224,183,195,0.8)' : 'rgba(207,207,207,0.4)',
          boxShadow: active ? '0 0 22px -6px rgba(224,183,195,0.7)' : 'none',
          transition:
            'width 250ms ease, height 250ms ease, margin 250ms ease, border-color 250ms ease, box-shadow 250ms ease',
        }}
      />
    </div>
  )
}
