<template>
    <ProgressSpinner
        :stroke-width="strokeWidth"
        :fill="fill"
        :animation-duration="animationDuration"
        :style="{ width: width, height: height }"
        :unstyled="unstyled"
    />
</template>

<script setup lang="ts">
import { ProgressSpinnerInterface } from 'atomic/bosons/types'

defineProps<ProgressSpinnerInterface>()
</script>
