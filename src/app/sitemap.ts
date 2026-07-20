import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/shared/lib/build-alternates'
import { routing } from '@/shared/i18n/routing'
import { NAV_ITEMS } from '@/shared/config/navigation'
import { MAGAZINE_ARTICLE_IDS } from '@/views/magazine'

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    '/',
    ...NAV_ITEMS.map((item) => item.path),
    '/enterprise',
    ...MAGAZINE_ARTICLE_IDS.map((slug) => `/magazine/${slug}`),
  ]

  return paths.map((path) => ({
    url: `${SITE_URL}/${routing.defaultLocale}${path === '/' ? '' : path}`,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [locale, `${SITE_URL}/${locale}${path === '/' ? '' : path}`]),
      ),
    },
  }))
}
