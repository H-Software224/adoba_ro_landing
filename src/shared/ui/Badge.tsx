import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export function Badge({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-brand/10 px-3 py-1 text-b3 font-semibold text-brand',
        className,
      )}
    >
      {children}
    </span>
  )
}
