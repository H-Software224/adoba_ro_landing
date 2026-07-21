import { getTranslations, setRequestLocale } from 'next-intl/server'
import { JsonLd } from '@/shared/seo/JsonLd'
import { serviceSchema } from '@/shared/seo/schemas/service'
import { Hero } from './Hero'
import { CategoriesSection } from './CategoriesSection'
import { HowToSection } from './HowToSection'
import { ProcessSection } from './ProcessSection'
import { BrandSection } from './BrandSection'
import { WalletSection } from './WalletSection'
import { ComparisonSection } from './ComparisonSection'
import { FaqSection } from './FaqSection'

export async function FeaturesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const t = await getTranslations('features')
  const subServices = [
    { name: t('howto.title'), description: t.markup('howto.description', { br: () => ' ' }) },
    {
      name: t.markup('process.title', { br: () => ' ' }),
      description: t.markup('process.description', { br: () => ' ' }),
    },
    { name: t('brand.title'), description: t.markup('brand.description', { br: () => ' ' }) },
    { name: t('wallet.title'), description: t.markup('wallet.description', { br: () => ' ' }) },
  ]

  const schema = serviceSchema({
    name: 'adobaRo',
    description: t('hero.description'),
    serviceType: subServices.map((sub) => sub.name),
    subServices,
  })

  return (
    <>
      <JsonLd data={schema} />
      <Hero />
      <CategoriesSection />
      <HowToSection />
      <ProcessSection />
      <BrandSection />
      <WalletSection />
      <ComparisonSection />
      <FaqSection />
    </>
  )
}
