'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { FilterKey, Product } from '@/lib/products'

export type View = 'landing' | 'closet' | 'shop' | 'product'

export type CartOptions = { size?: string; color?: string }
type CartLine = { product: Product; qty: number } & CartOptions

function lineKey(id: string, opts?: CartOptions) {
  return `${id}__${opts?.size ?? ''}__${opts?.color ?? ''}`
}

type StoreValue = {
  view: View
  navigate: (target: View) => void
  transitioning: boolean
  reducedMotion: boolean

  filter: FilterKey
  setFilter: (f: FilterKey) => void
  goToShop: (f?: FilterKey) => void

  selectedProductId: string | null
  viewProduct: (id: string) => void

  cart: CartLine[]
  cartCount: number
  subtotal: number
  addToCart: (p: Product, options?: CartOptions) => void
  removeFromCart: (id: string, options?: CartOptions) => void
  setQty: (id: string, qty: number, options?: CartOptions) => void

  cartOpen: boolean
  setCartOpen: (o: boolean) => void
}

const StoreContext = createContext<StoreValue | null>(null)

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return reduced
}

const TRANSITION_MS = 800

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = usePrefersReducedMotion()
  const [view, setView] = useState<View>('landing')
  const [transitioning, setTransitioning] = useState(false)
  const [filter, setFilter] = useState<FilterKey>('All')
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [cart, setCart] = useState<CartLine[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const timer = useRef<number | null>(null)

  // toggle custom-cursor body class only for fine pointers + motion allowed
  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (fine && !reducedMotion) {
      document.body.classList.add('wolf-cursor')
    } else {
      document.body.classList.remove('wolf-cursor')
    }
    return () => document.body.classList.remove('wolf-cursor')
  }, [reducedMotion])

  const navigate = useCallback(
    (target: View) => {
      setCartOpen(false)
      if (target === view) return
      if (reducedMotion) {
        setView(target)
        window.scrollTo(0, 0)
        return
      }
      setTransitioning(true)
      if (timer.current) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        setView(target)
        window.scrollTo(0, 0)
        setTransitioning(false)
      }, TRANSITION_MS)
    },
    [view, reducedMotion],
  )

  const goToShop = useCallback(
    (f?: FilterKey) => {
      if (f) setFilter(f)
      navigate('shop')
    },
    [navigate],
  )

  const viewProduct = useCallback(
    (id: string) => {
      setSelectedProductId(id)
      navigate('product')
    },
    [navigate],
  )

  const addToCart = useCallback((p: Product, options?: CartOptions) => {
    setCart((prev) => {
      const key = lineKey(p.id, options)
      const found = prev.find((l) => lineKey(l.product.id, l) === key)
      if (found) {
        return prev.map((l) =>
          lineKey(l.product.id, l) === key ? { ...l, qty: l.qty + 1 } : l,
        )
      }
      return [...prev, { product: p, qty: 1, ...options }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id: string, options?: CartOptions) => {
    const key = lineKey(id, options)
    setCart((prev) => prev.filter((l) => lineKey(l.product.id, l) !== key))
  }, [])

  const setQty = useCallback((id: string, qty: number, options?: CartOptions) => {
    const key = lineKey(id, options)
    setCart((prev) =>
      prev
        .map((l) =>
          lineKey(l.product.id, l) === key ? { ...l, qty: Math.max(0, qty) } : l,
        )
        .filter((l) => l.qty > 0),
    )
  }, [])

  const cartCount = useMemo(
    () => cart.reduce((n, l) => n + l.qty, 0),
    [cart],
  )
  const subtotal = useMemo(
    () =>
      cart.reduce(
        (n, l) => n + (l.product.salePrice ?? l.product.price) * l.qty,
        0,
      ),
    [cart],
  )

  useEffect(() => {
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [])

  const value: StoreValue = {
    view,
    navigate,
    transitioning,
    reducedMotion,
    filter,
    setFilter,
    goToShop,
    selectedProductId,
    viewProduct,
    cart,
    cartCount,
    subtotal,
    addToCart,
    removeFromCart,
    setQty,
    cartOpen,
    setCartOpen,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
