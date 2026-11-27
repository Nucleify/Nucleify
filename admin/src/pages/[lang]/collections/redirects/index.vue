<template>
  <div>
    <AdminPageHeader
      title="Redirects"
      description="Map paths to destinations (301/302/307/308)."
      :primary="primary"
      :more="more"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>

    <nui-dialog
      v-if="showCreate"
      visible
      header="New redirect"
      dismissable-mask
      @hide="showCreate = false"
    >
      <form id="admin-redirect-create" class="admin-form" @submit.prevent="onCreate">
        <FieldText
          :model-value="draft.from_path"
          label="From path"
          placeholder="/old"
          @update:model-value="draft.from_path = $event"
        />
        <FieldText
          :model-value="draft.to_path"
          label="To path"
          placeholder="/new"
          @update:model-value="draft.to_path = $event"
        />
        <FieldSelect
          :model-value="draft.status_code"
          label="Status"
          :options="statusOptions"
          @update:model-value="draft.status_code = $event"
        />
        <FieldCheckbox
          label="Enabled"
          :checked="draft.enabled"
          @update:checked="draft.enabled = $event"
        />
      </form>
      <div slot="footer" class="admin-actions">
        <nui-button
          type="button"
          variant="outlined"
          label="Cancel"
          @click="showCreate = false"
        />
        <nui-button
          type="submit"
          form="admin-redirect-create"
          variant="filled"
          :label="creating ? 'Creating…' : 'Create'"
          :disabled="creating"
        />
      </div>
    </nui-dialog>

    <AdminSkeleton v-if="loading" height="10rem" />
    <CollectionList
      v-else
      :columns="columns"
      :rows="listRows"
      :row-actions-for="rowActions"
      searchable
      storage-key="redirects"
      empty-label="No redirects yet."
    />
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'
import { useAdminToast } from '@admin'

useHead({ title: 'Redirects' })

type RedirectRow = {
  id: string
  from_path: string
  to_path: string
  status_code: number
  enabled: boolean
}

const toast = useAdminToast()
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

const columns = [
  { key: 'from_path', label: 'From' },
  { key: 'to_path', label: 'To' },
  { key: 'status_code', label: 'Code', muted: true },
  { key: 'enabled_label', label: 'Enabled', badge: true },
]

const listRows = computed(() =>
  rows.value.map((row) => ({
    ...row,
    enabled_label: row.enabled ? 'yes' : 'no',
  }))
)

const primary = computed((): AdminAction[] => [
  {
    id: 'new',
    label: 'New redirect',
    onClick: () => {
      showCreate.value = true
    },
  },
])

const more = computed((): AdminAction[] => [
  { id: 'refresh', label: 'Refresh', onClick: () => load() },
  {
    id: 'export',
    label: 'Export JSON',
    onClick: () => {
      const blob = new Blob([JSON.stringify(rows.value, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'redirects.json'
      a.click()
      URL.revokeObjectURL(url)
    },
  },
])

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
    toast.success('Redirect created.')
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Create failed'
    toast.error(error.value)
  } finally {
    creating.value = false
  }
}

function rowActions(row: Record<string, unknown>): AdminAction[] {
  return [
    {
      id: 'delete',
      label: 'Delete',
      danger: true,
      onClick: async () => {
        await adminApiSend(`/api/admin/redirects/${row.id}`, 'DELETE')
        toast.success('Deleted.')
        await load()
      },
    },
  ]
}

onMounted(() => {
  void load()
})
</script>
