import { SITE_URL } from '@/shared/lib/build-alternates'

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '아도바 주식회사',
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '서울 구로구 공원로 41, 421호',
      addressCountry: 'KR',
    },
    telephone: '02-6952-0109',
    email: 'support@adoba.net',
  }
}
