import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { buildAlternates } from '@/shared/lib/build-alternates'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations({ locale, namespace: 'news.meta' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/news'),
  }
}
