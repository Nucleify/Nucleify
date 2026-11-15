<template>
  <div>
    <div v-if="showToolbar" class="admin-list-toolbar">
      <div v-if="searchable" class="admin-list-toolbar__search">
        <FieldText
          :model-value="search"
          label="Search"
          dense
          :placeholder="searchPlaceholder"
          @update:model-value="onSearch"
        />
      </div>
      <div v-if="statusFilters.length" class="admin-filter-chips">
        <button
          v-for="chip in statusFilters"
          :key="chip.value"
          type="button"
          class="admin-filter-chip"
          :class="{ 'is-active': status === chip.value }"
          @click="setStatus(chip.value)"
        >
          {{ chip.label }}
        </button>
      </div>
      <AdminOverflowMenu
        v-if="screenMore.length"
        class="admin-list-toolbar__options"
        :actions="screenMore"
        label="Screen options"
        icon="options"
      />
      <slot name="toolbar" />
    </div>

    <div v-if="showScreenOptions" class="admin-screen-options">
      <FieldCheckbox
        v-for="col in allColumns"
        :key="col.key"
        :label="col.label"
        :checked="visibleKeys.includes(col.key)"
        @update:checked="toggleColumn(col.key, $event)"
      />
      <label class="admin-form__field" style="min-width: 8rem">
        <span class="admin-form__label">Per page</span>
        <select v-model.number="perPageLocal" class="admin-cmdk__input">
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </label>
    </div>

    <div v-if="selectable && selectedIds.length" class="admin-bulk-bar">
      <span class="admin-muted">{{ selectedIds.length }} selected</span>
      <nui-button
        v-for="action in bulkActions"
        :key="action.id"
        type="button"
        size="small"
        :variant="action.variant || 'outlined'"
        :label="action.label"
        @click="action.onClick"
      />
      <nui-button
        type="button"
        size="small"
        variant="outlined"
        label="Clear"
        @click="selectedIds = []"
      />
    </div>

    <div class="admin-panel admin-panel--flush">
      <table class="admin-table">
        <thead>
          <tr>
            <th v-if="selectable" class="admin-table__check">
              <nui-checkbox
                :key="`all-${allVisibleSelected}-${someVisibleSelected}-${pageRows.length}`"
                size="small"
                :checked.prop="allVisibleSelected"
                :indeterminate.prop="someVisibleSelected && !allVisibleSelected"
                aria-label="Select all"
                @change="onToggleAll"
              />
            </th>
            <th
              v-for="col in visibleColumns"
              :key="col.key"
              @click="col.sortable ? emitSort(col.key) : undefined"
              :style="col.sortable ? 'cursor:pointer' : undefined"
            >
              {{ col.label }}
              <span v-if="sortKey === col.key" class="admin-muted">
                {{ sortDir === 'asc' ? '↑' : '↓' }}
              </span>
            </th>
            <th v-if="hasRowActions" class="admin-table__actions" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in pageRows" :key="rowKey(row)">
            <td v-if="selectable" class="admin-table__check">
              <nui-checkbox
                :key="`row-${rowKey(row)}-${selectedIds.includes(rowKey(row))}`"
                size="small"
                :checked.prop="selectedIds.includes(rowKey(row))"
                :aria-label="`Select ${cell(row, visibleColumns[0]?.key || 'id')}`"
                @change="onToggleOne(rowKey(row), $event)"
              />
            </td>
            <td v-for="col in visibleColumns" :key="col.key">
              <NuxtLink
                v-if="col.link && rowLink(row)"
                :to="rowLink(row)!"
              >
                {{ cell(row, col.key) }}
              </NuxtLink>
              <span
                v-else-if="col.badge"
                class="admin-badge"
                :class="badgeClass(row, col.key)"
              >
                {{ cell(row, col.key) }}
              </span>
              <span v-else :class="{ 'admin-muted': col.muted }">
                {{ cell(row, col.key) }}
              </span>
            </td>
            <td v-if="hasRowActions" class="admin-table__actions">
              <AdminRowActions :actions="rowActionsFor?.(row) ?? []" />
            </td>
          </tr>
        </tbody>
      </table>
      <AdminEmpty
        v-if="!filteredRows.length"
        :title="emptyLabel"
        :description="emptyDescription"
      >
        <slot name="empty" />
      </AdminEmpty>
    </div>

    <div v-if="filteredRows.length > perPageLocal" class="admin-list-footer">
      <span class="admin-muted">
        {{ filteredRows.length }} items · page {{ page }} /
        {{ totalPages }}
      </span>
      <div class="admin-actions">
        <nui-button
          type="button"
          size="small"
          variant="outlined"
          label="Prev"
          :disabled.prop="page <= 1"
          @click="page = Math.max(1, page - 1)"
        />
        <nui-button
          type="button"
          size="small"
          variant="outlined"
          label="Next"
          :disabled.prop="page >= totalPages"
          @click="page = Math.min(totalPages, page + 1)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/actions'

