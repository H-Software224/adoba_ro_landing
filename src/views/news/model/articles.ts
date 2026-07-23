import type { Article } from '@/entities/article'
import type { getTranslations } from '@/shared/i18n/compat'

type Translator = ReturnType<typeof getTranslations>

/**
 * Static mock data — no CMS yet. Swap for a CMS_API_KEY fetch later; the
 * Article shape and this function's signature can stay the same.
 */
export function getNewsArticles(t: Translator, locale: string): Article[] {
  const image = (base: string) => (locale === 'en' ? `/images/news/${base}-en.png` : `/images/news/${base}.png`)

  return [
    {
      id: 'iqiyi-expand',
      type: 'news',
      title: t('events.iqiyiExpand.title'),
      image: image('event-iqiyi-expand'),
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
      image: image('event-douyin-expand'),
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
      image: image('event-rp-reward'),
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
      image: image('event-new-platform-douyin'),
      modalTitle: t('events.newPlatformDouyin.modalTitle'),
      modalDescription: t('events.newPlatformDouyin.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DZcF7RUmWlq/',
    },
    {
      id: 'new-platform-iqiyi',
      type: 'news',
      title: t('events.newPlatformIqiyi.title'),
      image: image('event-new-platform-iqiyi'),
      modalTitle: t('events.newPlatformIqiyi.modalTitle'),
      modalDescription: t('events.newPlatformIqiyi.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DWGPluTkR1y/',
    },
    {
      id: 'launch',
      type: 'news',
      title: t('events.launch.title'),
      image: image('event-launch'),
      modalTitle: t('events.launch.modalTitle'),
      modalDescription: t('events.launch.modalDescription'),
      externalUrl: 'https://www.instagram.com/p/DVanmuIEerF/',
    },
  ]
}
