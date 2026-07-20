import { Header } from '@/widgets/header'
import { Footer } from '@/widgets/footer'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
