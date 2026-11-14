import { Experience } from '@/components/experience'
import { getShopifyProducts } from '@/lib/shopify'

export default async function Page() {
  const products = await getShopifyProducts()
  return <Experience products={products} />
}
