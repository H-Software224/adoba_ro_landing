import { getTranslations } from '@/shared/i18n/compat'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const STAT_KEYS = ['speed', 'volume'] as const

export function ReportHighlightsSection() {
  const t = getTranslations('enterprise.highlights')

  return (
    <section className="bg-enterprise-bg px-6 py-20 text-center lg:px-10 lg:py-32">
      <div className="mx-auto flex max-w-[813px] flex-col items-center gap-6">
        <SectionHeading level={2} className="text-white">
          {t('title')}
        </SectionHeading>
        <p className="text-b2 text-white/80">{t('description')}</p>
      </div>
      <dl className="mx-auto mt-16 flex max-w-[1360px] flex-wrap justify-center gap-16">
        {STAT_KEYS.map((key) => (
          <div key={key} className="flex flex-col items-start gap-2 border-t border-white/30 pt-8">
            <dd className="bg-gradient-to-r from-enterprise-accent to-enterprise-accent-deep bg-clip-text text-h1 text-transparent">
              {t(`${key}.value`)}
            </dd>
            <dt className="text-b1 text-white/80">{t(`${key}.label`)}</dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
