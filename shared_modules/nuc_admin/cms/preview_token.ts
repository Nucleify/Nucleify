import { createHmac, timingSafeEqual } from 'node:crypto'

const DEFAULT_TTL_SEC = 60 * 30

function secret(): string {
  return (
    process.env.CMS_PREVIEW_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NUC_PREVIEW_SECRET ||
    'nucleify-cms-preview-dev'
  )
}

function b64url(input: string | Buffer): string {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function fromB64url(input: string): Buffer {
  const pad = input.length % 4 === 0 ? '' : '='.repeat(4 - (input.length % 4))
  const normalized = input.replace(/-/g, '+').replace(/_/g, '/') + pad
  return Buffer.from(normalized, 'base64')
}

export type PreviewTokenPayload = {
  slug: string
  locale: string
  collection: string
  exp: number
}

/** Create a short-lived HMAC preview token for draft documents. */
export function signPreviewToken(
  payload: Omit<PreviewTokenPayload, 'exp'> & { ttlSec?: number }
): string {
  const exp =
    Math.floor(Date.now() / 1000) + (payload.ttlSec ?? DEFAULT_TTL_SEC)
  const body = b64url(
    JSON.stringify({
      slug: payload.slug,
      locale: payload.locale,
      collection: payload.collection,
      exp,
    })
  )
  const sig = createHmac('sha256', secret()).update(body).digest()
  return `${body}.${b64url(sig)}`
}

export function verifyPreviewToken(token: string): PreviewTokenPayload | null {
  const [body, sig] = String(token || '').split('.')
  if (!body || !sig) return null
  const expected = createHmac('sha256', secret()).update(body).digest()
  let actual: Buffer
  try {
    actual = fromB64url(sig)
  } catch {
    return null
  }
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    return null
  }
  try {
    const parsed = JSON.parse(
      fromB64url(body).toString('utf8')
    ) as PreviewTokenPayload
    if (!parsed?.slug || !parsed?.locale || !parsed?.collection) return null
    if (
      !Number.isFinite(parsed.exp) ||
      parsed.exp < Math.floor(Date.now() / 1000)
    ) {
      return null
    }
    return parsed
  } catch {
    return null
  }
}
