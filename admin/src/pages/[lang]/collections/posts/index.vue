<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Posts</h1>
        <p>Blog posts with rich body blocks.</p>
      </div>
      <div class="admin-actions">
        <nui-button
          v-if="selected.length"
          variant="outlined"
          label="Bulk publish"
          @click="bulk('publish')"
        />
        <nui-button
          v-if="selected.length"
          variant="outlined"
          label="Bulk trash"
          @click="bulk('trash')"
        />
        <nui-button
          variant="filled"
          label="Create post"
          @click="navigateTo(`/${lang}/collections/posts/new`)"
        />
      </div>
    </div>

    <FieldText
      :model-value="query"
      label="Search"
      placeholder="Title or slug"
      @update:model-value="onSearch"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      :link-for-row="linkForRow"
      empty-label="No posts yet."
    />
    <div v-if="rows.length" class="admin-actions" style="margin-top: 1rem">
      <label
        v-for="row in rows"
        :key="String(row.id)"
        class="admin-muted"
        style="display: flex; gap: 0.35rem; align-items: center"
      >
        <input
          type="checkbox"
          :checked="selected.includes(String(row.id))"
          @change="toggle(String(row.id))"
        />
        {{ row.title }}
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CollectionList } from '@admin'
import { FieldText } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Posts' })

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')
const query = ref('')
const selected = ref<string[]>([])

const columns = [
  { key: 'title', label: 'Title', link: true },
  { key: 'slug', label: 'Slug', muted: true },
  { key: 'locale', label: 'Locale', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'updated_at', label: 'Updated', muted: true },
]

function linkForRow(row: Record<string, unknown>): string {
  return `/${lang.value}/collections/posts/${row.id}`
}

function toggle(id: string) {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((x) => x !== id)
  } else {
    selected.value = [...selected.value, id]
  }
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    if (query.value.trim()) {
      const data =
        (await adminApiGet<Record<string, unknown>[]>(
          `/api/admin/search?q=${encodeURIComponent(query.value.trim())}`
        )) ?? []
      rows.value = data
        .filter((row) => row.collection_slug === 'posts')
        .map((row) => ({
          ...row,
          updated_at: row.updated_at
            ? new Date(String(row.updated_at)).toLocaleString()
            : '—',
        }))
    } else {
      const data =
        (await adminApiGet<Record<string, unknown>[]>(
          '/api/admin/collections/posts'
        )) ?? []
      rows.value = data.map((row) => ({
        ...row,
        updated_at: row.updated_at
          ? new Date(String(row.updated_at)).toLocaleString()
          : '—',
      }))
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load posts'
  } finally {
    loading.value = false
  }
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
function onSearch(value: string) {
  query.value = value
  if (searchTimer) clearTimeout(searchTimer)
  searchTimer = setTimeout(() => void load(), 300)
}

async function bulk(action: 'publish' | 'trash') {
  if (!selected.value.length) return
  await adminApiSend('/api/admin/collections/posts/bulk', 'POST', {
    ids: selected.value,
    action,
  })
  selected.value = []
  await load()
}

onMounted(() => {
  void load()
})
</script>
