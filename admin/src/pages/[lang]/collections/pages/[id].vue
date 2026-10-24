<template>
  <div>
    <DocumentHeader
      :title="headerTitle"
      :meta="headerMeta"
      :draft-disabled="saving || loading"
      :publish-disabled="saving || loading"
      :draft-label="saving ? 'Saving…' : 'Save draft'"
      :publish-label="saving ? 'Publishing…' : 'Publish'"
      @save-draft="onDraft"
      @publish="onPublish"
    >
      <nui-button
        v-if="documentId"
        type="button"
        variant="outlined"
        label="Delete"
        :disabled.prop="saving"
        @click="onDelete"
      />
      <NuxtLink :to="`/${lang}/collections/pages`" class="admin-muted">
        ← Pages
      </NuxtLink>
    </DocumentHeader>

    <p v-if="error" class="admin-form__error">{{ error }}</p>
    <p v-if="ok" style="color: #86efac">{{ ok }}</p>
    <p v-if="loading" class="admin-muted">Loading…</p>

    <DocumentForm
      v-else-if="fields.length"
      v-model="model"
      :fields="fields"
    />
  </div>
</template>

<script setup lang="ts">
import DocumentForm from '../../../../components/document/DocumentForm.vue'
import DocumentHeader from '../../../../components/document/DocumentHeader.vue'
import { useDocumentForm } from '../../../../composables/use_document_form'

useHead({ title: 'Page' })

const route = useRoute()
const lang = computed(() => String(route.params.lang || 'en'))
const idParam = computed(() => String(route.params.id || ''))
const isNew = computed(() => idParam.value === 'new')

const {
  config,
  model,
  documentId,
  loading,
  saving,
  error,
  ok,
  load,
  resetCreate,
  save,
  publish,
  remove,
} = useDocumentForm('pages')

const fields = computed(() => config.value?.fields ?? [])

const headerTitle = computed(
  () => String(model.value.title || (isNew.value ? 'New page' : 'Page'))
)
const headerMeta = computed(() => {
  const slug = String(model.value.slug || '—')
  const locale = String(model.value.locale || 'en')
  return `${slug} · ${locale}`
})

async function onDraft() {
  const doc = await save('draft')
  if (doc && isNew.value) {
    await navigateTo(`/${lang.value}/collections/pages/${doc.id}`, {
      replace: true,
    })
  }
}

async function onPublish() {
  const doc = documentId.value ? await publish() : await save('published')
  if (doc && isNew.value) {
    await navigateTo(`/${lang.value}/collections/pages/${doc.id}`, {
      replace: true,
    })
  }
}

async function onDelete() {
  if (!confirm('Delete this page?')) return
  const deleted = await remove()
  if (deleted) await navigateTo(`/${lang.value}/collections/pages`)
}

onMounted(() => {
  if (isNew.value) resetCreate()
  else void load(idParam.value)
})
</script>
