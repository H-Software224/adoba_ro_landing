'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/shared/i18n/navigation'
import { NAV_ITEMS } from '@/shared/config/navigation'
import { cn } from '@/shared/lib/cn'

export function NavMenu() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <nav className="hidden items-center gap-6 text-b3 text-text-primary lg:flex xl:gap-12">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link
            key={item.key}
            href={item.path}
            aria-current={isActive ? 'page' : undefined}
            className={cn('inline-flex min-h-11 items-center hover:text-brand', isActive ? 'font-semibold' : 'font-normal')}
          >
            {t(item.key)}
          </Link>
        )
      })}
    </nav>
  )
}
