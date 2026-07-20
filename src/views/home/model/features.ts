import type { ProductFeature } from '@/entities/product-feature'
import type { getTranslations } from 'next-intl/server'

type Translator = Awaited<ReturnType<typeof getTranslations<'home'>>>

export function getHomeFeatures(t: Translator): ProductFeature[] {
  return [
    {
      id: 'translate',
      icon: '/images/home/feature-translate.png',
      title: t('problem.features.translate.title'),
      description: t('problem.features.translate.description'),
    },
    {
      id: 'deploy',
      icon: '/images/home/feature-deploy.png',
      title: t('problem.features.deploy.title'),
      description: t('problem.features.deploy.description'),
    },
    {
      id: 'brand',
      icon: '/images/home/feature-brand.png',
      title: t('problem.features.brand.title'),
      description: t('problem.features.brand.description'),
    },
    {
      id: 'tracking',
      icon: '/images/home/feature-tracking.png',
      title: t('problem.features.tracking.title'),
      description: t('problem.features.tracking.description'),
    },
  ]
}
