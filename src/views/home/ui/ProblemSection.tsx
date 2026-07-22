import { getTranslations } from 'next-intl/server'
import { softBreak } from '@/shared/i18n/rich'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { FeatureShowcase } from '@/widgets/feature-showcase'
import { getHomeFeatures } from '../model/features'

export async function ProblemSection() {
  const t = await getTranslations('home')

  return (
    <section className="relative z-10 -mt-[40dvh] rounded-t-[40px] bg-[#e9f1fa] px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <div className="flex flex-col gap-6 text-center">
          <SectionHeading level={2} size="h2-strong">
            {t.rich('problem.title', { br: softBreak })}
          </SectionHeading>
          <p className="text-b1 text-text-secondary">{t.rich('problem.description', { br: softBreak })}</p>
        </div>
        <FeatureShowcase items={getHomeFeatures(t)} />
      </div>
    </section>
  )
}
