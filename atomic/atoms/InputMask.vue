<template>
    <InputMask
        :v-model="props.value"
        :slot-char="props.slotChar"
        :mask="props.mask"
        :auto-clear="props.autoClear"
        :unmask="props.unmask"
        :readonl="props.readonly"
        :invalid="props.invalid"
        :variant="props.variant"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :disabled="props.disabled"
        :unstyled="props.unstyled"
    />
</template>

<script setup lang="ts">
import { InputMaskInterface } from 'atomic/bosons/types'

const props = defineProps<InputMaskInterface>()
</script>
