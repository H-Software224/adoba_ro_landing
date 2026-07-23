import { useTranslations } from '@/shared/i18n/compat'
import { useDocumentMeta } from '@/shared/lib/useDocumentMeta'
import { buildAlternates } from '@/shared/lib/build-alternates'

export function useFeaturesMeta() {
  const t = useTranslations('features.meta')
  useDocumentMeta({
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/features'),
  })
}
