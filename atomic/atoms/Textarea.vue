<template>
    <Textarea
        :model-value="modelValue"
        :autoResize="autoResize"
        :invalid="invalid"
        :variant="variant"
        :pt="pt"
        :ptOptions="ptOptions"
        :unstyled="unstyled"
        :type="type"
    />
</template>

<script setup lang="ts">
import { TextareaInterface } from 'atomic/bosons/types'

defineProps<TextareaInterface>()
</script>
