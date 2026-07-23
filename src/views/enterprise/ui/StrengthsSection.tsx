import { getTranslations } from '@/shared/i18n/compat'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const ITEM_KEYS = ['analysis', 'deploy', 'direction', 'edit'] as const

export function StrengthsSection() {
  const t = getTranslations('enterprise.strengths')

  return (
    <section className="relative z-10 -mt-[40dvh] rounded-t-[40px] bg-enterprise-bg px-6 py-20 lg:px-10 lg:py-32">
      <div className="mx-auto grid max-w-[1360px] gap-16 xl:grid-cols-[592fr_375fr]">
        <div className="flex flex-col gap-6">
          <SectionHeading level={2} className="whitespace-pre-line text-white">
            {t.rich('title', { accent: (chunks) => <span className="text-enterprise-accent">{chunks}</span> })}
          </SectionHeading>
          <p className="whitespace-pre-line text-b2 text-white/80">{t('description')}</p>
        </div>
        <ol className="flex flex-col gap-14 border-l border-white/20 pl-8">
          {ITEM_KEYS.map((key) => (
            <li key={key} className="relative flex flex-col gap-4">
              <span className="absolute -left-[calc(2rem+5px)] top-1.5 size-2.5 rounded-full bg-enterprise-accent" />
              <SectionHeading level={3} className="text-white">
                {t(`items.${key}.title`)}
              </SectionHeading>
              <p className="whitespace-pre-line text-b2 text-white/80">{t(`items.${key}.description`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
