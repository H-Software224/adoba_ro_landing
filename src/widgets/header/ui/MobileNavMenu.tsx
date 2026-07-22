'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link, usePathname } from '@/shared/i18n/navigation'
import { NAV_ITEMS } from '@/shared/config/navigation'
import { cn } from '@/shared/lib/cn'

export function MobileNavMenu({ className }: { className?: string }) {
  const t = useTranslations('nav')
  const tCommon = useTranslations('common')
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label={tCommon('menuAlt')}
        className="flex size-11 shrink-0 items-center justify-center rounded-full hover:bg-black/5"
      >
        <Image src="/images/icons/icon-menu.svg" alt="" width={24} height={24} className="size-6" />
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <div className="absolute right-0 top-full z-50 mt-2 flex w-48 flex-col gap-1 rounded-2xl border border-[#e5e7eb] bg-white p-2 shadow-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.key}
                  href={item.path}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'inline-flex min-h-11 items-center rounded-xl px-4 text-b3 transition-colors',
                    isActive ? 'bg-[#f6f8fa] font-semibold text-text-primary' : 'text-text-secondary hover:bg-[#f6f8fa]',
                  )}
                >
                  {t(item.key)}
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
