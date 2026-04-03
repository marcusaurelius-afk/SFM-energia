'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Section'

const schema = z.object({
  nome: z.string().min(2, 'Inserisci il tuo nome e cognome'),
  azienda: z.string().optional(),
  email: z.string().email('Inserisci un indirizzo email valido'),
  telefono: z.string().optional(),
  tipoInteresse: z.string().min(1, 'Seleziona un tipo di interesse'),
  durataStimata: z.string().min(1, 'Seleziona una durata'),
  messaggio: z.string().optional(),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: 'Il consenso è obbligatorio per procedere' }),
  }),
})

type FormData = z.infer<typeof schema>

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-text placeholder-gray-400 text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent hover:border-gray-300'

const errorClass = 'mt-1.5 text-xs text-red-600 font-medium'

const labelClass = 'block text-sm font-semibold text-text mb-1.5'

export default function ContattiPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      tipoInteresse: '',
      durataStimata: '',
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setServerError(null)

    try {
      const res = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error(json.error || 'Errore durante l\'invio')
      }

      router.push('/grazie')
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Errore durante l\'invio. Riprova o contattaci via email.'
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="bg-background-alt border-b border-gray-100 py-12 md:py-16">
        <Container size="lg">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-3">
              Inizia adesso
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-text mb-4">
              Richiedi un preventivo
            </h1>
            <p className="text-text-muted text-lg max-w-xl">
              Compila il modulo e ti ricontattiamo entro 24 ore lavorative
              con una proposta su misura.
            </p>
          </motion.div>
        </Container>
      </div>

      <Container size="lg" className="py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
              {/* Nome + Azienda */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="nome" className={labelClass}>
                    Nome e cognome <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="nome"
                    type="text"
                    autoComplete="name"
                    placeholder="Mario Rossi"
                    {...register('nome')}
                    className={`${inputClass} ${errors.nome ? 'border-red-300 focus:ring-red-400' : ''}`}
                    aria-invalid={!!errors.nome}
                    aria-describedby={errors.nome ? 'nome-error' : undefined}
                  />
                  {errors.nome && (
                    <p id="nome-error" className={errorClass} role="alert">
                      {errors.nome.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="azienda" className={labelClass}>
                    Azienda{' '}
                    <span className="text-gray-400 font-normal">(opzionale)</span>
                  </label>
                  <input
                    id="azienda"
                    type="text"
                    autoComplete="organization"
                    placeholder="Impresa Edile Rossi S.r.l."
                    {...register('azienda')}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email + Telefono */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="mario@impresarossi.it"
                    {...register('email')}
                    className={`${inputClass} ${errors.email ? 'border-red-300 focus:ring-red-400' : ''}`}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className={errorClass} role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="telefono" className={labelClass}>
                    Telefono{' '}
                    <span className="text-gray-400 font-normal">(opzionale)</span>
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    autoComplete="tel"
                    placeholder="+39 340 000 0000"
                    {...register('telefono')}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Tipo interesse + Durata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="tipoInteresse" className={labelClass}>
                    Tipo di interesse <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="tipoInteresse"
                    {...register('tipoInteresse')}
                    className={`${inputClass} ${errors.tipoInteresse ? 'border-red-300 focus:ring-red-400' : ''}`}
                    aria-invalid={!!errors.tipoInteresse}
                    aria-describedby={errors.tipoInteresse ? 'tipo-error' : undefined}
                  >
                    <option value="" disabled>
                      Seleziona...
                    </option>
                    <option value="Noleggio per cantiere">Noleggio per cantiere</option>
                    <option value="Noleggio per evento">Noleggio per evento</option>
                    <option value="Noleggio per azienda agricola">
                      Noleggio per azienda agricola
                    </option>
                    <option value="Acquisto diretto">Acquisto diretto</option>
                    <option value="Partnership commerciale">Partnership commerciale</option>
                    <option value="Altro">Altro</option>
                  </select>
                  {errors.tipoInteresse && (
                    <p id="tipo-error" className={errorClass} role="alert">
                      {errors.tipoInteresse.message}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="durataStimata" className={labelClass}>
                    Durata stimata <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="durataStimata"
                    {...register('durataStimata')}
                    className={`${inputClass} ${errors.durataStimata ? 'border-red-300 focus:ring-red-400' : ''}`}
                    aria-invalid={!!errors.durataStimata}
                    aria-describedby={errors.durataStimata ? 'durata-error' : undefined}
                  >
                    <option value="" disabled>
                      Seleziona...
                    </option>
                    <option value="1–3 mesi">1–3 mesi</option>
                    <option value="3–6 mesi">3–6 mesi</option>
                    <option value="6–12 mesi">6–12 mesi</option>
                    <option value="Più di 12 mesi">Più di 12 mesi</option>
                    <option value="Non so ancora">Non so ancora</option>
                  </select>
                  {errors.durataStimata && (
                    <p id="durata-error" className={errorClass} role="alert">
                      {errors.durataStimata.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Messaggio */}
              <div>
                <label htmlFor="messaggio" className={labelClass}>
                  Messaggio{' '}
                  <span className="text-gray-400 font-normal">(opzionale)</span>
                </label>
                <textarea
                  id="messaggio"
                  rows={5}
                  placeholder="Descrivi brevemente il tuo progetto: localizzazione, potenza necessaria, periodo previsto..."
                  {...register('messaggio')}
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Privacy checkbox */}
              <div>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register('privacyConsent')}
                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                    aria-invalid={!!errors.privacyConsent}
                    aria-describedby={errors.privacyConsent ? 'privacy-error' : undefined}
                  />
                  <span className="text-sm text-text-muted leading-relaxed group-hover:text-text transition-colors">
                    Acconsento al trattamento dei dati personali ai sensi del{' '}
                    <a
                      href="/privacy-policy"
                      className="text-primary underline hover:text-primary-dark focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded"
                      target="_blank"
                    >
                      GDPR (Reg. UE 2016/679)
                    </a>{' '}
                    per ricevere risposta alla mia richiesta.{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p id="privacy-error" className={`${errorClass} ml-7`} role="alert">
                    {errors.privacyConsent.message}
                  </p>
                )}
              </div>

              {/* Server error */}
              {serverError && (
                <div
                  className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700"
                  role="alert"
                >
                  {serverError}
                </div>
              )}

              {/* Submit */}
              <Button
                type="submit"
                size="lg"
                loading={isSubmitting}
                className="w-full sm:w-auto group"
              >
                <Send size={18} className="mr-1" />
                {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
              </Button>

              <p className="text-xs text-text-light">
                I campi contrassegnati con{' '}
                <span className="text-red-500">*</span> sono obbligatori.
              </p>
            </form>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            {/* Contact info */}
            <div className="bg-background-alt rounded-2xl p-6 border border-gray-100">
              <h2 className="font-display font-bold text-lg text-text mb-5">
                Contatti diretti
              </h2>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@solarcrate.it"
                  className="flex items-start gap-3 group hover:text-primary transition-colors focus-visible:outline-none focus-visible:underline"
                >
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-card shrink-0 group-hover:bg-primary-50 transition-colors">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-light font-medium mb-0.5">Email</div>
                    <div className="text-sm font-semibold text-text group-hover:text-primary transition-colors">
                      info@solarcrate.it
                    </div>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-card shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-light font-medium mb-0.5">Sede</div>
                    <div className="text-sm text-text">
                      Milano (MI)
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center shadow-card shrink-0">
                    <Clock size={16} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-text-light font-medium mb-0.5">Orari</div>
                    <div className="text-sm text-text">
                      Lun–Ven: 9:00–18:00
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Promise */}
            <div className="bg-primary rounded-2xl p-6 text-white">
              <h3 className="font-display font-bold text-base mb-3 text-white">
                Cosa succede dopo l&apos;invio?
              </h3>
              <ol className="flex flex-col gap-3 text-sm text-green-200">
                <li className="flex items-start gap-2">
                  <span className="font-display font-bold text-accent shrink-0">1.</span>
                  Riceviamo la tua richiesta e la assegniamo a un tecnico commerciale.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-display font-bold text-accent shrink-0">2.</span>
                  Ti contattiamo entro <strong className="text-white">24 ore lavorative</strong> per
                  capire meglio le tue esigenze.
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-display font-bold text-accent shrink-0">3.</span>
                  Prepariamo un preventivo dettagliato, gratuito e senza impegno.
                </li>
              </ol>
            </div>
          </motion.div>
        </div>
      </Container>
    </div>
  )
}
