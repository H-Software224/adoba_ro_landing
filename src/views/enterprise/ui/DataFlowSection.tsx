import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { itemListSchema } from '@/shared/seo/schemas/item-list'
import { SITE_URL } from '@/shared/lib/build-alternates'

export function DataFlowSection() {
  const t = getTranslations('enterprise.dataFlow')

  const schema = itemListSchema([
    { name: t('itemList.collect'), url: `${SITE_URL}/enterprise#data-flow` },
    { name: t('itemList.compare'), url: `${SITE_URL}/enterprise#data-flow` },
    { name: t('itemList.present'), url: `${SITE_URL}/enterprise#data-flow` },
  ])

  return (
    <section id="data-flow" className="bg-enterprise-bg-alt px-6 py-20 text-center lg:px-10 lg:py-32">
      <JsonLd data={schema} />
      <div className="mx-auto flex max-w-[813px] flex-col items-center gap-6">
        <SectionHeading level={2} className="whitespace-pre-line text-white">
          {t('title')}
        </SectionHeading>
        <p className="whitespace-pre-line text-b2 text-white/80">{t('description')}</p>
      </div>
      <div className="mx-auto mt-20 flex max-w-[860px] flex-col items-center gap-10">
        <div className="relative grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-[104px]">
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-14">
            <SectionHeading level={3} className="text-white">
              {t('steps.youtubeApi.title')}
            </SectionHeading>
            <p className="text-b1 text-white/80">{t('steps.youtubeApi.description')}</p>
          </div>
          <Image
            src="/images/enterprise/icon-plus-connector.svg"
            alt=""
            width={56}
            height={56}
            sizes="(min-width: 768px) 56px, (min-width: 640px) 40px, 32px"
            className="absolute left-1/2 top-1/2 size-8 -translate-x-1/2 -translate-y-1/2 sm:size-10 md:size-14"
          />
          <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-14">
            <SectionHeading level={3} className="text-white">
              {t('steps.linkedData.title')}
            </SectionHeading>
            <p className="text-b1 text-white/80">{t('steps.linkedData.description')}</p>
          </div>
        </div>
        <Image
          src="/images/enterprise/icon-chevron-down.png"
          alt=""
          width={80}
          height={24}
          sizes="(min-width: 768px) 80px, (min-width: 640px) 64px, 48px"
          className="h-auto w-12 sm:w-16 md:w-20"
        />
        <div className="flex w-full max-w-[420px] flex-col items-center gap-2 rounded-2xl bg-white/5 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-14">
          <SectionHeading level={3} className="text-white">
            {t('steps.dataCenter.title')}
          </SectionHeading>
          <p className="text-b1 text-white/80">{t('steps.dataCenter.description')}</p>
        </div>
        <Image
          src="/images/enterprise/icon-chevron-down.png"
          alt=""
          width={80}
          height={24}
          sizes="(min-width: 768px) 80px, (min-width: 640px) 64px, 48px"
          className="h-auto w-12 sm:w-16 md:w-20"
        />
        <div className="flex w-full max-w-[420px] flex-col items-center gap-2 rounded-2xl border border-white/15 bg-gradient-to-b from-enterprise-accent/30 to-enterprise-accent-deep/30 px-6 py-8 sm:px-8 sm:py-10 md:px-10 md:py-14">
          <SectionHeading level={3} className="text-white">
            {t('steps.direction.title')}
          </SectionHeading>
          <p className="text-b1 text-white/80">{t('steps.direction.description')}</p>
        </div>
      </div>
    </section>
  )
}
