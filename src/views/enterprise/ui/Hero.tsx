import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { Button } from '@/shared/ui/Button'
import { Gnb } from './Gnb'

export function Hero() {
  const t = getTranslations('enterprise.hero')

  return (
    <div className="relative min-h-[140dvh]">
      <section className="sticky top-0 h-dvh overflow-hidden bg-enterprise-bg">
        <Image
          src="/images/enterprise/hero-background.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative flex h-full flex-col">
          <Gnb />
          <div className="mx-auto flex max-w-[1360px] flex-1 flex-col items-center justify-start gap-6 px-6 pt-10 text-center sm:pt-14 lg:px-10 xl:justify-center xl:pt-0">
            <SectionHeading level={1} className="whitespace-pre-line text-white/90">
              {t('title')}
            </SectionHeading>
            <p className="whitespace-pre-line text-b2 text-white/70">{t('description')}</p>
            <Button as="a" href="#contact" variant="light" className="mt-4 h-[60px] w-60 rounded-full text-b3">
              {t('cta')}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
