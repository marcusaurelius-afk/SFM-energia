'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, TrendingDown, Leaf } from 'lucide-react'
import { Section, Container, SectionHeader } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatNumber } from '@/lib/utils'

const SOLAR_MONTHLY_COST = 1500  // €/mese noleggio solare
const DIESEL_PRICE = 1.8         // €/litro
const CONSUMPTION_RATE = 0.3     // litri/kWh
const GENERATOR_RENTAL = 600     // €/mese noleggio generatore
const CO2_PER_LITER = 2.68       // kg CO₂/litro

interface SliderProps {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (v: number) => void
}

function Slider({ id, label, value, min, max, step = 1, unit, onChange }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={id} className="text-sm font-semibold text-text">
          {label}
        </label>
        <span className="font-display text-lg font-bold text-primary tabular-nums">
          {value} {unit}
        </span>
      </div>
      <div className="relative">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 rounded-full appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          style={{
            background: `linear-gradient(to right, #1B5E20 0%, #1B5E20 ${pct}%, #E5E7EB ${pct}%, #E5E7EB 100%)`,
          }}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={`${value} ${unit}`}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-text-light">{min} {unit}</span>
        <span className="text-xs text-text-light">{max} {unit}</span>
      </div>
    </div>
  )
}

interface BarProps {
  label: string
  value: number
  max: number
  color: 'red' | 'green'
}

function ComparisonBar({ label, value, max, color }: BarProps) {
  const pct = Math.min((value / max) * 100, 100)

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-text-muted">{label}</span>
        <span className={`font-display text-lg font-bold tabular-nums ${
          color === 'red' ? 'text-red-600' : 'text-primary'
        }`}>
          {formatCurrency(value)}
        </span>
      </div>
      <div className="h-5 rounded-full bg-gray-100 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${
            color === 'red' ? 'bg-red-400' : 'bg-primary'
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          aria-label={`${label}: ${formatCurrency(value)}`}
        />
      </div>
    </div>
  )
}

export function SavingsCalculator() {
  const [power, setPower] = useState(8)      // kW
  const [months, setMonths] = useState(3)    // mesi
  const [hours, setHours] = useState(10)     // ore/giorno

  const results = useMemo(() => {
    // Costo diesel
    const dieselFuel = power * CONSUMPTION_RATE * hours * DIESEL_PRICE * 30 * months
    const generatorRental = GENERATOR_RENTAL * months
    const totalDiesel = dieselFuel + generatorRental

    // Costo solare
    const totalSolar = SOLAR_MONTHLY_COST * months

    // Risparmio
    const savings = totalDiesel - totalSolar
    const savingsPct = totalDiesel > 0 ? (savings / totalDiesel) * 100 : 0

    // CO₂
    const co2Liters = power * CONSUMPTION_RATE * hours * 30 * months
    const co2kg = co2Liters * CO2_PER_LITER

    return {
      totalDiesel,
      totalSolar,
      savings,
      savingsPct,
      co2kg,
      dieselFuel,
      generatorRental,
    }
  }, [power, months, hours])

  const maxBar = Math.max(results.totalDiesel, results.totalSolar)

  return (
    <Section bg="white" id="calcolatore">
      <Container>
        <SectionHeader
          eyebrow="Calcolatore risparmio"
          title="Quanto ti costa il diesel ogni mese?"
          subtitle="Inserisci i tuoi parametri e confronta i costi reali del generatore diesel con il noleggio solare."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Controls */}
          <div className="bg-background-alt rounded-3xl p-6 md:p-8 border border-gray-100">
            <h3 className="font-display font-bold text-lg text-text mb-6">
              I tuoi parametri
            </h3>

            <div className="flex flex-col gap-8">
              <Slider
                id="power"
                label="Potenza necessaria"
                value={power}
                min={3}
                max={15}
                unit="kW"
                onChange={setPower}
              />
              <Slider
                id="months"
                label="Durata del noleggio"
                value={months}
                min={1}
                max={12}
                unit={months === 1 ? 'mese' : 'mesi'}
                onChange={setMonths}
              />
              <Slider
                id="hours"
                label="Ore di utilizzo al giorno"
                value={hours}
                min={6}
                max={16}
                unit="ore/giorno"
                onChange={setHours}
              />
            </div>

            {/* Breakdown diesel */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs font-semibold uppercase tracking-wider text-text-light mb-3">
                Dettaglio costi diesel
              </p>
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-text-muted">
                  <span>Carburante ({power} kW × {hours} h/g × {months} mesi)</span>
                  <span className="font-medium text-red-600">{formatCurrency(results.dieselFuel)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Noleggio generatore (€600/mese × {months})</span>
                  <span className="font-medium text-red-600">{formatCurrency(results.generatorRental)}</span>
                </div>
                <div className="flex justify-between font-semibold text-text pt-2 border-t border-gray-200">
                  <span>Totale diesel</span>
                  <span className="text-red-600">{formatCurrency(results.totalDiesel)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="flex flex-col gap-6">
            {/* Comparison bars */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-card">
              <h3 className="font-display font-bold text-lg text-text mb-6">
                Confronto costi ({months} {months === 1 ? 'mese' : 'mesi'})
              </h3>
              <div className="flex flex-col gap-5">
                <ComparisonBar
                  label="Generatore diesel"
                  value={results.totalDiesel}
                  max={maxBar}
                  color="red"
                />
                <ComparisonBar
                  label="SFM Energy (noleggio solare)"
                  value={results.totalSolar}
                  max={maxBar}
                  color="green"
                />
              </div>
            </div>

            {/* Savings highlight */}
            <motion.div
              key={`${power}-${months}-${hours}`}
              initial={{ scale: 0.97, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-primary rounded-3xl p-6 md:p-8 text-white"
            >
              <div className="flex items-start gap-3 mb-4">
                <TrendingDown size={24} className="text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="text-green-200 text-sm font-medium mb-1">Risparmio stimato</p>
                  <div className="font-display text-4xl md:text-5xl font-bold text-accent leading-none">
                    {results.savings > 0 ? formatCurrency(results.savings) : '—'}
                  </div>
                  {results.savings > 0 && (
                    <p className="text-green-200 mt-1 text-sm">
                      -{formatNumber(results.savingsPct, 0)}% rispetto al diesel
                    </p>
                  )}
                </div>
              </div>

              {/* CO2 */}
              <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-4 mt-4">
                <Leaf size={20} className="text-accent shrink-0" />
                <div>
                  <p className="text-green-200 text-xs font-medium">CO₂ evitata</p>
                  <p className="text-white font-display font-bold text-xl">
                    {formatNumber(results.co2kg / 1000, 1)} tonnellate
                  </p>
                  <p className="text-green-300 text-xs mt-0.5">
                    Certificabile per report ESG e sostenibilità
                  </p>
                </div>
              </div>
            </motion.div>

            {/* CTA */}
            <Button
              href="/contatti"
              size="lg"
              className="w-full justify-center group"
            >
              {results.savings > 0
                ? `Vuoi risparmiare ${formatCurrency(results.savings)}? Richiedi preventivo`
                : 'Richiedi un preventivo gratuito'}
              <ArrowRight
                size={20}
                className="ml-1 group-hover:translate-x-1 transition-transform duration-200"
              />
            </Button>

            <p className="text-xs text-text-light text-center">
              * Stima indicativa a fini commerciali. Dati basati su gasolio a €1,80/L
              e consumo medio 0,3 L/kWh. Il preventivo definitivo è gratuito e senza impegno.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
