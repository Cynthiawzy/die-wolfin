'use client'

import { useEffect, useRef } from 'react'
import { useStore } from '@/components/store'

type Mote = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  a: number
  tw: number
}

export function DustParticles() {
  const { reducedMotion } = useStore()
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (reducedMotion) return
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let motes: Mote[] = []
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const seed = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(70, Math.floor((w * h) / 22000))
      motes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.04),
        a: Math.random() * 0.4 + 0.06,
        tw: Math.random() * Math.PI * 2,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const m of motes) {
        m.x += m.vx
        m.y += m.vy
        m.tw += 0.02
        if (m.y < -5) {
          m.y = h + 5
          m.x = Math.random() * w
        }
        if (m.x < -5) m.x = w + 5
        if (m.x > w + 5) m.x = -5
        const flick = m.a * (0.6 + 0.4 * Math.sin(m.tw))
        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(224,183,195,${flick})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }

    seed()
    draw()
    window.addEventListener('resize', seed)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', seed)
    }
  }, [reducedMotion])

  if (reducedMotion) return null

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] opacity-70 mix-blend-screen"
    />
  )
}
