import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

export function Table({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse text-left">{children}</table>
    </div>
  )
}

export function TableHead({ children }: { children: ReactNode }) {
  return <thead className="border-b border-text-tertiary/20 text-b3 font-semibold">{children}</thead>
}

export function TableBody({ children }: { children: ReactNode }) {
  return <tbody className="text-b3 text-text-secondary">{children}</tbody>
}

export function TableRow({ children }: { children: ReactNode }) {
  return <tr className="border-b border-text-tertiary/10">{children}</tr>
}

export function TableCell({
  children,
  as: Tag = 'td',
  className,
}: {
  children: ReactNode
  as?: 'td' | 'th'
  className?: string
}) {
  return <Tag className={cn('px-4 py-3', className)}>{children}</Tag>
}
