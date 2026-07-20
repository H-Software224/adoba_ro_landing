import type { ReactNode } from 'react'
import Image from 'next/image'
import { cn } from '@/shared/lib/cn'

export interface AccordionEntry {
  id: string
  summary: ReactNode
  content: ReactNode
}

/**
 * Uses native <details>/<summary> so FAQ content stays in the raw HTML and
 * requires no client JS — bots that don't execute JS still see full answers.
 * A shared `name` makes the group mutually exclusive (native HTML behavior,
 * still zero JS): opening one item auto-closes any other open item in the group.
 */
export function Accordion({ items, className, name }: { items: AccordionEntry[]; className?: string; name?: string }) {
  return (
    <div className={cn('flex flex-col', className)}>
      {items.map((item) => (
        <details key={item.id} name={name} className="group border-b border-text-primary/20 py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-h3 font-semibold text-text-primary marker:content-none">
            {item.summary}
            <Image
              src="/images/icons/plus.svg"
              alt=""
              width={32}
              height={32}
              className="shrink-0 transition-transform group-open:rotate-45"
            />
          </summary>
          <div className="mt-6 text-b3 text-text-secondary">{item.content}</div>
        </details>
      ))}
    </div>
  )
}
