'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { SolarCrateLogo } from '@/components/ui/SolarCrateLogo'

const navLinks = [
  { href: '/#prodotto', label: 'Prodotto' },
  { href: '/#come-funziona', label: 'Come funziona' },
  { href: '/#calcolatore', label: 'Calcolatore risparmio' },
  { href: '/#specifiche', label: 'Specifiche' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
            aria-label="SolarCrate — Torna alla home"
          >
            <SolarCrateLogo variant="light" height={40} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigazione principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150',
                  'text-text-muted hover:text-primary hover:bg-primary-50',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button href="/contatti" size="md">
              Richiedi preventivo
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={cn(
              'md:hidden p-2 rounded-lg text-text-muted',
              'hover:text-primary hover:bg-primary-50',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
              'transition-colors duration-150'
            )}
            aria-label={mobileOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <nav className="px-4 py-4 flex flex-col gap-1" aria-label="Navigazione mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-3 text-base font-medium rounded-xl transition-colors duration-150',
                    'text-text-muted hover:text-primary hover:bg-primary-50',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                  )}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 pb-1 border-t border-gray-100 mt-2">
                <Button href="/contatti" size="lg" className="w-full justify-center">
                  Richiedi preventivo
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
