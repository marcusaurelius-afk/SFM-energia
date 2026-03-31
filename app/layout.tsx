import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

/*
 * FONT SETUP
 * Fonts (Outfit + Plus Jakarta Sans) are loaded via CSS @import in globals.css.
 * For self-hosting via next/font (recommended in production), uncomment the block below
 * and restore the className on <html>. Requires internet at build time (works on Vercel).
 *
 * import { Outfit, Plus_Jakarta_Sans } from 'next/font/google'
 * const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit', display: 'swap', weight: ['400','500','600','700','800'] })
 * const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-plus-jakarta', display: 'swap', weight: ['400','500','600','700'] })
 * Then: <html lang="it" className={`${outfit.variable} ${plusJakarta.variable}`}>
 */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sfm-energy.it'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SFM Energy — Container Fotovoltaici Mobili | Noleggio e Vendita',
    template: '%s | SFM Energy',
  },
  description:
    'Container fotovoltaici da 20 kWp a noleggio o in vendita. Sostituisci il generatore diesel: zero carburante, zero rumore, zero emissioni. Per cantieri, eventi e siti off-grid in Lombardia.',
  keywords: [
    'container fotovoltaico mobile',
    'noleggio generatore solare',
    'energia solare cantiere',
    'container solare Lombardia',
    'alternativa generatore diesel',
    'energia off-grid',
    'noleggio energia solare Milano',
    'fotovoltaico mobile',
    'generatore solare silenzioso',
  ],
  authors: [{ name: 'SFM Energy' }],
  creator: 'SFM Energy',
  publisher: 'SFM Energy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: siteUrl,
    siteName: 'SFM Energy',
    title: 'SFM Energy — Container Fotovoltaici Mobili per Cantieri ed Eventi',
    description:
      'Container fotovoltaici da 20 kWp: zero diesel, zero rumore, zero emissioni. Noleggio e vendita in Lombardia.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SFM Energy — Container Fotovoltaico Mobile aperto con pannelli solari dispiegati',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SFM Energy — Container Fotovoltaici Mobili',
    description:
      'Zero diesel, zero rumore. Container fotovoltaici da 20 kWp per cantieri, eventi e siti off-grid.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
