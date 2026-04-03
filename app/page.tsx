import type { Metadata } from 'next'
import { Hero } from '@/components/sections/Hero'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { ProductStats } from '@/components/sections/ProductStats'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { SavingsCalculator } from '@/components/sections/SavingsCalculator'
import { CustomerSegments } from '@/components/sections/CustomerSegments'
import { TechnicalSpecs } from '@/components/sections/TechnicalSpecs'
import { FinalCTA } from '@/components/sections/FinalCTA'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.solarcrate.it'

export const metadata: Metadata = {
  title: 'SolarCrate — Container Fotovoltaici Mobili | Noleggio e Vendita Lombardia',
  description:
    'Container fotovoltaici da 20 kWp a noleggio o in vendita per cantieri, eventi e siti off-grid. Zero diesel, zero rumore, zero emissioni. Lombardia e Nord Italia.',
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'SolarCrate',
    description:
      'Noleggio e vendita di container fotovoltaici mobili da 20 kWp per cantieri, eventi e siti off-grid in Lombardia.',
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    image: `${siteUrl}/og-image.jpg`,
    email: 'info@solarcrate.it',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Milano',
      addressRegion: 'Lombardia',
      addressCountry: 'IT',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.4654219,
      longitude: 9.1859243,
    },
    areaServed: {
      '@type': 'State',
      name: 'Lombardia',
    },
    priceRange: '€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ProblemSolution />
      <ProductStats />
      <HowItWorks />
      <SavingsCalculator />
      <CustomerSegments />
      <TechnicalSpecs />
      <FinalCTA />
    </>
  )
}
