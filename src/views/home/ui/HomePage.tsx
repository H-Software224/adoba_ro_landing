import { useHomeMeta } from '../model/metadata'
import { Hero } from './Hero'
import { ProblemSection } from './ProblemSection'
import { StatsSection } from './StatsSection'
import { ComparisonSection } from './ComparisonSection'
import { ReviewsSection } from './ReviewsSection'
import { FaqSection } from './FaqSection'

export function HomePage() {
  useHomeMeta()

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
