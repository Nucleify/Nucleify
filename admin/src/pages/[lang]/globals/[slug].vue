<template>
  <div>
    <DocumentHeader
      :title="title"
      :meta="`${slug} · ${locale}`"
      :draft-disabled="saving || loading"
      :publish-disabled="saving || loading"
      :draft-label="saving ? 'Saving…' : 'Save draft'"
      :publish-label="saving ? 'Publishing…' : 'Publish'"
      @save-draft="save('draft')"
      @publish="save('published')"
    />

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>
    <p v-else-if="!config" class="admin-form__error">Unknown global.</p>

    <div v-else-if="fields.length" class="admin-document-grid">
      <div class="admin-document-main">
        <SchemaFormRenderer
          :fields="fields"
          :model-value="model"
          position="main"
          @update:model-value="model = $event"
        />
      </div>
      <DocumentMetaSidebar>
        <SchemaFormRenderer
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
import { DocumentHeader } from '@admin'
import { DocumentMetaSidebar } from '@admin'
import { FieldSelect } from '@admin'
import { FieldText } from '@admin'
import { SchemaFormRenderer } from '@admin'
import { useGlobalForm } from '@admin'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))

const {
  config,
  model,
  locale,
  status,
  loading,
  saving,
  error,
  ok,
  load,
  save,
} = useGlobalForm(slug)

const fields = computed(() => config.value?.fields ?? [])
const title = computed(() => config.value?.label || slug.value)

const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
]

useHead({ title: () => title.value })

onMounted(() => {
  void load('en')
})
</script>
