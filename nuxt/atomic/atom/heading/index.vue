<template>
  <component :is="chooseHeading(props.tag)">
    {{ displayText }}
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { HeadingInterface } from '.'
import { chooseHeading } from '.'

const props = defineProps<HeadingInterface>()
const { t, te } = useI18n()

/** Nie wołaj `$t` na gotowym zdaniu z `t('…')` ani na literałach typu „Nucleify” — intlify wtedy szuka klucza i ostrzega. */
const displayText = computed(() => {
  const raw = props.text != null ? String(props.text) : ''
  if (!raw) return ''
  if (props.literal === true) return raw
  return te(raw) ? t(raw) : raw
})
</script>
