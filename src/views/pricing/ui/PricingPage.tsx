import { setRequestLocale } from 'next-intl/server'
import { Hero } from './Hero'
import { PlansSection } from './PlansSection'
import { UsageSection } from './UsageSection'
import { FaqSection } from './FaqSection'

export async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <PlansSection />
      <UsageSection />
      <FaqSection />
    </>
  )
}
