export { generateMetadata } from '@/views/magazine'
export { MagazinePage as default } from '@/views/magazine'

// Next.js requires route segment config to be a literal export in the route
// file — it can't be re-exported from the views layer like the others above.
export const revalidate = 3600
