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
          <div class="admin-form__field">
            <label class="admin-form__label">Email</label>
            <p style="margin: 0">{{ me?.email || '—' }}</p>
          </div>
          <div class="admin-form__field">
            <label class="admin-form__label">Display name</label>
            <nui-input-text ref="nameInput" type="text" fluid />
          </div>
          <div class="admin-form__field">
            <label class="admin-form__label">Locale</label>
            <nui-input-text ref="localeInput" type="text" fluid placeholder="en" />
          </div>
          <nui-button type="submit" variant="filled" :label="saving ? 'Saving…' : 'Save profile'" />
        </form>
      </section>

      <section class="admin-panel" style="padding: 1.25rem">
        <h2 style="margin: 0 0 1rem; font-size: 1rem">Security</h2>
        <form class="admin-form" @submit.prevent="onChangePassword">
          <div class="admin-form__field">
            <label class="admin-form__label">New password</label>
            <nui-input-text
              ref="passwordInput"
              type="password"
              fluid
              autocomplete="new-password"
            />
          </div>
          <nui-button
            type="submit"
            variant="outlined"
            :label="changingPw ? 'Updating…' : 'Update password'"
          />
        </form>
      </section>

      <section class="admin-panel" style="padding: 1.25rem">
        <h2 style="margin: 0 0 1rem; font-size: 1rem">Preferences</h2>
        <div class="admin-form__field">
          <label class="admin-form__label">Theme</label>
          <div class="admin-actions">
            <nui-button
              variant="outlined"
              :label="theme === 'dark' ? 'Dark (active)' : 'Dark'"
              @click="setTheme('dark')"
            />
            <nui-button
              variant="outlined"
              :label="theme === 'light' ? 'Light (active)' : 'Light'"
              @click="setTheme('light')"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setupNui } from 'portable/nui'
import { getSupabaseClient } from '../../../../../shared_modules/nuc_api/supabase/client'

import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'
import { nuiHostValue } from '../../../utils/nui_host'

useHead({ title: 'Settings' })

type Me = {
  id: string
  email: string | null
  display_name: string
  locale: string
}

const me = ref<Me | null>(null)
const loading = ref(true)
const saving = ref(false)
const changingPw = ref(false)
const error = ref('')
const ok = ref('')
const theme = ref<'dark' | 'light'>('dark')

const nameInput = ref<{ value?: unknown } | null>(null)
const localeInput = ref<{ value?: unknown } | null>(null)
const passwordInput = ref<{ value?: unknown } | null>(null)

function applyHostValue(host: { value?: unknown } | null | undefined, value: string) {
  if (host && typeof host === 'object') {
    ;(host as { value: string }).value = value
  }
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    me.value = await adminApiGet<Me>('/api/admin/me')
    await nextTick()
    applyHostValue(nameInput.value, me.value?.display_name || '')
    applyHostValue(localeInput.value, me.value?.locale || 'en')
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
      display_name: nuiHostValue(nameInput.value),
      locale: nuiHostValue(localeInput.value) || 'en',
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
  const password = nuiHostValue(passwordInput.value)
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
    applyHostValue(passwordInput.value, '')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Password update failed'
  } finally {
    changingPw.value = false
  }
}

function setTheme(mode: 'dark' | 'light') {
  theme.value = mode
  setupNui({ palette: 'nuxt', mode })
  try {
    localStorage.setItem('admin-theme', mode)
  } catch {
    /* ignore */
  }
}

onMounted(() => {
  try {
    const stored = localStorage.getItem('admin-theme')
    if (stored === 'light' || stored === 'dark') setTheme(stored)
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
