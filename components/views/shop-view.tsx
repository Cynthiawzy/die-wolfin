'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useStore } from '@/components/store'
import { Reveal } from '@/components/reveal'
import { FramedProduct } from '@/components/framed-product'
import {
  FILTERS,
  PRODUCTS,
  filterProducts,
  formatPrice,
} from '@/lib/products'
import { cn } from '@/lib/utils'

export function ShopView() {
  const { filter, setFilter, addToCart, viewProduct, reducedMotion } = useStore()
  const products = filterProducts(PRODUCTS, filter)

  return (
    <div className="mx-auto max-w-7xl px-5 pb-28 pt-28 sm:px-8 sm:pt-32">
      {/* Header */}
      <Reveal>
        <p className="mb-3 text-[0.65rem] uppercase tracking-[0.4em] text-rose/90">
          The Shop
        </p>
        <h1 className="max-w-3xl font-serif text-[clamp(2.5rem,7vw,5rem)] leading-[0.92] tracking-tight text-primary">
          Everything, laid bare.
        </h1>
        <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-silver/80">
          The complete collection. Filter by room, or take it all in at once —
          each piece made in small, deliberate numbers.
        </p>
      </Reveal>

      {/* Filters */}
      <div className="sticky top-0 z-30 -mx-5 mt-12 bg-noir/85 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-b border-border pb-4">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'relative pb-1 text-[0.7rem] font-medium uppercase tracking-[0.24em] transition-colors',
                filter === f
                  ? 'text-rose'
                  : 'text-muted-foreground hover:text-primary',
              )}
            >
              {f}
              {filter === f && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute -bottom-[17px] left-0 h-px w-full bg-rose"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {products.map((p, i) => {
            const price = p.salePrice ?? p.price
            return (
              <motion.article
                key={p.id}
                layout={!reducedMotion}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{
                  duration: 0.5,
                  delay: reducedMotion ? 0 : Math.min(i * 0.04, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group cursor-pointer"
                role="button"
                tabIndex={0}
                data-cursor="hover"
                onClick={() => viewProduct(p.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    viewProduct(p.id)
                  }
                }}
              >
                <div className="relative mb-4">
                  <FramedProduct
                    image={p.image}
                    alt={p.name}
                    imageClassName="group-hover:scale-105"
                  />

                  {/* tags */}
                  <div className="absolute left-3 top-3 flex flex-col gap-1">
                    {p.sale && (
                      <span className="bg-rose px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                        Sale
                      </span>
                    )}
                    {p.preorder && (
                      <span className="bg-noir/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-rose">
                        Pre-order
                      </span>
                    )}
                    {p.archive && (
                      <span className="border border-silver/40 bg-noir/70 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-silver">
                        Archive
                      </span>
                    )}
                  </div>

                  {/* add to cart */}
                  <div className="absolute inset-x-0 bottom-[9%] translate-y-full px-[18%] transition-transform duration-500 ease-out group-hover:translate-y-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        addToCart(p)
                      }}
                      data-cursor="hover"
                      className="flex w-full items-center justify-center gap-2 border border-rose/60 bg-noir/90 py-3 text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-primary backdrop-blur-sm transition-colors hover:bg-rose hover:text-accent-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      {p.preorder ? 'Reserve' : 'Add to bag'}
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-base leading-tight text-primary transition-colors group-hover:text-rose">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                      {p.category}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    {p.salePrice ? (
                      <>
                        <p className="text-sm text-rose">
                          {formatPrice(p.salePrice)}
                        </p>
                        <p className="text-[0.7rem] text-muted-foreground line-through">
                          {formatPrice(p.price)}
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-silver">{formatPrice(price)}</p>
                    )}
                  </div>
                </div>

                <p className="mt-2 text-[0.72rem] leading-relaxed text-muted-foreground">
                  {p.blurb}
                </p>
              </motion.article>
            )
          })}
        </AnimatePresence>
      </div>

      {products.length === 0 && (
        <div className="py-32 text-center">
          <p className="font-serif text-2xl text-silver">This room is empty.</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Nothing here for now. Try another door.
          </p>
        </div>
      )}
    </div>
  )
}
