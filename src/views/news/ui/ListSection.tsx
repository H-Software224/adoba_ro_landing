import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { ArticleFeed } from '@/widgets/article-feed'
import { JsonLd } from '@/shared/seo/JsonLd'
import { itemListSchema } from '@/shared/seo/schemas/item-list'
import { eventSchema } from '@/shared/seo/schemas/event'
import { SITE_URL } from '@/shared/lib/build-alternates'
import { getNewsArticles } from '../model/articles'

export async function ListSection() {
  const t = await getTranslations('news')
  const articles = getNewsArticles(t)

  const listSchema = itemListSchema(
    articles.map((article) => ({
      name: article.title,
      url: article.externalUrl ?? `${SITE_URL}/news#${article.id}`,
    })),
  )

  const eventSchemas = articles
    .filter((article) => article.startDate && article.endDate)
    .map((article) =>
      eventSchema({
        name: article.title,
        description: article.modalDescription ?? article.title,
        startDate: article.startDate!,
        endDate: article.endDate!,
        url: article.externalUrl ?? `${SITE_URL}/news#${article.id}`,
        audience: article.eligibility,
        offers: article.rewardOffers,
      }),
    )

  return (
    <section id="events" className="relative z-10 -mt-[40vh] scroll-mt-24 rounded-t-[40px] bg-white px-6 py-20 lg:px-10">
      <JsonLd data={[listSchema, ...eventSchemas]} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-12">
        <SectionHeading level={2}>{t('list.title')}</SectionHeading>
        <ArticleFeed items={articles} />
      </div>
    </section>
  )
}
