<template>
    <Avatar
        :label="label"
        :icon="icon"
        :image="image"
        :size="size"
        :shape="shape"
        :aria-label="ariaLabel"
        :aria-labelledby="ariaLabelledby"
        :unstyled="unstyled"
    />
</template>

<script setup lang="ts">
import { AvatarInterface } from 'atomic/bosons/types'

defineProps<AvatarInterface>()
</script>
