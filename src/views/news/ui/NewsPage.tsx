import { useNewsMeta } from '../model/metadata'
import { Hero } from './Hero'
import { ListSection } from './ListSection'

export function NewsPage() {
  useNewsMeta()

  return (
    <>
      <Hero />
      <ListSection />
    </>
  )
}
