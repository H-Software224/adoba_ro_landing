import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { StartFreeButton } from '@/features/start-free'
import { Link } from '@/shared/i18n/navigation'

export function Hero() {
  const t = getTranslations('features.hero')
  const tCommon = getTranslations('common')

  return (
    <div className="relative min-h-[140dvh]">
      <section className="sticky top-16 flex h-dvh items-start overflow-hidden bg-white pt-10 sm:pt-14 lg:top-[72px] xl:items-center xl:pt-0">
        <Image
          src="/images/features/hero-background.jpg"
          alt=""
          width={1820}
          height={720}
          priority
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-[120px]"
        />
        <div className="relative mx-auto flex max-w-[914px] flex-col items-center gap-12 px-6 text-center">
          <div className="flex flex-col items-center gap-6">
            <SectionHeading level={1}>{t('title')}</SectionHeading>
            <p className="text-b2 text-text-secondary">{t('description')}</p>
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
