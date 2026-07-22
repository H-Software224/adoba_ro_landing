import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { StartFreeButton } from '@/features/start-free'
import { Link } from '@/shared/i18n/navigation'

export async function Hero() {
  const t = await getTranslations('pricing.hero')
  const tCommon = await getTranslations('common')

  return (
    <div className="relative min-h-[140dvh]">
      <section className="sticky top-[95px] flex h-dvh items-center overflow-hidden bg-white sm:top-[73px] lg:top-[72px]">
        <Image
          src="/images/home/hero-background.jpg"
          alt=""
          width={1820}
          height={717}
          priority
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-[120px]"
        />
        <div className="relative mx-auto flex max-w-[960px] flex-col items-center gap-10 px-6 text-center">
          <div className="flex flex-col items-center gap-6">
            <SectionHeading level={1}>{t('title')}</SectionHeading>
            <p className="text-b2 text-text-secondary">{t.rich('description', { br: () => <br /> })}</p>
          </div>
          <div className="flex flex-col items-center">
            <StartFreeButton className="h-[60px] w-[240px] rounded-xl text-b3">{tCommon('startFree')}</StartFreeButton>
            <Link
              href="/enterprise"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 flex h-[60px] items-center px-8 text-b3 text-text-secondary underline"
            >
              {tCommon('mcnQuestion')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
