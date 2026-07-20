import type { Article, ArticleFullBody } from '@/entities/article'
import type { getTranslations } from 'next-intl/server'

type Translator = Awaited<ReturnType<typeof getTranslations<'magazine'>>>

export const MAGAZINE_ARTICLE_IDS = ['brand-visual', 'view-count', 'k-creator', 'live-vod'] as const

/**
 * Static mock data — no CMS yet. Swap for a CMS_API_KEY fetch later; the
 * Article shape and this function's signature can stay the same.
 */
export function getMagazineArticles(t: Translator): Article[] {
  const authorName = t('article.authorName')

  return [
    {
      id: 'brand-visual',
      type: 'insight',
      title: t('articles.brandVisual.title'),
      externalUrl: 'https://blog.naver.com/hello_adoba/224340153770',
      sourceImage:
        'https://blogthumb.pstatic.net/MjAyNjA3MDhfNTgg/MDAxNzgzNDc3NzE3MTcz.agXOm53ox03ndeNZMht7H5CwpmCqzOooZEGSCa-agQAg.iX18oRu1XsR2K9xeB0wzpxl6wvso8M_AJpqJBCM4UIcg.PNG/1280X1280.PNG?type=w2',
      datePublished: '2026-07-08',
      detailHref: '/magazine/brand-visual',
      excerpt: t('articles.brandVisual.excerpt'),
      authorName,
      faq: [
        { question: t('articles.brandVisual.faq.q1.question'), answer: t('articles.brandVisual.faq.q1.answer') },
        { question: t('articles.brandVisual.faq.q2.question'), answer: t('articles.brandVisual.faq.q2.answer') },
      ],
      fullBody: {
        ...(t.raw('articles.brandVisual.fullBody') as ArticleFullBody),
        bodyImage: '/images/magazine/article-brand-visual-comparison.png',
      },
    },
    {
      id: 'view-count',
      type: 'insight',
      title: t('articles.viewCount.title'),
      image: '/images/magazine/article-viewcount.png',
      externalUrl: 'https://blog.naver.com/hello_adoba/224339062694',
      sourceImage:
        'https://blogthumb.pstatic.net/MjAyNjA3MDdfMjIz/MDAxNzgzMzk0MDAwNDYx.w2L3ne1vhL1-T35-Ny-EGHhd2UXTHGtHsIa8jdK6ZzMg.h7qqlG0k9-9NQpYrK0xJ-yXsLWRF7rnYiaviGU73BDUg.PNG/1280X1280.PNG?type=w2',
      datePublished: '2026-07-07',
      detailHref: '/magazine/view-count',
      excerpt: t('articles.viewCount.excerpt'),
      authorName,
      faq: [
        { question: t('articles.viewCount.faq.q1.question'), answer: t('articles.viewCount.faq.q1.answer') },
        { question: t('articles.viewCount.faq.q2.question'), answer: t('articles.viewCount.faq.q2.answer') },
      ],
      fullBody: t.raw('articles.viewCount.fullBody') as ArticleFullBody,
    },
    {
      id: 'k-creator',
      type: 'insight',
      title: t('articles.kCreator.title'),
      image: '/images/magazine/article-kpop.png',
      externalUrl: 'https://blog.naver.com/hello_adoba/224274197780',
      sourceImage:
        'https://blogthumb.pstatic.net/MjAyNjA1MDRfMzMg/MDAxNzc3ODY0MzY5NjY4.S3eEI9ueM_52VYsR5p_rFFKxGm_NOwvgvV2xDGHuncMg.ZAjgKG6DurrjDU6gClB89uAbdtCHWD7C-Vv0wGS5E7Qg.PNG/%BD%E6%B3%D7%C0%CF.PNG?type=w2',
      datePublished: '2026-05-04',
      detailHref: '/magazine/k-creator',
      excerpt: t('articles.kCreator.excerpt'),
      authorName,
      fullBody: t.raw('articles.kCreator.fullBody') as ArticleFullBody,
    },
    {
      id: 'live-vod',
      type: 'insight',
      title: t('articles.liveVod.title'),
      image: '/images/magazine/article-live-vod.png',
      externalUrl: 'https://blog.naver.com/hello_adoba/224317472593',
      sourceImage:
        'https://blogthumb.pstatic.net/MjAyNjA2MTZfMjgg/MDAxNzgxNTc4NjQyNjM4.sVYCcdFv_p-IQ_cRvHIK-o1SEj9lfNrYxsezX7Dyjwsg.UUvrGcsK2bquRGSCvfzXz0hXtP3bR7jCHh08bPb4TUcg.PNG/1280X1280.PNG?type=w2',
      datePublished: '2026-06-16',
      detailHref: '/magazine/live-vod',
      excerpt: t('articles.liveVod.excerpt'),
      authorName,
      fullBody: t.raw('articles.liveVod.fullBody') as ArticleFullBody,
    },
  ]
}

export function getMagazineArticleById(t: Translator, id: string): Article | undefined {
  return getMagazineArticles(t).find((article) => article.id === id)
}
