'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Section, Container, SectionHeader } from '@/components/ui/Section'

interface Founder {
  /** Path relativo a /public, es. "/team/simone-ferrario.jpg" */
  image?: string
  initials: string
  name: string
  role: string
}

const founders: Founder[] = [
  {
    image: '/team/simone-ferrario.jpg',
    initials: 'SF',
    name: 'Simone Ferrario',
    role: 'Co-fondatore',
  },
  {
    image: '/team/marco-molteni.jpg',
    initials: 'MM',
    name: 'Marco Molteni',
    role: 'Co-fondatore',
  },
]

function FounderAvatar({ founder }: { founder: Founder }) {
  if (founder.image) {
    return (
      <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 ring-4 ring-primary/10">
        <Image
          src={founder.image}
          alt={`Foto di ${founder.name}`}
          fill
          sizes="96px"
          className="object-cover object-top"
          onError={(e) => {
            // Se l'immagine non esiste, nascondi e mostra il fallback
            ;(e.currentTarget as HTMLImageElement).style.display = 'none'
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shrink-0 ring-4 ring-primary/10">
      <span className="font-display text-2xl font-bold text-white tracking-wide">
        {founder.initials}
      </span>
    </div>
  )
}

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
              <FounderAvatar founder={founder} />

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
