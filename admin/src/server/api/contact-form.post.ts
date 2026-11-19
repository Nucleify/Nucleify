import { createError, defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from 'nitropack/runtime'

import { handleContactFormSubmission } from '../../../../shared_modules/index.server'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const raw = (await readBody(event).catch(() => null)) as Record<
    string,
    unknown
  > | null

  const result = await handleContactFormSubmission(raw, {
    resendKey: String(config.authEmailResendKey || ''),
    from: String(config.authEmailFrom || '').trim(),
    recipient: String(config.contactFormRecipient || '').trim(),
    supabaseUrl: String(
      config.public.supabaseUrl || process.env.SUPABASE_URL || ''
    ),
    serviceKey: String(
      config.supabaseServiceRoleKey || process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    ),
    mirrorCmsInbox: true,
  })

  if (!result.ok) {
    throw createError({
      statusCode: result.statusCode,
      statusMessage: result.statusMessage,
      data: result.data,
    })
  }

  return result.body
})
