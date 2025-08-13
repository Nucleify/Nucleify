<template>
  <InputMask
    :id="props.id"
    :ad-type="props.adType"
    :v-model="props.value"
    :default-value="props.defaultValue"
    :slot-char="props.slotChar"
    :mask="props.mask"
    :placeholder="props.placeholder"
    :auto-clear="props.autoClear"
    :unmask="props.unmask"
    :readonl="props.readonly"
    :invalid="props.invalid"
    :name="props.name"
    :size="props.size"
    :variant="props.variant"
    :fluid="props.fluid"
    :disabled="props.disabled"
    :dt="props.dt"
    :pt="props.pt"
    :pt-options="props.ptOptions"
    :unstyled="props.unstyled"
  />
</template>

<script setup lang="ts">
import type { InputMaskInterface } from 'atomic'

import InputMask from 'primevue/inputmask' // Import for Storybook

const props = defineProps<InputMaskInterface>()
</script>
