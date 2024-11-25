<template>
  <Rating
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :name="props.name"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :stars="props.stars"
    :cancel="props.cancel"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { RatingInterface } from 'atomic/bosons/types'

const props = defineProps<RatingInterface>()
</script>
