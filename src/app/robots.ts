import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/shared/lib/build-alternates'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  }
}
