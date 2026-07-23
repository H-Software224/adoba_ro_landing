import { useEffect } from 'react'
import type { buildAlternates } from './build-alternates'

interface DocumentMetaInput {
  title: string
  description: string
  alternates?: ReturnType<typeof buildAlternates>
}

function upsertMeta(selector: string, tag: string, attrs: Record<string, string>): HTMLElement {
  let el = document.head.querySelector(selector) as HTMLElement | null
  if (!el) {
    el = document.createElement(tag)
    document.head.appendChild(el)
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value)
  return el
}

/**
 * Client-side replacement for Next's `generateMetadata` (no SSR, so this
 * mutates `document.head` after mount). Title gets the same " | adobaRo"
 * suffix the old root layout's `title.template` applied to every page.
 */
export function useDocumentMeta({ title, description, alternates }: DocumentMetaInput) {
  useEffect(() => {
    document.title = `${title} | adobaRo`
    upsertMeta('meta[name="description"]', 'meta', { name: 'description', content: description })

    if (alternates) {
      upsertMeta('link[rel="canonical"]', 'link', { rel: 'canonical', href: alternates.canonical })

      for (const el of document.head.querySelectorAll('link[rel="alternate"][data-managed-hreflang]')) {
        el.remove()
      }
      for (const [hreflang, href] of Object.entries(alternates.languages)) {
        const link = document.createElement('link')
        link.setAttribute('rel', 'alternate')
        link.setAttribute('hreflang', hreflang)
        link.setAttribute('href', href)
        link.setAttribute('data-managed-hreflang', 'true')
        document.head.appendChild(link)
      }
    }
  }, [title, description, alternates])
}
