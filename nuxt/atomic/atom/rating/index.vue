<template>
  <Rating
    :ad-type="props.adType"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="props.name"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :stars="props.stars"
    :on-icon="props.onIcon"
    :off-icon="props.offIcon"
    :form-control="props.formControl"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import type { RatingInterface } from 'atomic'

const props = defineProps<RatingInterface>()
</script>
