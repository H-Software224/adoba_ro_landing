export { generateMetadata } from '@/views/news'
export { NewsPage as default } from '@/views/news'

// Next.js requires route segment config to be a literal export in the route
// file — it can't be re-exported from the views layer like the others above.
export const revalidate = 3600
