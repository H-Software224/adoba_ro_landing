import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { cn } from '@/shared/lib/cn'

const ROW_KEYS = ['data', 'time', 'cycle', 'insight', 'customization'] as const

export function ComparisonSection() {
  const t = getTranslations('enterprise.comparison')

  return (
    <section className="bg-enterprise-bg-alt px-6 py-20 lg:px-10 lg:py-32">
      <SectionHeading level={2} className="whitespace-pre-line text-center text-white">
        {t('title')}
      </SectionHeading>
      <div className="relative mx-auto mt-16 max-w-[1360px] overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">{t('title')}</caption>
          <thead>
            <tr>
              <th scope="col" className="sr-only">
                {t('title')}
              </th>
              <th scope="col" className="px-4 pb-8 text-left font-normal">
                <span className="flex items-center gap-2 text-white">
                  <Image
                    src="/images/enterprise/logo-youtube-studio.png"
                    alt={t('studioLabel')}
                    width={132}
                    height={32}
                    sizes="(min-width: 1024px) 132px, (min-width: 640px) 100px, 80px"
                    className="h-auto w-20 sm:w-[100px] lg:w-[132px]"
                  />
                </span>
              </th>
              <th scope="col" className="rounded-t-3xl bg-white/10 px-6 pb-8 pt-8 text-center font-normal sm:px-8 sm:pt-10 lg:px-10 lg:pt-15">
                <Image
                  src="/images/enterprise/logo-enterprise-full.png"
                  alt={t('enterpriseLabel')}
                  width={210}
                  height={52}
                  sizes="(min-width: 1024px) 210px, (min-width: 640px) 160px, 128px"
                  className="mx-auto h-8 w-auto sm:h-10 lg:h-[52px]"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {ROW_KEYS.map((key, index) => (
              <tr key={key}>
                <th scope="row" className="px-2 py-8 text-b1 font-semibold text-white sm:whitespace-nowrap sm:px-4">
                  {t(`rows.${key}.label`)}
                </th>
                <td className="px-2 py-8 text-b1 text-white/80 sm:px-4">{t(`rows.${key}.studio`)}</td>
                <td
                  className={cn(
                    'bg-white/10 px-4 py-8 text-b1 font-semibold text-white sm:px-6 lg:px-10',
                    index === ROW_KEYS.length - 1 && 'rounded-b-3xl',
                  )}
                >
                  {t(`rows.${key}.enterprise`)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-enterprise-bg-alt to-transparent lg:hidden"
        />
      </div>
    </section>
  )
}
