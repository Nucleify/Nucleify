<template>
  <div>
    <AdminPageHeader
      title="Users"
      description="Profiles linked to Supabase Auth."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <nui-dialog
      v-if="showCreate"
      visible
      header="Invite / create user"
      dismissable-mask
      @hide="showCreate = false"
    >
      <form id="admin-user-create" class="admin-form" @submit.prevent="onCreate">
        <FieldText
          label="Email"
          type="email"
          placeholder="user@example.com"
          :model-value="newEmail"
          @update:model-value="newEmail = $event"
        />
        <FieldText
          label="Password"
          type="password"
          placeholder="min 8 chars"
          :model-value="newPassword"
          @update:model-value="newPassword = $event"
        />
        <FieldText
          label="Display name"
          placeholder="Name"
          :model-value="newName"
          @update:model-value="newName = $event"
        />
      </form>
      <div slot="footer" class="admin-actions">
        <nui-button
          type="button"
          variant="outlined"
          label="Cancel"
          @click="showCreate = false"
        />
        <nui-button
          type="submit"
          form="admin-user-create"
          variant="filled"
          :label="creating ? 'Creating…' : 'Create'"
          :disabled="creating"
        />
      </div>
    </nui-dialog>

    <AdminSkeleton v-if="loading" height="10rem" />
    <CollectionList
      v-else
      :columns="columns"
      :rows="listRows"
      :link-for-row="linkForRow"
      :row-actions-for="rowActions"
      searchable
      :per-page="10"
      storage-key="users"
      empty-label="No users yet."
      @search="onSearch"
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Users' })

type UserRow = {
  id: string
  email: string | null
  display_name: string
  status: string
  role_slugs: string[]
}

const route = useRoute()
const toast = useAdminToast()
const lang = computed(() => String(route.params.lang || 'en'))

const users = ref<UserRow[]>([])
const loading = ref(true)
const creating = ref(false)
const showCreate = ref(false)
const error = ref('')
const searchTerm = ref('')
const newEmail = ref('')
const newPassword = ref('')
const newName = ref('')

const columns = [
  { key: 'email', label: 'Email', link: true },
  { key: 'display_name', label: 'Name' },
  { key: 'status', label: 'Status', badge: true },
  { key: 'roles', label: 'Roles', muted: true },
]

const listRows = computed(() =>
  users.value.map((user) => ({
    ...user,
    email: user.email || user.id,
    roles: (user.role_slugs || []).join(', ') || '—',
  }))
)

const primary = computed((): AdminAction[] => [
  {
    id: 'create',
    label: 'Invite user',
    onClick: () => {
      showCreate.value = true
    },
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
  {
    id: 'export',
    label: 'Export JSON',
    onClick: () => {
      const blob = new Blob([JSON.stringify(users.value, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'users.json'
      a.click()
      URL.revokeObjectURL(url)
    },
  },
])

function linkForRow(row: Record<string, unknown>): string {
  return `/${lang.value}/collections/users/${row.id}`
}

function rowActions(row: Record<string, unknown>): AdminAction[] {
  return [
    {
      id: 'edit',
      label: 'Edit',
      onClick: () =>
        navigateTo(`/${lang.value}/collections/users/${row.id}`),
    },
  ]
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearch(value: string) {
  searchTerm.value = value
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => void load(), 300)
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const search = searchTerm.value
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
      email: newEmail.value,
      password: newPassword.value,
      display_name: newName.value,
    })
    showCreate.value = false
    newEmail.value = ''
    newPassword.value = ''
    newName.value = ''
    toast.success('User created.')
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Create failed'
    toast.error(error.value)
  } finally {
    creating.value = false
  }
}

onMounted(() => {
  void load()
})
</script>
