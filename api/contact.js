import { Resend } from 'resend'

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[char]))

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
  const email = typeof req.body?.email === 'string' ? req.body.email.trim() : ''
  const message = typeof req.body?.message === 'string' ? req.body.message.trim() : ''
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!name || name.length > 120 || !emailPattern.test(email) || email.length > 254 || !message || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter a valid name, email, and message.' })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(503).json({ error: 'Contact email is not configured. Set RESEND_API_KEY in the production environment.' })
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { data, error } = await resend.emails.send({
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

    return res.status(200).json({ ok: true, id: data?.id })
  } catch (error) {
    console.error('Contact function error:', error.name, error.message)
    return res.status(502).json({ error: 'Email delivery failed. Check the Resend API key and verified sender address.' })
  }
}
