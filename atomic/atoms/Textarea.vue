<template>
    <Textarea
        :model-value="props.modelValue"
        @update:model-value="updateValue"
        :auto-resize="props.autoResize"
        :invalid="props.invalid"
        :variant="props.variant"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        :type="props.type"
    />
</template>

<script setup lang="ts">
import { TextareaInterface } from 'atomic/bosons/types'

const props = defineProps<TextareaInterface>()

const emit = defineEmits(['update:modelValue'])

const updateValue = (value: string) => {
    emit('update:modelValue', value)
}
</script>
