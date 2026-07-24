import { Navigate, useParams } from 'react-router-dom'
import { getTranslations } from '@/shared/i18n/compat'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { Accordion } from '@/shared/ui/Accordion'
import { JsonLd } from '@/shared/seo/JsonLd'
import { blogPostingSchema } from '@/shared/seo/schemas/blog'
import { breadcrumbListSchema } from '@/shared/seo/schemas/breadcrumb-list'
import { faqPageSchema } from '@/shared/seo/schemas/faq-page'
import { SITE_URL } from '@/shared/lib/build-alternates'
import { ArticleBody } from '@/widgets/article-body'
import { getMagazineArticleById } from '../model/articles'
import { useArticleMeta } from '../model/metadata'

export function ArticleDetailPage() {
  const { locale, slug } = useParams<{ locale: string; slug: string }>()

  const t = getTranslations('magazine')
  const article = slug ? getMagazineArticleById(t, slug) : undefined

  useArticleMeta(article)

  // `getTranslations` is a hook internally (see compat.ts) — both calls stay
  // above the early return below so they're called unconditionally every
  // render, even though their results are only used once `article` exists.
  const tBreadcrumb = getTranslations('magazine.breadcrumb')
  const tArticle = getTranslations('magazine.article')

  // No locale-agnostic "/404" route exists — navigating there would be
  // re-matched as `:locale="404"` and bounce to home instead of 404. Staying
  // under the current locale with a path no child route matches correctly
  // falls through to the top-level `*` NotFoundPage.
  if (!article) return <Navigate to={`/${locale}/404`} replace />

  const canonicalUrl = `${SITE_URL}/magazine/${article.id}`

  const schema = blogPostingSchema({
    headline: article.title,
    description: article.fullBody?.summaryText ?? article.excerpt ?? article.title,
    image: [
      article.image ? `${SITE_URL}${article.image}` : undefined,
      article.sourceImage,
      article.fullBody?.bodyImage ? `${SITE_URL}${article.fullBody.bodyImage.src}` : undefined,
    ].filter((src): src is string => Boolean(src)),
    datePublished: article.datePublished ?? '',
    authorName: article.authorName ?? 'adobaRo',
    url: canonicalUrl,
  })

  const breadcrumbSchema = breadcrumbListSchema([
    { name: tBreadcrumb('home'), url: SITE_URL },
    { name: tBreadcrumb('magazine'), url: `${SITE_URL}/magazine` },
    { name: article.title, url: canonicalUrl },
  ])

  const faqSchema = article.faq ? faqPageSchema(article.faq) : null

  return (
    <>
      <JsonLd data={faqSchema ? [schema, breadcrumbSchema, faqSchema] : [schema, breadcrumbSchema]} />
      <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-6 pt-16">
        <SectionHeading level={1} size="h2">
          {article.title}
        </SectionHeading>
      </div>
      <ArticleBody article={article} />
      {article.faq && (
        <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-6 pb-20">
          <SectionHeading level={2} size="h3">
            {tArticle('faqTitle')}
          </SectionHeading>
          <Accordion
            name={`${article.id}-faq`}
            items={article.faq.map((item, index) => ({
              id: `${article.id}-faq-${index}`,
              summary: item.question,
              content: item.answer,
            }))}
          />
        </div>
      )}
    </>
  )
}
