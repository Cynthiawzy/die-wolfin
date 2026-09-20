'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/components/store'
import { Reveal } from '@/components/reveal'
import { EnterChrome } from '@/components/enter-chrome'
import './closet-charms.css'

function Chain({ drop }: { drop: number }) {
  return (
    <span className="hc-chain" aria-hidden="true" style={{ ['--hc-drop' as string]: `${drop}px` }}>
      <span className="hc-strand" />
    </span>
  )
}

export function ClosetView() {
  const { viewProduct } = useStore()

  const scrollToPieces = () => {
    document.getElementById('shop-pieces')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        {/* Scoped to the hero itself (not the whole combined section) — a
            portrait photo like this one needs its own crop math; stretching
            it across the much taller category section below squashed the
            subject out of frame entirely. The bottom-heavy fade still meets
            solid noir by the very bottom, so the category section (which
            has no background of its own, just the page's noir) reads as a
            continuous surface with no seam. */}
        <motion.img
          src="/images/hero-angel.jpg"
          alt="A dark-winged figure in silhouette against gothic cathedral spires at night"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: '50% 50%', filter: 'brightness(0.86) saturate(0.85) contrast(1.08)' }}
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--noir) 0%, rgba(11,11,11,0.55) 30%, rgba(11,11,11,0.12) 62%, transparent 100%)',
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
          <Reveal>
            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.4em] text-rose/90">
              The Shop
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,9vw,7rem)] leading-[0.9] tracking-tight text-primary">
              Dress like the
              <br />
              rumour they whisper.
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-pretty text-base leading-relaxed text-silver/80">
              A wardrobe assembled for after dark — pieces that hang heavy,
              catch the light, and refuse to apologise.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <EnterChrome
              label="Browse the pieces"
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={scrollToPieces}
              data-cursor="hover"
              textClassName="text-xs"
              className="mt-9"
            />
          </Reveal>
        </div>
      </section>

      {/* Category tiles — hanging display */}
      <section id="shop-pieces" className="relative overflow-hidden pt-28 pb-6">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <div className="mb-10 text-center">
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                The Hanging Rail
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-primary sm:text-4xl">
                Reach for what calls you.
              </h2>
            </div>
          </Reveal>
        </div>

        {/* full-bleed: the backdrop photo should reach the browser edges,
            not stop at the max-w-7xl content column */}
        <section className="hc-stage" aria-label="Category display">
          <div className="hc-cluster">
              <div
                className="hc-charm hc-scatter hc-charm-ai"
                style={
                  {
                    '--hc-x': '31%',
                    '--hc-rot': '-3deg',
                    '--hc-shift': '2px',
                    '--hc-z': 4,
                    '--hc-scale': 1.62,
                    '--hc-ai-mask': 'url(/images/ChatGPT-new-leather-jacket-bubble.png)',
                    '--hc-hook-x': '32.26%',
                  } as CSSProperties
                }
              >
                <Chain drop={371} />
                <button
                  onClick={() => viewProduct('moto-jacket')}
                  data-cursor="hover"
                  className="hc-pair"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ChatGPT-new-leather-jacket-bubble.png"
                    alt="Jacket — Second skin, built to armour."
                    className="hc-ai-bubble"
                    fetchPriority="high"
                  />
                </button>
              </div>

              <div
                className="hc-charm hc-scatter hc-charm-ai"
                style={
                  {
                    '--hc-x': '59%',
                    '--hc-rot': '-4deg',
                    '--hc-shift': '4px',
                    '--hc-z': 2,
                    '--hc-scale': 1.39,
                    '--hc-ai-mask': 'url(/images/ChatGPT-new-slip-dress-bubble.png)',
                    '--hc-hook-x': '65.72%',
                  } as CSSProperties
                }
              >
                <Chain drop={487} />
                <button
                  onClick={() => viewProduct('slip-dress')}
                  data-cursor="hover"
                  className="hc-pair"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ChatGPT-new-slip-dress-bubble.png"
                    alt="One Piece — Nothing to coordinate."
                    className="hc-ai-bubble"
                    fetchPriority="high"
                  />
                </button>
              </div>

              <div
                className="hc-charm hc-scatter hc-charm-ai"
                style={
                  {
                    '--hc-x': '47%',
                    '--hc-rot': '-3deg',
                    '--hc-shift': '6px',
                    '--hc-z': 3,
                    '--hc-scale': 1.08,
                    '--hc-ai-mask': 'url(/images/ChatGPT-new-corset-bubble.png)',
                    '--hc-hook-x': '40.14%',
                  } as CSSProperties
                }
              >
                <Chain drop={662} />
                <button
                  onClick={() => viewProduct('corset')}
                  data-cursor="hover"
                  className="hc-pair"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ChatGPT-new-corset-bubble.png"
                    alt="Tops — Layers that hold their own."
                    className="hc-ai-bubble"
                    fetchPriority="high"
                  />
                </button>
              </div>

              <div
                className="hc-charm hc-scatter hc-charm-ai"
                style={
                  {
                    '--hc-x': '32%',
                    '--hc-rot': '4deg',
                    '--hc-shift': '-6px',
                    '--hc-z': 3,
                    '--hc-scale': 1.08,
                    '--hc-ai-mask': 'url(/images/ChatGPT-new-sets-bubble.png)',
                    '--hc-hook-x': '65.01%',
                  } as CSSProperties
                }
              >
                <Chain drop={756} />
                <button
                  onClick={() => viewProduct('bodysuit')}
                  data-cursor="hover"
                  className="hc-pair"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ChatGPT-new-sets-bubble.png"
                    alt="Sets — Coordinated pieces, worn as one."
                    className="hc-ai-bubble"
                    fetchPriority="high"
                  />
                </button>
              </div>

              <div
                className="hc-charm hc-scatter hc-charm-ai"
                style={
                  {
                    '--hc-x': '68%',
                    '--hc-rot': '3deg',
                    '--hc-shift': '-4px',
                    '--hc-z': 3,
                    '--hc-scale': 1.32,
                    '--hc-ai-mask': 'url(/images/ChatGPT-new-pants-bubble.png)',
                    '--hc-hook-x': '65.95%',
                  } as CSSProperties
                }
              >
                <Chain drop={733} />
                <button
                  onClick={() => viewProduct('leather-pants')}
                  data-cursor="hover"
                  className="hc-pair"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/ChatGPT-new-pants-bubble.png"
                    alt="Bottoms — Finishes the silhouette."
                    className="hc-ai-bubble"
                    fetchPriority="high"
                  />
                </button>
              </div>
            </div>
          </section>
      </section>
    </div>
  )
}
