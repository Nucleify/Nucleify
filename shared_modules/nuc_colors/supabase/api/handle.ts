import {
  apiBody,
  apiError,
  apiMethodNotAllowed,
  apiNotHandled,
  fromSupabaseError,
  tryJwtUserTable,
} from 'nuc_api'
import type { ApiContext, ApiHandlerResult, Json } from 'nuc_server'

export async function handleColorsApi(
  ctx: ApiContext
): Promise<ApiHandlerResult> {
  if (ctx.segments[0] !== 'user-colors') return apiNotHandled()

  const result = await tryJwtUserTable(ctx, {
    table: 'user_colors',
    onPut: handleColorsPut,
  })

  return result ?? apiMethodNotAllowed()
}

async function handleColorsPut(
  ctx: ApiContext,
  userId: string,
  body: Json
): Promise<ApiHandlerResult> {
  if (!Array.isArray(body.colors)) return apiError(400, 'colors array required')
  if (body.colors.length === 0) {
    return apiBody({
      success: true,
      updated_count: 0,
      created_count: 0,
      message: 'No colors to sync.',
    })
  }
  const now = new Date().toISOString()
  const rows = (body.colors as Record<string, unknown>[]).map((c) => {
    const isNew = Boolean(c.new)
    return {
      user_id: userId,
      name: c.name,
      value: c.value,
      new: isNew,
      is_new: isNew,
      updated_at: now,
    }
  })
  const { error } = await ctx.supabase
    .from('user_colors')
    .upsert(rows, { onConflict: 'user_id,name' })
  if (error) return fromSupabaseError(error)
  return apiBody({
    success: true,
    updated_count: rows.length,
    created_count: 0,
    message: 'User colors synced.',
  })
}
