'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Download } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Section, Container, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'

const ModelViewer = dynamic(
  () => import('@/components/ui/ModelViewer').then((m) => m.ModelViewer),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] lg:h-[520px] rounded-2xl bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-text-muted">Caricamento modello 3D...</p>
        </div>
      </div>
    ),
  }
)

const specGroups = [
  {
    id: 'fotovoltaico',
    title: 'Sistema fotovoltaico',
    specs: [
      { label: 'Potenza FV totale', value: '20 kWp' },
      { label: 'Potenza FV fissa (tetto)', value: '4,4 kWp' },
      { label: 'Potenza FV dispiegabile (ali)', value: '15,6 kWp' },
      { label: 'Pannelli', value: '36× Jinko Solar Tiger Neo 550W TOPCon' },
      { label: 'Efficienza pannello', value: '22,3%' },
      { label: 'Produzione giornaliera media', value: '57+ kWh/giorno (Lombardia)' },
    ],
  },
  {
    id: 'accumulo',
    title: 'Sistema di accumulo',
    specs: [
      { label: 'Batterie', value: 'BYD LiFePO4' },
      { label: 'Capacità base', value: '30,72 kWh' },
      { label: 'Capacità espandibile', value: 'Fino a 46 kWh' },
      { label: 'Cicli di vita', value: '>3.000 cicli (80% capacità residua)' },
      { label: 'Autonomia notturna', value: '6–10 ore (carico 3–5 kW)' },
      { label: 'Chimica', value: 'LiFePO4 — sicura, stabile, senza degradazione termica' },
    ],
  },
  {
    id: 'inverter',
    title: 'Inverter e gestione energia',
    specs: [
      { label: 'Inverter', value: 'Growatt SPH 15000TL3' },
      { label: 'Potenza AC output', value: '15 kW trifase' },
      { label: 'Tipo', value: 'Ibrido (solare + batterie + rete/generatore backup)' },
      { label: 'Tensione uscita', value: '400V AC trifase' },
      { label: 'Connessioni', value: 'Prese CEE industriali 16A e 32A' },
      { label: 'Monitoraggio', value: 'Remoto via WiFi/4G, dashboard real-time' },
    ],
  },
  {
    id: 'fisiche',
    title: 'Dimensioni e trasporto',
    specs: [
      { label: 'Tipologia', value: 'Container ISO 20\'' },
      { label: 'Dimensioni trasporto', value: '6,06 × 2,44 × 2,59 m' },
      { label: 'Dimensioni operative', value: '6,06 × 9,60 m (ali aperte)' },
      { label: 'Peso operativo', value: '~4.100 kg' },
      { label: 'Trasporto', value: 'Camion standard (non eccezionale)' },
      { label: 'Posizionamento', value: 'Gru standard, 15 minuti' },
    ],
  },
]

interface AccordionItemProps {
  group: typeof specGroups[0]
  isOpen: boolean
  onToggle: () => void
}

function AccordionItem({ group, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-background-alt transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        aria-expanded={isOpen}
        aria-controls={`spec-${group.id}`}
      >
        <span className="font-display font-semibold text-base md:text-lg text-text text-left">
          {group.title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 ml-4"
        >
          <ChevronDown size={20} className="text-text-muted" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`spec-${group.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100">
              <table className="w-full" aria-label={`Specifiche: ${group.title}`}>
                <tbody>
                  {group.specs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={`${i % 2 === 0 ? 'bg-white' : 'bg-background-alt'}`}
                    >
                      <td className="px-6 py-3.5 text-sm font-medium text-text-muted w-1/2">
                        {spec.label}
                      </td>
                      <td className="px-6 py-3.5 text-sm font-semibold text-text">
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function TechnicalSpecs() {
  const [openId, setOpenId] = useState<string | null>('fotovoltaico')

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <Section bg="white" id="specifiche">
      <Container size="lg">
        <SectionHeader
          eyebrow="Scheda tecnica"
          title="Esplora il SFM-20"
          subtitle="Ruota il modello 3D ed esplora le specifiche complete del sistema."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-10">
          {/* 3D Viewer — sticky su desktop */}
          <div className="lg:sticky lg:top-24">
            <ModelViewer className="w-full h-[420px] lg:h-[520px]" />
          </div>

          {/* Accordion specifiche */}
          <div className="flex flex-col gap-3">
            {specGroups.map((group) => (
              <AccordionItem
                key={group.id}
                group={group}
                isOpen={openId === group.id}
                onToggle={() => toggle(group.id)}
              />
            ))}
          </div>
        </div>

        {/* Download CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-background-alt rounded-2xl border border-gray-100">
          <div>
            <p className="font-semibold text-text text-center sm:text-left">
              Vuoi la scheda tecnica completa in PDF?
            </p>
            <p className="text-sm text-text-muted text-center sm:text-left">
              Contattaci e ti inviamo il datasheet completo con disegni tecnici.
            </p>
          </div>
          <Button href="/contatti" variant="secondary" className="shrink-0 group">
            <Download size={18} className="mr-1" />
            Richiedi datasheet
          </Button>
        </div>
      </Container>
    </Section>
  )
}
