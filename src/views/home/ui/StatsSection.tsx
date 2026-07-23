import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { CountUp } from '@/shared/ui/CountUp'
import { cn } from '@/shared/lib/cn'

const STATS = [
  { key: 'viewers', icon: '/images/home/stat-viewers.png', colSpan: 'sm:col-span-4' },
  { key: 'languages', icon: '/images/home/stat-languages.png', colSpan: 'sm:col-span-4' },
  { key: 'localizeTime', icon: '/images/home/stat-localize-time.png', colSpan: 'sm:col-span-3' },
  { key: 'waitTime', icon: '/images/home/stat-wait-time.png', colSpan: 'sm:col-span-5' },
] as const

export function StatsSection() {
  const t = getTranslations('home.stats')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <SectionHeading level={2}>{t('title')}</SectionHeading>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-8">
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className={cn(
                'relative flex min-h-[140px] items-center overflow-hidden rounded-3xl bg-[#f7f8fb] px-6 py-6 sm:h-[231px] sm:py-0',
                stat.colSpan,
              )}
            >
              <div className="flex flex-col gap-2">
                <dt className="order-2 text-b2 text-text-primary">{t(`${stat.key}.label`)}</dt>
                <dd className="order-1 text-h1 text-text-primary">
                  <CountUp text={t(`${stat.key}.value`)} />
                </dd>
              </div>
              <Image
                src={stat.icon}
                alt=""
                width={180}
                height={180}
                sizes="(min-width: 640px) 180px, 96px"
                className="ml-auto size-24 shrink-0 sm:size-[180px]"
              />
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
