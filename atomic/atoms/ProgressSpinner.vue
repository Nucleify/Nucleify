<template>
    <ProgressSpinner
        :stroke-width="props.strokeWidth"
        :fill="props.fill"
        :animation-duration="props.animationDuration"
        :pt="props.pt"
        :pt-option="props.ptOption"
        :unstyled="props.unstyled"
        :style="{ width: props.width, height: props.height }"
    />
</template>

<script setup lang="ts">
import { ProgressSpinnerInterface } from 'atomic/bosons/types'

const props = defineProps<ProgressSpinnerInterface>()
</script>
