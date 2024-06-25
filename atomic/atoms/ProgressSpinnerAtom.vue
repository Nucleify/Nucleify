<template>
    <ProgressSpinner
        :strokeWidth="strokeWidth"
        :fill="fill"
        :animationDuration="animationDuration"
        :style="{ width: width, height: height }"
        :unstyled="unstyled"
    />
</template>

<script setup lang="ts">
import { ProgressSpinnerInterface } from 'atomic/bosons/types'

defineProps<ProgressSpinnerInterface>()
</script>
