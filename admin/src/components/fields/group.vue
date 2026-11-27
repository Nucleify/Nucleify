<template>
  <fieldset class="admin-field-group">
    <legend v-if="label" class="admin-form__label">{{ label }}</legend>
    <p v-if="description" class="admin-form__hint">{{ description }}</p>
    <slot />
  </fieldset>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  description?: string
}>()
</script>

<style lang="scss">
.admin-field-group {
  margin: 0 0 1rem;
  padding: 1rem;
  border: 1px solid var(--admin-border);
  background: var(--admin-surface-2);
}
.admin-field-group legend {
  padding: 0 0.35rem;
}
</style>
