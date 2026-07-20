import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const ROW_KEYS = ['data', 'time', 'cycle', 'insight', 'customization'] as const

export async function ComparisonSection() {
  const t = await getTranslations('enterprise.comparison')

  return (
    <section className="bg-enterprise-bg-alt px-6 py-20 lg:px-10 lg:py-32">
      <SectionHeading level={2} className="whitespace-pre-line text-center text-white">
        {t('title')}
      </SectionHeading>
      <div className="mx-auto mt-16 max-w-[1360px]">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t('title')}</caption>
          <thead>
            <tr>
              <th scope="col" className="sr-only">
                {t('title')}
              </th>
              <th scope="col" className="px-4 pb-8 text-left font-normal">
                <span className="hidden items-center gap-2 text-white lg:flex">
                  <Image src="/images/enterprise/logo-youtube-studio.png" alt={t('studioLabel')} width={132} height={32} />
                </span>
              </th>
              <th scope="col" className="rounded-t-3xl bg-white/10 px-10 pb-8 pt-15 text-center font-normal">
                <Image
                  src="/images/enterprise/logo-enterprise-full.png"
                  alt={t('enterpriseLabel')}
                  width={210}
                  height={52}
                  className="mx-auto h-[52px] w-auto"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {ROW_KEYS.map((key, index) => (
              <tr key={key}>
                <th scope="row" className="whitespace-nowrap px-4 py-8 text-b1 font-semibold text-white">
                  {t(`rows.${key}.label`)}
                </th>
                <td className="px-4 py-8 text-b1 text-white/80">{t(`rows.${key}.studio`)}</td>
                <td
                  className={`bg-white/10 px-10 py-8 text-b1 font-semibold text-white ${
                    index === ROW_KEYS.length - 1 ? 'rounded-b-3xl' : ''
                  }`}
                >
                  {t(`rows.${key}.enterprise`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
