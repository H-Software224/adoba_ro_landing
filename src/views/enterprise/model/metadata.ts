import { useTranslations } from '@/shared/i18n/compat'
import { useDocumentMeta } from '@/shared/lib/useDocumentMeta'
import { buildAlternates } from '@/shared/lib/build-alternates'

export function useEnterpriseMeta() {
  const t = useTranslations('enterprise.meta')
  useDocumentMeta({
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/enterprise'),
  })
}
