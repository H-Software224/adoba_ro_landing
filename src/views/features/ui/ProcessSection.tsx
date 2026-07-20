import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { howToSchema } from '@/shared/seo/schemas/how-to'

const STEP_KEYS = ['upload', 'detect', 'localize', 'publish'] as const

export async function ProcessSection() {
  const t = await getTranslations('features.process')

  const steps = STEP_KEYS.map((key) => t(`steps.${key}`))
  const schema = howToSchema({
    name: t.markup('title', { br: () => ' ' }),
    description: t('description'),
    steps: steps.map((step) => ({ name: step, text: step })),
  })

  return (
    <section className="bg-white px-6 py-20 lg:px-10">
      <JsonLd data={schema} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-[668px] flex-col gap-6">
          <SectionHeading level={2} size="h2-strong">
            {t.rich('title', { br: () => <br /> })}
          </SectionHeading>
          <p className="text-b1 text-text-secondary">{t('description')}</p>
        </div>
        <ol className="flex flex-col items-center">
          {steps.map((step, index) => (
            <li key={step} className="flex flex-col items-center">
              <div className="rounded-3xl bg-[#ebf2fb] px-6 py-4 text-center text-b1 text-text-primary">{step}</div>
              {index < steps.length - 1 && (
                <div aria-hidden="true" className="flex flex-col items-center py-3">
                  <span className="size-3 shrink-0 rounded-full bg-brand" />
                  <span className="h-14 w-0 border-l-2 border-dotted border-brand/40" />
                  <span className="size-0 border-x-4 border-t-[6px] border-x-transparent border-t-brand/40" />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
