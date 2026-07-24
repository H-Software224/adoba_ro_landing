import { cloneElement, isValidElement, useSyncExternalStore, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from './i18n'

// `i18n.changeLanguage()` (called from an effect after a locale-route change)
// resolves asynchronously, so a component that reads `i18n.language` directly
// during render can catch it either before or after the flip depending on
// unrelated render/commit timing — observed in practice as some components
// (e.g. Header/Footer) staying one navigation behind while others (page
// content) update immediately. Subscribing via `useSyncExternalStore` makes
// every `getTranslations()` caller re-render deterministically on the actual
// 'languageChanged' event instead of racing it.
function subscribeToLanguageChange(onChange: () => void): () => void {
  i18n.on('languageChanged', onChange)
  return () => i18n.off('languageChanged', onChange)
}

function useActiveLanguage(): string {
  return useSyncExternalStore(subscribeToLanguageChange, () => i18n.language, () => i18n.language)
}

/**
 * Drop-in replacement for next-intl's `getTranslations`/`useTranslations`
 * scoped translator, built on i18next. Only reimplements the surface this
 * codebase actually calls: `t(key)`, `t.rich(key, els)`, `t.markup(key, els)`,
 * `t.raw(key)`, `t.has(key)`.
 *
 * next-intl scopes a translator to a dotted namespace path (e.g.
 * `getTranslations('home.hero')` reads `messages.home.hero.*`) and also
 * supports an unscoped root translator (`getTranslations()`) addressed with
 * fully-qualified dotted keys (`t('home.footer.tagline')`). i18next only has
 * a single-level namespace, so the first dotted segment is always treated as
 * the i18next namespace and the remainder as a key prefix within it.
 */

type RichRenderer = ((chunks: ReactNode) => ReactNode) | ReactNode
type MarkupRenderer = ((chunks: string) => string) | string

export interface CompatT {
  (key: string, values?: Record<string, unknown>): string
  rich(key: string, values?: Record<string, RichRenderer>): ReactNode
  markup(key: string, values?: Record<string, MarkupRenderer>): string
  raw(key: string): unknown
  has(key: string): boolean
}

function createTagRegExp(): RegExp {
  return /<(\w+)>([\s\S]*?)<\/\1>|<(\w+)\/>|\{(\w+)\}/g
}

// React's dev-mode key check unwraps `Fragment` children unconditionally when
// validating a list, even if the Fragment itself already has a key from
// `Children.toArray` — so a renderer (e.g. `softBreak`) that returns a
// `<>multiple<els/></>` still trips "each child in a list should have a
// unique key". Pushing array results flat (spread) instead of nested sidesteps
// that entirely, since `Children.toArray` keys flat arrays of elements fine.
function pushNode(nodes: ReactNode[], value: ReactNode): void {
  if (Array.isArray(value)) nodes.push(...(value as ReactNode[]))
  else nodes.push(value)
}

function renderRich(raw: string, values: Record<string, RichRenderer | MarkupRenderer>, asMarkup: boolean): ReactNode | string {
  // A fresh RegExp per call (rather than a shared module-level one) — recursion
  // into paired-tag content would otherwise stomp on the outer call's `lastIndex`
  // since `g`-flag regexes carry mutable position state on the object itself.
  const tagRe = createTagRegExp()
  const nodes: ReactNode[] = []
  let cursor = 0
  let match: RegExpExecArray | null

  while ((match = tagRe.exec(raw))) {
    if (match.index > cursor) nodes.push(raw.slice(cursor, match.index))
    const [, pairTag, pairContent, selfTag, placeholder] = match

    if (pairTag !== undefined) {
      const renderer = values[pairTag]
      const inner = renderRich(pairContent ?? '', values, asMarkup)
      pushNode(nodes, typeof renderer === 'function' ? (renderer as (chunks: never) => ReactNode)(inner as never) : inner)
    } else if (selfTag !== undefined) {
      const renderer = values[selfTag]
      pushNode(nodes, typeof renderer === 'function' ? (renderer as () => ReactNode)() : (renderer ?? ''))
    } else if (placeholder !== undefined) {
      const value = values[placeholder]
      pushNode(nodes, typeof value === 'function' ? (value as () => ReactNode)() : (value ?? ''))
    }
    cursor = tagRe.lastIndex
  }
  if (cursor < raw.length) nodes.push(raw.slice(cursor))

  if (asMarkup) return nodes.join('')
  return nodes.length === 1 ? nodes[0] : keyNodes(nodes)
}

// `Children.toArray` is documented for exactly this (keying a manually built
// list) but empirically still left React's reconciler warning about missing
// keys here, so keys are assigned directly instead: `cloneElement` to stamp a
// key onto each element, left as-is for plain strings (which never need one).
function keyNodes(nodes: ReactNode[]): ReactNode[] {
  return nodes.map((node, index) => (isValidElement(node) ? cloneElement(node, { key: `n${index}` }) : node))
}

function resolveNsKey(scopeNs: string | null, scopePrefix: string, key: string): { ns: string; key: string } {
  if (scopeNs) return { ns: scopeNs, key: scopePrefix ? `${scopePrefix}.${key}` : key }
  const [ns, ...rest] = key.split('.')
  return { ns: ns ?? '', key: rest.join('.') }
}

function buildT(scopeNs: string | null, scopePrefix: string, lng?: string): CompatT {
  const activeLng = lng ?? i18n.language

  const t = ((key: string, vars?: Record<string, unknown>) => {
    const { ns, key: rkey } = resolveNsKey(scopeNs, scopePrefix, key)
    return i18n.t(rkey, { ns, lng: activeLng, ...vars }) as string
  }) as CompatT

  t.raw = (key: string) => {
    const { ns, key: rkey } = resolveNsKey(scopeNs, scopePrefix, key)
    return i18n.getResource(activeLng, ns, rkey)
  }
  t.has = (key: string) => {
    const { ns, key: rkey } = resolveNsKey(scopeNs, scopePrefix, key)
    return i18n.exists(rkey, { ns, lng: activeLng })
  }
  t.rich = (key: string, values = {}) => {
    const { ns, key: rkey } = resolveNsKey(scopeNs, scopePrefix, key)
    const raw = (i18n.getResource(activeLng, ns, rkey) as string) ?? ''
    return renderRich(raw, values, false)
  }
  t.markup = (key: string, values = {}) => {
    const { ns, key: rkey } = resolveNsKey(scopeNs, scopePrefix, key)
    const raw = (i18n.getResource(activeLng, ns, rkey) as string) ?? ''
    return renderRich(raw, values, true) as string
  }

  return t
}

function splitNamespace(namespace: string): [string, string] {
  const [ns, ...rest] = namespace.split('.')
  return [ns ?? '', rest.join('.')]
}

/**
 * next-intl `getTranslations(namespace)` / `getTranslations({ locale, namespace })` / `getTranslations()`.
 * Despite the name (matching next-intl's async server API this replaces),
 * this is effectively a hook now — see `useActiveLanguage` above — so every
 * call site must call it unconditionally during render, same as any hook.
 */
export function getTranslations(arg?: string | { locale?: string; namespace?: string }): CompatT {
  // Named to match next-intl's API (see file header), not the `use*` hook
  // convention — every call site does call it unconditionally at the top of
  // a component, same as a real hook, just verify that when touching one.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const activeLanguage = useActiveLanguage()
  const locale = typeof arg === 'object' ? arg.locale : undefined
  const namespace = typeof arg === 'string' ? arg : arg?.namespace
  const lng = locale ?? activeLanguage
  if (!namespace) return buildT(null, '', lng)
  const [ns, prefix] = splitNamespace(namespace)
  return buildT(ns, prefix, lng)
}

/** next-intl `useTranslations(namespace)` — subscribes to i18next language changes. */
export function useTranslations(namespace: string): CompatT {
  const [ns, prefix] = splitNamespace(namespace)
  useTranslation(ns)
  return buildT(ns, prefix)
}

/** next-intl `getLocale()` — also effectively a hook now, same reasoning as `getTranslations`. */
export function getLocale(): string {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useActiveLanguage()
}
