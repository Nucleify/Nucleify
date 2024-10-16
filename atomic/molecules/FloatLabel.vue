<template>
  <FloatLabel
    :unstyled="props.unstyled"
    :pt="props.pt"
    :pt-options="props.ptOptions"
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
import { FloatLabelInterface } from 'atomic/bosons/types'

const props = defineProps<FloatLabelInterface>()
</script>
