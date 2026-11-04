<template>
  <div class="admin-panel">
    <table class="admin-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="col.key">{{ col.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="rowKey(row)">
          <td v-for="col in columns" :key="col.key">
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
        </tr>
      </tbody>
    </table>
    <div v-if="!rows.length" class="admin-empty">{{ emptyLabel }}</div>
  </div>
</template>

<script setup lang="ts">
export type CollectionColumn = {
  key: string
  label: string
  link?: boolean
  badge?: boolean
  muted?: boolean
}

const props = withDefaults(
  defineProps<{
    columns: CollectionColumn[]
    rows: Record<string, unknown>[]
    rowIdKey?: string
    linkForRow?: (row: Record<string, unknown>) => string
    emptyLabel?: string
  }>(),
  {
    rowIdKey: 'id',
    linkForRow: undefined,
    emptyLabel: 'No documents yet.',
  }
)

function rowKey(row: Record<string, unknown>): string {
  return String(row[props.rowIdKey] ?? JSON.stringify(row))
}

function rowLink(row: Record<string, unknown>): string | null {
  return props.linkForRow?.(row) ?? null
}

function cell(row: Record<string, unknown>, key: string): string {
  const value = row[key]
  if (value == null || value === '') return '—'
  if (Array.isArray(value)) return value.join(', ') || '—'
  return String(value)
}

function badgeClass(row: Record<string, unknown>, key: string): string {
  const value = String(row[key] ?? '')
  if (value === 'published' || value === 'active') return 'admin-badge--ok'
  return 'admin-badge--warn'
}
</script>
