import type { Article } from '@/entities/article'
import type { getTranslations } from 'next-intl/server'

type Translator = Awaited<ReturnType<typeof getTranslations<'news'>>>

/**
 * Static mock data — no CMS yet. Swap for a CMS_API_KEY fetch later; the
 * Article shape and this function's signature can stay the same.
 */
export function getNewsArticles(t: Translator): Article[] {
  return [
    {
      id: 'iqiyi-expand',
      type: 'news',
      title: t('events.iqiyiExpand.title'),
      image: '/images/news/event-iqiyi-expand.png',
      startDate: '2026-07-06',
      endDate: '2026-07-31',
      modalTitle: t('events.iqiyiExpand.modalTitle'),
      modalDescription: t('events.iqiyiExpand.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DaUsE1Fj_W7/',
      eligibility: t('events.iqiyiExpand.eligibility'),
      rewardOffers: [
        { name: t('events.iqiyiExpand.rewardName'), description: t('events.iqiyiExpand.rewardDescription') },
      ],
    },
    {
      id: 'douyin-expand',
      type: 'news',
      title: t('events.douyinExpand.title'),
      image: '/images/news/event-douyin-expand.png',
      startDate: '2026-06-22',
      endDate: '2026-07-31',
      modalTitle: t('events.douyinExpand.modalTitle'),
      modalDescription: t('events.douyinExpand.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DZ4XRibDYUD/',
      eligibility: t('events.douyinExpand.eligibility'),
      rewardOffers: [
        { name: t('events.douyinExpand.rewardName'), description: t('events.douyinExpand.rewardDescription') },
      ],
    },
    {
      id: 'rp-reward',
      type: 'news',
      title: t('events.rpReward.title'),
      image: '/images/news/event-rp-reward.png',
      startDate: '2026-06-22',
      endDate: '2026-07-12',
      modalTitle: t('events.rpReward.modalTitle'),
      modalDescription: t('events.rpReward.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DZ4T0P0AmYI/',
      eligibility: t('events.rpReward.eligibility'),
      rewardOffers: [{ name: t('events.rpReward.rewardName'), description: t('events.rpReward.rewardDescription') }],
    },
    {
      id: 'new-platform-douyin',
      type: 'news',
      title: t('events.newPlatformDouyin.title'),
      image: '/images/news/event-new-platform-douyin.png',
      modalTitle: t('events.newPlatformDouyin.modalTitle'),
      modalDescription: t('events.newPlatformDouyin.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DZcF7RUmWlq/',
    },
    {
      id: 'new-platform-iqiyi',
      type: 'news',
      title: t('events.newPlatformIqiyi.title'),
      image: '/images/news/event-new-platform-iqiyi.png',
      modalTitle: t('events.newPlatformIqiyi.modalTitle'),
      modalDescription: t('events.newPlatformIqiyi.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DWGPluTkR1y/',
    },
    {
      id: 'launch',
      type: 'news',
      title: t('events.launch.title'),
      image: '/images/news/event-launch.png',
      modalTitle: t('events.launch.modalTitle'),
      modalDescription: t('events.launch.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DVanmuIEerF/',
    },
  ]
}
