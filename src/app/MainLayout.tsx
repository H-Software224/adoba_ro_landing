import { Outlet, useParams } from 'react-router-dom'
import type { Locale } from '@/shared/i18n/routing'
import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export function MainLayout() {
  const { locale } = useParams<{ locale: string }>()

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer locale={(locale ?? 'ko') as Locale} />
    </>
  )
}
