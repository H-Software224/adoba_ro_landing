'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Article } from '@/entities/article'
import { cn } from '@/shared/lib/cn'
import { ArticleCard } from './ArticleCard'
import { ArticleModal } from './ArticleModal'

const DEFAULT_PAGE_SIZE = 6

export function ArticleFeed({
  items,
  pageSize = DEFAULT_PAGE_SIZE,
  columns = 3,
}: {
  items: Article[]
  pageSize?: number
  columns?: 3 | 4
}) {
  const [openId, setOpenId] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const openArticle = items.find((item) => item.id === openId)

  const totalPages = Math.ceil(items.length / pageSize)
  const pages = Array.from({ length: totalPages }, (_, index) =>
    items.slice(index * pageSize, index * pageSize + pageSize),
  )

  return (
    <div className="flex flex-col gap-10">
      <div className={cn('grid grid-cols-1 gap-6 sm:grid-cols-2', columns === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3')}>
        {pages.map((pageItems, index) => (
          <div key={index} className={index + 1 === page ? 'contents' : 'hidden'}>
            {pageItems.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                href={article.detailHref}
                onClick={!article.detailHref && article.modalDescription ? () => setOpenId(article.id) : undefined}
              />
            ))}
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <nav aria-label="페이지네이션" className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
            aria-label="이전 페이지"
            className="flex size-12 shrink-0 items-center justify-center rounded-full disabled:opacity-40"
          >
            <Image src="/images/icons/pagination-arrow-left.svg" alt="" width={32} height={32} />
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              aria-current={pageNumber === page}
              className={cn(
                'flex size-12 shrink-0 items-center justify-center rounded-full text-b3',
                pageNumber === page ? 'bg-text-primary text-white' : 'bg-white text-text-secondary',
              )}
            >
              {pageNumber}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
            aria-label="다음 페이지"
            className="flex size-12 shrink-0 items-center justify-center rounded-full disabled:opacity-40"
          >
            <Image src="/images/icons/pagination-arrow-right.svg" alt="" width={32} height={32} />
          </button>
        </nav>
      )}

      {openArticle && <ArticleModal article={openArticle} onClose={() => setOpenId(null)} />}
    </div>
  )
}
