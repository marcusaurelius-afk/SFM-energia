import { cn } from '@/lib/utils'

interface ImagePlaceholderProps {
  label: string
  aspectRatio?: string
  className?: string
  dark?: boolean
}

export function ImagePlaceholder({
  label,
  aspectRatio = 'aspect-video',
  className,
  dark = false,
}: ImagePlaceholderProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-2xl overflow-hidden',
        aspectRatio,
        dark
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-gray-100 border-2 border-dashed border-gray-300',
        className
      )}
      role="img"
      aria-label={label}
    >
      <div className="text-center px-4">
        <div
          className={cn(
            'text-xs font-mono font-semibold tracking-wider uppercase mb-1',
            dark ? 'text-gray-400' : 'text-gray-400'
          )}
        >
          PLACEHOLDER
        </div>
        <div
          className={cn(
            'text-sm font-medium',
            dark ? 'text-gray-300' : 'text-gray-500'
          )}
        >
          {label}
        </div>
      </div>
    </div>
  )
}
