<template>
  <div class="admin-document-header">
    <div>
      <h1 class="admin-document-header__title">{{ title }}</h1>
      <p v-if="meta" class="admin-document-header__meta">{{ meta }}</p>
    </div>
    <div class="admin-document-header__actions">
      <nui-button
        type="button"
        variant="outlined"
        label="Preview"
        :disabled.prop="previewDisabled"
        @click="emit('preview')"
      />
      <nui-button
        type="button"
        variant="outlined"
        :label="draftLabel"
        :disabled.prop="draftDisabled"
        @click="emit('save-draft')"
      />
      <nui-button
        v-if="showUnpublish"
        type="button"
        variant="outlined"
        label="Unpublish"
        :disabled.prop="unpublishDisabled"
        @click="emit('unpublish')"
      />
      <nui-button
        type="button"
        variant="filled"
        :label="publishLabel"
        :disabled.prop="publishDisabled"
        @click="emit('publish')"
      />
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    meta?: string
    draftLabel?: string
    publishLabel?: string
    previewDisabled?: boolean
    draftDisabled?: boolean
    publishDisabled?: boolean
    unpublishDisabled?: boolean
    showUnpublish?: boolean
  }>(),
  {
    meta: '',
    draftLabel: 'Save draft',
    publishLabel: 'Publish',
    previewDisabled: false,
    draftDisabled: false,
    publishDisabled: false,
    unpublishDisabled: false,
    showUnpublish: false,
  }
)

const emit = defineEmits<{
  preview: []
  'save-draft': []
  publish: []
  unpublish: []
}>()
</script>
