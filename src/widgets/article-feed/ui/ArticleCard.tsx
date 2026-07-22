import Image from 'next/image'
import type { Article } from '@/entities/article'
import { SectionHeading } from '@/shared/ui/SectionHeading'
import { Link } from '@/shared/i18n/navigation'
import { cn } from '@/shared/lib/cn'

const ASPECT_BY_TYPE = {
  news: 'aspect-[3/4]',
  insight: 'aspect-square',
} as const

const EXPAND_BUTTON_CLASS =
  'absolute bottom-6 right-6 flex size-14 items-center justify-center rounded-full bg-text-primary/80 transition-colors hover:bg-text-primary'

export function ArticleCard({ article, href, onClick }: { article: Article; href?: string; onClick?: () => void }) {
  let expandButton = null
  if (href) {
    expandButton = (
      <Link href={href} aria-label={article.title} className={EXPAND_BUTTON_CLASS}>
        <Image src="/images/news/icon-plus-white.svg" alt="" width={40} height={40} />
      </Link>
    )
  } else if (onClick) {
    expandButton = (
      <button type="button" onClick={onClick} aria-label={article.title} className={EXPAND_BUTTON_CLASS}>
        <Image src="/images/news/icon-plus-white.svg" alt="" width={40} height={40} />
      </button>
    )
  }

  return (
    <figure className="flex flex-col gap-4">
      <div className={cn('relative w-full overflow-hidden rounded-3xl bg-[#e8ebf6]', ASPECT_BY_TYPE[article.type])}>
        {article.image && (
          <Image
            src={article.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        )}
        {expandButton}
      </div>
      <figcaption>
        {href ? (
          <Link href={href} className="transition-colors hover:text-text-secondary hover:underline">
            <SectionHeading level={3} size="b2">
              {article.title}
            </SectionHeading>
          </Link>
        ) : (
          <SectionHeading level={3} size="b2">
            {article.title}
          </SectionHeading>
        )}
      </figcaption>
    </figure>
  )
}
