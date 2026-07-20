import { setRequestLocale } from 'next-intl/server'
import { Hero } from './Hero'
import { ProblemSection } from './ProblemSection'
import { StatsSection } from './StatsSection'
import { ComparisonSection } from './ComparisonSection'
import { ReviewsSection } from './ReviewsSection'
import { FaqSection } from './FaqSection'

export async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <ProblemSection />
      <StatsSection />
      <ComparisonSection />
      <ReviewsSection />
      <FaqSection />
    </>
  )
}
