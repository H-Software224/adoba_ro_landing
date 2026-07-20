import { getTranslations } from 'next-intl/server'
import { ArticleFeed } from '@/widgets/article-feed'
import { JsonLd } from '@/shared/seo/JsonLd'
import { blogSchema } from '@/shared/seo/schemas/blog'
import { breadcrumbListSchema } from '@/shared/seo/schemas/breadcrumb-list'
import { itemListSchema } from '@/shared/seo/schemas/item-list'
import { SITE_URL } from '@/shared/lib/build-alternates'
import { getMagazineArticles } from '../model/articles'

export async function ListSection() {
  const t = await getTranslations('magazine')
  const articles = getMagazineArticles(t)

  const schemas = [
    itemListSchema(
      articles.map((article) => ({
        name: article.title,
        url: article.externalUrl ?? `${SITE_URL}/magazine#${article.id}`,
      })),
    ),
    blogSchema({
      name: t('hero.title'),
      url: `${SITE_URL}/magazine`,
      posts: articles.map((article) => ({
        headline: article.title,
        image: article.sourceImage ?? (article.image ? `${SITE_URL}${article.image}` : undefined),
        url: article.externalUrl ?? `${SITE_URL}/magazine#${article.id}`,
        datePublished: article.datePublished,
      })),
    }),
    breadcrumbListSchema([
      { name: t('breadcrumb.home'), url: SITE_URL },
      { name: t('breadcrumb.magazine'), url: `${SITE_URL}/magazine` },
    ]),
  ]

  return (
    <section className="relative z-10 -mt-[40vh] rounded-t-[40px] bg-white px-6 py-20 lg:px-10">
      <JsonLd data={schemas} />
      <div className="mx-auto max-w-[1360px]">
        <ArticleFeed items={articles} pageSize={15} />
      </div>
    </section>
  )
}
