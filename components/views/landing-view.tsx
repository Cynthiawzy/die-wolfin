'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '@/components/store'
import { EnterChrome } from '@/components/enter-chrome'
import { playEnter } from '@/lib/sound'

const doorEase = [0.76, 0, 0.24, 1] as const

const ARRIVE_MS = 900
const OPEN_MS = 1600

type Phase = 'idle' | 'arriving' | 'opening'

export function LandingView() {
  const { navigate, reducedMotion } = useStore()
  const [phase, setPhase] = useState<Phase>('idle')

  const enter = () => {
    playEnter()
    if (reducedMotion) {
      navigate('closet')
      return
    }
    if (phase !== 'idle') return
    setPhase('arriving')
    window.setTimeout(() => setPhase('opening'), ARRIVE_MS)
    window.setTimeout(() => navigate('closet'), ARRIVE_MS + OPEN_MS)
  }

  const doorsIn = phase !== 'idle'
  const opening = phase === 'opening'

  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden bg-noir"
      style={{ perspective: '1800px' }}
    >
      {/* Waiting-room backdrop, visible until the doors rise into view */}
      <img
        src="/images/landing-bg.png"
        alt=""
        aria-hidden
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir via-noir/30 to-noir/60"
      />

      {/* Warm interior glow revealed behind the doors */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        initial={false}
        animate={{ opacity: opening ? 1 : doorsIn ? 0.25 : 0 }}
        transition={{ duration: OPEN_MS / 1000, ease: doorEase }}
      >
        <div
          className="h-[70%] w-[55%] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(224,183,195,0.55) 0%, rgba(120,70,80,0.25) 40%, transparent 70%)',
          }}
        />
      </motion.div>

      {/* Left door leaf */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1/2 origin-left overflow-hidden"
        style={{
          boxShadow: 'inset -30px 0 60px -20px rgba(0,0,0,0.9)',
        }}
        initial={{ opacity: 0, y: 48 }}
        animate={{
          opacity: doorsIn ? 1 : 0,
          y: doorsIn ? 0 : 48,
          rotateY: opening ? -115 : 0,
          x: opening ? '-6%' : 0,
        }}
        transition={{
          duration: opening ? OPEN_MS / 1000 : ARRIVE_MS / 1000,
          ease: doorEase,
        }}
      >
        <img
          src="/images/doors.png"
          alt=""
          draggable={false}
          className="absolute inset-y-0 left-0 h-full w-[200%] max-w-none object-cover"
        />
      </motion.div>
      {/* Right door leaf */}
      <motion.div
        aria-hidden
        className="absolute inset-y-0 right-0 w-1/2 origin-right overflow-hidden"
        style={{
          boxShadow: 'inset 30px 0 60px -20px rgba(0,0,0,0.9)',
        }}
        initial={{ opacity: 0, y: 48 }}
        animate={{
          opacity: doorsIn ? 1 : 0,
          y: doorsIn ? 0 : 48,
          rotateY: opening ? 115 : 0,
          x: opening ? '6%' : 0,
        }}
        transition={{
          duration: opening ? OPEN_MS / 1000 : ARRIVE_MS / 1000,
          ease: doorEase,
        }}
      >
        <img
          src="/images/doors.png"
          alt=""
          draggable={false}
          className="absolute inset-y-0 right-0 h-full w-[200%] max-w-none object-cover"
        />
      </motion.div>

      {/* Seam vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Center content */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: doorsIn ? 0 : 1 }}
        transition={{
          duration: doorsIn ? 0.8 : 1.4,
          delay: doorsIn ? 0 : 0.6,
          ease: 'easeOut',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 14, letterSpacing: '0.2em' }}
          animate={{ opacity: 1, y: 0, letterSpacing: '0.35em' }}
          transition={{ duration: 1.2, delay: 0.8, ease: doorEase }}
          className="mb-5 text-[0.65rem] uppercase tracking-[0.35em] text-rose/90"
        >
          Maison Couture · Est. MMXV
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 18, scale: 1.04 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.85, ease: doorEase }}
          className="relative mx-auto"
          style={{ width: 'clamp(220px, 40vw, 460px)', height: 'clamp(220px, 40vw, 460px)' }}
        >
          <span className="sr-only">Die Wölfin</span>
          <motion.div
            aria-hidden
            className="h-full w-full"
            animate={reducedMotion ? undefined : { y: [0, -14, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-dark-cleaned-up.png"
              alt=""
              className="h-full w-full object-contain"
              draggable={false}
            />
          </motion.div>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.3, ease: doorEase }}
          className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-silver/80"
        >
          Behind these doors: a wardrobe with teeth. Leather, lace, and the
          things you were told not to want.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.7, ease: doorEase }}
          className="mt-11"
        >
          <EnterChrome onClick={enter} data-cursor="hover" />
        </motion.div>
      </motion.div>
    </section>
  )
}
