import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-3xl border border-text-tertiary/15 bg-white p-8', className)}>
      {children}
    </div>
  )
}
