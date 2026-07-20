import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export interface DefinitionEntry {
  term: string
  detail: ReactNode
}

export function DefinitionList({ items, className }: { items: DefinitionEntry[]; className?: string }) {
  return (
    <dl className={cn('grid grid-cols-2 gap-8 sm:grid-cols-4', className)}>
      {items.map((item) => (
        <div key={item.term} className="flex flex-col gap-2">
          <dt className="text-b3 text-text-secondary">{item.term}</dt>
          <dd className="text-h3 text-text-primary">{item.detail}</dd>
        </div>
      ))}
    </dl>
  )
}
