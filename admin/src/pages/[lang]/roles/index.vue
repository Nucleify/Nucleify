<template>
  <div>
    <AdminPageHeader
      title="Roles"
      description="Assign permissions to roles."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="12rem" />

    <div v-else class="admin-panel admin-panel--flush">
      <table class="admin-table">
        <thead>
          <tr>
            <th>Role</th>
            <th>Permissions</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="role in roles" :key="role.id">
            <td>
              <strong>{{ role.name }}</strong>
              <div
                class="admin-muted"
                style="font-family: var(--admin-mono); font-size: 0.7rem"
              >
                {{ role.slug }}
              </div>
              <div
                v-if="role.description"
                class="admin-muted"
                style="margin-top: 0.25rem"
              >
                {{ role.description }}
              </div>
            </td>
            <td>
              <div
                class="admin-actions"
                style="flex-direction: column; align-items: flex-start"
              >
                <FieldCheckbox
                  v-for="perm in permissions"
                  :key="perm.id"
                  :label="perm.slug"
                  :checked="draft[role.id]?.includes(perm.slug) ?? false"
                  @update:checked="toggle(role.id, perm.slug, $event)"
                />
              </div>
            </td>
            <td>
              <AdminActionBar
                :primary="[
                  {
                    id: 'save',
                    label: 'Save',
                    disabled: savingId === role.id,
                    onClick: () => save(role.id),
                  },
                ]"
                :more="[
                  {
                    id: 'reset',
                    label: 'Reset',
                    onClick: () => resetRole(role.id),
                  },
                  {
                    id: 'export',
                    label: 'Export perms',
                    onClick: () => exportRole(role.id),
                  },
                ]"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <AdminEmpty
        v-if="!roles.length"
        title="No roles found."
        description="Apply migrations + seeders."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Roles' })

type RoleRow = {
  id: string
  slug: string
  name: string
  description: string
  permission_slugs: string[]
}

type PermRow = { id: string; slug: string; name: string }

const toast = useAdminToast()
const roles = ref<RoleRow[]>([])
const permissions = ref<PermRow[]>([])
const draft = ref<Record<string, string[]>>({})
const loading = ref(true)
const savingId = ref<string | null>(null)
const error = ref('')

const primary = computed((): AdminAction[] => [
  {
    id: 'save-all',
    label: 'Save all',
    onClick: async () => {
      for (const role of roles.value) await save(role.id)
      toast.success('All roles saved.')
    },
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
  {
    id: 'export',
    label: 'Export all',
    onClick: () => {
      const blob = new Blob([JSON.stringify(draft.value, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'roles-permissions.json'
      a.click()
      URL.revokeObjectURL(url)
    },
  },
])

function toggle(roleId: string, slug: string, checked: boolean) {
  const current = new Set(draft.value[roleId] ?? [])
  if (checked) current.add(slug)
  else current.delete(slug)
  draft.value = { ...draft.value, [roleId]: [...current] }
}

function resetRole(roleId: string) {
  const role = roles.value.find((r) => r.id === roleId)
  if (!role) return
  draft.value = {
    ...draft.value,
    [roleId]: [...(role.permission_slugs ?? [])],
  }
}

function exportRole(roleId: string) {
  const blob = new Blob(
    [JSON.stringify(draft.value[roleId] ?? [], null, 2)],
    { type: 'application/json' }
  )
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `role-${roleId}.json`
  a.click()
  URL.revokeObjectURL(url)
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const [roleRows, permRows] = await Promise.all([
      adminApiGet<RoleRow[]>('/api/admin/roles'),
      adminApiGet<PermRow[]>('/api/admin/permissions'),
    ])
    roles.value = roleRows ?? []
    permissions.value = permRows ?? []
    const next: Record<string, string[]> = {}
    for (const role of roles.value) {
      next[role.id] = [...(role.permission_slugs ?? [])]
    }
    draft.value = next
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load roles'
  } finally {
    loading.value = false
  }
}

async function save(roleId: string) {
  savingId.value = roleId
  error.value = ''
  try {
    await adminApiSend(`/api/admin/roles/${roleId}/permissions`, 'PUT', {
      permission_slugs: draft.value[roleId] ?? [],
    })
    toast.success('Role saved.')
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
    toast.error(error.value)
  } finally {
    savingId.value = null
  }
}

onMounted(() => {
  void load()
})
</script>
