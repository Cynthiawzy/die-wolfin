'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/components/store'
import { Reveal } from '@/components/reveal'
import { EnterChrome } from '@/components/enter-chrome'
import './closet-charms.css'

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
          <Reveal delay={0.1}>
            <h1 className="max-w-4xl font-serif text-[clamp(2.75rem,9vw,7rem)] leading-[0.9] tracking-tight text-primary">
              The Collection
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
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
        {/* Client-requested redesign: a plain 2-column grid of speech
            bubbles (paired, with the odd one out centered on its own row),
            replacing the hanging-from-chains scatter display — on both
            desktop and mobile, per the reference. Still using the current
            five bubble images as placeholders; swap the src/alt pairs below
            once the client's new artwork is in. */}
        <div className="hc-grid-stage" aria-label="Category display">
          <div className="hc-grid">
            <button
              onClick={() => viewProduct('corset')}
              data-cursor="hover"
              className="hc-grid-item"
              style={
                {
                  ['--hc-ai-mask' as string]: "url('/images/Glossy Corset Tops Fashion Tag (transparent).png')",
                  ['--hc-item-scale' as string]: 0.75,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Glossy Corset Tops Fashion Tag (transparent).png"
                alt="Tops"
                className="hc-ai-bubble"
                fetchPriority="high"
              />
            </button>

            <button
              onClick={() => viewProduct('slip-dress')}
              data-cursor="hover"
              className="hc-grid-item"
              style={{ ['--hc-ai-mask' as string]: "url('/images/One Piece Fashion Sticker (no subtext).png')" } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/One Piece Fashion Sticker (no subtext).png"
                alt="One Piece"
                className="hc-ai-bubble"
                fetchPriority="high"
              />
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '71%',
                    ['--hc-label-y' as string]: '56.8%',
                    ['--hc-label-size' as string]: '7.5cqw',
                  } as CSSProperties
                }
              >
                One Piece
              </span>
            </button>

            <button
              onClick={() => viewProduct('moto-jacket')}
              data-cursor="hover"
              className="hc-grid-item"
              style={{ ['--hc-ai-mask' as string]: "url('/images/Jackets_ Second Skin, Built to Armour (no subtext).png')" } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Jackets_ Second Skin, Built to Armour (no subtext).png"
                alt="Jackets"
                className="hc-ai-bubble"
                fetchPriority="high"
              />
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '72.5%',
                    ['--hc-label-y' as string]: '57.4%',
                    ['--hc-label-size' as string]: '7.8cqw',
                  } as CSSProperties
                }
              >
                Jackets
              </span>
            </button>

            <button
              onClick={() => viewProduct('leather-pants')}
              data-cursor="hover"
              className="hc-grid-item"
              style={
                {
                  ['--hc-ai-mask' as string]: "url('/images/Fashion BOTTOMS Tag with Flared Cargo Pants (no subtext).png')",
                  ['--hc-item-scale' as string]: 0.69,
                } as CSSProperties
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Fashion BOTTOMS Tag with Flared Cargo Pants (no subtext).png"
                alt="Bottoms"
                className="hc-ai-bubble"
                fetchPriority="high"
              />
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '65%',
                    ['--hc-label-y' as string]: '50%',
                    ['--hc-label-size' as string]: '9cqw',
                  } as CSSProperties
                }
              >
                Bottoms
              </span>
            </button>

            <button
              onClick={() => viewProduct('bodysuit')}
              data-cursor="hover"
              className="hc-grid-item hc-grid-item-wide"
              style={{ ['--hc-ai-mask' as string]: "url('/images/Gothic Fashion Sets Pendant Badge (no subtext).png')" } as CSSProperties}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/Gothic Fashion Sets Pendant Badge (no subtext).png"
                alt="Sets"
                className="hc-ai-bubble"
                fetchPriority="high"
              />
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '67.2%',
                    ['--hc-label-y' as string]: '57.3%',
                    ['--hc-label-size' as string]: '9.5cqw',
                  } as CSSProperties
                }
              >
                Sets
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
