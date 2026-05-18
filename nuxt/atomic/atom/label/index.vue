<template>
  <label :for="props.forInput">
    {{ displayLabel }}
    <slot />
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { LabelInterface } from '.'

const props = defineProps<LabelInterface>()
const { t, te } = useI18n()

const displayLabel = computed(() => {
  const raw = props.label != null ? String(props.label) : ''
  if (!raw.trim()) return ''
  return te(raw) ? t(raw) : raw
})
</script>
