'use client'

import { motion } from 'framer-motion'
import { Section, Container, SectionHeader } from '@/components/ui/Section'

const founders = [
  {
    initials: 'SF',
    name: 'Simone Ferrario',
    role: 'Co-fondatore',
  },
  {
    initials: 'MM',
    name: 'Marco Molteni',
    role: 'Co-fondatore',
  },
]

export function TeamSection() {
  return (
    <Section bg="white" id="team">
      <Container size="lg">
        <SectionHeader
          eyebrow="Il team"
          title="Chi c'è dietro SolarCrate"
          subtitle="SolarCrate nasce dall'idea di due giovani professionisti lombardi specializzati in energie rinnovabili, supportati da un perito termotecnico e da consulenti tecnici certificati."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {founders.map((founder, i) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.12, ease: 'easeOut' }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-background p-8 shadow-card hover:shadow-card-hover transition-shadow duration-200"
            >
              {/* Avatar circolare con iniziali */}
              <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="font-display text-xl font-bold text-white tracking-wide">
                  {founder.initials}
                </span>
              </div>

              <div className="text-center">
                <p className="font-display text-lg font-bold text-text">{founder.name}</p>
                <p className="text-sm text-accent font-semibold tracking-wide uppercase mt-1">
                  {founder.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
