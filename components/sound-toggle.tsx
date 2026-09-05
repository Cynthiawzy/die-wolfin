'use client'

import { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { isMuted, primeAudio, subscribeMuted, toggleMuted } from '@/lib/sound'

export function SoundToggle() {
  const [muted, setMutedState] = useState(false)

  useEffect(() => {
    setMutedState(isMuted())
    return subscribeMuted(setMutedState)
  }, [])

  return (
    <button
      onClick={() => {
        primeAudio()
        toggleMuted()
      }}
      data-cursor="hover"
      aria-label={muted ? 'Unmute sound' : 'Mute sound'}
      aria-pressed={muted}
      className="fixed bottom-5 right-5 z-[65] flex h-9 w-9 items-center justify-center rounded-full border border-silver/30 bg-noir/50 text-silver backdrop-blur-sm transition-colors duration-300 hover:border-rose/60 hover:text-rose"
    >
      {muted ? (
        <VolumeX className="h-4 w-4" strokeWidth={1.4} />
      ) : (
        <Volume2 className="h-4 w-4" strokeWidth={1.4} />
      )}
    </button>
  )
}
