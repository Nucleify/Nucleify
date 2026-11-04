<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Settings</h1>
        <p>Your profile, password, and theme preference.</p>
      </div>
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" class="admin-muted" style="color: #86efac">{{ ok }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <div v-else class="admin-settings-grid">
      <section class="admin-panel" style="padding: 1.25rem">
        <h2 style="margin: 0 0 1rem; font-size: 1rem">Profile</h2>
        <form class="admin-form" @submit.prevent="onSaveProfile">
          <FieldShell label="Email">
            <p style="margin: 0">{{ me?.email || '—' }}</p>
          </FieldShell>
          <FieldText
            label="Display name"
            :model-value="displayName"
            @update:model-value="displayName = $event"
          />
          <FieldText
            label="Locale"
            placeholder="en"
            :model-value="locale"
            @update:model-value="locale = $event"
          />
          <nui-button type="submit" variant="filled" :label="saving ? 'Saving…' : 'Save profile'" />
        </form>
      </section>

      <section class="admin-panel" style="padding: 1.25rem">
        <h2 style="margin: 0 0 1rem; font-size: 1rem">Security</h2>
        <form class="admin-form" @submit.prevent="onChangePassword">
          <FieldText
            label="New password"
            type="password"
            autocomplete="new-password"
            :model-value="newPassword"
            @update:model-value="newPassword = $event"
          />
          <nui-button
            type="submit"
            variant="outlined"
            :label="changingPw ? 'Updating…' : 'Update password'"
          />
        </form>
      </section>

      <section class="admin-panel" style="padding: 1.25rem">
        <h2 style="margin: 0 0 1rem; font-size: 1rem">Preferences</h2>
        <FieldSelect
          :model-value="theme"
          label="Theme"
          :options="themeOptions"
          @update:model-value="applyTheme"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setupNui } from '@portable'
import { getSupabaseClient } from '@shared_modules'

import { FieldSelect } from '@admin'
import { FieldShell } from '@admin'
import { FieldText } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Settings' })

type Me = {
  id: string
  email: string | null
  display_name: string
  locale: string
}

type FieldHost = { value: string }

const me = ref<Me | null>(null)
const loading = ref(true)
const saving = ref(false)
const changingPw = ref(false)
const error = ref('')
const ok = ref('')
const theme = ref<'dark' | 'light'>('dark')

const displayName = ref('')
const locale = ref('en')
const newPassword = ref('')

const themeOptions = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
]

async function load() {
  loading.value = true
  error.value = ''
  try {
    me.value = await adminApiGet<Me>('/api/admin/me')
    displayName.value = me.value?.display_name || ''
    locale.value = me.value?.locale || 'en'
    theme.value = document.documentElement.classList.contains('p-dark')
      ? 'dark'
      : 'light'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load settings'
  } finally {
    loading.value = false
  }
}

async function onSaveProfile() {
  saving.value = true
  error.value = ''
  ok.value = ''
  try {
    me.value = await adminApiSend<Me>('/api/admin/me', 'PATCH', {
      display_name: displayName.value,
      locale: locale.value || 'en',
    })
    ok.value = 'Profile saved.'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
  } finally {
    saving.value = false
  }
}

async function onChangePassword() {
  changingPw.value = true
  error.value = ''
  ok.value = ''
  const password = newPassword.value
  if (password.length < 8) {
    error.value = 'Password must be at least 8 characters'
    changingPw.value = false
    return
  }
  try {
    const { error: authError } = await getSupabaseClient().auth.updateUser({
      password,
    })
    if (authError) throw authError
    ok.value = 'Password updated.'
    newPassword.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Password update failed'
  } finally {
    changingPw.value = false
  }
}

function applyTheme(mode: string) {
  const next = mode === 'light' ? 'light' : 'dark'
  theme.value = next
  setupNui({ palette: 'nuxt', mode: next })
  try {
    localStorage.setItem('admin-theme', next)
  } catch {
    /* ignore */
  }
}

onMounted(() => {
  try {
    const stored = localStorage.getItem('admin-theme')
    if (stored === 'light' || stored === 'dark') applyTheme(stored)
  } catch {
    /* ignore */
  }
  void load()
})
</script>

<style scoped>
.admin-settings-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
}
</style>
