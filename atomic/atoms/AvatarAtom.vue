<template>
    <Avatar
        :label="label"
        :icon="icon"
        :image="image"
        :size="size"
        :shape="shape"
        :ariaLabel="ariaLabel"
        :ariaLabelledby="ariaLabelledby"
        :unstyled="unstyled"
    />
</template>

<script setup lang="ts">
import { AvatarInterface } from 'atomic/bosons/types'

defineProps<AvatarInterface>()
</script>
