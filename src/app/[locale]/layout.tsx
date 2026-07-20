import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/shared/i18n/routing'
import { JsonLd } from '@/shared/seo/JsonLd'
import { organizationSchema } from '@/shared/seo/schemas/organization'
import { websiteSchema } from '@/shared/seo/schemas/website'
import { siteNavigationSchema } from '@/shared/seo/schemas/site-navigation'
import { NAV_ITEMS } from '@/shared/config/navigation'
import '../globals.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.meta' })

  return {
    title: { default: t('title'), template: `%s | adobaRo` },
    description: t('description'),
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale: rawLocale } = await params
  if (!routing.locales.includes(rawLocale as Locale)) {
    notFound()
  }
  const locale = rawLocale as Locale
  setRequestLocale(locale)

  const messages = await getMessages()
  const t = await getTranslations({ locale, namespace: 'nav' })
  const navLabels = Object.fromEntries(NAV_ITEMS.map((item) => [item.key, t(item.key)]))

  return (
    <html lang={locale}>
      <body className="overflow-x-hidden antialiased">
        <NextIntlClientProvider messages={messages}>
          <JsonLd data={[organizationSchema(), websiteSchema(), siteNavigationSchema(locale, navLabels)]} />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
