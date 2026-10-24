<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Roles</h1>
        <p>Assign permissions to roles. Writes require <code>roles.write</code>.</p>
      </div>
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <div v-else class="admin-panel">
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
              <div class="admin-muted" style="font-family: var(--admin-mono); font-size: 0.7rem">
                {{ role.slug }}
              </div>
              <div v-if="role.description" class="admin-muted" style="margin-top: 0.25rem">
                {{ role.description }}
              </div>
            </td>
            <td>
              <div class="admin-actions" style="flex-direction: column; align-items: flex-start">
                <label
                  v-for="perm in permissions"
                  :key="perm.id"
                  style="display: flex; gap: 0.4rem; align-items: center; font-size: 0.8125rem"
                >
                  <input
                    type="checkbox"
                    :checked="draft[role.id]?.includes(perm.slug)"
                    @change="toggle(role.id, perm.slug, ($event.target as HTMLInputElement).checked)"
                  />
                  <span>{{ perm.slug }}</span>
                </label>
              </div>
            </td>
            <td>
              <nui-button
                variant="filled"
                label="Save"
                :disabled="savingId === role.id"
                @click="save(role.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!roles.length" class="admin-empty">No roles found. Apply migrations + seeders.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adminApiGet, adminApiSend } from '../../../composables/use_admin_api'

useHead({ title: 'Roles' })

type RoleRow = {
  id: string
  slug: string
  name: string
  description: string
  permission_slugs: string[]
}

type PermRow = { id: string; slug: string; name: string }

const roles = ref<RoleRow[]>([])
const permissions = ref<PermRow[]>([])
const draft = ref<Record<string, string[]>>({})
const loading = ref(true)
const error = ref('')
const savingId = ref<string | null>(null)

function toggle(roleId: string, slug: string, checked: boolean) {
  const current = new Set(draft.value[roleId] ?? [])
  if (checked) current.add(slug)
  else current.delete(slug)
  draft.value = { ...draft.value, [roleId]: [...current] }
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
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
  } finally {
    savingId.value = null
  }
}

onMounted(() => {
  void load()
})
</script>
