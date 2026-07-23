import type { Article } from '@/entities/article'
import { useTranslations } from '@/shared/i18n/compat'
import { useDocumentMeta } from '@/shared/lib/useDocumentMeta'
import { buildAlternates } from '@/shared/lib/build-alternates'

export function useMagazineMeta() {
  const t = useTranslations('magazine.meta')
  useDocumentMeta({
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/magazine'),
  })
}

export function useArticleMeta(article: Article | undefined) {
  useDocumentMeta({
    title: article?.title ?? '',
    description: article?.excerpt ?? article?.title ?? '',
    alternates: article ? buildAlternates(`/magazine/${article.id}`) : undefined,
  })
}
