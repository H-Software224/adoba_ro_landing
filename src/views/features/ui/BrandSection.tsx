import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export async function BrandSection() {
  const t = await getTranslations('features.brand')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[668px] flex-col gap-6">
          <SectionHeading level={2}>{t('title')}</SectionHeading>
          <p className="text-b1 text-text-secondary">{t.rich('description', { br: () => <br /> })}</p>
        </div>
        <Image
          src="/images/features/brand-portfolio.png"
          alt=""
          width={668}
          height={852}
          className="w-full max-w-[500px] rounded-3xl"
        />
      </div>
    </section>
  )
}
