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
          <FieldText ref="nameInput" label="Display name" />
          <FieldText ref="localeInput" label="Locale" placeholder="en" />
          <nui-button type="submit" variant="filled" :label="saving ? 'Saving…' : 'Save profile'" />
        </form>
      </section>

      <section class="admin-panel" style="padding: 1.25rem">
        <h2 style="margin: 0 0 1rem; font-size: 1rem">Security</h2>
        <form class="admin-form" @submit.prevent="onChangePassword">
          <FieldText
            ref="passwordInput"
            label="New password"
            type="password"
            autocomplete="new-password"
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
          v-model="theme"
          label="Theme"
          :options="themeOptions"
          @update:model-value="setTheme"
        />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setupNui } from 'portable/nui'
import { getSupabaseClient } from '../../../../../shared_modules/nuc_api/supabase/client'

import FieldSelect from '../../../components/fields/FieldSelect.vue'
import FieldShell from '../../../components/fields/FieldShell.vue'
import FieldText from '../../../components/fields/FieldText.vue'
import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'

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

const nameInput = ref<FieldHost | null>(null)
const localeInput = ref<FieldHost | null>(null)
const passwordInput = ref<FieldHost | null>(null)

const themeOptions = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
]

async function load() {
  loading.value = true
  error.value = ''
  try {
    me.value = await adminApiGet<Me>('/api/admin/me')
    await nextTick()
    if (nameInput.value) nameInput.value.value = me.value?.display_name || ''
    if (localeInput.value) localeInput.value.value = me.value?.locale || 'en'
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
      display_name: nameInput.value?.value ?? '',
      locale: localeInput.value?.value || 'en',
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
  const password = passwordInput.value?.value ?? ''
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
    if (passwordInput.value) passwordInput.value.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Password update failed'
  } finally {
    changingPw.value = false
  }
}

function setTheme(mode: string) {
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
