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

<style lang="scss">
.admin-empty {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--admin-muted);
}
.admin-empty--rich {
  padding: 2.5rem 1.25rem;
}
.admin-empty__title {
  margin: 0 0 0.35rem;
  color: var(--admin-text);
  font-size: 1rem;
  font-weight: 600;
}
</style>
