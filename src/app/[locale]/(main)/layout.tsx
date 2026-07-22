import type { Locale } from '@/shared/i18n/routing'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export default async function MainLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = (await params) as { locale: Locale }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer locale={locale} />
    </>
  )
}
