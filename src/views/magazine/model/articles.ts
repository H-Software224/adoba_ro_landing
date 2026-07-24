import type { Article, ArticleFullBody } from '@/entities/article'
import type { getTranslations } from '@/shared/i18n/compat'

type Translator = ReturnType<typeof getTranslations>

export const MAGAZINE_ARTICLE_IDS = [
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
