import { routing } from '@/shared/i18n/routing'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://home.adobaro.com'

/**
 * Builds Next.js Metadata `alternates` (hreflang ko/en/x-default) for a locale-agnostic path.
 * @param path locale-agnostic path, e.g. '/' or '/pricing'
 */
export function buildAlternates(path: string) {
  const normalizedPath = path === '/' ? '' : path

  const languages: Record<string, string> = {}
  for (const locale of routing.locales) {
    languages[locale] = `${SITE_URL}/${locale}${normalizedPath}`
  }
  languages['x-default'] = `${SITE_URL}/${routing.defaultLocale}${normalizedPath}`

  return {
    canonical: `${SITE_URL}/${routing.defaultLocale}${normalizedPath}`,
    languages,
  }
}

export { SITE_URL }
