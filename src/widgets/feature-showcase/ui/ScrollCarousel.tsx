'use client'

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/shared/lib/cn'

const AUTOPLAY_INTERVAL_MS = 4000

export function ScrollCarousel({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const [offset, setOffset] = useState(0)

  const maxOffset = () => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return 0
    return Math.max(0, track.scrollWidth - container.clientWidth)
  }

  const moveBy = useCallback((direction: 1 | -1) => {
    const container = containerRef.current
    if (!container) return
    const max = maxOffset()
    setOffset((prev) => {
      if (direction === 1 && prev >= max - 1) return 0
      return Math.min(Math.max(prev + direction * container.clientWidth, 0), max)
    })
  }, [])

  useEffect(() => {
    const onResize = () => setOffset((prev) => Math.min(prev, maxOffset()))
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const container = containerRef.current
    const pause = () => {
      pausedRef.current = true
    }
    const resume = () => {
      pausedRef.current = false
    }

    container?.addEventListener('pointerenter', pause)
    container?.addEventListener('pointerleave', resume)

    const interval = setInterval(() => {
      if (!pausedRef.current) moveBy(1)
    }, AUTOPLAY_INTERVAL_MS)

    return () => {
      clearInterval(interval)
      container?.removeEventListener('pointerenter', pause)
      container?.removeEventListener('pointerleave', resume)
    }
  }, [moveBy])

  return (
    <div className={cn('relative', className)}>
      <div className="mb-4 flex justify-end gap-4">
        <button
          type="button"
          onClick={() => moveBy(-1)}
          aria-label="이전"
          className="flex size-14 items-center justify-center rounded-full border border-white bg-white/60 transition-colors hover:bg-white"
        >
          <Image src="/images/icons/arrow-right.svg" alt="" width={32} height={32} className="rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => moveBy(1)}
          aria-label="다음"
          className="flex size-14 items-center justify-center rounded-full border border-white bg-white/60 transition-colors hover:bg-white"
        >
          <Image src="/images/icons/arrow-right.svg" alt="" width={32} height={32} />
        </button>
      </div>
      <div ref={containerRef} className="overflow-hidden">
        <div
          ref={trackRef}
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${offset}px)` }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
