import { listProducts } from "@lib/data/products"
import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"
import ProductPreview from "@modules/products/components/product-preview"

export default async function ProductRail({
  collection,
  region,
}: {
  collection: HttpTypes.StoreCollection
  region: HttpTypes.StoreRegion
}) {
  const {
    response: { products: pricedProducts },
  } = await listProducts({
    regionId: region.id,
    queryParams: {
      limit: 4,
    },
  })

  const collectionProducts = pricedProducts?.filter(
    (product) => product.collection_id === collection.id
  )

  if (!collectionProducts || collectionProducts.length === 0) {
    return null
  }

  return (
    <div className="content-container py-12 small:py-24 bg-maga-white">
      <div className="flex justify-between mb-8 items-center">
        <Text className="text-2xl-semi" style={{ color: 'var(--maga-blue)' }}>{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          <span style={{ color: 'var(--maga-red)', transition: 'color 0.2s' }}>View all</span>
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 small:grid-cols-3 gap-x-6 gap-y-24 small:gap-y-36">
        {collectionProducts.map((product) => (
          <li key={product.id} style={{ border: '1px solid var(--maga-blue)', borderRadius: '0.5rem', padding: '1rem', transition: 'box-shadow 0.2s' }}>
            <ProductPreview product={product} region={region} isFeatured />
          </li>
        ))}
      </ul>
    </div>
  )
}