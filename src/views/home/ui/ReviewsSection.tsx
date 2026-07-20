import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { Card } from '@/shared/ui/Card'
import { JsonLd } from '@/shared/seo/JsonLd'
import { reviewSchema } from '@/shared/seo/schemas/review'

const REVIEW_KEYS = ['a', 'b', 'c'] as const

export async function ReviewsSection() {
  const t = await getTranslations('home.reviews')

  const schemas = REVIEW_KEYS.map((key) =>
    reviewSchema({
      author: t(`items.${key}.author`),
      reviewBody: `${t(`items.${key}.quote`)} ${t(`items.${key}.body`)}`,
    }),
  )

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <JsonLd data={schemas} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-16">
        <SectionHeading level={2} className="text-center">
          {t('title')}
        </SectionHeading>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {REVIEW_KEYS.map((key) => (
            <Card key={key} className="flex flex-col gap-6 bg-[#f7f8fb]">
              <div className="flex flex-col gap-4">
                <p className="text-h3 text-text-primary">{t(`items.${key}.quote`)}</p>
                <p className="text-b3 text-text-secondary">{t(`items.${key}.body`)}</p>
              </div>
              <SectionHeading level={3} size="b3" className="text-text-tertiary">
                {t(`items.${key}.author`)}
              </SectionHeading>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
