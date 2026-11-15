<template>
  <span class="admin-badge" :class="toneClass">{{ display }}</span>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    status?: string
    label?: string
  }>(),
  {
    status: 'draft',
    label: '',
  }
)

const display = computed(() => props.label || props.status || 'draft')
const toneClass = computed(() => {
  const s = String(props.status || '').toLowerCase()
  if (s === 'published' || s === 'approved' || s === 'active' || s === 'read') {
    return 'admin-badge--ok'
  }
  if (s === 'trash' || s === 'spam' || s === 'error') return 'admin-badge--danger'
  if (s === 'scheduled' || s === 'pending' || s === 'new') {
    return 'admin-badge--info'
  }
  return 'admin-badge--warn'
})
</script>
