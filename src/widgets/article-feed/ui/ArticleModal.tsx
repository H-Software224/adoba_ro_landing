import Image from 'next/image'
import type { Article } from '@/entities/article'
import { SectionHeading } from '@/shared/ui/SectionHeading'

export function ArticleModal({ article, onClose }: { article: Article; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div
        className="flex h-[80vh] w-full max-w-[880px] flex-col gap-6 overflow-y-auto rounded-[40px] bg-white p-6 sm:p-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex size-9 shrink-0 items-center justify-center rounded-full bg-text-primary/10 hover:bg-text-primary/20"
          >
            <Image src="/images/news/icon-close.png" alt="" width={20} height={20} />
          </button>
        </div>
        <div className="flex flex-col gap-10 sm:flex-row">
          {article.image && (
            <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-3xl bg-[#e8ebf6] sm:h-[470px] sm:w-[320px]">
              <Image src={article.image} alt="" fill className="object-cover" />
            </div>
          )}
          <div className="flex flex-1 flex-col gap-6">
            <SectionHeading level={3} id="article-modal-title">
              {article.modalTitle ?? article.title}
            </SectionHeading>
            <p className="whitespace-pre-line text-b2 text-text-secondary">{article.modalDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
