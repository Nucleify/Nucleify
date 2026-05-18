import { createClient } from '@supabase/supabase-js'
import { createError, defineEventHandler, readBody } from 'h3'

import { useRuntimeConfig } from 'nitropack/runtime'

const WEBSITE_TYPES = new Set(['landing', 'business', 'blog', 'help'])

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderHtmlEmail(email: string, websiteType: string): string {
  const safeEmail = escapeHtml(email)
  const formattedType =
    websiteType.charAt(0).toUpperCase() + websiteType.slice(1)
  const safeType = escapeHtml(formattedType)
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Contact Form Submission</title></head>
<body style="font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;background:#f5f5f5">
  <div style="background:#fff;border-radius:8px;padding:30px;box-shadow:0 2px 10px rgba(0,0,0,.1)">
    <div style="text-align:center;padding-bottom:20px;border-bottom:2px solid #10b981;margin-bottom:20px">
      <h1 style="color:#10b981;margin:0;font-size:24px">📬 New Contact Form Submission</h1>
    </div>
    <div style="margin-bottom:15px">
      <span style="font-weight:600;color:#555;display:block;margin-bottom:5px">Email:</span>
      <div style="background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #10b981">
        <a href="mailto:${safeEmail}">${safeEmail}</a>
      </div>
    </div>
    <div style="margin-bottom:15px">
      <span style="font-weight:600;color:#555;display:block;margin-bottom:5px">Website Type:</span>
      <div style="background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #10b981">${safeType}</div>
    </div>
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
}): Promise<void> {
  const { apiKey, from, to, replyTo, email, websiteType } = options
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
      html: renderHtmlEmail(email, websiteType),
    }),
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Resend API error (${res.status}): ${text}`)
  }
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const resendKey = String(config.authEmailResendKey || '')
  const from = String(config.authEmailFrom || '').trim()
  const recipient = String(config.contactFormRecipient || '').trim()

  if (!resendKey || !from || !recipient) {
    throw createError({
      statusCode: 503,
      statusMessage: 'Email service not configured.',
      data: {
        success: false,
        error: 'Email service not configured.',
      },
    })
  }

  const supabaseUrl = String(config.public.supabaseUrl || '')
  const serviceKey = String(config.supabaseServiceRoleKey || '')

  const raw = (await readBody(event).catch(() => null)) as Record<
    string,
    unknown
  > | null

  const email = String(raw?.email ?? '')
    .trim()
    .toLowerCase()
  const websiteType = String(raw?.website_type ?? '').trim()

  if (!email) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation error.',
      data: {
        success: false,
        error: 'Validation error.',
        errors: { email: ['Email is required.'] },
      },
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email) || email.length > 255) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation error.',
      data: {
        success: false,
        error: 'Validation error.',
        errors: { email: ['Please enter a valid email address.'] },
      },
    })
  }

  if (!WEBSITE_TYPES.has(websiteType)) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Validation error.',
      data: {
        success: false,
        error: 'Validation error.',
        errors: {
          website_type: ['Please select a valid website type.'],
        },
      },
    })
  }

  if (supabaseUrl && serviceKey) {
    const supabase = createClient(supabaseUrl, serviceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
    const { error: insertError } = await supabase
      .from('contact_form_submissions')
      .insert({ email, website_type: websiteType })
    if (insertError) {
      throw createError({
        statusCode: 500,
        statusMessage: insertError.message,
        data: {
          success: false,
          error: 'Failed to save submission. Please try again later.',
        },
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
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : 'Resend failed'
    throw createError({
      statusCode: 502,
      statusMessage: msg,
      data: {
        success: false,
        error: 'Failed to send message. Please try again later.',
      },
    })
  }

  return {
    success: true,
    message: 'Your message has been sent successfully!',
  }
})
