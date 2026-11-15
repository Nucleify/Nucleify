<template>
  <div class="admin-empty admin-empty--rich">
    <p class="admin-empty__title">{{ title }}</p>
    <p v-if="description" class="admin-muted">{{ description }}</p>
    <div v-if="$slots.default" class="admin-actions" style="margin-top: 0.75rem">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string
    description?: string
  }>(),
  {
    title: 'Nothing here yet.',
    description: '',
  }
)
</script>
