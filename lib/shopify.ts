import type { Product } from './products'

const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
const API_VERSION = '2025-10'

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          handle
          title
          description
          productType
          tags
          images(first: 1) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 50) {
            edges {
              node {
                price {
                  amount
                }
                compareAtPrice {
                  amount
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`

type ShopifyVariantNode = {
  price: { amount: string }
  compareAtPrice: { amount: string } | null
  selectedOptions: { name: string; value: string }[]
}

type ShopifyProductNode = {
  handle: string
  title: string
  description: string
  productType: string
  tags: string[]
  images: { edges: { node: { url: string; altText: string | null } }[] }
  variants: { edges: { node: ShopifyVariantNode }[] }
}

type ProductsQueryResult = {
  products: { edges: { node: ShopifyProductNode }[] }
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T | null> {
  if (!STORE_DOMAIN || !STOREFRONT_TOKEN) {
    console.error(
      'Shopify is not configured — set NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN in .env.local.',
    )
    return null
  }

  try {
    const res = await fetch(`https://${STORE_DOMAIN}/api/${API_VERSION}/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
      // Product data doesn't need to be instant-fresh — a short revalidation
      // window means edits in Shopify admin show up within a minute without
      // hitting the API on every single page load.
      next: { revalidate: 60 },
    })
    const json = await res.json()
    if (json.errors) {
      console.error('Shopify Storefront API error:', json.errors)
      return null
    }
    return json.data as T
  } catch (err) {
    console.error('Shopify Storefront API request failed:', err)
    return null
  }
}

// Truncates the plain-text product description down to a short grid-card
// caption, since the Storefront API only gives us the one description field.
function toBlurb(description: string): string {
  if (description.length <= 120) return description
  return description.slice(0, 117).trimEnd() + '…'
}

function mapProduct(node: ShopifyProductNode): Product {
  const image = node.images.edges[0]?.node.url ?? ''
  const variants = node.variants.edges.map((e) => e.node)
  const firstVariant = variants[0]

  const basePrice = firstVariant ? parseFloat(firstVariant.price.amount) : 0
  const compareAt = firstVariant?.compareAtPrice
    ? parseFloat(firstVariant.compareAtPrice.amount)
    : null
  // Shopify's native way to mark a sale: a variant's compareAtPrice set
  // higher than its current price. No manual "sale" tag needed in admin.
  const onSale = compareAt !== null && compareAt > basePrice

  const sizes = Array.from(
    new Set(
      variants
        .flatMap((v) => v.selectedOptions)
        .filter((o) => o.name.toLowerCase() === 'size')
        .map((o) => o.value),
    ),
  )

  const tags = node.tags.map((t) => t.toLowerCase())
  const description = node.description || ''

  return {
    id: node.handle,
    name: node.title,
    category: node.productType || 'Clothing',
    price: onSale ? (compareAt as number) : basePrice,
    salePrice: onSale ? basePrice : undefined,
    sale: onSale,
    image,
    blurb: toBlurb(description),
    description,
    preorder: tags.includes('preorder'),
    archive: tags.includes('archive'),
    sizes: sizes.length > 0 ? sizes : undefined,
  }
}

export async function getShopifyProducts(): Promise<Product[]> {
  const data = await shopifyFetch<ProductsQueryResult>(PRODUCTS_QUERY, { first: 50 })
  if (!data) return []
  return data.products.edges.map((e) => mapProduct(e.node))
}
