<template>
  <FloatLabel
    v-bind="transformProps(props)"
  >
    <slot>
      <!-- Example use
          <ad-input-text :id="" v-model="" />
          <ad-label label="" for="" />
      -->
    </slot>
  </FloatLabel>
</template>

<script setup lang="ts">
import type { FloatLabelInterface } from '.'

import { transformProps } from '../../boson/transform_props'

const props = defineProps<FloatLabelInterface>()
</script>
