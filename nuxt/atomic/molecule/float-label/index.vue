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
          <atom-input-text :id="" v-model="" />
          <atom-label label="" for="" />
      -->
    </slot>
  </FloatLabel>
</template>

<script setup lang="ts">
import { FloatLabelInterface } from '.'

const props = defineProps<FloatLabelInterface>()
</script>
