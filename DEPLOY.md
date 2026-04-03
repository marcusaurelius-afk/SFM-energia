# Guida al Deploy su Vercel

Questa guida è pensata per chi non ha esperienza con deployment web.
Seguila passo-passo: alla fine avrai il sito live su internet.

---

## Cosa ti serve

- Un account **Vercel** gratuito → [vercel.com/signup](https://vercel.com/signup)
- Un account **GitHub** (gratuito) → [github.com/signup](https://github.com/signup)
- (Opzionale) Un account **Resend** per le email → [resend.com](https://resend.com)

---

## STEP 1 — Carica il codice su GitHub

### Opzione A: da riga di comando (se hai Git installato)

```bash
# Nella cartella del progetto
git add .
git commit -m "Initial commit — SFM Energy website"
git branch -M main

# Crea un repo su GitHub (manualmente su github.com)
# poi collega e carica:
git remote add origin https://github.com/TUO-USERNAME/sfm-energia.git
git push -u origin main
```

### Opzione B: tramite GitHub Desktop (più semplice)

1. Scarica [GitHub Desktop](https://desktop.github.com)
2. Vai su **File → Add Local Repository** e seleziona la cartella del progetto
3. Clicca **Publish repository** (scegli nome e se privato o pubblico)
4. Clicca **Push origin**

---

## STEP 2 — Connetti Vercel al repository GitHub

1. Vai su [vercel.com](https://vercel.com) e accedi
2. Clicca **Add New → Project**
3. Clicca **Import** accanto al tuo repository `sfm-energia`
4. Vercel rileva automaticamente che è un progetto Next.js ✓
5. **Non modificare** le impostazioni di build — sono già corrette

---

## STEP 3 — Configura le variabili d'ambiente

Prima di cliccare "Deploy", aggiungi le variabili d'ambiente:

1. Nella schermata del progetto su Vercel, cerca la sezione **"Environment Variables"**
2. Aggiungi queste variabili (una alla volta):

| Nome | Valore | Ambiente |
|---|---|---|
| `RESEND_API_KEY` | `re_xxxx...` (vedi sotto) | Production, Preview |
| `CONTACT_EMAIL` | `info@sfm-energy.it` | Production, Preview |
| `NEXT_PUBLIC_SITE_URL` | `https://www.sfm-energy.it` | Production |

### Come ottenere la chiave Resend (per ricevere email dal form)

1. Vai su [resend.com](https://resend.com) e crea un account gratuito
2. Nel dashboard, vai su **API Keys → Create API Key**
3. Dai un nome (es. "sfm-energia-production") e clicca **Add**
4. Copia la chiave che inizia con `re_`
5. **Incollala** nel campo `RESEND_API_KEY` su Vercel

> **Nota**: il piano gratuito Resend permette 100 email/mese. Per un sito di lead generation iniziale è sufficiente.

> **Senza Resend**: il form funziona comunque, ma le richieste non arriveranno via email. Puoi aggiungerlo in seguito.

---

## STEP 4 — Deploy!

1. Clicca **Deploy**
2. Aspetta 1–2 minuti mentre Vercel compila il sito
3. Quando vedi ✅ **Congratulations!** il sito è live!
4. Vercel ti fornisce un URL del tipo `sfm-energia-xxx.vercel.app`

---

## STEP 5 — Collegare il dominio personalizzato

Se hai un dominio (es. `sfm-energy.it`):

1. Nel dashboard Vercel, vai su **Settings → Domains**
2. Inserisci il tuo dominio e clicca **Add**
3. Vercel ti mostra i record DNS da configurare presso il tuo registrar (es. Aruba, Register.it, Namecheap)
4. Aggiungi i record DNS indicati e aspetta la propagazione (fino a 48 ore, di solito meno)

---

## Aggiornamenti futuri

Ogni volta che modifichi il codice e fai un commit su GitHub, Vercel rideploya automaticamente il sito. Non devi fare nulla di manuale.

```bash
# Esempio: modifichi un testo, poi:
git add .
git commit -m "Aggiornamento testi hero section"
git push
# Vercel rideploya in automatico in ~1 minuto
```

---

## Risoluzione problemi comuni

### Il form non invia email
- Verifica che `RESEND_API_KEY` sia impostata correttamente nelle variabili d'ambiente di Vercel
- Verifica che il dominio del mittente sia verificato su Resend (vai su Resend → Domains)
- In alternativa, usa un indirizzo `@resend.dev` come mittente (funziona senza verifica dominio)

### Il sito mostra errore 500
- Vai su Vercel → il tuo progetto → **Functions** → guarda i log degli errori

### Le immagini non si caricano
- Assicurati che i file immagine siano nella cartella `public/` del progetto
- I file immagine devono essere committati su GitHub

### Come vedere i log in produzione
1. Dashboard Vercel → il tuo progetto
2. Clicca su **Functions** (menu sinistro)
3. Clicca su un'invocazione per vedere i log

---

## Contatti tecnici

Per assistenza tecnica: apri una issue sul repository GitHub del progetto.
