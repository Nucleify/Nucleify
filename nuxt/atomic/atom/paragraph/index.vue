<template>
  <p>
    {{ displayText }}
    <slot />
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ParagraphInterface } from '.'

const props = defineProps<ParagraphInterface>()
const { t, te } = useI18n()

const displayText = computed(() => {
  const raw = props.text != null ? String(props.text) : ''
  if (!raw) return ''
  if (props.literal === true) return raw
  return te(raw) ? t(raw) : raw
})
</script>
