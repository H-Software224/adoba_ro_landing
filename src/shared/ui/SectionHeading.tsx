import type { ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6
type HeadingSize = 'h1' | 'h2-strong' | 'h2' | 'h3' | 'b1' | 'b2' | 'b3'

const SIZE_CLASS: Record<HeadingSize, string> = {
  h1: 'text-h1',
  'h2-strong': 'text-h2-strong',
  h2: 'text-h2',
  h3: 'text-h3',
  b1: 'text-b1',
  b2: 'text-b2',
  b3: 'text-b3',
}

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const

interface SectionHeadingProps {
  level: HeadingLevel
  size?: HeadingSize
  className?: string
  id?: string
  children: ReactNode
}

export function SectionHeading({ level, size, className, id, children }: SectionHeadingProps) {
  const Tag = HEADING_TAGS[level - 1] ?? 'h6'
  const resolvedSize = size ?? (`h${Math.min(level, 3)}` as HeadingSize)
  return (
    <Tag id={id} className={cn('text-text-primary', SIZE_CLASS[resolvedSize], className)}>
      {children}
    </Tag>
  )
}
