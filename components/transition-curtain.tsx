'use client'

import { motion } from 'framer-motion'
import { useStore } from '@/components/store'

export function TransitionCurtain() {
  const { transitioning } = useStore()

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-noir"
      initial={false}
      animate={{ opacity: transitioning ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.45, 0.05, 0.2, 1] }}
      style={{ pointerEvents: transitioning ? 'auto' : 'none' }}
    />

  )
}
