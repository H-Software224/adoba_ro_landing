import { getTranslations } from 'next-intl/server'
import { softBreak } from '@/shared/i18n/rich'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const ROW_KEYS = ['editing', 'cost', 'waitTime', 'totalCost'] as const

export async function ComparisonSection() {
  const t = await getTranslations('home.comparison')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <div className="flex flex-col gap-6">
          <SectionHeading level={2}>{t('title')}</SectionHeading>
          <p className="text-b1 text-text-secondary">{t.rich('description', { br: softBreak })}</p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-center">
            <p className="w-[180px] shrink-0 text-b2 font-semibold text-text-secondary">{t('columnManual')}</p>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto sm:grid sm:grid-cols-2 2xl:flex 2xl:flex-row">
              {ROW_KEYS.map((key) => (
                <div key={key} className="min-w-[265px] flex-1 rounded-3xl bg-[#f7f8fb] p-6">
                  <p className="text-h3 text-text-primary">{t(`rows.${key}.manualLabel`)}</p>
                  <p className="mt-[10px] text-b2 text-text-secondary">
                    {t.rich(`rows.${key}.manualValue`, { br: softBreak })}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-6 2xl:flex-row 2xl:items-center">
            <p className="w-[180px] shrink-0 text-b3 font-semibold text-text-primary">
              {t.rich('columnAdobaro', {
                br: softBreak,
                accent: (chunks) => <span className="text-brand">{chunks}</span>,
              })}
            </p>
            <div className="flex flex-1 flex-col gap-6 overflow-x-auto sm:grid sm:grid-cols-2 2xl:flex 2xl:flex-row">
              {ROW_KEYS.map((key) => {
                const prefix = t(`rows.${key}.adobaroPrefix`)
                return (
                  <div key={key} className="min-w-[265px] flex-1 rounded-3xl bg-text-primary p-6">
                    <p className="text-h3 text-white">{t(`rows.${key}.adobaroLabel`)}</p>
                    <p className="mt-[10px] text-b2 text-white/80">
                      {prefix}
                      <span className="text-b3 font-semibold text-brand-tertiary">
                        {t(`rows.${key}.adobaroHighlight`)}
                      </span>
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
