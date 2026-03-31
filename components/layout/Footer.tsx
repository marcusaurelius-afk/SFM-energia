import Link from 'next/link'
import { Zap, Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react'

const footerLinks = {
  sito: [
    { href: '/', label: 'Home' },
    { href: '/#prodotto', label: 'Prodotto' },
    { href: '/#come-funziona', label: 'Come funziona' },
    { href: '/#calcolatore', label: 'Calcolatore risparmio' },
    { href: '/contatti', label: 'Contatti' },
  ],
  legale: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/privacy-policy#cookie', label: 'Cookie Policy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-[#0F0F0F] text-gray-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 mb-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg w-fit"
              aria-label="SFM Energy home"
            >
              <div className="flex items-center justify-center w-9 h-9 bg-primary rounded-lg">
                <Zap className="text-accent" size={20} fill="currentColor" />
              </div>
              <span className="font-display font-bold text-xl text-white">
                SFM <span className="text-accent">Energy</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-6">
              Energia solare mobile. Zero gasolio. Zero rumore.
            </p>
            <p className="text-gray-500 text-sm mb-6">
              Container fotovoltaici da 20 kWp a noleggio e in vendita per cantieri,
              eventi e siti off-grid in Lombardia e nel Nord Italia.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SFM Energy su LinkedIn"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SFM Energy su Instagram"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Navigazione
            </h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.sito.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
              Contatti
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:info@sfm-energy.it"
                  className="flex items-start gap-2.5 text-gray-400 hover:text-white text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:underline group"
                >
                  <Mail size={15} className="mt-0.5 shrink-0 group-hover:text-accent transition-colors" />
                  info@sfm-energy.it
                </a>
              </li>
              <li>
                <a
                  href="tel:+390200000000"
                  className="flex items-start gap-2.5 text-gray-400 hover:text-white text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:underline group"
                >
                  <Phone size={15} className="mt-0.5 shrink-0 group-hover:text-accent transition-colors" />
                  +39 02 0000 0000
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2.5 text-gray-400 text-sm">
                  <MapPin size={15} className="mt-0.5 shrink-0" />
                  <span>Via Placeholder 1<br />20100 Milano (MI)</span>
                </div>
              </li>
            </ul>

            <div className="mt-6">
              <h3 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">
                Legale
              </h3>
              <ul className="flex flex-col gap-2">
                {footerLinks.legale.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-150 focus-visible:outline-none focus-visible:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 SFM Energy S.r.l. — Startup innovativa · P.IVA 00000000000
          </p>
          <p className="text-gray-600 text-xs">
            Tutti i diritti riservati. Milano, Lombardia.
          </p>
        </div>
      </div>
    </footer>
  )
}
