'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus, X } from 'lucide-react'
import { useStore } from '@/components/store'
import { formatPrice } from '@/lib/products'

export function CartDrawer() {
  const {
    cart,
    cartOpen,
    setCartOpen,
    subtotal,
    setQty,
    removeFromCart,
    cartCount,
  } = useStore()

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[90] bg-noir/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-[95] flex w-full max-w-md flex-col border-l border-border bg-[#0e0e0e]"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <h2 className="font-serif text-lg tracking-[0.3em] text-primary">
                THE BAG
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                aria-label="Close bag"
                className="text-silver transition-colors hover:text-rose"
              >
                <X className="h-5 w-5" strokeWidth={1.4} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
                <p className="font-serif text-xl text-silver">Nothing chosen yet.</p>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  The wardrobe waits behind the doors. Take something that
                  frightens you a little.
                </p>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-4">
                <ul className="flex flex-col divide-y divide-border">
                  {cart.map((line) => {
                    const unit = line.product.salePrice ?? line.product.price
                    const variant = [line.size, line.color]
                      .filter(Boolean)
                      .join(' · ')
                    return (
                      <li
                        key={`${line.product.id}-${line.size ?? ''}-${line.color ?? ''}`}
                        className="flex gap-4 py-5"
                      >
                        <div className="h-24 w-20 shrink-0 overflow-hidden bg-charcoal">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={line.product.image || '/placeholder.svg'}
                            alt={line.product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between gap-2">
                            <div>
                              <p className="font-serif text-base leading-tight text-primary">
                                {line.product.name}
                              </p>
                              <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                                {line.product.category}
                              </p>
                              {variant && (
                                <p className="mt-0.5 text-[0.65rem] uppercase tracking-[0.2em] text-silver/70">
                                  {variant}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() =>
                                removeFromCart(line.product.id, line)
                              }
                              aria-label={`Remove ${line.product.name}`}
                              className="h-fit text-muted-foreground transition-colors hover:text-rose"
                            >
                              <X className="h-4 w-4" strokeWidth={1.4} />
                            </button>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-border">
                              <button
                                onClick={() =>
                                  setQty(line.product.id, line.qty - 1, line)
                                }
                                aria-label="Decrease quantity"
                                className="flex h-8 w-8 items-center justify-center text-silver transition-colors hover:text-rose"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="w-8 text-center text-sm text-primary">
                                {line.qty}
                              </span>
                              <button
                                onClick={() =>
                                  setQty(line.product.id, line.qty + 1, line)
                                }
                                aria-label="Increase quantity"
                                className="flex h-8 w-8 items-center justify-center text-silver transition-colors hover:text-rose"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                            <span className="font-sans text-sm text-silver">
                              {formatPrice(unit * line.qty)}
                            </span>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-border px-6 py-6">
                <div className="flex items-center justify-between pb-4">
                  <span className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                    Subtotal · {cartCount} {cartCount === 1 ? 'piece' : 'pieces'}
                  </span>
                  <span className="font-serif text-xl text-primary">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <button className="group relative w-full overflow-hidden border border-rose/60 bg-rose py-4 text-[0.72rem] font-semibold uppercase tracking-[0.3em] text-accent-foreground transition-colors">
                  <span className="relative z-10">Proceed to Ritual</span>
                </button>
                <p className="mt-3 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                  Shipping &amp; taxes divined at checkout
                </p>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
