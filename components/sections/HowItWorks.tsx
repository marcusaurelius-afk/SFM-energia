'use client'

import { motion } from 'framer-motion'
import { Truck, SunMedium, Plug } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Section, Container, SectionHeader } from '@/components/ui/Section'

const SFM20Animation = dynamic(
  () => import('@/components/ui/SFM20Animation').then((m) => m.SFM20Animation),
  { ssr: false, loading: () => <div className="w-full aspect-[5/3]" /> }
)

export function HowItWorks() {
  return (
    <Section bg="alt" id="come-funziona">
      <Container>
        <SectionHeader
          eyebrow="Come funziona"
          title="Operativo in meno di un'ora"
          subtitle="Nessuna installazione permanente. Nessun permesso edilizio. Nessun allaccio alla rete."
        />

        <div className="flex flex-col gap-8">

          {/* Step 01 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
          >
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-display text-5xl font-bold text-primary/15 leading-none select-none">01</span>
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <Truck size={22} className="text-accent" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-display-sm font-bold text-text mb-2">Consegna</h3>
              <p className="text-text-muted leading-relaxed mb-3">
                Il container arriva sul tuo sito con camion standard. Posizionamento con gru in 15 minuti. Nessun permesso speciale per il trasporto.
              </p>
              <div className="flex items-start gap-2 bg-background-alt rounded-xl p-3 border border-gray-100">
                <span className="text-accent mt-0.5" aria-hidden="true">→</span>
                <p className="text-sm text-text-muted">Dimensioni ISO 20&apos;: 6,06 × 2,44 × 2,59 m — passa su qualsiasi strada.</p>
              </div>
            </div>
          </motion.div>

          {/* Step 02 — card identica a 01/03, animazione senza sfondo */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.05, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Animazione senza sfondo */}
              <div className="flex items-center justify-center">
                <SFM20Animation className="w-full" />
              </div>

              {/* Testo */}
              <div>
                <div className="flex items-center gap-4 mb-5">
                  <span className="font-display text-5xl font-bold text-primary/15 leading-none select-none">02</span>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shrink-0">
                      <SunMedium size={22} className="text-accent" />
                    </div>
                    <h3 className="font-display text-display-sm font-bold text-text">Dispiegamento</h3>
                  </div>
                </div>
                <p className="text-text-muted leading-relaxed mb-3">
                  Le ali solari si aprono con meccanismo brevettabile. 2 operatori, 30 minuti, zero attrezzature speciali.
                </p>
                <div className="flex items-start gap-2 bg-background-alt rounded-xl p-3 border border-gray-100">
                  <span className="text-accent mt-0.5" aria-hidden="true">→</span>
                  <p className="text-sm text-text-muted">Superficie operativa: 6,06 × 9,60 m. 36 pannelli Jinko Solar 550W TOPCon.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Step 03 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 lg:p-8 flex flex-col sm:flex-row sm:items-center gap-6"
          >
            <div className="flex items-center gap-4 shrink-0">
              <span className="font-display text-5xl font-bold text-primary/15 leading-none select-none">03</span>
              <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shrink-0">
                <Plug size={22} className="text-accent" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-display-sm font-bold text-text mb-2">Energia</h3>
              <p className="text-text-muted leading-relaxed mb-3">
                Colleghi le tue utenze alle prese CEE. L&apos;inverter ibrido gestisce tutto in automatico, anche di notte con le batterie.
              </p>
              <div className="flex items-start gap-2 bg-background-alt rounded-xl p-3 border border-gray-100">
                <span className="text-accent mt-0.5" aria-hidden="true">→</span>
                <p className="text-sm text-text-muted">Monitoraggio remoto 24/7 via WiFi/4G. Dashboard con produzione e consumi in tempo reale.</p>
              </div>
            </div>
          </motion.div>

        </div>
      </Container>
    </Section>
  )
}
