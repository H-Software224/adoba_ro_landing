import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const USAGE_ITEMS = [
  { key: 'channel', icon: '/images/pricing/usage-channel.png' },
  { key: 'upload', icon: '/images/pricing/usage-upload.png' },
  { key: 'portfolio', icon: '/images/pricing/usage-portfolio.png' },
  { key: 'update', icon: '/images/pricing/usage-update.png' },
] as const

export function UsageSection() {
  const t = getTranslations('pricing.usage')

  return (
    <section className="bg-[#e8ebf6] px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12">
        <SectionHeading level={2}>{t('title')}</SectionHeading>
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2">
          {USAGE_ITEMS.map((item) => (
            <div key={item.key} className="flex flex-col gap-6">
              <Image
                src={item.icon}
                alt=""
                width={80}
                height={80}
                sizes="(min-width: 768px) 80px, (min-width: 640px) 64px, 48px"
                className="size-12 sm:size-16 md:size-20"
              />
              <div className="flex flex-col gap-2">
                <p className="text-b2 text-text-primary">{t(`${item.key}.label`)}</p>
                <p className="text-h3 text-text-primary">{t(`${item.key}.value`)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
