import type { ComponentProps, ReactNode } from 'react'
import { Button } from '@/shared/ui/Button'

const START_FREE_URL = 'https://adobaro.com'

export function StartFreeButton({
  children,
  className,
  variant = 'primary',
}: {
  children: ReactNode
  className?: string
  variant?: ComponentProps<typeof Button>['variant']
}) {
  return (
    <Button
      as="a"
      href={START_FREE_URL}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  )
}
