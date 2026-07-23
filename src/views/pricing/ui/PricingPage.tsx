import { usePricingMeta } from '../model/metadata'
import { Hero } from './Hero'
import { PlansSection } from './PlansSection'
import { UsageSection } from './UsageSection'
import { FaqSection } from './FaqSection'

export function PricingPage() {
  usePricingMeta()

  return (
    <>
      <Hero />
      <PlansSection />
      <UsageSection />
      <FaqSection />
    </>
  )
}
