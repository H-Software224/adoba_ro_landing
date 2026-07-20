import { setRequestLocale } from 'next-intl/server'
import { Hero } from './Hero'
import { ListSection } from './ListSection'

export async function MagazinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <Hero />
      <ListSection />
    </>
  )
}
