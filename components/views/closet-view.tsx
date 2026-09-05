'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useStore } from '@/components/store'
import { Reveal } from '@/components/reveal'
import { PRODUCTS, formatPrice, type FilterKey } from '@/lib/products'
import { EnterChrome } from '@/components/enter-chrome'

const CATEGORY_TILES: {
  label: string
  sub: string
  image: string
  filter: FilterKey
  span: string
}[] = [
  {
    label: 'Clothing',
    sub: 'Corsetry · slips · leather',
    image: '/images/cat-clothing.png',
    filter: 'Clothing',
    span: 'sm:col-span-2 sm:row-span-2',
  },
  {
    label: 'Shoes',
    sub: 'Platforms · heels',
    image: '/images/cat-shoes.png',
    filter: 'Shoes',
    span: '',
  },
  {
    label: 'Accessories',
    sub: 'Hardware · relics',
    image: '/images/cat-accessories.png',
    filter: 'Accessories',
    span: '',
  },
  {
    label: 'The Archive',
    sub: 'Rare · numbered',
    image: '/images/cat-archive.png',
    filter: 'Archive',
    span: 'sm:col-span-2',
  },
  {
    label: 'On Sale',
    sub: 'Marked down · final',
    image: '/images/cat-sale.png',
    filter: 'Sale',
    span: 'sm:col-span-2',
  },
]

export function ClosetView() {
  const { goToShop, navigate, viewProduct } = useStore()
  const hangers = PRODUCTS.filter((p) =>
    ['moto-jacket', 'slip-dress', 'corset', 'leather-pants', 'fur-coat'].includes(
      p.id,
    ),
  )

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative flex min-h-[92vh] items-end overflow-hidden">
        <motion.img
          src="/images/closet-bg.png"
          alt="A dim, gothic atelier hallway lit by a single chandelier"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/40 to-noir/70" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8">
          <Reveal>
            <p className="mb-4 text-[0.65rem] uppercase tracking-[0.4em] text-rose/90">
              Your Private Closet
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
              label="Enter the shop"
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={() => goToShop('All')}
              data-cursor="hover"
              textClassName="text-xs"
              className="mt-9"
            />
          </Reveal>
        </div>
      </section>

      {/* Hanging rail */}
      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6 border-b border-border pb-6">
            <div>
              <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
                Currently Hanging
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-primary sm:text-4xl">
                On the rail
              </h2>
            </div>
            <button
              onClick={() => goToShop('All')}
              className="hidden shrink-0 text-[0.7rem] uppercase tracking-[0.28em] text-silver transition-colors hover:text-rose sm:inline"
            >
              See all
            </button>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {hangers.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <button
                onClick={() => viewProduct(p.id)}
                data-cursor="hover"
                className="group block w-full text-left"
              >
                <div className="relative mb-4 aspect-[3/4] overflow-hidden bg-charcoal">
                  {/* the hook of the hanger */}
                  <span className="absolute left-1/2 top-0 z-10 h-6 w-px -translate-x-1/2 bg-silver/30" />
                  <span className="absolute left-1/2 top-6 z-10 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-silver/40" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    className="h-full w-full origin-top object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] group-hover:rotate-[0.6deg]"
                  />
                  {p.preorder && (
                    <span className="absolute right-2 top-2 z-10 bg-noir/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.2em] text-rose">
                      Pre-order
                    </span>
                  )}
                </div>
                <p className="font-serif text-base leading-tight text-primary transition-colors group-hover:text-rose">
                  {p.name}
                </p>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.2em] text-muted-foreground">
                  {formatPrice(p.salePrice ?? p.price)}
                </p>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Category tiles */}
      <section className="mx-auto max-w-7xl px-5 pb-28 sm:px-8">
        <Reveal>
          <div className="mb-12">
            <p className="mb-2 text-[0.65rem] uppercase tracking-[0.35em] text-muted-foreground">
              Wander By Room
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-primary sm:text-4xl">
              Choose your descent
            </h2>
          </div>
        </Reveal>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-4">
          {CATEGORY_TILES.map((tile, i) => (
            <Reveal key={tile.label} delay={i * 0.06} className={tile.span}>
              <button
                onClick={() => goToShop(tile.filter)}
                data-cursor="hover"
                className="group relative h-full w-full overflow-hidden bg-charcoal text-left"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tile.image || '/placeholder.svg'}
                  alt=""
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/90 via-noir/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <h3 className="font-serif text-2xl tracking-tight text-primary transition-colors group-hover:text-rose">
                      {tile.label}
                    </h3>
                    <ArrowRight className="h-4 w-4 -translate-x-3 text-rose opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                  </div>
                  <p className="mt-1 text-[0.7rem] uppercase tracking-[0.24em] text-silver/80">
                    {tile.sub}
                  </p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Closing invitation */}
      <section className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 py-24 text-center sm:px-8">
          <Reveal>
            <h2 className="max-w-2xl text-balance font-serif text-4xl leading-tight tracking-tight text-primary sm:text-5xl">
              The full collection is waiting in the shop.
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <EnterChrome
              label="Enter the shop"
              icon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate('shop')}
              data-cursor="hover"
              textClassName="text-xs"
            />
          </Reveal>
        </div>
      </section>
    </div>
  )
}
