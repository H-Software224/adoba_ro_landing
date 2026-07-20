'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/shared/lib/cn'

const CARD_SCROLL_DISTANCE = 584
const AUTOPLAY_INTERVAL_MS = 4000

export function ScrollCarousel({ children, className }: { children: ReactNode; className?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollRef.current
    if (!el) return
    const atEnd = direction === 1 && el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
    el.scrollTo(atEnd ? { left: 0, behavior: 'smooth' } : { left: el.scrollLeft + direction * CARD_SCROLL_DISTANCE, behavior: 'smooth' })
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pause = () => {
      pausedRef.current = true
    }
    const resume = () => {
      pausedRef.current = false
    }

    el.addEventListener('pointerenter', pause)
    el.addEventListener('pointerleave', resume)
    el.addEventListener('touchstart', pause, { passive: true })
    el.addEventListener('touchend', resume)

    const interval = setInterval(() => {
      if (!pausedRef.current) scrollBy(1)
    }, AUTOPLAY_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      el.removeEventListener('pointerenter', pause)
      el.removeEventListener('pointerleave', resume)
      el.removeEventListener('touchstart', pause)
      el.removeEventListener('touchend', resume)
    }
  }, [])

  return (
    <div className={cn('relative', className)}>
      <div className="mb-4 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="이전"
          className="flex size-14 items-center justify-center rounded-full border border-white bg-white/60 transition-colors hover:bg-white"
        >
          <Image src="/images/icons/arrow-right.svg" alt="" width={32} height={32} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="다음"
          className="flex size-14 items-center justify-center rounded-full border border-white bg-white/60 transition-colors hover:bg-white"
        >
          <Image src="/images/icons/arrow-right.svg" alt="" width={32} height={32} />
        </button>
      </div>
      <div ref={scrollRef} className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2">
        {children}
      </div>
    </div>
  )
}
