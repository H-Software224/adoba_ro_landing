import { getTranslations } from '@/shared/i18n/compat'
import { Image } from '@/shared/ui/Image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { faqPageSchema } from '@/shared/seo/schemas/faq-page'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4'] as const

interface FaqItem {
  question: string
  answer: string
  links?: { label: string; href: string }[]
}

export function FaqSection() {
  const t = getTranslations('enterprise.faq')
  const items = FAQ_KEYS.map((key) => ({ key, ...(t.raw(`items.${key}`) as FaqItem) }))
  const schema = faqPageSchema(items.map(({ question, answer }) => ({ question, answer })))

  return (
    <section className="bg-enterprise-bg px-6 py-20 lg:px-10 lg:py-32">
      <JsonLd data={schema} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-16 lg:flex-row">
        <SectionHeading level={2} className="text-white lg:w-[287px] lg:shrink-0">
          {t('title')}
        </SectionHeading>
        <div className="flex flex-1 flex-col">
          {items.map((item) => (
            <details key={item.key} name="enterprise-faq" className="group border-b border-white/20 py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h3 font-semibold text-white marker:content-none">
                {item.question}
                <span className="relative block size-6 shrink-0 sm:size-7 md:size-8">
                  <Image
                    src="/images/enterprise/icon-plus.png"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 32px, (min-width: 640px) 28px, 24px"
                    className="group-open:hidden"
                  />
                  <Image
                    src="/images/enterprise/icon-minus.svg"
                    alt=""
                    fill
                    sizes="(min-width: 768px) 32px, (min-width: 640px) 28px, 24px"
                    className="hidden group-open:block"
                  />
                </span>
              </summary>
              <div className="mt-6 flex flex-col gap-3">
                <p className="whitespace-pre-line text-b3 text-white/80">{item.answer}</p>
                {item.links && (
                  <div className="flex flex-col gap-3">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-fit items-center gap-0.5 text-b3 text-enterprise-accent transition-colors hover:text-enterprise-accent/80"
                      >
                        {link.label}
                        <Image
                          src="/images/enterprise/icon-arrow-right.svg"
                          alt=""
                          width={24}
                          height={24}
                          sizes="(min-width: 768px) 24px, 20px"
                          className="size-5 md:size-6"
                        />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
