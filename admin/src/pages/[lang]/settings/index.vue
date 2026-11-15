<template>
  <div>
    <AdminPageHeader
      title="Settings"
      description="Your profile, password, and theme preference."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="12rem" />

    <div v-else class="admin-settings-grid">
      <AdminPanel title="Profile">
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
        </form>
      </AdminPanel>

      <AdminPanel title="Security">
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
      </AdminPanel>

      <AdminPanel title="Preferences">
        <FieldSelect
          :model-value="theme"
          label="Theme"
          :options="themeOptions"
          @update:model-value="applyTheme"
        />
        <FieldSelect
          :model-value="density"
          label="Density"
          :options="densityOptions"
          @update:model-value="applyDensity"
        />
      </AdminPanel>
    </div>
  </div>
</template>

<script setup lang="ts">
import { setupNui } from '@portable'
import { getSupabaseClient } from '@shared_modules'

import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Settings' })

type Me = {
  id: string
  email: string | null
  display_name: string
  locale: string
}

const toast = useAdminToast()
const me = ref<Me | null>(null)
const loading = ref(true)
const saving = ref(false)
const changingPw = ref(false)
const error = ref('')
const theme = ref<'dark' | 'light'>('dark')
const density = ref('compact')

const displayName = ref('')
const locale = ref('en')
const newPassword = ref('')

const themeOptions = [
  { label: 'Dark', value: 'dark' },
  { label: 'Light', value: 'light' },
]

const densityOptions = [
  { label: 'Compact', value: 'compact' },
  { label: 'Comfortable', value: 'comfortable' },
]

const primary = computed((): AdminAction[] => [
  {
    id: 'save',
    label: saving.value ? 'Saving…' : 'Save profile',
    disabled: saving.value,
    onClick: () => onSaveProfile(),
  },
])

const more = computed((): AdminAction[] => [
  {
    id: 'reset',
    label: 'Reset form',
    onClick: () => {
      displayName.value = me.value?.display_name || ''
      locale.value = me.value?.locale || 'en'
      toast.info('Form reset.')
    },
  },
  {
    id: 'session',
    label: 'Session info',
    onClick: () => {
      toast.info(me.value?.email || 'Signed in')
    },
  },
  {
    id: 'density',
    label: 'Toggle density',
    onClick: () =>
      applyDensity(density.value === 'compact' ? 'comfortable' : 'compact'),
  },
])

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
  try {
    me.value = await adminApiSend<Me>('/api/admin/me', 'PATCH', {
      display_name: displayName.value,
      locale: locale.value || 'en',
    })
    toast.success('Profile saved.')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
    toast.error(error.value)
  } finally {
    saving.value = false
  }
}

async function onChangePassword() {
  changingPw.value = true
  error.value = ''
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
    toast.success('Password updated.')
    newPassword.value = ''
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Password update failed'
    toast.error(error.value)
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

function applyDensity(mode: string) {
  density.value = mode === 'comfortable' ? 'comfortable' : 'compact'
  document.documentElement.dataset.adminDensity = density.value
  try {
    localStorage.setItem('admin-density', density.value)
  } catch {
    /* ignore */
  }
  toast.info(`Density: ${density.value}`)
}

onMounted(() => {
  try {
    const stored = localStorage.getItem('admin-theme')
    if (stored === 'light' || stored === 'dark') applyTheme(stored)
    const dens = localStorage.getItem('admin-density')
    if (dens === 'compact' || dens === 'comfortable') applyDensity(dens)
  } catch {
    /* ignore */
  }
  void load()
})
</script>
