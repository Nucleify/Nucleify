<template>
    <p>
        {{ props.text }}
        <slot />
    </p>
</template>

<script setup lang="ts">
import { ParagraphInterface } from 'atomic/bosons/types'

const props = defineProps<ParagraphInterface>()
</script>
