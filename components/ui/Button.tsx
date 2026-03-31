'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  children: React.ReactNode
  className?: string
}

interface ButtonAsButton extends ButtonBaseProps {
  href?: never
  type?: 'button' | 'submit' | 'reset'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

interface ButtonAsLink extends ButtonBaseProps {
  href: string
  type?: never
  onClick?: never
  disabled?: never
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-accent text-white hover:bg-accent-dark active:bg-accent-dark focus-visible:ring-accent font-semibold shadow-sm',
  secondary:
    'bg-primary text-white hover:bg-primary-light active:bg-primary-dark focus-visible:ring-primary font-semibold shadow-sm',
  outline:
    'border-2 border-primary text-primary hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary font-semibold bg-transparent',
  ghost:
    'text-primary hover:bg-primary-50 active:bg-primary-100 focus-visible:ring-primary font-medium bg-transparent',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm rounded-lg gap-1.5',
  md: 'px-6 py-3 text-base rounded-xl gap-2',
  lg: 'px-8 py-4 text-lg rounded-xl gap-2.5',
}

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center transition-all duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variantClasses[variant],
    sizeClasses[size],
    className
  )

  if ('href' in props && props.href) {
    return (
      <Link href={props.href} className={baseClasses}>
        {children}
      </Link>
    )
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton & { href?: never }

  return (
    <button
      {...buttonProps}
      disabled={buttonProps.disabled || loading}
      className={baseClasses}
    >
      {loading && <Loader2 className="animate-spin" size={18} />}
      {children}
    </button>
  )
}
