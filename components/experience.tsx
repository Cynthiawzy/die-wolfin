'use client'

import { StoreProvider, useStore } from '@/components/store'
import { CustomCursor } from '@/components/custom-cursor'
import { SoundToggle } from '@/components/sound-toggle'
import { TransitionCurtain } from '@/components/transition-curtain'
import { SiteNav } from '@/components/site-nav'
import { CartDrawer } from '@/components/cart-drawer'
import { LandingView } from '@/components/views/landing-view'
import { ClosetView } from '@/components/views/closet-view'
import { ShopView } from '@/components/views/shop-view'
import { ProductView } from '@/components/views/product-view'
import { SiteFooter } from '@/components/site-footer'

function ViewRouter() {
  const { view } = useStore()

  // The full-screen curtain (see TransitionCurtain) already hides the swap
  // between views, so the page content itself switches instantly underneath
  // it rather than running its own crossfade — a second, independently timed
  // fade here was racing the curtain's and left a visible stutter as the
  // curtain lifted before the new page had finished fading in.
  return (
    <main>
      {view === 'landing' && <LandingView />}
      {view === 'closet' && <ClosetView />}
      {view === 'shop' && <ShopView />}
      {view === 'product' && <ProductView />}
      {view !== 'landing' && <SiteFooter />}
    </main>
  )
}

export function Experience() {
  return (
    <StoreProvider>
      <CustomCursor />
      <SoundToggle />
      <SiteNav />
      <ViewRouter />
      <CartDrawer />
      <TransitionCurtain />
    </StoreProvider>
  )
}
