import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { Button } from '@/shared/ui/Button'
import { LocaleSwitcher } from '@/features/switch-locale'

export async function Gnb() {
  const t = await getTranslations('enterprise.gnb')

  return (
    <div className="sticky top-0 z-10 flex h-16 items-center justify-between gap-2 px-4 sm:px-6 lg:px-10">
      <Image
        src="/images/enterprise/logo-enterprise.png"
        alt="adobaRo Enterprise"
        width={128}
        height={32}
        priority
        className="h-auto w-24 shrink-0 sm:w-32"
      />
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">
        <LocaleSwitcher variant="pill-dark" />
        <Button
          as="a"
          href="#contact"
          variant="ghost-light"
          className="!bg-transparent shrink-0 whitespace-nowrap border border-white px-4 py-2 text-[13px] sm:px-6 sm:py-3 sm:text-[16px]"
        >
          {t('contact')}
        </Button>
      </div>
    </div>
  )
}
