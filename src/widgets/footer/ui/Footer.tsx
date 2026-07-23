import { getTranslations } from '@/shared/i18n/compat'
import { softBreak } from '@/shared/i18n/rich'
import { Image } from '@/shared/ui/Image'
import { StartFreeButton } from '@/features/start-free'
import type { Locale } from '@/shared/i18n/routing'

const SNS_LINKS = {
  ko: [
    { name: 'YouTube', icon: '/images/footer/icon-youtube.svg', href: 'https://www.youtube.com/@adoba.official' },
    { name: 'Instagram', icon: '/images/footer/icon-instagram.svg', href: 'https://www.instagram.com/adoba.rokorea/' },
    { name: 'Blog', icon: '/images/footer/icon-blog.svg', href: 'https://blog.naver.com/adobaro' },
  ],
  en: [
    { name: 'Instagram', icon: '/images/footer/icon-instagram.svg', href: 'https://www.instagram.com/adoba.ro/' },
    { name: 'Medium', icon: '/images/footer/icon-medium.svg', href: 'https://medium.com/adoba' },
    { name: 'X', icon: '/images/footer/icon-x.svg', href: 'https://x.com/officialadobaro' },
    { name: 'LinkedIn', icon: '/images/footer/icon-linkedin.svg', href: 'https://www.linkedin.com/company/adobacorp' },
  ],
} as const

export function Footer({ locale }: { locale: Locale }) {
  const t = getTranslations()
  const snsLinks = SNS_LINKS[locale === 'en' ? 'en' : 'ko']

  return (
    <footer className="rounded-t-[80px] bg-[#111111] px-8 pb-16 pt-20 text-white lg:px-[120px]">
      <Image src="/images/logo/ro-mark-white.png" alt="" width={160} height={40} />
      <p className="mt-6 text-[28px] font-semibold leading-none tracking-[-0.0225em] text-white sm:text-[32px] lg:text-[40px]">
        {t.rich('home.footer.tagline', { br: softBreak })}
      </p>
      <StartFreeButton variant="ghost-light" className="mt-8 h-[60px] w-[240px] rounded-xl text-b3">
        {t('common.startFree')}
      </StartFreeButton>
      <div className="mt-6 flex items-center gap-2">
        {snsLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            className="flex size-11 items-center justify-center"
          >
            <Image src={link.icon} alt="" width={24} height={24} />
          </a>
        ))}
      </div>
      <div className="mt-[60px] flex flex-wrap justify-center gap-10 text-center text-b3 text-white/80">
        <p>{t('footer.companyName')}</p>
        <p>{t('footer.address')}</p>
        <p>{t('footer.telephone')}</p>
        <p>{t('footer.email')}</p>
      </div>
    </footer>
  )
}
