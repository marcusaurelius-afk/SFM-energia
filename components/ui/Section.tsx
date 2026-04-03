import { cn } from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  bg?: 'white' | 'alt' | 'dark' | 'primary'
  as?: 'section' | 'div'
}

const bgClasses = {
  white: 'bg-background',
  alt: 'bg-background-alt',
  dark: 'bg-[#111111] text-white',
  primary: 'bg-primary text-white',
}

export function Section({ children, className, id, bg = 'white', as: Tag = 'section' }: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn('py-section', bgClasses[bg], className)}
    >
      {children}
    </Tag>
  )
}

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-2xl',
  md: 'max-w-4xl',
  lg: 'max-w-5xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export function Container({ children, className, size = 'xl' }: ContainerProps) {
  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}>
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
  light?: boolean
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  className,
  light = false,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12',
        align === 'center' ? 'text-center' : 'text-left',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'text-sm font-semibold tracking-widest uppercase mb-3',
            light ? 'text-accent' : 'text-accent'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-display text-display-md md:text-display-lg font-bold leading-tight',
          light ? 'text-white' : 'text-text'
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed max-w-3xl',
            align === 'center' ? 'mx-auto' : '',
            light ? 'text-gray-300' : 'text-text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
