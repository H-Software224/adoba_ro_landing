import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const ROW_KEYS = ['editing', 'cost', 'waitTime', 'totalCost'] as const

export async function ComparisonSection() {
  const t = await getTranslations('home.comparison')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <div className="flex flex-col gap-6">
          <SectionHeading level={2}>{t('title')}</SectionHeading>
          <p className="text-b1 text-text-secondary">{t('description')}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-4 text-left">
            <thead>
              <tr>
                <th className="w-[180px] px-2 text-b2 font-semibold text-text-secondary">&nbsp;</th>
                <th className="px-2 text-b2 font-semibold text-text-secondary">{t('columnManual')}</th>
                <th className="px-2 text-b1 font-semibold text-text-primary">{t('columnAdobaro')}</th>
              </tr>
            </thead>
            <tbody>
              {ROW_KEYS.map((key) => (
                <tr key={key}>
                  <th scope="row" className="w-[180px] px-2 text-b2 font-semibold text-text-secondary">
                    {t(`rows.${key}.label`)}
                  </th>
                  <td className="rounded-3xl bg-[#f7f8fb] p-6 align-top text-b2 text-text-secondary">
                    {t(`rows.${key}.manual`)}
                  </td>
                  <td className="rounded-3xl bg-text-primary p-6 align-top text-b2 font-semibold text-white">
                    {t(`rows.${key}.adobaro`)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
