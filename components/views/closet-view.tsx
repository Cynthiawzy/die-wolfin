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
      {/* Shared backdrop: the atelier photo + fade spans from the hero all the
          way down through the category section, so there's no hard seam where
          the hero ends and the hanging-charm display begins. */}
      <motion.img
        src="/images/closet-bg.png"
        alt="A dim atelier hallway lit by a single chandelier"
        className="absolute inset-0 h-full w-full object-cover object-top"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, transparent 0%, rgba(11,11,11,0.55) 55vh, var(--noir) 92vh, var(--noir) 100%)',
        }}
      />

      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <div className="hero-wall" aria-hidden="true" />
        <div className="hero-wall hero-wall-right" aria-hidden="true" />
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
      <section id="shop-pieces" className="relative overflow-hidden py-28">
        <div className="hc-wall hc-left" aria-hidden="true" />
        <div className="hc-wall hc-right" aria-hidden="true" />
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

        {/* full-bleed: the wall panels should reach the browser edges, not
            stop at the max-w-7xl content column */}
        <section className="hc-stage" aria-label="Category display">
          <div className="hc-cluster">
              <button
                onClick={() => viewProduct('moto-jacket')}
                data-cursor="hover"
                className="hc-charm hc-scatter"
                style={
                  {
                    '--hc-x': '14%',
                    '--hc-rot': '-3deg',
                    '--hc-shift': '2px',
                    '--hc-z': 4,
                    '--hc-scale': 1,
                  } as CSSProperties
                }
              >
                <Chain drop={362} />
                <span className="hc-pair">
                  <span className="hc-bubble hc-has-tile">
                    <span className="hc-tile">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/p-moto-jacket-cleaned-up.png" alt="Rite Leather Moto jacket" fetchPriority="high" />
                    </span>
                    <span className="hc-text-block">
                      <span className="hc-name font-serif">Jacket</span>
                      <span className="hc-sub">Second skin, built to armour.</span>
                    </span>
                    <span className="hc-tail" aria-hidden="true" />
                  </span>
                </span>
              </button>

              <button
                onClick={() => viewProduct('corset')}
                data-cursor="hover"
                className="hc-charm hc-scatter"
                style={
                  {
                    '--hc-x': '66%',
                    '--hc-rot': '-4deg',
                    '--hc-shift': '4px',
                    '--hc-z': 2,
                    '--hc-scale': 1.16,
                  } as CSSProperties
                }
              >
                <Chain drop={382} />
                <span className="hc-pair">
                  <span className="hc-bubble hc-has-orb">
                    <span className="hc-text-block">
                      <span className="hc-name font-serif">Tops</span>
                      <span className="hc-sub">Layers that hold their own.</span>
                    </span>
                    <span className="hc-orb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/p-corset-cleaned-up.png" alt="Vespera Lace Corset" fetchPriority="high" />
                    </span>
                    <span className="hc-tail hc-right" aria-hidden="true" />
                  </span>
                </span>
              </button>

              <button
                onClick={() => viewProduct('leather-pants')}
                data-cursor="hover"
                className="hc-charm hc-scatter"
                style={
                  {
                    '--hc-x': '38%',
                    '--hc-rot': '-3deg',
                    '--hc-shift': '6px',
                    '--hc-z': 3,
                    '--hc-scale': 0.9,
                  } as CSSProperties
                }
              >
                <Chain drop={572} />
                <span className="hc-pair">
                  <span className="hc-bubble hc-has-tile-r">
                    <span className="hc-text-block">
                      <span className="hc-name font-serif">Bottoms</span>
                      <span className="hc-sub">Finishes the silhouette.</span>
                    </span>
                    <span className="hc-tile hc-contained">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/p-leather-pants-cleaned-up.png" alt="Onyx Leather Trouser" fetchPriority="high" />
                    </span>
                    <span className="hc-tail" aria-hidden="true" />
                  </span>
                </span>
              </button>

              <button
                onClick={() => viewProduct('bodysuit')}
                data-cursor="hover"
                className="hc-charm hc-scatter"
                style={
                  {
                    '--hc-x': '12%',
                    '--hc-rot': '4deg',
                    '--hc-shift': '-6px',
                    '--hc-z': 3,
                    '--hc-scale': 0.9,
                  } as CSSProperties
                }
              >
                <Chain drop={900} />
                <span className="hc-pair">
                  <span className="hc-bubble hc-has-tile hc-tight">
                    <span className="hc-tile hc-tops">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/p-bodysuit-cleaned-up.png" alt="Seraph Lace Bodysuit" fetchPriority="high" />
                    </span>
                    <span className="hc-text-block">
                      <span className="hc-name font-serif">Sets</span>
                      <span className="hc-sub">Coordinated pieces, worn as one.</span>
                    </span>
                    <span className="hc-tail hc-right" aria-hidden="true" />
                  </span>
                </span>
              </button>

              <button
                onClick={() => viewProduct('slip-dress')}
                data-cursor="hover"
                className="hc-charm hc-scatter"
                style={
                  {
                    '--hc-x': '78%',
                    '--hc-rot': '3deg',
                    '--hc-shift': '-4px',
                    '--hc-z': 3,
                    '--hc-scale': 1.1,
                  } as CSSProperties
                }
              >
                <Chain drop={715} />
                <span className="hc-pair">
                  <span className="hc-bubble hc-pill hc-has-orb">
                    <span className="hc-text-block">
                      <span className="hc-name font-serif">One&nbsp;Piece</span>
                      <span className="hc-sub">Nothing to coordinate.</span>
                    </span>
                    <span className="hc-orb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/images/p-slip-dress-cleaned-up.png" alt="Nocturne Satin Slip" fetchPriority="high" />
                    </span>
                    <span className="hc-tail" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </div>
          </section>
      </section>
    </div>
  )
}
