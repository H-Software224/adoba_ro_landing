import { getTranslations } from '@/shared/i18n/compat'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { Accordion } from '@/shared/ui/Accordion'
import { JsonLd } from '@/shared/seo/JsonLd'
import { faqPageSchema } from '@/shared/seo/schemas/faq-page'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5'] as const

export function FaqSection() {
  const t = getTranslations('features.faq')

  const items = FAQ_KEYS.map((key) => ({
    id: key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }))

  return (
    <section className="bg-[#ebf2fb] px-6 py-20 lg:px-10">
      <JsonLd data={faqPageSchema(items.map(({ question, answer }) => ({ question, answer })))} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-10 lg:flex-row lg:gap-16 xl:gap-[326px]">
        <SectionHeading level={2} className="lg:w-[287px] lg:shrink-0">
          {t('title')}
        </SectionHeading>
        <Accordion
          className="flex-1"
          name="features-faq"
          items={items.map((item) => ({ id: item.id, summary: item.question, content: item.answer }))}
        />
      </div>
    </section>
  )
}
