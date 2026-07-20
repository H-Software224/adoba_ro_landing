import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { CountUp } from '@/shared/ui/CountUp'

const STATS = [
  { key: 'viewers', icon: '/images/home/stat-viewers.png' },
  { key: 'languages', icon: '/images/home/stat-languages.png' },
  { key: 'localizeTime', icon: '/images/home/stat-localize-time.png' },
  { key: 'waitTime', icon: '/images/home/stat-wait-time.png' },
] as const

export async function StatsSection() {
  const t = await getTranslations('home.stats')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <SectionHeading level={2}>{t('title')}</SectionHeading>
        <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {STATS.map((stat) => (
            <div key={stat.key} className="relative flex h-[231px] items-center overflow-hidden rounded-3xl bg-[#f7f8fb] px-6">
              <div className="flex flex-col gap-2">
                <dt className="order-2 text-b2 text-text-primary">{t(`${stat.key}.label`)}</dt>
                <dd className="order-1 text-h1 text-text-primary">
                  <CountUp text={t(`${stat.key}.value`)} />
                </dd>
              </div>
              <Image src={stat.icon} alt="" width={180} height={180} className="ml-auto shrink-0" />
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
