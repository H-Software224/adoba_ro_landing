import type { ProductFeature } from '@/entities/product-feature'
import { ScrollCarousel } from './ScrollCarousel'
import { FeatureCard } from './FeatureCard'

export function FeatureShowcase({ items }: { items: ProductFeature[] }) {
  return (
    <ScrollCarousel>
      {items.map((feature) => (
        <FeatureCard key={feature.id} feature={feature} />
      ))}
    </ScrollCarousel>
  )
}
