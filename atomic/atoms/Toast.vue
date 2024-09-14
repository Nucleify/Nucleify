<template>
    <Toast
        :group="props.group"
        :position="props.position"
        :auto-z-index="props.autoZIndex"
        :base-z-index="props.baseZIndex"
        :breakpoints="props.breakpoints"
        :icon="props.icon"
        :message="props.message"
        :unstyled="props.unstyled"
        :pt="props.pt"
        :pt-options="props.ptOptions"
    >
        <slot />
    </Toast>
</template>

<script setup lang="ts">
import { ToastInterface } from 'atomic/bosons/types'

const props = defineProps<ToastInterface>()
</script>
