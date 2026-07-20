import { SITE_URL } from '@/shared/lib/build-alternates'
import { NAV_ITEMS } from '@/shared/config/navigation'
import type { Locale } from '@/shared/i18n/routing'

export function siteNavigationSchema(locale: Locale, labels: Record<string, string>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SiteNavigationElement',
    name: NAV_ITEMS.map((item) => labels[item.key]),
    url: NAV_ITEMS.map((item) => `${SITE_URL}/${locale}${item.path}`),
  }
}
