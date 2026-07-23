import { getTranslations } from '@/shared/i18n/compat'
import { softBreak } from '@/shared/i18n/rich'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function WalletSection() {
  const t = getTranslations('features.wallet')

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[668px] flex-col gap-6">
          <SectionHeading level={2}>{t('title')}</SectionHeading>
          <p className="text-b1 text-text-secondary">{t.rich('description', { br: softBreak })}</p>
        </div>
        <Image
          src="/images/features/wallet-mockup.png"
          alt=""
          width={668}
          height={852}
          sizes="(min-width: 1024px) 500px, 100vw"
          className="w-full max-w-[500px] rounded-3xl"
        />
      </div>
    </section>
  )
}
