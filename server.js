import dotenv from 'dotenv'
import express from 'express'
import { Resend } from 'resend'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(dirname, '.env.local') })
const app = express()
const port = Number(process.env.PORT || 3000)
const apiPort = Number(process.env.API_PORT || 3001)
const distDir = path.join(dirname, 'dist')
const isDev = process.argv.includes('--dev')

app.disable('x-powered-by')
app.use(express.json({ limit: '20kb' }))

const submissions = new Map()
const rateLimit = (req, res, next) => {
  const now = Date.now()
  const key = req.ip
  const recent = (submissions.get(key) || []).filter((time) => now - time < 15 * 60 * 1000)
  if (recent.length >= 5) return res.status(429).json({ error: 'Too many messages. Please try again later.' })
  recent.push(now)
  submissions.set(key, recent)
  next()
}

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[char]))

app.post('/api/contact', rateLimit, async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter a valid name, email, and message.' })
  }
  if (!process.env.RESEND_API_KEY) return res.status(503).json({ error: 'Contact email is not configured yet.' })

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO_EMAIL || 'melvinkenj@gmail.com'],
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      html: `<h2>New portfolio message</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\r?\n/g, '<br>')}</p>`,
      text: `New portfolio message\n\nName: ${name}\nEmail: ${email}\n\n${message}`,
    })
    if (error) {
      console.error('Resend email error:', error.name, error.message)
      return res.status(502).json({ error: 'Resend could not deliver this message. Check that your API key is active and your From address is verified in Resend.' })
    }
    return res.json({ ok: true })
  } catch (error) {
    console.error('Contact endpoint error:', error.name, error.message)
    return res.status(502).json({ error: 'Email delivery failed. Check the Resend API key and verified sender address, or email Melvin directly.' })
  }
})

app.use('/api', (_req, res) => res.status(404).json({ error: 'Contact service endpoint not found.' }))
app.use((error, _req, res, _next) => {
  console.error('Request error:', error.message)
  if (res.headersSent) return
  res.status(error.status || 500).json({ error: 'The request could not be processed. Please try again.' })
})

if (isDev) {
  const { createServer } = await import('vite')
  app.listen(apiPort, '127.0.0.1', () => console.log(`Contact API listening on http://127.0.0.1:${apiPort}`))
  const vite = await createServer({
    appType: 'spa',
    server: {
      host: '0.0.0.0',
      port: Number(process.env.VITE_PORT || 5173),
      proxy: { '/api': { target: `http://127.0.0.1:${apiPort}`, changeOrigin: true } },
    },
  })
  await vite.listen()
  vite.printUrls()
} else if (existsSync(path.join(distDir, 'index.html'))) {
  app.use(express.static(distDir))
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')))
  app.listen(port, () => console.log(`Portfolio server running on port ${port}`))
} else {
  console.error('No production build found. Run npm run build first.')
  process.exit(1)
}
