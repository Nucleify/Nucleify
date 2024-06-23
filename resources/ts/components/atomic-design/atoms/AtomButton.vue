<template>
    <Button
        v-bind="args"
        @click="onclick"
        :style="{
            gap: gap,
            padding: padding,
        }"
    >
        <i :class="iconClass"></i>
        <span :class="spanClass" class="p-button-label">{{ label }}</span>
    </Button>
</template>

<script setup lang="ts">
import { ButtonInterface } from '../bosons/types'

defineProps<ButtonInterface>()
</script>
