<template>
    <ProgressBar
        mode="indeterminate"
        :style="{ width: width, height: height }"
    />
</template>

<script setup lang="ts">
import { ProgressBarInterface } from 'atomic/bosons/types'

defineProps<ProgressBarInterface>()
</script>
