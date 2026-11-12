<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Contact inbox</h1>
        <p>Submissions from the public contact form.</p>
      </div>
    </div>
    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      empty-label="No submissions yet."
    />
    <div v-if="rows.length" class="admin-actions" style="margin-top: 1rem">
      <nui-button
        v-for="row in rows"
        :key="String(row.id)"
        type="button"
        variant="outlined"
        :label="`Mark read · ${row.email}`"
        @click="markRead(String(row.id))"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CollectionList } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Contact inbox' })

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')

const columns = [
  { key: 'email', label: 'Email' },
  { key: 'name', label: 'Name', muted: true },
  { key: 'type', label: 'Type', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'message', label: 'Message', muted: true },
  { key: 'created_at', label: 'When', muted: true },
]

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data =
      (await adminApiGet<Record<string, unknown>[]>('/api/admin/contact')) ?? []
    rows.value = data.map((row) => ({
      ...row,
      created_at: row.created_at
        ? new Date(String(row.created_at)).toLocaleString()
        : '—',
      message: String(row.message || '').slice(0, 80),
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load inbox'
  } finally {
    loading.value = false
  }
}

async function markRead(id: string) {
  await adminApiSend(`/api/admin/contact/${id}`, 'PATCH', { status: 'read' })
  await load()
}

onMounted(() => {
  void load()
})
</script>
