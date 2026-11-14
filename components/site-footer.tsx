'use client'

export function SiteFooter() {
  return (
    <footer className="dot-texture border-t border-border bg-[#0a0a0a]">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="flex flex-col justify-between gap-12 md:flex-row">
          <div className="max-w-sm">
            <p className="font-serif text-3xl tracking-[0.1em] text-primary">
              Die Wölfin
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Join the list for updates on new pieces and restocks.
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

          <ul className="flex flex-col gap-2.5 sm:flex-row sm:gap-8">
            <FootLink>Shipping</FootLink>
            <FootLink>Returns</FootLink>
            <FootLink>Contact</FootLink>
          </ul>
        </div>

        <div className="mt-14 border-t border-border pt-6 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
          <span>© MMXXVI Die Wölfin Maison. All rights reserved.</span>
        </div>
      </div>
    </footer>
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
