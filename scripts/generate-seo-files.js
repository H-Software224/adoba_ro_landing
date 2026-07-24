// Vite SPA has no server-side route handlers, so the sitemap/robots that
// Next generated at request time via src/app/{sitemap,robots}.ts are instead
// written as static files after `vite build`. NAV_ITEMS/MAGAZINE_ARTICLE_IDS
// are duplicated here (small, static, rarely-changing config) rather than
// imported, since this plain Node script can't load TypeScript path aliases.
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(dirname, '../dist')

const SITE_URL = process.env.VITE_SITE_URL ?? 'http://dev.home.adobaro.com'
const LOCALES = ['ko', 'en']
const DEFAULT_LOCALE = 'ko'

const NAV_ITEMS = [
  { path: '/features' },
  { path: '/pricing' },
  { path: '/news' },
  { path: '/magazine' },
]

const MAGAZINE_ARTICLE_IDS = [
  'subtitles',
  'view-drop',
  'subs-vs-views',
  'china-platforms',
  'keep-korean-channel',
  'multi-language-channel',
  'no-talking-format',
]

const PATHS = ['/', ...NAV_ITEMS.map((item) => item.path), '/enterprise', ...MAGAZINE_ARTICLE_IDS.map((id) => `/magazine/${id}`)]

function localizedUrl(locale, path) {
  const normalized = path === '/' ? '' : path
  return `${SITE_URL}/${locale}${normalized}`
}

function buildSitemapXml() {
  const urlEntries = PATHS.map((path) => {
    const alternates = LOCALES.map((locale) => `      <xhtml:link rel="alternate" hreflang="${locale}" href="${localizedUrl(locale, path)}" />`).join('\n')
    const xDefault = `      <xhtml:link rel="alternate" hreflang="x-default" href="${localizedUrl(DEFAULT_LOCALE, path)}" />`
    return `    <url>\n      <loc>${localizedUrl(DEFAULT_LOCALE, path)}</loc>\n${alternates}\n${xDefault}\n    </url>`
  }).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urlEntries}\n</urlset>\n`
}

function buildRobotsTxt() {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
}

writeFileSync(path.join(distDir, 'sitemap.xml'), buildSitemapXml())
writeFileSync(path.join(distDir, 'robots.txt'), buildRobotsTxt())

console.log(`Generated sitemap.xml and robots.txt in ${distDir}`)
