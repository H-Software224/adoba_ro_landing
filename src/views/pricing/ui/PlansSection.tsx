import { getTranslations } from 'next-intl/server'
import { softBreak } from '@/shared/i18n/rich'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { PricingTable } from '@/widgets/pricing-table'
import { JsonLd } from '@/shared/seo/JsonLd'
import { productOfferSchema } from '@/shared/seo/schemas/product-offer'
import { SITE_URL } from '@/shared/lib/build-alternates'
import { getSubscriptionPlans, getRpPackages } from '../model/plans'

const SUBSCRIPTION_PRICES = { lite: 9.9, boost: 19.9, max: 49.9 }
const RP_PACKAGE_PRICES = { 'rp-10000': 10, 'rp-30000': 30, 'rp-50000': 50 }

export async function PlansSection() {
  const t = await getTranslations('pricing')
  const subscriptionPlans = getSubscriptionPlans(t)
  const rpPackages = getRpPackages(t)

  const schemas = [
    ...subscriptionPlans.map((plan) =>
      productOfferSchema({
        name: plan.name,
        description: `${plan.rpLabel} ${plan.rpGrant}`,
        price: SUBSCRIPTION_PRICES[plan.id as keyof typeof SUBSCRIPTION_PRICES],
        priceCurrency: 'USD',
        url: `${SITE_URL}/pricing#${plan.id}`,
        billingDuration: 'P1M',
      }),
    ),
    ...rpPackages.map((plan) =>
      productOfferSchema({
        name: plan.name,
        description: `${plan.rpLabel} ${plan.rpGrant}`,
        price: RP_PACKAGE_PRICES[plan.id as keyof typeof RP_PACKAGE_PRICES],
        priceCurrency: 'USD',
        url: `${SITE_URL}/pricing#${plan.id}`,
      }),
    ),
  ]

  return (
    <section className="relative z-10 -mt-[40dvh] rounded-t-[40px] bg-[#e8ebf6] px-6 py-20 lg:px-10">
      <JsonLd data={schemas} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-24">
        <SectionHeading level={2}>{t.rich('plans.title', { br: softBreak })}</SectionHeading>
        <PricingTable title={t('plans.subscription.title')} plans={subscriptionPlans} />
        <PricingTable title={t('plans.rpPackage.title')} plans={rpPackages} />
      </div>
    </section>
  )
}
