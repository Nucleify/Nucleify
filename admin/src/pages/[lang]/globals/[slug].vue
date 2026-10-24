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

    <DocumentForm
      v-else-if="fields.length"
      v-model="model"
      :fields="fields"
    >
      <template #sidebar>
        <FieldSelect
          v-model="status"
          label="Status"
          :options="statusOptions"
        />
        <FieldText v-model="locale" label="Locale" />
      </template>
    </DocumentForm>
  </div>
</template>

<script setup lang="ts">
import DocumentForm from '../../../components/document/DocumentForm.vue'
import DocumentHeader from '../../../components/document/DocumentHeader.vue'
import FieldSelect from '../../../components/fields/FieldSelect.vue'
import FieldText from '../../../components/fields/FieldText.vue'
import { useGlobalForm } from '../../../composables/use_global_form'

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
