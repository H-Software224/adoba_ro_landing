import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { StartFreeButton } from '@/features/start-free'

export async function Footer() {
  const t = await getTranslations()

  return (
    <footer className="rounded-t-[80px] bg-[#111111] px-8 pb-16 pt-20 text-white lg:px-[120px]">
      <Image src="/images/logo/ro-mark-white.png" alt="" width={160} height={40} />
      <p className="mt-6 text-[40px] font-semibold leading-none tracking-[-0.0225em] text-white">
        {t.rich('home.footer.tagline', { br: () => <br /> })}
      </p>
      <StartFreeButton variant="ghost-light" className="mt-8 h-[60px] w-[240px] rounded-xl text-b3">
        {t('common.startFree')}
      </StartFreeButton>
      <div className="mt-24 flex flex-wrap justify-center gap-10 text-center text-b3 text-white/80">
        <p>{t('footer.companyName')}</p>
        <p>{t('footer.address')}</p>
        <p>{t('footer.telephone')}</p>
        <p>{t('footer.email')}</p>
      </div>
    </footer>
  )
}
