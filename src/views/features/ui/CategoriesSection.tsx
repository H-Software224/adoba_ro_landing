import { getTranslations } from '@/shared/i18n/compat'
import { softBreak } from '@/shared/i18n/rich'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'

const CATEGORIES = [
  { key: 'channel', icon: '/images/features/category-channel.png' },
  { key: 'localize', icon: '/images/features/category-localize.png' },
  { key: 'brand', icon: '/images/features/category-brand.png' },
  { key: 'settlement', icon: '/images/features/category-settlement.png' },
] as const

export function CategoriesSection() {
  const t = getTranslations('features.categories')

  return (
    <section className="relative z-10 -mt-[40dvh] rounded-t-[40px] bg-gradient-to-b from-[#efeaf3] to-[#efeaf34d] px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10">
        <SectionHeading level={2} size="h2-strong" className="text-center">
          {t.rich('title', { br: softBreak })}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((category) => (
            <div
              key={category.key}
              className="flex flex-col items-start gap-8 rounded-3xl bg-white p-6 sm:gap-10 sm:p-8 md:gap-12 md:p-10"
            >
              <Image
                src={category.icon}
                alt=""
                width={80}
                height={80}
                sizes="(min-width: 768px) 80px, (min-width: 640px) 64px, 48px"
                className="size-12 sm:size-16 md:size-20"
              />
              <SectionHeading level={3}>{t.rich(category.key, { br: softBreak })}</SectionHeading>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
