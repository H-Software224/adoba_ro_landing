import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { StartFreeButton } from '@/features/start-free'

export async function Hero() {
  const t = await getTranslations('news.hero')

  return (
    <div className="relative min-h-[140dvh]">
      <section className="sticky top-16 flex h-dvh items-start overflow-hidden bg-white pt-10 sm:pt-14 lg:top-[72px] xl:items-center xl:pt-0">
        <Image
          src="/images/home/hero-background.jpg"
          alt=""
          width={1820}
          height={717}
          priority
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-[120px]"
        />
        <div className="relative mx-auto flex max-w-[1040px] flex-col items-center gap-10 px-6 text-center">
          <div className="flex flex-col items-center gap-6">
            <SectionHeading level={1}>{t('title')}</SectionHeading>
            <p className="text-b2 text-text-secondary">{t('description')}</p>
          </div>
          <StartFreeButton className="h-[60px] w-[240px] rounded-xl text-b3">{t('cta')}</StartFreeButton>
        </div>
      </section>
    </div>
  )
}
