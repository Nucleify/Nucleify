<template>
  <div class="admin-form__field">
    <label v-if="label" class="admin-form__label">{{ label }}</label>
    <p v-if="description" class="admin-form__hint">{{ description }}</p>
    <slot />
    <p v-if="error" class="admin-form__error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  description?: string
  error?: string
}>()
</script>
