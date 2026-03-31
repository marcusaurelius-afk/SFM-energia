'use client'

import { motion } from 'framer-motion'
import { HardHat, Store, Sprout, ShieldAlert, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Section, Container, SectionHeader } from '@/components/ui/Section'

const segments = [
  {
    icon: HardHat,
    title: 'Cantieri edili',
    description:
      'Energia senza allaccio rete, costo certo mensile, nessun rumore per i residenti. Ideale per APE, scavi e costruzioni in zona urbana.',
    benefits: ['Nessun allaccio ENEL', 'Silenzioso: lavori notturni possibili', 'Costo fisso mensile'],
    href: '/contatti?tipo=cantiere',
    color: 'bg-amber-50 border-amber-200 hover:border-amber-400',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
  },
  {
    icon: Store,
    title: 'Fiere ed eventi',
    description:
      'Immagine sostenibile, nessun generatore a vista, energia pulita certificabile. Per organizzatori che vogliono differenziarsi.',
    benefits: ['Zero emissioni certificabili', 'Nessun rumore di fondo', 'Estetica curata'],
    href: '/contatti?tipo=evento',
    color: 'bg-blue-50 border-blue-200 hover:border-blue-400',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-700',
  },
  {
    icon: Sprout,
    title: 'Aziende agricole',
    description:
      'Irrigazione e macchinari in zone remote senza rete elettrica. Soluzione stagionale flessibile senza investimenti fissi.',
    benefits: ['Funziona senza rete', 'Noleggio stagionale', 'Resistente alle intemperie'],
    href: '/contatti?tipo=agricoltura',
    color: 'bg-green-50 border-green-200 hover:border-green-400',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
  },
  {
    icon: ShieldAlert,
    title: 'Emergenze e off-grid',
    description:
      'Backup energetico rapido per protezione civile, rifugi di montagna, siti isolati. Dispiegabile in meno di un\'ora.',
    benefits: ['Pronto in 30–45 minuti', 'Autonomia 6–10 ore/notte', 'Monitoring remoto 24/7'],
    href: '/contatti?tipo=emergenza',
    color: 'bg-red-50 border-red-200 hover:border-red-400',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-700',
  },
]

export function CustomerSegments() {
  return (
    <Section bg="alt" id="applicazioni">
      <Container>
        <SectionHeader
          eyebrow="Chi lo usa"
          title="Per ogni esigenza, una risposta concreta"
          subtitle="Un'unica unità, quattro settori diversi. La flessibilità è nella progettazione."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {segments.map((seg, i) => {
            const Icon = seg.icon
            return (
              <motion.div
                key={seg.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              >
                <Link
                  href={seg.href}
                  className={`block rounded-2xl p-6 border-2 transition-all duration-200 group ${seg.color} focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}
                  aria-label={`Scopri le soluzioni per ${seg.title}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${seg.iconBg}`}>
                      <Icon size={24} className={seg.iconColor} />
                    </div>
                    <ArrowRight
                      size={20}
                      className="text-gray-400 group-hover:text-gray-700 group-hover:translate-x-1 transition-all duration-200"
                    />
                  </div>

                  <h3 className="font-display text-xl font-bold text-text mb-2">
                    {seg.title}
                  </h3>
                  <p className="text-text-muted text-sm leading-relaxed mb-4">
                    {seg.description}
                  </p>

                  <ul className="flex flex-col gap-1.5">
                    {seg.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
