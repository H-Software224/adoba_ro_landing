import { useMagazineMeta } from '../model/metadata'
import { Hero } from './Hero'
import { ListSection } from './ListSection'

export function MagazinePage() {
  useMagazineMeta()

  return (
    <>
      <Hero />
      <ListSection />
    </>
  )
}
