<template>
    <Button
        @click="onclick"
        :class="buttonClass"
        :severity="severity"
        :disabled="disabled"
        :raised="raised"
        :rounded="rounded"
        :text="text"
        :outlined="outlined"
        :style="{
            gap: gap,
            padding: padding,
        }"
    >
        <i :class="iconClass"></i>
        <span :class="labelClass" class="p-button-label">{{ label }}</span>
    </Button>
</template>

<script setup lang="ts">
import { ButtonInterface } from 'atomic/bosons/types'

defineProps<ButtonInterface>()
</script>
