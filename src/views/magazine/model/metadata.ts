import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildAlternates } from '@/shared/lib/build-alternates'
import { getMagazineArticleById, MAGAZINE_ARTICLE_IDS } from './articles'

export function generateArticleStaticParams() {
  return MAGAZINE_ARTICLE_IDS.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'magazine.meta' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/magazine'),
  }
}

export async function generateArticleMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'magazine' })
  const article = getMagazineArticleById(t, slug)

  if (!article) {
    return {}
  }

  return {
    title: article.title,
    description: article.excerpt ?? article.title,
    alternates: buildAlternates(`/magazine/${article.id}`),
  }
}
