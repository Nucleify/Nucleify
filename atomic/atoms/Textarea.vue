<template>
    <Textarea
        :model-value="modelValue"
        :auto-resize="autoResize"
        :invalid="invalid"
        :variant="variant"
        :pt="pt"
        :pt-options="ptOptions"
        :unstyled="unstyled"
        :type="type"
    />
</template>

<script setup lang="ts">
import { TextareaInterface } from 'atomic/bosons/types'

defineProps<TextareaInterface>()
</script>
