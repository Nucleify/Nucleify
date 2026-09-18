import { flashToast } from 'nucleify'

import { NUC_HOME_COPY } from '../constants/content'

export type HomeContactWebsiteType = 'landing' | 'business' | 'blog' | 'help'

export interface HomeContactPayload {
  email: string
  website_type: HomeContactWebsiteType
}

export interface HomeContactValidation {
  email?: string
  website_type?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEBSITE_TYPES = new Set<string>(['landing', 'business', 'blog', 'help'])

export function validateHomeContactForm(input: {
  email: string
  websiteType: string
}): HomeContactValidation | null {
  const errors: HomeContactValidation = {}
  const email = input.email.trim().toLowerCase()

  if (!email || !EMAIL_RE.test(email) || email.length > 255) {
    errors.email = NUC_HOME_COPY.closeErrorEmail
  }

  if (!WEBSITE_TYPES.has(input.websiteType)) {
    errors.website_type = NUC_HOME_COPY.closeErrorType
  }

  return Object.keys(errors).length ? errors : null
}

export async function submitHomeContactForm(
  payload: HomeContactPayload
): Promise<{ ok: true; message: string } | { ok: false; message: string }> {
  try {
    const response = await fetch('/api/contact-form', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const body = (await response.json().catch(() => null)) as {
      success?: boolean
      message?: string
      error?: string
      data?: { error?: string; message?: string }
    } | null

    if (!response.ok) {
      const message =
        body?.data?.error ||
        body?.error ||
        body?.message ||
        NUC_HOME_COPY.closeErrorGeneric
      flashToast(message, 'error')
      return { ok: false, message }
    }

    const message = body?.message || NUC_HOME_COPY.closeSuccess
    flashToast(message, 'success')
    return { ok: true, message }
  } catch {
    const message = NUC_HOME_COPY.closeErrorGeneric
    flashToast(message, 'error')
    return { ok: false, message }
  }
}
