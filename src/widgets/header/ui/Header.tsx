import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Link } from '@/shared/i18n/navigation'
import { LocaleSwitcher } from '@/features/switch-locale'
import { StartFreeButton } from '@/features/start-free'
import { NavMenu } from './NavMenu'

export async function Header() {
  const t = await getTranslations()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-[#f4f1f8] via-[#faeff3] to-[#ecf6fa]">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-6 sm:py-0 lg:h-[72px] lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-y-2 lg:contents">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/images/logo/ro-mark.svg" alt="" width={30} height={32} priority />
            <Image
              src="/images/logo/adobaro-wordmark.svg"
              alt={t('common.logoAlt')}
              width={91}
              height={14}
              priority
            />
          </Link>

          <div className="flex min-w-0 items-center gap-2 lg:order-3 lg:gap-6">
            <LocaleSwitcher />
            <StartFreeButton variant="light" className="h-11 shrink px-2.5 py-2 text-[14px] lg:h-10 lg:shrink-0 lg:px-4 lg:py-2.5 lg:text-b3">
              {t('common.startFree')}
            </StartFreeButton>
          </div>
        </div>

        <NavMenu />
      </div>
    </header>
  )
}
