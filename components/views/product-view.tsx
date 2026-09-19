'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Plus } from 'lucide-react'
import { useStore } from '@/components/store'
import { Reveal } from '@/components/reveal'
import { getProduct, formatPrice } from '@/lib/products'

export function ProductView() {
  const { selectedProductId, navigate, addToCart } = useStore()
  const product = selectedProductId ? getProduct(selectedProductId) : undefined

  const [size, setSize] = useState<string | null>(null)
  const [color, setColor] = useState<string | null>(null)
  const [showHint, setShowHint] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-5 py-32 text-center sm:px-8">
        <p className="font-serif text-2xl text-silver">This piece has gone missing.</p>
        <button
          onClick={() => navigate('closet')}
          data-cursor="hover"
          className="mt-2 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-primary transition-colors hover:text-rose"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to the shop
        </button>
      </div>
    )
  }

  const price = product.salePrice ?? product.price
  const needsSize = !!product.sizes?.length
  const needsColor = !!product.colors?.length
  const ready = (!needsSize || size) && (!needsColor || color)

  const handleAddToCart = () => {
    if (!ready) {
      setShowHint(true)
      return
    }
    addToCart(product, {
      size: size ?? undefined,
      color: color ?? undefined,
    })
  }

  return (
    <div className="dot-texture mx-auto max-w-7xl px-5 pb-28 pt-28 sm:px-8 sm:pt-32">
      <Reveal>
        <button
          onClick={() => navigate('closet')}
          data-cursor="hover"
          className="group mb-10 inline-flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-rose"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to the shop
        </button>
      </Reveal>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <div className="relative aspect-[3/4] overflow-hidden bg-charcoal lg:sticky lg:top-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.image || '/placeholder.svg'}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute left-3 top-3 flex flex-col gap-1">
              {product.sale && (
                <span className="bg-rose px-2 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.18em] text-accent-foreground">
                  Sale
                </span>
              )}
              {product.preorder && (
                <span className="bg-noir/80 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-rose">
                  Pre-order
                </span>
              )}
              {product.archive && (
                <span className="border border-silver/40 bg-noir/70 px-2 py-1 text-[0.55rem] uppercase tracking-[0.18em] text-silver">
                  Archive
                </span>
              )}
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal delay={0.05}>
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-rose/90">
              {product.category}
            </p>
            <h1 className="mt-3 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-primary">
              {product.name}
            </h1>
            <div className="mt-4 flex items-center gap-3">
              {product.salePrice ? (
                <>
                  <span className="text-xl text-rose">
                    {formatPrice(product.salePrice)}
                  </span>
                  <span className="text-base text-muted-foreground line-through">
                    {formatPrice(product.price)}
                  </span>
                </>
              ) : (
                <span className="text-xl text-silver">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-pretty text-sm leading-relaxed text-silver/80">
              {product.description ?? product.blurb}
            </p>
          </Reveal>

          {needsSize && (
            <Reveal delay={0.15}>
              <div className="mt-9">
                <p className="mb-3 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Size{size ? ` · ${size}` : ''}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes!.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        setSize(s)
                        setShowHint(false)
                      }}
                      data-cursor="hover"
                      className={`min-h-11 min-w-11 border px-3 py-2.5 text-[0.7rem] uppercase tracking-[0.15em] transition-colors ${
                        size === s
                          ? 'border-rose bg-rose/10 text-primary'
                          : 'border-border text-silver hover:border-silver'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {needsColor && (
            <Reveal delay={0.2}>
              <div className="mt-7">
                <p className="mb-3 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground">
                  Color{color ? ` · ${color}` : ''}
                </p>
                <div className="flex flex-wrap">
                  {product.colors!.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setColor(c.name)
                        setShowHint(false)
                      }}
                      data-cursor="hover"
                      aria-label={c.name}
                      className="flex h-11 w-11 items-center justify-center"
                    >
                      <span
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          color === c.name
                            ? 'border-rose scale-110'
                            : 'border-transparent hover:border-silver/50'
                        }`}
                        style={{
                          backgroundColor: c.hex,
                          boxShadow: '0 0 0 1px rgba(255,255,255,0.18)',
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.25}>
            <motion.button
              onClick={handleAddToCart}
              data-cursor="hover"
              whileTap={{ scale: 0.98 }}
              className="group mt-10 flex w-full max-w-sm items-center justify-center gap-2 border border-rose/60 bg-rose py-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-accent-foreground transition-colors hover:bg-rose/90"
            >
              <Plus className="h-3.5 w-3.5" />
              {product.preorder ? 'Reserve this piece' : 'Add to bag'}
            </motion.button>
            {showHint && (
              <p className="mt-3 text-[0.7rem] uppercase tracking-[0.2em] text-rose">
                {needsSize && !size
                  ? 'Select a size to continue.'
                  : 'Select a color to continue.'}
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  )
}
