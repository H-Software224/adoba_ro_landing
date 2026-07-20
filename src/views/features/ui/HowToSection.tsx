import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { howToSchema } from '@/shared/seo/schemas/how-to'

export async function HowToSection() {
  const t = await getTranslations('features.howto')

  const schema = howToSchema({
    name: t('title'),
    description: t('description'),
    steps: [{ name: t('title'), text: t('description') }],
  })

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <JsonLd data={schema} />
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-10 text-center">
        <div className="flex max-w-[871px] flex-col gap-6">
          <SectionHeading level={2}>{t('title')}</SectionHeading>
          <p className="text-b1 text-text-secondary">{t('description')}</p>
        </div>
        <Image
          src="/images/features/howto-chat-mockup.png"
          alt=""
          width={1360}
          height={765}
          className="w-full max-w-[1360px] rounded-3xl"
        />
      </div>
    </section>
  )
}
