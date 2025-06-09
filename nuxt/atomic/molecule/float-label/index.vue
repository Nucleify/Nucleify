<template>
  <FloatLabel
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
    :variant="props.variant"
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
import type { FloatLabelInterface } from 'atomic'

const props = defineProps<FloatLabelInterface>()
</script>
