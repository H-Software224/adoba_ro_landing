import { useTranslations } from '@/shared/i18n/compat'
import { useLocale, usePathname, useRouter } from '@/shared/i18n/navigation'
import { cn } from '@/shared/lib/cn'

const LOCALE_LABEL: Record<string, string> = {
  ko: 'KO',
  en: 'EN',
}

export function LocaleSwitcher({
  variant = 'default',
  className,
}: {
  variant?: 'default' | 'toggle-dark'
  className?: string
}) {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('common')
  const isEn = locale === 'en'
  const toggleLocale = () => router.replace(pathname, { locale: isEn ? 'ko' : 'en' })

  if (variant === 'toggle-dark') {
    return (
      <button
        type="button"
        role="switch"
        aria-checked={isEn}
        aria-label={t('languageAlt')}
        onClick={toggleLocale}
        className={cn('relative flex h-9 w-28 shrink-0 items-center rounded-full border border-white p-1 text-[14px]', className)}
      >
        <span
          aria-hidden="true"
          className={cn(
            'absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-white transition-transform duration-200',
            isEn && 'translate-x-full',
          )}
        />
        <span className={cn('relative z-10 flex-1 text-center transition-colors', isEn ? 'text-white/80' : 'text-text-primary')}>
          {LOCALE_LABEL.ko}
        </span>
        <span className={cn('relative z-10 flex-1 text-center transition-colors', isEn ? 'text-text-primary' : 'text-white/80')}>
          {LOCALE_LABEL.en}
        </span>
      </button>
    )
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isEn}
      aria-label={t('languageAlt')}
      onClick={toggleLocale}
      className={cn(
        'relative flex h-7 w-16 shrink-0 items-center rounded-full border border-white bg-[#f6f8fa] p-1 text-[10px] lg:h-9 lg:w-28 lg:text-[14px]',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-text-primary shadow-[0px_4px_2px_rgba(0,0,0,0.1)] transition-transform duration-200',
          isEn && 'translate-x-full',
        )}
      />
      <span className={cn('relative z-10 flex-1 text-center transition-colors', isEn ? 'text-text-secondary' : 'text-white')}>
        {LOCALE_LABEL.ko}
      </span>
      <span className={cn('relative z-10 flex-1 text-center transition-colors', isEn ? 'text-white' : 'text-text-secondary')}>
        {LOCALE_LABEL.en}
      </span>
    </button>
  )
}
