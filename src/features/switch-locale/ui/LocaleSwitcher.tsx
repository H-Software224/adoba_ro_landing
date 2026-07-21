'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/shared/i18n/navigation'
import { routing } from '@/shared/i18n/routing'
import { cn } from '@/shared/lib/cn'

const LOCALE_LABEL: Record<string, string> = {
  ko: 'KO',
  en: 'EN',
}

export function LocaleSwitcher({ variant = 'default' }: { variant?: 'default' | 'pill-dark' }) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  if (variant === 'pill-dark') {
    return (
      <div className="flex items-center gap-1 rounded-full border border-white p-1 text-b3">
        {routing.locales.map((nextLocale) => (
          <button
            key={nextLocale}
            type="button"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
            aria-current={nextLocale === locale}
            className={cn(
              'rounded-full px-3 py-2 text-[14px] transition-colors',
              nextLocale === locale ? 'bg-white text-text-primary' : 'text-white/80 hover:text-white',
            )}
          >
            {LOCALE_LABEL[nextLocale]}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="flex items-center gap-1 rounded-full border border-white bg-[#f6f8fa] p-1 text-b3">
      {routing.locales.map((nextLocale) => (
        <button
          key={nextLocale}
          type="button"
          onClick={() => router.replace(pathname, { locale: nextLocale })}
          aria-current={nextLocale === locale}
          className={cn(
            'rounded-full px-2 py-1 text-[13px] transition-colors sm:px-3 sm:text-[14px]',
            nextLocale === locale
              ? 'bg-text-primary text-white shadow-[0px_4px_2px_rgba(0,0,0,0.1)]'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          {LOCALE_LABEL[nextLocale]}
        </button>
      ))}
    </div>
  )
}
