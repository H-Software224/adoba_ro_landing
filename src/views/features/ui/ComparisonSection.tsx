import { getTranslations } from 'next-intl/server'
import { softBreak } from '@/shared/i18n/rich'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const ROWS = [
  { key: 'operation', icon: '/images/features/comparison-icon-channel.png' },
  { key: 'localize', icon: '/images/features/comparison-icon-localize.png' },
  { key: 'collab', icon: '/images/features/comparison-icon-collab.png' },
  { key: 'settlement', icon: '/images/features/comparison-icon-settlement.png' },
] as const

export async function ComparisonSection() {
  const t = await getTranslations('features.comparison')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <SectionHeading level={2} className="text-center">
          {t('title')}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {ROWS.map((row) => (
            <div
              key={row.key}
              className="flex flex-col gap-6 rounded-3xl bg-[#ebf2fb] p-6 sm:gap-8 sm:p-8 md:p-10"
            >
              <div className="flex items-center gap-4 sm:gap-6">
                <Image
                  src={row.icon}
                  alt=""
                  width={80}
                  height={80}
                  sizes="(min-width: 768px) 80px, (min-width: 640px) 64px, 48px"
                  className="size-12 sm:size-16 md:size-20"
                />
                <SectionHeading level={3}>{t(`rows.${row.key}.label`)}</SectionHeading>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <span className="shrink-0 rounded-full bg-text-primary/10 px-4 py-2 text-b2 text-text-secondary">
                    {t('columnManual')}
                  </span>
                  <p className="text-b1 text-text-secondary">{t(`rows.${row.key}.manual`)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex w-10 shrink-0 items-center justify-center sm:w-12 md:w-[67px]">
                    <Image
                      src="/images/logo/ro-mark.svg"
                      alt="adobaRo"
                      width={48}
                      height={48}
                      sizes="(min-width: 768px) 48px, (min-width: 640px) 40px, 32px"
                      className="size-8 sm:size-10 md:size-12"
                    />
                  </span>
                  <p className="text-h3 text-[#2c3e50]">
                    {t.rich(`rows.${row.key}.adobaro`, { br: softBreak })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
