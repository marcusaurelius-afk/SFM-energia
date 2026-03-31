import { Section, Container, SectionHeader } from '@/components/ui/Section'
import { StatCard } from '@/components/ui/StatCard'
import { ImagePlaceholder } from '@/components/ui/ImagePlaceholder'

const stats = [
  {
    value: '20 kWp',
    label: 'Potenza installata',
    sublabel: '4,4 fissi + 15,6 dispiegabili',
  },
  {
    value: '30 kWh',
    label: 'Accumulo batterie',
    sublabel: 'BYD LiFePO4, espandibile a 46 kWh',
    highlight: true,
  },
  {
    value: '15 kW',
    label: 'Output trifase',
    sublabel: 'Growatt SPH 15000TL3 — ibrido',
  },
  {
    value: '57+ kWh',
    label: 'Produzione giornaliera',
    sublabel: 'Media annua, Lombardia (4,5 h picco/giorno)',
    highlight: true,
  },
  {
    value: '30–45 min',
    label: 'Tempo di dispiegamento',
    sublabel: '2 operatori, zero attrezzature speciali',
  },
  {
    value: '€0',
    label: 'Costo carburante',
    sublabel: 'Per tutta la durata del noleggio',
    highlight: true,
  },
]

export function ProductStats() {
  return (
    <Section bg="white" id="prodotto">
      <Container>
        <SectionHeader
          eyebrow="Il prodotto in numeri"
          title="Un container. Tutta l'energia che ti serve."
          subtitle="Un'unità autonoma e completa: pannelli, batterie, inverter ibrido. Consegnata, dispiegata, operativa."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-16">
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              label={stat.label}
              sublabel={stat.sublabel}
              highlight={stat.highlight}
              index={i}
            />
          ))}
        </div>

        {/* Product image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ImagePlaceholder
            label="FOTO: Container SFM Energy chiuso — pronto per il trasporto su camion"
            aspectRatio="aspect-[16/10]"
          />
          <ImagePlaceholder
            label="FOTO: Container SFM Energy con ali aperte — vista aerea con pannelli esposti"
            aspectRatio="aspect-[16/10]"
          />
        </div>
      </Container>
    </Section>
  )
}
