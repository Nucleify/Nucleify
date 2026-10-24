<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Users</h1>
        <p>Profiles linked to Supabase Auth.</p>
      </div>
      <nui-button variant="filled" label="Create user" @click="showCreate = !showCreate" />
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <div v-if="showCreate" class="admin-panel" style="padding: 1.25rem; margin-bottom: 1rem">
      <form class="admin-form" @submit.prevent="onCreate">
        <div class="admin-form__field">
          <label class="admin-form__label">Email</label>
          <nui-input-text ref="createEmail" type="email" fluid placeholder="user@example.com" />
        </div>
        <div class="admin-form__field">
          <label class="admin-form__label">Password</label>
          <nui-input-text ref="createPassword" type="password" fluid placeholder="min 8 chars" />
        </div>
        <div class="admin-form__field">
          <label class="admin-form__label">Display name</label>
          <nui-input-text ref="createName" type="text" fluid placeholder="Name" />
        </div>
        <nui-button type="submit" variant="filled" :label="creating ? 'Creating…' : 'Create'" />
      </form>
    </div>

    <div class="admin-panel" style="padding: 0.75rem 1rem; margin-bottom: 1rem">
      <form class="admin-actions" @submit.prevent="load">
        <nui-input-text
          ref="searchInput"
          type="search"
          fluid
          placeholder="Search email or name"
          style="flex: 1; min-width: 12rem"
        />
        <nui-button type="submit" variant="outlined" label="Search" />
      </form>
    </div>

    <p v-if="loading" class="admin-muted">Loading…</p>
    <div v-else class="admin-panel">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Status</th>
            <th>Roles</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <NuxtLink :to="`/${lang}/users/${user.id}`">{{ user.email || user.id }}</NuxtLink>
            </td>
            <td>{{ user.display_name || '—' }}</td>
            <td>
              <span
                class="admin-badge"
                :class="user.status === 'active' ? 'admin-badge--ok' : 'admin-badge--warn'"
              >
                {{ user.status }}
              </span>
            </td>
            <td class="admin-muted">{{ (user.role_slugs || []).join(', ') || '—' }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="!users.length" class="admin-empty">No users yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'
import { nuiHostValue } from '../../../utils/nui_host'

useHead({ title: 'Users' })

type UserRow = {
  id: string
  email: string | null
  display_name: string
  status: string
  role_slugs: string[]
}

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

const users = ref<UserRow[]>([])
const loading = ref(true)
const creating = ref(false)
const showCreate = ref(false)
const error = ref('')

const searchInput = ref<{ value?: unknown } | null>(null)
const createEmail = ref<{ value?: unknown } | null>(null)
const createPassword = ref<{ value?: unknown } | null>(null)
const createName = ref<{ value?: unknown } | null>(null)

async function load() {
  loading.value = true
  error.value = ''
  try {
    const search = nuiHostValue(searchInput.value)
    const path = search
      ? `/api/admin/users?search=${encodeURIComponent(search)}`
      : '/api/admin/users'
    users.value = (await adminApiGet<UserRow[]>(path)) ?? []
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load users'
  } finally {
    loading.value = false
  }
}

async function onCreate() {
  creating.value = true
  error.value = ''
  try {
    await adminApiSend('/api/admin/users', 'POST', {
      email: nuiHostValue(createEmail.value),
      password: nuiHostValue(createPassword.value),
      display_name: nuiHostValue(createName.value),
    })
    showCreate.value = false
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Create failed'
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  void load()
})
</script>
