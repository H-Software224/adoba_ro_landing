'use client'

import { useSyncExternalStore, type ComponentProps, type ReactNode } from 'react'
import { Button } from '@/shared/ui/Button'

const START_FREE_URLS = {
  pc: 'https://adobaro.com',
  ios: 'https://apps.apple.com/kr/app/adobaro/id6756643937',
  android: 'https://play.google.com/store/apps/details?id=com.adoba.adobaro&pcampaignid=web_share',
} as const

function detectStartFreeUrl(): string {
  const ua = navigator.userAgent
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  if (isIOS) return START_FREE_URLS.ios
  if (/Android/.test(ua)) return START_FREE_URLS.android
  return START_FREE_URLS.pc
}

// Device type never changes during a session, so there's nothing to subscribe to —
// this just needs the one-time read that useSyncExternalStore performs correctly on
// both the server (getServerSnapshot) and the client (getSnapshot) without a hydration warning.
const subscribe = () => () => {}
const getServerSnapshot = () => START_FREE_URLS.pc

/**
 * Device can only be known in the browser, so this renders the PC link during
 * SSR/SSG (keeps the route statically generated and gives crawlers/no-JS a
 * working link) and swaps to the OS store link right after hydration.
 */
export function StartFreeButton({
  children,
  className,
  variant = 'primary',
}: {
  children: ReactNode
  className?: string
  variant?: ComponentProps<typeof Button>['variant']
}) {
  const href = useSyncExternalStore(subscribe, detectStartFreeUrl, getServerSnapshot)

  return (
    <Button as="a" href={href} target="_blank" rel="noopener noreferrer" variant={variant} className={className}>
      {children}
    </Button>
  )
}
