// @ts-nocheck

import { serve } from 'https://deno.land/std@0.224.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-headers':
    'authorization, x-client-info, apikey, content-type',
}

const validWebsiteTypes = new Set(['landing', 'business', 'blog', 'help'])

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'content-type': 'application/json' },
  })

const renderHtmlEmail = (email: string, message: string) => {
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19)
  const safeMessage = String(message)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>')

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
        <a href="mailto:${email}">${email}</a>
      </div>
    </div>
    <div style="margin-bottom:15px">
      <span style="font-weight:600;color:#555;display:block;margin-bottom:5px">What they need:</span>
      <div style="background:#f9f9f9;padding:12px;border-radius:4px;border-left:3px solid #10b981">${safeMessage}</div>
    </div>
    <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #eee;color:#888;font-size:12px">
      <p>This message was sent from the contact form on your website.</p>
      <p>Sent at: ${now}</p>
    </div>
  </div>
</body>
</html>`
}

async function sendEmailWithResend(
  to: string,
  email: string,
  message: string
): Promise<void> {
  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  if (!resendApiKey) return

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: Deno.env.get('CONTACT_FORM_FROM') || 'noreply@nucleify.io',
      to: [to],
      reply_to: email,
      subject: `New Contact Form Submission - ${email}`,
      html: renderHtmlEmail(email, message),
    }),
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Resend error: ${body}`)
  }
}

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (request.method !== 'POST') {
    return json(405, { success: false, error: 'Method not allowed.' })
  }

  try {
    const payload = await request.json()
    const email = String(payload?.email || '')
      .trim()
      .toLowerCase()
    const message = String(payload?.message || '').trim()
    const websiteTypeRaw = String(payload?.website_type || 'help').trim()
    const websiteType = validWebsiteTypes.has(websiteTypeRaw)
      ? websiteTypeRaw
      : 'help'

    if (!email) {
      return json(422, {
        success: false,
        error: 'Validation error.',
        errors: { email: ['Email is required.'] },
      })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email) || email.length > 255) {
      return json(422, {
        success: false,
        error: 'Validation error.',
        errors: { email: ['Please enter a valid email address.'] },
      })
    }

    if (!message || message.length > 4000) {
      return json(422, {
        success: false,
        error: 'Validation error.',
        errors: {
          message: [
            message ? 'Message is too long.' : 'Please tell us what you need.',
          ],
        },
      })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') || ''
    const publishableKey = Deno.env.get('PUBLISHABLE_SUPABASE_KEY') || ''
    if (!supabaseUrl || !publishableKey) {
      return json(500, {
        success: false,
        error: 'Server misconfiguration.',
      })
    }
    const supabase = createClient(supabaseUrl, publishableKey)

    const { error: insertError } = await supabase
      .from('contact_form_submissions')
      .insert({ email, website_type: websiteType })

    if (insertError) throw insertError

    const recipientEmail =
      Deno.env.get('CONTACT_FORM_EMAIL') || 'business@nucleify.io'

    await sendEmailWithResend(recipientEmail, email, message)

    return json(200, {
      success: true,
      message: 'Your message has been sent successfully!',
    })
  } catch (error) {
    return json(500, {
      success: false,
      error: 'Failed to send message. Please try again later.',
      errors: error instanceof Error ? error.message : 'Unknown error',
    })
  }
})
