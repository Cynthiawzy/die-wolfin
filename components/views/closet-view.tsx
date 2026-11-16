'use client'

import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/components/store'
import { Reveal } from '@/components/reveal'
import { EnterChrome } from '@/components/enter-chrome'
import './closet-charms.css'

export function ClosetView() {
  const { viewProduct, reducedMotion } = useStore()

  const scrollToPieces = () => {
    document.getElementById('shop-pieces')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Staggers each bubble's own fade-up as the grid scrolls into view,
  // rather than one Reveal around the whole grid — a wrapping div per
  // bubble would stop being a direct grid child, breaking the wide Sets
  // item's grid-column:1/-1 rule, which only applies to direct children.
  const bubbleReveal = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
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
            <motion.button
              {...bubbleReveal(0)}
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
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '73.5%',
                    ['--hc-label-y' as string]: '47.9%',
                    ['--hc-label-size' as string]: '9.05cqw',
                  } as CSSProperties
                }
              >
                Tops
              </span>
            </motion.button>

            <motion.button
              {...bubbleReveal(0.08)}
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
                style={{ transform: 'translateY(13.4px)' }}
                fetchPriority="high"
              />
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '71%',
                    ['--hc-label-y' as string]: '56.8%',
                    ['--hc-label-size' as string]: '6.78cqw',
                  } as CSSProperties
                }
              >
                One Piece
              </span>
            </motion.button>

            <motion.button
              {...bubbleReveal(0.16)}
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
                style={{ transform: 'translateY(1.7px)' }}
                fetchPriority="high"
              />
              <span
                aria-hidden="true"
                className="hc-heading-label"
                style={
                  {
                    ['--hc-label-x' as string]: '72.5%',
                    ['--hc-label-y' as string]: '57.4%',
                    ['--hc-label-size' as string]: '6.78cqw',
                  } as CSSProperties
                }
              >
                Jackets
              </span>
            </motion.button>

            <motion.button
              {...bubbleReveal(0.24)}
              onClick={() => viewProduct('leather-pants')}
              data-cursor="hover"
              className="hc-grid-item"
              style={
                {
                  ['--hc-ai-mask' as string]: "url('/images/Fashion BOTTOMS Tag with Flared Cargo Pants (no subtext).png')",
                  ['--hc-item-scale' as string]: 0.798,
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
                    ['--hc-label-x' as string]: '66%',
                    ['--hc-label-y' as string]: '50%',
                    ['--hc-label-size' as string]: '8.5cqw',
                  } as CSSProperties
                }
              >
                Bottoms
              </span>
            </motion.button>

            <motion.button
              {...bubbleReveal(0.32)}
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
                    ['--hc-label-size' as string]: '6.78cqw',
                  } as CSSProperties
                }
              >
                Sets
              </span>
            </motion.button>
          </div>
        </div>
      </section>
    </div>
  )
}
