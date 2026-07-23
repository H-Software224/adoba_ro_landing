import { Image } from '@/shared/ui/Image'
import type { Article } from '@/entities/article'
import { getTranslations } from '@/shared/i18n/compat'
import { SectionHeading } from '@/shared/ui/SectionHeading'

/** Renders `**text**` spans as bold within an otherwise plain string. */
function BoldText({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g)
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={index} className="font-semibold text-text-primary">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
    </>
  )
}

function DataTable({ table }: { table: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="relative overflow-x-auto rounded-2xl border border-[#e2e8f0]">
      <table className="w-full border-collapse text-left text-b3">
        <thead>
          <tr className="bg-[#f7f8fb]">
            {table.headers.map((header) => (
              <th
                key={header}
                className="border-b border-[#e2e8f0] px-2 py-3 font-semibold text-text-primary sm:px-4"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#e2e8f0] last:border-0">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-2 py-3 align-top text-text-secondary sm:px-4">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent lg:hidden"
      />
    </div>
  )
}

export function ArticleBody({ article }: { article: Article }) {
  const t = getTranslations('magazine.article')
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
          <Image src={article.image} alt="" fill sizes="(min-width: 800px) 712px, 100vw" className="object-cover" />
        </div>
      )}

      {fullBody ? (
        <>
          {fullBody.summaryTitle && (fullBody.summaryText || fullBody.summaryItems) && (
            <div className="flex flex-col gap-3 rounded-3xl bg-[#f7f8fb] p-8">
              <SectionHeading level={2} size="h3">
                {fullBody.summaryTitle}
              </SectionHeading>
              {fullBody.summaryText && (
                <p className="text-b1 text-text-secondary">
                  <BoldText text={fullBody.summaryText} />
                </p>
              )}
              {fullBody.summaryItems && (
                <ul className="list-disc space-y-2 pl-5 text-b1 text-text-secondary marker:text-text-tertiary">
                  {fullBody.summaryItems.map((item) => (
                    <li key={item}>
                      <BoldText text={item} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {fullBody.pullQuote && (
            <p className="text-h3 text-text-primary">{fullBody.pullQuote}</p>
          )}

          {fullBody.bodyImage && (
            <div
              className="relative w-full overflow-hidden rounded-3xl"
              style={{ aspectRatio: fullBody.bodyImage.aspectRatio }}
            >
              <Image
                src={fullBody.bodyImage.src}
                alt=""
                fill
                sizes="(min-width: 800px) 712px, 100vw"
                className="object-cover"
              />
            </div>
          )}

          {fullBody.intro && (
            <p className="text-b1 text-text-secondary">
              <BoldText text={fullBody.intro} />
            </p>
          )}

          {fullBody.sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-4">
              <SectionHeading level={2} size="h3">
                {section.title}
              </SectionHeading>
              {section.intro && (
                <p className="text-b1 text-text-secondary">
                  <BoldText text={section.intro} />
                </p>
              )}
              {section.subsections?.map((subsection) => (
                <div key={subsection.title} className="flex flex-col gap-2">
                  <SectionHeading level={3} size="b1">
                    {subsection.title}
                  </SectionHeading>
                  <p className="text-b1 text-text-secondary">
                    <BoldText text={subsection.text} />
                  </p>
                </div>
              ))}
              {section.table && <DataTable table={section.table} />}
              {section.image && (
                <div className="relative w-full overflow-hidden rounded-3xl" style={{ aspectRatio: section.image.aspectRatio }}>
                  <Image
                    src={section.image.src}
                    alt=""
                    fill
                    sizes="(min-width: 800px) 712px, 100vw"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          {fullBody.conclusion && (
            <div className="flex flex-col gap-4">
              <SectionHeading level={2} size="h3">
                {fullBody.conclusion.title}
              </SectionHeading>
              {fullBody.conclusion.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-b1 text-text-secondary">
                  <BoldText text={paragraph} />
                </p>
              ))}
            </div>
          )}
        </>
      ) : (
        article.excerpt && <p className="text-b1 text-text-secondary">{article.excerpt}</p>
      )}
    </article>
  )
}
