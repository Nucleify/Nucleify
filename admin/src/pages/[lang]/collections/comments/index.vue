<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Comments</h1>
        <p>Moderate blog comments.</p>
      </div>
    </div>
    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>
    <CollectionList
      v-else
      :columns="columns"
      :rows="rows"
      empty-label="No comments yet."
    />
    <div v-if="rows.length" class="admin-actions" style="margin-top: 1rem">
      <template v-for="row in rows" :key="String(row.id)">
        <nui-button
          type="button"
          variant="filled"
          :label="`Approve ${row.author_name}`"
          @click="setStatus(String(row.id), 'approved')"
        />
        <nui-button
          type="button"
          variant="outlined"
          label="Spam"
          @click="setStatus(String(row.id), 'spam')"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CollectionList } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Comments' })

const rows = ref<Record<string, unknown>[]>([])
const loading = ref(true)
const error = ref('')

const columns = [
  { key: 'author_name', label: 'Author' },
  { key: 'author_email', label: 'Email', muted: true },
  { key: 'body', label: 'Body', muted: true },
  { key: 'status', label: 'Status', badge: true },
  { key: 'created_at', label: 'When', muted: true },
]

async function load() {
  loading.value = true
  error.value = ''
  try {
    const data =
      (await adminApiGet<Record<string, unknown>[]>(
        '/api/admin/comments?status=pending'
      )) ?? []
    rows.value = data.map((row) => ({
      ...row,
      body: String(row.body || '').slice(0, 100),
      created_at: row.created_at
        ? new Date(String(row.created_at)).toLocaleString()
        : '—',
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load comments'
  } finally {
    loading.value = false
  }
}

async function setStatus(id: string, status: string) {
  await adminApiSend(`/api/admin/comments/${id}`, 'PATCH', { status })
  await load()
}

onMounted(() => {
  void load()
})
</script>
