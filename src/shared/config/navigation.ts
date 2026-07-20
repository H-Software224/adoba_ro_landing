export const NAV_ITEMS = [
  { key: 'features', path: '/features' },
  { key: 'pricing', path: '/pricing' },
  { key: 'news', path: '/news' },
  { key: 'magazine', path: '/magazine' },
] as const

export type NavKey = (typeof NAV_ITEMS)[number]['key']
