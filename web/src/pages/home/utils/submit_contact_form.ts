import { flashToast } from 'nucleify'

import { NUC_HOME_COPY } from '../constants/content'

export type HomeContactWebsiteType = 'landing' | 'business' | 'blog' | 'help'

export interface HomeContactPayload {
  email: string
  website_type: HomeContactWebsiteType
  message?: string
}

export interface HomeContactValidation {
  email?: string
  website_type?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const WEBSITE_TYPES = new Set<string>(['landing', 'business', 'blog', 'help'])
const MAX_MESSAGE = 4000

export function composeHomeContactMessage(input: { note?: string }): string {
  return input.note?.trim() ?? ''
}

/**
 * Read the string value from a Lit nui-* host event.
 *
 * Lit dispatches `CustomEvent` with `detail.value`, and the native shadow
 * `input` also bubbles (composed). Prefer `detail.value`, then the host
 * `.value` property (already updated by Lit), then the inner control from
 * `composedPath`. Never treat a numeric native `event.detail` as the value.
 */
export function nuiValueFromEvent(event: Event): string | null {
  if (event instanceof CustomEvent) {
    const detail = (event as CustomEvent<{ value?: unknown }>).detail
    if (
      detail &&
      typeof detail === 'object' &&
      typeof detail.value === 'string'
    ) {
      return detail.value
    }
  }

  const host = event.currentTarget as { value?: unknown } | null
  if (typeof host?.value === 'string') return host.value

  const path =
    typeof event.composedPath === 'function' ? event.composedPath() : []
  for (const node of path) {
    if (
      node instanceof HTMLInputElement ||
      node instanceof HTMLTextAreaElement ||
      node instanceof HTMLSelectElement
    ) {
      return node.value
    }
  }

  return null
}

/** Live value from a Lit host ref (fallback when Vue state lagged behind). */
export function nuiHostValue(
  host: { value?: unknown } | null | undefined
): string {
  return typeof host?.value === 'string' ? host.value : ''
}

export function validateHomeContactForm(input: {
  email: string
  websiteType: string
  message?: string
}): HomeContactValidation | null {
  const errors: HomeContactValidation = {}
  const email = String(input.email ?? '')
    .trim()
    .toLowerCase()

  if (!email || !EMAIL_RE.test(email) || email.length > 255) {
    errors.email = NUC_HOME_COPY.closeErrorEmail
  }

  if (!WEBSITE_TYPES.has(String(input.websiteType ?? ''))) {
    errors.website_type = NUC_HOME_COPY.closeErrorType
  }

  const message = String(input.message ?? '').trim()
  if (message.length > MAX_MESSAGE) {
    errors.message = NUC_HOME_COPY.closeErrorMessage
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
