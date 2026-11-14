// category is a plain string, not a fixed union: it comes straight from
// each Shopify product's productType field, which the client sets freely
// in their own admin — the app has no say over what values exist.
export type Product = {
  id: string
  name: string
  category: string
  price: number
  image: string
  blurb: string
  description?: string
  preorder?: boolean
  sale?: boolean
  salePrice?: number
  archive?: boolean
  sizes?: string[]
}

export type FilterKey =
  | 'All'
  | 'Clothing'
  | 'Outerwear'
  | 'Shoes'
  | 'Accessories'
  | 'Beauty'
  | 'Archive'
  | 'Sale'

// Shoes, Accessories, and Beauty aren't part of the initial launch catalog,
// and no current piece is archive-tagged — all left out of this list (which
// drives the visible filter pills) rather than removed from the FilterKey
// type, so bringing one back later is just a client-side change, nothing to
// do with what's in Shopify. Clothing is left out too: with no other
// apparel category live yet, every piece not tagged Outerwear already
// reads as "clothing," so a dedicated pill for it was redundant.
export const FILTERS: FilterKey[] = ['All', 'Outerwear', 'Sale']

export function filterProducts(products: Product[], filter: FilterKey): Product[] {
  if (filter === 'All') return products
  if (filter === 'Archive') return products.filter((p) => p.archive)
  if (filter === 'Sale') return products.filter((p) => p.sale)
  return products.filter((p) => p.category === filter)
}

export function getProduct(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function formatPrice(n: number): string {
  return '$' + n.toLocaleString('en-US')
}
