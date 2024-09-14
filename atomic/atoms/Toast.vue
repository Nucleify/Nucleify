<template>
    <Toast
        :group="group"
        :position="position"
        :auto-z-index="autoZIndex"
        :base-z-index="baseZIndex"
        :breakpoints="breakpoints"
        :icon="icon"
        :message="message"
        :unstyled="unstyled"
    >
        <slot />
    </Toast>
</template>

<script setup lang="ts">
import { ToastInterface } from 'atomic/bosons/types'

defineProps<ToastInterface>()
</script>
