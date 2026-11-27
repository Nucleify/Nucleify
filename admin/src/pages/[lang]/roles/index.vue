<template>
  <div>
    <AdminPageHeader
      title="Roles"
      description="Select a role, then edit its permission matrix."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <AdminSkeleton v-if="loading" height="16rem" />

    <div v-else-if="roles.length" class="roles-layout">
      <aside class="admin-panel admin-panel--flush roles-nav" aria-label="Roles">
        <button
          v-for="role in roles"
          :key="role.id"
          type="button"
          class="roles-nav__item"
          :class="{
            'is-active': role.id === selectedId,
            'is-dirty': isDirty(role.id),
          }"
          @click="selectRole(role.id)"
        >
          <span class="roles-nav__name">
            {{ role.name }}
            <span
              v-if="isDirty(role.id)"
              class="admin-badge admin-badge--warn"
            >
              Unsaved
            </span>
          </span>
          <span class="admin-muted roles-nav__slug">{{ role.slug }}</span>
        </button>
      </aside>

      <section v-if="selected" class="roles-detail">
        <div class="admin-panel">
          <div class="roles-meta">
            <FieldText
              label="Identifier"
              :model-value="selected.slug"
              disabled
              dense
            />
            <FieldText
              label="Label"
              :model-value="selected.name"
              disabled
              dense
            />
            <FieldText
              label="Description"
              :model-value="selected.description || '—'"
              disabled
              dense
            />
          </div>
          <p v-if="isLocked(selected)" class="admin-muted roles-lock-note">
            Owner always has full access. Its matrix cannot be changed.
          </p>
        </div>

        <div class="admin-panel admin-panel--flush roles-matrix-wrap">
          <table class="admin-table roles-matrix">
            <thead>
              <tr>
                <th class="roles-matrix__resource">
                  <div class="roles-matrix__resource-head">
                    <nui-checkbox
                      :key="`all-${selected.id}-${allState.key}`"
                      size="small"
                      :checked.prop="allState.checked"
                      :indeterminate.prop="allState.indeterminate"
                      :disabled.prop="matrixDisabled"
                      aria-label="Select all permissions"
                      @change="onToggleSlugs(allSlugs, $event)"
                    />
                    <span>Resource</span>
                  </div>
                </th>
                <th
                  v-for="action in actionColumns"
                  :key="action"
                  class="roles-matrix__action"
                >
                  <div class="roles-matrix__action-head">
                    <nui-checkbox
                      :key="`col-${selected.id}-${action}-${columnState(action).key}`"
                      size="small"
                      :checked.prop="columnState(action).checked"
                      :indeterminate.prop="columnState(action).indeterminate"
                      :disabled.prop="
                        matrixDisabled || !columnSlugs(action).length
                      "
                      :aria-label="`Select all ${action}`"
                      @change="onToggleSlugs(columnSlugs(action), $event)"
                    />
                    <span>{{ action }}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in matrixRows" :key="row.resource">
                <td class="roles-matrix__resource">
                  <div class="roles-matrix__resource-head">
                    <nui-checkbox
                      :key="`row-${selected.id}-${row.resource}-${rowState(row).key}`"
                      size="small"
                      :checked.prop="rowState(row).checked"
                      :indeterminate.prop="rowState(row).indeterminate"
                      :disabled.prop="
                        matrixDisabled || !rowSlugs(row).length
                      "
                      :aria-label="`Select all ${row.label}`"
                      @change="onToggleSlugs(rowSlugs(row), $event)"
                    />
                    <div>
                      <div class="roles-matrix__resource-label">
                        {{ row.label }}
                      </div>
                      <div class="admin-muted roles-matrix__slug">
                        {{ row.resource }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  v-for="action in actionColumns"
                  :key="`${row.resource}.${action}`"
                  class="roles-matrix__cell admin-table__check"
                >
                  <nui-checkbox
                    :key="`${selected.id}-${cellSlug(row, action)}-${hasPerm(selected.id, cellSlug(row, action))}`"
                    size="small"
                    :checked.prop="hasPerm(selected.id, cellSlug(row, action))"
                    :disabled.prop="matrixDisabled"
                    :aria-label="`${selected.name}: ${cellSlug(row, action)}`"
                    @change="
                      onToggle(selected.id, cellSlug(row, action), $event)
                    "
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="admin-actions roles-detail__footer">
          <nui-button
            variant="filled"
            :label="saving ? 'Saving…' : 'Save'"
            :disabled.prop="
              saving || isLocked(selected) || !isDirty(selected.id)
            "
            @click="saveSelected"
          />
          <nui-button
            v-if="isDirty(selected.id) && !isLocked(selected)"
            variant="outline"
            label="Discard"
            :disabled.prop="saving"
            @click="resetRole(selected.id)"
          />
          <span class="admin-muted roles-detail__count">
            {{ draftCount(selected.id) }} / {{ allSlugs.length }} permissions
          </span>
        </div>
      </section>
    </div>

    <AdminEmpty
      v-else-if="!loading"
      title="No roles found."
      description="Apply migrations + seeders."
    />
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

type MatrixRow = {
  resource: string
  label: string
  actions: Record<string, string>
}

const ACTION_ORDER = [
  'read',
  'write',
  'publish',
  'edit',
  'moderate',
  'delete',
] as const

const toast = useAdminToast()
const roles = ref<RoleRow[]>([])
const permissions = ref<PermRow[]>([])
const draft = ref<Record<string, string[]>>({})
const baseline = ref<Record<string, string[]>>({})
const selectedId = ref<string | null>(null)
const loading = ref(true)
const saving = ref(false)
const error = ref('')

const selected = computed(
  () => roles.value.find((role) => role.id === selectedId.value) ?? null
)

const matrixDisabled = computed(
  () =>
    saving.value ||
    !selected.value ||
    isLocked(selected.value)
)

const dirtyRoleIds = computed(() =>
  roles.value
    .filter((role) => !sameSlugs(draft.value[role.id], baseline.value[role.id]))
    .map((role) => role.id)
)

const actionColumns = computed(() => {
  const found = new Set<string>()
  for (const perm of permissions.value) {
    const action = actionOf(perm.slug)
    if (action) found.add(action)
  }
  return [...found].sort((a, b) => {
    const ai = ACTION_ORDER.indexOf(a as (typeof ACTION_ORDER)[number])
    const bi = ACTION_ORDER.indexOf(b as (typeof ACTION_ORDER)[number])
    const aRank = ai === -1 ? ACTION_ORDER.length : ai
    const bRank = bi === -1 ? ACTION_ORDER.length : bi
    if (aRank !== bRank) return aRank - bRank
    return a.localeCompare(b)
  })
})

const matrixRows = computed((): MatrixRow[] => {
  const byResource = new Map<string, Record<string, string>>()
  for (const perm of permissions.value) {
    const resource = resourceOf(perm.slug)
    const action = actionOf(perm.slug)
    if (!resource || !action) continue
    const actions = byResource.get(resource) ?? {}
    actions[action] = perm.slug
    byResource.set(resource, actions)
  }
  return [...byResource.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([resource, known]) => {
      const actions: Record<string, string> = {}
      for (const action of actionColumns.value) {
        actions[action] = known[action] ?? `${resource}.${action}`
      }
      return {
        resource,
        label: labelResource(resource),
        actions,
      }
    })
})

const allSlugs = computed(() =>
  matrixRows.value.flatMap((row) => rowSlugs(row))
)

const allState = computed(() =>
  selectionState(selected.value?.id, allSlugs.value)
)

const primary = computed((): AdminAction[] => {
  const role = selected.value
  return [
    {
      id: 'save',
      label: 'Save',
      disabled:
        saving.value ||
        !role ||
        isLocked(role) ||
        !isDirty(role.id),
      onClick: () => saveSelected(),
    },
  ]
})

const more = computed((): AdminAction[] => [
  {
    id: 'reset',
    label: 'Discard changes',
    disabled:
      !selected.value ||
      isLocked(selected.value) ||
      !isDirty(selected.value.id) ||
      saving.value,
    onClick: () => {
      if (selected.value) resetRole(selected.value.id)
    },
  },
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

function resourceOf(slug: string) {
  const i = slug.lastIndexOf('.')
  return i === -1 ? slug : slug.slice(0, i)
}

function actionOf(slug: string) {
  const i = slug.lastIndexOf('.')
  return i === -1 ? '' : slug.slice(i + 1)
}

function labelResource(resource: string) {
  return resource
    .split('.')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' · ')
}

function sameSlugs(a: string[] | undefined, b: string[] | undefined) {
  const left = [...(a ?? [])].sort()
  const right = [...(b ?? [])].sort()
  if (left.length !== right.length) return false
  return left.every((slug, i) => slug === right[i])
}

function isDirty(roleId: string) {
  return dirtyRoleIds.value.includes(roleId)
}

function isLocked(role: RoleRow) {
  return role.slug === 'owner'
}

function hasPerm(roleId: string, slug: string) {
  return draft.value[roleId]?.includes(slug) ?? false
}

function draftCount(roleId: string) {
  return draft.value[roleId]?.length ?? 0
}

function cellSlug(row: MatrixRow, action: string) {
  return row.actions[action] ?? `${row.resource}.${action}`
}

function rowSlugs(row: MatrixRow) {
  return actionColumns.value.map((action) => cellSlug(row, action))
}

function columnSlugs(action: string) {
  return matrixRows.value.map((row) => cellSlug(row, action))
}

function selectionState(roleId: string | undefined, slugs: string[]) {
  if (!roleId || !slugs.length) {
    return { checked: false, indeterminate: false, key: 'empty' }
  }
  const on = slugs.filter((slug) => hasPerm(roleId, slug)).length
  const checked = on === slugs.length
  const indeterminate = on > 0 && on < slugs.length
  return { checked, indeterminate, key: `${on}/${slugs.length}` }
}

function rowState(row: MatrixRow) {
  return selectionState(selected.value?.id, rowSlugs(row))
}

function columnState(action: string) {
  return selectionState(selected.value?.id, columnSlugs(action))
}

function selectRole(roleId: string) {
  selectedId.value = roleId
}

function toggle(roleId: string, slug: string, checked: boolean) {
  const role = roles.value.find((r) => r.id === roleId)
  if (!role || isLocked(role)) return
  const current = new Set(draft.value[roleId] ?? [])
  if (checked) current.add(slug)
  else current.delete(slug)
  draft.value = { ...draft.value, [roleId]: [...current] }
}

function toggleSlugs(roleId: string, slugs: string[], checked: boolean) {
  const role = roles.value.find((r) => r.id === roleId)
  if (!role || isLocked(role) || !slugs.length) return
  const current = new Set(draft.value[roleId] ?? [])
  for (const slug of slugs) {
    if (checked) current.add(slug)
    else current.delete(slug)
  }
  draft.value = { ...draft.value, [roleId]: [...current] }
}

function checkedFromEvent(event: Event) {
  const detail = (event as CustomEvent<{ checked?: boolean }>).detail
  if (detail && typeof detail.checked === 'boolean') return detail.checked
  const host = event.currentTarget as { checked?: boolean } | null
  return Boolean(host?.checked)
}

function onToggle(roleId: string, slug: string, event: Event) {
  toggle(roleId, slug, checkedFromEvent(event))
}

function onToggleSlugs(slugs: string[], event: Event) {
  const role = selected.value
  if (!role) return
  toggleSlugs(role.id, slugs, checkedFromEvent(event))
}

function resetRole(roleId: string) {
  draft.value = {
    ...draft.value,
    [roleId]: [...(baseline.value[roleId] ?? [])],
  }
}

async function load(opts?: { quiet?: boolean }) {
  if (!opts?.quiet) loading.value = true
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
    baseline.value = Object.fromEntries(
      Object.entries(next).map(([id, slugs]) => [id, [...slugs]])
    )
    if (
      !selectedId.value ||
      !roles.value.some((role) => role.id === selectedId.value)
    ) {
      selectedId.value = roles.value[0]?.id ?? null
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load roles'
  } finally {
    loading.value = false
  }
}

async function saveSelected() {
  const role = selected.value
  if (!role || isLocked(role) || !isDirty(role.id)) return
  saving.value = true
  error.value = ''
  try {
    await adminApiSend(`/api/admin/roles/${role.id}/permissions`, 'PUT', {
      permission_slugs: draft.value[role.id] ?? [],
    })
    toast.success('Role saved.')
    await load({ quiet: true })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
    toast.error(error.value)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  void load()
})
</script>

<style scoped lang="scss">
.roles-layout {
  display: grid;
  grid-template-columns: minmax(12rem, 16rem) minmax(0, 1fr);
  gap: 1rem;
  align-items: start;
}

.roles-nav {
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow: hidden;
}

.roles-nav__item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  width: 100%;
  padding: 0.75rem 0.85rem;
  border: 0;
  border-bottom: 1px solid var(--admin-border);
  background: transparent;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.roles-nav__item:last-child {
  border-bottom: 0;
}

.roles-nav__item:hover {
  background: color-mix(in srgb, var(--admin-text) 4%, transparent);
}

.roles-nav__item.is-active {
  background: color-mix(in srgb, var(--admin-text) 8%, transparent);
}

.roles-nav__item.is-dirty:not(.is-active) {
  box-shadow: inset 2px 0 0 color-mix(in srgb, #eab308 70%, transparent);
}

.roles-nav__name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  font-size: 0.875rem;
}

.roles-nav__slug {
  font-family: var(--admin-mono);
  font-size: 0.65rem;
}

.roles-detail {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
}

.roles-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem 1rem;
}

.roles-meta :deep(.admin-form__field) {
  max-width: none;
}

.roles-lock-note {
  margin: 0.85rem 0 0;
  font-size: 0.75rem;
}

.roles-matrix-wrap {
  overflow-x: auto;
}

.roles-matrix__resource {
  min-width: 11rem;
}

.roles-matrix__resource-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.roles-matrix__resource-label {
  font-weight: 500;
}

.roles-matrix__slug {
  font-family: var(--admin-mono);
  font-size: 0.65rem;
  margin-top: 0.1rem;
}

.roles-matrix__action {
  text-align: center;
  width: 5.5rem;
  vertical-align: bottom;
}

.roles-matrix__action-head {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.roles-matrix__cell {
  text-align: center;
}

.roles-detail__footer {
  align-items: center;
}

.roles-detail__count {
  font-family: var(--admin-mono);
  font-size: 0.65rem;
  margin-left: auto;
}

@media (max-width: 900px) {
  .roles-layout {
    grid-template-columns: 1fr;
  }

  .roles-meta {
    grid-template-columns: 1fr;
  }

  .roles-nav {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(9rem, 1fr));
  }

  .roles-nav__item {
    border-bottom: 0;
    border-right: 1px solid var(--admin-border);
  }
}
</style>
