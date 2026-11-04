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
