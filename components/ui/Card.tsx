import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'sm' | 'md' | 'lg'
}

const variantClasses = {
  default: 'bg-white shadow-card',
  bordered: 'bg-white border border-gray-200',
  elevated: 'bg-white shadow-card-lg',
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

export function Card({ children, className, variant = 'default', padding = 'md' }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl',
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
    >
      {children}
    </div>
  )
}
