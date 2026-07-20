import { SITE_URL } from '@/shared/lib/build-alternates'

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'adobaRo',
    url: SITE_URL,
  }
}
