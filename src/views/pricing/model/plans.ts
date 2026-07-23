import type { Plan } from '@/entities/plan'
import type { getTranslations } from '@/shared/i18n/compat'

type Translator = ReturnType<typeof getTranslations>

export function getSubscriptionPlans(t: Translator): Plan[] {
  const perMonth = t('plans.subscription.perMonth')
  const rpGrant = t('plans.subscription.rpGrant')

  return [
    {
      id: 'lite',
      type: 'subscription',
      icon: '/images/pricing/icon-star.svg',
      name: t('plans.subscription.lite.name'),
      price: '$9.90',
      priceSuffix: perMonth,
      rpLabel: '10,000 RP',
      rpGrant,
    },
    {
      id: 'boost',
      type: 'subscription',
      icon: '/images/pricing/icon-agent-senior.svg',
      name: t('plans.subscription.boost.name'),
      price: '$19.90',
      priceSuffix: perMonth,
      rpLabel: '25,000 RP',
      rpGrant,
    },
    {
      id: 'max',
      type: 'subscription',
      icon: '/images/pricing/icon-agent-expert.svg',
      name: t('plans.subscription.max.name'),
      price: '$49.90',
      priceSuffix: perMonth,
      rpLabel: '65,000 RP',
      rpGrant,
    },
  ]
}

export function getRpPackages(t: Translator): Plan[] {
  const rpGrant = t('plans.rpPackage.rpGrant')

  return [
    {
      id: 'rp-10000',
      type: 'rp-package',
      icon: '/images/pricing/icon-fire-1.svg',
      name: t('plans.rpPackage.p10000.name'),
      price: '$10',
      rpLabel: '10,500 RP',
      rpGrant,
    },
    {
      id: 'rp-30000',
      type: 'rp-package',
      icon: '/images/pricing/icon-fire-1.svg',
      name: t('plans.rpPackage.p30000.name'),
      price: '$30',
      rpLabel: '33,000 RP',
      rpGrant,
    },
    {
      id: 'rp-50000',
      type: 'rp-package',
      icon: '/images/pricing/icon-fire-1.svg',
      name: t('plans.rpPackage.p50000.name'),
      price: '$50',
      rpLabel: '57,500 RP',
      rpGrant,
    },
  ]
}
