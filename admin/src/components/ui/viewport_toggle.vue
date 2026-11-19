<template>
  <div class="admin-viewport-toggle" role="group" :aria-label="label">
    <span v-if="label" class="admin-viewport-toggle__label">{{ label }}</span>
    <div class="admin-viewport-toggle__btns">
      <button
        v-for="opt in ADMIN_VIEWPORT_OPTIONS"
        :key="opt.value"
        type="button"
        class="admin-viewport-toggle__btn"
        :class="{ 'is-active': modelValue === opt.value }"
        :aria-pressed="modelValue === opt.value"
        :title="opt.title"
        @click="emit('update:modelValue', opt.value)"
      >
        {{ opt.short }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ADMIN_VIEWPORT_OPTIONS,
  type AdminViewport,
} from './viewport'

withDefaults(
  defineProps<{
    modelValue: AdminViewport
    label?: string
  }>(),
  {
    label: 'Viewport',
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: AdminViewport]
}>()
</script>

<style lang="scss">
.admin-viewport-toggle {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem 0.65rem;
}
.admin-viewport-toggle__label {
  color: var(--admin-muted);
  font-size: 0.72rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.admin-viewport-toggle__btns {
  display: inline-flex;
  gap: 0.25rem;
}
.admin-viewport-toggle__btn {
  border: 1px solid var(--admin-border);
  background: transparent;
  color: var(--admin-muted);
  padding: 0.28rem 0.55rem;
  font: inherit;
  font-size: 0.75rem;
  cursor: pointer;
}
.admin-viewport-toggle__btn.is-active {
  border-color: var(--admin-text);
  color: var(--admin-text);
  background: var(--admin-surface);
}
</style>
