'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useStore } from '@/components/store'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const { view, navigate, cartCount, setCartOpen } = useStore()
  const show = view !== 'landing'

  // 'closet' is the shop now — it's the sole browsing destination, and
  // 'product' (reached by clicking a piece) still counts as "in the shop"
  // for the active-link underline.
  const shopActive = view === 'closet' || view === 'product'

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 top-0 z-[60]"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noir via-noir/80 to-transparent" />
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-5 sm:px-8">
            <button
              onClick={() => navigate('landing')}
              className="group flex shrink-0 items-center gap-2"
              aria-label="Return to the doors"
            >
              <span className="whitespace-nowrap font-serif text-base tracking-[0.06em] text-primary transition-colors group-hover:text-rose sm:text-lg sm:tracking-[0.12em]">
                Die Wölfin
              </span>
            </button>

            <div className="flex items-center gap-4 sm:gap-9">
              <button
                onClick={() => navigate('closet')}
                className={cn(
                  'group relative whitespace-nowrap text-[0.6rem] font-medium uppercase tracking-[0.16em] transition-colors sm:text-[0.7rem] sm:tracking-[0.28em]',
                  shopActive ? 'text-rose' : 'text-silver hover:text-primary',
                )}
              >
                The Shop
                <span
                  className={cn(
                    'absolute -bottom-1.5 left-0 h-px bg-rose transition-all duration-300',
                    shopActive ? 'w-full' : 'w-0 group-hover:w-full',
                  )}
                />
              </button>

              <button
                onClick={() => setCartOpen(true)}
                className="-m-[13px] flex items-center p-[13px] text-silver transition-colors hover:text-primary"
                aria-label={`Open bag, ${cartCount} items`}
              >
                <span className="relative flex">
                  <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.4} />
                  {cartCount > 0 && (
                    <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose px-1 font-sans text-[0.6rem] font-semibold text-accent-foreground">
                      {cartCount}
                    </span>
                  )}
                </span>
              </button>
            </div>
          </nav>
        </motion.header>
      )}
    </AnimatePresence>
  )
}
