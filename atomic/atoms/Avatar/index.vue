<template>
  <Avatar
    :label="props.label"
    :icon="props.icon"
    :image="props.image"
    :size="props.size"
    :shape="props.shape"
    :aria-label="props.ariaLabel"
    :aria-labelledby="props.ariaLabelledby"
    :dt="props.dt"
    :unstyled="props.unstyled"
    :pt="props.pt"
    :pt-options="props.ptOptions"
  />
</template>

<script setup lang="ts">
import Avatar from 'primevue/avatar' // Import for Storybook

import { AvatarInterface } from 'atomic/bosons/types'

const props = defineProps<AvatarInterface>()
</script>
