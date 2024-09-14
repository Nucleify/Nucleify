<template>
    <Skeleton
        v-if="props.loading"
        :shape="props.shape"
        :size="props.size"
        :width="props.width"
        :height="props.height"
        :border-radius="props.borderRadius"
        :animation="props.animation"
        :unstyled="props.unstyled"
        :pt="props.pt"
        :pt-options="props.ptOptions"
    />
</template>

<script setup lang="ts">
import { SkeletonInterface } from 'atomic/bosons/types'

const props = defineProps<SkeletonInterface>()
</script>