export type CollectionColumn = {
  key: string
  label: string
  link?: boolean
  badge?: boolean
  muted?: boolean
  sortable?: boolean
}

const props = withDefaults(
  defineProps<{
    columns: CollectionColumn[]
    rows: Record<string, unknown>[]
    rowIdKey?: string
    linkForRow?: (row: Record<string, unknown>) => string
    emptyLabel?: string
    emptyDescription?: string
    searchable?: boolean
    searchPlaceholder?: string
    statusFilters?: { label: string; value: string }[]
    selectable?: boolean
    selected?: string[]
    bulkActions?: AdminAction[]
    rowActionsFor?: (row: Record<string, unknown>) => AdminAction[]
    storageKey?: string
    showToolbar?: boolean
    perPage?: number
  }>(),
  {
    rowIdKey: 'id',
    linkForRow: undefined,
    emptyLabel: 'No documents yet.',
    emptyDescription: '',
    searchable: false,
    searchPlaceholder: 'Search…',
    statusFilters: () => [],
    selectable: false,
    selected: undefined,
    bulkActions: () => [],
    rowActionsFor: undefined,
    storageKey: '',
    showToolbar: true,
    perPage: 25,
  }
)

const emit = defineEmits<{
  search: [value: string]
  'update:status': [value: string]
  'update:selected': [ids: string[]]
}>()

const search = ref('')
const status = ref(props.statusFilters[0]?.value ?? 'all')
const selectedIds = ref<string[]>([...(props.selected ?? [])])
const page = ref(1)
const sortKey = ref('')
const sortDir = ref<'asc' | 'desc'>('desc')
const showScreenOptions = ref(false)
const perPageLocal = ref(props.perPage)
const visibleKeys = ref(props.columns.map((c) => c.key))

const allColumns = computed(() => props.columns)
const visibleColumns = computed(() =>
  props.columns.filter((c) => visibleKeys.value.includes(c.key))
)
const hasRowActions = computed(
  () => typeof props.rowActionsFor === 'function'
)

