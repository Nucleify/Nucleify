<template>
    <Avatar
        :label="label"
        :class="avatarClass"
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
import { AvatarInterface } from '../bosons/types'

defineProps<AvatarInterface>()
</script>
