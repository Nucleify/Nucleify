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
} from './admin_viewport'

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
