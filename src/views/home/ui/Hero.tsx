import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { StartFreeButton } from '@/features/start-free'
import { Link } from '@/shared/i18n/navigation'
import { JsonLd } from '@/shared/seo/JsonLd'
import { serviceSchema } from '@/shared/seo/schemas/service'
import { SITE_URL } from '@/shared/lib/build-alternates'

const AREA_SERVED = ['중국어', '영어', '힌디어', '스페인어', '포르투갈어', '인도네시아어', '아랍어', '프랑스어']

export async function Hero() {
  const t = await getTranslations('home.hero')
  const tCommon = await getTranslations('common')

  const schema = serviceSchema({
    name: 'adobaRo',
    description: t.markup('description', { br: () => ' ', strong: (chunks) => chunks }),
    areaServed: AREA_SERVED,
    offers: [
      { name: 'Lite', url: `${SITE_URL}/pricing#lite` },
      { name: 'Boost', url: `${SITE_URL}/pricing#boost` },
      { name: 'Max', url: `${SITE_URL}/pricing#max` },
    ],
  })

  return (
    <div className="relative min-h-[140vh]">
      <section className="sticky top-[95px] flex h-screen items-center overflow-hidden bg-white sm:top-[73px] lg:top-[72px]">
        <JsonLd data={schema} />
        <Image
          src="/images/home/hero-background.jpg"
          alt=""
          width={1820}
          height={1024}
          priority
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 blur-[120px]"
        />
        <div className="relative mx-auto flex max-w-[763px] flex-col items-center gap-12 px-6 text-center">
          <div className="flex flex-col items-center gap-6">
            <SectionHeading level={1}>{t('title')}</SectionHeading>
            <p className="text-b2 text-text-secondary">
              {t.rich('description', {
                br: () => <br />,
                strong: (chunks) => <strong className="font-semibold text-text-primary">{chunks}</strong>,
              })}
            </p>
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
