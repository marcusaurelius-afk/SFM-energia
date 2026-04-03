'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface StatCardProps {
  value: string
  label: string
  sublabel?: string
  highlight?: boolean
  index?: number
}

export function StatCard({ value, label, sublabel, highlight = false, index = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className={cn(
        'rounded-2xl p-6 flex flex-col gap-1 transition-shadow duration-300',
        highlight
          ? 'bg-primary text-white shadow-card-lg'
          : 'bg-white border border-gray-100 shadow-card hover:shadow-card-hover'
      )}
    >
      <span
        className={cn(
          'font-display text-4xl md:text-5xl font-bold leading-none',
          highlight ? 'text-accent' : 'text-primary'
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          'text-base font-semibold mt-2',
          highlight ? 'text-white' : 'text-text'
        )}
      >
        {label}
      </span>
      {sublabel && (
        <span
          className={cn(
            'text-sm',
            highlight ? 'text-green-200' : 'text-text-light'
          )}
        >
          {sublabel}
        </span>
      )}
    </motion.div>
  )
}

interface AnimatedNumberProps {
  target: number
  suffix?: string
  prefix?: string
  decimals?: number
  duration?: number
}

export function AnimatedNumber({
  target,
  suffix = '',
  prefix = '',
  decimals = 0,
  duration = 1500,
}: AnimatedNumberProps) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!inView) return
    const startTime = performance.now()
    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(eased * target)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [inView, target, duration])

  const formatted = new Intl.NumberFormat('it-IT', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(current)

  return (
    <span ref={ref}>
      {prefix}{formatted}{suffix}
    </span>
  )
}
