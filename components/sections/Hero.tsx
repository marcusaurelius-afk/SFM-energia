'use client'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Zap, ShieldCheck, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'

const badges = [
  { icon: Zap, label: '20 kWp installati' },
  { icon: ShieldCheck, label: 'Zero emissioni certificate' },
  { icon: Leaf, label: 'ESG-compliant' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: 'easeOut' },
  }),
}

export function Hero() {
  const handleScrollToProduct = () => {
    const el = document.getElementById('prodotto')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-background overflow-hidden pt-20"
      aria-label="Hero — SolarCrate Container Fotovoltaici"
    >
      {/* Background geometric pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(#1B5E20 1px, transparent 1px), linear-gradient(90deg, #1B5E20 1px, transparent 1px)`,
            backgroundSize: '64px 64px',
          }}
        />
        {/* Accent circle */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <Container className="relative z-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div>
            {/* Eyebrow */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-primary-50 text-primary border border-primary/20 px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Noleggio e vendita — Lombardia e Nord Italia
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-text leading-[1.08] tracking-tight text-balance mb-6"
            >
              Energia solare mobile per{' '}
              <span className="text-primary">cantieri</span>,{' '}
              <span className="text-primary">eventi</span> e{' '}
              <span className="text-primary">siti off-grid</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-lg md:text-xl text-text-muted leading-relaxed mb-8 max-w-xl"
            >
              Container fotovoltaici da{' '}
              <strong className="text-text font-semibold">20 kWp</strong> a noleggio
              o in vendita. Sostituisci il generatore diesel:{' '}
              <strong className="text-text font-semibold">zero carburante</strong>,{' '}
              <strong className="text-text font-semibold">zero rumore</strong>,{' '}
              <strong className="text-text font-semibold">zero emissioni</strong>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Button href="/contatti" size="lg" className="group">
                Richiedi preventivo
                <ArrowRight
                  size={20}
                  className="ml-1 group-hover:translate-x-1 transition-transform duration-200"
                />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={handleScrollToProduct}
                type="button"
              >
                Scopri come funziona
                <ChevronDown size={20} className="ml-1" />
              </Button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap gap-4"
            >
              {badges.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-sm text-text-muted"
                >
                  <Icon size={16} className="text-primary shrink-0" />
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative"
          >
            {/* Main image */}
            <img
              src="/container-solarcrate.png"
              alt="Container SolarCrate con ali solari aperte — vista frontale in cantiere"
              className="w-full shadow-card-lg rounded-2xl object-cover aspect-[4/3]"
            />

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-card-lg p-4 border border-gray-100 hidden sm:block"
            >
              <div className="font-display text-3xl font-bold text-primary leading-none">
                €0
              </div>
              <div className="text-sm text-text-muted mt-1">costo carburante</div>
            </motion.div>

            {/* Floating CO2 card */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute -top-6 -right-6 bg-primary text-white rounded-2xl shadow-card-lg p-4 hidden sm:block"
            >
              <div className="font-display text-2xl font-bold text-accent leading-none">
                57+ kWh
              </div>
              <div className="text-sm text-green-200 mt-1">produzione/giorno</div>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-light"
        aria-hidden="true"
      >
        <span className="text-xs tracking-widest uppercase font-medium">Scorri</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  )
}
