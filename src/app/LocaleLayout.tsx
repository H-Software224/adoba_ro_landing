import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { routing, type Locale } from '@/shared/i18n/routing'
import { getTranslations } from '@/shared/i18n/compat'
import i18n from '@/shared/i18n/i18n'
import { JsonLd } from '@/shared/seo/JsonLd'
import { organizationSchema } from '@/shared/seo/schemas/organization'
import { websiteSchema } from '@/shared/seo/schemas/website'
import { siteNavigationSchema } from '@/shared/seo/schemas/site-navigation'
import { NAV_ITEMS } from '@/shared/config/navigation'

export function LocaleLayout() {
  const { locale: rawLocale } = useParams<{ locale: string }>()
  const isValidLocale = !!rawLocale && (routing.locales as readonly string[]).includes(rawLocale)
  const locale = (isValidLocale ? rawLocale : routing.defaultLocale) as Locale

  useEffect(() => {
    if (!isValidLocale) return
    document.documentElement.lang = locale
    void i18n.changeLanguage(locale)
  }, [isValidLocale, locale])

  // `getTranslations` is a hook internally (see compat.ts) — must stay above
  // the early return below so it's called unconditionally every render.
  const t = getTranslations({ locale, namespace: 'nav' })
  const navLabels = Object.fromEntries(NAV_ITEMS.map((item) => [item.key, t(item.key)]))

  if (!isValidLocale) return <Navigate to={`/${routing.defaultLocale}`} replace />

  return (
    <>
      <JsonLd data={[organizationSchema(), websiteSchema(), siteNavigationSchema(locale, navLabels)]} />
      <Outlet />
    </>
  )
}
