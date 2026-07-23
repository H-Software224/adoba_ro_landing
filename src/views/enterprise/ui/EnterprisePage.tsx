import { getTranslations } from '@/shared/i18n/compat'
import { JsonLd } from '@/shared/seo/JsonLd'
import { serviceSchema } from '@/shared/seo/schemas/service'
import { useEnterpriseMeta } from '../model/metadata'
import { Hero } from './Hero'
import { StrengthsSection } from './StrengthsSection'
import { ReportHighlightsSection } from './ReportHighlightsSection'
import { DataFlowSection } from './DataFlowSection'
import { CustomizationSection } from './CustomizationSection'
import { ComparisonSection } from './ComparisonSection'
import { FaqSection } from './FaqSection'
import { ContactSection } from './ContactSection'

export function EnterprisePage() {
  useEnterpriseMeta()

  const t = getTranslations('enterprise.hero')
  const schema = serviceSchema({
    name: 'adobaRo Enterprise',
    description: t('description').replace(/\n/g, ' '),
    serviceType: 'MCN 채널·영상 분석 솔루션',
    audience: 'MCN(다중 채널 네트워크)',
  })

  return (
    <div className="bg-enterprise-bg">
      <JsonLd data={schema} />
      <Hero />
      <StrengthsSection />
      <ReportHighlightsSection />
      <DataFlowSection />
      <CustomizationSection />
      <ComparisonSection />
      <FaqSection />
      <ContactSection />
    </div>
  )
}
