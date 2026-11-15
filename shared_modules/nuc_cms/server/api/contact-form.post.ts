import { createError, defineEventHandler, readBody } from 'h3'

import { handleContactFormSubmission } from '../handle_contact_form'

import { useRuntimeConfig } from 'nitropack/runtime'

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
      config.public?.supabaseUrl ||
        config.publicSupabaseUrl ||
        process.env.SUPABASE_URL ||
        ''
    ),
    serviceKey: String(
      config.supabaseServiceRoleKey ||
        process.env.SUPABASE_SERVICE_ROLE_KEY ||
        ''
    ),
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
