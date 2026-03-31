import type { Metadata } from 'next'
import { Container } from '@/components/ui/Section'

export const metadata: Metadata = {
  title: 'Privacy Policy e Cookie Policy',
  description:
    'Informativa sul trattamento dei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per SFM Energy.',
  robots: { index: true, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="bg-background-alt border-b border-gray-100 py-10">
        <Container size="md">
          <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-2">
            Legale
          </p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-text">
            Privacy Policy
          </h1>
          <p className="text-text-muted mt-2 text-sm">
            Ultimo aggiornamento: marzo 2026
          </p>
        </Container>
      </div>

      <Container size="md" className="py-12">
        <div className="prose prose-slate max-w-none text-text-muted leading-relaxed">

          {/* 1 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            1. Titolare del trattamento
          </h2>
          <p>
            Il Titolare del trattamento dei dati personali è:
          </p>
          <div className="bg-background-alt rounded-xl p-4 my-4 text-sm border border-gray-100">
            <strong className="text-text">SFM Energy S.r.l.</strong> (startup innovativa)<br />
            Via Placeholder 1, 20100 Milano (MI)<br />
            P.IVA: 00000000000<br />
            Email: <a href="mailto:info@sfm-energy.it" className="text-primary hover:underline">info@sfm-energy.it</a><br />
            Telefono: +39 02 0000 0000
          </div>

          {/* 2 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            2. Tipologia di dati trattati
          </h2>
          <p>
            Attraverso il modulo di contatto presente sul sito, raccogliamo i seguenti dati personali:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Nome e cognome (obbligatorio)</li>
            <li>Ragione sociale / nome azienda (facoltativo)</li>
            <li>Indirizzo email (obbligatorio)</li>
            <li>Numero di telefono (facoltativo)</li>
            <li>Tipologia di interesse e durata stimata del noleggio (obbligatori)</li>
            <li>Testo libero del messaggio (facoltativo)</li>
          </ul>
          <p className="mt-3">
            Il sito raccoglie automaticamente dati tecnici di navigazione (indirizzo IP,
            browser, sistema operativo) tramite i log del server. Tali dati non vengono
            associati a persone identificate salvo in caso di necessità di sicurezza.
          </p>

          {/* 3 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            3. Finalità del trattamento
          </h2>
          <p>I dati personali raccolti sono trattati per le seguenti finalità:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>
              <strong className="text-text">Risposta alle richieste di contatto</strong>: gestire e
              rispondere alle richieste di preventivo, informazioni commerciali e assistenza inviate
              tramite il modulo.
            </li>
            <li>
              <strong className="text-text">Invio di preventivi</strong>: preparare e inviare
              offerte commerciali personalizzate su richiesta dell&apos;interessato.
            </li>
            <li>
              <strong className="text-text">Adempimenti di legge</strong>: rispettare obblighi
              normativi applicabili.
            </li>
          </ul>

          {/* 4 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            4. Base giuridica del trattamento
          </h2>
          <p>
            Il trattamento dei dati personali si basa sul{' '}
            <strong className="text-text">
              consenso dell&apos;interessato (art. 6, par. 1, lett. a) del Reg. UE 2016/679
            </strong>
            , prestato mediante la spunta dell&apos;apposita casella nel modulo di contatto.
          </p>
          <p className="mt-2">
            Il consenso è libero, specifico, informato e revocabile in qualsiasi momento
            senza pregiudizio per la liceità del trattamento effettuato prima della revoca.
          </p>

          {/* 5 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            5. Periodo di conservazione
          </h2>
          <p>
            I dati personali raccolti tramite il modulo di contatto sono conservati per un
            periodo massimo di <strong className="text-text">24 mesi</strong> dalla data
            di ricezione della richiesta, salvo necessità di conservazione per adempimenti
            legali o contrattuali in corso.
          </p>

          {/* 6 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            6. Comunicazione e condivisione dei dati
          </h2>
          <p>
            I dati personali non vengono ceduti, venduti o comunicati a terzi per finalità
            di marketing. Possono essere condivisi con:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>
              <strong className="text-text">Resend Inc.</strong> (servizio di invio email):
              utilizzato come responsabile del trattamento per la trasmissione tecnica delle
              email. Dati: nome, email, contenuto del messaggio. Privacy policy:{' '}
              <a href="https://resend.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                resend.com/privacy
              </a>
            </li>
            <li>
              <strong className="text-text">Vercel Inc.</strong> (hosting del sito web):
              il sito è ospitato su infrastruttura Vercel. Privacy policy:{' '}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                vercel.com/legal/privacy-policy
              </a>
            </li>
          </ul>
          <p className="mt-2">
            Tutti i fornitori di servizi sono nominati responsabili del trattamento ai sensi
            dell&apos;art. 28 GDPR e trattano i dati esclusivamente su istruzione del Titolare.
          </p>

          {/* 7 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            7. Diritti dell&apos;interessato
          </h2>
          <p>
            Ai sensi degli artt. 15–22 del Reg. UE 2016/679, l&apos;interessato ha il diritto di:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>
              <strong className="text-text">Accesso</strong> (art. 15): ottenere conferma del
              trattamento e copia dei dati.
            </li>
            <li>
              <strong className="text-text">Rettifica</strong> (art. 16): correggere dati inesatti
              o incompleti.
            </li>
            <li>
              <strong className="text-text">Cancellazione</strong> (art. 17): ottenere la
              cancellazione dei dati (&quot;diritto all&apos;oblio&quot;).
            </li>
            <li>
              <strong className="text-text">Limitazione</strong> (art. 18): limitare il trattamento
              in determinati casi.
            </li>
            <li>
              <strong className="text-text">Portabilità</strong> (art. 20): ricevere i dati in
              formato strutturato e leggibile.
            </li>
            <li>
              <strong className="text-text">Opposizione</strong> (art. 21): opporsi al trattamento.
            </li>
            <li>
              <strong className="text-text">Revoca del consenso</strong> (art. 7): revocare il
              consenso in qualsiasi momento.
            </li>
          </ul>
          <p className="mt-3">
            Per esercitare i propri diritti, l&apos;interessato può inviare una richiesta via email a:{' '}
            <a href="mailto:info@sfm-energy.it" className="text-primary hover:underline">
              info@sfm-energy.it
            </a>
          </p>
          <p className="mt-2">
            Ha altresì il diritto di proporre reclamo all&apos;
            <strong className="text-text">Autorità Garante per la protezione dei dati personali</strong>{' '}
            (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              garanteprivacy.it
            </a>).
          </p>

          {/* 8 */}
          <h2 id="cookie" className="font-display text-xl font-bold text-text mt-8 mb-3">
            8. Cookie Policy
          </h2>
          <p>
            Il sito SFM Energy utilizza esclusivamente{' '}
            <strong className="text-text">cookie tecnici strettamente necessari</strong> al
            funzionamento del sito. Non vengono utilizzati cookie di profilazione, cookie di
            terze parti per tracking o cookie analytics.
          </p>
          <div className="bg-background-alt rounded-xl p-4 my-4 border border-gray-100 text-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-text font-semibold">Cookie</th>
                  <th className="text-left py-2 text-text font-semibold">Tipo</th>
                  <th className="text-left py-2 text-text font-semibold">Durata</th>
                  <th className="text-left py-2 text-text font-semibold">Scopo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 text-text-muted">next-session</td>
                  <td className="py-2 text-text-muted">Tecnico</td>
                  <td className="py-2 text-text-muted">Sessione</td>
                  <td className="py-2 text-text-muted">Gestione sessione Next.js</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Non è richiesto il banner del consenso cookie in quanto vengono utilizzati
            esclusivamente cookie tecnici necessari, non soggetti all&apos;obbligo di consenso
            ai sensi dell&apos;art. 122 D.Lgs. 196/2003 (Codice Privacy) e delle Linee Guida
            del Garante Privacy del 10 giugno 2021.
          </p>

          {/* 9 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            9. Sicurezza dei dati
          </h2>
          <p>
            SFM Energy adotta misure tecniche e organizzative adeguate per proteggere i dati
            personali da accesso non autorizzato, perdita o distruzione. Le comunicazioni
            con il sito avvengono tramite protocollo HTTPS con certificato SSL/TLS.
          </p>

          {/* 10 */}
          <h2 className="font-display text-xl font-bold text-text mt-8 mb-3">
            10. Modifiche alla presente informativa
          </h2>
          <p>
            Il Titolare si riserva il diritto di apportare modifiche alla presente informativa
            in qualsiasi momento. Le modifiche saranno pubblicate su questa pagina con
            indicazione della data di aggiornamento. Si invita a consultare periodicamente
            questa pagina.
          </p>

          <div className="mt-10 pt-6 border-t border-gray-200 text-sm text-text-light">
            <p>
              Informativa aggiornata a marzo 2026 · SFM Energy S.r.l. · P.IVA 00000000000
            </p>
          </div>
        </div>
      </Container>
    </div>
  )
}
