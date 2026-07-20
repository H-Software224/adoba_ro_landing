import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { Accordion } from '@/shared/ui/Accordion'
import { Link } from '@/shared/i18n/navigation'
import { JsonLd } from '@/shared/seo/JsonLd'
import { blogPostingSchema } from '@/shared/seo/schemas/blog'
import { breadcrumbListSchema } from '@/shared/seo/schemas/breadcrumb-list'
import { faqPageSchema } from '@/shared/seo/schemas/faq-page'
import { SITE_URL } from '@/shared/lib/build-alternates'
import { ArticleBody } from '@/widgets/article-body'
import { getMagazineArticleById } from '../model/articles'

export async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  setRequestLocale(locale)

  const t = await getTranslations('magazine')
  const article = getMagazineArticleById(t, slug)
  if (!article) notFound()

  const tBreadcrumb = await getTranslations('magazine.breadcrumb')
  const canonicalUrl = `${SITE_URL}/magazine/${article.id}`

  const schema = blogPostingSchema({
    headline: article.title,
    description: article.fullBody?.summaryText ?? article.excerpt ?? article.title,
    image: [
      article.image ? `${SITE_URL}${article.image}` : undefined,
      article.sourceImage,
      article.fullBody?.bodyImage ? `${SITE_URL}${article.fullBody.bodyImage}` : undefined,
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

  const tArticle = await getTranslations('magazine.article')
  const faqSchema = article.faq ? faqPageSchema(article.faq) : null

  return (
    <>
      <JsonLd data={faqSchema ? [schema, breadcrumbSchema, faqSchema] : [schema, breadcrumbSchema]} />
      <div className="mx-auto flex max-w-[760px] flex-col gap-6 px-6 pt-16">
        <nav aria-label={tBreadcrumb('nav')} className="flex flex-wrap items-center gap-2 text-b3 text-text-tertiary">
          <Link href="/" className="hover:text-text-secondary">
            {tBreadcrumb('home')}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/magazine" className="hover:text-text-secondary">
            {tBreadcrumb('magazine')}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-text-secondary">
            {article.title}
          </span>
        </nav>
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
