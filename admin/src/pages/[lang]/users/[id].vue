<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>{{ user?.email || 'User' }}</h1>
        <p class="admin-muted" style="font-family: var(--admin-mono); font-size: 0.75rem">
          {{ id }}
        </p>
      </div>
      <NuxtLink :to="`/${lang}/users`" class="admin-muted">← Users</NuxtLink>
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <form v-else-if="user" class="admin-form" style="max-width: 32rem" @submit.prevent="onSave">
      <div class="admin-form__field">
        <label class="admin-form__label">Display name</label>
        <nui-input-text
          ref="nameInput"
          type="text"
          fluid
          :value.prop="user.display_name"
        />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">Email (display)</label>
        <nui-input-text
          ref="emailInput"
          type="email"
          fluid
          :value.prop="user.email || ''"
        />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">Locale</label>
        <nui-input-text
          ref="localeInput"
          type="text"
          fluid
          :value.prop="user.locale || 'en'"
        />
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">Status</label>
        <select v-model="status" class="admin-status-select">
          <option value="active">active</option>
          <option value="disabled">disabled</option>
        </select>
      </div>
      <div class="admin-form__field">
        <label class="admin-form__label">Roles</label>
        <label
          v-for="role in availableRoles"
          :key="role.id"
          style="display: flex; gap: 0.4rem; align-items: center; font-size: 0.875rem"
        >
          <input
            type="checkbox"
            :checked="selectedRoles.includes(role.slug)"
            @change="toggleRole(role.slug, ($event.target as HTMLInputElement).checked)"
          />
          <span>{{ role.name }} ({{ role.slug }})</span>
        </label>
      </div>
      <nui-button type="submit" variant="filled" :label="saving ? 'Saving…' : 'Save'" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'
import { nuiHostValue } from '../../../utils/nui_host'

useHead({ title: 'User' })

type RoleOpt = { id: string; slug: string; name: string }
type UserDetail = {
  id: string
  email: string | null
  display_name: string
  locale: string
  status: string
  role_slugs: string[]
  available_roles: RoleOpt[]
}

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const id = computed(() => String(route.params.id || ''))

const user = ref<UserDetail | null>(null)
const availableRoles = ref<RoleOpt[]>([])
const selectedRoles = ref<string[]>([])
const status = ref('active')
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const nameInput = ref<{ value?: unknown } | null>(null)
const emailInput = ref<{ value?: unknown } | null>(null)
const localeInput = ref<{ value?: unknown } | null>(null)

function toggleRole(slug: string, checked: boolean) {
  const set = new Set(selectedRoles.value)
  if (checked) set.add(slug)
  else set.delete(slug)
  selectedRoles.value = [...set]
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = await adminApiGet<UserDetail>(`/api/admin/users/${id.value}`)
    user.value = data
    availableRoles.value = data.available_roles ?? []
    selectedRoles.value = [...(data.role_slugs ?? [])]
    status.value = data.status || 'active'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load user'
  } finally {
    loading.value = false
  }
}

async function onSave() {
  saving.value = true
  error.value = ''
  try {
    await adminApiSend(`/api/admin/users/${id.value}`, 'PATCH', {
      display_name: nuiHostValue(nameInput.value) || user.value?.display_name,
      email: nuiHostValue(emailInput.value) || user.value?.email,
      locale: nuiHostValue(localeInput.value) || user.value?.locale || 'en',
      status: status.value,
      role_slugs: selectedRoles.value,
    })
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

<style scoped>
.admin-status-select {
  appearance: none;
  padding: 0.55rem 0.75rem;
  border-radius: 0.35rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface-2);
  color: var(--admin-text);
  font: inherit;
}
</style>
