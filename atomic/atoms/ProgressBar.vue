<template>
    <ProgressBar
        :value="props.value"
        :mode="props.mode"
        :show-value="props.showValue"
        :pt="props.pt"
        :pt-options="props.ptOptions"
        :unstyled="props.unstyled"
        :style="{ width: props.width, height: props.height }"
    />
</template>

<script setup lang="ts">
import { ProgressBarInterface } from 'atomic/bosons/types'

const props = defineProps<ProgressBarInterface>()
</script>
