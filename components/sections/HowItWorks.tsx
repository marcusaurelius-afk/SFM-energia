'use client'

import { motion } from 'framer-motion'
import { Truck, SunMedium, Plug } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Section, Container, SectionHeader } from '@/components/ui/Section'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const SFM20Animation = dynamic(
  () => import('@/components/ui/SFM20Animation').then((m) => m.SFM20Animation),
  { ssr: false, loading: () => <div className="w-full aspect-[5/3] bg-gray-100 rounded-2xl animate-pulse" /> }
)

const steps = [
  {
    number: '01',
    icon: Truck,
    title: 'Consegna',
    description:
      'Il container arriva sul tuo sito con camion standard. Posizionamento con gru in 15 minuti. Nessun permesso speciale per il trasporto.',
    detail: 'Dimensioni ISO 20\': 6,06 × 2,44 × 2,59 m — passa su qualsiasi strada.',
    imageLabel: 'FOTO: Camion con container SolarCrate in arrivo al cantiere',
  },
  {
    number: '02',
    icon: SunMedium,
    title: 'Dispiegamento',
    description:
      'Le ali solari si aprono con meccanismo brevettabile. 2 operatori, 30 minuti, zero attrezzature speciali.',
    detail: 'Superficie operativa: 6,06 × 9,60 m. 36 pannelli Jinko Solar 550W TOPCon.',
    imageLabel: 'FOTO: Apertura ali solari del container — meccanismo idraulico',
  },
  {
    number: '03',
    icon: Plug,
    title: 'Energia',
    description:
      "Colleghi le tue utenze alle prese CEE. L'inverter ibrido gestisce tutto in automatico, anche di notte con le batterie.",
    detail: "Monitoraggio remoto 24/7 via WiFi/4G. Dashboard con produzione e consumi in tempo reale.",
    imageLabel: 'FOTO: Operaio che collega cavo CEE al container — connessione in cantiere',
  },
]

export function HowItWorks() {
  return (
    <Section bg="alt" id="come-funziona">
      <Container>
        <SectionHeader
          eyebrow="Come funziona"
          title="Operativo in meno di un'ora"
          subtitle="Nessuna installazione permanente. Nessun permesso edilizio. Nessun allaccio alla rete."
        />

        <div className="flex flex-col gap-16">
          {steps.map((step, i) => {
            const Icon = step.icon
            const isEven = i % 2 === 1

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Text */}
                <div className={isEven ? 'lg:order-2' : ''}>
                  <div className="flex items-center gap-4 mb-5">
                    <span className="font-display text-5xl font-bold text-primary/15 leading-none select-none">
                      {step.number}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-primary rounded-xl flex items-center justify-center shrink-0">
                        <Icon size={22} className="text-accent" />
                      </div>
                      <h3 className="font-display text-display-sm font-bold text-text">
                        {step.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-lg text-text-muted leading-relaxed mb-4">
                    {step.description}
                  </p>

                  <div className="flex items-start gap-2 bg-white rounded-xl p-4 border border-gray-100">
                    <span className="text-accent text-lg mt-0.5" aria-hidden="true">→</span>
                    <p className="text-sm text-text-muted">{step.detail}</p>
                  </div>
                </div>

                {/* Image / Animation */}
                <div className={isEven ? 'lg:order-1' : ''}>
                  {i === 1 ? (
                    <div className="w-full rounded-2xl overflow-hidden shadow-card-lg bg-white flex items-center justify-center p-4">
                      <SFM20Animation className="w-full" />
                    </div>
                  ) : (
                    <ImagePlaceholder
                      label={step.imageLabel}
                      aspectRatio="aspect-[4/3]"
                      className="w-full shadow-card-lg"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
