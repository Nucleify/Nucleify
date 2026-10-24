<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Pages</h1>
        <p>JSON page documents with ordered sections.</p>
      </div>
      <nui-button
        variant="filled"
        label="Create page"
        @click="navigateTo(`/${lang}/collections/pages/new`)"
      />
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      :link-for-row="linkForRow"
      empty-label="No pages yet."
    />
  </div>
</template>

<script setup lang="ts">
import CollectionList from '../../../../components/collection/CollectionList.vue'
import { adminApiGet } from '../../../../composables/use_admin_api'

useHead({ title: 'Pages' })

type PageRow = {
  id: string
  slug: string
  locale: string
  title: string
  status: string
  updated_at?: string
}

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')

const columns = [
  { key: 'title', label: 'Title', link: true },
  { key: 'slug', label: 'Slug', muted: true },
  { key: 'locale', label: 'Locale', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'updated_at', label: 'Updated', muted: true },
]

function linkForRow(row: Record<string, unknown>): string {
  return `/${lang.value}/collections/pages/${row.id}`
}

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data = (await adminApiGet<PageRow[]>('/api/admin/collections/pages')) ?? []
    rows.value = data.map((row) => ({
      ...row,
      updated_at: row.updated_at
        ? new Date(row.updated_at).toLocaleString()
        : '—',
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load pages'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  void load()
})
</script>
