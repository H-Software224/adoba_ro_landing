import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { Link } from '@/shared/i18n/navigation'
import { LocaleSwitcher } from '@/features/switch-locale'
import { StartFreeButton } from '@/features/start-free'
import { NavMenu } from './NavMenu'
import { MobileNavMenu } from './MobileNavMenu'

export function Header() {
  const t = getTranslations()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#f4f1f8] via-[#faeff3] to-[#ecf6fa]">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:gap-x-4 lg:px-6 xl:px-10">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image src="/images/logo/ro-mark.svg" alt="" width={30} height={32} priority />
          <Image src="/images/logo/adobaro-wordmark.svg" alt={t('common.logoAlt')} width={91} height={14} priority />
        </Link>

        <NavMenu />

        <div className="flex items-center gap-1 sm:gap-2 lg:shrink-0 lg:gap-4 xl:gap-6">
          <MobileNavMenu className="lg:hidden" />
          <LocaleSwitcher />
          <StartFreeButton variant="light" className="h-11 shrink whitespace-nowrap px-2 py-2 text-[11px] lg:h-10 lg:shrink-0 lg:px-4 lg:py-2.5 lg:text-b3">
            {t('common.startFree')}
          </StartFreeButton>
        </div>
      </div>
    </header>
  )
}
