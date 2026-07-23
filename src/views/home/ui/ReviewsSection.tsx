import { getTranslations } from '@/shared/i18n/compat'
import { softBreak } from '@/shared/i18n/rich'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { reviewSchema } from '@/shared/seo/schemas/review'

const REVIEW_KEYS = ['a', 'b', 'c'] as const

export function ReviewsSection() {
  const t = getTranslations('home.reviews')

  const schemas = REVIEW_KEYS.map((key) =>
    reviewSchema({
      author: t(`items.${key}.author`),
      reviewBody: `${t(`items.${key}.quote`)} ${t.markup(`items.${key}.body`, { br: () => ' ' })}`,
    }),
  )

  return (
    <section className="bg-gradient-to-b from-white to-[#ebf2fb] px-6 py-20 lg:px-10">
      <JsonLd data={schemas} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-16">
        <SectionHeading level={2} className="text-center">
          {t.rich('title', { br: softBreak })}
        </SectionHeading>
        <div className="flex flex-col gap-16">
          {REVIEW_KEYS.map((key) => (
            <div key={key} className="flex flex-col gap-5">
              <div className="flex flex-col gap-4">
                <p className="text-h3 text-text-primary">{t(`items.${key}.quote`)}</p>
                <p className="text-b2 text-text-secondary">{t.rich(`items.${key}.body`, { br: softBreak })}</p>
              </div>
              <SectionHeading level={3} size="b3" className="text-text-tertiary">
                {t(`items.${key}.author`)}
              </SectionHeading>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
