import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  nome: z.string().min(2),
  azienda: z.string().optional(),
  email: z.string().email(),
  telefono: z.string().optional(),
  tipoInteresse: z.string().min(1),
  durataStimata: z.string().min(1),
  messaggio: z.string().optional(),
  privacyConsent: z.literal(true),
})

function buildEmailHtml(data: z.infer<typeof schema>): string {
  return `
<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8" /><title>Nuova richiesta preventivo</title></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1A1A1A;">
  <div style="background: #1B5E20; padding: 20px 24px; border-radius: 12px 12px 0 0;">
    <h1 style="color: #F59E0B; margin: 0; font-size: 20px;">SFM Energy — Nuova richiesta preventivo</h1>
  </div>
  <div style="background: #F2F2ED; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #E5E5E5;">
    <table width="100%" cellpadding="8" style="border-collapse: collapse;">
      <tr><td style="font-weight: 600; width: 160px; color: #4A4A4A;">Nome e cognome</td><td>${data.nome}</td></tr>
      ${data.azienda ? `<tr><td style="font-weight: 600; color: #4A4A4A;">Azienda</td><td>${data.azienda}</td></tr>` : ''}
      <tr><td style="font-weight: 600; color: #4A4A4A;">Email</td><td><a href="mailto:${data.email}">${data.email}</a></td></tr>
      ${data.telefono ? `<tr><td style="font-weight: 600; color: #4A4A4A;">Telefono</td><td><a href="tel:${data.telefono}">${data.telefono}</a></td></tr>` : ''}
      <tr><td style="font-weight: 600; color: #4A4A4A;">Tipo interesse</td><td>${data.tipoInteresse}</td></tr>
      <tr><td style="font-weight: 600; color: #4A4A4A;">Durata stimata</td><td>${data.durataStimata}</td></tr>
      ${data.messaggio ? `<tr><td style="font-weight: 600; color: #4A4A4A; vertical-align: top;">Messaggio</td><td style="white-space: pre-wrap;">${data.messaggio}</td></tr>` : ''}
    </table>
    <hr style="border: 1px solid #D1D5DB; margin: 20px 0;" />
    <p style="color: #6B6B6B; font-size: 12px; margin: 0;">
      Richiesta ricevuta il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })} · SFM Energy
    </p>
  </div>
</body>
</html>
`
}

function buildEmailText(data: z.infer<typeof schema>): string {
  const lines = [
    'NUOVA RICHIESTA PREVENTIVO — SFM Energy',
    '='.repeat(40),
    `Nome: ${data.nome}`,
    data.azienda ? `Azienda: ${data.azienda}` : null,
    `Email: ${data.email}`,
    data.telefono ? `Telefono: ${data.telefono}` : null,
    `Tipo interesse: ${data.tipoInteresse}`,
    `Durata stimata: ${data.durataStimata}`,
    data.messaggio ? `\nMessaggio:\n${data.messaggio}` : null,
    '',
    `Data: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}`,
  ]
  return lines.filter(Boolean).join('\n')
}

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Richiesta non valida' }, { status: 400 })
  }

  const parse = schema.safeParse(body)
  if (!parse.success) {
    return NextResponse.json(
      { error: 'Dati non validi', details: parse.error.flatten() },
      { status: 422 }
    )
  }

  const data = parse.data
  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_EMAIL || 'info@sfm-energy.it'

  if (!apiKey) {
    // Development fallback: log to console
    console.log('=== FORM SUBMISSION (no RESEND_API_KEY set) ===')
    console.log(buildEmailText(data))
    console.log('===============================================')
    return NextResponse.json({ success: true, dev: true })
  }

  try {
    const { Resend } = await import('resend')
    const resend = new Resend(apiKey)

    const { error } = await resend.emails.send({
      from: 'SFM Energy <noreply@sfm-energy.it>',
      to: [toEmail],
      reply_to: data.email,
      subject: `[SFM Energy] Nuova richiesta da ${data.nome}${data.azienda ? ` — ${data.azienda}` : ''}`,
      html: buildEmailHtml(data),
      text: buildEmailText(data),
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Errore durante l\'invio email' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('API route error:', err)
    return NextResponse.json({ error: 'Errore interno del server' }, { status: 500 })
  }
}
