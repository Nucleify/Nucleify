import { createError, defineEventHandler } from 'h3'

import { createClient } from '@supabase/supabase-js'
import { useRuntimeConfig } from 'nitropack/runtime'

type DemoCredentials = {
  email: string
  password: string
  userId: string
  name: string
}

export default defineEventHandler(async (event): Promise<DemoCredentials> => {
  if (process.env.NODE_ENV === 'production') {
    throw createError({
      statusCode: 403,
      statusMessage: 'Demo user creation is disabled in production.',
    })
  }

  const config = useRuntimeConfig(event)
  const url = String(config.public.supabaseUrl || '')
  const serviceKey = String(config.supabaseServiceRoleKey || '')
  if (!url || !serviceKey) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Missing Supabase URL or service role key.',
    })
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  })

  const stamp = Date.now()
  const email = `demo_check_${stamp}@nucleify.factory.local`
  const password = 'DemoCheck123!'
  const name = `Demo Check ${stamp}`

  const { data: created, error: createErr } =
    await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name },
    })

  if (createErr || !created?.user?.id) {
    throw createError({
      statusCode: 400,
      statusMessage: createErr?.message || 'auth.admin.createUser failed',
    })
  }

  const userId = created.user.id

  async function cleanup(): Promise<void> {
    await supabase.from('files').delete().eq('user_id', userId)
    await supabase.from('money').delete().eq('user_id', userId)
    await supabase.from('contacts').delete().eq('user_id', userId)
    await supabase.from('articles').delete().eq('user_id', userId)
    await supabase.from('user_profiles').delete().eq('id', userId)
    await supabase.auth.admin.deleteUser(userId)
  }

  // Auth may auto-create `user_profiles` (trigger); plain insert hits pkey duplicate.
  const { error: profileErr } = await supabase.from('user_profiles').upsert(
    {
      id: userId,
      name,
      email,
      language: 'en',
      country: 'poland',
      role: 'user',
    },
    { onConflict: 'id' }
  )
  if (profileErr) {
    await cleanup()
    throw createError({
      statusCode: 500,
      statusMessage: profileErr.message,
    })
  }

  const now = new Date().toISOString()

  const articles = [1, 2, 3].map((i) => ({
    user_id: userId,
    title: `Demo article ${i}`,
    description: `Sample article ${i} for the demo user.`,
    category: 'general',
    created_at: now,
    updated_at: now,
  }))
  const { error: aErr } = await supabase.from('articles').insert(articles)
  if (aErr) {
    await cleanup()
    throw createError({ statusCode: 500, statusMessage: aErr.message })
  }

  const contacts = [1, 2, 3].map((i) => ({
    user_id: userId,
    first_name: 'Contact',
    last_name: `Demo ${i}`,
    email: `contact${i}+${stamp}@demo.local`,
    personal_phone: '+48 500 000 000',
    work_phone: '+48 22 000 0000',
    address: `ul. Demo ${i}, 00-001 Warszawa`,
    birthday: '1990-06-15',
    contact_groups: ['Dev', 'Demo'],
    role: 'user',
    created_at: now,
    updated_at: now,
  }))
  const { error: cErr } = await supabase.from('contacts').insert(contacts)
  if (cErr) {
    await cleanup()
    throw createError({ statusCode: 500, statusMessage: cErr.message })
  }

  const moneyRows = [1, 2, 3].map((i) => ({
    user_id: userId,
    sender: `Sender ${i}`,
    receiver: `Receiver ${i}`,
    count: i,
    title: `Demo transfer ${i}`,
    description: `Sample money row ${i} for the demo user.`,
    category: 'transfer',
    created_at: now,
    updated_at: now,
  }))
  const { error: mErr } = await supabase.from('money').insert(moneyRows)
  if (mErr) {
    await cleanup()
    throw createError({ statusCode: 500, statusMessage: mErr.message })
  }

  const files = [1, 2, 3].map((i) => ({
    user_id: userId,
    path: `/uploads/demo-check/${stamp}/sample-${i}.txt`,
    mime_type: 'text/plain',
    size: String(256 * i),
    created_at: now,
    updated_at: now,
  }))
  const { error: fErr } = await supabase.from('files').insert(files)
  if (fErr) {
    await cleanup()
    throw createError({ statusCode: 500, statusMessage: fErr.message })
  }

  return { email, password, userId, name }
})
