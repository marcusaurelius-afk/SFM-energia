# SFM Energy — Sito Web

Sito web ufficiale di **SFM Energy**, startup italiana che noleggia e vende container fotovoltaici mobili per cantieri, eventi e siti off-grid in Lombardia.

## Stack tecnico

- **Next.js 14+** (App Router, TypeScript)
- **Tailwind CSS** — styling utility-first
- **Framer Motion** — animazioni
- **React Hook Form + Zod** — form con validazione
- **Resend** — invio email (piano gratuito: 100 email/mese)
- **Lucide React** — icone

## Struttura del progetto

```
app/
├── layout.tsx              # Layout globale, metadata, font
├── page.tsx                # Home page
├── globals.css             # Stili globali e Tailwind
├── sitemap.ts              # Sitemap automatica
├── robots.ts               # robots.txt
├── not-found.tsx           # Pagina 404
├── contatti/
│   └── page.tsx            # Form preventivo
├── grazie/
│   └── page.tsx            # Conferma invio
├── privacy-policy/
│   └── page.tsx            # Privacy Policy GDPR
└── api/
    └── contatti/
        └── route.ts        # API endpoint email

components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Section.tsx         # Section, Container, SectionHeader
│   ├── StatCard.tsx
│   └── ImagePlaceholder.tsx
├── layout/
│   ├── Header.tsx          # Navbar sticky con menu mobile
│   └── Footer.tsx
└── sections/
    ├── Hero.tsx
    ├── ProblemSolution.tsx
    ├── ProductStats.tsx
    ├── HowItWorks.tsx
    ├── SavingsCalculator.tsx  # ⭐ Componente interattivo chiave
    ├── CustomerSegments.tsx
    ├── TechnicalSpecs.tsx  # Accordion espandibile
    └── FinalCTA.tsx

lib/
└── utils.ts                # cn(), formatCurrency(), formatNumber()
```

## Setup locale

### 1. Clona e installa

```bash
git clone <repo-url>
cd sfm-energia
npm install
```

### 2. Variabili d'ambiente

```bash
cp .env.example .env.local
```

Apri `.env.local` e configura:

```env
# Obbligatorio per l'invio email (ottieni la chiave su resend.com)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Email destinatario richieste
CONTACT_EMAIL=info@sfm-energy.it

# URL del sito (per sitemap e Open Graph)
NEXT_PUBLIC_SITE_URL=https://www.sfm-energy.it
```

> **Senza RESEND_API_KEY**: il form funziona comunque — i dati vengono stampati nei log del server. Utile per sviluppo locale.

### 3. Avvia il server di sviluppo

```bash
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000)

### 4. Build di produzione

```bash
npm run build
npm start
```

## Variabili d'ambiente

| Variabile | Obbligatoria | Default | Descrizione |
|---|---|---|---|
| `RESEND_API_KEY` | No* | — | Chiave API Resend per invio email |
| `CONTACT_EMAIL` | No | `info@sfm-energy.it` | Email destinatario preventivi |
| `NEXT_PUBLIC_SITE_URL` | No | `https://www.sfm-energy.it` | URL pubblico del sito |

*Senza la chiave Resend, le submission del form vengono solo loggate (sviluppo).

## Personalizzazione

### Sostituire le immagini placeholder

Cerca tutti i componenti `<ImagePlaceholder>` e sostituiscili con `<Image>` di Next.js:

```tsx
// Prima
<ImagePlaceholder label="FOTO: container in cantiere" />

// Dopo
<Image
  src="/images/container-cantiere.webp"
  alt="Container SFM Energy in cantiere con ali solari aperte"
  width={800}
  height={600}
  className="rounded-2xl w-full"
/>
```

### Aggiornare contatti e dati aziendali

Cerca e sostituisci i placeholder in:
- `components/layout/Footer.tsx`
- `app/contatti/page.tsx`
- `app/privacy-policy/page.tsx`
- `app/page.tsx` (JSON-LD structured data)

### Aggiornare il nome azienda

Sostituisci `SFM Energy` con il nome definitivo in tutti i file (usa cerca/sostituisci globale).

## Deploy su Vercel

Vedi [DEPLOY.md](./DEPLOY.md) per istruzioni dettagliate passo-passo.

```bash
# Deploy rapido (richiede CLI Vercel)
npx vercel --prod
```
