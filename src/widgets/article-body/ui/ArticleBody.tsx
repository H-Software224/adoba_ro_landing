import Image from 'next/image'
import type { Article } from '@/entities/article'
import { getTranslations } from 'next-intl/server'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export async function ArticleBody({ article }: { article: Article }) {
  const t = await getTranslations('magazine.article')
  const { fullBody } = article

  return (
    <article className="mx-auto flex max-w-[760px] flex-col gap-8 px-6 py-20">
      <div className="flex items-center gap-3 text-b3 text-text-tertiary">
        {article.authorName && <span>{article.authorName}</span>}
        {article.datePublished && (
          <>
            <span aria-hidden="true">·</span>
            <time dateTime={article.datePublished}>
              {t('publishedLabel')} {article.datePublished}
            </time>
          </>
        )}
      </div>

      {article.image && (
        <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-[#e8ebf6]">
          <Image src={article.image} alt="" fill className="object-cover" />
        </div>
      )}

      {fullBody ? (
        <>
          {fullBody.summaryTitle && fullBody.summaryText && (
            <div className="flex flex-col gap-3 rounded-3xl bg-[#f7f8fb] p-8">
              <SectionHeading level={2} size="h3">
                {fullBody.summaryTitle}
              </SectionHeading>
              <p className="text-b1 text-text-secondary">{fullBody.summaryText}</p>
            </div>
          )}

          {fullBody.pullQuote && (
            <p className="text-h3 text-text-primary">{fullBody.pullQuote}</p>
          )}

          {fullBody.bodyImage && (
            <div className="relative aspect-[720/199] w-full overflow-hidden rounded-3xl">
              <Image src={fullBody.bodyImage} alt="" fill className="object-cover" />
            </div>
          )}

          <p className="text-b1 text-text-secondary">{fullBody.intro}</p>

          {fullBody.sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <SectionHeading level={2} size="h3">
                {section.title}
              </SectionHeading>
              {section.intro && <p className="text-b1 text-text-secondary">{section.intro}</p>}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="flex flex-col gap-2">
                  <SectionHeading level={3} size="b1">
                    {subsection.title}
                  </SectionHeading>
                  <p className="text-b1 text-text-secondary">{subsection.text}</p>
                </div>
              ))}
            </div>
          ))}

          {fullBody.conclusion && (
            <div className="flex flex-col gap-4">
              <SectionHeading level={2} size="h3">
                {fullBody.conclusion.title}
              </SectionHeading>
              {fullBody.conclusion.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-b1 text-text-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </>
      ) : (
        article.excerpt && <p className="text-b1 text-text-secondary">{article.excerpt}</p>
      )}

      {article.externalUrl && (
        <a
          href={article.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full bg-text-primary px-8 py-4 text-b3 font-semibold text-white transition-colors hover:bg-text-primary/90"
        >
          {t('readMore')}
        </a>
      )}
    </article>
  )
}
