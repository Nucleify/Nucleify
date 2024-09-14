<template>
    <label :for="props.forInput">
        {{ props.label }}
    </label>
</template>

<script setup lang="ts">
import { LabelInterface } from 'atomic/bosons/types'

const props = defineProps<LabelInterface>()
</script>
