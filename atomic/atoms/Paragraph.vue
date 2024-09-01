<template>
    <p>
        {{ text }}
        <slot />
    </p>
</template>

<script setup lang="ts">
import { ParagraphInterface } from 'atomic/bosons/types'

defineProps<ParagraphInterface>()
</script>
