import { createClient } from '@supabase/supabase-js'

const WEBSITE_TYPES = new Set(['landing', 'business', 'blog', 'help'])
const WEBSITE_TYPE_LABELS: Record<string, string> = {
  landing: 'Open source / eval',
  business: 'Contribute',
  blog: 'Consulting',
  help: 'Other',
}
const MAX_MESSAGE = 4000
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export type ContactFormRuntimeConfig = {
  resendKey: string
  from: string
  recipient: string
  supabaseUrl?: string
  serviceKey?: string
  /** Admin also mirrors into `cms_contact_submissions`. */
  mirrorCmsInbox?: boolean
}

export type ContactFormError = {
  ok: false
  statusCode: number
  statusMessage: string
  data: Record<string, unknown>
}

export type ContactFormOk = {
  ok: true
  body: { success: true; message: string }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderHtmlEmail(
  email: string,
  websiteType: string,
  message: string
): string {
  const safeEmail = escapeHtml(email)
  const formattedType =
    WEBSITE_TYPE_LABELS[websiteType] ||
    websiteType.charAt(0).toUpperCase() + websiteType.slice(1)
  const safeType = escapeHtml(formattedType)
  const safeMessage = escapeHtml(message).replace(/\n/g, '<br>')
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Contact Form Submission</title></head>
<body style="font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5">
  <div style="background:#fff;border-radius:8px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,.1)">
    <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #10b981;margin-bottom:20px">
      <h1 style="color:#10b981;margin:0;font-size:24px">New Contact Form Submission</h1>
    </div>
    <div style="margin-bottom:15px">
      <span style="font-weight:600;color:#555;display:block;margin-bottom:5px">Email:</span>
      <div style="background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #10b981">
        <a href="mailto:${safeEmail}">${safeEmail}</a>
      </div>
    </div>
    <div style="margin-bottom:15px">
      <span style="font-weight:600;color:#555;display:block;margin-bottom:5px">What they need:</span>
      <div style="background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #10b981">${safeType}</div>
    </div>
    ${
      message
        ? `<div style="margin-bottom:15px">
      <span style="font-weight:600;color:#555;display:block;margin-bottom:5px">Message:</span>
      <div style="background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #10b981;white-space:pre-wrap">${safeMessage}</div>
    </div>`
        : ''
    }
    <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #eee;color:#888;font-size:12px">
      <p>This message was sent from the contact form on your website.</p>
      <p>Sent at: ${escapeHtml(now)}</p>
    </div>
  </div>
</body>
</html>`
}

async function sendWithResend(options: {
  apiKey: string
  from: string
  to: string
  replyTo: string
  email: string
  websiteType: string
  message: string
}): Promise<void> {
  const { apiKey, from, to, replyTo, email, websiteType, message } = options
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: replyTo,
      subject: `New Contact Form Submission - ${email}`,
      html: renderHtmlEmail(email, websiteType, message),
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend API error (${res.status}): ${text}`)
  }
}

function validationError(field: string, message: string): ContactFormError {
  return {
    ok: false,
    statusCode: 422,
    statusMessage: 'Validation error.',
    data: {
      success: false,
      error: 'Validation error.',
      errors: { [field]: [message] },
    },
  }
}

/** Shared contact-form POST body handling (web + admin Nitro routes). */
export async function handleContactFormSubmission(
  raw: Record<string, unknown> | null,
  config: ContactFormRuntimeConfig
): Promise<ContactFormOk | ContactFormError> {
  const {
    resendKey,
    from,
    recipient,
    supabaseUrl,
    serviceKey,
    mirrorCmsInbox,
  } = config

  if (!resendKey || !from || !recipient) {
    return {
      ok: false,
      statusCode: 503,
      statusMessage: 'Email service not configured.',
      data: {
        success: false,
        error: 'Email service not configured.',
      },
    }
  }

  const email = String(raw?.email ?? '')
    .trim()
    .toLowerCase()
  const message = String(raw?.message ?? '').trim()
  const websiteType = String(raw?.website_type ?? '').trim()

  if (!email) return validationError('email', 'Email is required.')
  if (!EMAIL_RE.test(email) || email.length > 255) {
    return validationError('email', 'Please enter a valid email address.')
  }
  if (!WEBSITE_TYPES.has(websiteType)) {
    return validationError(
      'website_type',
      'Please select a valid website type.'
    )
  }
  if (message.length > MAX_MESSAGE) {
    return validationError('message', 'Message is too long.')
  }

  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { error: insertError } = await supabase
      .from('contact_form_submissions')
      .insert({ email, website_type: websiteType })
    if (insertError) {
      return {
        ok: false,
        statusCode: 500,
        statusMessage: insertError.message,
        data: {
          success: false,
          error: 'Failed to save submission. Please try again later.',
        },
      }
    }
    if (mirrorCmsInbox) {
      await supabase.from('cms_contact_submissions').insert({
        name: '',
        email,
        type: websiteType,
        message,
        status: 'new',
        meta: { source: 'contact-form' },
      })
    }
  }

  try {
    await sendWithResend({
      apiKey: resendKey,
      from,
      to: recipient,
      replyTo: email,
      email,
      websiteType,
      message,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Resend failed'
    return {
      ok: false,
      statusCode: 502,
      statusMessage: msg,
      data: {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
    }
  }

  return {
    ok: true,
    body: {
      success: true,
      message: 'Your message has been sent successfully!',
    },
  }
}
