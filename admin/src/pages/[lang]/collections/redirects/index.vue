<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Redirects</h1>
        <p>Map paths to destinations (301/302/307/308).</p>
      </div>
      <nui-button
        variant="filled"
        label="New redirect"
        @click="showCreate = !showCreate"
      />
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <div v-if="showCreate" class="admin-panel" style="padding: 1.25rem; margin-bottom: 1rem">
      <form class="admin-form" @submit.prevent="onCreate">
        <FieldText v-model="draft.from_path" label="From path" placeholder="/old" />
        <FieldText v-model="draft.to_path" label="To path" placeholder="/new" />
        <FieldSelect
          v-model="draft.status_code"
          label="Status"
          :options="statusOptions"
        />
        <FieldCheckbox
          label="Enabled"
          :checked="draft.enabled"
          @update:checked="draft.enabled = $event"
        />
        <nui-button type="submit" variant="filled" :label="creating ? 'Creating…' : 'Create'" />
      </form>
    </div>

    <p v-if="loading" class="admin-muted">Loading…</p>
    <div v-else class="admin-panel">
      <table class="admin-table">
        <thead>
          <tr>
            <th>From</th>
            <th>To</th>
            <th>Code</th>
            <th>Enabled</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td>{{ row.from_path }}</td>
            <td>{{ row.to_path }}</td>
            <td class="admin-muted">{{ row.status_code }}</td>
            <td>
              <span
                class="admin-badge"
                :class="row.enabled ? 'admin-badge--ok' : 'admin-badge--warn'"
              >
                {{ row.enabled ? 'yes' : 'no' }}
              </span>
            </td>
            <td>
              <nui-button
                variant="outlined"
                label="Delete"
                @click="onDelete(row.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!rows.length" class="admin-empty">No redirects yet.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import FieldCheckbox from '../../../../components/fields/FieldCheckbox.vue'
import FieldSelect from '../../../../components/fields/FieldSelect.vue'
import FieldText from '../../../../components/fields/FieldText.vue'
import { adminApiGet, adminApiSend } from '../../../../composables/use_admin_api'

useHead({ title: 'Redirects' })

type RedirectRow = {
  id: string
  from_path: string
  to_path: string
  status_code: number
  enabled: boolean
}

const rows = ref<RedirectRow[]>([])
const loading = ref(true)
const creating = ref(false)
const showCreate = ref(false)
const error = ref('')

const draft = reactive({
  from_path: '',
  to_path: '',
  status_code: '301',
  enabled: true,
})

const statusOptions = [
  { label: '301', value: '301' },
  { label: '302', value: '302' },
  { label: '307', value: '307' },
  { label: '308', value: '308' },
]

async function load() {
  loading.value = true
  error.value = ''
  try {
    rows.value = (await adminApiGet<RedirectRow[]>('/api/admin/redirects')) ?? []
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load redirects'
  } finally {
    loading.value = false
  }
}

async function onCreate() {
  creating.value = true
  error.value = ''
  try {
    await adminApiSend('/api/admin/redirects', 'POST', {
      from_path: draft.from_path,
      to_path: draft.to_path,
      status_code: Number(draft.status_code),
      enabled: draft.enabled,
    })
    showCreate.value = false
    draft.from_path = ''
    draft.to_path = ''
    draft.status_code = '301'
    draft.enabled = true
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Create failed'
  } finally {
    creating.value = false
  }
}

async function onDelete(id: string) {
  if (!confirm('Delete redirect?')) return
  error.value = ''
  try {
    await adminApiSend(`/api/admin/redirects/${id}`, 'DELETE')
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Delete failed'
  }
}

onMounted(() => {
  void load()
})
</script>
