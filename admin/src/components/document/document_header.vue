<template>
  <div class="admin-document-header">
    <div>
      <nav v-if="crumbs.length" class="admin-breadcrumbs" aria-label="Breadcrumb">
        <template v-for="(crumb, i) in crumbs" :key="crumb.to || crumb.label">
          <NuxtLink v-if="crumb.to" :to="crumb.to">{{ crumb.label }}</NuxtLink>
          <span v-else>{{ crumb.label }}</span>
          <span v-if="i < crumbs.length - 1" class="admin-muted"> / </span>
        </template>
      </nav>
      <div class="admin-document-header__title-row">
        <h1 class="admin-document-header__title">{{ title }}</h1>
        <AdminStatusPill v-if="status" :status="status" />
        <span v-if="dirty" class="admin-dirty-dot" title="Unsaved changes" />
      </div>
      <p v-if="meta" class="admin-document-header__meta">{{ meta }}</p>
    </div>
    <AdminActionBar
      :primary="primaryActions"
      :secondary="secondaryActions"
      :more="moreActions"
      :meta="savedMeta"
    >
      <slot />
    </AdminActionBar>
  </div>
</template>

<script setup lang="ts">
import type { AdminAction } from '../../types/actions'

const props = withDefaults(
  defineProps<{
    title: string
    meta?: string
    status?: string
    dirty?: boolean
    savedAt?: string
    crumbs?: { label: string; to?: string }[]
    draftLabel?: string
    publishLabel?: string
    previewDisabled?: boolean
    draftDisabled?: boolean
    publishDisabled?: boolean
    unpublishDisabled?: boolean
    showUnpublish?: boolean
    more?: AdminAction[]
  }>(),
  {
    meta: '',
    status: '',
    dirty: false,
    savedAt: '',
    crumbs: () => [],
    draftLabel: 'Save draft',
    publishLabel: 'Publish',
    previewDisabled: false,
    draftDisabled: false,
    publishDisabled: false,
    unpublishDisabled: false,
    showUnpublish: false,
    more: () => [],
  }
)

const emit = defineEmits<{
  preview: []
  'save-draft': []
  publish: []
  unpublish: []
}>()

const savedMeta = computed(() => {
  if (props.dirty) return 'Unsaved changes'
  if (props.savedAt) return `Saved ${props.savedAt}`
  return ''
})

const secondaryActions = computed((): AdminAction[] => {
  const actions: AdminAction[] = [
    {
      id: 'preview',
      label: 'Preview',
      variant: 'outlined',
      disabled: props.previewDisabled,
      onClick: () => emit('preview'),
    },
    {
      id: 'draft',
      label: props.draftLabel,
      variant: 'outlined',
      disabled: props.draftDisabled,
      onClick: () => emit('save-draft'),
    },
  ]
  if (props.showUnpublish) {
    actions.push({
      id: 'unpublish',
      label: 'Unpublish',
      variant: 'outlined',
      disabled: props.unpublishDisabled,
      onClick: () => emit('unpublish'),
    })
  }
  return actions
})

const primaryActions = computed((): AdminAction[] => [
  {
    id: 'publish',
    label: props.publishLabel,
    variant: 'filled',
    disabled: props.publishDisabled,
    onClick: () => emit('publish'),
  },
])

const moreActions = computed(() => props.more)
</script>
