import { HttpTypes } from "@medusajs/types"
import ProductRail from "@modules/home/components/featured-products/product-rail"
import { Text } from "@medusajs/ui"

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: HttpTypes.StoreCollection[]
  region: HttpTypes.StoreRegion
}) {
  return (
    <div className="py-12 bg-maga-white">
      <div className="content-container">
        <Text className="mb-8 text-2xl-semi text-maga-blue">
          Featured MAGA Merchandise
        </Text>
        <ul className="space-y-16">
          {collections.map((collection) => (
            <li key={collection.id}>
              <Text className="mb-4 text-xl-semi text-maga-red">
                {collection.title}
              </Text>
              <ProductRail collection={collection} region={region} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}