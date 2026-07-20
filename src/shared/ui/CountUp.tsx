'use client'

import { useEffect, useRef, useState } from 'react'

const DURATION_MS = 1200

/**
 * Renders `text` as-is on the server (so no-JS crawlers see the real value),
 * then animates the leading number counting up from 0 once it scrolls into
 * view. Settles back to the exact original `text` when done — the animation
 * never changes what the final DOM says.
 */
export function CountUp({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const match = text.match(/\d+/)
    const el = ref.current
    if (!match || !el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const target = Number(match[0])
    const prefix = text.slice(0, match.index)
    const suffix = text.slice(match.index! + match[0].length)

    let animated = false
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry?.isIntersecting || animated) return
        animated = true
        const start = performance.now()

        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION_MS, 1)
          const current = Math.round(progress * target)
          setDisplay(`${prefix}${current}${suffix}`)
          if (progress < 1) requestAnimationFrame(tick)
          else setDisplay(text)
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
