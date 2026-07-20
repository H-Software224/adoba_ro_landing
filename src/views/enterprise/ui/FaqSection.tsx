import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { faqPageSchema } from '@/shared/seo/schemas/faq-page'

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4'] as const

interface FaqItem {
  question: string
  answer: string
  links?: { label: string; href: string }[]
}

export async function FaqSection() {
  const t = await getTranslations('enterprise.faq')
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
                <Image
                  src="/images/enterprise/icon-plus.png"
                  alt=""
                  width={32}
                  height={32}
                  className="shrink-0 transition-transform group-open:rotate-45"
                />
              </summary>
              <div className="mt-6 flex flex-col gap-6">
                <p className="whitespace-pre-line text-b3 text-white/80">{item.answer}</p>
                {item.links && (
                  <div className="flex flex-wrap gap-6">
                    {item.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-b3 text-white underline underline-offset-2 transition-colors hover:text-white/80"
                      >
                        {link.label}
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
