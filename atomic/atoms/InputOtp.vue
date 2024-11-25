<template>
  <InputOtp
    :v-model="props.modelValue"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :variant="props.variant"
    :tabindex="props.tabindex"
    :length="props.length"
    :mask="props.mask"
    :integer-only="props.integerOnly"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>
<script setup lang="ts">
import { InputOtpInterface } from 'atomic/bosons/types'

const props = defineProps<InputOtpInterface>()
</script>
