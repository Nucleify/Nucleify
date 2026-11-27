<template>
  <div>
    <DocumentHeader
      :title="title"
      :meta="`${slug} · ${locale}`"
      :status="status"
      :crumbs="crumbs"
      :draft-disabled="saving || loading"
      :publish-disabled="saving || loading"
      :draft-label="saving ? 'Saving…' : 'Save draft'"
      :publish-label="saving ? 'Publishing…' : 'Publish'"
      :more="moreActions"
      @save-draft="onSave('draft')"
      @publish="onSave('published')"
      @preview="onPreviewImpact"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>
    <p v-else-if="!config" class="admin-form__error">Unknown global.</p>

    <div v-else-if="fields.length || isFooter" class="admin-document-grid">
      <div class="admin-document-main">
        <FooterGlobalEditor
          v-if="isFooter"
          :model-value="model"
          :locale="locale"
          @update:model-value="model = $event"
        />
        <SchemaFormRenderer
          v-else
          :fields="fields"
          :model-value="model"
          position="main"
          @update:model-value="model = $event"
        />
      </div>
      <DocumentMetaSidebar>
        <SchemaFormRenderer
          v-if="!isFooter"
          :fields="fields"
          :model-value="model"
          position="sidebar"
          @update:model-value="model = $event"
        />
        <FieldSelect
          :model-value="status"
          label="Status"
          :options="statusOptions"
          @update:model-value="status = $event"
        />
        <FieldText
          :model-value="locale"
          label="Locale"
          @update:model-value="locale = $event"
        />
      </DocumentMetaSidebar>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '@admin'
import { useGlobalForm } from '@admin'
import { useAdminToast } from '@admin'
import {
  defaultFooterGlobalData,
  normalizeFooterGlobalData,
} from '@shared_modules'

const route = useRoute()
const toast = useAdminToast()
const lang = computed(() => String(route.params.lang || 'en'))
const slug = computed(() => String(route.params.slug || ''))
const isFooter = computed(() => slug.value === 'footer')

if (slug.value === 'settings') {
  await navigateTo(`/${lang.value}/collections/pages`, { replace: true })
}

const {
  config,
  model,
  locale,
  status,
  loading,
  saving,
  error,
  load,
  save,
} = useGlobalForm(slug)

const fields = computed(() => config.value?.fields ?? [])
const title = computed(() => config.value?.label || slug.value)
const publishedSnapshot = ref<Record<string, unknown> | null>(null)

const crumbs = computed(() => [
  { label: 'Globals' },
  { label: title.value },
])

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

const moreActions = computed((): AdminAction[] => [
  {
    id: 'reset',
    label: 'Reset to defaults',
    onClick: () => {
      if (isFooter.value) {
        model.value = defaultFooterGlobalData(locale.value || 'en')
        toast.info('Restored home / investor / company footer packs — save to persist.')
        return
      }
      const next: Record<string, unknown> = {}
      for (const field of fields.value) {
        if (
          'name' in field &&
          field.name &&
          'defaultValue' in field &&
          field.defaultValue !== undefined
        ) {
          next[field.name] = structuredClone(field.defaultValue)
        }
      }
      model.value = next
      toast.info(
        Object.keys(next).length
          ? 'Restored field defaults — save to persist.'
          : 'Cleared local draft fields — save to persist.'
      )
    },
  },
  {
    id: 'diff',
    label: 'Diff vs published',
    onClick: () => {
      const current = JSON.stringify(model.value, null, 2)
      const published = JSON.stringify(publishedSnapshot.value || {}, null, 2)
      toast.info(
        current === published
          ? 'No diff vs last loaded published snapshot.'
          : 'Draft differs from last loaded snapshot (check JSON export).'
      )
    },
  },
  {
    id: 'export',
    label: 'Export JSON',
    onClick: () => {
      const blob = new Blob([JSON.stringify(model.value, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${slug.value}.json`
      a.click()
      URL.revokeObjectURL(url)
    },
  },
  {
    id: 'reload',
    label: 'Reload',
    onClick: () => load(locale.value),
  },
])

async function onSave(next: string) {
  const doc = await save(next)
  if (doc && next === 'published') {
    publishedSnapshot.value = structuredClone(model.value)
    toast.success('Published.')
  } else if (doc) {
    toast.success('Draft saved.')
  }
}

function onPreviewImpact() {
  toast.info('Globals apply site-wide after publish — open the public site to verify.')
}

useHead({ title: () => title.value })

onMounted(async () => {
  if (slug.value === 'settings') return
  await load('en')
  if (status.value === 'published') {
    publishedSnapshot.value = structuredClone(model.value)
  }
})
</script>
