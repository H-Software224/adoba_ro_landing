import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { JsonLd } from '@/shared/seo/JsonLd'
import { howToSchema } from '@/shared/seo/schemas/how-to'
import { cn } from '@/shared/lib/cn'

const STEP_KEYS = ['create', 'config', 'edit', 'deliver'] as const

const PILL_GRADIENT = [
  'from-enterprise-accent to-enterprise-accent-deep',
  'from-enterprise-accent-deep to-enterprise-indigo-700',
  'from-enterprise-indigo-700 to-enterprise-indigo-900',
  'from-enterprise-indigo-900 to-enterprise-indigo-950',
]

// Figma has each step shift 120px right as it rises — a diagonal staircase, not a flat stack.
// At exactly `lg` (1024px) the full-size staircase (460px pill + up to 360px offset = 820px)
// leaves almost no room for the title column, so it's scaled down until `xl` (1280px) where
// the layout has enough width for the Figma-spec size.
const PILL_INDENT = ['lg:ml-0', 'lg:ml-[40px] xl:ml-[120px]', 'lg:ml-[80px] xl:ml-[240px]', 'lg:ml-[120px] xl:ml-[360px]']

export async function CustomizationSection() {
  const t = await getTranslations('enterprise.customization')

  const schema = howToSchema({
    name: t('title').replace('\n', ' '),
    steps: STEP_KEYS.map((key) => ({ name: t(`steps.${key}.name`), text: t(`steps.${key}.text`) })),
  })

  return (
    <section className="bg-enterprise-bg px-6 py-20 lg:px-10 lg:py-32">
      <JsonLd data={schema} />
      <div className="mx-auto flex max-w-[1360px] flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <SectionHeading level={2} className="whitespace-pre-line text-white">
            {t('title')}
          </SectionHeading>
          <p className="whitespace-pre-line text-b2 text-white/80">{t('description')}</p>
        </div>
        <ol className="flex w-full flex-col items-start gap-4 lg:w-fit lg:shrink-0 lg:flex-col-reverse">
          {STEP_KEYS.map((key, index) => (
            <li
              key={key}
              className={cn(
                'flex items-center justify-center rounded-full border border-white/10 bg-gradient-to-r px-10 py-6 lg:w-[280px] lg:px-6 xl:w-[460px] xl:px-10',
                PILL_GRADIENT[index],
                PILL_INDENT[index],
              )}
            >
              <SectionHeading level={3} className="whitespace-nowrap text-center text-white">
                {t(`steps.${key}.name`)}
              </SectionHeading>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
