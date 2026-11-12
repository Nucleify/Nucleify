<template>
  <div>
    <div class="admin-page-header">
      <div>
        <h1>Menus</h1>
        <p>Primary navigation menus for header / footer.</p>
      </div>
      <nui-button variant="filled" label="Save menu" @click="save" />
    </div>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>

    <div class="admin-panel" style="padding: 1.25rem">
      <FieldText
        :model-value="slug"
        label="Menu slug"
        @update:model-value="slug = $event"
      />
      <FieldText
        :model-value="label"
        label="Label"
        @update:model-value="label = $event"
      />
      <FieldText
        :model-value="locale"
        label="Locale"
        @update:model-value="locale = $event"
      />
      <FieldJson
        :model-value="items"
        label="Items (JSON array of {label, href, children?})"
        :rows="12"
        @update:model-value="onItems"
      />
    </div>

    <h2 style="margin: 1.5rem 0 0.75rem; font-size: 1rem">Existing menus</h2>
    <CollectionList
      :columns="columns"
      :rows="rows"
      empty-label="No menus yet."
    />
  </div>
</template>

<script setup lang="ts">
import { CollectionList } from '@admin'
import { FieldJson } from '@admin'
import { FieldText } from '@admin'
import { adminApiGet, adminApiSend } from '@admin'

useHead({ title: 'Menus' })

const slug = ref('primary')
const label = ref('Primary')
const locale = ref('en')
const items = ref<unknown[]>([
  { label: 'Home', href: '/en/home' },
  { label: 'Investor', href: '/en/investor' },
])
const rows = ref<Record<string, unknown>[]>([])
const error = ref('')
const ok = ref('')

const columns = [
  { key: 'slug', label: 'Slug' },
  { key: 'label', label: 'Label', muted: true },
  { key: 'locale', label: 'Locale', muted: true },
  { key: 'updated_at', label: 'Updated', muted: true },
]

function onItems(value: unknown) {
  items.value = Array.isArray(value) ? value : []
}

async function load() {
  try {
    const data =
      (await adminApiGet<Record<string, unknown>[]>('/api/admin/menus')) ?? []
    rows.value = data.map((row) => ({
      ...row,
      updated_at: row.updated_at
        ? new Date(String(row.updated_at)).toLocaleString()
        : '—',
    }))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Failed to load menus'
  }
}

async function save() {
  error.value = ''
  ok.value = ''
  try {
    await adminApiSend('/api/admin/menus', 'POST', {
      slug: slug.value,
      label: label.value,
      locale: locale.value,
      items: items.value,
    })
    ok.value = 'Menu saved.'
    await load()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Save failed'
  }
}

onMounted(() => {
  void load()
})
</script>
