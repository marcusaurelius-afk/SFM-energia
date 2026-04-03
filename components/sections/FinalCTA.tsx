'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'

export function FinalCTA() {
  return (
    <section
      className="relative bg-[#111111] overflow-hidden py-section"
      aria-labelledby="cta-heading"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/20 blur-3xl rounded-full" />
      </div>

      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Eyebrow */}
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">
            Inizia adesso
          </p>

          {/* Headline */}
          <h2
            id="cta-heading"
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance mb-6"
          >
            Pronti a eliminare il diesel
            <br />
            dal vostro cantiere?
          </h2>

          {/* Subtext */}
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Preventivo gratuito e senza impegno. Vi ricontattiamo entro{' '}
            <strong className="text-white">24 ore lavorative</strong> con una proposta
            su misura per le vostre esigenze.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button href="/contatti" size="lg" className="group">
              Richiedi preventivo gratuito
              <ArrowRight
                size={20}
                className="ml-1 group-hover:translate-x-1 transition-transform duration-200"
              />
            </Button>
          </div>

          {/* Trust items */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-gray-500 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Risposta in 24 ore
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Nessun costo per il preventivo
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              Zero impegno
            </span>
          </div>
        </motion.div>

        {/* Contact alternatives */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-10 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm"
        >
          <a
            href="mailto:info@solarcrate.it"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:underline group"
          >
            <Mail size={16} className="group-hover:text-accent transition-colors" />
            info@solarcrate.it
          </a>
        </motion.div>
      </Container>
    </section>
  )
}
