import { getTranslations } from '@/shared/i18n/compat'
import { softBreak } from '@/shared/i18n/rich'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { howToSchema } from '@/shared/seo/schemas/how-to'

export function HowToSection() {
  const t = getTranslations('features.howto')

  const plainDescription = t.markup('description', { br: () => ' ' })
  const schema = howToSchema({
    name: t('title'),
    description: plainDescription,
    steps: [{ name: t('title'), text: plainDescription }],
  })

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <JsonLd data={schema} />
      <div className="mx-auto flex max-w-[1360px] flex-col items-center gap-10 text-center">
        <div className="flex max-w-[1360px] flex-col gap-6">
          <SectionHeading level={2}>{t('title')}</SectionHeading>
          <p className="text-b1 text-text-secondary">{t.rich('description', { br: softBreak })}</p>
        </div>
        <Image
          src="/images/features/howto-chat-mockup.png"
          alt=""
          width={1360}
          height={765}
          sizes="(min-width: 1360px) 1360px, 100vw"
          className="w-full max-w-[1360px] rounded-3xl"
        />
      </div>
    </section>
  )
}
