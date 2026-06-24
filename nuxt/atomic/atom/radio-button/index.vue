<template>
  <RadioButton
    v-bind="transformProps(props, excludedProps)"
    :pt="passthrough"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import type { RadioButtonInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<RadioButtonInterface>()

const excludedProps = ['adType']

const passthrough = computed(() =>
  props.adType ? { root: { 'ad-type': props.adType } } : undefined
)
</script>
