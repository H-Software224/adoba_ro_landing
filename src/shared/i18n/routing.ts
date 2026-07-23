export const routing = {
  locales: ['ko', 'en'],
  defaultLocale: 'ko',
} as const

export type Locale = (typeof routing.locales)[number]
