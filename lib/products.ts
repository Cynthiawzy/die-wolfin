export type Category =
  | 'Clothing'
  | 'Outerwear'
  | 'Shoes'
  | 'Accessories'
  | 'Beauty'

export type ProductColor = { name: string; hex: string }

export type Product = {
  id: string
  name: string
  category: Category
  price: number
  image: string
  blurb: string
  description?: string
  preorder?: boolean
  sale?: boolean
  salePrice?: number
  archive?: boolean
  sizes?: string[]
  colors?: ProductColor[]
}

const CLOTHING_SIZES = ['XS', 'S', 'M', 'L', 'XL']

export const PRODUCTS: Product[] = [
  {
    id: 'moto-jacket',
    name: 'Rite Leather Moto',
    category: 'Outerwear',
    price: 1980,
    image: '/images/p-moto-jacket.png',
    blurb: 'Hand-waxed lambskin. Asymmetric zip. Cut to armour the wearer.',
    description:
      'Hand-waxed lambskin over a structured canvas underlay, cut close through the shoulder and asymmetric at the zip. Hardware is solid brass, aged before it ever leaves the atelier. Each piece is broken in by hand so it already moves like it has history.',
    sizes: CLOTHING_SIZES,
    colors: [
      { name: 'Noir', hex: '#0c0c0c' },
      { name: 'Oxblood', hex: '#3d1016' },
    ],
  },
  {
    id: 'corset',
    name: 'Vespera Lace Corset',
    category: 'Clothing',
    price: 640,
    image: '/images/p-corset.png',
    blurb: 'Boned French lace over silk. A whisper of restraint.',
    description:
      'French Chantilly lace laid over a silk base, boned in spiral steel for a true waist and an honest line. Hook-and-eye front busk, lace-up back. Built the way archive corsetry was built — to be worn for hours, not photographs.',
    sizes: CLOTHING_SIZES,
    colors: [
      { name: 'Black Lace', hex: '#111014' },
      { name: 'Bordeaux', hex: '#4a1420' },
    ],
  },
  {
    id: 'slip-dress',
    name: 'Nocturne Satin Slip',
    category: 'Clothing',
    price: 720,
    salePrice: 504,
    sale: true,
    image: '/images/p-slip-dress.png',
    blurb: 'Bias-cut liquid satin that pools like ink at the floor.',
    description:
      'Cut on the true bias from heavyweight silk satin so it pools rather than clings. Cowl neckline front and back, raw-edge hem left unfinished on purpose. Wears like it was poured on, not put on.',
    sizes: CLOTHING_SIZES,
    colors: [
      { name: 'Noir', hex: '#0b0b0d' },
      { name: 'Blood Rose', hex: '#5c1b28' },
    ],
  },
  {
    id: 'fur-coat',
    name: 'Umbra Shearling Coat',
    category: 'Outerwear',
    price: 3450,
    preorder: true,
    image: '/images/p-fur-coat.png',
    blurb: 'Reserved. The winter drop. Yours before it exists.',
    description:
      'Full-length curly shearling with a storm collar deep enough to disappear into. Made to order for the winter drop — reserving now secures a piece before the run is cut. Expect six weeks from order to door.',
    sizes: CLOTHING_SIZES,
    colors: [
      { name: 'Onyx', hex: '#111113' },
      { name: 'Storm Grey', hex: '#4b4b50' },
    ],
  },
  {
    id: 'leather-pants',
    name: 'Onyx Leather Trouser',
    category: 'Clothing',
    price: 890,
    image: '/images/p-leather-pants.png',
    blurb: 'Second-skin nappa. Straight leg. Built to be worn out.',
    description:
      'Second-skin nappa leather, straight through the leg with a mid-rise waist. Full seat and knee articulation so it moves rather than fights you. Ages the way good leather should — better every season.',
    sizes: CLOTHING_SIZES,
    colors: [
      { name: 'Noir', hex: '#0c0c0c' },
      { name: 'Espresso', hex: '#2c1f1a' },
    ],
  },
  {
    id: 'bodysuit',
    name: 'Seraph Lace Bodysuit',
    category: 'Clothing',
    price: 560,
    image: '/images/p-bodysuit.png',
    blurb: 'Sheer illusion tulle. For the ones who dare the light.',
    description:
      'Sheer illusion tulle body with floral lace appliqué placed by hand. Snap closure at the base, boned front panel for shape without a seam line. Reads as bare from a distance, as couture up close.',
    sizes: CLOTHING_SIZES,
    colors: [
      { name: 'Noir', hex: '#0b0b0d' },
      { name: 'Nude Illusion', hex: '#8a6a63' },
    ],
  },
]

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
// drives the visible filter pills) rather than removed from the
// FilterKey/Category types, so bringing one back later is just "add
// products," not a type-system change.
export const FILTERS: FilterKey[] = ['All', 'Clothing', 'Outerwear', 'Sale']

export function filterProducts(products: Product[], filter: FilterKey): Product[] {
  if (filter === 'All') return products
  if (filter === 'Archive') return products.filter((p) => p.archive)
  if (filter === 'Sale') return products.filter((p) => p.sale)
  return products.filter((p) => p.category === filter)
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function formatPrice(n: number): string {
  return '$' + n.toLocaleString('en-US')
}
