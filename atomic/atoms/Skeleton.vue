<template>
    <Skeleton
        v-if="loading"
        :shape="shape"
        :size="size"
        :width="width"
        :height="height"
        :border-radius="borderRadius"
        :animation="animation"
        :unstyled="unstyled"
    />
</template>

<script setup lang="ts">
import { SkeletonInterface } from 'atomic/bosons/types'

defineProps<SkeletonInterface>()
</script>
