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
        :disabled="previewDisabled"
        @click="emit('preview')"
      />
      <nui-button
        type="button"
        variant="outlined"
        :label="draftLabel"
        :disabled="draftDisabled"
        @click="emit('save-draft')"
      />
      <nui-button
        type="button"
        variant="filled"
        :label="publishLabel"
        :disabled="publishDisabled"
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
  }>(),
  {
    meta: '',
    draftLabel: 'Save draft',
    publishLabel: 'Publish',
    previewDisabled: true,
    draftDisabled: false,
    publishDisabled: false,
  }
)

const emit = defineEmits<{
  preview: []
  'save-draft': []
  publish: []
}>()
</script>
