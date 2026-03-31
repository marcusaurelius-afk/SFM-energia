'use client'

import { motion } from 'framer-motion'
import { Fuel, Volume2, Cloud, CheckCircle2, X } from 'lucide-react'
import { Section, Container, SectionHeader } from '@/components/ui/Section'

const comparisons = [
  {
    icon: Fuel,
    iconColor: 'text-red-500',
    problem: {
      label: 'Carburante',
      value: '€800–1.500/mese',
      detail: 'Solo gasolio, escluso noleggio',
    },
    solution: {
      label: 'Costo operativo',
      value: '€0',
      detail: 'Energia dal sole, nessun rifornimento',
    },
  },
  {
    icon: Volume2,
    iconColor: 'text-orange-500',
    problem: {
      label: 'Rumore',
      value: '85–95 dB',
      detail: 'Vietato di notte, multa dai 70 dB',
    },
    solution: {
      label: 'Livello sonoro',
      value: '0 dB',
      detail: 'Silenzioso. Operativo 24/7, anche in zona residenziale',
    },
  },
  {
    icon: Cloud,
    iconColor: 'text-gray-500',
    problem: {
      label: 'Emissioni CO₂',
      value: '1.200–2.000 kg/mese',
      detail: 'Non certificabile per report ESG',
    },
    solution: {
      label: 'Emissioni CO₂',
      value: 'Zero',
      detail: 'Certificabile ESG. Attestato su richiesta',
    },
  },
]

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export function ProblemSolution() {
  return (
    <Section bg="alt" id="problema">
      <Container>
        <SectionHeader
          eyebrow="Perché SFM Energy"
          title="Il diesel ha un costo reale. Calcolalo."
          subtitle="Ogni mese di generatore diesel costa in carburante, in rumore e in emissioni. Ecco il confronto diretto."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {comparisons.map(({ icon: Icon, iconColor, problem, solution }, i) => (
            <motion.div
              key={problem.label}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={cardVariants}
              className="flex flex-col gap-4"
            >
              {/* Icon header */}
              <div className="flex items-center gap-3 px-2">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-white shadow-card`}>
                  <Icon size={20} className={iconColor} />
                </div>
                <span className="font-display font-semibold text-text">{problem.label}</span>
              </div>

              {/* Problem card */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="flex items-start gap-2 mb-2">
                  <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-xs font-semibold text-red-500 uppercase tracking-wider">
                    Generatore diesel
                  </span>
                </div>
                <div className="font-display text-2xl font-bold text-red-600 mb-1">
                  {problem.value}
                </div>
                <p className="text-sm text-red-700/70">{problem.detail}</p>
              </div>

              {/* Arrow */}
              <div className="text-center text-primary font-bold text-lg" aria-hidden="true">
                ↓
              </div>

              {/* Solution card */}
              <div className="bg-primary-50 border border-primary/20 rounded-2xl p-5">
                <div className="flex items-start gap-2 mb-2">
                  <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    SFM Energy
                  </span>
                </div>
                <div className="font-display text-2xl font-bold text-primary mb-1">
                  {solution.value}
                </div>
                <p className="text-sm text-primary/70">{solution.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-sm text-text-light mt-10"
        >
          * Stime basate su generatore diesel da 8 kW con utilizzo medio di 10 ore/giorno.
          Il risparmio effettivo dipende dai consumi specifici del cantiere.
        </motion.p>
      </Container>
    </Section>
  )
}
