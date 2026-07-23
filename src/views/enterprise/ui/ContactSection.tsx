import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { ContactForm } from './ContactForm'

export function ContactSection() {
  const t = getTranslations('enterprise.contact')

  return (
    <section id="contact" className="bg-enterprise-bg px-6 py-20 lg:px-10 lg:py-32">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-16 lg:flex-row lg:justify-between">
        <div className="flex flex-col gap-8 lg:w-[402px] lg:shrink-0">
          <div className="flex flex-col gap-3">
            <SectionHeading level={2} className="text-white">
              {t('title')}
            </SectionHeading>
            <p className="whitespace-pre-line text-b1 text-white/80">{t('description')}</p>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image
                src="/images/enterprise/icon-telephone.png"
                alt=""
                width={24}
                height={24}
                sizes="(min-width: 768px) 24px, 20px"
                className="size-5 md:size-6"
              />
              <p className="text-b3 text-white">{t('info.phone')}</p>
            </div>
            <div className="flex items-center gap-2">
              <Image
                src="/images/enterprise/icon-mail.png"
                alt=""
                width={24}
                height={24}
                sizes="(min-width: 768px) 24px, 20px"
                className="size-5 md:size-6"
              />
              <p className="text-b3 text-white">{t('info.email')}</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/enterprise/icon-building.png"
                  alt=""
                  width={24}
                  height={24}
                  sizes="(min-width: 768px) 24px, 20px"
                  className="size-5 md:size-6"
                />
                <p className="text-b3 text-white">{t('info.hqAddress')}</p>
              </div>
              <p className="pl-8 text-b3 text-white">{t('info.labAddress')}</p>
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}
