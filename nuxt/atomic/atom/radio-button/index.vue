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

const excludedProps = ['nuiType']

const passthrough = computed(() =>
  props.nuiType ? { root: { 'nui-type': props.nuiType } } : undefined
)
</script>
