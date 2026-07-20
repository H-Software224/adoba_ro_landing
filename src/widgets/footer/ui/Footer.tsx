import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { StartFreeButton } from '@/features/start-free'

export async function Footer() {
  const t = await getTranslations()

  return (
    <footer className="rounded-t-[80px] bg-[#111111] px-8 pb-16 pt-20 text-white lg:px-[120px]">
      <Image src="/images/logo/ro-mark-white.png" alt="" width={160} height={40} />
      <p className="mt-16 text-h3 text-white">{t.rich('home.footer.tagline', { br: () => <br /> })}</p>
      <StartFreeButton variant="ghost-light" className="mt-12">
        {t('common.startFree')}
      </StartFreeButton>
      <div className="mt-28 flex flex-wrap gap-10 text-b3 text-white/80">
        <p>{t('footer.companyName')}</p>
        <p>{t('footer.address')}</p>
        <p>{t('footer.telephone')}</p>
        <p>{t('footer.email')}</p>
      </div>
    </footer>
  )
}
