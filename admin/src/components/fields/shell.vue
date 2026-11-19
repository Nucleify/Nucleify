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

<style lang="scss">
.admin-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 28rem;
}
.admin-form__field {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;
}
.admin-form__label {
  display: block;
  margin: 0;
  font-family: var(--admin-mono);
  font-size: 0.65rem;
  line-height: 1.35;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--admin-muted);
}
.admin-form__hint {
  margin: 0;
  color: var(--admin-muted);
  font-size: 0.75rem;
}
.admin-form__error {
  margin: 0;
  color: var(--admin-danger);
  font-size: 0.8125rem;
}
</style>
