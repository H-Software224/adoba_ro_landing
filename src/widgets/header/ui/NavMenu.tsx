'use client'

import { useTranslations } from 'next-intl'
import { Link, usePathname } from '@/shared/i18n/navigation'
import { NAV_ITEMS } from '@/shared/config/navigation'
import { cn } from '@/shared/lib/cn'

export function NavMenu() {
  const t = useTranslations('nav')
  const pathname = usePathname()

  return (
    <div className="relative lg:contents">
      <nav className="-mx-4 flex items-center gap-6 overflow-x-auto whitespace-nowrap px-4 text-b3 text-text-primary sm:-mx-6 sm:px-6 lg:order-2 lg:mx-0 lg:gap-12 lg:overflow-visible lg:px-0">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path
          return (
            <Link
              key={item.key}
              href={item.path}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'inline-flex min-h-11 shrink-0 items-center hover:text-brand',
                isActive ? 'font-semibold' : 'font-normal',
              )}
            >
              {t(item.key)}
            </Link>
          )
        })}
      </nav>
      {/* scroll affordance: hints that the row scrolls horizontally on mobile/tablet */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#ecf6fa] to-transparent lg:hidden"
      />
    </div>
  )
}
