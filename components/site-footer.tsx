'use client'

import { useStore } from '@/components/store'

export function SiteFooter() {
  const { navigate, viewProduct } = useStore()

  return (
    <footer className="dot-texture border-t border-border bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <p className="font-serif text-3xl tracking-[0.1em] text-primary">
              Die Wölfin
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              A dark couture house. Everything made in small numbers, then
              never again. Join the list — we only whisper.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-6 flex max-w-xs items-center border-b border-border pb-2"
            >
              <input
                type="email"
                required
                placeholder="your@email.com"
                aria-label="Email address"
                className="w-full bg-transparent text-sm text-primary placeholder:text-muted-foreground focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-[0.65rem] uppercase tracking-[0.28em] text-rose transition-opacity hover:opacity-70"
              >
                Join
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FootCol title="Rooms">
              <FootLink onClick={() => viewProduct('corset')}>Clothing</FootLink>
              <FootLink onClick={() => viewProduct('moto-jacket')}>
                Outerwear
              </FootLink>
              <FootLink onClick={() => viewProduct('slip-dress')}>On Sale</FootLink>
            </FootCol>
            <FootCol title="House">
              <FootLink onClick={() => navigate('closet')}>The Shop</FootLink>
              <FootLink onClick={() => navigate('landing')}>The Doors</FootLink>
            </FootCol>
            <FootCol title="Care">
              <FootLink>Shipping</FootLink>
              <FootLink>Returns</FootLink>
              <FootLink>Contact</FootLink>
            </FootCol>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground sm:flex-row sm:items-center">
          <span>© MMXXVI Die Wölfin Maison. All rights reserved.</span>
          <span>Made after dark.</span>
        </div>
      </div>
    </footer>
  )
}

function FootCol({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-4 text-[0.65rem] uppercase tracking-[0.28em] text-silver">
        {title}
      </p>
      <ul className="flex flex-col gap-2.5">{children}</ul>
    </div>
  )
}

function FootLink({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <li>
      <button
        onClick={onClick}
        className="text-sm text-muted-foreground transition-colors hover:text-rose"
      >
        {children}
      </button>
    </li>
  )
}
