import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { StartFreeButton } from '@/features/start-free'
import { Link } from '@/shared/i18n/navigation'

export async function Hero() {
  const t = await getTranslations('magazine.hero')
  const tBreadcrumb = await getTranslations('magazine.breadcrumb')

  return (
    <div className="relative min-h-[140vh]">
      <section className="sticky top-[95px] flex h-screen items-center overflow-hidden bg-white sm:top-[73px] lg:top-[72px]">
        <Image
          src="/images/home/hero-background.jpg"
          alt=""
          width={1820}
          height={720}
          priority
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-[120px]"
        />
        <div className="relative mx-auto flex max-w-[947px] flex-col items-center gap-10 px-6 text-center">
          <nav aria-label={tBreadcrumb('nav')} className="flex items-center gap-2 text-b3 text-text-tertiary">
            <Link href="/" className="hover:text-text-secondary">
              {tBreadcrumb('home')}
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-text-secondary">
              {tBreadcrumb('magazine')}
            </span>
          </nav>
          <div className="flex flex-col items-center gap-6">
            <SectionHeading level={1}>{t('title')}</SectionHeading>
            <p className="text-b2 text-text-secondary">{t('description')}</p>
          </div>
          <StartFreeButton className="h-[60px] rounded-xl text-b3">{t('cta')}</StartFreeButton>
        </div>
      </section>
    </div>
  )
}