const screenMore = computed((): AdminAction[] => [
  {
    id: 'screen',
    label: showScreenOptions.value ? 'Hide screen options' : 'Screen options',
    onClick: () => {
      showScreenOptions.value = !showScreenOptions.value
    },
  },
  {
    id: 'export',
    label: 'Export JSON (visible)',
    onClick: () => {
      const blob = new Blob([JSON.stringify(pageRows.value, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'export.json'
      a.click()
      URL.revokeObjectURL(url)
    },
  },
])

onMounted(() => {
  if (!props.storageKey || !import.meta.client) return
  try {
    const raw = localStorage.getItem(`admin-list:${props.storageKey}`)
    if (!raw) return
    const parsed = JSON.parse(raw) as {
      visibleKeys?: string[]
      perPage?: number
    }
    if (parsed.visibleKeys?.length) visibleKeys.value = parsed.visibleKeys
    // Prefer explicit page size from the list host over a stale saved value.
    if (parsed.perPage && props.perPage === 25) {
      perPageLocal.value = parsed.perPage
    }
  } catch {
    // ignore
  }
})

watch([visibleKeys, perPageLocal], () => {
  if (!props.storageKey || !import.meta.client) return
  localStorage.setItem(
    `admin-list:${props.storageKey}`,
    JSON.stringify({
      visibleKeys: visibleKeys.value,
      perPage: perPageLocal.value,
    })
  )
})

watch(selectedIds, (ids) => emit('update:selected', ids))

watch(
  () => props.selected,
  (ids) => {
    if (!ids) return
    if (
      ids.length === selectedIds.value.length &&
      ids.every((id, i) => id === selectedIds.value[i])
    ) {
      return
    }
    selectedIds.value = [...ids]
  }
)

function toggleColumn(key: string, checked?: boolean) {
  const next =
    typeof checked === 'boolean' ? checked : !visibleKeys.value.includes(key)
  if (!next) {
    if (visibleKeys.value.length <= 1) return
    visibleKeys.value = visibleKeys.value.filter((k) => k !== key)
    return
  }
  if (!visibleKeys.value.includes(key)) {
    visibleKeys.value = [...visibleKeys.value, key]
  }
}

function checkboxChecked(event: Event): boolean {
  const detail = (event as CustomEvent<{ checked?: boolean }>).detail
  if (detail && typeof detail.checked === 'boolean') return detail.checked
  const host = event.currentTarget as { checked?: boolean } | null
  return Boolean(host?.checked)
}

function rowKey(row: Record<string, unknown>): string {
  const key = props.rowIdKey || 'id'
  return String(row[key] ?? JSON.stringify(row))
}

function rowLink(row: Record<string, unknown>): string {
  return props.linkForRow?.(row) ?? ''
}

function cell(row: Record<string, unknown>, key: string): string {
  const value = row[key]
  if (value == null || value === '') return '—'
  if (Array.isArray(value)) return value.join(', ') || '—'
  return String(value)
}

function badgeClass(row: Record<string, unknown>, key: string): string {
  const value = String(row[key] ?? '').toLowerCase()
  if (value === 'published' || value === 'active' || value === 'approved') {
    return 'admin-badge--ok'
  }
  if (value === 'trash' || value === 'spam') return 'admin-badge--danger'
  if (value === 'scheduled' || value === 'pending') return 'admin-badge--info'
  return 'admin-badge--warn'
}

function clearSelection() {
  if (!selectedIds.value.length) return
  selectedIds.value = []
}

function onSearch(value: string) {
  search.value = value
  page.value = 1
  clearSelection()
  emit('search', value)
}

function setStatus(value: string) {
  if (status.value === value) return
  status.value = value
  page.value = 1
  clearSelection()
  emit('update:status', value)
}

function emitSort(key: string) {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
}

const filteredRows = computed(() => {
  let list = [...props.rows]
  if (status.value && status.value !== 'all') {
    list = list.filter(
      (row) => String(row.status || '').toLowerCase() === status.value
    )
  }
  const q = search.value.trim().toLowerCase()
  if (q) {
    list = list.filter((row) =>
      Object.values(row).some((v) => String(v ?? '').toLowerCase().includes(q))
    )
  }
  if (sortKey.value) {
    const key = sortKey.value
    list.sort((a, b) => {
      const av = String(a[key] ?? '')
      const bv = String(b[key] ?? '')
      return sortDir.value === 'asc'
        ? av.localeCompare(bv)
        : bv.localeCompare(av)
    })
  }
  return list
})

const totalPages = computed(() =>
  Math.max(1, Math.ceil(filteredRows.value.length / perPageLocal.value))
)

const pageRows = computed(() => {
  const start = (page.value - 1) * perPageLocal.value
  return filteredRows.value.slice(start, start + perPageLocal.value)
})

const allVisibleSelected = computed(
  () =>
    pageRows.value.length > 0 &&
    pageRows.value.every((row) => selectedIds.value.includes(rowKey(row)))
)

const someVisibleSelected = computed(() =>
  pageRows.value.some((row) => selectedIds.value.includes(rowKey(row)))
)

function onToggleOne(id: string, event: Event) {
  const checked = checkboxChecked(event)
  if (checked) {
    if (!selectedIds.value.includes(id)) {
      selectedIds.value = [...selectedIds.value, id]
    }
    return
  }
  selectedIds.value = selectedIds.value.filter((x) => x !== id)
}

function onToggleAll(event: Event) {
  const checked = checkboxChecked(event)
  const pageIds = pageRows.value.map((r) => rowKey(r))
  if (!checked) {
    const drop = new Set(pageIds)
    selectedIds.value = selectedIds.value.filter((id) => !drop.has(id))
    return
  }
  const merged = new Set(selectedIds.value)
  for (const id of pageIds) merged.add(id)
  selectedIds.value = [...merged]
}

watch(
  () => props.rows,
  (rows) => {
    page.value = 1
    if (!selectedIds.value.length) return
    const alive = new Set(rows.map((row) => rowKey(row)))
    const next = selectedIds.value.filter((id) => alive.has(id))
    if (next.length !== selectedIds.value.length) selectedIds.value = next
  }
)

watch(filteredRows, (rows) => {
  if (!selectedIds.value.length) return
  const alive = new Set(rows.map((row) => rowKey(row)))
  const next = selectedIds.value.filter((id) => alive.has(id))
  if (next.length !== selectedIds.value.length) selectedIds.value = next
})
</script>
