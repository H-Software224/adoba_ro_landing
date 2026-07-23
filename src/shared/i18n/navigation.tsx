import { forwardRef } from 'react'
import {
  Link as RouterLink,
  useLocation,
  useNavigate,
  useParams,
  type LinkProps as RouterLinkProps,
} from 'react-router-dom'
import { routing } from './routing'

/**
 * Compatibility layer for next-intl's `createNavigation(routing)` output,
 * reimplemented on react-router-dom. Only `Link`, `usePathname`, `useRouter`
 * are used anywhere in this codebase (verified via grep) — next-intl's
 * `redirect`/`getPathname` are not, so they're intentionally not ported.
 */

function currentLocale(paramLocale: string | undefined): string {
  return paramLocale ?? routing.defaultLocale
}

/** Current route locale, mirroring next-intl's `useLocale()`. */
export function useLocale(): string {
  const { locale } = useParams<{ locale: string }>()
  return currentLocale(locale)
}

function withLocale(locale: string, href: string): string {
  return href === '/' ? `/${locale}` : `/${locale}${href}`
}

interface LinkProps extends Omit<RouterLinkProps, 'to'> {
  href: string
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link({ href, ...props }, ref) {
  const { locale } = useParams<{ locale: string }>()
  return <RouterLink ref={ref} to={withLocale(currentLocale(locale), href)} {...props} />
})

/** Locale-agnostic pathname, mirroring next-intl's `usePathname()`. */
export function usePathname(): string {
  const { locale } = useParams<{ locale: string }>()
  const { pathname } = useLocation()
  const prefix = `/${currentLocale(locale)}`
  if (pathname === prefix) return '/'
  return pathname.startsWith(prefix) ? pathname.slice(prefix.length) : pathname
}

export function useRouter() {
  const navigate = useNavigate()
  const { locale } = useParams<{ locale: string }>()

  return {
    push(href: string, options?: { locale?: string }) {
      navigate(withLocale(options?.locale ?? currentLocale(locale), href))
    },
    replace(href: string, options?: { locale?: string }) {
      navigate(withLocale(options?.locale ?? currentLocale(locale), href), { replace: true })
    },
  }
}
