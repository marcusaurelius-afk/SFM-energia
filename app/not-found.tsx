import type { Metadata } from 'next'
import Link from 'next/link'
import { Home, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Pagina non trovata — 404',
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center pt-20 pb-16">
      <Container size="sm" className="text-center">
        <p className="font-display text-8xl font-bold text-primary/10 leading-none mb-4">
          404
        </p>
        <h1 className="font-display text-3xl font-bold text-text mb-3">
          Pagina non trovata
        </h1>
        <p className="text-text-muted mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/">
            <Home size={18} className="mr-1" />
            Torna alla home
          </Button>
          <Button href="/contatti" variant="outline">
            Contattaci
            <ArrowRight size={18} className="ml-1" />
          </Button>
        </div>
      </Container>
    </div>
  )
}
