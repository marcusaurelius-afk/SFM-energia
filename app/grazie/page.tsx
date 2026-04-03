import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Richiesta inviata — Grazie',
  description: 'La tua richiesta di preventivo è stata ricevuta. Ti ricontattiamo entro 24 ore.',
  robots: { index: false, follow: false },
}

export default function GraziePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-20 pb-16">
      <Container size="sm" className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">
          Richiesta ricevuta!
        </h1>

        <p className="text-text-muted text-lg leading-relaxed mb-8">
          Grazie per aver contattato SolarCrate.
          <br />
          Vi ricontattiamo entro{' '}
          <strong className="text-text font-semibold">24 ore lavorative</strong> con
          una proposta su misura.
        </p>

        {/* What happens next */}
        <div className="bg-background-alt rounded-2xl p-6 text-left mb-8 border border-gray-100">
          <h2 className="font-display font-bold text-base text-text mb-4">
            Cosa succede adesso
          </h2>
          <ol className="flex flex-col gap-3">
            <li className="flex items-start gap-3 text-sm text-text-muted">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                1
              </span>
              Il tuo messaggio è arrivato al nostro team commerciale.
            </li>
            <li className="flex items-start gap-3 text-sm text-text-muted">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                2
              </span>
              Un tecnico analizzerà le tue esigenze e preparerà un preventivo personalizzato.
            </li>
            <li className="flex items-start gap-3 text-sm text-text-muted">
              <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                3
              </span>
              Ti contatteremo via email o telefono entro 24 ore lavorative.
            </li>
          </ol>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <Button href="/" variant="outline">
            <ArrowLeft size={18} className="mr-1" />
            Torna alla home
          </Button>
        </div>

        {/* Contact alternatives */}
        <p className="text-sm text-text-light">
          Hai un&apos;urgenza?{' '}
          <a
            href="mailto:info@solarcrate.it"
            className="text-primary font-medium hover:underline focus-visible:outline-none focus-visible:underline"
          >
            <Mail size={14} className="inline mr-1" />
            info@solarcrate.it
          </a>
        </p>
      </Container>
    </div>
  )
}
