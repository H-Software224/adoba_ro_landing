import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/lib/cn'

const VARIANT_CLASS = {
  primary: 'bg-text-primary text-white hover:bg-text-primary/90',
  secondary: 'bg-white text-text-primary border border-text-tertiary/30 hover:bg-text-primary/5',
  light: 'bg-white text-text-primary hover:bg-text-primary/5',
  'ghost-light': 'bg-white/10 text-white hover:bg-white/20',
} as const

type ButtonVariant = keyof typeof VARIANT_CLASS

interface ButtonOwnProps {
  variant?: ButtonVariant
  className?: string
  children: ReactNode
}

type ButtonAsButton = ButtonOwnProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonOwnProps> & { as?: 'button' }

type ButtonAsAnchor = ButtonOwnProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonOwnProps> & { as: 'a' }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

export function Button({ as, variant = 'primary', className, children, ...rest }: ButtonProps) {
  const sharedClassName = cn(
    'inline-flex items-center justify-center rounded-full px-8 py-4 text-b3 font-semibold transition-colors',
    VARIANT_CLASS[variant],
    className,
  )

  if (as === 'a') {
    return (
      <a className={sharedClassName} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    )
  }

  return (
    <button className={sharedClassName} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  )
}
