import type { Article, ArticleFullBody } from '@/entities/article'
import type { getTranslations } from '@/shared/i18n/compat'

type Translator = ReturnType<typeof getTranslations>

export const MAGAZINE_ARTICLE_IDS = [
  'brand-visual',
  'view-count',
  'k-creator',
  'live-vod',
  'subtitles',
  'view-drop',
  'subs-vs-views',
  'china-platforms',
  'keep-korean-channel',
  'multi-language-channel',
  'no-talking-format',
] as const

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
      image: '/images/magazine/article-brand-visual-thumb.png',
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
        bodyImage: { src: '/images/magazine/article-brand-visual-comparison.png', aspectRatio: '720/199' },
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
    {
      id: 'subtitles',
      type: 'insight',
      title: t('articles.subtitles.title'),
      image: '/images/magazine/article-subtitles.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/subtitles',
      excerpt: t('articles.subtitles.excerpt'),
      authorName,
      faq: [
        { question: t('articles.subtitles.faq.q1.question'), answer: t('articles.subtitles.faq.q1.answer') },
        { question: t('articles.subtitles.faq.q2.question'), answer: t('articles.subtitles.faq.q2.answer') },
        { question: t('articles.subtitles.faq.q3.question'), answer: t('articles.subtitles.faq.q3.answer') },
        { question: t('articles.subtitles.faq.q4.question'), answer: t('articles.subtitles.faq.q4.answer') },
      ],
      fullBody: t.raw('articles.subtitles.fullBody') as ArticleFullBody,
    },
    {
      id: 'view-drop',
      type: 'insight',
      title: t('articles.viewDrop.title'),
      image: '/images/magazine/article-view-drop.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/view-drop',
      excerpt: t('articles.viewDrop.excerpt'),
      authorName,
      faq: [
        { question: t('articles.viewDrop.faq.q1.question'), answer: t('articles.viewDrop.faq.q1.answer') },
        { question: t('articles.viewDrop.faq.q2.question'), answer: t('articles.viewDrop.faq.q2.answer') },
        { question: t('articles.viewDrop.faq.q3.question'), answer: t('articles.viewDrop.faq.q3.answer') },
      ],
      fullBody: t.raw('articles.viewDrop.fullBody') as ArticleFullBody,
    },
    {
      id: 'subs-vs-views',
      type: 'insight',
      title: t('articles.subsVsViews.title'),
      image: '/images/magazine/article-subs-vs-views.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/subs-vs-views',
      excerpt: t('articles.subsVsViews.excerpt'),
      authorName,
      faq: [
        { question: t('articles.subsVsViews.faq.q1.question'), answer: t('articles.subsVsViews.faq.q1.answer') },
        { question: t('articles.subsVsViews.faq.q2.question'), answer: t('articles.subsVsViews.faq.q2.answer') },
        { question: t('articles.subsVsViews.faq.q3.question'), answer: t('articles.subsVsViews.faq.q3.answer') },
        { question: t('articles.subsVsViews.faq.q4.question'), answer: t('articles.subsVsViews.faq.q4.answer') },
      ],
      fullBody: t.raw('articles.subsVsViews.fullBody') as ArticleFullBody,
    },
    {
      id: 'china-platforms',
      type: 'insight',
      title: t('articles.chinaPlatforms.title'),
      image: '/images/magazine/article-china-platforms.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/china-platforms',
      excerpt: t('articles.chinaPlatforms.excerpt'),
      authorName,
      faq: [
        { question: t('articles.chinaPlatforms.faq.q1.question'), answer: t('articles.chinaPlatforms.faq.q1.answer') },
        { question: t('articles.chinaPlatforms.faq.q2.question'), answer: t('articles.chinaPlatforms.faq.q2.answer') },
        { question: t('articles.chinaPlatforms.faq.q3.question'), answer: t('articles.chinaPlatforms.faq.q3.answer') },
        { question: t('articles.chinaPlatforms.faq.q4.question'), answer: t('articles.chinaPlatforms.faq.q4.answer') },
      ],
      fullBody: t.raw('articles.chinaPlatforms.fullBody') as ArticleFullBody,
    },
    {
      id: 'keep-korean-channel',
      type: 'insight',
      title: t('articles.keepKoreanChannel.title'),
      image: '/images/magazine/article-keep-korean-channel.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/keep-korean-channel',
      excerpt: t('articles.keepKoreanChannel.excerpt'),
      authorName,
      faq: [
        { question: t('articles.keepKoreanChannel.faq.q1.question'), answer: t('articles.keepKoreanChannel.faq.q1.answer') },
        { question: t('articles.keepKoreanChannel.faq.q2.question'), answer: t('articles.keepKoreanChannel.faq.q2.answer') },
        { question: t('articles.keepKoreanChannel.faq.q3.question'), answer: t('articles.keepKoreanChannel.faq.q3.answer') },
        { question: t('articles.keepKoreanChannel.faq.q4.question'), answer: t('articles.keepKoreanChannel.faq.q4.answer') },
        { question: t('articles.keepKoreanChannel.faq.q5.question'), answer: t('articles.keepKoreanChannel.faq.q5.answer') },
      ],
      fullBody: t.raw('articles.keepKoreanChannel.fullBody') as ArticleFullBody,
    },
    {
      id: 'multi-language-channel',
      type: 'insight',
      title: t('articles.multiLanguageChannel.title'),
      image: '/images/magazine/article-multi-language-channel.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/multi-language-channel',
      excerpt: t('articles.multiLanguageChannel.excerpt'),
      authorName,
      faq: [
        { question: t('articles.multiLanguageChannel.faq.q1.question'), answer: t('articles.multiLanguageChannel.faq.q1.answer') },
        { question: t('articles.multiLanguageChannel.faq.q2.question'), answer: t('articles.multiLanguageChannel.faq.q2.answer') },
        { question: t('articles.multiLanguageChannel.faq.q3.question'), answer: t('articles.multiLanguageChannel.faq.q3.answer') },
        { question: t('articles.multiLanguageChannel.faq.q4.question'), answer: t('articles.multiLanguageChannel.faq.q4.answer') },
      ],
      fullBody: t.raw('articles.multiLanguageChannel.fullBody') as ArticleFullBody,
    },
    {
      id: 'no-talking-format',
      type: 'insight',
      title: t('articles.noTalkingFormat.title'),
      image: '/images/magazine/article-no-talking-format.png',
      datePublished: '2026-07-21',
      detailHref: '/magazine/no-talking-format',
      excerpt: t('articles.noTalkingFormat.excerpt'),
      authorName,
      faq: [
        { question: t('articles.noTalkingFormat.faq.q1.question'), answer: t('articles.noTalkingFormat.faq.q1.answer') },
        { question: t('articles.noTalkingFormat.faq.q2.question'), answer: t('articles.noTalkingFormat.faq.q2.answer') },
        { question: t('articles.noTalkingFormat.faq.q3.question'), answer: t('articles.noTalkingFormat.faq.q3.answer') },
        { question: t('articles.noTalkingFormat.faq.q4.question'), answer: t('articles.noTalkingFormat.faq.q4.answer') },
      ],
      fullBody: t.raw('articles.noTalkingFormat.fullBody') as ArticleFullBody,
    },
  ]
}

export function getMagazineArticleById(t: Translator, id: string): Article | undefined {
  return getMagazineArticles(t).find((article) => article.id === id)
}
