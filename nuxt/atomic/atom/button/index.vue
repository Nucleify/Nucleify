<template>
  <Button
    v-bind="transformProps(props, excludedProps)"
    :style="{
      width: props.width,
      gap: props.gap,
      padding: props.padding,
    }"
    :class="[
      $style['ad-button'],
      props.media && $style[props.media + '-button'],
      props.variant && $style[props.variant + '-button'],
      props.rounded && $style['rounded-button'],
      props.severity === 'primary' && $style['primary-button'],
    ]"
  >
    <ad-image v-if="props.src" :src="props.src" :alt="props.alt" />
    <ad-icon v-if="props.icon?.trim()" :icon="props.icon" />
    <template v-if="displayLabel">{{ displayLabel }}</template>
    <slot />
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import type { ButtonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<ButtonInterface>()
const { t, te } = useI18n()

/** Nie wołaj `$t` na już przetłumaczonym tekście z rodzica (`$t('…')`) — intlify szuka wtedy klucza. */
const displayLabel = computed(() => {
  const raw = props.label != null ? String(props.label) : ''
  if (!raw.trim()) return ''
  return te(raw) ? t(raw) : raw
})

const excludedProps = [
  'alt',
  'label',
  'icon',
  'src',
  'width',
  'height',
  'gap',
  'padding',
]
</script>

<style lang="scss" module>
@import 'index';
</style>
